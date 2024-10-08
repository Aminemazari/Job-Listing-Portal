import logo from './logo.svg';
import LogIn from './Authentication/LogIn/LogIn';
import SignUp from './Authentication/SignUp/SignUp'
import RoleSetup from './Authentication/LogIn/RoleSetup.js';
import Virification_Form from './Authentication/SignUp/Virification_Form.js';
import ForgotPassword from './Authentication/LogIn/ForgotPassword';
import { Route, BrowserRouter as Router , Routes } from 'react-router-dom'; 
import {ConfigProvider} from 'antd';
import FindJob from './Home/FindJob.js';
import PostJob from './Home/PostJob.js';
import Home from './Home/Home.js';
function App() {
  return (
    <>
    <ConfigProvider
   theme={{
     token: {
       // Seed Token
       colorPrimary: '#6300B3',
       fontFamily: '"Poppins", sans-serif', // Use Poppins font
       
       // Alias Token
     },
   }}
 >
    <Router>
      
    <Routes>
      <Route path="/find-job" element={<FindJob/>}/>
      <Route path="/employers" element={<PostJob/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/login" element={<LogIn></LogIn>}/>
      <Route path="/virification_Form" element={<Virification_Form></Virification_Form>}/>
      <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>}/>
      <Route path="/roleSetup" element={<RoleSetup/>}/>
      <Route path="/home" element={<Home/>}/>

      </Routes>
      </Router>
      </ConfigProvider>
      </>
  );
}

export default App;
