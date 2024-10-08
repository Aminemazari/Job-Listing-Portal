import React,{useState,useEffect} from 'react'
import style from "./style.module.css"
import Button from '../../component/CTA_Button'
import Input from '../../component/Input_Fields'
import Input_Password from "../../component/Input_password"
import API_URL from '../../component/API_URL'
import withGithub from "../assets/withGithub.svg"
import withGoogle from "../assets/withGoogle.svg"
import withLinkdln from "../assets/withLinkdln.svg"
import logo from "../assets/WhiteLogo.svg" 
import axios from 'axios';

import { Navigate, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const LogIn = () => {
  const Navigate=useNavigate();
  const [animate, setAnimate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status,setStatus] = useState("");
  const [loading ,setLoading]= useState(false);
  
  useEffect(() => {
    setAnimate(true); // Trigger animation on mount
}, []);
  const loginClickHandler = async (e) => {
    Navigate("/home");
    e.preventDefault();
    setLoading(true);

    
    try{
       const response = await fetch(`${API_URL}/api/v1/auth/signIn`,{
        method: "POST",
        headers : new Headers( {  
          'content-type' : 'application/json',
         } ),
        body: JSON.stringify({
          email: email,
          password: password,
   
        }),
      })
      const statusCode = response.status;
      if (statusCode===200){
        Navigate("/")
        setLoading(false);
       }
      else{
        setStatus("error");
        setLoading(false);
      }
        
     
    }
      catch(error) {

        setStatus("error");
        setLoading(false);
      }
     
        
  }
  const continueWithGoogle=async(e)=>{
    e.preventDefault();
    setLoading(true);
    window.location.href = `${API_URL}/api/v1/auth/google/`;
  }
  const continueWithLinkdln=async(e)=>{
    e.preventDefault();
    setLoading(true);
    window.location.href = `${API_URL}/api/v1/auth/linkedin`;
  }
  
  

  const handleChangeEmail = (newValue) => {
    setStatus("");
    setEmail(newValue);
  };

  const handleChangePassword = (newValue) => {
    setStatus("");
    setPassword(newValue);
  };
  const signupClickHandler =(e)=>{
    e.preventDefault();
    Navigate("/SignUp")
  }

  return (
    <>
      {loading && ( 
        <Box sx={{ width: '100%' }}>
        <LinearProgress />
        </Box>  

      )}
    <div className={`${style.hero} ${animate ? style.animate : ''}`}>
       
      <section className={style.textSide}>
       
         <div className={style.connection}>
          <h1 className={style.TeamUp_connects}> HireMe place to find your futer job</h1>
          <p className={style.dont_have_account}>Don't have an account yet? Sign Up Here</p>
         <Button text={"Sign Up"} onclick={signupClickHandler}></Button>
         </div>
      </section>

      <section className={style.formSide}>

        <div className={style.form}>
        <h1 className={style.welcome}>Welcome Back!</h1>
        <div className={style.Same_input}>
          <p className={style.enter_Data}>Enter your email</p>
         <Input placeHolder={"eg.moha riade17@gmail.com"} Status={status} inputValue={email} onInputChange={handleChangeEmail} ></Input>
        </div>
        <div className={style.Same_input}>
          <p className={style.enter_Data}>Enter your password</p>
          <Input_Password  Status={status} inputValue={password} onInputChange={handleChangePassword}></Input_Password>
          <a href='/forgotpassword' className={style.informationHolder}>Forgot password?</a>
          
        </div>
       
        <Button text={"LOG IN"}  onclick={loginClickHandler}></Button>
        <p className={style.or}>Or continue With</p>

        <div className={style.socialMedia}>
          <button className={style.socialImag}  onClick={continueWithGoogle}><img src={withGoogle} ></img></button>
          <button className={style.socialImag} onClick={continueWithLinkdln}> <img src={withLinkdln} /></button>
        </div>

        </div>

      </section>
    </div>
    </>
  )
}

export default LogIn