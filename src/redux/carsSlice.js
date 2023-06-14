import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'http://127.0.0.1:3000/users';

const initialState = {
  cars: [],
  isLoading: true,
};

export const fetchCars = createAsyncThunk('cars/fetchCars', async ({ userId }) => {
  const response = await fetch(`${baseURL}/${userId}/cars`);
  const data = await response.json();
  return data;
});

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(fetchCars.fulfilled, (state, action) => ({ ...state, isLoading: false, cars: action.payload }))
      .addCase(fetchCars.rejected, (state) => ({ ...state, isLoading: false }));
  },
});

export default carsSlice.reducer;
