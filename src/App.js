import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Main from './components/Main';
import Favourites from './components/Favourite';
import AddCar from './components/addCar';
import Detail from './components/Detail';
import DeleteCar from './components/DeleteCar';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/cars/:id" element={<Detail />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/add_car" element={<AddCar />} />
      <Route path="/delete_car" element={<DeleteCar />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </Router>
);

export default App;
