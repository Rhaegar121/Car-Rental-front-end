import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';

export default function Navbar() {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleHamburgerClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleMenuLinkClick = () => {
    setIsMenuActive(false);
  };

  const handleHamburgerKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleHamburgerClick();
    }
  };

  return (
    <nav>
      <div
        id="hamburger_menu"
        className={`hamburger_menu ${isMenuActive ? 'active' : ''}`}
        onClick={handleHamburgerClick}
        onKeyDown={handleHamburgerKeyDown}
        role="button"
        tabIndex={0}
      >
        <span className="line" />
        <span className="line" />
        <span className="line" />
      </div>

      <ul className={`nav_menu ${isMenuActive ? 'active' : ''}`}>
        <Link className="logo" to="/" onClick={handleMenuLinkClick}>
          Car Rental
        </Link>
        <div className="menu_links_wrapper">
          <li>
            <Link className="menu_link" to="/" onClick={handleMenuLinkClick}>
              Cars
            </Link>
          </li>
          <li>
            <Link className="menu_link" to="/favorites" onClick={handleMenuLinkClick}>
              Favorites
            </Link>
          </li>
        </div>
        <li className="button_wrapper">
          <Link className="sign_out_button" to="/" onClick={handleMenuLinkClick}>
            Sign Out
          </Link>
        </li>
      </ul>
    </nav>
  );
}
