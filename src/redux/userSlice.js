import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const baseURL = 'https://carrental-9ijm.onrender.com';
const baseURL = 'http://127.0.0.1:3000';

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, passsword }) => {
    try {
      const response = await axios.post(`${baseURL}/users/login`, {
        user: { email: email.toLowerCase(), password: passsword },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.errors || 'Login failed');
    }
  },
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'user/register',
  async ({
    name, email, password, passwordConfirmation,
  }) => {
    try {
      const response = await axios.post(`${baseURL}/users/signup`, {
        user:
        {
          fullname: name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.errors || 'Registration failed');
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ id, name, picture }) => {
    try {
      const response = await axios.put(`${baseURL}/users/${id}`, {
        user: {
          fullname: name,
          icon: picture,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.errors || 'Update failed');
    }
  },
);

export const logOutUser = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      const response = await axios.delete(`${baseURL}/users/logout`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Logout failed');
    }
  },
);

const initialState = {
  status: 'idle',
  id: null,
  name: '',
  picture: '',
  email: '',
  passsword: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Add a reducer to reset status after a certain time
    resetStatus: (state) => ({
      ...state,
      status: 'idle',
    }),
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(registerUser.fulfilled, (state, action) => ({
        ...state,
        status: 'signed up successfully',
        name: action.payload.fullname,
        email: action.payload.email,
        picture: action.payload.icon,
        id: action.payload.id,
      }))
      .addCase(registerUser.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(loginUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        status: 'logged in successfully',
        name: action.payload.fullname,
        email: action.payload.email,
        picture: action.payload.icon,
        id: action.payload.id,
      }))
      .addCase(loginUser.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(updateUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(updateUser.fulfilled, (state, action) => ({
        ...state,
        status: 'updated successfully',
        name: action.payload.fullname,
        picture: action.payload.icon,
        email: action.payload.email,
        id: action.payload.id,
      }))
      .addCase(updateUser.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(logOutUser.fulfilled, (state, action) => ({
        ...state,
        status: action.payload.message,
        name: '',
        email: '',
        id: null,
      }))
      .addCase(logOutUser.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => ({
          ...state,
          status: 'error',
          error: action.error.message || 'Request failed',
        }),
      );
  },
});

export const { resetStatus } = userSlice.actions;
export default userSlice.reducer;
