import logo from './logo.svg';
import LogIn from './Authentication/LogIn/LogIn';
import SignUp from './Authentication/SignUp/SignUp'

import Virification_Form from './Authentication/SignUp/Virification_Form.js';
import ForgotPassword from './Authentication/LogIn/ForgotPassword';
import { Route, BrowserRouter as Router , Routes } from 'react-router-dom'; 
function App() {
  return (
    <Router>
      
    <Routes>
      <Route path="/SignUp" element={<SignUp/>}/>

      <Route path="/" element={<SignUp/>}/>
      <Route path="/login" element={<LogIn></LogIn>}/>
      <Route path="/virification_Form" element={<Virification_Form></Virification_Form>}/>
      <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>}/>
      </Routes>
      </Router>
  );
}

export default App;
