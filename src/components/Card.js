import React, { useEffect } from 'react';
import '../styles/main.css';
import { AiOutlineStar } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import carImage from '../assets/carImage.jpg';
import { fetchCars } from '../redux/carsSlice';

function CarCard() {
  const userId = useSelector((state) => state.user.id);
  const cars = useSelector((state) => state.car.cars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars({ userId }));
  }, [dispatch, userId]);

  return (
    <>
      {cars.map((car) => (
        <div
          className="main-container"
          key={car.id}
        >
          <img
            src={carImage}
            alt="mercedez benz"
            className="car-image"
          />

          <div className="car-detils">
            <div className="right">
              <p className="car-name">{car.name}</p>
              <div className="star-icons">
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </div>
            </div>
            <div className="left">
              <p className="price">{car.price}</p>
              <p className="per-month">per month</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CarCard;
