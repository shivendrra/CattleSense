
import React from 'react';

interface SectionProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onToggle?: (name: string, value: boolean) => void;
}

// Reusable components
const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="mb-8 border-b border-gray-100 pb-4">
    <h2 className="text-xl font-serif text-darkBlue mb-1">{title}</h2>
    <p className="text-sm text-gray-500 font-light">{subtitle}</p>
  </div>
);

const FormField: React.FC<{ label: string; children: React.ReactNode; full?: boolean }> = ({ label, children, full }) => (
  <div className={`flex flex-col gap-2 ${full ? 'col-span-full' : ''}`}>
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className="w-full p-3 border border-gray-200 bg-gray-50 rounded-md focus:outline-none focus:border-darkBlue focus:bg-white transition-all text-sm text-darkBlue shadow-sm placeholder-gray-400"
    {...props}
  />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className="w-full p-3 border border-gray-200 bg-gray-50 rounded-md focus:outline-none focus:border-darkBlue focus:bg-white transition-all text-sm text-darkBlue shadow-sm cursor-pointer"
    {...props}
  />
);

const Toggle: React.FC<{ label: string; desc: string; icon: string; checked: boolean; onChange: () => void }> = ({ label, desc, icon, checked, onChange }) => (
  <div className="flex justify-between items-center p-4 bg-gray-50/50 border border-gray-100 rounded-md hover:bg-white hover:border-gray-200 transition-colors">
    <div className="flex gap-4 items-start">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${checked ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'}`}>
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-darkBlue mb-1">{label}</h4>
        <p className="text-xs text-gray-500 font-light">{desc}</p>
      </div>
    </div>
    <div
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${checked ? 'bg-primary' : 'bg-gray-200'}`}
    >
      <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </div>
  </div>
);

// --- Sections ---

export const ProfileSection: React.FC<SectionProps & { profileImage?: string; onImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ formData, onChange, profileImage, onImageUpload }) => (
  <div>
    <SectionHeader title="Profile Information" subtitle="Manage your account details" />

    <div className="flex items-center gap-6 mb-8 p-6 bg-gray-50 border border-gray-100 rounded-md">
      <div className="w-24 h-24 bg-gradient-to-br from-primary to-darkBlue flex items-center justify-center overflow-hidden border-4 border-white shadow-sm rounded-full">
        {profileImage ? <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-white text-5xl">person</span>}
      </div>
      <div>
        <input type="file" id="photo" accept="image/*" onChange={onImageUpload} hidden />
        <label htmlFor="photo" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-darkBlue text-sm font-medium hover:bg-gray-50 cursor-pointer transition-colors shadow-sm mb-2 rounded-md">
          <span className="material-symbols-outlined text-lg">cloud_upload</span> Upload Photo
        </label>
        <p className="text-xs text-gray-400">JPG or PNG (max 2MB)</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField label="Display Name">
        <Input name="displayName" value={formData.displayName} onChange={onChange} />
      </FormField>
      <FormField label="Email Address" full>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">email</span>
          <Input name="email" type="email" value={formData.email} onChange={onChange} disabled className="pl-10 bg-gray-100 cursor-not-allowed opacity-70" />
        </div>
      </FormField>
      <FormField label="Phone Number">
        <Input name="phone" type="tel" value={formData.phone} onChange={onChange} />
      </FormField>
      <FormField label="Account Type">
        <Select name="role" value={formData.role} onChange={onChange} disabled className="bg-gray-100 cursor-not-allowed opacity-70">
          <option value="consumer">Consumer</option>
          <option value="researcher">Researcher</option>
          <option value="admin">Admin</option>
        </Select>
      </FormField>
    </div>
  </div>
);

export const PreferencesSection: React.FC<SectionProps> = ({ formData, onChange }) => (
  <div>
    <SectionHeader title="System Preferences" subtitle="Customize your portal experience" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField label="Language">
        <Select name="language" value={formData.language} onChange={onChange}>
          <option>English</option>
          <option>Hindi</option>
          <option>Marathi</option>
          <option>Telugu</option>
        </Select>
      </FormField>
      <FormField label="Timezone">
        <Select name="timezone" value={formData.timezone} onChange={onChange}>
          <option>IST (UTC+05:30)</option>
          <option>PST (UTC-08:00)</option>
          <option>EST (UTC-05:00)</option>
        </Select>
      </FormField>
      <FormField label="Date Format">
        <Select name="dateFormat" value={formData.dateFormat} onChange={onChange}>
          <option>DD/MM/YYYY</option>
          <option>MM/DD/YYYY</option>
          <option>YYYY-MM-DD</option>
        </Select>
      </FormField>
    </div>
  </div>
);

export const SecuritySection: React.FC<SectionProps & { onDelete?: () => void; isDeleting?: boolean }> = ({ formData, onChange, onToggle, onDelete, isDeleting }) => (
  <div>
    <SectionHeader title="Security Settings" subtitle="Manage password and security preferences" />

    <div className="grid grid-cols-1 gap-6 mb-8">
      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="New Password">
          <Input type="password" name="newPassword" value={formData.newPassword} onChange={onChange} placeholder="••••••••" />
        </FormField>
        <FormField label="Confirm Password">
          <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={onChange} placeholder="••••••••" />
        </FormField>
      </div>
    </div>

    <div className="mb-8">
      <Toggle label="Two-Factor Authentication" desc="Add extra security layer to your account" icon="lock" checked={formData.twoFactor} onChange={() => onToggle?.('twoFactor', !formData.twoFactor)} />
    </div>

    <div className="border border-red-100 bg-red-50/50 p-6 flex justify-between items-center rounded-md">
      <div className="flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
          <span className="material-symbols-outlined text-xl">warning</span>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-darkBlue mb-1">Delete your Account</h4>
          <p className="text-xs text-gray-500">Once done, this action cannot be undone and data will be lost.</p>
        </div>
      </div>
      <button
        onClick={onDelete}
        disabled={isDeleting}
        className="bg-white border border-red-200 text-red-600 px-4 py-2 text-sm font-medium hover:bg-red-600 hover:text-white transition-colors rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isDeleting ? <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> : null}
        Delete Account
      </button>
    </div>
  </div>
);
