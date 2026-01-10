import React from 'react';
import { Link } from 'react-router-dom';

const PolicymakerGuide: React.FC = () => (
  <div className="min-h-screen bg-white">
    <div className="bg-orange-50 py-20">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <span className="text-orange-600 font-bold tracking-widest uppercase text-xs mb-4 block">For Policymakers</span>
        <h1 className="text-5xl font-serif text-darkBlue mb-6">Evidence-Based Governance</h1>
        <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
          Monitor the efficacy of AMR regulations and allocate resources where they are needed most.
        </p>
      </div>
    </div>
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <div className="mb-12">
        <h3 className="text-3xl font-serif text-darkBlue mb-4">From Policy to Practice</h3>
        <p className="text-lg text-gray-600 font-light leading-relaxed">
          The National Action Plan on AMR requires robust surveillance. CattleSense provides the digital infrastructure to monitor compliance with existing regulations and assess the impact of new interventions.
        </p>
      </div>
      
      <div className="mb-12">
        <h3 className="text-3xl font-serif text-darkBlue mb-6">Key Capabilities</h3>
        <ul className="space-y-6 text-lg text-gray-600 font-light">
          <li className="flex flex-col md:flex-row gap-2 md:gap-4">
            <span className="font-bold text-darkBlue md:min-w-[200px]">Compliance Dashboard:</span>
            <span>Instantly view regional adherence to MRL standards.</span>
          </li>
          <li className="flex flex-col md:flex-row gap-2 md:gap-4">
            <span className="font-bold text-darkBlue md:min-w-[200px]">Resource Allocation:</span>
            <span>Identify districts requiring urgent veterinary support or educational intervention.</span>
          </li>
          <li className="flex flex-col md:flex-row gap-2 md:gap-4">
             <span className="font-bold text-darkBlue md:min-w-[200px]">Trend Forecasting:</span>
             <span>Use predictive analytics to anticipate future resistance trends and safeguard public health.</span>
          </li>
        </ul>
      </div>

      <div className="mt-16 p-10 bg-gray-50 border border-gray-100 text-center rounded-sm">
        <h4 className="text-darkBlue font-serif text-3xl mb-4">Access the National Portal</h4>
        <Link to="/login" className="inline-block bg-orange-600 text-white px-10 py-4 font-medium hover:bg-orange-700 transition-colors shadow-lg mt-4">Official Login</Link>
      </div>
    </div>
  </div>
);

export default PolicymakerGuide;