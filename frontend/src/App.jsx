import './App.css';
import Approutes from './Approutes';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signuppage from './pages/Signuppage';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const App = () => {
  return (
    <Router>
      <Approutes />
    </Router>
  );
};

export default App;