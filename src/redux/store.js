import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './carsSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    car: carsReducer,
    user: userReducer, // Add the userReducer to the store
  },
});

export default store;
