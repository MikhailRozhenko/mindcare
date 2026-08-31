import { useState } from 'react';
import FilterSelect from '../components/FilterSelect/FilterSelect';
import PsychologistCard from '../components/PsychologistCard/PsychologistCard';
import { useFavorites } from '../context/useFavorites';
import css from './Favorites.module.css';

const Favorites = () => {
  const { favorites } = useFavorites();
  const [selectedFilter, setSelectedFilter] = useState('A to Z');
  const [visibleCount, setVisibleCount] = useState(3);

  let filteredFavorites = [...favorites];

  if (selectedFilter === 'A to Z') {
    filteredFavorites.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (selectedFilter === 'Z to A') {
    filteredFavorites.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (selectedFilter === 'Less than 10$') {
    filteredFavorites = filteredFavorites.filter(
      (psychologist) => psychologist.price_per_hour < 10,
    );
  }

  if (selectedFilter === 'Greater than 10$') {
    filteredFavorites = filteredFavorites.filter(
      (psychologist) => psychologist.price_per_hour > 10,
    );
  }

  if (selectedFilter === 'Popular') {
    filteredFavorites.sort((a, b) => b.rating - a.rating);
  }

  if (selectedFilter === 'Not popular') {
    filteredFavorites.sort((a, b) => a.rating - b.rating);
  }

  if (selectedFilter === 'Show all') {
    filteredFavorites = [...favorites];
  }

  const visibleFavorites = filteredFavorites.slice(0, visibleCount);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setVisibleCount(3);
  };

  return (
    <main className={css.favoritesPage}>
      <div className="container">
        <FilterSelect onFilterChange={handleFilterChange} />

        <div className={css.cardsList}>
          {filteredFavorites.length === 0 ? (
            <p className={css.noResults}>No favorite psychologists yet</p>
          ) : (
            visibleFavorites.map((psychologist) => (
              <PsychologistCard
                key={psychologist.name}
                psychologist={psychologist}
              />
            ))
          )}
        </div>

        {visibleCount < filteredFavorites.length && (
          <button
            className={css.loadMoreButton}
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 3)}
          >
            Load more
          </button>
        )}
      </div>
    </main>
  );
};

export default Favorites;
