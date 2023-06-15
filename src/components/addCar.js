import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCar } from '../redux/carsSlice';

export default function AddCar() {
  const [carDetails, setCarDetails] = useState({
    brand: '',
    model: '',
    year: '',
  });

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { brand, model, year } = carDetails;

    const newCar = {
      brand,
      model,
      year,
    };

    const userId = '123'; // Replace '123' with the actual user ID

    dispatch(addCar({ userId, car: newCar }));

    // Reset the form
    setCarDetails({
      brand: '',
      model: '',
      year: '',
    });
  };

  return (
    <div>
      <h2>Add a New Car</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="brand">
          Brand:
          <input
            id="brand"
            type="text"
            name="brand"
            value={carDetails.brand}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="model">
          Model:
          <input
            id="model"
            type="text"
            name="model"
            value={carDetails.model}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="year">
          Year:
          <input
            id="year"
            type="text"
            name="year"
            value={carDetails.year}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}
