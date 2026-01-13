
export type Role = 'consumer' | 'researcher' | 'admin';

export interface UserSettings {
  notifications?: {
    email: boolean;
    sms: boolean;
    dataAlerts: boolean;
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

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: Role;
  photoURL?: string | null;
  phone?: string;
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

export interface Medication {
  name: string;
  dosage: string;
  status: 'active' | 'completed';
}

export interface Animal {
  id: string;
  type: string;
  breed: string;
  status: 'healthy' | 'treatment' | 'critical';
  age: string;
  temperature: number;
  weight: string;
  production: string;
  medications: Medication[];
}

// --- Admin Dashboard Types ---

export interface Ticket {
  id: string;
  name: string;
  email: string;
  type: string;
  message: string;
  status: 'open' | 'in_progress' | 'closed';
  createdAt: any; // Firestore Timestamp
  source: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML Content
  category: string;
  author: string;
  authorUrl?: string; // Social Link
  date: string;
  imageUrl?: string; // Blog Cover Image
  createdAt: any;
}
