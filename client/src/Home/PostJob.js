import React , { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../component/NavBar'
import style from "./styles/PostJob.module.css"
import Input from '../component/Input_Fields'
import { Select, Space } from 'antd';
import 'antd/dist/reset.css';
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
            <Input placeHolder={"Add job title, role vacancies etc"}/>
             
        </div>

        <div className={style.inputGroup} >
          <div className={style.inputCountainter}>
              <p className={style.inputTitle}>Tags</p>
              <Input placeHolder={'Job keyword, tags etc..'}/>
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
                <Input placeHolder={'Minimum Salary...'}/>
              </div> 
              <div className={style.inputCountainter}>
                <p className={style.inputTitle} style={{fontSize:'16px',fontWeight:"500px"}}>Max Salary</p>
                <Input placeHolder={'Maximum Salary...'}/>
              </div>     
            </div>
             
        </div>
        <div>
      <h1>Select Your Country and City</h1>

      <label htmlFor="country">Country:</label>
      <Select
        id="country"
        placeholder="Select a country"
        onChange={handleCountryChange}
        style={{ width: 300, marginBottom: 20 }}
        options={countryOptions}
      />

      <label htmlFor="city">City:</label>
      <Select
        id="city"
        placeholder="Select a city"
        onChange={handleCityChange}
        style={{ width: 300 }}
        options={cityOptions}
        disabled={!selectedCountry} // Disable city dropdown until a country is selected
      />
    </div>

        <div className={style.inputCountainter}>
            <p className={style.inputTitle}>Location</p>
            <div className={style.inputGroup}>
              <Input placeHolder={'Job keyword, tags etc..'}/>
              <Select
                style={{height:'100%',width:'100%'}}
                showSearch
                placeholder="Select a person"
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                options={options}
                />
            </div>
             
        </div>

        <div className={style.inputCountainter}>
            <p className={style.inputTitle}>Job Description</p>
             
        </div>  

    </div>
  )
}

export default PostJob
