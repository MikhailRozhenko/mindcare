import { useState } from 'react';
import chevronUpIcon from '../../assets/icons/chevron-up.svg';
import css from './FilterSelect.module.css';

const FilterSelect = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('A to Z');

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setIsOpen(false);
    onFilterChange(filter);
  };

  return (
    <div className={css.filter}>
      <p className={css.label}>Filters</p>

      <button
        className={css.selectButton}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedFilter}</span>
        <img className={css.arrow} src={chevronUpIcon} alt="" />
      </button>

      {isOpen && (
        <div className={css.options}>
          <button
            className={`${css.optionButton} ${
              selectedFilter === 'A to Z' ? css.activeOption : ''
            }`}
            type="button"
            onClick={() => handleFilterSelect('A to Z')}
          >
            A to Z
          </button>

          <button
            className={`${css.optionButton} ${
              selectedFilter === 'Z to A' ? css.activeOption : ''
            }`}
            type="button"
            onClick={() => handleFilterSelect('Z to A')}
          >
            Z to A
          </button>

          <button
            className={`${css.optionButton} ${
              selectedFilter === 'Less than 10$' ? css.activeOption : ''
            }`}
            type="button"
            onClick={() => handleFilterSelect('Less than 10$')}
          >
            Less than 10$
          </button>

          <button
            className={`${css.optionButton} ${
              selectedFilter === 'Greater than 10$' ? css.activeOption : ''
            }`}
            type="button"
            onClick={() => handleFilterSelect('Greater than 10$')}
          >
            Greater than 10$
          </button>

          <button
            className={`${css.optionButton} ${
              selectedFilter === 'Popular' ? css.activeOption : ''
            }`}
            type="button"
            onClick={() => handleFilterSelect('Popular')}
          >
            Popular
          </button>

          <button
            className={`${css.optionButton} ${
              selectedFilter === 'Not popular' ? css.activeOption : ''
            }`}
            type="button"
            onClick={() => handleFilterSelect('Not popular')}
          >
            Not popular
          </button>

          <button
            className={`${css.optionButton} ${
              selectedFilter === 'Show all' ? css.activeOption : ''
            }`}
            type="button"
            onClick={() => handleFilterSelect('Show all')}
          >
            Show all
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSelect;
