import { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { FavoritesContext } from './FavoritesContext';

const FavoritesProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const [favoritesByUser, setFavoritesByUser] = useState({});

  const getSavedFavorites = (userId) => {
    if (!userId) {
      return [];
    }

    const savedFavorites = localStorage.getItem(`favorites_${userId}`);

    if (!savedFavorites) {
      return [];
    }

    try {
      return JSON.parse(savedFavorites);
    } catch {
      return [];
    }
  };

  const userId = currentUser?.uid;

  const favorites = userId
    ? (favoritesByUser[userId] ?? getSavedFavorites(userId))
    : [];

  const addFavorite = (psychologist) => {
    if (!userId) {
      return;
    }

    const alreadyExists = favorites.some(
      (item) => item.name === psychologist.name,
    );

    if (alreadyExists) {
      return;
    }

    const updatedFavorites = [...favorites, psychologist];

    localStorage.setItem(
      `favorites_${userId}`,
      JSON.stringify(updatedFavorites),
    );

    setFavoritesByUser((prev) => ({
      ...prev,
      [userId]: updatedFavorites,
    }));
  };

  const removeFavorite = (psychologistName) => {
    if (!userId) {
      return;
    }

    const updatedFavorites = favorites.filter(
      (item) => item.name !== psychologistName,
    );

    localStorage.setItem(
      `favorites_${userId}`,
      JSON.stringify(updatedFavorites),
    );

    setFavoritesByUser((prev) => ({
      ...prev,
      [userId]: updatedFavorites,
    }));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
