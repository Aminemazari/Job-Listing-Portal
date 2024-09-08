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
import API_URL from '../../component/API_URL';
const ForgotPassword = () => {
  const [loading ,setLoading]= useState(false);
  const [OTPvisible,setOtp]=useState(false);
  const [emailCardVisible,setECard]=useState(true);
  const [resetCardVisible,setReset]=useState(false);
  const [email,setEmail]=useState("");
  const [OTPvalue,setOTPValue]=useState("");
  const [newPassword,setPassword]=useState("");
  const [status,setStatus] = useState("");

  const EmailClickHandler = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch(`${API_URL}/api/v1/auth/forgetPassword`,{
        method: "POST",
        headers : new Headers( {  
          'content-type' : 'application/json',
         } ),
        body: JSON.stringify({
          email: email,
        }),
      })
      .then(response => response.json())
        const statusCode = response.status;
        console.log(statusCode)
        if (statusCode!=="Error"){
          setECard(false);
          setOtp(true);
        } 
        else{
          setStatus("error");
        }
    }
    catch(error) {
      setStatus("error");     
    };
  }
 

  const codeClickHandler= async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{

      const response = await fetch(`${API_URL}/api/v1/auth/verifyResetCode`,{
        method: "POST",
        headers : new Headers( {  'content-type' : 'application/json' } ),
        body: JSON.stringify({
          resetCode: OTPvalue,
        }),
      }) 
      
      const statusCode = response.status;
      if (statusCode===200){
        setLoading(false)
        setOtp(false)
        setReset(true)
      } 
     
   
      
    }catch (error) { 
      setLoading(false); 
      }
  }

  const passwordClickHandler=async(e)=> {
    e.preventDefault();
    setLoading(true);
    try{

      const response = await fetch(`${API_URL}/api/v1/auth/setPassword`,{
        method: "POST",
        headers : new Headers( {  'content-type' : 'application/json' } ),
        body: JSON.stringify({
          email:email,
          newPassword: newPassword,
        }),
      }) 
      
      const statusCode = response.status;
      if (statusCode===200){
        setLoading(false)
      } 
     
   
      
    }catch (error) { 
      setLoading(false); 
      }
  }

  const resendCode=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const response = await fetch(`${API_URL}/api/v1/auth/resendVerifyCode`,{
        method: "POST",
        headers : new Headers( {  'content-type' : 'application/json' } ),
        body: JSON.stringify({
          email: email,
        }),
      }) 
      
      const statusCode = response.status;
      if (statusCode===200){
        setLoading(true);  
      }       
      else{}
    }catch (error) { 
      setLoading(false); 
    }
  }

  const handleChangeEmail = (newValue) => {
    setEmail(newValue);
  };

  const handleChangePassword =(value)=>{
    setPassword(value);
  }

  const onChangeOtpValue = (value) => {
    const otpValue = (value.otp || []).join('');
    setOTPValue(otpValue)
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
   
          <Input placeHolder={"eg.moha riade17@gmail.com"} Status={status} inputValue={email} onInputChange={handleChangeEmail}  ></Input>
        </div>
          <Button text={"Continue"}  onclick={EmailClickHandler}></Button>
      </div> 

        
     <div className={`${style.form} ${!OTPvisible ? styles.Notvisible : ''}`}>
        <h1 className={style.welcome}>Reset Your Password</h1>
        <p className={styles.weveSentACode}>We've sent a code to [email address] to verify your account</p> 
        <div className={style.Same_input}>
          <p className={style.enter_Data}>Enter PIN Code</p>

         <OTP handleFinish={onChangeOtpValue}/>
         
         <button className={style.informationHolder} onClick={resendCode} >Didn't receive a code?</button>
            
            </div>
            <Button text={"Continue"}  onclick={codeClickHandler}></Button>
            </div> 
        <div className={`${style.form} ${!resetCardVisible ? styles.Notvisible : ''}`}>
        <h1 className={style.welcome}>Reset Your Password</h1>
        <p className={styles.weveSentACode}>Enter your email address and we'll send you instructions to reset your password</p> 
        <div className={style.Same_input}>
        <p className={style.enter_Data}>Enter new password</p>
   
        <Input_Password placeHolder={"eg.moha riade17@gmail.com"}  inputValue={newPassword} onInputChange={handleChangePassword} ></Input_Password>
     
            </div>
            <Button text={"Continue"}  onclick={passwordClickHandler}></Button>
            </div> 

        </section>
 
        
   

    </div>
    
    
  )
}

export default ForgotPassword
