import React  from 'react'
import style from "./virification.module.css"
import OTP from "../../component/OTP"
import Secondary_button from "../../component/Secondary_button"
import ValidAllert from '../../component/ValidAllert.js';
import { useState,useEffect } from 'react'
import API_URL from '../../component/API_URL.js';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom'
import value from "../../component/OTP"
const Virification_Form = ({confirme,UserEmail}) => {
  const [isTagForm,setTagForm]=useState(false); 
  const [isVisible, setIsVisible] = useState(false);
  const [isVerified,setVirification]=useState(false);
  const [animate,setAnimate]=useState(false);
  const [loading ,setLoading]= useState(false);

  useEffect(() => {
    if (confirme) {
      setIsVisible(true);
    }
  }, [confirme]);

 const clickHandler= async (e)=>{
    e.preventDefault();
    setLoading(true);
    try{

      const response = await fetch(`${API_URL}/api/v1/auth/verifyCode`,{
        method: "POST",
        headers : new Headers( {  'content-type' : 'application/json' } ),
        body: JSON.stringify({
          verifyCode: otp,
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
          email: UserEmail,
        }),
      }) 
      
      const statusCode = response.status;
      if (statusCode===200){
        setLoading(true);  
      } 
     
   
      
    }catch (error) { 
      setLoading(false); 
      }
    
 


  }
  const isVirificationForm = classNames(
    style.verificationForm,
    { [style.NotactiveClass]: confirme },
  );

  const [otp, setOTP] = useState('');

  const onChangeOtpValue = (value) => {
    const otpValue = (value.otp || []).join('');
    setOTP(otpValue)

  };

  return (
    <>
    <div className={isVirificationForm} >
      
    <h1 className={style.verify}>Verify Your Account</h1>
    <p className={style.weveSentACode}>We've sent a code to {`[${"UserEmail"}]` } to verify your account</p>
    <section className={style.verificationProcess}>
      <p className={style.enterPin}>Enter PIN Code</p>
      <OTP handleFinish={onChangeOtpValue}  />

        <button className={style.didntReceiveACode} onClick={resendCode}>Didn't receive a code?</button>
    </section>

    <mark className={`${style.animatedDiv} ${animate ? style.visible : ''}`}>
    <ValidAllert> </ValidAllert> 
    </mark>
    

         <Secondary_button text={"Continue"} onclick={clickHandler}/>    
    </div>
    
    
    </>

  )
}

export default Virification_Form
