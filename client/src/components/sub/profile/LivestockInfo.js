import React from 'react';
import './LivestockInfo.css';

export default function LivestockInfo({ animal, isOpen, onClose }) {
  if (!isOpen) return null;

  const getAnimalIcon = (type) => {
    switch (type) {
      case 'cow': return '🐄';
      case 'buffalo': return '🐃';
      case 'poultry': return '🐔';
      default: return '🐄';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'healthy': return 'status-healthy';
      case 'treatment': return 'status-treatment';
      case 'critical': return 'status-critical';
      default: return 'status-unknown';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'healthy': return 'Healthy';
      case 'treatment': return 'Under Treatment';
      case 'critical': return '⚠️ Needs Attention';
      default: return 'Unknown';
    }
  };

  const getTempClass = (temp) => temp > 40 ? '#ef4444' : temp > 39 ? '#f59e0b' : '#374151';
  const getTempStatus = (temp) => temp > 40 ? 'Critical' : temp > 39 ? 'Elevated' : 'Normal';
  const getHRClass = (hr) => hr > 80 ? '#ef4444' : '#374151';
  const getHRStatus = (hr) => hr > 80 ? 'Elevated' : 'Normal';

  const handleUpdate = () => console.log('Update Information');
  const handleReport = () => console.log('Report Issue');
  const handleDownload = () => console.log('Download');
  const handleShare = () => console.log('Share');

  return (
    <div className="livestock-overlay" onClick={onClose}>
      <div className="livestock-modal" onClick={(e) => e.stopPropagation()}>
        <div className="livestock-header">
          <div className="livestock-header-info">
            <span className="livestock-icon">{getAnimalIcon(animal.type)}</span>
            <div>
              <h3 className="livestock-title">{animal.breed}</h3>
              <span className="livestock-badge">{animal.id}</span>
            </div>
          </div>
          <div className="livestock-actions">
            <button className="livestock-action-btn" onClick={handleDownload} title="Download">
              <span className="material-symbols-outlined">download</span>
            </button>
            <button className="livestock-action-btn" onClick={handleShare} title="Share">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="livestock-action-btn" onClick={onClose} title="Close">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <div className="livestock-content">
          <div className="livestock-section">
            <h4 className="livestock-section-title">Health Status</h4>
            <span className={`livestock-status-badge ${getStatusClass(animal.status)}`}>{getStatusText(animal.status)}</span>
          </div>

          <div className="livestock-section">
            <h4 className="livestock-section-title">Basic Information</h4>
            <div className="livestock-info-grid">
              {[
                { label: 'Age', value: animal.age },
                { label: 'Type', value: animal.type.charAt(0).toUpperCase() + animal.type.slice(1) },
                { label: 'Weight', value: `${animal.weight} kg` },
                { label: 'Breed', value: animal.breed }
              ].map((item, idx) => (
                <div key={idx} className="livestock-info-box">
                  <span className="livestock-info-label">{item.label}</span>
                  <span className="livestock-info-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="livestock-section">
            <h4 className="livestock-section-title">Vital Signs</h4>
            <div className="livestock-vitals-grid">
              <div className="livestock-vital-card">
                <span className="material-symbols-outlined livestock-vital-icon temperature">device_thermostat</span>
                <div className="livestock-vital-info">
                  <span className="livestock-vital-label">Temperature</span>
                  <div className="livestock-vital-value" style={{ color: getTempClass(animal.temperature) }}>{animal.temperature}°C</div>
                  <small className="livestock-vital-status">{getTempStatus(animal.temperature)}</small>
                </div>
              </div>
              <div className="livestock-vital-card">
                <span className="material-symbols-outlined livestock-vital-icon heartrate">favorite</span>
                <div className="livestock-vital-info">
                  <span className="livestock-vital-label">Heart Rate</span>
                  <div className="livestock-vital-value" style={{ color: getHRClass(animal.heartRate) }}>{animal.heartRate} BPM</div>
                  <small className="livestock-vital-status">{getHRStatus(animal.heartRate)}</small>
                </div>
              </div>
            </div>
          </div>

          <div className="livestock-section">
            <h4 className="livestock-section-title">Production Metrics</h4>
            <div className="livestock-production-card">
              <span className="material-symbols-outlined livestock-production-icon">{animal.type === 'poultry' ? 'egg' : 'water_drop'}</span>
              <div>
                <span className="livestock-production-label">{animal.type === 'poultry' ? 'Egg Production' : 'Milk Production'}</span>
                <div className="livestock-production-value">{animal.eggProduction || `${animal.milkProduction}L/day`}</div>
              </div>
            </div>
          </div>

          <div className="livestock-section">
            <h4 className="livestock-section-title">Current Medications & AMU Tracking</h4>
            <div className="livestock-medications">
              {animal.medications.map((med, index) => (
                <span key={index} className="livestock-medication-badge">{med}</span>
              ))}
            </div>
            <div className="livestock-amu-alert border-4 border-success">
              <span className="material-symbols-outlined livestock-amu-icon">info</span>
              <div className="livestock-amu-content">
                <strong className="livestock-amu-title">Antimicrobial Usage Status:</strong>
                <p className="livestock-amu-text">All medications are within MRL limits. Next veterinary inspection scheduled in 7 days.</p>
              </div>
            </div>
          </div>

          <div className="livestock-section">
            <h4 className="livestock-section-title">Traceability Information</h4>
            <div className="livestock-timeline-wrapper">
              {[
                { title: 'Birth Registration', desc: 'Registered on Farm by Dr. Rajesh Kumar', date: 'Jan 15, 2019', hasLine: true },
                { title: 'Last Health Checkup', desc: 'Routine examination completed', date: 'Sep 20, 2025', hasLine: true },
                { title: 'Medication Update', desc: 'Current treatment plan verified', date: 'Sep 28, 2025', hasLine: false }
              ].map((item, idx) => (
                <div key={idx} className="livestock-timeline-item-wrapper">
                  <span className="livestock-timeline-dot"></span>
                  {item.hasLine && <div className="livestock-timeline-line"></div>}
                  <div className="livestock-timeline-content">
                    <strong className="livestock-timeline-title">{item.title}</strong>
                    <p className="livestock-timeline-desc">{item.desc}</p>
                    <small className="livestock-timeline-date">{item.date}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="livestock-section">
            <h4 className="livestock-section-title">Veterinary Information</h4>
            <div className="livestock-vet-card">
              <span className="material-symbols-outlined livestock-vet-icon">medical_services</span>
              <div>
                <div className="livestock-vet-name">Dr. Priya Sharma</div>
                <div className="livestock-vet-phone">+91 98765 43210</div>
                <div className="livestock-vet-license">Vet License: VET-2018-MH-4532</div>
              </div>
            </div>
          </div>
        </div>

        <div className="livestock-footer">
          <button className="livestock-footer-btn update-btn rounded-0" onClick={handleUpdate}>Update Information</button>
          <button className="livestock-footer-btn report-btn rounded-0" onClick={handleReport}>Report Issue</button>
        </div>
      </div>
    </div>
  );
}