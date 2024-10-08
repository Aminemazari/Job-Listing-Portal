import React from 'react'
import style from "./style.module.css"
import logo from "../Home/assets/logo.svg"

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.footerCountainer}>
        <div className={style.footerSubCountainer}>
            <button onClick={"handleLogo"} className={style.hireMeButton}  style={{marginBottom:"10px"}}>
            <img src={logo}/> HireMe</button>
            <p className={style.callNow}>Call now: <span className={style.number}>+213 732654638</span></p> 
            <p className={style.footerSubTitle}></p>
        </div>
        <div className={style.footerSubCountainer}>
            <p className={style.footerTitle}>Quick Link</p>
            <p className={style.footerSubTitle}>About</p>
            <p className={style.footerSubTitle}>Contact</p>
            <p className={style.footerSubTitle}>Admin</p>

        </div>
        <div className={style.footerSubCountainer}>
            <p className={style.footerTitle}>Candidate</p>
            <p className={style.footerSubTitle}>Browse Jobs</p>
            <p className={style.footerSubTitle}>Browse Employers</p>
            <p className={style.footerSubTitle}>Candidate Dashboard</p>
            <p className={style.footerSubTitle}>Saved Jobs</p>

        </div>
        <div className={style.footerSubCountainer}>
            <p className={style.footerTitle}>Employers</p>
            <p className={style.footerSubTitle}>Post a Job</p>
            <p className={style.footerSubTitle}>Browse Candidates</p>
            <p className={style.footerSubTitle}>Employers Dashboard</p>
            <p className={style.footerSubTitle}>Applications</p>

        </div>

      </div>
      <div style={{height:"2px",background:"rgba(118, 127, 140, 0.5)"}}></div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <p className={style.reserved}>@ 2022 AlwaysApply - Job Portal. All rights Reserved</p>

      </div>
    </div>
  )
}

export default Footer
