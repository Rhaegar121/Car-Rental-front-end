import { Route, Routes } from 'react-router-dom';
import Favorites from './routes/favorites';
import Navbar from './components/navbar';
import Cars from './routes/cars';
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

  );
}

export default App;
