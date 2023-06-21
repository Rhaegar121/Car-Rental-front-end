import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './navbar';
import { fetchfavourites } from '../redux/favouritesSlice';
import StarRating from './StarRating';
import '../styles/main.css';

function Favourite() {
  const userData = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.favourite.cars);

  useEffect(() => {
    dispatch(fetchfavourites(userData.id));
  }, [dispatch, userData.id]);

  if (cars === undefined || cars.length === 0) {
    return (
      <>
        <Navbar />
        <h1>You have no favourite car yet!</h1>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {cars.map((car) => (
        <Link
          to={`/cars/${car.id}`}
          key={car.id}
        >
          <div
            className="car-container"
            key={car.id}
          >
            <div className="image">
              <img
                src={car.image}
                alt="mercedez benz"
                className="car-image"
              />
            </div>

            <div className="car-detils">
              <div className="right">
                <p className="car-name">{car.name}</p>
                <StarRating value={car.ratings} />
              </div>
              <div className="left">
                <p className="price">{car.price}</p>
                <p className="per-month">per month</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default Favourite;
