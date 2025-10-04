import React from 'react';
import './FarmDetailsSection.css';

const FarmDetailsSection = ({ formData, onChange }) => (
  <div className="farm-details-section">
    <div className="section-header">
      <h2>Farm & Livestock Details</h2>
      <p>Essential information for monitoring and compliance</p>
    </div>
    <div className="form-grid">
      <div className="form-field">
        <label>Farmer ID</label>
        <input type="text" name="farmerId" value={formData.farmerId} onChange={onChange} disabled />
      </div>
      <div className="form-field">
        <label>Farm ID</label>
        <input type="text" name="farmId" value={formData.farmId} onChange={onChange} disabled />
      </div>
      <div className="form-field full">
        <label>Farm Address <span className="req">*</span></label>
        <input type="text" name="farmAddress" value={formData.farmAddress} onChange={onChange} />
      </div>
      <div className="form-field">
        <label>Total Livestock <span className="req">*</span></label>
        <input type="number" name="totalLivestock" value={formData.totalLivestock} onChange={onChange} />
      </div>
      <div className="form-field">
        <label>Farm Size (acres)</label>
        <input type="number" name="farmSize" value={formData.farmSize} onChange={onChange} />
      </div>
      <div className="form-field">
        <label>Primary Livestock Type</label>
        <select name="livestockType" value={formData.livestockType} onChange={onChange}>
          <option>Cattle</option>
          <option>Buffalo</option>
          <option>Poultry</option>
          <option>Mixed</option>
        </select>
      </div>
      <div className="form-field">
        <label>Years of Experience</label>
        <input type="number" name="experience" value={formData.experience} onChange={onChange} />
      </div>
      <div className="form-field full">
        <label>Assigned Veterinary Officer</label>
        <input type="text" name="vetOfficer" value={formData.vetOfficer} onChange={onChange} />
      </div>
    </div>
  </div>
);

export default FarmDetailsSection;