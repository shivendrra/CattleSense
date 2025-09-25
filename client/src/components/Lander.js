import React from 'react';
import './styles/Lander.css';

export default function Lander() {
  function handleDemo() {
    window.open("https://www.youtube.com/watch?v=--Zeedyfh0A", '_blank');
  }

  return (
    <div className="lander">
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1 className="hero-title">
                Monitor Livestock Health from Farm to Fork
              </h1>
              <p className="hero-subtitle">
                A centralized portal for farmers, veterinarians, and consumers to track
                antimicrobial usage and ensure food safety through transparent livestock monitoring.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary">
                  Get Started
                </button>
                <button className="btn-secondary" onClick={handleDemo}>
                  View Demo
                </button>
              </div>
            </div>
            <div className="hero-stats">
              <div className="stats-grid">
                <div className="stats-card">
                  <div className="stats-number">1000+</div>
                  <div className="stats-label">Livestock Monitored</div>
                </div>
                <div className="stats-card">
                  <div className="stats-number">50+</div>
                  <div className="stats-label">Registered Farmers</div>
                </div>
                <div className="stats-card">
                  <div className="stats-number">25+</div>
                  <div className="stats-label">Veterinarians</div>
                </div>
                <div className="stats-card">
                  <div className="stats-number">99%</div>
                  <div className="stats-label">Safety Compliance</div>
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
        <div className="container">
          <h2 className="section-title">
            Our Comprehensive Solution
          </h2>
          <p className="section-subtitle">
            CattleSense provides end-to-end livestock health monitoring with transparency and ease of use.
          </p>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="feature-box">
                <div className="feature-icon">
                  <span className="material-symbols-outlined">agriculture</span>
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
                  <span className="material-symbols-outlined">local_hospital</span>
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
                  <span className="material-symbols-outlined">receipt_long</span>
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
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="feature-item">
                <div className="feature-item-icon">
                  <span className="material-symbols-outlined">pets</span>
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
                  <span className="material-symbols-outlined">qr_code</span>
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
                  <span className="material-symbols-outlined">notifications_active</span>
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
                  <span className="material-symbols-outlined">analytics</span>
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