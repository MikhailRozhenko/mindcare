import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Psychologists from './pages/Psychologists';

function App() {
  return (
    <>
      <Header />
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/psychologists" element={<Psychologists />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
