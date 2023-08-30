import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillCar, AiTwotoneHeart, AiOutlineDelete } from 'react-icons/ai';
import { IoAddCircleOutline } from 'react-icons/io5';
import { BiLogOut } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../redux/userSlice';
import logo from '../assets/logo-white.png';
import '../styles/navbar.css';

const Navbar = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
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
      <div className="navbar">
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

        <div className="nav-links">
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
          <div className="ver-line" />
          {userData ? (
            <Link className="nav-link" to="/" onClick={handleLogoutClick}>
              Log Out
            </Link>
          ) : (
            <Link className="nav-link" to="/signin">
              Log In
            </Link>
          )}
        </div>
      </div>

      <div className={`nav_menu ${isMenuActive ? 'active' : ''}`}>
        <Link
          className="logo"
          to="/"
          onClick={handleMenuLinkClick}
        >
          <img src={logo} alt="logo" className="logo-img" />
        </Link>
        <ul className="menu_links_wrapper">
          <li>
            <Link className="menu_link" to="/" onClick={handleMenuLinkClick}>
              <AiFillCar className="nav-icon" />
              Available Cars
            </Link>
          </li>
          <li>
            <Link className="menu_link" to={userData ? '/favourites' : '/signup'} onClick={handleMenuLinkClick}>
              <AiTwotoneHeart className="nav-icon" />
              My Reservations
            </Link>
          </li>
          <li>
            <Link className="menu_link" to={userData ? '/delete_car' : '/signup'} onClick={handleMenuLinkClick}>
              <AiOutlineDelete className="nav-icon" />
              Delete a Car
            </Link>
          </li>
          <li>
            <Link className="menu_link" to={userData ? '/add_car' : '/signup'} onClick={handleAddCarClick}>
              <IoAddCircleOutline className="nav-icon" />
              Add a new Car
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
