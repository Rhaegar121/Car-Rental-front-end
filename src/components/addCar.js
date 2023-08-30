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

  // const handleBack = () => {
  //   navigate(-1);
  // };

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
                Price in USD:
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
            <div className="second_wrapper">
              <label htmlFor="door">
                Doors:
                <input
                  id="door"
                  type="number"
                  name="door"
                  min={2}
                  max={4}
                  value={carDetails.door}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="seat">
                Seats:
                <input
                  id="seat"
                  type="number"
                  name="seat"
                  min={2}
                  value={carDetails.seat}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="second_wrapper">
              <label htmlFor="bag">
                Bags:
                <input
                  id="bag"
                  type="number"
                  name="bag"
                  value={carDetails.bag}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="gas">
                Gas tank (mpg):
                <div className="third_wrapper">
                  <input
                    type="number"
                    name="minGas"
                    value={carDetails.minGas}
                    onChange={handleChange}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    name="maxGas"
                    value={carDetails.maxGas}
                    onChange={handleChange}
                  />
                </div>
              </label>
            </div>
            <label htmlFor="carPhoto">
              Car image url link:
              <textarea
                id="carPhoto"
                className="carPhoto"
                name="image"
                value={carDetails.image}
                onChange={handleChange}
                required
              />
            </label>
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
            <div className="button_wrapper">
              <button type="button" className="cancel_btn" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button type="submit" className="btn">
                Add Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
