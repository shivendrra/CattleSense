

export type Role = 'consumer' | 'researcher' | 'admin';

export interface UserSettings {
  notifications?: {
    email: boolean;
    sms: boolean;
    dataAlerts: boolean; // Renamed/New for researchers
  };
  preferences?: {
    language: string;
    timezone: string;
    dateFormat: string;
  };
  security?: {
    twoFactor: boolean;
  };
}

// --- Schema Entities ---

export interface User {
  uid: string; // Maps to firebase_uid
  email: string;
  displayName: string; // name
  role: Role;
  photoURL?: string | null;
  phone?: string;
  
  // Status flags
  is_active: boolean;
  is_profile_complete: boolean;
  onboarding_step: number;
  created_at: string;
  updated_at: string;
  
  settings?: UserSettings;
}

export interface ResearcherProfile {
  user_id: string;
  institution_name: string;
  institution_type: 'university' | 'private' | 'government';
  role_designation: string;
  project_name: string;
  research_area: string;
  verification_status: 'pending' | 'verified' | 'rejected';
}

export interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  msg: string;
  time: string;
  targetRole: Role[];
  region?: string;
}

export interface ChartData {
  name: string;
  value: number;
  limit?: number;
}

export interface Medication {
  name: string;
  dosage: string;
  status: 'active' | 'completed';
  startDate?: string;
  endDate?: string;
}

export interface Animal {
  id: string;
  type: 'cow' | 'buffalo' | 'poultry' | 'goat' | 'pig';
  breed: string;
  age: string;
  weight: number | string;
  temperature: number;
  production: string;
  status: 'healthy' | 'treatment' | 'critical';
  medications: Medication[];
  owner_id?: string;
}