import React from 'react';
import './SecuritySection.css';

const SecuritySection = ({ formData, onChange, showPassword, togglePassword }) => (
  <div className="security-section">
    <div className="section-header">
      <h2>Security Settings</h2>
      <p>Manage password and security preferences</p>
    </div>
    <div className="form-grid">
      <div className="form-field full">
        <label>Current Password</label>
        <div className="password-field">
          <input type={showPassword.current ? 'text' : 'password'} name="currentPassword" value={formData.currentPassword} onChange={onChange} />
          <button type="button" onClick={() => togglePassword('current')}>
            <span className="material-symbols-outlined">{showPassword.current ? 'visibility_off' : 'visibility'}</span>
          </button>
        </div>
      </div>
      <div className="form-field">
        <label>New Password</label>
        <div className="password-field">
          <input type={showPassword.new ? 'text' : 'password'} name="newPassword" value={formData.newPassword} onChange={onChange} />
          <button type="button" onClick={() => togglePassword('new')}>
            <span className="material-symbols-outlined">{showPassword.new ? 'visibility_off' : 'visibility'}</span>
          </button>
        </div>
      </div>
      <div className="form-field">
        <label>Confirm Password</label>
        <div className="password-field">
          <input type={showPassword.confirm ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={onChange} />
          <button type="button" onClick={() => togglePassword('confirm')}>
            <span className="material-symbols-outlined">{showPassword.confirm ? 'visibility_off' : 'visibility'}</span>
          </button>
        </div>
      </div>
    </div>
    <div className="toggle-section">
      <div className="toggle-item">
        <div className="toggle-info">
          <span className="material-symbols-outlined">lock</span>
          <div>
            <h4>Two-Factor Authentication</h4>
            <p>Add extra security layer to your account</p>
          </div>
        </div>
        <label className="switch">
          <input type="checkbox" name="twoFactor" checked={formData.twoFactor} onChange={onChange} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
    <div className="delete-section">
      <div className="delete-item">
        <div className="delete-info">
          <span className="material-symbols-outlined">warning</span>
          <div>
            <h4>Delete your Account</h4>
            <p>Once done can't be undone. Deletes your complete data from our records</p>
          </div>
        </div>
        <button type="button" className="delete-button" onClick={() => alert('Account deletion process started')} > Delete Account
        </button>
      </div>
    </div>
  </div>
);

export default SecuritySection;