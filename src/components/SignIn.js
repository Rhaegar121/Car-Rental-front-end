import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/userSlice';
import '../styles/signin.css';

function SignInComponent() {
  const [email, setEmail] = useState('');
  const [passsword, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const handleSignIn = async () => {
    dispatch(loginUser({ email, passsword }));
  };

  useEffect(() => {
    if (userData.status === 'success') {
      navigate('/main');
    }
  }, [userData, navigate]);

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={passsword}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={handleSignIn}>
        Sign In
      </button>
    </div>
  );
}

export default SignInComponent;
