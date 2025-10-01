import React from 'react';
import './LivestockSection.css';
import LivestockCard from './LivestockCard.js';

export default function LivestockSection({ livestockData, activeFilter, setActiveFilter }) {
  const filterLivestock = (filter) => {
    setActiveFilter(filter);
  };

  const filteredLivestock = livestockData.filter(animal => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'healthy' || activeFilter === 'treatment' || activeFilter === 'critical') {
      return animal.status === activeFilter;
    }
    return animal.type === activeFilter;
  });

  const filters = [
    { key: 'all', label: 'All Animals' },
    { key: 'cow', label: '🐄 Cows' },
    { key: 'buffalo', label: '🐃 Buffalo' },
    { key: 'poultry', label: '🐔 Poultry' },
    { key: 'healthy', label: '✅ Healthy' },
    { key: 'treatment', label: '🥼 Under Treatment' }
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