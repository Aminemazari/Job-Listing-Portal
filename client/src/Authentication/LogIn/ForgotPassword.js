import React from 'react'
import { useState } from "react";
import Button from '../../component/CTA_Button'
import style from "./style.module.css";
import styles from "./forgotpassword.module.css"
import OTP from '../../component/OTP';
import classNames from 'classnames';
import Input from '../../component/Input_Fields'
import Input_Password from "../../component/Input_password"
import { Navigate } from 'react-router-dom';
const ForgotPassword = () => {

  const [OTPvisible,setOtp]=useState(false);
  const [emailCardVisible,setECard]=useState(true);
  const [resetCardVisible,setReset]=useState(false);
  const [email,setEmail]=useState("");
  const EmailClickHandler = async (e) => {
    e.preventDefault();
    setOtp(true)
    setECard(false)


    try{
      const response = await fetch(`${"API_URL"}/api/v2/auth/login`,{
        method: "POST",
        headers : new Headers( {  
          'content-type' : 'application/json',
        'accept': 'application/json'
         } ),
        body: JSON.stringify({
          email: email,
          password: "password",
   
        }),
      }).then(response => response.json())
      .then(data => { 
        if (data.accessToken!=null){
          localStorage.setItem('accessToken',data.accessToken);
          fetch(`${"API_URL"}/api/v4/users/currentUser`,{
            method:"GET",
            headers:new Headers({  
              'accept': 'text/plain',
              'Authorization':`Bearer ${data.accessToken}`,
              
             } ),
          })
          .then(response => response.json())
          .then(UserData => {
              if (UserData){
                localStorage.setItem('UserData',JSON.stringify(UserData));
                Navigate("/home");
              }
   
          })
          .catch(error =>
            console.log(error)
          );
        

       
        }
        else{
      
        }
      })
  
    
      }catch (error) { 
        console.log(error)

       
      }
    
    
  }



 const codeHandler=()=>{
  setOtp(false)
  setReset(true)
 }
  const submitEmail=()=>{
    setECard(false);
    setOtp(true);
    }
  const submitCode=()=>{
    setOtp(false);
    setReset(true);
  }
  const submitPassword=()=>{

  }
  const handleChangeEmail = (newValue) => {
    setEmail(newValue);
  };
  return (
    <div className={styles.hero} >
       <section className={styles.textSide}>
    </section>
     <section className={styles.formSide}>

     <div className={`${style.form} ${!emailCardVisible ? styles.Notvisible : ''}`}>
        <h1 className={style.welcome}>Reset Your Password</h1>
        <p className={styles.weveSentACode}>Enter your email address and we'll send you instructions to reset your password</p>
        <div className={style.Same_input}>
        <p className={style.enter_Data}>Enter your email</p>
   
        <Input placeHolder={"eg.moha riade17@gmail.com"}  inputValue={email} onInputChange={handleChangeEmail} ></Input>
            </div>
            <Button text={"Continue"}  onclick={EmailClickHandler}></Button>
            </div> 

        
     <div className={`${style.form} ${!OTPvisible ? styles.Notvisible : ''}`}>
        <h1 className={style.welcome}>Reset Your Password</h1>
        <p className={styles.weveSentACode}>We've sent a code to [email address] to verify your account</p> 
        <div className={style.Same_input}>
        <p className={style.enter_Data}>Enter PIN Code</p>
   
         <OTP/>
         <button className={style.informationHolder}>Didn't receive a code?</button>
            </div>
            <Button text={"Continue"}  onclick={codeHandler}></Button>
            </div> 
        <div className={`${style.form} ${!resetCardVisible ? styles.Notvisible : ''}`}>
        <h1 className={style.welcome}>Reset Your Password</h1>
        <p className={styles.weveSentACode}>Enter your email address and we'll send you instructions to reset your password</p> 
        <div className={style.Same_input}>
        <p className={style.enter_Data}>Enter new password</p>
   
        <Input_Password placeHolder={"eg.moha riade17@gmail.com"}  inputValue={email} onInputChange={handleChangeEmail} ></Input_Password>
     
            </div>
            <Button text={"Continue"}  onclick={EmailClickHandler}></Button>
            </div> 

        </section>
 
        
   

    </div>
    
    
  )
}

export default ForgotPassword
