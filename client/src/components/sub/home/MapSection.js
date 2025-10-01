import React, { useState } from 'react';
import './MapSection.css';

export default function MapSection() {
  const [currentView, setCurrentView] = useState('compliance');

  const complianceData = {
    'Ambala': { text: '98% Compliance', class: 'high-compliance' },
    'Karnal': { text: '92% Compliance', class: 'medium-compliance' },
    'Rewari': { text: '87% Compliance', class: 'low-compliance' },
    'Panipat': { text: '96% Compliance', class: 'high-compliance' },
    'Faridabad': { text: '91% Compliance', class: 'medium-compliance' }
  };

  const usageData = {
    'Ambala': { text: '12 kg/month', class: 'high-compliance' },
    'Karnal': { text: '18 kg/month', class: 'medium-compliance' },
    'Rewari': { text: '25 kg/month', class: 'low-compliance' },
    'Panipat': { text: '14 kg/month', class: 'high-compliance' },
    'Faridabad': { text: '19 kg/month', class: 'medium-compliance' }
  };

  const getCurrentData = () => currentView === 'compliance' ? complianceData : usageData;
  
  const getLegendData = () => currentView === 'compliance' 
    ? [
        { class: 'high-compliance', text: 'High Compliance (95%+)' },
        { class: 'medium-compliance', text: 'Medium Compliance (90-94%)' },
        { class: 'low-compliance', text: 'Needs Attention (<90%)' }
      ]
    : [
        { class: 'high-compliance', text: 'Low Usage (<15 kg/month)' },
        { class: 'medium-compliance', text: 'Medium Usage (15-20 kg/month)' },
        { class: 'low-compliance', text: 'High Usage (>20 kg/month)' }
      ];

  const toggleMapView = (view) => {
    setCurrentView(view);
  };

  const currentData = getCurrentData();
  const legendData = getLegendData();

  return (
    <div className="map-card">
      <div className="map-header">
        <h4><span className="material-symbols-outlined">map</span> Regional Overview - Haryana State</h4>
        <div className="map-controls">
          <button 
            className={currentView === 'compliance' ? 'btn-primary d-flex justify-content-center' : 'btn-secondary d-flex justify-content-center'}
            onClick={() => toggleMapView('compliance')}
          >
            <span className="material-symbols-outlined">security</span> MRL View
          </button>
          <button 
            className={currentView === 'usage' ? 'btn-primary d-flex justify-content-center' : 'btn-secondary d-flex justify-content-center'}
            onClick={() => toggleMapView('usage')}
          >
            <span className="material-symbols-outlined">medication</span> AMU View
          </button>
        </div>
      </div>
      <div id="regionMap" className="map-container">
        <div className="map-placeholder">
          <div className={`region-marker ${currentData.Ambala.class}`} style={{ top: "20%", left: "30%" }} data-region="Ambala">
            <span className="marker-dot"></span>
            <span className="region-label">Ambala<br />{currentData.Ambala.text}</span>
          </div>

          <div className={`region-marker ${currentData.Karnal.class}`} style={{ top: "40%", left: "50%" }} data-region="Karnal">
            <span className="marker-dot"></span>
            <span className="region-label">Karnal<br />{currentData.Karnal.text}</span>
          </div>

          <div className={`region-marker ${currentData.Rewari.class}`} style={{ top: "65%", left: "25%" }} data-region="Rewari">
            <span className="marker-dot"></span>
            <span className="region-label">Rewari<br />{currentData.Rewari.text}</span>
          </div>

          <div className={`region-marker ${currentData.Panipat.class}`} style={{ top: "30%", left: "70%" }} data-region="Panipat">
            <span className="marker-dot"></span>
            <span className="region-label">Panipat<br />{currentData.Panipat.text}</span>
          </div>

          <div className={`region-marker ${currentData.Faridabad.class}`} style={{ top: "55%", left: "60%" }} data-region="Faridabad">
            <span className="marker-dot"></span>
            <span className="region-label">Faridabad<br />{currentData.Faridabad.text}</span>
          </div>

          <div className="current-location" style={{ top: "45%", left: "40%" }}>
            <span className="material-symbols-outlined">my_location</span>
            <span className="location-label">Your Farm</span>
          </div>
        </div>
      </div>

      <div className="map-legend">
        {legendData.map((item, index) => (
          <div key={index} className="legend-item">
            <span className={`legend-dot ${item.class}`}></span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}