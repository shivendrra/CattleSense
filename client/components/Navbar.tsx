
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const { currentUser, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  
  const ADMIN_EMAIL = 'shivharsh44@gmail.com';

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path 
    ? 'text-primary font-medium bg-primary/5 rounded-full' 
    : 'text-gray-500 hover:text-darkBlue hover:bg-gray-50 rounded-full';
    
  const navLinkClasses = (path: string) => `px-5 py-2 text-sm transition-all duration-300 ${isActive(path)}`;

  const assetUrl = "https://raw.githubusercontent.com/shivendrra/CattleSense/dev/assets/";

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-100 font-sans supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex items-center gap-12">
            <Link to="/" className="flex-shrink-0 flex flex-col group">
               <span className="font-serif text-3xl text-darkBlue leading-none tracking-tight group-hover:text-primary transition-colors duration-300">CattleSense</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className={navLinkClasses('/')}>Home</Link>
              <Link to="/dashboard" className={navLinkClasses('/dashboard')}>Public Dashboard</Link>
              <Link to="/about" className={navLinkClasses('/about')}>About</Link>
              <Link to="/blog" className={navLinkClasses('/blog')}>Blog</Link>
            </div>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center gap-4">
            
            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-darkBlue transition-colors rounded-md hover:bg-gray-50 border border-transparent hover:border-gray-200"
              >
                <span className="material-symbols-outlined text-lg">translate</span>
                <span className="uppercase">{language}</span>
                <span className="material-symbols-outlined text-sm">arrow_drop_down</span>
              </button>
              
              {isLangOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-xl border border-gray-100 overflow-hidden z-50 py-1">
                   {languages.map((lang) => (
                     <button
                       key={lang.code}
                       onClick={() => { setLanguage(lang.code as any); setIsLangOpen(false); }}
                       className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === lang.code ? 'text-primary font-medium bg-primary/5' : 'text-gray-600'}`}
                     >
                       {lang.label}
                     </button>
                   ))}
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block"></div>

            {currentUser ? (
              <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                <div className="hidden lg:flex flex-col items-end mr-2">
                  <span className="text-sm font-semibold text-darkBlue leading-tight">{currentUser.displayName}</span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full mt-0.5">{currentUser.role}</span>
                </div>
                
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="relative focus:outline-none group"
                >
                  <div className="p-0.5 rounded-full border border-gray-200 group-hover:border-primary transition-colors">
                    <img 
                      src={currentUser.photoURL || `${assetUrl}svg/farmer1.svg`} 
                      alt="Profile" 
                      className="h-10 w-10 rounded-full object-cover" 
                    />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-16 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden py-2 z-50 transform origin-top-right transition-all">
                    <div className="px-5 py-4 border-b border-gray-50 lg:hidden bg-gray-50/50">
                       <p className="text-sm font-bold text-darkBlue">{currentUser.displayName}</p>
                       <p className="text-xs text-gray-500 capitalize mt-0.5">{currentUser.role}</p>
                    </div>
                    
                    <div className="px-2 py-2">
                        {currentUser.email === ADMIN_EMAIL && (
                          <Link 
                          to="/admin" 
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-darkBlue bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mb-1"
                          >
                          <span className="material-symbols-outlined text-[20px] text-primary">admin_panel_settings</span> Admin Dashboard
                          </Link>
                        )}
                        <Link 
                        to="/profile" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:text-darkBlue hover:bg-gray-50 rounded-lg transition-colors"
                        >
                        <span className="material-symbols-outlined text-[20px] text-gray-400">person</span> Your Profile
                        </Link>
                        <Link 
                        to="/settings" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:text-darkBlue hover:bg-gray-50 rounded-lg transition-colors"
                        >
                        <span className="material-symbols-outlined text-[20px] text-gray-400">settings</span> Account Settings
                        </Link>
                    </div>

                    <div className="border-t border-gray-100 mt-1 pt-1 px-2 pb-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">logout</span> Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                 <Link to="/login" className="px-6 py-2.5 text-darkBlue hover:text-primary font-medium text-sm transition-colors border border-gray-200 rounded-full hover:border-primary">
                  Log In
                </Link>
              </div>
            )}
            
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black focus:outline-none"
              >
                <span className="material-symbols-outlined text-2xl">{isOpen ? 'close' : 'menu'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 absolute w-full shadow-xl h-screen z-40">
          <div className="px-6 py-6 space-y-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-darkBlue">Home</Link>
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-darkBlue">Public Dashboard</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-darkBlue">About</Link>
            <Link to="/blog" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-darkBlue">Blog</Link>
            
            {currentUser?.email === ADMIN_EMAIL && (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-primary">Admin Dashboard</Link>
            )}

            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs uppercase text-gray-400 font-bold mb-2">Language</p>
              <div className="grid grid-cols-2 gap-2">
                 {languages.map((lang) => (
                    <button 
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code as any); setIsOpen(false); }}
                      className={`text-left px-3 py-2 text-sm rounded ${language === lang.code ? 'bg-primary/10 text-primary' : 'bg-gray-50'}`}
                    >
                      {lang.label}
                    </button>
                 ))}
              </div>
            </div>

            {!currentUser && (
              <div className="pt-6 border-t border-gray-100">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center bg-darkBlue text-white py-3 rounded-lg font-medium shadow-lg">Login / Signup</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
