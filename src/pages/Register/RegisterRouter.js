import React from 'react';
import '../../App.css';
import { Routes, Route } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import Varification from './Varification';

export const RegisterRouter = () => {

  return (
    <div>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/varification" element={<Varification/>} />
          </Routes>
    </div>
  );
}