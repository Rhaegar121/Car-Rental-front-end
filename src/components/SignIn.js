import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/userSlice';
import '../styles/signin.css';

const SignInComponent = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const handleSignIn = async () => {
    dispatch(loginUser({ name }));
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
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={handleSignIn}>
        Sign In
      </button>
    </div>
  );
};

export default SignInComponent;
