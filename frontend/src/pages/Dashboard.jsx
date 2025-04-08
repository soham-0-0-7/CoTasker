import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import Navbar from '../componentsDashboard/Navbar';
import Eventbar from '../componentsDashboard/Eventbar';
import Errorpopup from '../errorMessage/Errorpopup';
import Taskform from '../componentsDashboard/Taskform';
import Eventform from '../componentsDashboard/Eventform';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const s = jwtDecode(localStorage.getItem("token"));
  const user = s.name;
  const useremail = s.email;
  const navigate = useNavigate();
  const [refreshEvents, setRefreshEvents] = useState(false);


  useEffect(()=>{
    function verify() {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        console.log()
        const currentTime = Date.now() / 1000; // in seconds

        if (decoded.exp < currentTime) {
          // Token expired
          localStorage.removeItem('token');
          // window.location.href = '/';
          navigate('/')
        }
      }else{
        navigate("/")
      }
    }

    verify();
  },[]);
    
  return (
    <>
      <Navbar user={user} onEventAdded={() => setRefreshEvents(prev => !prev)} />
      <Eventbar useremail={useremail} refEvents={refreshEvents} />
    </>
  );
}

export default Dashboard;