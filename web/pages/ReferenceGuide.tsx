
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ReferenceGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'poultry' | 'dairy' | 'sheep'>('general');

  // --- Data Source ---
  const generalData = [
    { id: 1, agent: 'Aminoglycosides', examples: 'Streptomycin, Amikacin, Gentamicin, Neomycin', treatment: 'Used to treat septicaemia, digestive, respiratory, and urinary tract infections.', vcia: true, vhia: false },
    { id: 2, agent: 'Cephalosporins Third Generation', examples: 'Cefotaxime, Ceftiofur, Ceftriaxone', treatment: 'Used in the treatment of septicaemias, respiratory infections, and mastitis.', vcia: true, vhia: false },
    { id: 3, agent: 'Macrolides', examples: 'Erythromycin', treatment: 'Used to treat respiratory infections, Mycoplasma, and liver abscesses (Fusobacterium necrophorum).', vcia: true, vhia: false },
    { id: 4, agent: 'Aminopenicillins', examples: 'Amoxicillin, Ampicillin', treatment: 'Used in the treatment of septicaemias, respiratory, and urinary tract infections.', vcia: true, vhia: false },
    { id: 5, agent: 'Aminopenicillin + Beta-lactamase Inhibitor', examples: 'Amoxicillin + Clavulanic Acid, Ampicillin + Sulbactam', treatment: 'Used in the treatment of septicaemias, respiratory, and urinary tract infections.', vcia: false, vhia: true },
    { id: 6, agent: 'Polypeptides', examples: 'Bacitracin, Polymyxins, Polymyxin B', treatment: 'Used in the treatment of septicaemias, colibacillosis, salmonellosis, and urinary infections.', vcia: false, vhia: false }, // Assuming false based on image crop
    { id: 7, agent: 'Fluoroquinolones', examples: 'Ciprofloxacin, Enrofloxacin, Marbofloxacin, Ofloxacin', treatment: 'Critically important in the treatment of septicaemias, respiratory, and enteric diseases.', vcia: true, vhia: false },
    { id: 8, agent: 'Sulfonamides', examples: 'Sulfadoxine, Sulfamethoxazole, Sulfadiazine', treatment: 'Used for bacterial, coccidial, and protozoal infections.', vcia: true, vhia: false },
    { id: 9, agent: 'Tetracyclines', examples: 'Oxytetracycline, Doxycycline', treatment: 'Used for bacterial, chlamydial, and spirochaetal infections.', vcia: true, vhia: false },
  ];

  const poultryData = [
    { id: 1, class: 'Penicillins', antibiotic: 'Amoxicillin', dose: '100-125 mg/kg' },
    { id: 2, class: 'Penicillins', antibiotic: 'Amoxicillin-clavulanate', dose: '125 mg/kg' },
    { id: 3, class: 'Aminoglycosides', antibiotic: 'Gentamycin', dose: '2.5-5 mg/kg' },
    { id: 4, class: 'Aminoglycosides', antibiotic: 'Neomycin', dose: '10 mg/kg' },
    { id: 5, class: 'Aminoglycosides', antibiotic: 'Spectinomycin', dose: '100 mg/kg' },
    { id: 6, class: 'Aminoglycosides', antibiotic: 'Streptomycin', dose: '25-50 mg/kg' },
    { id: 7, class: 'Bambermycins', antibiotic: 'Bambermycin', dose: '10 mg/kg' },
    { id: 8, class: 'Bambermycins', antibiotic: 'Flavophospholipol', dose: '16 mg/kg' },
    { id: 9, class: 'Penicillins', antibiotic: 'Penicillin', dose: '100-125 mg/kg' },
    { id: 10, class: 'Penicillins', antibiotic: 'Amoxicillin', dose: '125-250 mg/kg' },
    { id: 11, class: 'Cephalosporins', antibiotic: 'Cefotaxime', dose: '50-100 mg/kg' },
    { id: 12, class: 'Glycopeptides', antibiotic: 'Vancomycin', dose: '125-500 mg/kg' },
    { id: 13, class: 'Ionophores', antibiotic: 'Monensin', dose: '100-120 mg/kg' },
    { id: 14, class: 'Macrolides', antibiotic: 'Erythromycin', dose: '10-20 mg/kg' },
    { id: 15, class: 'Macrolides', antibiotic: 'Tylosin', dose: '15-30 mg/kg' },
    { id: 16, class: 'Polypeptides', antibiotic: 'Bacitracin', dose: '20 mg/kg' },
    { id: 17, class: 'Quinolones', antibiotic: 'Fluoroquinolones', dose: '10 mg/kg' },
    { id: 18, class: 'Streptogramins', antibiotic: 'Virginiamycin', dose: '10 mg/kg' },
    { id: 19, class: 'Sulfonamides', antibiotic: 'Sulfa drugs', dose: '30 mg/kg' },
    { id: 20, class: 'Tetracyclines', antibiotic: 'Chlortetracycline', dose: '20-25 mg/kg' },
    { id: 21, class: 'Tetracyclines', antibiotic: 'Oxytetracycline', dose: '5 mg/kg' },
    { id: 22, class: 'Fluoroquinolones', antibiotic: 'Ciprofloxacin', dose: '10 mg/kg' },
    { id: 23, class: 'Quinolones', antibiotic: 'Enrofloxacin', dose: '10 mg/kg' },
    { id: 24, class: 'Sulfonamides', antibiotic: 'Sulfamethazine', dose: '134-195 mg/kg' },
  ];

  const dairyData = [
    { id: 1, class: 'Aminopenicillins', antibiotic: 'Ampicillin sodium', dose: '10-20 mg/kg' },
    { id: 2, class: 'Penicillins', antibiotic: 'Ampicillin trihydrate', dose: '4.4-11 mg/kg' },
    { id: 3, class: 'Cephalosporins', antibiotic: 'Ceftiofur sodium', dose: '1.1-2.2 mg/kg' },
    { id: 4, class: 'Cephalosporins', antibiotic: 'Ceftiofur crystalline-free acid', dose: '6.6 mg/kg' },
    { id: 5, class: 'Aminoglycosides', antibiotic: 'Dihydrostreptomycin', dose: '11 mg/kg' },
    { id: 6, class: 'Quinolones', antibiotic: 'Enrofloxacin', dose: '2.5 mg/kg' },
    { id: 7, class: 'Aminoglycosides', antibiotic: 'Gentamycin', dose: '2-4 mg/kg' },
    { id: 8, class: 'Tetracyclines', antibiotic: 'Oxytetracycline', dose: '10-20 mg/kg' },
    { id: 9, class: 'Fluoroquinolones', antibiotic: 'Ciprofloxacin', dose: '10 mg/kg' },
    { id: 10, class: 'Fluoroquinolones', antibiotic: 'Levofloxacin', dose: '4 mg/kg' },
    { id: 11, class: 'Penicillins', antibiotic: 'Amoxicillin', dose: '10 mg/kg' },
  ];

  const sheepData = [
    { id: 1, class: 'Quinolones', antibiotic: 'Enrofloxacin', dose: '7.5-12.5 mg/kg' },
    { id: 2, class: 'Aminoglycosides', antibiotic: 'Gentamycin', dose: '5 mg/kg' },
    { id: 3, class: 'Tetracyclines', antibiotic: 'Oxytetracycline', dose: '20 mg/kg' },
    { id: 4, class: 'Fluoroquinolones', antibiotic: 'Ciprofloxacin', dose: '5 mg/kg' },
    { id: 5, class: 'Fluoroquinolones', antibiotic: 'Levofloxacin', dose: '5 mg/kg' },
    { id: 6, class: 'Aminopenicillins', antibiotic: 'Ampicillin sodium', dose: '4.4-11 mg/kg' },
    { id: 7, class: 'Penicillins', antibiotic: 'Amoxicillin', dose: '10 mg/kg' },
    { id: 8, class: 'Penicillins', antibiotic: 'Ampicillin trihydrate', dose: '4.4-11 mg/kg' },
    { id: 9, class: 'Cephalosporins', antibiotic: 'Ceftiofur sodium', dose: '1.1-2.2 mg/kg' },
    { id: 10, class: 'Cephalosporins', antibiotic: 'Ceftiofur crystalline-free acid', dose: '6.6 mg/kg' },
    { id: 11, class: 'Aminoglycosides', antibiotic: 'Dihydrostreptomycin', dose: '11 mg/kg' },
    { id: 12, class: 'Sulfonamides', antibiotic: 'Sulfamethazine', dose: '225 mg/kg' },
    { id: 13, class: 'Sulfonamides', antibiotic: 'Sulfadimethoxine', dose: '55 mg/kg' },
    { id: 14, class: 'Sulfonamides', antibiotic: 'Sulfaethoxypyridazine', dose: '55 mg/kg' },
  ];

  const TableHeader = ({ children }: { children: React.ReactNode }) => (
    <th className="px-6 py-4 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
      {children}
    </th>
  );

  const TableCell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <td className={`px-6 py-4 text-sm text-gray-600 border-b border-gray-100 ${className}`}>
      {children}
    </td>
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="bg-darkBlue text-white py-16">
        <div className="container mx-auto px-6">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Antimicrobial Reference Guide</h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl">
            Standard dosage guidelines and classifications for antimicrobial agents across various livestock species.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-orange-50 border-b border-orange-100 p-4">
        <div className="container mx-auto px-6 flex items-start gap-3">
          <span className="material-symbols-outlined text-orange-600 mt-0.5">warning</span>
          <div>
            <p className="text-sm text-orange-800 font-bold mb-1">Medical Disclaimer</p>
            <p className="text-sm text-orange-700">
              This guide is for informational purposes only. Doses may vary based on the specific condition, weight, and health status of the animal.
              <strong> Always consult a licensed veterinarian before administering any medication.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-4 border-b border-gray-200 mb-8">
          {[
            { id: 'general', label: 'Classifications & Usage' },
            { id: 'poultry', label: 'Poultry' },
            { id: 'dairy', label: 'Dairy Cattle/Buffaloes' },
            { id: 'sheep', label: 'Sheep & Goats' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-[2px] ${activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-darkBlue'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden animate-fade-in">

          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr>
                    <TableHeader>Sl. No.</TableHeader>
                    <TableHeader>Antimicrobial Agents</TableHeader>
                    <TableHeader>Treatment</TableHeader>
                    <TableHeader>VCIA</TableHeader>
                    <TableHeader>VHIA</TableHeader>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {generalData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/50">
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <div className="font-bold text-darkBlue mb-1">{row.agent}</div>
                        <div className="text-xs text-gray-500 italic">{row.examples}</div>
                      </TableCell>
                      <TableCell>{row.treatment}</TableCell>
                      <TableCell>
                        {row.vcia && <span className="material-symbols-outlined text-purple-600">check_circle</span>}
                      </TableCell>
                      <TableCell>
                        {row.vhia && <span className="material-symbols-outlined text-purple-600">check_circle</span>}
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 bg-gray-50 text-xs text-gray-500 border-t border-gray-100">
                <span className="font-bold">Legend:</span> VCIA: Veterinary Critically Important Antimicrobials | VHIA: Veterinary Highly Important Antimicrobials
              </div>
            </div>
          )}

          {/* Species Specific Tabs */}
          {(activeTab === 'poultry' || activeTab === 'dairy' || activeTab === 'sheep') && (
            <div className="overflow-x-auto">
              <div className="p-4 bg-blue-50/50 border-b border-blue-100 text-blue-800 text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">info</span>
                Standard Dosage Guidelines for {activeTab === 'poultry' ? 'Poultry' : activeTab === 'dairy' ? 'Dairy Cattle' : 'Sheep & Goats'}
              </div>
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    <TableHeader>Sl. No.</TableHeader>
                    <TableHeader>Antibiotic Class</TableHeader>
                    <TableHeader>Antibiotic</TableHeader>
                    <TableHeader>Dose (mg/kg)</TableHeader>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {(activeTab === 'poultry' ? poultryData : activeTab === 'dairy' ? dairyData : sheepData).map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-mono text-gray-400">{row.id}</TableCell>
                      <TableCell>{row.class}</TableCell>
                      <TableCell className="font-medium text-darkBlue">{row.antibiotic}</TableCell>
                      <TableCell>
                        <span className="inline-block bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold border border-green-100">
                          {row.dose}
                        </span>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferenceGuide;