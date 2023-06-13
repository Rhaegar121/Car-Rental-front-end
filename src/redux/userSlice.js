import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:3001';

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    try {
      const response = await axios.post(`${baseURL}/users/login`, {
        user: {
          email,
          password,
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
  async ({
    name, email, password, passwordConfirmation,
  }) => {
    try {
      const response = await axios.post(`${baseURL}/users`, {
        user: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
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
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.name = action.payload.name;
        state.id = action.payload.id;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.name = action.payload.name;
        state.id = action.payload.id;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const { logOutUser } = userSlice.actions;
export default userSlice.reducer;
