import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileSection.css';

import prof from '../../../assets/img/lalu.jpg';
import defaultqr from '../../../assets/svg/defaultqr.svg';

export default function ProfileSection() {
  return (
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
            <button className='btn btn-outline-dark mt-3'>
              <Link to='/profile' className='text-dark text-decoration-none'>
                Go to Profile
              </Link>
            </button>
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
  );
}