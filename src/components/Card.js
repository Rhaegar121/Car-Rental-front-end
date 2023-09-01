import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars } from '../redux/carsSlice';
import StarRating from './StarRating';

const CarCard = () => {
  const cars = useSelector((state) => state.car.cars);
  const loading = useSelector((state) => state.car.isLoading);
  const dispatch = useDispatch();
  const [number, setNumber] = useState(1);
  const showPerPage = 4;
  const lastNumber = number * showPerPage;
  const firstNumber = lastNumber - showPerPage;
  const car = cars.slice(firstNumber, lastNumber);

  const prev = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
  };

  const next = () => {
    if (number < (cars.length / showPerPage)) {
      setNumber(number + 1);
    }
  };

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <>
      {loading ? <h1 className="heading">Fetching from the API...Please wait</h1> : <h1 className="heading">Rent A Car Today</h1>}
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
                alt="mercedez benz"
                className="car-image"
              />
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

            <Link
              to={`/cars/${car.id}`}
              key={car.id}
              className="btn"
            >
              View details
            </Link>
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
};

export default CarCard;
