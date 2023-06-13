import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3001/users', {
        user: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      setMessage(response.data.http_status.message || '');
      navigate('/main');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.http_status) {
        setMessage(error.response.data.http_status.errors || 'Sign up failed');
      } else {
        setMessage('Sign up failed');
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button type="button" onClick={handleSignUp}>
        Sign Up
      </button>
      <p>{message}</p>
    </div>
  );
};

export default SignUpComponent;
