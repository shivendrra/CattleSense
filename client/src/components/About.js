import React from 'react';
import { Link } from 'react-router-dom';
import './styles/About.css';

import av1 from '../assets/avatar/1.svg';
import av2 from '../assets/avatar/2.svg';
import av3 from '../assets/avatar/3.svg';
import av4 from '../assets/avatar/4.svg';
import av5 from '../assets/avatar/5.svg';
import av6 from '../assets/avatar/6.svg';

export default function About() {
  const team = [
    { name: "Shivendra", role: "Team Lead / FullStack Dev", img: av6 },
    { name: "Shailesh", role: "Backend Designer", img: av4 },
    { name: "Sachin", role: "Frontend Developer", img: av5 },
    { name: "Prashant", role: "Frontend Developer", img: av3 },
    { name: "Riya", role: "UI/UX Designer", img: av2 },
    { name: "Savita", role: "Research Analyst", img: av1 },
  ];

  return (
    <div className="about-section">
      <div className="container">
        <section className="about-intro text-center">
          <h1 className="about-title">About Us</h1>
          <p className="about-subtitle">
            We are <strong>Team TwoFold</strong>, creators of <span className="highlight">CattleSense</span> — 
            a digital platform that helps monitor and manage antimicrobial usage in livestock, 
            ensuring safer food, healthier animals, and stronger consumer trust.
          </p>
        </section>
        <section className="about-how row align-items-center my-5">
          <div className="col-lg-6">
            <h2>How It Works</h2>
            <p>
              CattleSense enables farmers to profile livestock, log antimicrobial dosages, 
              and track compliance with withdrawal periods. Veterinarians verify treatments, 
              while regulators get real-time dashboards to analyze trends and enforce standards. 
              Consumers benefit through full transparency — tracing products back to the farm.
            </p>
            <ul>
              <li>🐄 Livestock profiling & tracking</li>
              <li>📋 Verified veterinary prescriptions</li>
              <li>⚠️ Alerts for withdrawal periods & MRL compliance</li>
              <li>📊 Real-time dashboards & analytics</li>
              <li>🔗 Blockchain-based traceability</li>
            </ul>
          </div>
          <div className="col-lg-6 text-center">
            <div className="about-illustration">[ Demo Image / Illustration Placeholder ]</div>
          </div>
        </section>
        <section className="about-mission text-center my-5">
          <h2>Our Mission</h2>
          <p>
            To revolutionize livestock management with technology that empowers farmers, 
            builds consumer confidence, and contributes to global efforts in reducing 
            antimicrobial resistance (AMR).
          </p>
        </section>
        <section className="about-team my-5">
          <h2 className="text-center mb-4">Meet the Team</h2>
          <div className="row">
            {team.map((member, i) => (
              <div key={i} className="col-md-4 mb-4">
                <div className="team-card text-center p-4">
                  <div className="team-photo">
                    <img src={member.img} alt={member.name} className="img-fluid" />
                  </div>
                  <h5 className="team-name">{member.name}</h5>
                  <p className="team-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="about-cta text-center my-5">
          <h3>Want to collaborate or learn more?</h3>
          <p>Reach out to us and be a part of sustainable livestock farming.</p>
          <Link to="/contact" className="btn btn-custom">Contact Us</Link>
        </section>

      </div>
    </div>
  );
}