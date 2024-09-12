import React,{useState} from 'react'
import { useLocation } from 'react-router-dom';
import styles from "./forgotpassword.module.css"
import style from "./style.module.css"
import Button from '../../component/CTA_Button'
import jobImage from "../assets/briefcase-icon.svg";
import employerImg from "../assets/employment-icon.svg"
import API_URL from '../../component/API_URL';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Input from "../../component/Input_Fields"
const RoleSetup = () => {
    const location = useLocation();
    const searchParams   = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    const [loading ,setLoading]= useState(false);
    const [userName, setUserName] = useState(null);
    const [status,setStatus]=useState("");
    const handleChangeUserName = (newValue) => {
      setUserName(newValue);
    };

    const setRole= async (role)=>{
      if (userName){
        setLoading(true);
        try{
          const response = await fetch(`${API_URL}/api/v1/auth/setUpRole/${userId}`,{
            method: "POST",
            headers : new Headers( { 
                'content-type' : 'application/json',
              } ),
            body: JSON.stringify({
              username:userName,
              role:role
            }),
          })
          const statusCode = response.status;
          if (statusCode===200){
            setLoading(false);
          }
        }catch (error) { 
          setLoading(false);

        }
      }
      else{
        setStatus("error")
      }
    }
  return (
    <>
    {loading && ( 
  <Box sx={{ width: '100%' }}>
  <LinearProgress />
  </Box>  

)}
    <div className={styles.hero} >
       <section className={styles.textSide}>
       </section>
       <section className={styles.formSide}>
       <div className={style.form} >
          <h1 className={style.welcome}>Setup your role</h1>
          <div className={style.Same_input}>
          <p className={style.enter_Data}>Enter your name</p>
          <Input placeHolder={"Mazari Amine"} inputValue={userName} onInputChange={handleChangeUserName} Status={status}></Input>
        </div>
           <div style={{display:"flex",justifyContent:"space-between",gap:"10px",width:"100%",marginTop:"20px"}}>
            <Button text={
                      <div style={{ display: "flex", alignItems: "center",color:"black" }}>
                        <img 
                          src={jobImage} 
                          alt="Job Seeker"
                          style={{ width: 21, height: 21, marginRight: 8, textAlign: "center" }} 
                        />
                        Job Seeker
                      </div>}
                    onclick={()=>setRole("seeker")}
                    />
                  <Button 
                    text={
                      <div style={{ display: "flex", alignItems: "center",color:"black" }}>
                        <img 
                          src={employerImg} 
                          alt="Job Seeker"
                          style={{ width: 25, height: 25, marginRight: 8, textAlign: "center" }} 
                        />
                        Employer
                      </div>}
                    onclick={()=>setRole("employer")}
                    />
          
           </div>
    
      </div> 
      </section>
    </div>
    </>
  )
}

export default RoleSetup
