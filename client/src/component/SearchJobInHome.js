import React from 'react'
import style from "./style.module.css"
import Button from "../component/Secondary_button"
import searchImg from "./assets/fi_search.svg"
import location from "./assets/fi_map-pin.svg"
import work from "./assets/work.svg"

const SearchJobInHome = () => {
    
  return (
    <div className={style.search_bar} style={{boxShadow:"0 12px 40px 0 rgba(0, 44, 109, 0.04)",border:" 1px solid #e4e5e8"}}> 
    <div className={style.input_search_group} style={{gap:"50px"}}>
        <div className={style.search_input_countainer} style={{maxWidth:"200px"}}>
            <img src={searchImg} className={style.inputImage}></img>
            <input placeholder='Job tittle, Keyword...' className={style.searchInput} style={{maxWidth:"200px"}} onChange={"handleJobTitleChange"}></input>
        </div>
        <div className={style.horLine}></div>
        <div className={style.search_input_countainer}>
            <img src={location} className={style.inputImage}></img>
            <input placeholder='Location' className={style.searchInput} style={{maxWidth:"200px"}} onChange={"handleLocationChange"}></input>
        </div>
    </div>
    <div className={style.searchButton}>
    <Button text={"Find Job"} onClick={"onSearch"}/>
    </div>
</div>
  )
}

export default SearchJobInHome
