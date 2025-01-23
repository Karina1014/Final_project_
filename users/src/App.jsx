import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import { Login } from './pages/Login';
import  DashboarUser  from './pages/DashboarUser';
import { ResetPassword } from './pages/ResetPassword';
import EmailVerify from './pages/EmailVerify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/email-verify' element={<EmailVerify/>}></Route>
        <Route path='/reset-password' element={<ResetPassword/>}></Route>
        <Route path='/dashboarUser' element={<DashboarUser/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
