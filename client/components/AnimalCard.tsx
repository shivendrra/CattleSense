import React from 'react';
import { Animal } from '../types';

interface AnimalCardProps {
  animal: Animal;
  assetUrl: string;
  onEdit?: (animal: Animal) => void;
  onDelete?: (id: string) => void;
  readonly?: boolean;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, assetUrl, onEdit, onDelete, readonly = false }) => {
  const statusColors = {
    healthy: 'bg-green-50 text-green-700 border-green-200',
    treatment: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    critical: 'bg-red-50 text-red-700 border-red-200'
  };

  const getAnimalIcon = (type: string) => {
    switch (type) {
      case 'cow': return 'svg/livestock.svg';
      case 'buffalo': return 'svg/livestock.svg';
      case 'poultry': return 'svg/hen.svg';
      case 'goat': return 'svg/goat.svg';
      case 'pig': return 'svg/pig.svg';
      default: return 'svg/livestock.svg';
    }
  };

  const activeMedications = animal.medications.filter(m => m.status === 'active');

  return (
    <div className="border border-gray-100 bg-white hover:shadow-xl transition-all duration-300 group flex flex-col relative overflow-hidden rounded-sm">
      {/* Status Bar */}
      <div className={`h-1 w-full ${animal.status === 'healthy' ? 'bg-green-500' : animal.status === 'treatment' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>

      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 overflow-hidden p-2 shadow-inner">
              <img src={`${assetUrl}${getAnimalIcon(animal.type)}`} alt={animal.type} className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-darkBlue text-lg leading-tight">{animal.breed}</h3>
              <p className="text-xs text-gray-500 font-mono mt-1 bg-gray-100 inline-block px-2 py-0.5 rounded">ID: {animal.id}</p>
            </div>
          </div>
          <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-full ${statusColors[animal.status]}`}>
            {animal.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm mb-6 bg-gray-50/50 p-4 rounded-lg">
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Age</span>
            <span className="font-semibold text-darkBlue">{animal.age}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Temp</span>
            <span className={`font-semibold ${animal.temperature > 39 ? 'text-red-500' : 'text-darkBlue'}`}>{animal.temperature}°C</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Weight</span>
            <span className="font-semibold text-darkBlue">{animal.weight}kg</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Output</span>
            <span className="font-semibold text-darkBlue">{animal.production}</span>
          </div>
        </div>

        {/* Medication Section */}
        <div className="mb-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">medication</span> Active Medications
          </h4>
          {activeMedications.length > 0 ? (
            <div className="space-y-2">
              {activeMedications.map((med, i) => (
                <div key={i} className="flex items-center justify-between bg-blue-50/50 border border-blue-100 p-2 rounded text-xs">
                  <span className="font-medium text-blue-800">{med.name}</span>
                  <span className="text-blue-600 bg-white px-1.5 py-0.5 rounded border border-blue-100 shadow-sm">{med.dosage}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-gray-400 italic bg-gray-50 p-2 rounded border border-gray-100 text-center">
              No active medication
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
        <button className="flex-1 bg-white border border-gray-200 text-darkBlue py-2 text-xs font-semibold uppercase tracking-wider hover:bg-darkBlue hover:text-white transition-colors shadow-sm rounded">
          Full History
        </button>
        {!readonly && (
          <>
            <button onClick={() => onEdit?.(animal)} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-primary hover:border-primary transition-colors rounded">
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
            <button onClick={() => onDelete?.(animal.id)} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-600 transition-colors rounded">
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AnimalCard;