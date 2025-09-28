import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Lander.css';

import consumer from '../assets/svg/consumer.svg';
import farmer from '../assets/svg/farmers.svg';
import veterinary from '../assets/svg/veterinary.svg';
import livestock from '../assets/svg/livestock.svg';
import analytics from '../assets/svg/analytics.svg';
import scanqr from '../assets/svg/scanqr.svg';
import phonealerts from '../assets/svg/phonealert.svg';

export default function Lander() {
  function handleDemo() {
    window.open("https://www.youtube.com/watch?v=--Zeedyfh0A", '_blank');
  }

  return (
    <div className="lander">
      <section className="hero-section bg-danger text-white d-flex align-items-center">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold lh-sm mb-4 hero-title">
                Monitor Livestock Health from Farm to Fork
              </h1>
              <p className="lead mb-4 hero-subtitle">
                A centralized portal for farmers, veterinarians, and consumers to track
                antimicrobial usage and ensure food safety through transparent livestock monitoring.
              </p>
              <div className="d-flex gap-3 hero-buttons">
                <button className="btn btn-light btn-lg fw-semibold px-4 hero-btn-primary">
                  <Link to='/auth/signup' className="text-decoration-none">
                    Get Started
                  </Link>
                </button>
                <button className="btn btn-outline-light btn-lg fw-semibold px-4 hero-btn-secondary" onClick={handleDemo}>
                  View Demo
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <div className="card h-100 stats-card border-0 text-center">
                    <div className="card-body p-3">
                      <div className="display-6 fw-bold stats-number">1000+</div>
                      <div className="small stats-label">Livestock Monitored</div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card h-100 stats-card border-0 text-center">
                    <div className="card-body p-3">
                      <div className="display-6 fw-bold stats-number">50+</div>
                      <div className="small stats-label">Registered Farmers</div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card h-100 stats-card border-0 text-center">
                    <div className="card-body p-3">
                      <div className="display-6 fw-bold stats-number">25+</div>
                      <div className="small stats-label">Veterinarians</div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card h-100 stats-card border-0 text-center">
                    <div className="card-body p-3">
                      <div className="display-6 fw-bold stats-number">99%</div>
                      <div className="small stats-label">Safety Compliance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="problem-section">
        <div className="container">
          <h2 className="section-title">
            The Critical Problem We Solve
          </h2>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="problem-card">
                <h3 className="card-title">
                  <span className="material-symbols-outlined">warning</span>
                  Antimicrobial Residue Risk
                </h3>
                <p className="card-text">
                  Excessive antimicrobial drugs used in livestock can remain in meat,
                  milk, and eggs, posing serious health risks to consumers.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="problem-card">
                <h3 className="card-title">
                  <span className="material-symbols-outlined">trending_down</span>
                  Lack of Monitoring
                </h3>
                <p className="card-text">
                  Current monitoring systems are primitive and don't provide comprehensive
                  tracking from farm to consumer.
                </p>
              </div>
            </div>
            <div className="col-12">
              <div className="alert-card">
                <h3 className="alert-title">Why This Matters</h3>
                <p className="alert-text">
                  Millions consume animal-based products daily. Without proper monitoring of
                  antimicrobial usage, we risk antibiotic resistance, food safety issues, and
                  public health crises. Professional veterinary prescription and monitoring is
                  essential for safe food production.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="solution-section">
        <div className="container mx-auto justify-content-center">
          <h2 className="section-title">
            Our Comprehensive Solution
          </h2>
          <p className="section-subtitle">
            CattleSense provides end-to-end livestock health monitoring with transparency and ease of use.
          </p>
          <div className="row g-3">
            <div className="col-lg-4">
              <div className="feature-box">
                <div className="feature-icon">
                  <img src={farmer} alt="" className='feature-img' />
                </div>
                <h3>For Farmers</h3>
                <p>
                  Easy livestock profiling, health tracking, and dosage management with user-friendly interfaces.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature-box">
                <div className="feature-icon">
                  <img src={veterinary} alt="" className='feature-img' />
                </div>
                <h3>For Veterinarians</h3>
                <p>
                  Prescription verification, automated alerts, and comprehensive health monitoring capabilities.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature-box">
                <div className="feature-icon">
                  <img src={consumer} alt="" className='feature-img' />
                </div>
                <h3>For Consumers</h3>
                <p>
                  Complete traceability from farm to fork, ensuring food safety and transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">
            Key Features
          </h2>
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="feature-item">
                <div className="feature-item-icon">
                  <img src={livestock} alt="" className='feature-img' />
                </div>
                <div className="feature-item-content">
                  <h3>Livestock Profiling</h3>
                  <p>
                    Complete animal profiles with health records, breed information, and family lineage tracking.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="feature-item">
                <div className="feature-item-icon">
                  <img src={scanqr} alt="" className='feature-img' />
                </div>
                <div className="feature-item-content">
                  <h3>QR Code Scanning</h3>
                  <p>
                    Quick animal identification and data updates through simple QR code scanning.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="feature-item">
                <div className="feature-item-icon">
                  <img src={phonealerts} alt="" className='feature-img' />
                </div>
                <div className="feature-item-content">
                  <h3>Automated Alerts</h3>
                  <p>
                    Real-time notifications for excessive or insufficient antimicrobial usage.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="feature-item">
                <div className="feature-item-icon">
                  <img src={analytics} alt="" className='feature-img' />
                </div>
                <div className="feature-item-content">
                  <h3>Analytics Dashboard</h3>
                  <p>
                    Comprehensive MRL and AMU monitoring with data visualizations for decision making.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Transform Livestock Monitoring?</h2>
          <p className="cta-subtitle">
            Join farmers, veterinarians, and consumers in creating a safer, more transparent food system.
          </p>
          <div className="cta-buttons">
            <button className="btn-light">
              Access Dashboard
            </button>
            <button className="btn-outline">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}