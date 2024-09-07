import React from 'react'
import { useState } from "react";
import { Button, Form,Input } from "antd";
import style from "./style.module.css";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCardBody,
    MDBCard,
  
  }
  from 'mdb-react-ui-kit';
import OTP from '../../component/OTP';
const ForgotPassword = () => {
    window.addEventListener('load', () => {
        const overlay = document.querySelector(`.${style.ForgotPassword}`);
        overlay.classList.add(style.show);
      });
  const [form] = Form.useForm();
  const [OTPvisible,setOtp]=useState(false);
  const [emailCardVisible,setECard]=useState(true);
  const [resetCardVisible,setReset]=useState(false);
  const submitEmail=()=>{
    setECard(false);
    setOtp(true);
    }
  const submitCode=()=>{
    console.log("fhdksj")
    setOtp(false);
    setReset(true);
  }
  const submitPassword=()=>{

  }
  return (
    <div>
       <main className={emailCardVisible ? style.ForgotPassword : style.notVisible}>
      <section className={style.card}>
        <div className={style.verification_txt }>
                <h2 className={style.Enter_Verification_Code_text}>Reset Your Password</h2>
                <p className={style.code_sent}>Enter your email address and we'll send you instructions to reset your password</p>  
        </div>
        <Form form={form}  style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
          <Form.Item
         style={{width:"70%"}}
          > 
          <MDBInput label='Your Email' id='form2' type='email' size="lg" placeholder='john@exmple.com'/>
          </Form.Item>
          <Form.Item  noStyle>
            <Button block htmlType="submit" type="primary" size="large"
             onClick={submitEmail}
             style={{
                maxWidth:"200px",  
            }}>
              Continue
            </Button>
          </Form.Item>
         

        </Form>
      </section>
    </main>
    <main className={OTPvisible ? style.visible : style.notVisible}>
        <OTP onSubmit={submitCode}/>
    </main>
    <main className={resetCardVisible ? style.restPassword : style.visible}>
    <section className={style.card}>
        <div className={style.verification_txt }>
                <h2 className={style.Enter_Verification_Code_text}>Create a new password</h2>
                <p className={style.code_sent}>Please choose a password that hasn't been used before</p>  
        </div>
        <Form form={form}  style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
          <Form.Item
         style={{width:"70%"}}
          > 
          <MDBInput label='New password' id='form2' type='password' size="lg" placeholder='password'/>
          </Form.Item>
          <Form.Item  noStyle>
            <Button block htmlType="submit" type="primary" size="large"
             onClick={submitPassword}
             style={{
                maxWidth:"200px",  
            }}>
              Reset password
            </Button>
          </Form.Item>
         

        </Form>
      </section>
    </main>
    
    </div>
  )
}

export default ForgotPassword
