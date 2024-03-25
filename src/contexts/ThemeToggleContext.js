import React, { createContext, useState } from 'react';

const ThemeToggleContext = React.createContext({});

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
  
    const toggleTheme = () => {
      setIsDarkTheme(prevTheme => !prevTheme);
    };
  
    return (
      <ThemeToggleContext.Provider value={{ isDarkTheme, toggleTheme }}>
        {children}
      </ThemeToggleContext.Provider>
    );
  };

export default ThemeToggleContext;