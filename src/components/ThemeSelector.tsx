import React from 'react';

import { useTheme } from '../contexts/ThemeContext';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-4">
      <span className="font-medium">Theme:</span>
      <div className="flex gap-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="theme"
            value="light"
            checked={theme === 'light'}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
          />
          Light
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={theme === 'dark'}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
          />
          Dark
        </label>
      </div>
    </div>
  );
};

export default ThemeSelector;
