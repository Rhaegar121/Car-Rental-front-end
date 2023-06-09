import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/signin.css';

const SignInComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Function to sign in
  const handleSignIn = async () => {
    try {
      const response = await axios.post('', {
        user: {
          email,
          password,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Sign in successful:', response.data);
      // Extract authorization token from response and store it locally
      const token = response.headers.authorization;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userId', response.data.status.data.id);
      setMessage('Sign in successful' || '');
      navigate('/main');
    } catch (error) {
      console.error('Sign in failed:', error);
      setMessage('Sign in failed' || '');
    }
  };

  // Function to sign out
  const handleSignOut = async () => {
    const thetoken = sessionStorage.getItem('token');
    try {
      const response = await axios.delete('', {
        headers: {
          Authorization: thetoken,
        },
      });
      console.log('Sign out successful:', response.data);
      sessionStorage.clear();
      setMessage(response.data.message || '');
    } catch (error) {
      console.error('Sign out failed:', error);
      setMessage('Sign out failed' || '');
    }
  };
  return (
    <div className="sign-in-form">
      <h1 className="sign-in-title"> Welcome, please sign in to continue</h1>
      <p>{message}</p>
      <div className="sign-in-inputs">
        <input className="email-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="password-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="btn">
        <button className="sign-in-button" type="button" onClick={handleSignIn}>Sign In</button>
        <button className="sign-out-button" type="button" onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default SignInComponent;
