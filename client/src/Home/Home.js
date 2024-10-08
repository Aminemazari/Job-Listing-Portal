import React from 'react'
import style from "./styles/home.module.css"
import NavBar from '../component/NavBar'
import SearchJobInHome from '../component/SearchJobInHome'
import mainPhoto from "./assets/Untitled-1 1.svg"
import JobOfferCard from '../component/JobOfferCard'
import googleIcon from "./assets/googleIcn.svg"
import appleIcon from "./assets/apple-logo 1.svg"
import intelIcon from "./assets/Group 14049.svg"
import googleLogo from "./assets/googleLogo.svg"
import microsoftLogo from "./assets/pngwing.com 1.svg"
import flipkartLogo from "./assets/pngwing.com (3).svg"
import youtubeLogo from "./assets/pngwing.com (2) 1.svg"
import ibmLogo from "./assets/pngwing.com (4) 1.svg"
import Footer from '../component/Footer'
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
            <div className={style.fromSide} style={{gap:"15px"}}>
              <SearchJobInHome/>
              <p className={style.suggestion}>Suggestion:<span className={style.categories}>UI/UX Designer , Programing , Digital Marketing , Video , Animation.</span></p>
              
            </div>

          </div>
          <img src={mainPhoto} className={style.mainPhoto}/>
        </section>

        <section className={style.secondCountainer}>
          <h1 className={style.Title}>Featured Jobs</h1>
          <p className={style.subTitle} style={{marginTop:"-10px"}}>Choose jobs from the top employers and apply for the same.</p>
          <div className={style.jobPost}>
          <JobOfferCard  title={"Technical Support Specialist"} type={"Part-time"}  min={"20,000 INR"} max={"25,000 INR"} campany={"Google Inc."} picture={googleIcon} location={"New York,USA"} />
          <JobOfferCard  title={"Senior UI/UX Designer"} type={"Full-time"}  min={"$30,000"} max={"$55,000"} campany={"Apple"} picture={appleIcon} location={"New York,USA"} />
          <JobOfferCard  title={"Marketing Officer"} type={"Part-time"}  min={"20,000 INR"} max={"25,000 INR"} campany={"Intel Corp"} picture={intelIcon} location={"New York,USA"} />
          </div>
          <p className={style.viewAll}>View all</p>
        </section>
        <div className={style.subCountainer}> 
          <div className={style.linesAndTitleInTheMidle}>
            <div className={style.line}></div>
            <p className={style.topCompanies}>Top companies hiring now</p>
            <div className={style.line}></div>
          </div>
          <div className={style.campanies}>
            <img src={googleLogo} style={{width:"120px"}}/>
            <img src={microsoftLogo} style={{width:"120px"}}/>
            <img src={flipkartLogo} style={{width:"120px"}}/>
            <img src={youtubeLogo} style={{width:"120px"}}/>
            <img src={ibmLogo} style={{width:"120px"}}/>

          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Home
