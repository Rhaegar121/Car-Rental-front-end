import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './carsSlice';

const store = configureStore({
  reducer: {
    car: carsReducer,
  },
});

export default store;
