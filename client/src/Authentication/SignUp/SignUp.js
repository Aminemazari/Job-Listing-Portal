import React, { useState ,useEffect} from 'react'
import style from "./style.module.css"
import Secondary_button from '../../component/Secondary_button'
import Input from "../../component/Input_Fields"
import Input_password from '../../component/Input_password'
import google from "../assets/google.svg"
import github from "../assets/github.svg"
import linkdln from "../assets/linkdln.svg"
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Virification_Form from './Virification_Form'
import API_URL from '../../component/API_URL'
import { Select, Space } from 'antd';
import jobImage from "../assets/briefcase-icon.svg";
import employerImg from "../assets/employment-icon.svg"

const SignUp = () => {  
  const Navigate=useNavigate();
  const [status,setStatus]=useState("");
  const [loading ,setLoading]= useState(false);
  const [isVisibale,setVisibale]=useState(false);
  const [isVirification_Form,setVirification_Form]=useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role,setRole]=useState("seeker");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
      setAnimate(true); // Trigger animation on mount
  }, []);

  const handleChange = (value) => {
    console.log(value)
    setRole(value)
  };

const SingUphandleClick = async (e)=>{
  Navigate("/employers");
  e.preventDefault();
  setLoading(true);
  try{
    const response = await fetch(`${API_URL}/api/v1/auth/signup`,{
      method: "POST",
      headers : new Headers( { 
         'content-type' : 'application/json',
        } ),
      body: JSON.stringify({
        username:userName, 
        email: email,
        password: password,
        role:role,
        confirmPassword:password,
      }),
    })
    const statusCode = response.status;
   if (statusCode===200){
    setVisibale(true);
    setVirification_Form(true);
    setLoading(false);
   }
  else{
    setLoading(false);
    setStatus("error");
  }
    

    }catch (error) { 
      setLoading(false);
      setStatus("error");
    }

}
const handleChangeEmail = (newValue) => {
 
  setEmail(newValue);
};

const handleChangePassword = (newValue) => {
 
  setPassword(newValue);
};
const handleChangeUserName = (newValue) => {
  setUserName(newValue);
};
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












const isSignUpForm = classNames(
  style.form,
  { [style.singUpFormNotVisible]: isVisibale },
);

const isButton =
classNames(
  style.visibilityOfSignUpButton,
  { [style.ButtonNotVisibale]: isVisibale },
);

  const LogInhandleClick =(e)=>{
    e.preventDefault();
    Navigate("/login");
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
        <main className={style.description}>
           <h1 className={style.GrowYourTeam}>Achieve your dreams</h1>
          <p className={style.dont_have_account}>Already Have An Account ! Sign In Here</p>
          <mark className={isButton}>
            <Secondary_button border={true} text={"LOG IN"} onclick={LogInhandleClick}></Secondary_button>
          </mark>
        </main>
      </section>
      <section className={style.formSide}>
        {/* the form that will shows when you enter the sign up page */}
     <main className={isSignUpForm}>
        <h1 className={style.creatYourAccount}>Create Your Account.</h1>
        <div className={style.Same_input}>
          <p className={style.enter_Data}>Enter your name</p>
          <Input placeHolder={"Mazari Amine"} inputValue={userName} onInputChange={handleChangeUserName} Status={status}></Input>
        </div>
        <div className={style.Same_input}>
          <p className={style.enter_Data}>Enter your email</p>
          <Input placeHolder={"eg.mazariamine095@gmail.com"} inputValue={email} onInputChange={handleChangeEmail} Status={status}></Input>
        </div>
        <div className={style.Same_input}>
          <p className={style.enter_Data}>Enter your password</p>
          <Input_password InputValue={password} onInputChange={handleChangePassword}  Status={status}></Input_password>
        </div>
        <div className={style.Same_input}>
        <Select
    defaultValue="seeker"  // Set the default value to "Employer" (or "Job Seeker" if needed)
    style={{ width: "100%" }}
    size='large'
    onChange={handleChange}
    options={[
      {
        value: 'seeker',
        label: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img 
              src={jobImage} 
              alt="Job Seeker"
              style={{ width: 21, height: 21, marginRight: 8, textAlign: "center" }} 
            />
            Job Seeker
          </div>
        ),
      },
      {
        value: 'employer',
        label: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img 
              src={employerImg} 
              alt="Employer"
              style={{ width: 21, height: 21, marginRight: 8, textAlign: "center" }} 
            />
            Employer
          </div>
        ),
      },
    ]}
  />
        </div>
       
        <Secondary_button text={"SIGN UP"} border={false} onclick={SingUphandleClick}></Secondary_button>

        <p className={style.or}>Or continue With</p>

        <section className={style.socialMedia}>
          <button className={style.socailMediaButton} onClick={continueWithGoogle}>  <img src={google}  /></button>
          <button className={style.socailMediaButton} onClick={continueWithLinkdln}> <img src={linkdln}  /></button>
        </section>

     </main>
       {/* the form that will shows when you click to sign up  */}
       <Virification_Form confirme={isVisibale} UserEmail={email} password={password}/>
    
     
   

      </section>
    </div>
    </>
  )
}

export default SignUp