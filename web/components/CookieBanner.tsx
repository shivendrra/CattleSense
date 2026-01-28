
import React, { useState } from 'react';
import { useCookie } from '../context/CookieContext';
import { Link } from 'react-router-dom';

const CookieBanner: React.FC = () => {
  const { isConsentGiven, acceptAll, rejectAll } = useCookie();

  // Don't show if consent is already determined
  if (isConsentGiven !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-fade-in-up">
      <div className="max-w-7xl mx-auto bg-darkBlue text-white p-6 md:p-8 rounded-sm shadow-2xl border-t-4 border-primary flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary">cookie</span>
            <h3 className="text-lg font-serif font-semibold">We value your privacy</h3>
          </div>
          <p className="text-sm text-gray-300 font-light leading-relaxed max-w-2xl">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
            By clicking "Accept All", you consent to our use of cookies.
            View our <Link to="/legal/cookies" className="underline hover:text-primary transition-colors">Cookie Policy</Link>.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <button
            onClick={rejectAll}
            className="px-6 py-2.5 text-sm font-medium border border-gray-600 rounded hover:bg-gray-800 transition-colors flex-1 md:flex-none"
          >
            Decline
          </button>
          <button
            onClick={acceptAll}
            className="px-6 py-2.5 text-sm font-medium bg-primary text-white rounded hover:bg-white hover:text-darkBlue transition-colors shadow-lg flex-1 md:flex-none"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
