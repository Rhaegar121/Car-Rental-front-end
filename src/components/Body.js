import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-white.png';
import '../styles/body.css';

const Body = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      navigate('/main');
    }
  }, [userData, navigate]);

  return (
    <header className="body-header">
      <div className="header-logo">
        <img className="header-logo-img" src={logo} alt="logo" />
      </div>
      <span className="header-title">Book or Rent Out Your Favourite Car</span>
      <div className="header-book-btn-space">
        <span className="header-book-btn">
          <Link to="/signin">Sign In</Link>
        </span>
        <span className="header-book-btn">
          <Link to="/signup">Sign Up</Link>
        </span>
      </div>
    </header>
  );
};

export default Body;
