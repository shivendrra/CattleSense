
import React from 'react';

const FarmerGuide: React.FC = () => (
  <div className="min-h-screen bg-white">
    <div className="bg-primary/5 py-20">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">For Farmers</span>
        <h1 className="text-5xl font-serif text-darkBlue mb-6">Maximize Yield, Minimize Risk</h1>
        <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
          CattleSense empowers you to take control of your livestock's health record through our mobile application.
        </p>
      </div>
    </div>
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <div className="mb-12">
        <h3 className="text-3xl font-serif text-darkBlue mb-4">Why Digital Profiling?</h3>
        <p className="text-lg text-gray-600 font-light leading-relaxed">
          Traditional record-keeping is prone to errors. With CattleSense, you get a digital identity for every animal.
          By tracking antimicrobial usage, you ensure that your produce meets safety standards, opening doors to premium markets and exports.
        </p>
      </div>
      
      <div className="mb-12">
        <h3 className="text-3xl font-serif text-darkBlue mb-6">How You Contribute</h3>
        <ul className="space-y-6 text-lg text-gray-600 font-light">
          <li className="flex gap-4 items-start">
             <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <span className="material-symbols-outlined text-lg">check</span>
             </div>
             <div>
               <strong className="block text-darkBlue text-xl mb-1 font-serif">Register Livestock</strong>
               Create profiles for your animals with unique IDs via the mobile app.
             </div>
          </li>
          <li className="flex gap-4 items-start">
             <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <span className="material-symbols-outlined text-lg">check</span>
             </div>
             <div>
               <strong className="block text-darkBlue text-xl mb-1 font-serif">Log Treatments</strong>
               Keep a verified history of all medications administered to ensure responsible usage.
             </div>
          </li>
          <li className="flex gap-4 items-start">
             <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <span className="material-symbols-outlined text-lg">check</span>
             </div>
             <div>
               <strong className="block text-darkBlue text-xl mb-1 font-serif">Monitor Withdrawal</strong>
               Get alerts when it's safe to sell milk or meat after treatment to avoid contamination.
             </div>
          </li>
        </ul>
      </div>

      <div className="mt-16 p-10 bg-gray-50 border border-gray-100 text-center rounded-sm">
        <h4 className="text-darkBlue font-serif text-3xl mb-4">Download the Mobile App</h4>
        <p className="text-gray-500 mb-6">Available now for Android and iOS devices.</p>
        <button className="bg-darkBlue text-white px-8 py-3 rounded-md font-medium">Get App</button>
      </div>
    </div>
  </div>
);

export default FarmerGuide;
