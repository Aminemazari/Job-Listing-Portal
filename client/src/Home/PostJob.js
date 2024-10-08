import React , { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../component/NavBar'
import style from "./styles/PostJob.module.css"
import Input_field from '../component/Input_Fields'
import { Select, Space,Input } from 'antd';
import 'antd/dist/reset.css';
import Button from "../component/Secondary_button"
const { TextArea } = Input;

const options =require('./assets/JobRoleData')
const PostJob = () => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch countries using Restcountries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryOptions = response.data.map((country) => ({
          value: country.cca2,
          label: country.name.common,
        }));
        setCountryOptions(countryOptions);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch cities based on selected country using GeoNames API
  useEffect(() => {
    if (selectedCountry) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(`http://api.geonames.org/searchJSON?country=${selectedCountry}&maxRows=10&username=demo`);
          const cityOptions = response.data.geonames.map((city) => ({
            value: city.geonameId,
            label: city.name,
          }));
          setCityOptions(cityOptions);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    } else {
      setCityOptions([]);
    }
  }, [selectedCountry]);

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setSelectedCity(''); // Reset city selection when a new country is selected
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };
  
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  return (
    <div className={style.hero}>
        <NavBar employers={true}/>

        <div className={style.title}>
            <h1 className={style.job_search}>Job  Search</h1>
            <p className={style.search_for_your_desire}>Search for your desired job matching your skills</p>
        </div>

        <div className={style.inputCountainter}>
            <p className={style.inputTitle}>Job Title</p>
            <Input_field placeHolder={"Add job title, role vacancies etc"}/>
             
        </div>

        <div className={style.inputGroup} >
          <div className={style.inputCountainter}>
              <p className={style.inputTitle}>Tags</p>
              <Input_field placeHolder={'Job keyword, tags etc..'}/>
          </div>   
          <div className={style.inputCountainter}>
              <p className={style.inputTitle}>Job Role</p>
              <Select
                style={{height:'47px',width:'100%'}}
                showSearch
                placeholder="Select a person"
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                options={options}
                />          
          </div>                   
        </div>

        <div className={style.inputCountainter} style={{gap:'30px'}}>
            <p className={style.inputTitle}>Salary</p>
            <div className={style.inputGroup} style={{width:'50%'}}>
              <div className={style.inputCountainter}>
                <p className={style.inputTitle} style={{fontSize:'16px',fontWeight:"500px"}}>Min Salary</p>
                <Input_field placeHolder={'Minimum Salary...'}/>
              </div> 
              <div className={style.inputCountainter}>
                <p className={style.inputTitle} style={{fontSize:'16px',fontWeight:"500px"}}>Max Salary</p>
                <Input_field placeHolder={'Maximum Salary...'}/>
              </div>     
            </div>
             
        </div>
        <div>
      <h1>Select Your Country and City</h1>
      <div style={{display:"flex",gap:"40px"}}>
        <div className={style.inputCountainter}>
          <label htmlFor="country" className={style.element}>Country</label>
          <Select
            id="country"
          
            placeholder="Select a country"
            onChange={handleCountryChange}
            style={{ width: "300px", marginBottom: 20,height:"45px" }}
            options={countryOptions}
          />
        </div>
        <div className={style.inputCountainter}>
          <label htmlFor="city" className={style.element}>City</label>
          <Select
            id="city"
            placeholder="Select a city"
            onChange={handleCityChange}
            style={{ width: "300px",height:"45px" }}
            options={cityOptions}
            disabled={!selectedCountry} // Disable city dropdown until a country is selected
          />
        </div>
        </div>

        <div className={style.inputCountainter}>
            <p className={style.inputTitle}>Location</p>
            <div className={style.inputGroup}>
              <Input_field placeHolder={'Job keyword, tags etc..'}/>
              <Select
                style={{height:'45px',width:'100%'}}
                showSearch
                placeholder="Select a person"
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                options={options}
                />
                </div>
            </div>
             
        </div>

        <div className={style.inputCountainter}>
            <p className={style.inputTitle}>Job Description</p>
            
            <TextArea rows={9} />
        </div>
        <div style={{width:"250px",marginBottom:"30px"}}>
        <Button text={"Post Job"}/>  
        </div>
    </div>
  )
}

export default PostJob
