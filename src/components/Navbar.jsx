import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const totalCount = useSelector((state) => state.cart.totalCount);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>
          <span className="brand-icon" aria-hidden="true">⚡</span>
          TechStore <span className="badge-mern">MERN S6</span>
        </h2>
      </div>

      <div className="nav-actions">
        <button className="btn-theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Mode Sombre' : '🌞 Mode Clair'}
        </button>

        <div className="cart-badge">
          <span aria-hidden="true">🛒</span>
          <span className="badge-count">{totalCount}</span>
        </div>
      </div>
    </nav>
  );
}
