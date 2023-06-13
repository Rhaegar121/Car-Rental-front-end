import React from 'react';
import { Link } from 'react-router-dom';

const Body = () => (
  <header className="header">
    <span className="header-title">Book or Rent Out Your Favourite Car</span>
    <div className="header-book-btn-space">
      <span className="header-book-btn">
        <Link to="/signin" className="link-sign">Sign In</Link>
      </span>
      <span className="space">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span className="header-book-btn-signup">
        <Link to="/signup" className="link-sign">Sign Up</Link>
      </span>
    </div>
  </header>
);

export default Body;
