import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AiOutlineStar, AiFillStar, AiOutlineUser,
} from 'react-icons/ai';
import { GiCarDoor, GiShoppingBag } from 'react-icons/gi';
import { FaGasPump } from 'react-icons/fa';
import { IoIosArrowBack, IoIosPerson } from 'react-icons/io';
import BeatLoader from 'react-spinners/BeatLoader';
import { addfavourite, fetchfavourites } from '../redux/favouritesSlice';
import { fetchCars } from '../redux/carsSlice';
import '../styles/detail.css';

const Detail = () => {
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem('user'));
  const cars = useSelector((state) => state.car.cars);
  const car = cars.find((car) => car.id === parseInt(id, 10));
  const favourite = useSelector((state) => state.favourite);
  const [already, setAlready] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
    if (userData) {
      dispatch(fetchfavourites(userData.id));
    }
  });

  if (!car) {
    return <h1>Loading...</h1>;
  }

  const starIcons = Array(car.ratings)
    .fill(null)
    .map((_, index) => <AiFillStar key={index} className="star fill" />);

  const emptyStarIcons = Array(5 - car.ratings)
    .fill(null)
    .map((_, index) => <AiOutlineStar key={index} className="star" />);

  const handleAddFavouriteClick = async () => {
    if (!userData) {
      navigate('/signin');
    } else if (favourite.favourites.find((favouriteCar) => favouriteCar.car_id === parseInt(id, 10))) {
      setAlready(true);
    } else {
      dispatch(addfavourite({ userId: userData.id, carId: car.id }));
    }
  };

  return (
    <section id="detail">
      <header className="header">
        <IoIosArrowBack className="back-btn" onClick={() => navigate(-1)} />
        <h2 className="title">{car.name}</h2>
      </header>
      {favourite.status === 'added successfully' ? <p className="success">Added to reservation successfully!</p> : null}
      {already ? <p className="error">This car is already in your reservation!</p> : null}
      <div className="banner">
        <div className="banner-text">
          <p>{`reserve a ${car.carType} car rental`}</p>
          <p>{`${car.name} or similar cars`}</p>
        </div>
        <div className="img-container">
          <img src={car.image} alt={car.name} className="img" />
        </div>
      </div>
      <div className="detail-container">
        <div className="img-text">
          <div className="rating">
            <AiOutlineUser className="user-icon" />
            <div>
              <p>{userData ? userData.name : 'Unknown User'}</p>
              <div>
                {starIcons}
                {emptyStarIcons}
              </div>
            </div>
          </div>
          <div className="price">
            <p>
              $
              &nbsp;
              {car.price}
            </p>
            <p>per day</p>
          </div>
        </div>
        <div className="features">
          <div className="feature">
            <span><GiCarDoor /></span>
            <span>
              {car.door}
              {' '}
              doors
            </span>
          </div>
          <div className="feature">
            <span><IoIosPerson /></span>
            <span>
              {car.seat}
              {' '}
              seats
            </span>
          </div>
          <div className="feature">
            <span><GiShoppingBag /></span>
            <span>
              {car.bag}
              {' '}
              large bag
            </span>
          </div>
          <div className="feature">
            <span><FaGasPump /></span>
            <span>
              {car.minGas}
              -
              {car.maxGas}
              {' '}
              mpg
            </span>
          </div>
        </div>
        <div className="about-container">
          <h3 className="about">{`What is a ${car.carType} car?`}</h3>
          <p className="description">{car.description}</p>
        </div>
      </div>
      <div className="reserve-container">
        <button type="button" className="reserve-btn" onClick={handleAddFavouriteClick}>
          {favourite.isLoading === true ? <BeatLoader loading={favourite.isLoading} color="#fff" size={9} /> : 'Reserve'}
        </button>
      </div>
    </section>
  );
};

export default Detail;
