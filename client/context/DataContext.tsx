
import React, { createContext, useContext, useState } from 'react';
import { Alert, User } from '../types';

interface DataContextType {
  alerts: Alert[];
  getAlertsByRole: (role: User['role']) => Alert[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const initialAlerts: Alert[] = [
  { id: 1, type: 'critical', msg: 'Farm #UP-1247 exceeded MRL limit', time: '2h ago', targetRole: ['admin', 'researcher'], region: 'North' },
  { id: 4, type: 'info', msg: 'New viral strain detected in South Region', time: '3d ago', targetRole: ['researcher', 'admin', 'consumer'], region: 'South' },
  { id: 5, type: 'warning', msg: 'High AMU detected in Cluster B', time: '1d ago', targetRole: ['researcher', 'admin'] },
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const getAlertsByRole = (role: User['role']) => {
    return alerts.filter(a => a.targetRole.includes(role));
  };

  return (
    <DataContext.Provider value={{ alerts, getAlertsByRole }}>
      {children}
    </DataContext.Provider>
  );
};
