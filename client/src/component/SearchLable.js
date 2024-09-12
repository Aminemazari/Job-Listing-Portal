import React from 'react'
import style from "./style.module.css"
import searchImg from "./assets/Vector.svg"
import location from "./assets/location.svg"
import work from "./assets/work.svg"
import Button from "../component/Secondary_button"
const SearchLable = ({setJobTitle,setLocation,setYearsExp,onSearch}) => {
    const handleExperienceChange =(e)=>{
        setYearsExp(e.target.value); 
    }
    const handleJobTitleChange=(e)=>{
        setJobTitle(e.target.value); 
    }
    const handleLocationChange=(e)=>{
        setLocation(e.target.value); 
    }
  return (
    <div className={style.search_bar}>
        <div className={style.input_search_group}>
            <div className={style.search_input_countainer}>
                <img src={searchImg} className={style.inputImage}></img>
                <input placeholder='Enter Job title' className={style.searchInput} onChange={handleJobTitleChange}></input>
            </div>
            <div className={style.horLine}></div>
            <div className={style.search_input_countainer}>
                <img src={location} className={style.inputImage}></img>
                <input placeholder='Enter location' className={style.searchInput} onChange={handleLocationChange}></input>
            </div>
            <div className={style.horLine}></div>
            <div className={style.search_input_countainer}>
                <img src={work} className={style.inputImage}></img>
                <input placeholder='Years of experience' className={style.searchInput} onChange={handleExperienceChange} ></input>
            </div>  
        </div>
        <div className={style.searchButton}>
        <Button text={"Search"} onClick={onSearch}/>
        </div>
    </div>
  )
}

export default SearchLable
