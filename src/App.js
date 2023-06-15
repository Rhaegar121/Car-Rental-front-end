import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Main from './components/Main';
import Favorites from './components/Favourite';
import AddCar from './components/addCar';
import Detail from './components/Detail';

function App() {
  return (
    <Router>
      <div className="page_container">
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
          <Route path="/cars/:id" element={<Detail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/add_car" element={<AddCar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
