import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import '../styles/detail.css';

const Detail = () => {
  const { id } = useParams();
  const cars = useSelector((state) => state.car.cars);
  const car = cars.find((car) => car.id === parseInt(id, 10));
  const navigate = useNavigate();

  if (!car) {
    return <h1>Car not found.</h1>;
  }

  const starIcons = Array(car.ratings)
    .fill(null)
    .map((_, index) => <AiFillStar key={index} className="star" />);

  const emptyStarIcons = Array(5 - car.ratings)
    .fill(null)
    .map((_, index) => <AiOutlineStar key={index} />);

  return (
    <section id="detail">
      <header className="header">
        <IoIosArrowBack className="back-btn" onClick={() => navigate('/main')} />
        <h2 className="title">{car.name}</h2>
      </header>
      <div className="img-container">
        <img src={car.image} alt={car.name} className="img" />
        <div className="img-text">
          <div className="rating">
            <p>{car.name}</p>
            <div className="star-icons">
              {starIcons}
              {emptyStarIcons}
            </div>
          </div>
          <div className="price">
            <p>
              $
              {car.price}
            </p>
            <p>per month</p>
          </div>
        </div>
      </div>
      <div className="about-container">
        <h3 className="about">About this car</h3>
        <p className="description">{car.description}</p>
      </div>
    </section>
  );
};

export default Detail;
