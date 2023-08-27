import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const baseURL = 'https://carrental-backend-jmdo.onrender.com/users';
const baseURL = 'http://127.0.0.1:3000';

const initialState = {
  cars: [],
  status: 'idle',
  isLoading: true,
};

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async () => {
    const response = await fetch(`${baseURL}/cars`);
    const data = await response.json();
    return data;
  },
);

export const addCar = createAsyncThunk(
  'car/addCar',
  async ({ userId, car }) => {
    const response = await fetch(`${baseURL}/users/${userId}/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    const data = await response.json();
    return data;
  },
);

export const deleteCar = createAsyncThunk(
  'car/deleteCar',
  async ({ userId, carId }) => {
    await fetch(`${baseURL}/users/${userId}/cars/${carId}`, {
      method: 'DELETE',
    });
    return carId;
  },
);

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(fetchCars.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        cars: action.payload,
      }))
      .addCase(fetchCars.rejected, (state) => ({ ...state, isLoading: false }))
      .addCase(addCar.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(addCar.fulfilled, (state, action) => (
        {
          ...state, status: 'success', isLoading: false, cars: [...state.cars, action.payload],
        }))
      .addCase(addCar.rejected, (state) => ({ ...state, status: 'error', isLoading: false }))
      .addCase(deleteCar.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(deleteCar.fulfilled, (state, action) => ({
        ...state,
        status: 'success',
        isLoading: false,
        cars: state.cars.filter((car) => car.id !== action.payload),
      }))
      .addCase(deleteCar.rejected, (state) => ({ ...state, status: 'error', isLoading: false }));
  },
});

export default carsSlice.reducer;
