import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars } from '../redux/carsSlice';
import { resetStatus } from '../redux/userSlice';
import StarRating from './StarRating';
import Navbar from './Navbar';
import banner from '../assets/car-banner1.jpg';
import '../styles/main.css';

const Main = () => {
  const cars = useSelector((state) => state.car.cars);
  const loading = useSelector((state) => state.car.isLoading);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [number, setNumber] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [searchCar, setSearchCar] = useState([]);
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
    if (number < Math.ceil(cars.length / showPerPage)) {
      setNumber(number + 1);
    }
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredCars = cars.filter((car) => car.name.toLowerCase().includes(keyword.toLowerCase()));
    setSearchCar(filteredCars);
    setKeyword('');
  };

  const handleBack = () => {
    setSearchCar([]);
  };

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    if (user.status === 'signed up successfully' || user.status === 'logged in successfully' || user.status === 'Logged out') {
      setTimeout(() => {
        dispatch(resetStatus());
      }, 5000);
    }
  }, [user.status, dispatch]);

  return (
    <div className="page_container">
      <Navbar />
      <div className="main-banner">
        <img src={banner} alt="banner" className="banner-img" />
        <div className="main-banner-text">
          {loading
            ? <h2 className="heading">Loading the Latest Vehicles... Please Wait.</h2>
            : <h2 className="heading">Car Rental - Search, Add & Reserve!</h2>}
          <form className="search-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Search for a car with name" className="search" value={keyword} onChange={handleChange} required />
            {!searchCar.length
              ? <button type="submit" className="search-btn">Search</button>
              : <button type="button" className="search-btn" onClick={handleBack}>Back</button>}
          </form>
        </div>
      </div>
      {user.status === 'signed up successfully'
        ? (
          <p className="success">
            Welcome
            {user.name}
            ! You&apos;ve successfully signed up. Get ready to hit the road and explore our amazing car selection.
          </p>
        )
        : null}
      {user.status === 'logged in successfully'
        ? (
          <p className="success">
            Welcome back
            {' '}
            {user.name}
            ! You&apos;ve successfully logged in. Get ready to hit the road and explore our amazing car selection.
          </p>
        )
        : null}
      {user.status === 'Logged out'
        ? <p className="success">You&apos;ve successfully logged out. See you again!</p>
        : null}
      <div className="main-container">
        <button
          className={number === 1 ? 'arrow-btn prev-btn disabled' : 'arrow-btn prev-btn'}
          type="button"
          onClick={prev}
        >
          <BsArrowLeft className="arrow" />
        </button>
        {!searchCar.length && car.map((car) => (
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
        {searchCar && searchCar.map((car) => (
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
    </div>
  );
};

export default Main;
