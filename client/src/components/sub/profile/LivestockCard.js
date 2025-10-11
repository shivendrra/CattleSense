import React, { useState } from 'react';
import './LivestockCard.css';
import LivestockInfo from './LivestockInfo';

import cow1 from '../../../assets/svg/cow1.svg';
import buffalo from '../../../assets/svg/buffalo1.svg';
import hen from '../../../assets/svg/hen.svg';
import goat from '../../../assets/svg/goat.svg';
import pig from '../../../assets/svg/pig.svg';

export default function LivestockCard({ animal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusClass = (status) => {
    switch (status) {
      case 'healthy': return 'status-healthy';
      case 'treatment': return 'status-treatment';
      case 'critical': return 'status-critical';
      default: return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'healthy': return 'Healthy';
      case 'treatment': return 'Under Treatment';
      case 'critical': return 'Needs Attention';
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return 'hr_resting';
      case 'critical': return 'pulse_alert';
      case 'treatment': return 'healing';
      default: return '';
    }
  }

  const getAnimalIcon = (type) => {
    switch (type) {
      case 'cow': return cow1;
      case 'buffalo': return buffalo;
      case 'poultry': return hen;
      case 'goat': return goat;
      case 'pig': return pig;
      default: return cow1;
    }
  };

  return (
    <>
      <div className="livestock-card">
        <div className="livestock-header">
          <div className="d-flex align-items-center">
            <img
              src={getAnimalIcon(animal.type)}
              alt={animal.type}
              className="livestock-icon-img"
            />
            <div>
              <h6 className="mb-0">{animal.breed}</h6>
              <small className="text-muted">{animal.age}</small>
            </div>
          </div>
          <span className="livestock-id">{animal.id}</span>
        </div>

        <span className={`health-status ${getStatusClass(animal.status)}`}>
          <span className="health-status-icon material-symbols-outlined me-2">
            {getStatusIcon(animal.status)}
          </span>
          {getStatusText(animal.status)}
        </span>

        <div className="livestock-details">
          <div className="detail-item">
            <span className="detail-label">Temperature:</span>
            <span
              className={`detail-value ${animal.temperature > 40 ? 'text-danger' : animal.temperature > 39 ? 'text-warning' : ''
                }`}
            >
              {animal.temperature}°C
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Heart Rate:</span>
            <span className={`detail-value ${animal.heartRate > 80 ? 'text-danger' : ''}`}>
              {animal.heartRate} BPM
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              {animal.type === 'poultry' ? 'Egg Production:' : 'Milk Production:'}
            </span>
            <span className="detail-value">
              {animal.eggProduction || `${animal.milkProduction}L/day`}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Weight:</span>
            <span className="detail-value">{animal.weight} kg</span>
          </div>
        </div>

        <div className="mt-3">
          <strong className="text-muted">Current Medications:</strong><br />
          {animal.medications.map((med, index) => (
            <span key={index} className="medication-badge mt-2 me-1">{med}</span>
          ))}
        </div>
        <hr />
        <div className="mt-2 d-flex gap-2">
          {animal.status === 'critical' ? (
            <>
              <button className="btn btn-custom btn-sm" onClick={() => setIsModalOpen(true)}>
                <span className="material-symbols-outlined">emergency</span> Emergency
              </button>
              <button className="btn btn-outline-custom btn-sm">Contact Vet</button>
            </>
          ) : (
            <>
              <button className="btn btn-custom btn-sm" onClick={() => setIsModalOpen(true)}>
                View Details
              </button>
              <button className="btn btn-outline-custom btn-sm">Update</button>
            </>
          )}
        </div>
      </div>

      <LivestockInfo
        animal={animal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}