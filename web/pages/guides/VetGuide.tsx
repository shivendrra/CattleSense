
import React from 'react';

const VetGuide: React.FC = () => (
  <div className="min-h-screen bg-white">
    <div className="bg-blue-50 py-20">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-4 block">For Veterinarians</span>
        <h1 className="text-5xl font-serif text-darkBlue mb-6">Streamlined Practice Management</h1>
        <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
          Manage multiple farms, track prescriptions, and ensure treatment compliance from our specialized mobile interface.
        </p>
      </div>
    </div>
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <div className="mb-12">
        <h3 className="text-3xl font-serif text-darkBlue mb-4">Enhancing Veterinary Care</h3>
        <p className="text-lg text-gray-600 font-light leading-relaxed">
          CattleSense provides a direct link between your prescriptions and on-ground administration. 
          Monitor recovery rates, detect outbreaks early, and ensure your instructions are followed accurately.
        </p>
      </div>
      
      <div className="mb-12">
        <h3 className="text-3xl font-serif text-darkBlue mb-6">Your Role</h3>
        <ul className="space-y-6 text-lg text-gray-600 font-light">
          <li className="flex gap-4 items-start">
             <div className="w-12 h-12 flex-shrink-0 bg-blue-100 flex items-center justify-center rounded-full text-blue-600">
                <span className="material-symbols-outlined text-2xl">medical_services</span>
             </div>
             <div>
               <strong className="block text-darkBlue text-xl mb-1 font-serif">Digital Prescriptions</strong>
               Issue authenticated digital prescriptions linked to specific animal IDs, reducing paperwork and errors.
             </div>
          </li>
          <li className="flex gap-4 items-start">
             <div className="w-12 h-12 flex-shrink-0 bg-blue-100 flex items-center justify-center rounded-full text-blue-600">
                <span className="material-symbols-outlined text-2xl">visibility</span>
             </div>
             <div>
               <strong className="block text-darkBlue text-xl mb-1 font-serif">Remote Monitoring</strong>
               Track the health status of animals under your care without daily visits, prioritizing critical cases.
             </div>
          </li>
          <li className="flex gap-4 items-start">
             <div className="w-12 h-12 flex-shrink-0 bg-blue-100 flex items-center justify-center rounded-full text-blue-600">
                <span className="material-symbols-outlined text-2xl">analytics</span>
             </div>
             <div>
               <strong className="block text-darkBlue text-xl mb-1 font-serif">Data-Driven Diagnosis</strong>
               Access historical health data to make informed treatment decisions and improve outcomes.
             </div>
          </li>
        </ul>
      </div>

      <div className="mt-16 p-10 bg-gray-50 border border-gray-100 text-center rounded-sm">
        <h4 className="text-darkBlue font-serif text-3xl mb-4">Download the Vet App</h4>
        <p className="text-gray-500 mb-6">Streamline your practice today.</p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium">Get App</button>
      </div>
    </div>
  </div>
);

export default VetGuide;
