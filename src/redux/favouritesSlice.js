import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'http://127.0.0.1:3000/users';

const initialState = {
  favourites: [],
  cars: [],
  isLoading: true,
};

export const fetchfavourites = createAsyncThunk(
  'cars/fetchfavourites',
  async (userId) => {
    const response = await fetch(`${baseURL}/${userId}/favourites`);
    const data = await response.json();
    return data;
  },
);

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchfavourites.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchfavourites.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        favourites: action.payload.favourites,
        cars: action.payload.cars,
      }))
      .addCase(fetchfavourites.rejected, (state) => ({
        ...state,
        isLoading: false,
      }));
  },
});

export default favouritesSlice.reducer;
