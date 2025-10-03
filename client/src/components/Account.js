import React, { useState } from 'react';
import ProfileSection from './sub/account/ProfileSection';
import FarmDetailsSection from './sub/account/FarmDetailsSection';
import ComplianceSection from './sub/account/ComplianceSection';
import NotificationSection from './sub/account/NotificationSection';
import SecuritySection from './sub/account/SecuritySection';
import PreferencesSection from './sub/account/PreferenceSection';
import './styles/Account.css';

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'Shivendra', lastName: 'Kumar', email: 'shivendra@twofold.com', role: 'Farmer', phone: '+91 9876543210',
    farmerId: 'FRM-2024-8473', farmId: 'FARM-UP-1247', farmAddress: 'Gram Panchayat Phulera, Fakauli, Baliya, UP',
    totalLivestock: '34', farmSize: '15', livestockType: 'Cattle', experience: '22', vetOfficer: 'Dr. Rajesh Kumar Singh',
    licenseNumber: 'LIC-2024-45678', licenseExpiry: '2025-12-31', certifications: 'AMU Management, MRL Compliance',
    amuTracking: true, milkMonitoring: true, withdrawalAlerts: true,
    notifications: { mrlAlerts: true, vaccination: true, healthUpdates: true, compliance: true, email: true, sms: false },
    newPassword: '', confirmPassword: '', currentPassword: '', twoFactor: false,
    language: 'English', timezone: 'IST (UTC+05:30)', dateFormat: 'DD/MM/YYYY', units: 'Metric'
  });
  const [showPassword, setShowPassword] = useState({ new: false, confirm: false, current: false });
  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: checked } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const togglePassword = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    console.log('Saving data:', formData);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'farm', label: 'Farm Details', icon: 'agriculture' },
    { id: 'compliance', label: 'Compliance', icon: 'verified' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications', badge: 4 },
    { id: 'security', label: 'Security', icon: 'lock' },
    { id: 'preferences', label: 'Preferences', icon: 'tune' }
  ];

  return (
    <div className="account-container">
      <div className="header">
        <h1>Account Settings</h1>
        <p>Manage your CattleSense profile and monitoring preferences</p>
      </div>

      <div className="tabs">
        {tabs.map(tab => (
          <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            <span className="material-symbols-outlined">{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.badge && <span className="badge">{tab.badge}</span>}
          </button>
        ))}
      </div>

      <div className="content">
        {activeTab === 'profile' && <ProfileSection formData={formData} onChange={handleInputChange} profileImage={profileImage} onImageUpload={handleImageUpload} />}
        {activeTab === 'farm' && <FarmDetailsSection formData={formData} onChange={handleInputChange} />}
        {activeTab === 'compliance' && <ComplianceSection formData={formData} onChange={handleInputChange} />}
        {activeTab === 'notifications' && <NotificationSection formData={formData} onChange={handleInputChange} />}
        {activeTab === 'security' && <SecuritySection formData={formData} onChange={handleInputChange} showPassword={showPassword} togglePassword={togglePassword} />}
        {activeTab === 'preferences' && <PreferencesSection formData={formData} onChange={handleInputChange} />}

        <div className="actions">
          <button className="btn btn-secondary text-center">Cancel</button>
          <button className="btn btn-primary text-center" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}