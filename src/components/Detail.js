import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';

const Detail = () => {
  const { id } = useParams();
  const cars = useSelector((state) => state.car.cars);
  const car = cars.find((car) => car.id === parseInt(id, 10));
  // const navigate = useNavigate();

  if (!car) {
    return <h1>Car not found.</h1>;
  }

  const starIcons = Array(car.ratings)
    .fill(null)
    .map((_, index) => <AiFillStar key={index} />);

  const emptyStarIcons = Array(5 - car.ratings)
    .fill(null)
    .map((_, index) => <AiOutlineStar key={index} />);

  return (
    <section>
      <header>
        <IoIosArrowBack />
        <h1>{car.name}</h1>
      </header>
      <div>
        <img src={car.image} alt={car.name} />
        <div>
          <div>
            <p>{car.name}</p>
            <div className="star-icons">
              {starIcons}
              {emptyStarIcons}
            </div>
          </div>
          <div>
            <p>{car.price}</p>
            <p>per month</p>
          </div>
        </div>
      </div>
      <div>
        <h3>About this car</h3>
        <p>{car.description}</p>
      </div>
    </section>
  );
};

export default Detail;
