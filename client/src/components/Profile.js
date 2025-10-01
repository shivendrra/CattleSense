import React, { useState } from 'react';
import './styles/Profile.css';
import ProfileHeader from './sub/profile/ProfileHeader';
import StatsSection from './sub/profile/StatsSection';
import QuickActions from './sub/profile/QuickActions';
import LivestockSection from './sub/profile/LivestockSection';

export default function Profile() {
  const [activeFilter, setActiveFilter] = useState('all');

  const livestockData = [
    {
      id: 'e60bd6fdd4a2c4',
      type: 'cow',
      status: 'healthy',
      breed: 'Red Sindhi',
      age: '6 years old',
      temperature: '37.8',
      heartRate: '68',
      milkProduction: '12',
      weight: '520',
      medications: ['A1-b7 (12/M)', 'Para09 (4/W)']
    },
    {
      id: 'c73bd8faa9b1f2',
      type: 'cow',
      status: 'treatment',
      breed: 'Sahiwal',
      age: '4 years old',
      temperature: '39.2',
      heartRate: '78',
      milkProduction: '8',
      weight: '480',
      medications: ['ANT-45 (8/M)', 'FEVER-X (6/M)', 'VIT-C (2/D)']
    },
    {
      id: 'b84ac7eff2d9a1',
      type: 'buffalo',
      status: 'healthy',
      breed: 'Murrah Buffalo',
      age: '7 years old',
      temperature: '38.0',
      heartRate: '62',
      milkProduction: '15',
      weight: '720',
      medications: ['MULTI-VIT (1/D)']
    },
    {
      id: 'p92df8ecc5b3a7',
      type: 'poultry',
      status: 'healthy',
      breed: 'Rhode Island Red',
      age: '2 years old',
      temperature: '41.0',
      heartRate: '280',
      eggProduction: '5 eggs/week',
      weight: '2.8',
      medications: ['None']
    },
    {
      id: 'g45bc9dff7e2c8',
      type: 'cow',
      status: 'critical',
      breed: 'Gir',
      age: '5 years old',
      temperature: '40.5',
      heartRate: '92',
      milkProduction: '3',
      weight: '445',
      medications: ['ANTI-FEVER (12/M)', 'PAIN-REL (8/M)', 'IMMUNE-B (4/M)']
    },
    {
      id: 'n67ef8bcc3a9d5',
      type: 'buffalo',
      status: 'treatment',
      breed: 'Nili-Ravi Buffalo',
      age: '6 years old',
      temperature: '38.5',
      heartRate: '70',
      milkProduction: '12',
      weight: '680',
      medications: ['DIGEST-AID (6/M)', 'PROBIO-X (2/D)']
    }
  ];

  return (
    <div className="farmer-profile">
      <div className="container-fluid">
        <ProfileHeader />
        <StatsSection />
        <QuickActions />
        <LivestockSection
          livestockData={livestockData}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>
    </div>
  );
}