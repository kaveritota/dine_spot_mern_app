 import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import logo from "../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('userToken');

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img src={logo} alt="DineSpot Logo" /></Link>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={menuOpen ? "bar rotate-bar1" : "bar"}></span>
        <span className={menuOpen ? "bar fade-bar2" : "bar"}></span>
        <span className={menuOpen ? "bar rotate-bar3" : "bar"}></span>
      </div>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/home" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
        <li><Link to="/my-bookings" onClick={closeMenu}>My Bookings</Link></li>

        {/* Auth buttons in mobile menu */}
        <li className="mobile-auth">
          {isLoggedIn ? (
            <button className="btn logout-btn" onClick={() => { handleLogout(); closeMenu(); }}>Logout</button>
          ) : (
            <>
              <Link to="/" className="btn login-btn" onClick={closeMenu}>Login</Link>
              <Link to="/register" className="btn signup-btn" onClick={closeMenu}>Sign Up</Link>
            </>
          )}
        </li>
      </ul>

      {/* Auth buttons for desktop */}
      <div className="navbar-auth">
        {isLoggedIn ? (
          <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/" className="btn login-btn">Login</Link>
            <Link to="/register" className="btn signup-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
