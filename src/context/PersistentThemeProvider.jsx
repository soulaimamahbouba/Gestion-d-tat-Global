import { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const STORAGE_KEY = 'app_theme';

function readTheme() {
  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    return savedTheme === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export default function PersistentThemeProvider({ children }) {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((previousTheme) => (previousTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
