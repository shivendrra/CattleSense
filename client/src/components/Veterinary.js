import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Veterinary.css';

import veterinary from '../assets/svg/veterinary.svg';
import livestock from '../assets/svg/livestock.svg';
// import scanqr from '../assets/svg/scanqr.svg';
import phonealerts from '../assets/svg/phonealert.svg';
import analytics from '../assets/svg/analytics.svg';

export default function VeterinaryLander() {
  const benefits = [
    { icon: '📋', title: 'Digital Prescriptions', desc: 'Issue and verify prescriptions digitally with complete tracking' },
    { icon: '🔔', title: 'Real-Time Alerts', desc: 'Get notified instantly when dosages are reported by farmers' },
    { icon: '📊', title: 'Practice Analytics', desc: 'Monitor treatment outcomes and AMU trends across patients' },
    { icon: '⚡', title: 'Efficient Workflow', desc: 'Streamline your practice with automated record-keeping' }
  ];

  const features = [
    { img: veterinary, title: 'Prescription Management', desc: 'Create, verify, and track digital prescriptions with automatic dosage calculations and withdrawal period alerts' },
    { img: phonealerts, title: 'Automated Alerts', desc: 'Receive instant notifications when farmers report dosages, flag excessive usage, or require approval' },
    { img: analytics, title: 'Treatment Analytics', desc: 'Access comprehensive dashboards showing AMU patterns, MRL compliance, and treatment effectiveness' },
    { img: livestock, title: 'Patient Profiles', desc: 'Complete livestock health records with treatment history, prescriptions, and family medical lineage' }
  ];

  const steps = [
    { num: '1', title: 'Register Profile', desc: 'Create your veterinary profile with credentials and practice details' },
    { num: '2', title: 'Verify Prescriptions', desc: 'Review and approve antimicrobial prescriptions digitally' },
    { num: '3', title: 'Monitor Usage', desc: 'Track treatment compliance and receive alerts on excessive usage' },
    { num: '4', title: 'Analyze Trends', desc: 'Use data insights to improve treatment protocols and outcomes' }
  ];

  const challenges = [
    'Manual prescription tracking is time-consuming',
    'Difficult to monitor treatment compliance',
    'No real-time alerts for excessive usage',
    'Limited visibility into treatment outcomes'
  ];

  return (
    <div className="veterinary-lander">
      <section className="veterinary-hero">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-heading">Modernize Your Veterinary Practice with Digital AMU Monitoring</h1>
              <p className="hero-text">CattleSense empowers veterinarians with comprehensive tools to prescribe, monitor, and ensure safe antimicrobial usage in livestock.</p>
              <div className="d-flex gap-3 flex-wrap">
                <button className="btn-primary-vet">
                  <Link to='/auth/signup' className="text-decoration-none text-white">Join as Veterinarian</Link>
                </button>
                <button className="btn-secondary-vet">Watch Demo</button>
              </div>
              <div className="hero-stats-vet mt-4">
                <div className="stat-item-vet"><strong>25+</strong> Veterinarians</div>
                <div className="stat-item-vet"><strong>1000+</strong> Prescriptions</div>
                <div className="stat-item-vet"><strong>100%</strong> Digital</div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <img src={veterinary} alt="Veterinary" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="problem-vet">
        <div className="container">
          <h2 className="section-heading">Challenges in Traditional Veterinary Practice</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="problem-box-vet">
                <span className="material-symbols-outlined problem-icon-vet">report</span>
                <h3>Current Pain Points</h3>
                <ul className="problem-list-vet">
                  {challenges.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="solution-box-vet">
                <span className="material-symbols-outlined solution-icon-vet">verified_user</span>
                <h3>CattleSense Solutions</h3>
                <div className="solution-points-vet">
                  <div className="point-item-vet">
                    <span className="point-icon-vet">✓</span>
                    <div>
                      <strong>Digital Workflow</strong>
                      <p>Automated prescription management and tracking</p>
                    </div>
                  </div>
                  <div className="point-item-vet">
                    <span className="point-icon-vet">✓</span>
                    <div>
                      <strong>Real-Time Monitoring</strong>
                      <p>Instant alerts and compliance notifications</p>
                    </div>
                  </div>
                  <div className="point-item-vet">
                    <span className="point-icon-vet">✓</span>
                    <div>
                      <strong>Data-Driven Insights</strong>
                      <p>Comprehensive analytics for better decision-making</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="value-proposition">
        <div className="container">
          <h2 className="section-heading text-white">Why Veterinarians Choose CattleSense</h2>
          <p className="section-subtext-white">Professional tools designed specifically for modern veterinary practice</p>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="value-card">
                <div className="value-icon">🎯</div>
                <h4>Professional Credibility</h4>
                <p>Verified digital profile showcasing your expertise and credentials to farmers and authorities</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="value-card">
                <div className="value-icon">📈</div>
                <h4>Practice Growth</h4>
                <p>Expand your reach with digital prescriptions and attract tech-savvy farmers</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="value-card">
                <div className="value-icon">🛡️</div>
                <h4>Legal Protection</h4>
                <p>Complete audit trail of all prescriptions and approvals for regulatory compliance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-vet">
        <div className="container">
          <h2 className="section-heading">Benefits for Your Practice</h2>
          <p className="section-subtext">Enhance efficiency, compliance, and patient care</p>
          <div className="row g-3">
            {benefits.map((item, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div className="benefit-card-vet">
                  <div className="benefit-icon-vet">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-vet">
        <div className="container">
          <h2 className="section-heading">Professional Features</h2>
          <p className="section-subtext">Everything you need for modern livestock health management</p>
          <div className="row g-4">
            {features.map((item, idx) => (
              <div key={idx} className="col-lg-6">
                <div className="feature-card-vet">
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

      <section className="how-it-works-vet">
        <div className="container">
          <h2 className="section-heading">How It Works - Simple 4 Steps</h2>
          <div className="row g-4">
            {steps.map((step, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div className="step-card-vet">
                  <div className="step-number-vet">{step.num}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="capabilities-section">
        <div className="container">
          <h2 className="section-heading">What You Can Do</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="capability-card">
                <div className="capability-header">Prescription Management</div>
                <ul className="capability-list">
                  <li>Create digital prescriptions</li>
                  <li>Set dosage and frequency</li>
                  <li>Define withdrawal periods</li>
                  <li>Auto-calculate MRL compliance</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="capability-card">
                <div className="capability-header">Monitoring & Alerts</div>
                <ul className="capability-list">
                  <li>Real-time dosage notifications</li>
                  <li>Excessive usage flagging</li>
                  <li>Treatment compliance tracking</li>
                  <li>Withdrawal period reminders</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="capability-card">
                <div className="capability-header">Analytics & Reports</div>
                <ul className="capability-list">
                  <li>AMU trend analysis</li>
                  <li>Treatment outcomes</li>
                  <li>Practice statistics</li>
                  <li>Regulatory reports</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-section-vet">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <h2 className="trust-heading-vet">Built for Professional Veterinarians</h2>
              <p className="trust-text-vet">CattleSense respects your expertise and provides professional-grade tools that enhance your practice without compromising your authority.</p>
              <div className="trust-features-vet">
                <div className="trust-feature-item-vet">
                  <span className="check-icon-vet">✓</span>
                  <span>Full control over prescriptions</span>
                </div>
                <div className="trust-feature-item-vet">
                  <span className="check-icon-vet">✓</span>
                  <span>Secure data encryption</span>
                </div>
                <div className="trust-feature-item-vet">
                  <span className="check-icon-vet">✓</span>
                  <span>Verified credentials display</span>
                </div>
                <div className="trust-feature-item-vet">
                  <span className="check-icon-vet">✓</span>
                  <span>Mobile app for field work</span>
                </div>
                <div className="trust-feature-item-vet">
                  <span className="check-icon-vet">✓</span>
                  <span>24/7 technical support</span>
                </div>
                <div className="trust-feature-item-vet">
                  <span className="check-icon-vet">✓</span>
                  <span>Regulatory compliance tools</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="stats-grid-vet">
                <div className="stat-box-vet">
                  <div className="stat-num-vet">100%</div>
                  <div className="stat-label-vet">Digital Records</div>
                </div>
                <div className="stat-box-vet">
                  <div className="stat-num-vet">Instant</div>
                  <div className="stat-label-vet">Alert System</div>
                </div>
                <div className="stat-box-vet">
                  <div className="stat-num-vet">Secure</div>
                  <div className="stat-label-vet">Data Storage</div>
                </div>
                <div className="stat-box-vet">
                  <div className="stat-num-vet">24/7</div>
                  <div className="stat-label-vet">Access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stewardship-section">
        <div className="container">
          <h2 className="section-heading">Contribute to Antimicrobial Stewardship</h2>
          <p className="section-subtext">Be part of the solution to combat antimicrobial resistance</p>
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="stewardship-content">
                <h3>Your Role in AMR Prevention</h3>
                <p>As a veterinarian, you play a crucial role in preventing antimicrobial resistance. CattleSense helps you:</p>
                <ul className="stewardship-list">
                  <li>Monitor and optimize antimicrobial usage patterns</li>
                  <li>Ensure proper dosage and treatment duration</li>
                  <li>Track withdrawal periods for food safety</li>
                  <li>Contribute to national AMR surveillance data</li>
                  <li>Educate farmers on responsible drug use</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="impact-stats">
                <div className="impact-item">
                  <div className="impact-number">40%</div>
                  <div className="impact-desc">Reduction in unnecessary antimicrobial use</div>
                </div>
                <div className="impact-item">
                  <div className="impact-number">85%</div>
                  <div className="impact-desc">Improvement in treatment compliance</div>
                </div>
                <div className="impact-item">
                  <div className="impact-number">100%</div>
                  <div className="impact-desc">MRL compliance tracking</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-vet">
        <div className="container text-center">
          <h2 className="cta-heading">Join the Digital Veterinary Revolution</h2>
          <p className="cta-text">Be among the pioneering veterinarians who are modernizing livestock healthcare and contributing to safer food systems</p>
          <div className="cta-buttons-wrap">
            <button className="btn-cta-primary-vet">
              <Link to='/auth/signup' className="text-decoration-none text-white">Register as Veterinarian</Link>
            </button>
            <button className="btn-cta-secondary-vet">Schedule Demo</button>
          </div>
          <p className="cta-footnote">Free setup assistance • Comprehensive training provided</p>
        </div>
      </section>
    </div>
  );
}