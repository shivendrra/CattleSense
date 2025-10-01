import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FAQ from './FAQ';
import './styles/Help.css';

export default function Help() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#faq') {
      const faqSection = document.getElementById('faq-section');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="help-page">
      <div className="container py-5">
        <h1 className="help-title">Help Center</h1>
        <p className="help-intro">
          Welcome to the CattleSense Help Center. Here you'll find resources, guides,
          and answers to common questions about antimicrobial usage (AMU) monitoring,
          Maximum Residue Limits (MRL), and how our platform supports farmers, veterinarians,
          regulators, and consumers.
        </p>

        <div className="help-section">
          <h3>Getting Started</h3>
          <p>
            • Farmers can register their livestock, record antimicrobial usage, and get
            compliance alerts.<br />
            • Veterinarians can manage prescriptions and verify treatments.<br />
            • Regulators can monitor compliance trends using dashboards.<br />
            • Consumers can trace their food “from farm to fork” for safety assurance.
          </p>
        </div>

        <div className="help-section">
          <h3>Contact Support</h3>
          <p>
            Need additional help? Reach out to our support team via the{' '}
            <a href="/contact">Contact Page</a>. We'll get back to you as quickly as possible.
          </p>
        </div>

        <div id="faq-section" className="help-faq">
          <FAQ />
        </div>
      </div>
    </div>
  );
}
