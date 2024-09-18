// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import { THEME } from "@excalidraw/excalidraw";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(THEME.LIGHT);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || THEME.LIGHT;
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
