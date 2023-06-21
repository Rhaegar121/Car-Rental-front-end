import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCar } from '../redux/carsSlice';
import '../styles/addCar.css';
import Navbar from './navbar';

export default function AddCar() {
  const userDataFromStorage = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [carDetails, setCarDetails] = useState({
    name: '',
    price: '',
    ratings: 0,
    image: '',
    description: '',
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
    } = carDetails;

    const newCar = {
      name,
      price,
      ratings,
      image,
      description,
      user_id: userDataFromStorage.id,
    };

    dispatch(addCar({ userId: userDataFromStorage.id, car: newCar }));
    navigate('/main');

    setCarDetails({
      name: '',
      price: '',
      ratings: 0,
      image: '',
      description: '',
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
              />
            </label>
            <br />
            <div className="ratings_and_photo_wrapper">
              <label htmlFor="rating">
                Ratings:
                <input
                  id="rating"
                  className="rating"
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
}
