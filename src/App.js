import { Route, Routes } from 'react-router-dom';
import Favorites from './routes/favorites';
import Navbar from './components/navbar';
import Cars from './routes/cars';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="page_container">
        <Routes>
          <Route path="/" element={<Cars />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
