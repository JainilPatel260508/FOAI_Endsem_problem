import { useState, useEffect } from 'react';
import useStore from '../store/useStore';

/**
 * Custom hook to manage the dark/light theme
 */
export const useTheme = () => {
  const { theme, toggleTheme } = useStore();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return { theme, toggleTheme };
};
