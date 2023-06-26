import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/userSlice';
import '../styles/signup.css';

function SignUpComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const handleSignUp = async () => {
    dispatch(registerUser({
      name, email, password, passwordConfirmation,
    }));
  };

  useEffect(() => {
    if (userData.status === 'success') {
      navigate('/main');
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, [userData, navigate]);

  return (
    <div className="sign-up-form">
      <h1 className="sign-up-title"> Welcome, please sign up or sign in to continue</h1>
      <div className="sign-up-inputs">
        <input
          className="name-input"
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="email-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="password-confirmation-input"
          type="password"
          placeholder="Confirm your password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <div className="session-buttons">
          <button className="sign-up-button" type="button" onClick={handleSignUp}>
            {userData.status === 'loading...' ? 'loading' : 'Sign Up'}
          </button>
          <Link to="/signin" className="sign-in-btn">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpComponent;
