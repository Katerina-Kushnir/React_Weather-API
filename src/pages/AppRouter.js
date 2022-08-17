import React, { Suspense } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import '../App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Home/Home';
import Switch from '@mui/material/Switch';

export const ThemeContext = React.createContext('light');

export const AppRouter = () => {

  const themeModeHasChanged = useCallback((event) => {
    console.log('event:', event.target.checked)
    setCurrentTheme(event.target.checked ? 'light' : 'dark')
  }, [])
  const [currentTheme, setCurrentTheme] = useState("light");

  return (
    <Suspense fallback="...Loading">
      <ThemeContext.Provider value={currentTheme}>
        <div id={currentTheme} >
          <nav>
            <Switch defaultChecked onChange={themeModeHasChanged} />
          </nav>
          <Routes>
            <Route path="/*" element={<Home />} />
          </Routes>
        </div>
      </ThemeContext.Provider>
    </Suspense>
  );
}
