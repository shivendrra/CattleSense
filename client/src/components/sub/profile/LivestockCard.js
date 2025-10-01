import React, { useState } from 'react';
import './LivestockCard.css';
import LivestockInfo from './LivestockInfo';

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
      case 'critical': return '⚠️ Needs Attention';
      default: return '';
    }
  };

  const getAnimalIcon = (type) => {
    switch (type) {
      case 'cow': return '🐄';
      case 'buffalo': return '🐃';
      case 'poultry': return '🐔';
      default: return '🐄';
    }
  };

  return (
    <>
      <div className="livestock-card">
        <div className="livestock-header">
          <div className="d-flex align-items-center">
            <span className="livestock-icon">{getAnimalIcon(animal.type)}</span>
            <div>
              <h6 className="mb-0">{animal.breed}</h6>
              <small className="text-muted">{animal.age}</small>
            </div>
          </div>
          <span className="livestock-id">{animal.id}</span>
        </div>
        <span className={`health-status ${getStatusClass(animal.status)}`}>
          {getStatusText(animal.status)}
        </span>
        <div className="livestock-details">
          <div className="detail-item">
            <span className="detail-label">Temperature:</span>
            <span className={`detail-value ${animal.temperature > 39 ? 'text-warning' : ''} ${animal.temperature > 40 ? 'text-danger' : ''}`}>
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
            <span className="detail-label">{animal.type === 'poultry' ? 'Egg Production:' : 'Milk Production:'}</span>
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
            <span key={index} className="medication-badge">{med}</span>
          ))}
        </div>
        <div className="mt-3 d-flex gap-2">
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

      <LivestockInfo animal={animal} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}