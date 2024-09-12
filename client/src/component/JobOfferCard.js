import React from 'react'
import style from './style.module.css'
import Button from "./Secondary_button"
import locImge from "./assets/location1.svg"
const JobOfferCard = ({title,type,min,max,campany,picture,location}) => {
  return (
    <div className={style.jobCard}>
      <div className={style.cardHead}>
       <p className={style.cardTitle}>{title}</p>
       <div style={{display:"flex",gap:'4px',alignItems:"center"}}>
        <p className={style.jobTypeCard}>{type}</p>
        <p className={style.salaryCard}>Salary: {min} - {max}</p>
       </div>
      </div>

      <div className={style.campanyAndLocation}>
        <img style={{}} src={picture}></img>
        <div style={{display:'flex',flexDirection:'column',gap:"4px"}}>
            <p className={style.campanyName}>{campany}</p>
            <p className={style.campanyLocation}><img src={locImge}></img>{location}</p>
        </div>
      </div>
      <div className={style.ApplayNow}>
        <Button text={"Apply now"}/>
      </div>
    </div>
  )
}

export default JobOfferCard
