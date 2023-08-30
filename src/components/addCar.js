import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCar } from '../redux/carsSlice';
import '../styles/addCar.css';
import Navbar from './navbar';

const AddCar = () => {
  const userDataFromStorage = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.car);

  const [carDetails, setCarDetails] = useState({
    name: '',
    price: '',
    ratings: 0,
    image: '',
    description: '',
    carType: '',
    door: 2,
    seat: 2,
    bag: 0,
    minGas: 0,
    maxGas: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      name,
      price,
      ratings,
      image,
      description,
      carType,
      door,
      seat,
      bag,
      minGas,
      maxGas,
    } = carDetails;

    const newCar = {
      name,
      price,
      ratings,
      image,
      description,
      carType,
      door,
      seat,
      bag,
      minGas,
      maxGas,
      user_id: userDataFromStorage.id,
    };

    dispatch(addCar({ userId: userDataFromStorage.id, car: newCar }));
    if (data.status === 'added successfully') {
      navigate('/');
    }

    setCarDetails({
      name: '',
      price: '',
      ratings: 0,
      image: '',
      description: '',
      carType: '',
      door: 2,
      seat: 2,
      bag: 0,
      minGas: 0,
      maxGas: 0,
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="add_car_container">
      <Navbar />
      <div className="add_car_wrapper">
        <div className="car_form_container">
          {data.status === 'error' ? <p className="error">{data.error}</p> : null}
          <h2>Add a new car to rent</h2>
          <form className="add_car_form_wrapper" onSubmit={handleSubmit}>
            <div className="first_wrapper">
              <label htmlFor="name">
                Name:
                <input
                  id="brand"
                  type="text"
                  name="name"
                  value={carDetails.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="type">
                Type:
                <input
                  id="type"
                  type="text"
                  name="carType"
                  value={carDetails.carType}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <br />
            <div className="second_wrapper">
              <label htmlFor="rating">
                Ratings:
                <input
                  id="rating"
                  type="number"
                  name="ratings"
                  min={0}
                  max={5}
                  value={carDetails.ratings}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="price">
                Price per day in USD:
                <input
                  id="price"
                  type="number"
                  name="price"
                  min={0}
                  value={carDetails.price}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <label htmlFor="carPhoto">
              Car image url link:
              <input
                id="carPhoto"
                className="carPhoto"
                name="image"
                value={carDetails.image}
                onChange={handleChange}
                required
              />
            </label>

            <br />
            <label htmlFor="carDetails">
              Car Description:
              <textarea
                id="carDetails"
                name="description"
                value={carDetails.description}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="rating">
              Doors:
              <input
                id="door"
                className="door"
                type="number"
                name="door"
                min={2}
                max={4}
                value={carDetails.door}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="rating">
              Seats:
              <input
                id="seat"
                className="seat"
                type="number"
                name="seat"
                min={2}
                value={carDetails.seat}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="rating">
              Large Bags:
              <input
                id="bag"
                className="bag"
                type="number"
                name="bag"
                value={carDetails.bag}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="rating">
              Fuel (mpg):
              <input
                // id="rating"
                // className="ratings"
                type="number"
                name="minGas"
                value={carDetails.minGas}
                onChange={handleChange}
              />
              <input
                // id="rating"
                // className="ratings"
                type="number"
                name="maxGas"
                value={carDetails.maxGas}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit" className="add_car_button">
              Add Car
            </button>
          </form>
        </div>
        <button type="button" onClick={handleBack} className="back_button">
          Back
        </button>
      </div>
    </div>
  );
};

export default AddCar;
