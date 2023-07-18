import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Components/Login/LoginPage';
import AuthenticatePage from './Components/Login/AuthenticatePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<App />}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/authenticate" element={<AuthenticatePage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
