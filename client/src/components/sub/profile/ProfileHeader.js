import React from 'react';
import './ProfileHeader.css';
import prof from '../../../assets/img/lalu.jpg';

export default function ProfileHeader() {
  return (
    <div className="farmer-header">
      <div className="row align-items-center">
        <div className="col-12 col-md-3 text-center mb-3 mb-md-0">
          <img src={prof} alt="profile pic" className="farmer-photo" />
        </div>
        <div className="col-12 col-md-6">
          <h2 className="mb-1">Prashant Kumar Singh</h2>
          <p className="mb-2 opacity-75">
            <span className="material-symbols-outlined">location_on</span> Gram Panchayt Phulera, Fakauli, Baliya, UP
          </p>
          <div className="row">
            <div className="col-6">
              <ul className='info-sec'>
                <li className="mb-1"><strong>F-Id:</strong> FfA9VBUWAAA9iiq</li>
                <li className="mb-1"><strong>Age:</strong> 39 years</li>
                <li className="mb-1"><strong>Experience:</strong> 15+ years</li>
              </ul>
            </div>
            <div className="col-6">
              <ul className='info-sec'>
                <li className="mb-1"><strong>Fa-Id:</strong> akt80238jola</li>
                <li className="mb-1"><strong>Contact:</strong> +91 9876543210</li>
                <li className="mb-1"><strong>Veterinary:</strong> Dr. Vishwas Pandey</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3 text-center mt-3 mt-md-0">
          <div className="d-grid gap-2">
            <button className="btn btn-light">
              <span className="material-symbols-outlined">qr_code_scanner</span> Scan QR
            </button>
            <button className="btn btn-outline-light">
              <span className="material-symbols-outlined">assessment</span> Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}