import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { loginUser } from '../redux/userSlice';
import '../styles/signin.css';

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
    } else if (userData.status === 'success') {
      navigate('/main');
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, [userData, navigate]);

  return (
    <div className="sign-in-form">
      <h1 className="sign-in-title">Welcome, please sign in to continue</h1>
      <div className="sign-in-inputs">
        <input
          className="email-input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="password-input"
          type="password"
          placeholder="Enter your password"
          value={passsword}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="sign-in-button"
          type="button"
          onClick={handleSignIn}
        >
          {userData.status === 'loading' ? <BeatLoader loading={loading} color="#ee5029" size={9} /> : 'Sign In'}
        </button>
      </div>
    </div>
  );
};

export default SignInComponent;
