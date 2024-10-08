import React, { useState, useEffect } from 'react';
import style from "./style.module.css";
import NavigationLinks from './NavigationLinks';
import Bell from "./assets/Bell.svg";
import { useNavigate } from 'react-router-dom';
import API_URL from './API_URL';
import logo from "../Home/assets/logo.svg"

const NavBar = ({ home, findJob, employers, admin, aboutUs, picture }) => {
  const Navigate = useNavigate();

  const homeClicked = () => {
    Navigate("/home");
  };
  const findJobClicked = () => {
    Navigate("/find-job");
  };
  const employersClicked = () => {
    Navigate("/employers");
  };
  const adminClicked = () => {
    Navigate("/admin");
  };
  const aboutUsClicked = () => {
    Navigate("/aboutUs");
  };

  const handleLogo = () => {
    Navigate("/home");
  };



  return (
    <div className={style.NavBar}>
      <button onClick={handleLogo} className={style.hireMeButton}>
        <img src={logo}/> HireMe</button> 
      <div className={style.Navigation}>
        <NavigationLinks text={"Home"} onclick={homeClicked} clicked={home} />
        <NavigationLinks text={"find Job"} onclick={findJobClicked} clicked={findJob} />
        <NavigationLinks text={"Employers"} onclick={employersClicked} clicked={employers} />
        <NavigationLinks text={"About Us"} onclick={aboutUsClicked} clicked={aboutUs} />
      </div>
      <section className={style.features}>
          <button className={style.navbarChatbuton} onClick={"handleButtonNotification"}>
              <img src={Bell} s />
          </button>
       
            <button onClick={"handleButtonClick"} style={{backgroundColor:"transparent",border:"none"}}>
              <img src={picture} className={style.profilePicsNavBar} />
            </button>
            
      </section>
    </div>
  );
}

export default NavBar;
