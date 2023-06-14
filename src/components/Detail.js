import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Detail = () => {
  const { id } = useParams();
  const cars = useSelector((state) => state.car.cars);
  const car = cars.find((car) => car.id === parseInt(id, 10));
  // const navigate = useNavigate();

  if (!car) {
    return <h1>Car not found.</h1>;
  }

  return (
    <div>
      Carname:
      <span>{car.name}</span>
    </div>
  );
};

export default Detail;
