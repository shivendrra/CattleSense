import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => (
  <div className="p-8 border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200 transition-all duration-300 group">
    <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center mb-6 text-darkBlue group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <h3 className="text-2xl font-serif text-darkBlue mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed font-light text-sm">{desc}</p>
  </div>
);

export default FeatureCard;