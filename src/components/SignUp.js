import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { FiUser, FiLock } from 'react-icons/fi';
import { TfiEmail } from 'react-icons/tfi';
import { registerUser } from '../redux/userSlice';
import logo from '../assets/logo-white.png';
import '../styles/form.css';

const SignUpComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const handleSignUp = async () => {
    dispatch(registerUser({
      name, email, password, passwordConfirmation,
    }));
  };

  useEffect(() => {
    if (userData.status === 'loading') {
      setLoading(true);
    } else if (userData.status === 'success') {
      navigate('/');
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, [userData, navigate]);

  return (
    <div className="form">
      {userData.status === 'error' ? <p className="error">{userData.error}</p> : null}
      <h1 className="form-title"> Welcome, please sign up or sign in to continue</h1>
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo-img" />
      </div>
      <div className="inputs">
        <div className="input">
          <FiUser className="icon" />
          <input
            className="name-input"
            type="text"
            placeholder="USERNAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input">
          <TfiEmail className="icon" />
          <input
            className="email-input"
            type="email"
            placeholder="EMAIL ADDRESS"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input">
          <FiLock className="icon" />
          <input
            className="password-confirmation-input"
            type="password"
            placeholder="CONFRIM YOUR PASSWORD"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <button className="btn primary-btn" type="button" onClick={handleSignUp}>
          {userData.status === 'loading' ? <BeatLoader loading={loading} color="#6b6b6b" size={9} /> : 'Sign Up'}
        </button>
        <div className="links">
          <Link to="/signin" className="secondary-btn">Login with your existing account?</Link>
          <Link to="/" className="secondary-btn">Back to home page</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
