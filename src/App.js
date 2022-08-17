import React from 'react';
import { useSelector } from 'react-redux';
import { isRegistered } from './Store/Register/selector';
import { AppRouter } from './pages/AppRouter';
import { RegisterRouter } from './pages/Register/RegisterRouter';
import './App.css'

export const App = () => {
  const isAppRegistered = useSelector(isRegistered);
  return isAppRegistered ? <AppRouter /> : <RegisterRouter />
}