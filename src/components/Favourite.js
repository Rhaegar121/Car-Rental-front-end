import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './navbar';
import { fetchfavourites } from '../redux/favouritesSlice';

function Favourite() {
  const userId = useSelector((state) => state.user.id);
  const favourites = useSelector((state) => state.favourite.favourites);
  const dispatch = useDispatch();
  console.log(favourites);

  useEffect(() => {
    dispatch(fetchfavourites({ userId }));
  }, [dispatch, userId]);

  return (
    <>
      <Navbar />
      <h1>Favorites</h1>
    </>
  );
}

export default Favourite;
