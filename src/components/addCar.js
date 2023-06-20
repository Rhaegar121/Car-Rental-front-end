import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCar } from '../redux/carsSlice';
import '../styles/addCar.css';
import Navbar from './navbar';


const userDataFromStorage = JSON.parse(localStorage.getItem('user'));
console.log(userDataFromStorage);

export default function AddCar() {
  const [carDetails, setCarDetails] = useState({
    name: '', // Changed from 'name'
    price: '',
    ratings: 0,
    image: null,
    description: '',
    user_id: userDataFromStorage.id,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      image: file, // Changed from carPhoto
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      name, // Changed from name
      price,
      ratings,
      image,
      description,
      user_id,
    } = carDetails;

    const newCar = {
      name, // Changed from name
      price,
      ratings,
      image,
      description,
      user_id: userDataFromStorage.id,
    };

    dispatch(addCar({ userId: userDataFromStorage.id, car: newCar }));

    setCarDetails({
      name: '', // Changed from name
      price: '',
      ratings: 0,
      image: null,
      description: '',
      user_id: userDataFromStorage.id,
    });

    navigate('/main');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="car_form_container">
      <Navbar />
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
            type="text"
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
            Car Photo:
            <input
              id="carPhoto"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleFileChange}
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
        <button type="button" onClick={handleBack} className="back_button">
          Back
        </button>
      </form>
    </div>
  );
}
