import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Body from './components/Body';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Main from './components/Main';
import { fetchCars } from './redux/carsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Body />}
          />
          <Route
            path="/signin"
            element={<SignIn />}
          />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
            path="/main"
            element={<Main />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
