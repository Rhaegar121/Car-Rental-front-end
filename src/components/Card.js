import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars } from '../redux/carsSlice';
import StarRating from './StarRating';

function CarCard() {
  const userId = useSelector((state) => state.user.id);
  const cars = useSelector((state) => state.car.cars);
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
    dispatch(fetchCars({ userId }));
  }, [dispatch, userId]);

  return (
    <>
      <h1 className="heading">Rent A Car Today</h1>
      <div className="main-container">
        <button
          className="btn prev-btn"
          type="button"
          onClick={prev}
          disabled={prevDisabled}
        >
          <BsArrowLeft />
        </button>
        {car.map((car) => (
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
}

export default CarCard;
