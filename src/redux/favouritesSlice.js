import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'http://127.0.0.1:3000/users';

const initialState = {
  favourites: [],
  isLoading: true,
};

export const fetchfavourites = createAsyncThunk(
  'cars/fetchfavourites',
  async ({ userid }) => {
    const response = await fetch(`${baseURL}/${userid}/favourites`);
    const data = await response.json();
    console.log(data);
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
        favourites: action.payload,
      }))
      .addCase(fetchfavourites.rejected, (state) => ({
        ...state,
        isLoading: false,
      }));
  },
});

export default favouritesSlice.reducer;
