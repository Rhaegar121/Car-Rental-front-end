import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { deleteCar, fetchCars } from '../redux/carsSlice';
import StarRating from './StarRating';
import Navbar from './Navbar';
import '../styles/main.css';

const DeleteCar = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const cars = useSelector((state) => state.car.cars);
  const status = useSelector((state) => state.car.status);
  const userCars = cars.filter((car) => car.user_id === userData.id);
  const dispatch = useDispatch();

  const [number, setNumber] = useState(1);
  const showPerPage = 4;
  const lastNumber = number * showPerPage;
  const firstNumber = lastNumber - showPerPage;

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleDeleteCar = (carId) => {
    dispatch(deleteCar({ userId: userData.id, carId }));
  };

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

  if (!userCars.length) {
    return (
      <>
        <Navbar />
        {status === 'success' ? <p className="success">Car deleted successfully!</p> : null}
        <h2 className="heading">
          Oops! It looks like you haven&apos;t added any cars yet. Add some vehicles to delete them later.
        </h2>
      </>
    );
  }

  return (
    <div className="page_container">
      <Navbar />
      <h2 className="heading">Customize Your Collection: Delete your added Vehicles.</h2>
      <div className="main-container">
        <button
          className={number === 1 ? 'arrow-btn prev-btn disabled' : 'arrow-btn prev-btn'}
          type="button"
          onClick={prev}
        >
          <BsArrowLeft className="arrow" />
        </button>
        {userCars.slice(firstNumber, lastNumber).map((car) => (
          <div className="car-container" key={car.id}>
            <div className="image">
              <img src={car.image} alt={car.name} className="car-image" />
            </div>
            <div className="car-details">
              <div className="left">
                <p className="car-name">{car.name}</p>
                <StarRating value={car.ratings} />
              </div>
              <div className="right">
                <p>
                  {Math.round(car.price)}
                  {' '}
                  $
                </p>
                <p>per day</p>
              </div>
            </div>
            <button
              className="btn"
              onClick={() => handleDeleteCar(car.id)}
              type="button"
            >
              <AiOutlineDelete className="delete-icon" />
              Delete
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
    </div>
  );
};

export default DeleteCar;
