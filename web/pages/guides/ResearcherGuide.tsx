import React from 'react';
import { Link } from 'react-router-dom';

const ResearcherGuide: React.FC = () => (
  <div className="min-h-screen bg-white">
    <div className="bg-purple-50 py-20">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <span className="text-purple-600 font-bold tracking-widest uppercase text-xs mb-4 block">For Researchers</span>
        <h1 className="text-5xl font-serif text-darkBlue mb-6">Data-Driven Epidemiology</h1>
        <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
          Access high-fidelity, real-time datasets to study Antimicrobial Resistance patterns and inform global health strategies.
        </p>
      </div>
    </div>
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <div className="mb-12">
        <h3 className="text-3xl font-serif text-darkBlue mb-4">The Data Gap</h3>
        <p className="text-lg text-gray-600 font-light leading-relaxed">
          Reliable data on antimicrobial usage (AMU) in livestock has historically been scarce. CattleSense bridges this gap by aggregating granular data from thousands of farms across India.
        </p>
      </div>
      
      <div className="mb-12">
        <h3 className="text-3xl font-serif text-darkBlue mb-6">What You Get</h3>
        <ul className="space-y-6 text-lg text-gray-600 font-light">
          <li className="flex gap-4 items-start">
             <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-600">
                <span className="material-symbols-outlined text-xl">map</span>
             </div>
             <div>
               <strong className="block text-darkBlue text-xl mb-1 font-serif">Real-time Heatmaps</strong>
               Visualize resistance hotspots and disease outbreaks as they happen to respond effectively.
             </div>
          </li>
          <li className="flex gap-4 items-start">
             <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-600">
                <span className="material-symbols-outlined text-xl">timeline</span>
             </div>
             <div>
               <strong className="block text-darkBlue text-xl mb-1 font-serif">Longitudinal Studies</strong>
               Track the long-term effects of policy interventions on MRL compliance over time.
             </div>
          </li>
          <li className="flex gap-4 items-start">
             <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-600">
                <span className="material-symbols-outlined text-xl">dataset</span>
             </div>
             <div>
               <strong className="block text-darkBlue text-xl mb-1 font-serif">Standardized Datasets</strong>
               Export clean, structured data in CSV/JSON formats compatible with standard statistical tools (R, Python, SAS).
             </div>
          </li>
        </ul>
      </div>

      <div className="mt-16 p-10 bg-gray-50 border border-gray-100 text-center rounded-sm">
        <h4 className="text-darkBlue font-serif text-3xl mb-4">Start Analyzing</h4>
        <Link to="/login" className="inline-block bg-purple-600 text-white px-10 py-4 font-medium hover:bg-purple-700 transition-colors shadow-lg mt-4">Request Data Access</Link>
      </div>
    </div>
  </div>
);

export default ResearcherGuide;