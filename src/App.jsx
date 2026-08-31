import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import { AuthContext } from './context/AuthContext';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Psychologists from './pages/Psychologists';

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/psychologists" element={<Psychologists />} />

        <Route
          path="/favorites"
          element={currentUser ? <Favorites /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
