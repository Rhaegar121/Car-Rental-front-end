import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AiFillCar, AiTwotoneHeart, AiOutlineDelete, AiOutlineMail, AiFillStar,
} from 'react-icons/ai';
import { IoAddCircleOutline } from 'react-icons/io5';
import { BiLogOut } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../redux/userSlice';
import logo from '../assets/logo-white.png';
import logo1 from '../assets/logo.png';
import '../styles/navbar.css';

const Navbar = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [isMenuActive, setIsMenuActive] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleHamburgerClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleHamburgerKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleHamburgerClick();
    }
  };

  const handleLogoutClick = () => {
    dispatch(logOutUser());
    localStorage.clear();
    setIsMenuActive(false);
  };

  return (
    <nav>
      {/* navbar */}
      <div className="navbar">
        <div className="nav">
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
          <div className="nav-logo">
            <img src={logo1} alt="logo" className="nav-logo-img" />
          </div>
        </div>

        {userData ? (
          <div className="nav-links">
            <Link className="nav-link" to="/" onClick={handleLogoutClick}>
              Log Out
            </Link>
          </div>
        ) : (
          <div className="nav-links">
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
            <div className="ver-line" />
            <Link className="nav-link" to="/signin">
              Log In
            </Link>
          </div>
        )}
      </div>

      {/* nav menu */}
      <div className={`nav_menu ${isMenuActive ? 'active' : ''}`}>
        <Link
          className="logo"
          to="/"
        >
          <img src={logo} alt="logo" className="logo-img" />
        </Link>
        <ul className="menu_links_wrapper">
          <li>
            <Link
              className={`menu_link ${location.pathname === '/' ? 'activeLink' : null}`}
              to="/"
            >
              <AiFillCar className="nav-icon" />
              Available Cars
            </Link>
          </li>
          <li>
            <Link
              className={`menu_link ${location.pathname === '/favourites' ? 'activeLink' : null}`}
              to={userData ? '/favourites' : '/signup'}
            >
              <AiTwotoneHeart className="nav-icon" />
              My Reservations
            </Link>
          </li>
          <li>
            <Link
              className={`menu_link ${location.pathname === '/delete_car' ? 'activeLink' : null}`}
              to={userData ? '/delete_car' : '/signup'}
            >
              <AiOutlineDelete className="nav-icon" />
              Delete a Car
            </Link>
          </li>
          <li>
            <Link
              className={`menu_link ${location.pathname === '/add_car' ? 'activeLink' : null}`}
              to={userData ? '/add_car' : '/signup'}
            >
              <IoAddCircleOutline className="nav-icon" />
              Add a new Car
            </Link>
          </li>
          <li className="nav-line" />
          <li>
            <Link
              className="menu_link"
              to="mailto:kaungmyatkyaw7012@gmail.com"
              target="_blank"
            >
              <AiOutlineMail className="nav-icon" />
              Contact us
            </Link>
          </li>
          <li>
            <Link
              className="menu_link"
              to="https://github.com/Rhaegar121/Car-Rental-front-end"
              target="_blank"
            >
              <AiFillStar className="nav-icon" />
              Give us a star!
            </Link>
          </li>
        </ul>
        {userData ? (
          <Link className="sign_out_button" to="/" onClick={handleLogoutClick}>
            <BiLogOut className="signout-icon" />
            Sign Out
          </Link>
        ) : (
          <Link className="sign_out_button" to="/signin">
            <BiLogOut className="signout-icon" />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
