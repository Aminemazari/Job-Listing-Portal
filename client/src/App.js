import logo from './logo.svg';
import LogIn from './Authentication/LogIn/LogIn';
import SignUp from './Authentication/SignUp/SignUp'
import ForgotPassword from './Authentication/LogIn/ForgotPassword';
import { Route, BrowserRouter as Router , Routes } from 'react-router-dom'; 
function App() {
  return (
    <Router>
      
    <Routes>
      <Route path="/" element={<SignUp/>}/>
      <Route path="/login" element={<LogIn></LogIn>}/>
      <Route path="/Forgot-Password" element={<ForgotPassword></ForgotPassword>}/>
      </Routes>
      </Router>
  );
}

export default App;
