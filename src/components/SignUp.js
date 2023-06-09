import React, { useState } from 'react';
import axios from 'axios';
import '../styles/signup.css';
import { Link } from 'react-router-dom';

const SignUpComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://159.223.131.191:3000/users', {
        user: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      console.log('Sign up successful:', response.data);
      // Update message state with the success message from response
      setMessage(response.data.http_status.message || '');
    } catch (error) {
      console.error('Sign up failed:', error);
      // Update message state with the error message from response
      setMessage(error.response.data.http_status.errors || 'Sign up failed');
    }
  };

  return (
    <div className="sign-up-form">
      <h1 className="sign-up-title"> Welcome, please sign up or sign in to continue</h1>
      <div className="sign-up-inputs">
        <p>{message}</p>
        <input className="name-input" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="email-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="password-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className="password-confirmation-input" type="password" placeholder="Password Confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
      </div>

      <div className="session-buttons">
        <button className="sign-up-button" type="button" onClick={handleSignUp}>Sign Up</button>
        <Link to="/signin" className="sign-in-btn">Sign In</Link>
      </div>
    </div>
  );
};

export default SignUpComponent;
