
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-6 text-center font-sans">
      <div className="mb-6 relative">
         <h1 className="text-9xl font-serif text-gray-100 select-none">404</h1>
         <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-primary opacity-80">sentiment_dissatisfied</span>
         </div>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-serif text-darkBlue mb-4">Page Not Found</h2>
      <p className="text-gray-500 max-w-md mb-8 font-light">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <Link 
        to="/" 
        className="bg-darkBlue text-white px-8 py-3 rounded-sm font-medium hover:bg-black transition-all shadow-lg flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-sm">home</span>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
