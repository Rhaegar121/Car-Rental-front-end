import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { MdRemoveCircleOutline } from 'react-icons/md';
import Navbar from './navbar';
import { fetchfavourites, deletefavourite } from '../redux/favouritesSlice';
import StarRating from './StarRating';
import '../styles/main.css';

function Favourite() {
  const userData = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.favourite.cars);
  const favourites = useSelector((state) => state.favourite.favourites);
  const status = useSelector((state) => state.favourite.status);

  const [number, setNumber] = useState(1);
  const showPerPage = 4;
  const lastNumber = number * showPerPage;
  const firstNumber = lastNumber - showPerPage;
  const car = Array.isArray(cars) ? cars.slice(firstNumber, lastNumber) : [];

  useEffect(() => {
    dispatch(fetchfavourites(userData.id));
  }, [dispatch, userData.id]);

  const prev = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
  };

  const next = () => {
    if (number < Math.ceil(cars.length / showPerPage)) {
      setNumber(number + 1);
    }
  };

  const handleDeleteFavourite = (carId) => {
    const favouriteId = favourites.find((favourite) => favourite.car_id === carId).id;
    dispatch(deletefavourite({ userId: userData.id, favouriteId, carId }));
  };

  return (
    <>
      <Navbar />
      {status === 'success' ? <p className="success">Remove from reservations successfully!</p> : null}
      <h1 className="heading">RESERVED CARS</h1>
      <div className="main-container">
        <button
          className={number === 1 ? 'arrow-btn prev-btn disabled' : 'arrow-btn prev-btn'}
          type="button"
          onClick={prev}
        >
          <BsArrowLeft className="arrow" />
        </button>
        {car.map((car) => (
          <div
            className="car-container"
            key={car.id}
          >
            <div className="image">
              <img
                src={car.image}
                alt={car.name}
                className="car-image"
              />
            </div>

            <div className="car-details">
              <div className="right">
                <p className="car-name">{car.name}</p>
                <StarRating value={car.ratings} />
              </div>
              <div className="left">
                <p className="price">{car.price}</p>
                <p className="per-month">per month</p>
              </div>
            </div>
            <button
              className="btn"
              onClick={() => handleDeleteFavourite(car.id)}
              type="button"
            >
              <MdRemoveCircleOutline className="delete-icon" />
              Remove
            </button>
          </div>
        ))}
        <button
          className={number >= (cars.length / showPerPage) ? 'arrow-btn next-btn disabled' : 'arrow-btn next-btn'}
          type="button"
          onClick={next}
        >
          <BsArrowRight className="arrow" />
        </button>
      </div>
    </>
  );
}

export default Favourite;
