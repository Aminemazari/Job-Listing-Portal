import logo from './logo.svg';
import LogIn from './Authentication/LogIn/LogIn';
import SignUp from './Authentication/SignUp/SignUp'
import OTP from './Authentication/SignUp/OTP';
import { Route, BrowserRouter as Router , Routes } from 'react-router-dom'; 
function App() {
  return (
    <Router>
      
    <Routes>
      <Route path="/" element={<SignUp/>}/>
      <Route path="/login" element={<LogIn></LogIn>}/>
      <Route path="/email-verification" element={<OTP></OTP>}/>
      </Routes>
      </Router>
  );
}

export default App;
