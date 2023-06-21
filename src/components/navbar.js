import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../redux/userSlice';
import '../styles/navbar.css';

export default function Navbar() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleAddCarClick = () => {
    navigate('/add_car');
  };

  const handleLogoutClick = () => {
    dispatch(logOutUser());
    localStorage.clear();
    setIsMenuActive(false);
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
        <Link
          className="logo"
          to="/main"
          onClick={handleMenuLinkClick}
        >
          Car Rental
        </Link>
        <div className="menu_links_container">
          <div className="menu_links_wrapper">
            <li>
              <Link className="menu_link" to="/main" onClick={handleMenuLinkClick}>
                Cars
              </Link>
            </li>
            <li>
              <Link className="menu_link" to="/favourites" onClick={handleMenuLinkClick}>
                Favourites
              </Link>
            </li>
            <li>
              <Link className="menu_link" to="/delete_car" onClick={handleMenuLinkClick}>
                Delete Car
              </Link>
            </li>
            <li>
              <button className="menu_link add_new_car_link" type="button" onClick={handleAddCarClick}>
                Add New Car
              </button>
            </li>
          </div>
          <li className="button_wrapper">
            <Link className="sign_out_button" to="/" onClick={handleLogoutClick}>
              Sign Out
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
