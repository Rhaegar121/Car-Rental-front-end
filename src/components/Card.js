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
  const showPerPage = 3;
  const lastNumber = number * showPerPage;
  const firstNumber = lastNumber - showPerPage;
  const car = cars.slice(firstNumber, lastNumber);

  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);

  const prev = () => {
    if (number > 1) {
      setNumber(number - 1);
      setNextDisabled(false);
    } else {
      setPrevDisabled(true);
    }
  };

  const next = () => {
    if (number <= car.length) {
      setNumber(number + 1);
      setPrevDisabled(false);
    } else {
      setNextDisabled(true);
    }
  };

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <>
      {loading ? <h1 className="heading">Fetching from the API</h1> : <h1 className="heading">Rent A Car Today</h1>}
      <div className="main-container">
        <button
          className="arrow-btn prev-btn"
          type="button"
          onClick={prev}
          disabled={prevDisabled}
        >
          <BsArrowLeft />
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

            <button
              type="button"
              className="btn"
            >
              <Link
                to={`/cars/${car.id}`}
                key={car.id}
              >
                View details
              </Link>
            </button>
          </div>
        ))}
        <button
          className="arrow-btn next-btn"
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

export default CarCard;
