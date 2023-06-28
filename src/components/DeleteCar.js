import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { deleteCar, fetchCars } from '../redux/carsSlice';
// import { deletefavourite, fetchfavourites } from '../redux/favouritesSlice';
import StarRating from './StarRating';
import Navbar from './navbar';
import '../styles/main.css';

const DeleteCar = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const cars = useSelector((state) => state.car.cars);
  // const favourites = useSelector((state) => state.favourite.favourites);
  const userCars = cars.filter((car) => car.user_id === userData.id);
  console.log(userCars);
  const dispatch = useDispatch();

  const [number, setNumber] = useState(1);
  const showPerPage = 3;
  const lastNumber = number * showPerPage;
  const firstNumber = lastNumber - showPerPage;

  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    // dispatch(fetchfavourites(userData.id));
    dispatch(fetchCars({ userId: userData.id }));
  }, [dispatch, userData.id]);

  const handleDeleteCar = (carId) => {
    // const favouriteId = favourites.find((favourite) => favourite.car_id === carId).id;
    // dispatch(deletefavourite({ userId: userData.id, favouriteId, carId }));
    dispatch(deleteCar({ userId: userData.id, carId }));
  };

  const prev = () => {
    if (number > 1) {
      setNumber(number - 1);
      setNextDisabled(false);
    } else {
      setPrevDisabled(true);
    }
  };

  const next = () => {
    if (number < Math.ceil(cars.length / showPerPage)) {
      setNumber(number + 1);
      setPrevDisabled(false);
    } else {
      setNextDisabled(true);
    }
  };

  if (userCars.length === 0) {
    return (
      <>
        <Navbar />
        <h2 className="sub-heading">You can only delete cars you added.</h2>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <h1 className="heading">Delete a Car</h1>
      <div className="main-container">
        <button
          className="btn prev-btn"
          type="button"
          onClick={prev}
          disabled={prevDisabled}
        >
          <BsArrowLeft />
        </button>
        {userCars.slice(firstNumber, lastNumber).map((car) => (
          <div className="car-container" key={car.id}>
            <div className="image">
              <img src={car.image} alt="mercedez benz" className="car-image" />
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
              className="delete-car-button"
              onClick={() => handleDeleteCar(car.id)}
              type="button"
            >
              Delete
            </button>
          </div>
        ))}
        <button
          className="btn next-btn"
          type="button"
          onClick={next}
          disabled={nextDisabled}
        >
          <BsArrowRight />
        </button>
      </div>
    </>
  );
};

export default DeleteCar;
