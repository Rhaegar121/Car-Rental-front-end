import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Main from './components/Main';
import Favorites from './routes/favorites';

function App() {
  return (
    <Router>
      <div className="page_container">
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
          <Route
            path="/favorites"
            element={<Favorites />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
