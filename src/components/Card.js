import React from 'react';
import '../styles/main.css';
import { AiOutlineStar } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import carImage from '../assets/carImage.jpg';

function CarCard() {
  const cars = useSelector((state) => state.car.cars);
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
