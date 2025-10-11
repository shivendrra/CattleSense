import React from 'react';
import './LivestockSection.css';
import LivestockCard from './LivestockCard.js';

import cow1 from '../../../assets/svg/cow1.svg';
import buffalo from '../../../assets/svg/buffalo1.svg';
import hen from '../../../assets/svg/hen.svg';
import goat from '../../../assets/svg/goat.svg';
import pig from '../../../assets/svg/pig.svg';

export default function LivestockSection({ livestockData, activeFilter, setActiveFilter }) {
  const filterLivestock = (filter) => {
    setActiveFilter(filter);
  };

  const filteredLivestock = livestockData.filter(animal => {
    if (activeFilter === 'all') return true;
    if (['healthy', 'treatment', 'critical'].includes(activeFilter)) {
      return animal.status === activeFilter;
    }
    return animal.type === activeFilter;
  });

  const getAnimalIcon = (key) => {
    switch (key) {
      case 'cow': return cow1;
      case 'buffalo': return buffalo;
      case 'poultry': return hen;
      case 'goat': return goat;
      case 'pig': return pig;
      default: return cow1;
    }
  };

  const filters = [
    { key: 'all', label: 'All Animals' },
    { key: 'cow', label: 'Cows' },
    { key: 'buffalo', label: 'Buffalo' },
    { key: 'poultry', label: 'Poultry' },
    { key: 'healthy', label: 'Healthy' },
    { key: 'treatment', label: 'Under Treatment' }
  ];

  return (
    <>
      <div className="filter-tabs">
        <h6 className="mb-3">Filter Livestock</h6>
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
            onClick={() => filterLivestock(filter.key)}
          >
            {['cow', 'buffalo', 'poultry', 'goat', 'pig'].includes(filter.key) ? (
              <img
                src={getAnimalIcon(filter.key)}
                alt={filter.label}
                className="filter-icon"
              />
            ) : null}
            {filter.label}
          </button>
        ))}
      </div>

      <div className="livestock-grid">
        {filteredLivestock.map((animal) => (
          <LivestockCard key={animal.id} animal={animal} />
        ))}
      </div>
    </>
  );
}