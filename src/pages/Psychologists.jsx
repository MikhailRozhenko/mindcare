import { get, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import FilterSelect from '../components/FilterSelect/FilterSelect';
import PsychologistCard from '../components/PsychologistCard/PsychologistCard';
import { database } from '../firebase/firebase';
import css from './Psychologists.module.css';

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('A to Z');
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchPsychologists = async () => {
      const psychologistsRef = ref(database);
      const snapshot = await get(psychologistsRef);

      setPsychologists(Object.values(snapshot.val()));
    };

    fetchPsychologists();
  }, []);

  const handleLoadMore = async () => {
    const psychologistsRef = ref(database);
    const snapshot = await get(psychologistsRef);

    setPsychologists(Object.values(snapshot.val()));
    setVisibleCount((prev) => prev + 3);
  };

  let filteredPsychologists = [...psychologists];

  if (selectedFilter === 'A to Z') {
    filteredPsychologists.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (selectedFilter === 'Z to A') {
    filteredPsychologists.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (selectedFilter === 'Less than 10$') {
    filteredPsychologists = filteredPsychologists.filter(
      (psychologist) => psychologist.price_per_hour < 10,
    );
  }

  if (selectedFilter === 'Greater than 10$') {
    filteredPsychologists = filteredPsychologists.filter(
      (psychologist) => psychologist.price_per_hour > 10,
    );
  }

  if (selectedFilter === 'Popular') {
    filteredPsychologists.sort((a, b) => b.rating - a.rating);
  }

  if (selectedFilter === 'Not popular') {
    filteredPsychologists.sort((a, b) => a.rating - b.rating);
  }

  if (selectedFilter === 'Show all') {
    filteredPsychologists = [...psychologists];
  }

  const visiblePsychologists = filteredPsychologists.slice(0, visibleCount);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setVisibleCount(3);
  };

  return (
    <main className={css.psychologistsPage}>
      <div className="container">
        <FilterSelect onFilterChange={handleFilterChange} />

        <div className={css.cardsList}>
          {filteredPsychologists.length === 0 ? (
            <p className={css.noResults}>No psychologists found</p>
          ) : (
            visiblePsychologists.map((psychologist) => (
              <PsychologistCard
                key={psychologist.name}
                psychologist={psychologist}
              />
            ))
          )}
        </div>

        {visibleCount < filteredPsychologists.length && (
          <button
            className={css.loadMoreButton}
            type="button"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}
      </div>
    </main>
  );
};

export default Psychologists;
