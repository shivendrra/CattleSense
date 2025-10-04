import React from 'react';
import './ProfileSection.css';

const ProfileSection = ({ formData, onChange, profileImage, onImageUpload }) => (
  <div className="profile-section">
    <div className="section-header">
      <h2>Profile Information</h2>
      <p>Manage your identification and contact details</p>
    </div>
    <div className="photo-upload-container">
      <div className="photo-wrapper">
        {profileImage ? <img src={profileImage} alt="Profile" /> : <span className="material-symbols-outlined">person</span>}
      </div>
      <div className="upload-controls">
        <input type="file" id="photo" accept="image/*" onChange={onImageUpload} hidden />
        <label htmlFor="photo" className="upload-btn">
          <span className="material-symbols-outlined">cloud_upload</span>
          Upload Photo
        </label>
        <p className="hint">JPG or PNG (max 2MB)</p>
      </div>
    </div>
    <div className="form-grid">
      <div className="form-field">
        <label>First Name <span className="req">*</span></label>
        <input type="text" name="firstName" value={formData.firstName} onChange={onChange} />
      </div>
      <div className="form-field">
        <label>Last Name <span className="req">*</span></label>
        <input type="text" name="lastName" value={formData.lastName} onChange={onChange} />
      </div>
      <div className="form-field full">
        <label>Email Address <span className="req">*</span></label>
        <div className="input-icon">
          <span className="material-symbols-outlined">email</span>
          <input type="email" name="email" value={formData.email} onChange={onChange} />
        </div>
      </div>
      <div className="form-field">
        <label>Phone Number <span className="req">*</span></label>
        <input type="tel" name="phone" value={formData.phone} onChange={onChange} />
      </div>
      <div className="form-field">
        <label>Role <span className="req">*</span></label>
        <select name="role" value={formData.role} onChange={onChange}>
          <option>Farmer</option>
          <option>Veterinary Officer</option>
          <option>Government Inspector</option>
          <option>Researcher</option>
          <option>Consumer</option>
        </select>
      </div>
    </div>
  </div>
);

export default ProfileSection;