import React from 'react';
import './styles/Home.css';

import prof from '../assets/img/lalu.jpg';
import defaultqr from '../assets/svg/defaultqr.svg';

export default function Home() {
  return (
    <>
      <div className="home">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-lg-7">
              <div className="prof-section p-3">
                <div className="row align-items-center h-100">
                  <div className="col-4 col-lg-2">
                    <div className="pic-section">
                      <img src={prof} alt="profile pic" className="prof-pic" />
                    </div>
                  </div>
                  <div className="col-8 col-lg-4">
                    <div className="prof-info">
                      <span className="prof-heading d-flex">
                        <h2 className="prof-fullname">Lalu Yadav</h2>
                        <span className="user-tag ms-2">Farmer</span>
                      </span>
                      <p className="user-details">
                        <span className="material-symbols-outlined">fingerprint</span> F-2024-001 &nbsp;|&nbsp;
                        <span className="material-symbols-outlined">location_on</span> Haryana, India
                      </p>
                      <p className='user-details'>
                        <span className="material-symbols-outlined">phone</span> +91 98765 43210 &nbsp;|&nbsp;
                        <span className="material-symbols-outlined">mail</span> lalu@farm.com
                      </p>
                      <button className='btn btn-outline-dark mt-3'>Go to Profile</button>
                    </div>
                  </div>
                  <div className="d-none d-lg-block col-lg-1 divider-col">
                    <div className="vertical-divider m-auto"></div>
                  </div>
                  <div className="col-12 col-lg-2">
                    <div className="prof-stats">
                      <div className="stat-item">
                        <h3>45</h3>
                        <p>Total Livestock</p>
                      </div>
                      <div className="stat-item">
                        <h3>94%</h3>
                        <p>MRL Compliance</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-none d-lg-block col-lg-1 divider-col">
                    <div className="vertical-divider m-auto"></div>
                  </div>
                  <div className="col-lg-2 d-none d-lg-flex">
                    <div className="qr-section">
                      <img src={defaultqr} alt="defaultqr" className='prof-qr' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="right-section">
                {/* Right side content */}
              </div>
            </div>
            <div className="col-lg-7">
              <div className="map-card">
                <div className="map-header">
                  <h4><span className="material-symbols-outlined">map</span> Regional Overview - Haryana State</h4>
                  <div className="map-controls">
                    <button className="btn-primary" onclick="homeComponent.toggleMapView('compliance')">
                      <span className="material-symbols-outlined">security</span> MRL View
                    </button>
                    <button className="btn-secondary" onclick="homeComponent.toggleMapView('usage')">
                      <span className="material-symbols-outlined">medication</span> AMU View
                    </button>
                  </div>
                </div>
                <div id="regionMap" className="map-container">
                  <div className="map-placeholder">
                    <div className="region-marker high-compliance" style={{ top: "20%", left: "30%" }} data-region="Ambala">
                      <span className="marker-dot"></span>
                      <span className="region-label">Ambala<br />98% Compliance</span>
                    </div>

                    <div className="region-marker medium-compliance" style={{ top: "40%", left: "50%" }} data-region="Karnal">
                      <span className="marker-dot"></span>
                      <span className="region-label">Karnal<br />92% Compliance</span>
                    </div>

                    <div className="region-marker low-compliance" style={{ top: "65%", left: "25%" }} data-region="Rewari">
                      <span className="marker-dot"></span>
                      <span className="region-label">Rewari<br />87% Compliance</span>
                    </div>

                    <div className="region-marker high-compliance" style={{ top: "30%", left: "70%" }} data-region="Panipat">
                      <span className="marker-dot"></span>
                      <span className="region-label">Panipat<br />96% Compliance</span>
                    </div>

                    <div className="region-marker medium-compliance" style={{ top: "55%", left: "60%" }} data-region="Faridabad">
                      <span className="marker-dot"></span>
                      <span className="region-label">Faridabad<br />91% Compliance</span>
                    </div>

                    <div className="current-location" style={{ top: "45%", left: "40%" }}>
                      <span className="material-symbols-outlined">my_location</span>
                      <span className="location-label">Your Farm</span>
                    </div>
                  </div>
                </div>

                <div className="map-legend">
                  <div className="legend-item">
                    <span className="legend-dot high-compliance"></span>
                    <span>High Compliance (95%+)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot medium-compliance"></span>
                    <span>Medium Compliance (90-94%)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot low-compliance"></span>
                    <span>Needs Attention (90%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}