import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/signin.css';

const SignInComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/users/login',
        {
          user: {
            email,
            password,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const token = response.headers.authorization;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userId', response.data.status.data.id);
      setMessage('Sign in successful' || '');
      navigate('/main');
    } catch (error) {
      setMessage('Sign in failed' || '');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
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
      <button type="button" onClick={handleSignIn}>
        Sign In
      </button>
      <p>{message}</p>
    </div>
  );
};

export default SignInComponent;
