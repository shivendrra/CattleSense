import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Career.css';

export default function Career() {
  return (
    <div className="career-section">
      <div className="container">
        <section className="career-header text-center mb-5">
          <h1>Join Our Team</h1>
          <p>
            At <strong className='highlight'>CattleSense</strong>, we are building the future of livestock health monitoring.
            Be part of our journey to make farming safer, smarter, and sustainable.
          </p>
        </section>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="career-card p-4">
              <h3 className="role-title">Full-Stack Developer</h3>
              <p className="role-summary">
                Help us design, build, and scale our centralized digital platform.
                Work with React, Node.js, and databases to deliver seamless user experiences.
              </p>
              <ul className="role-reqs">
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Proficiency in React & Node.js
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Experience with REST APIs & databases
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Understanding of cloud deployments
                </li>
              </ul>
              <Link to="/contact" className="btn btn-custom">Apply Now</Link>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="career-card p-4">
              <h3 className="role-title">Data Scientist</h3>
              <p className="role-summary">
                Join our analytics team to make sense of livestock AMU & MRL data.
                Build dashboards, predictive models, and support AI-driven decision-making.
              </p>
              <ul className="role-reqs">
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Strong background in Python, ML/AI
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Experience with data visualization (e.g., D3, Chart.js)
                </li>
                <li>
                  <span className="material-symbols-outlined">check_circle</span>
                  Knowledge of agriculture/health data is a plus
                </li>
              </ul>
              <Link to="/contact" className="btn btn-custom">Apply Now</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
