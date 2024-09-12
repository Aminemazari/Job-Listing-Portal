import React from 'react'
import NavBar from '../component/NavBar'
import style from "./styles/findjob.module.css"
import SearchLable from '../component/SearchLable'
import FilterBar from '../component/FilterBar'
import JobOfferCard from '../component/JobOfferCard'
import googlelogo from "./assets/Employers Logo.svg"
const FindJob = () => {
  return (
    <div className={style.hero}>
      <NavBar findJob={true}/>
      <section className={style.main_countainer}>
        <div className={style.title}>
            <h1 className={style.job_search}>Job  Search</h1>
            <p className={style.search_for_your_desire}>Search for your desired job matching your skills</p>
        </div>
        <SearchLable/>
        <section className={style.Search_Result}>
            <div className={style.filter}>
            <h1 className={style.headlineTitle}>Filter</h1> 
            <FilterBar/>  
            </div>
            <div className={style.filter}>
                <h1 className={style.headlineTitle}>All Jobs</h1>
                <div className={style.jobOffers}>
                    <JobOfferCard title={"Technical Support Specialist"} type={"Part-time"} min={"20,000 INR"} max={"25,000 INR"} campany={"Google Inc."} picture={googlelogo} location={'New Delhi, India'} />
                    <JobOfferCard title={"Technical Support Specialist"} type={"Part-time"} min={"20,000 INR"} max={"25,000 INR"} campany={"Google Inc."} picture={googlelogo} location={'New Delhi, India'} />
                    <JobOfferCard title={"Technical Support Specialist"} type={"Part-time"} min={"20,000 INR"} max={"25,000 INR"} campany={"Google Inc."} picture={googlelogo} location={'New Delhi, India'} />
                    <JobOfferCard title={"Technical Support Specialist"} type={"Part-time"} min={"20,000 INR"} max={"25,000 INR"} campany={"Google Inc."} picture={googlelogo} location={'New Delhi, India'} />
                    <JobOfferCard title={"Technical Support Specialist"} type={"Part-time"} min={"20,000 INR"} max={"25,000 INR"} campany={"Google Inc."} picture={googlelogo} location={'New Delhi, India'} />
                    <JobOfferCard title={"Technical Support Specialist"} type={"Part-time"} min={"20,000 INR"} max={"25,000 INR"} campany={"Google Inc."} picture={googlelogo} location={'New Delhi, India'} />
                    <JobOfferCard title={"Technical Support Specialist"} type={"Part-time"} min={"20,000 INR"} max={"25,000 INR"} campany={"Google Inc."} picture={googlelogo} location={'New Delhi, India'} />
                    <JobOfferCard title={"Technical Support Specialist"} type={"Part-time"} min={"20,000 INR"} max={"25,000 INR"} campany={"Google Inc."} picture={googlelogo} location={'New Delhi, India'} />
                    <JobOfferCard title={"Technical Support Specialist"} type={"Part-time"} min={"20,000 INR"} max={"25,000 INR"} campany={"Google Inc."} picture={googlelogo} location={'New Delhi, India'} />
                    <JobOfferCard title={"Technical Support Specialist"} type={"Part-time"} min={"20,000 INR"} max={"25,000 INR"} campany={"Google Inc."} picture={googlelogo} location={'New Delhi, India'} />
                    <JobOfferCard title={"Technical Support Specialist"} type={"Part-time"} min={"20,000 INR"} max={"25,000 INR"} campany={"Google Inc."} picture={googlelogo} location={'New Delhi, India'} />


                    


                </div>
            </div>
        </section>
      </section>
    </div>
  )
}

export default FindJob
