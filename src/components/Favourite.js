import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Navbar from './navbar';
import { fetchfavourites } from '../redux/favouritesSlice';
import StarRating from './StarRating';
import '../styles/main.css';

function Favourite() {
  const userData = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.favourite.cars);

  const [number, setNumber] = useState(1);
  const showPerPage = 3;
  const lastNumber = number * showPerPage;
  const firstNumber = lastNumber - showPerPage;
  const car = cars.slice(firstNumber, lastNumber);

  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    dispatch(fetchfavourites(userData.id));
  }, [dispatch, userData.id]);

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

  return (
    <>
      <Navbar />
      <h1 className="heading">FAVOURITE CARS</h1>
      <div className="main-container">
        <button
          className="btn prev-btn"
          type="button"
          onClick={prev}
          disabled={prevDisabled}
        >
          <BsArrowLeft />
        </button>
        {cars.map((car) => (
          <Link
            to={`/cars/${car.id}`}
            key={car.id}
            className="links"
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

export default Favourite;
