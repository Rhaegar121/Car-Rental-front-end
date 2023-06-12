import React from 'react';
import '../styles/main.css';
import { AiOutlineStar } from 'react-icons/ai';
import carImage from '../assets/carImage.jpg';

function Main() {
  return (
    <>
      <div className="main-container">
        <img
          src={carImage}
          alt="mercedez benz"
          className="car-image"
        />

        <div className="car-detils">
          <div className="right">
            <p className="car-name">Mercedez Benz</p>
            <div className="star-icons">
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
            </div>
          </div>
          <div className="left">
            <p className="price">$1600</p>
            <p className="per-month">per month</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
