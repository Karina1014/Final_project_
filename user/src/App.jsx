import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import { Login } from './pages/Login';
import  DashboarUser  from './pages/DashboarUser';
import { ResetPassword } from './pages/ResetPassword';
import  Admin  from './pages/Admin';

import  CreateDog from "./pages/CreateDog";
import  ListDog from "./pages/ListDog";
import {CreateUser }from "./pages/CreateUser";
import {ListUser } from "./pages/ListUser";

import EmailVerify from './pages/EmailVerify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
const App = () => {
  const urlLogin = "http://localhost:3011";  // Backend URL
  const url = "http://localhost:4000";  // Backend URL
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login url={urlLogin}/>}></Route>
        <Route path='/email-verify' element={<EmailVerify/>}></Route>
        <Route path='/reset-password' element={<ResetPassword/>}></Route>
        <Route path='/dashboarUser' element={<DashboarUser/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        
         
        <Route path="/create-user" element={<CreateUser url={url} />} />
        <Route path="/list-users" element={<ListUser url={url} />} />
        <Route path="/create-dog" element={<CreateDog url={url} />} />
        <Route path="/list-dog" element={<ListDog url={url} />} />
      </Routes>
    </div>
  );
};

export default App;
