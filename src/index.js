import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Components/Login/LoginPage';
import AuthenticatePage from './Components/Login/AuthenticatePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
      
      <Routes>
      
        <Route path="*" element={<Navigate to={`/home`}/>} />
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/authenticate" element={<AuthenticatePage/>}/>
      
      </Routes>
    
    </BrowserRouter>
  
  </React.StrictMode>
);
