import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Farmers.css';

import farmer from '../assets/svg/farmers.svg';
import livestock from '../assets/svg/livestock.svg';
import scanqr from '../assets/svg/scanqr.svg';
import phonealerts from '../assets/svg/phonealert.svg';
import analytics from '../assets/svg/analytics.svg';

export default function Farmers() {
  const benefits = [
    {
      icon: 'compost',
      title: 'Better Yield',
      desc: 'Optimize livestock health for maximum productivity',
      color: 'linear-gradient(135deg, #6DBE45 0%, #2b830dff 100%)'
    },
    {
      icon: 'directions_boat',
      title: 'Export Ready',
      desc: 'Meet international MRL standards easily',
      color: 'linear-gradient(135deg, #2E8BFF 0%, #15467dff 100%)'
    },
    {
      icon: 'policy',
      title: 'Compliance',
      desc: 'Stay updated with regulatory requirements',
      color: 'linear-gradient(135deg, #FFB400 0%, #57350dff 100%)'
    },
    {
      icon: 'siren_check',
      title: 'Smart Alerts',
      desc: 'Get notified about withdrawal periods',
      color: 'linear-gradient(135deg, #E74C3C 0%, #93201dff 100%)'
    }
  ];

  const features = [
    { img: livestock, title: 'Easy Livestock Profiling', desc: 'Simple profile setup with breed info, health records, and family lineage tracking for each animal' },
    { img: scanqr, title: 'Quick QR Scanning', desc: 'Scan animal tags to instantly update dosage information without manual data entry' },
    { img: phonealerts, title: 'Automated Notifications', desc: 'Receive alerts for withdrawal periods, excessive usage, and prescription reminders' },
    { img: analytics, title: 'Data-Driven Insights', desc: 'View trends and analytics to make informed decisions about livestock management' }
  ];

  const steps = [
    { num: '1', title: 'Setup Profiles', desc: 'Expert helps setup initial livestock profiles with RFID tags' },
    { num: '2', title: 'Scan & Update', desc: 'Scan animal tags and update dosage info using mobile app' },
    { num: '3', title: 'Get Verified', desc: 'Veterinarian verifies prescriptions automatically' },
    { num: '4', title: 'Stay Compliant', desc: 'Monitor alerts and maintain MRL compliance effortlessly' }
  ];

  return (
    <div className="farmer-lander">
      <section className="farmer-hero">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-8">
              <h1 className="hero-heading">Simplify Livestock Health Management & Boost Your Farm's Success</h1>
              <p className="hero-text">CattleSense helps you track antimicrobial usage, ensure MRL compliance, and access better export opportunities—all through an easy-to-use digital platform.</p>
              <div className="d-flex gap-3 hero-btns">
                <button className="btn-primary-farmer">
                  <Link to='/auth/signup' className="text-decoration-none text-white">Start Free Trial</Link>
                </button>
                <button className="btn-secondary-farmer">Watch Demo</button>
              </div>
              <div className="hero-stats mt-4 mx-auto">
                <div className="stat-item"><strong>50+</strong> Farmers</div>
                <div className="stat-item"><strong>1000+</strong> Animals</div>
                <div className="stat-item"><strong>99%</strong> Compliance</div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="hero-image">
                <img src={farmer} alt="Farmer" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="problem-farmer">
        <div className="container">
          <h2 className="section-heading">Why Farmers Need CattleSense</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="problem-box">
                <span className="material-symbols-outlined problem-icon">report_problem</span>
                <h3>Current Challenges</h3>
                <ul className="problem-list">
                  <li><span class="pe-2 material-symbols-outlined">
                    close
                  </span>Manual record-keeping is time-consuming and error-prone</li>
                  <li><span class="pe-2 material-symbols-outlined">
                    close
                  </span>Risk of excessive antimicrobial usage without proper tracking</li>
                  <li><span class="pe-2 material-symbols-outlined">
                    close
                  </span>Missing export opportunities due to compliance issues</li>
                  <li><span class="pe-2 material-symbols-outlined">
                    close
                  </span>No real-time alerts for withdrawal periods</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="solution-box">
                <span className="material-symbols-outlined solution-icon">verified</span>
                <h3>How We Help</h3>
                <ul className="solution-list">
                  <li><span class="pe-2 material-symbols-outlined">
                    check
                  </span>Digital profiles for every animal with automated tracking</li>
                  <li><span class="pe-2 material-symbols-outlined">
                    check
                  </span>Smart alerts prevent overdosing and ensure safety</li>
                  <li><span class="pe-2 material-symbols-outlined">
                    check
                  </span>Meet MRL standards for better market access</li>
                  <li><span class="pe-2 material-symbols-outlined">
                    check
                  </span>Get instant notifications before sale or processing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-farmer">
        <div className="container">
          <h2 className="section-heading">Benefits for Your Farm</h2>
          <p className="section-subtext">
            CattleSense isn't just about compliance—it's about growing your business
          </p>
          <div className="row g-3">
            {benefits.map((item, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div className="benefit-card">
                  <div
                    className="benefit-icon d-flex"
                    style={{ background: item.color }}
                  >
                    <span className="material-symbols-outlined m-auto">{item.icon}</span>
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-farmer">
        <div className="container">
          <h2 className="section-heading">Farmer-Friendly Features</h2>
          <p className="section-subtext">Designed to be simple, even for first-time digital users</p>
          <div className="row g-4">
            {features.map((item, idx) => (
              <div key={idx} className="col-lg-6">
                <div className="feature-card-farmer">
                  <div className="feature-img-wrap">
                    <img src={item.img} alt={item.title} className="feature-image" />
                  </div>
                  <div className="feature-content">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2 className="section-heading">How It Works - Simple 4 Steps</h2>
          <div className="row g-4">
            {steps.map((step, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div className="step-card">
                  <div className="step-number">{step.num}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="container">
          <h2 className="section-heading">Trusted by Farmers, Verified by Experts</h2>
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="trust-content">
                <h3>Why Farmers Choose Us</h3>
                <ul className="trust-list">
                  <li><strong>User-Friendly:</strong> No technical knowledge required</li>
                  <li><strong>Mobile First:</strong> Works perfectly in field conditions</li>
                  <li><strong>Expert Support:</strong> Initial setup assistance provided</li>
                  <li><strong>Secure Data:</strong> Your farm data is protected</li>
                  <li><strong>Transparent:</strong> Full visibility into your livestock health</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="trust-stats-grid">
                <div className="trust-stat-box"><div className="big-num">100%</div><div>Data Security</div></div>
                <div className="trust-stat-box"><div className="big-num">24/7</div><div>Support Available</div></div>
                <div className="trust-stat-box"><div className="big-num">Easy</div><div>Setup Process</div></div>
                <div className="trust-stat-box"><div className="big-num">Real-time</div><div>Alerts & Updates</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="roadmap-section">
        <div className="container">
          <h2 className="section-heading">Our Development Journey</h2>
          <div className="roadmap-timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Phase 1: Portal Development</h4>
                <p>Building the core platform with all data gathering and analysis features</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Phase 2: Alpha Testing</h4>
                <p>Testing with 10-15 farmers to gather real-world feedback</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Phase 3: Full-Scale Deployment</h4>
                <p>Rolling out the complete solution with RFID tags and mobile apps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-farmer">
        <div className="container text-center">
          <h2 className="cta-heading">Ready to Modernize Your Farm?</h2>
          <p className="cta-text">Join farmers who are already benefiting from better yields, export opportunities, and hassle-free compliance</p>
          <div className="cta-buttons-wrap">
            <button className="btn-cta-primary">
              <Link to='/auth/signup' className="text-decoration-none text-white">Sign Up Now</Link>
            </button>
            <button className="btn-cta-secondary">Contact Our Team</button>
          </div>
          <p className="cta-footnote">No credit card required • Free expert setup assistance</p>
        </div>
      </section>
    </div>
  );
}