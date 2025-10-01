import React from 'react';
import './styles/Contact.css';

export default function Contact() {
  return (
    <div className="contact-section">
      <div className="container">

        <section className="contact-header text-center">
          <h1>Contact Us</h1>
          <p>
            Have questions about <strong>CattleSense</strong> or want to collaborate?
            Reach out to us through the form below or via the contact details provided.
          </p>
        </section>

        <div className="row mt-5 align-items-stretch">
          <div className="col-lg-6 mb-4 d-flex">
            <form className="contact-form p-4 flex-fill">
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" placeholder="Enter your name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" placeholder="Enter your email" />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="5" placeholder="Type your message"></textarea>
              </div>
              <button type="submit" className="btn btn-custom">Send Message</button>
            </form>
          </div>

          <div className="col-lg-6 mb-4 d-flex">
            <div className="contact-info p-4 flex-fill">
              <h3>Get in Touch</h3>
              <p><span className="material-symbols-outlined">mail</span> contact@cattlesense.com</p>
              <p><span className="material-symbols-outlined">call</span> +91 98765 43210</p>
              <p><span className="material-symbols-outlined">location_on</span> 3rd floor, Tower-B, Skymark One, Sector 98, Noida, UP, India</p>

              <div className="map-placeholder mt-4">
                [ Map / Location Placeholder ]
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
