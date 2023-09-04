import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { FiUser, FiLock } from 'react-icons/fi';
import { loginUser } from '../redux/userSlice';
import logo from '../assets/logo-white.png';
import '../styles/form.css';

const SignInComponent = () => {
  const [email, setEmail] = useState('');
  const [passsword, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const handleSignIn = async () => {
    dispatch(loginUser({ email, passsword }));
  };

  useEffect(() => {
    if (userData.status === 'loading') {
      setLoading(true);
    } else if (userData.status === 'logged in successfully') {
      navigate('/');
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, [userData, navigate]);

  return (
    <div className="form">
      {userData.status === 'error' ? <p className="error">{userData.error}</p> : null}
      <h1 className="form-title">Welcome, please sign in to continue</h1>
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo-img" />
      </div>
      <div className="inputs">
        <div className="input">
          <FiUser className="icon" />
          <input
            className="email-input"
            type="email"
            placeholder="EMAIL OR USERNAME"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <FiLock className="icon" />
          <input
            className="password-input"
            type="password"
            placeholder="PASSWORD"
            value={passsword}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="btn primary-btn"
          type="button"
          onClick={handleSignIn}
        >
          {userData.status === 'loading' ? <BeatLoader loading={loading} color="#fff" size={9} /> : 'Sign In'}
        </button>
        <div className="links">
          <Link to="/signup" className="secondary-btn">New to CarRental? Sign up now</Link>
          <Link to="/" className="secondary-btn">Back to home page</Link>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
