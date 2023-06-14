import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/userSlice';
import '../styles/signup.css';

function SignUpComponent() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const handleSignUp = async () => {
    dispatch(registerUser({ name }));
  };

  useEffect(() => {
    if (userData.status === 'success') {
      navigate('/main');
    }
  }, [userData, navigate]);

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={handleSignUp}>
        Sign Up
      </button>
    </div>
  );
}

export default SignUpComponent;
