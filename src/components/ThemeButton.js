import React from "react";
import { Button } from 'react-bootstrap';
import { ReactComponent as MoonLight } from "../assets/moon-stars-fill-light.svg";
import { ReactComponent as SunLight } from "../assets/sun-fill-light.svg";
import { useTheme } from './ThemeContext';

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
        <symbol id="sun-fill-light" viewBox="0 0 16 16">
          <SunLight />
        </symbol>
        <symbol id="moon-stars-fill-light" viewBox="0 0 16 16">
          <MoonLight />
        </symbol>        
      </svg>
  
      <div className="bd-mode-toggle">
        <Button 
          variant="primary" 
          id="bd-theme" 
          className="p-2 d-flex align-items-center justify-content-center"
          onClick={toggleTheme}
        >
          <svg className={`bi theme-icon ${theme}-theme-icon`} width="1.25em" height="1.25em">
            <use href={theme === 'light' ? '#sun-fill-light' : '#moon-stars-fill-light'}></use>
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ThemeButton;
