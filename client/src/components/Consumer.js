import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Consumer.css';

import consumer from '../assets/svg/consumer.svg';
import scanqr from '../assets/svg/scanqr.svg';
import analytics from '../assets/svg/analytics.svg';
import livestock from '../assets/svg/livestock.svg';

export default function Consumer() {
  const benefits = [
    {
      icon: 'footprint',
      title: 'Full Traceability',
      desc: 'Track your food from farm to fork with complete transparency',
      color: 'linear-gradient(135deg, #6DBE45 0%, #2b830dff 100%)'
    },
    {
      icon: 'verified_user',
      title: 'Safety First',
      desc: 'Verified MRL compliance ensures safe consumption',
      color: 'linear-gradient(135deg, #2E8BFF 0%, #15467dff 100%)'

    },
    {
      icon: 'bar_chart',
      title: 'Detailed Reports',
      desc: 'Access complete health and treatment history',
      color: 'linear-gradient(135deg, #FFB400 0%, #57350dff 100%)'

    },
    {
      icon: 'shield',
      title: 'Peace of Mind',
      desc: "Know exactly what you're feeding your family",
      color: 'linear-gradient(135deg, #E74C3C 0%, #93201dff 100%)'

    }
  ];


  const features = [
    { img: scanqr, title: 'QR Code Scanning', desc: 'Simply scan the QR code on product packaging to instantly access complete livestock history and health records' },
    { img: analytics, title: 'Health History', desc: 'View detailed treatment records, antimicrobial usage, and veterinary prescriptions for full transparency' },
    { img: livestock, title: 'Animal Profile', desc: 'Learn about breed, origin, living conditions, and family lineage of the livestock behind your food' },
    { img: consumer, title: 'Safety Verification', desc: 'Check MRL compliance status and withdrawal period adherence before making purchase decisions' }
  ];

  const steps = [
    { num: '1', title: 'Find the QR Code', desc: 'Look for CattleSense QR code on meat, milk, or egg packaging' },
    { num: '2', title: 'Scan with Phone', desc: 'Use any QR scanner app or your phone camera to scan' },
    { num: '3', title: 'View Complete History', desc: 'Access farm details, health records, and treatment info' },
    { num: '4', title: 'Make Informed Choice', desc: 'Purchase with confidence knowing the product is safe' }
  ];

  const concerns = [
    'Is this meat safe for my children?',
    'Were antibiotics overused in this livestock?',
    'Where did this milk come from?',
    'Can I trust the food safety claims?'
  ];

  return (
    <div className="consumer-lander">
      <section className="consumer-hero">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-8">
              <h1 className="hero-heading">Know What's On Your Plate - From Farm to Fork</h1>
              <p className="hero-text">CattleSense gives you complete transparency about the animal products you consume. Scan, verify, and eat with confidence.</p>
              <div className="d-flex gap-3 hero-btns">
                <button className="btn-primary-consumer">
                  <Link to='/auth/signup' className="text-decoration-none text-white">Try Demo Scan</Link>
                </button>
                <button className="btn-secondary-consumer">Learn More</button>
              </div>
              <div className="hero-badges mt-4">
                <div className="badge-item d-flex"><span class="pe-2 material-symbols-outlined">
                  check
                </span> 100% Transparent</div>
                <div className="badge-item d-flex"><span class="pe-2 material-symbols-outlined">
                  check
                </span> Verified Safe</div>
                <div className="badge-item d-flex"><span class="pe-2 material-symbols-outlined">
                  check
                </span> Instant Access</div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="hero-image">
                <img src={consumer} alt="Consumer" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="concerns-section">
        <div className="container">
          <h2 className="section-heading">Your Food Safety Concerns Matter</h2>
          <p className="section-subtext">As a conscious consumer, you have every right to know about your food</p>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="concerns-box">
                <h3>Common Questions We Answer</h3>
                <ul className="concerns-list">
                  {concerns.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="solution-box-consumer">
                <h3>How CattleSense Helps You</h3>
                <div className="solution-points">
                  <div className="point-item">
                    <span className="point-icon">🔒</span>
                    <div>
                      <strong>Verified Information</strong>
                      <p>All data verified by veterinarians and authorities</p>
                    </div>
                  </div>
                  <div className="point-item">
                    <span className="point-icon">📱</span>
                    <div>
                      <strong>Instant Access</strong>
                      <p>Scan QR codes right at the store or home</p>
                    </div>
                  </div>
                  <div className="point-item">
                    <span className="point-icon">🌾</span>
                    <div>
                      <strong>Farm Details</strong>
                      <p>Know where your food comes from and how it was raised</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-matters">
        <div className="container">
          <h2 className="section-heading text-white">Why Food Traceability Matters</h2>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="matter-card">
                <div className="matter-icon">
                  <span className="material-symbols-outlined gradient-red">
                    cardiology
                  </span>
                </div>
                <h4>Health Risks</h4>
                <p>Antimicrobial residues in food can cause allergies, resistance, and long-term health issues</p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="matter-card">
                <div className="matter-icon">
                  <span className="material-symbols-outlined gradient-blue">
                    family_restroom
                  </span>
                </div>
                <h4>Family Safety</h4>
                <p>Children and elderly are more vulnerable to contaminated food products</p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="matter-card">
                <div className="matter-icon">
                  <span className="material-symbols-outlined gradient-green">
                    microbiology
                  </span>
                </div>
                <h4>AMR Crisis</h4>
                <p>Overuse of antibiotics in livestock contributes to antibiotic resistance</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="benefits-consumer">
        <div className="container">
          <h2 className="section-heading">Benefits for Conscious Consumers</h2>
          <p className="section-subtext">Make informed decisions about what you eat</p>
          <div className="row g-3">
            {benefits.map((item, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div className="benefit-card-consumer">
                  <div
                    className="benefit-icon-consumer d-flex"
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

      <section className="features-consumer">
        <div className="container">
          <h2 className="section-heading">How You Can Access Information</h2>
          <p className="section-subtext">Simple, instant, and comprehensive food tracking</p>
          <div className="row g-4">
            {features.map((item, idx) => (
              <div key={idx} className="col-lg-6">
                <div className="feature-card-consumer">
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

      <section className="how-to-use">
        <div className="container">
          <h2 className="section-heading">How to Use CattleSense - 4 Easy Steps</h2>
          <div className="row g-4">
            {steps.map((step, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div className="step-card-consumer">
                  <div className="step-number-consumer">{step.num}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="info-access">
        <div className="container">
          <h2 className="section-heading">What Information Can You Access?</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="info-card">
                <div className="info-header">Animal Information</div>
                <ul className="info-list">
                  <li>Breed and age</li>
                  <li>Farm location</li>
                  <li>Living conditions</li>
                  <li>Family lineage</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="info-card">
                <div className="info-header">Health Records</div>
                <ul className="info-list">
                  <li>Treatment history</li>
                  <li>Antimicrobial usage</li>
                  <li>Veterinary prescriptions</li>
                  <li>Health checkups</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="info-card">
                <div className="info-header">Safety Compliance</div>
                <ul className="info-list">
                  <li>MRL status</li>
                  <li>Withdrawal periods</li>
                  <li>Safety certifications</li>
                  <li>Last inspection date</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-section-consumer">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <h2 className="trust-heading">Your Right to Know</h2>
              <p className="trust-text">Food transparency isn't a luxury—it's your fundamental right as a consumer. CattleSense empowers you with verified, real-time information about the animal products you consume.</p>
              <div className="trust-features">
                <div className="trust-feature-item">
                  <span class="material-symbols-outlined check-icon">
                    check
                  </span>
                  <span>No hidden information</span>
                </div>
                <div className="trust-feature-item">
                  <span class="material-symbols-outlined check-icon">
                    check
                  </span>
                  <span>Verified by experts</span>
                </div>
                <div className="trust-feature-item">
                  <span class="material-symbols-outlined check-icon">
                    check
                  </span>
                  <span>Updated in real-time</span>
                </div>
                <div className="trust-feature-item">
                  <span class="material-symbols-outlined check-icon">
                    check
                  </span>
                  <span>Easy to understand</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="stats-grid-consumer">
                <div className="stat-box-consumer">
                  <div className="stat-num">1000+</div>
                  <div className="stat-label">Products Tracked</div>
                </div>
                <div className="stat-box-consumer">
                  <div className="stat-num">100%</div>
                  <div className="stat-label">Transparency</div>
                </div>
                <div className="stat-box-consumer">
                  <div className="stat-num">99%</div>
                  <div className="stat-label">Safety Compliance</div>
                </div>
                <div className="stat-box-consumer">
                  <div className="stat-num">Instant</div>
                  <div className="stat-label">Information Access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-consumer">
        <div className="container text-center">
          <h2 className="cta-heading">Start Making Informed Food Choices Today</h2>
          <p className="cta-text">Join thousands of conscious consumers who trust CattleSense for complete food transparency</p>
          <div className="cta-buttons-wrap">
            <button className="btn-cta-primary-consumer">
              <Link to='/auth/signup' className="text-decoration-none text-white">Try Demo Scan</Link>
            </button>
            <button className="btn-cta-secondary-consumer">Download Mobile App</button>
          </div>
          <p className="cta-footnote">Free to use • No registration required for basic scanning</p>
        </div>
      </section>
    </div>
  );
}