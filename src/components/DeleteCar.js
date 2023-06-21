import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { deleteCar, fetchCars } from '../redux/carsSlice';
import StarRating from './StarRating';
import '../styles/main.css';

function DeleteCar() {
  const [userData, setUserData] = useState(null);
  const userId = useSelector((state) => state.user.id);
  const cars = useSelector((state) => state.car.cars);
  const dispatch = useDispatch();

  const [number, setNumber] = useState(1);
  const showPerPage = 3;
  const lastNumber = number * showPerPage;
  const firstNumber = lastNumber - showPerPage;

  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem('user'));
    setUserData(userDataFromStorage);
    dispatch(fetchCars({ userId: userDataFromStorage.id }));
  }, [dispatch, userId]);

  const handleDeleteCar = (carId) => {
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

  return (
    <>
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
        {cars.slice(firstNumber, lastNumber).map((car) => (
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
        <Link to="/main" className="back-to-main-link">
          Back to Main
        </Link>
      </div>
    </>
  );
}

export default DeleteCar;
