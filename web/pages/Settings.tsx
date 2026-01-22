
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ProfileSection,
  PreferencesSection,
  SecuritySection
} from '../components/SettingsSections';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { currentUser, updateUserSettings, updateUserProfile, changePassword, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  // Combined state for all sections
  const [formData, setFormData] = useState({
    // Profile
    displayName: '',
    email: '',
    phone: '',
    role: 'consumer',
    photoURL: '',
    // Preferences
    language: 'English',
    timezone: 'IST (UTC+05:30)',
    dateFormat: 'DD/MM/YYYY',
    // Security
    newPassword: '',
    confirmPassword: '',
    twoFactor: false
  });

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        // Profile
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        role: currentUser.role || 'consumer',
        photoURL: currentUser.photoURL || '',
        // Settings
        ...currentUser.settings?.preferences,
        ...currentUser.settings?.security
      }));
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (name: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setFormData(prev => ({ ...prev, photoURL: ev.target!.result as string }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      setIsDeleting(true);
      setMsg({ type: '', text: '' });
      try {
        await deleteAccount();
        navigate('/');
      } catch (error: any) {
        console.error(error);
        setIsDeleting(false);
        if (error.code === 'auth/requires-recent-login') {
          setMsg({ type: 'error', text: 'Security check failed. Please Log Out and Log In again to confirm your identity before deleting.' });
        } else {
          setMsg({ type: 'error', text: 'Failed to delete account. Please try again later.' });
        }
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMsg({ type: '', text: '' });
    try {
      // 1. Update Core Profile
      await updateUserProfile({
        displayName: formData.displayName,
        phone: formData.phone,
        photoURL: formData.photoURL
      });

      // 2. Handle Password Change if requested
      if (activeTab === 'security' && formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (formData.newPassword.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }
        await changePassword(formData.newPassword);
        setFormData(prev => ({ ...prev, newPassword: '', confirmPassword: '' })); // Clear fields
      }

      // 3. Update Settings nested object
      await updateUserSettings({
        preferences: {
          language: formData.language,
          timezone: formData.timezone,
          dateFormat: formData.dateFormat,
        },
        security: {
          twoFactor: formData.twoFactor
        }
      });

      setMsg({ type: 'success', text: activeTab === 'security' && formData.newPassword ? 'Password updated and settings saved!' : 'Settings saved successfully!' });
      setTimeout(() => setMsg({ type: '', text: '' }), 3000);
    } catch (error: any) {
      console.error(error);
      setMsg({ type: 'error', text: error.message || 'Failed to save settings.' });
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'preferences', label: 'Preferences', icon: 'settings' },
    { id: 'security', label: 'Security', icon: 'lock' },
  ];

  if (!currentUser) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-subtle py-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <h1 className="text-3xl font-serif text-darkBlue mb-6">Account</h1>
            <div className="bg-white border border-gray-100 shadow-sm rounded-sm overflow-hidden">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors border-l-4 ${activeTab === tab.id ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white border border-gray-100 shadow-sm p-8 min-h-[600px] relative rounded-sm">

              {/* Feedback Message */}
              {msg.text && (
                <div className={`absolute top-0 left-0 w-full p-4 text-center text-sm font-medium ${msg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {msg.text}
                </div>
              )}

              <div className="mb-10 mt-2">
                {activeTab === 'profile' && <ProfileSection formData={formData} onChange={handleChange} profileImage={formData.photoURL} onImageUpload={handleImageUpload} />}
                {activeTab === 'preferences' && <PreferencesSection formData={formData} onChange={handleChange} />}
                {activeTab === 'security' && <SecuritySection formData={formData} onChange={handleChange} onToggle={handleToggle} onDelete={handleDeleteAccount} isDeleting={isDeleting} />}
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-100">
                <button
                  onClick={handleSave}
                  disabled={isSaving || isDeleting}
                  className="bg-darkBlue text-white px-8 py-3 font-medium hover:bg-black transition-colors disabled:opacity-70 flex items-center gap-2 rounded-md shadow-lg"
                >
                  {isSaving ? <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span> : null}
                  {activeTab === 'security' && formData.newPassword ? 'Update Password' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
