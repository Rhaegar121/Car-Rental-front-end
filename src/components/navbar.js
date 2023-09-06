import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AiFillCar, AiTwotoneHeart, AiOutlineDelete, AiOutlineMail, AiFillStar,
} from 'react-icons/ai';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdLogout, MdLogin } from 'react-icons/md';
import {
  FaLinkedinIn, FaFacebookF, FaGithub, FaUserCircle,
} from 'react-icons/fa';
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
          <div className={`nav-logo ${isMenuActive ? 'active' : ''}`}>
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
      <div className={`nav_menu_container ${isMenuActive ? 'active' : ''}`}>
        <div className="nav_menu">
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
            <li className="nav-line" />
            <li className="nav-footer">
              <p>Privacy Policy</p>
              <p>Terms & Conditions</p>
              <p>© 2023 CarRental™.</p>
              <p>All Rights Reserved.</p>
            </li>
            <li className="nav-info">
              <Link className="nav-info-link" to="https://www.facebook.com/linthantkhai" target="_blank">
                <FaFacebookF className="nav-info-icon" />
              </Link>
              <Link className="nav-info-link" to="https://www.linkedin.com/in/kaungmyatkyaw/" target="_blank">
                <FaLinkedinIn className="nav-info-icon" />
              </Link>
              <Link className="nav-info-link" to="https://github.com/Rhaegar121" target="_blank">
                <FaGithub className="nav-info-icon" />
              </Link>
            </li>
          </ul>
          {userData ? (
            <div className="user-info">
              <FaUserCircle className="user-info-icon" />
              <div>
                <p>{userData.name}</p>
                <p className="user-email">{userData.email}</p>
              </div>
              <abbr title="Log Out">
                <Link to="/" onClick={handleLogoutClick}>
                  <MdLogout className="signout-icon" />
                </Link>
              </abbr>
            </div>
          ) : (
            <Link className="user-info" to="/signin">
              Sign In
              <MdLogin className="signout-icon" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
