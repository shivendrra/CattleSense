import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/Legal.css';

export default function Legal() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#privacy-policy') {
      const privacySection = document.getElementById('privacy-policy');
      if (privacySection) {
        privacySection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    else if (location.hash === '#licensing') {
      const licensingSection = document.getElementById('licensing');
      if (licensingSection) {
        licensingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    else if (location.hash === '#terms-and-conditions') {
      const termsSection = document.getElementById('terms-and-conditions');
      if (termsSection) {
        termsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="legal-section">
      <div className="container">

        <section className="legal-header text-center mb-5">
          <h1>Legal Information</h1>
          <p>
            Please read through our policies carefully to understand your rights and obligations
            while using <strong class="highlight">CattleSense</strong>.
          </p>
        </section>

        <section className="legal-block mb-5" id="privacy-policy">
          <h2>Privacy Policy</h2>
          <p>
            We value your privacy and are committed to protecting your personal data.
            Information collected through the platform, such as livestock details,
            veterinary logs, or user information, will be used solely for providing
            services within CattleSense. We do not sell, rent, or share your data with
            third parties without consent.
          </p>
          <p>
            Users have the right to request access, modification, or deletion of their
            data at any time by contacting our support team.
          </p>
        </section>

        <section className="legal-block mb-5" id="licensing">
          <h2>Licensing</h2>
          <p>
            CattleSense software, including its design, code, and branding, is the intellectual
            property of Team TwoFold. Unauthorized use, distribution, or modification of
            this platform without prior consent is prohibited.
          </p>
          <p>
            Open-source components used in the platform remain under their respective licenses
            and are credited accordingly.
          </p>
        </section>

        <section className="legal-block mb-5" id="terms-and-conditions">
          <h2>Terms & Conditions</h2>
          <p>
            By accessing or using CattleSense, you agree to comply with the following terms:
          </p>
          <ul>
            <li>Users must provide accurate and truthful information while using the platform.</li>
            <li>Veterinary prescriptions and records must be entered responsibly and truthfully.</li>
            <li>Users are responsible for maintaining the confidentiality of their login credentials.</li>
            <li>Any misuse of the platform may result in suspension or termination of access.</li>
            <li>CattleSense reserves the right to update these terms at any time.</li>
          </ul>
        </section>

        <section className="legal-footer text-center mt-5">
          <p>
            For further queries about our policies, please reach out to our team at
            <a href="mailto:contact@cattlesense.com"> contact@cattlesense.com</a>.
          </p>
        </section>

      </div>
    </div>
  );
}
