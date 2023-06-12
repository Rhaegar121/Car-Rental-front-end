import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = '127.0.0.1:3000/users/{user_id}/cars';

const initialState = {
  cars: [],
  isLoading: true,
};

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default carsSlice.reducer;
