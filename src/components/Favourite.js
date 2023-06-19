import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './navbar';
import { fetchfavourites } from '../redux/favouritesSlice';

function Favourite() {
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourite.favourites);
  const cars = useSelector((state) => state.favourite.cars);
  console.log(cars);
  console.log(favourites);
  useEffect(() => {
    dispatch(fetchfavourites({ userId }));
  }, [dispatch, userId]);

  return (
    <>
      <Navbar />
      {/* {favourites.map((favourite) => (
        <div key={favourite.id}>
          <h1>{favourite.car_id}</h1>
          <h1>{favourite.user_id}</h1>
        </div>
      ))} */}
    </>
  );
}

export default Favourite;
