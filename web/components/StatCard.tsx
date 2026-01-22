import React from 'react';

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  trend: string;
  isWarning?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, trend, isWarning }) => (
  <div className="bg-white p-6 border border-gray-100 hover:border-gray-300 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <span className={`material-symbols-outlined text-2xl ${isWarning ? 'text-red-500' : 'text-gray-400 group-hover:text-darkBlue transition-colors'}`}>{icon}</span>
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${trend.startsWith('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
        {trend}
      </span>
    </div>
    <div className="mt-4">
      <p className="text-3xl font-serif text-darkBlue mb-1">{value}</p>
      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{label}</p>
    </div>
  </div>
);

export default StatCard;