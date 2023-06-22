import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = 'https://carrental-backend-jmdo.onrender.com/users';

const initialState = {
  status: 'idle',
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

export const addfavourite = createAsyncThunk(
  'cars/addfavourite',
  async ({ userId, carId }) => {
    const response = await fetch(`${baseURL}/${userId}/favourites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favourite: { car_id: carId, user_id: userId } }),
    });
    const data = await response.json();
    return data;
  },
);

export const deletefavourite = createAsyncThunk(
  'cars/deletefavourite',
  async ({ userId, favouriteId, carId }) => {
    await fetch(`${baseURL}/${userId}/favourites/${favouriteId}`, {
      method: 'DELETE',
    });
    return carId;
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
        status: 'success',
        isLoading: false,
        favourites: action.payload.favourites,
        cars: action.payload.cars,
      }))
      .addCase(fetchfavourites.rejected, (state) => ({
        ...state,
        status: 'error',
        isLoading: false,
      }))
      .addCase(addfavourite.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(addfavourite.fulfilled, (state, action) => ({
        ...state,
        status: 'added successfully',
        isLoading: false,
        favourites: action.payload.favourites,
        cars: action.payload.cars,
      }))
      .addCase(addfavourite.rejected, (state) => ({
        ...state,
        status: 'error',
        isLoading: false,
      }))
      .addCase(deletefavourite.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(deletefavourite.fulfilled, (state, action) => ({
        ...state,
        status: 'deleted successfully',
        isLoading: false,
        cars: state.cars.filter(
          (car) => car.id !== parseInt(action.payload, 10),
        ),
      }))
      .addCase(deletefavourite.rejected, (state) => ({
        ...state,
        status: 'error',
        isLoading: false,
      }));
  },
});

export default favouritesSlice.reducer;
