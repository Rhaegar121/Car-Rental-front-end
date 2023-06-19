import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './carsSlice';
import userReducer from './userSlice';
import favouritesReducer from './favouritesSlice';

const store = configureStore({
  reducer: {
    car: carsReducer,
    user: userReducer,
    favourite: favouritesReducer,
  },
});

export default store;
