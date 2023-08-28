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
    type: '',
    price: '',
    ratings: 0,
    image: '',
    description: '',
    door: 2,
    seat: 2,
    bag: 0,
    minFuel: 0,
    maxFuel: 0,
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
      type,
      price,
      ratings,
      image,
      description,
      door,
      seat,
      bag,
      minFuel,
      maxFuel,
    } = carDetails;

    const newCar = {
      name,
      type,
      price,
      ratings,
      image,
      description,
      door,
      seat,
      bag,
      minFuel,
      maxFuel,
      user_id: userDataFromStorage.id,
    };

    dispatch(addCar({ userId: userDataFromStorage.id, car: newCar }));

    if (data.status === 'added successfully') {
      navigate('/');
    }

    setCarDetails({
      name: '',
      type: '',
      price: '',
      ratings: 0,
      image: '',
      description: '',
      door: 2,
      seat: 2,
      bag: 0,
      minFuel: 0,
      maxFuel: 0,
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
          <h2>Add a New Car</h2>
          <form className="add_car_form_wrapper" onSubmit={handleSubmit}>
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
            <br />
            <label htmlFor="name">
              Type:
              <input
                type="text"
                name="type"
                value={carDetails.type}
                onChange={handleChange}
              />
            </label>
            <br />
            <label htmlFor="rentAmount">
              Price (USD):
              <input
                id="rentAmount"
                type="number"
                name="price"
                value={carDetails.price}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <div className="ratings_and_photo_wrapper">
              <label htmlFor="rating">
                Ratings:
                <input
                  id="rating"
                  className="ratings"
                  type="number"
                  name="ratings"
                  min={0}
                  max={5}
                  value={carDetails.ratings}
                  onChange={handleChange}
                />
              </label>
              <br />
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
            </div>

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
                name="minFuel"
                value={carDetails.minFuel}
                onChange={handleChange}
              />
              <input
                // id="rating"
                // className="ratings"
                type="number"
                name="maxFuel"
                value={carDetails.maxFuel}
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
