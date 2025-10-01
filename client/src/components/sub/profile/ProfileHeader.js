import React from 'react';
import './ProfileHeader.css';
import prof from '../../../assets/img/lalu.jpg';

export default function ProfileHeader() {
  return (
    <>
      <div className="farmer-header">
        <div className="row">
          <div className="col-12 col-md-3 prof-pic-section">
            <div className="prof-cover">
              <img src={prof} alt="profile pic" className="farmer-photo" />
            </div>
          </div>
          <div className="col-12 col-md-6 prof-des-section">
            <span className='prof-heading d-flex align-items-center'>
              <h2>Lalu Yadav</h2>
              <span className="user-tag ms-2 text-center px-2 py-1">Farmer</span>
            </span>
            <span className='prof-loc d-flex'>
              <p className="mb-2 opacity-75">
                <span className="material-symbols-outlined">location_on</span> Gram Panchayt Phulera, Fakauli, Baliya, UP
              </p>
            </span>
            <span className='prof-info ps-0'>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Farmer ID</span>
                  <span className="info-value">FRM-2024-8473</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Farm ID</span>
                  <span className="info-value">FARM-UP-1247</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Age</span>
                  <span className="info-value">52 years</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Experience</span>
                  <span className="info-value">22 years</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Contact</span>
                  <span className="info-value">+91 98765 43210</span>
                </div>
                <div className="info-item info-item">
                  <span className="info-label">Veterinary Officer</span>
                  <span className="info-value">Dr. Rajesh Kumar Singh</span>
                </div>
              </div>
            </span>
          </div>
          <div className="col-12 col-md-3 my-auto">
            <div className="d-flex gap-2 btn-section">
              <button className="btn btn-light">
                <span className="material-symbols-outlined">qr_code_scanner</span> Scan QR
              </button>
              <button className="btn btn-outline-light mx-auto">
                <span className="material-symbols-outlined">assessment</span> Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}