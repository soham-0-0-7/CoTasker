import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signuppage from './pages/Signuppage';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const Approutes = () => {
  // const [ok,setOK] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    function verify(){
      const token = localStorage.getItem("token");
            if (token) {
              const decoded = jwtDecode(token);
              const currentTime = Date.now() / 1000; // in seconds
              
              if (decoded.exp > currentTime) {
                // window.location.href = '/dashboard';
                navigate('/dashboard');
              }else{
                navigate("/")
              }
            }
    }

    verify();
  },[navigate])
  // const userEmail = Cookies.get("user_email");

  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/" element={  <Signuppage />} />
        <Route path="/dashboard" element={ <Dashboard /> }/>
      </Routes>
    // {/* </BrowserRouter> */}
  );
};

export default Approutes;