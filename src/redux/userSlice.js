import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://127.0.0.1:3000';

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ name }) => {
    try {
      const response = await axios.post(`${baseURL}/users/login`, {
        user: { fullname: name },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Login failed');
    }
  },
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name }) => {
    try {
      const response = await axios.post(`${baseURL}/users/signup`, {
        user: { fullname: name },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
  },
);

const initialState = {
  status: 'idle',
  name: '',
  id: null,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutUser(state) {
      return {
        ...state,
        status: 'idle',
        name: '',
        id: null,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.fulfilled, (state, action) => ({
        ...state,
        status: 'success',
        name: action.payload.fullname,
        id: action.payload.id,
      }))
      .addCase(registerUser.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        status: 'success',
        name: action.payload.fullname,
        id: action.payload.id,
      }))
      .addCase(loginUser.rejected, (state, action) => ({
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

export const { logOutUser } = userSlice.actions;
export default userSlice.reducer;
