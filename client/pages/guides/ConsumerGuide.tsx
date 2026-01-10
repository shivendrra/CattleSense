import React from 'react';
import { Link } from 'react-router-dom';

const ConsumerGuide: React.FC = () => (
  <div className="min-h-screen bg-white">
    <div className="bg-green-50 py-20">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <span className="text-green-600 font-bold tracking-widest uppercase text-xs mb-4 block">For Consumers</span>
        <h1 className="text-5xl font-serif text-darkBlue mb-6">Know What You Eat</h1>
        <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
          Trace your food from fork to farm. Ensure that the dairy and meat products you consume are free from harmful antibiotic residues.
        </p>
      </div>
    </div>
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <div className="mb-12">
        <h3 className="text-3xl font-serif text-darkBlue mb-4">The Importance of Traceability</h3>
        <p className="text-lg text-gray-600 font-light leading-relaxed">
          Antibiotic resistance is a growing global threat. By choosing products monitored via CattleSense, you support responsible farming and protect your family's health.
        </p>
      </div>
      
      <div className="mb-12">
        <h3 className="text-3xl font-serif text-darkBlue mb-6">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 bg-gray-50/50 text-center">
                <span className="material-symbols-outlined text-4xl text-green-600 mb-4">qr_code_scanner</span>
                <h4 className="text-xl font-serif text-darkBlue mb-2">Scan QR Codes</h4>
                <p className="text-gray-600 text-sm">Scan the code on product packaging to see its full history.</p>
            </div>
            <div className="p-6 border border-gray-100 bg-gray-50/50 text-center">
                <span className="material-symbols-outlined text-4xl text-green-600 mb-4">verified_user</span>
                <h4 className="text-xl font-serif text-darkBlue mb-2">Verify Safety</h4>
                <p className="text-gray-600 text-sm">Check for MRL compliance certifications instantly.</p>
            </div>
            <div className="p-6 border border-gray-100 bg-gray-50/50 text-center">
                <span className="material-symbols-outlined text-4xl text-green-600 mb-4">thumb_up</span>
                <h4 className="text-xl font-serif text-darkBlue mb-2">Support Good</h4>
                <p className="text-gray-600 text-sm">Encourage better practices by buying certified products.</p>
            </div>
        </div>
      </div>

      <div className="mt-16 p-10 bg-gray-50 border border-gray-100 text-center rounded-sm">
        <h4 className="text-darkBlue font-serif text-3xl mb-4">Start Tracing</h4>
        <Link to="/login" className="inline-block bg-green-600 text-white px-10 py-4 font-medium hover:bg-green-700 transition-colors shadow-lg mt-4">Consumer Portal</Link>
      </div>
    </div>
  </div>
);

export default ConsumerGuide;