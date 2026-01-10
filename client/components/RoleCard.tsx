import React from 'react';
import { Link } from 'react-router-dom';

interface RoleCardProps {
  role: string;
  image: string;
  desc: string;
  link?: string;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, image, desc, link = "#" }) => (
  <Link to={link} className="bg-white group cursor-pointer border border-gray-100 hover:shadow-xl transition-all duration-500 block">
    <div className="h-64 overflow-hidden relative flex items-center justify-center bg-gray-50 p-8">
      <img src={image} alt={role} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
    </div>
    <div className="p-6 border-t border-gray-100 relative">
      <div className="absolute -top-8 right-6 w-16 h-16 bg-white flex items-center justify-center z-20 shadow-sm border border-gray-100 group-hover:bg-primary group-hover:text-white transition-colors">
        <span className="material-symbols-outlined text-2xl">arrow_forward</span>
      </div>
      <h3 className="text-2xl font-serif text-darkBlue mb-2 group-hover:text-primary transition-colors">{role}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </Link>
);

export default RoleCard;