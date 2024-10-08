import React from 'react'
import style from "./styles/home.module.css"
import NavBar from '../component/NavBar'
const Home = () => {
  return (
    <div className={style.hero}>
        <div style={{padding: "0px 100px"}}>
            <NavBar home={true}/>
        </div>
        <section className={style.countainerOne}>
          <div className={style.fromSide}>
            <div className={style.textDiv}>
              <p className={style.findJobText}>Find a job that aligns with your interests and skills</p>
              <p className={style.subTitle}>Thousands of jobs in all the leading sector are waiting for you.</p>
            </div>
            <div className={style.fromSide}>
              
              
            </div>

          </div>
        </section>
    </div>
  )
}

export default Home
