import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);
  const [projectsMenuOpen, setProjectsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Eng');
  const languageRef = useRef(null);
  const userMenuRef = useRef(null);
  const resourcesRef = useRef(null);
  const projectsRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target)) {
        setResourcesMenuOpen(false);
      }
      if (projectsRef.current && !projectsRef.current.contains(event.target)) {
        setProjectsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAuthPage = location.pathname.includes('/auth/login') || location.pathname.includes('/auth/signup');

  if (isAuthPage) {
    return null;
  }

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleLanguageDropdown = () => setLanguageDropdownOpen(!languageDropdownOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  if (isAuthPage) {
    return null;
  }

  const languages = [
    { code: 'en', name: 'Eng', nativeName: 'English' },
    { code: 'hi', name: 'Hin', nativeName: 'हिन्दी' },
    { code: 'bn', name: 'Ben', nativeName: 'বাংলা' },
    { code: 'te', name: 'Tel', nativeName: 'తెలుగు' },
    { code: 'ta', name: 'Tam', nativeName: 'தமிழ்' },
    { code: 'gu', name: 'Guj', nativeName: 'ગુજરાતી' },
    { code: 'ur', name: 'Urd', nativeName: 'اردو' },
    { code: 'kn', name: 'Kan', nativeName: 'ಕನ್ನಡ' },
    { code: 'or', name: 'Ori', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'pa', name: 'Pun', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'ml', name: 'Mal', nativeName: 'മലയാളം' }
  ];

  const resourcesData = [
    { title: 'Animal Health', items: ['Disease Prevention', 'Vaccination Guide', 'Treatment Methods', 'Emergency Care'] },
    { title: 'Breeding & Genetics', items: ['Breeding Programs', 'Genetic Selection', 'Artificial Insemination', 'Record Keeping'] },
    { title: 'Nutrition & Feed', items: ['Feed Management', 'Nutritional Requirements', 'Pasture Management', 'Feed Quality'] },
    { title: 'Farm Management', items: ['Facility Design', 'Equipment Guide', 'Safety Protocols', 'Cost Analysis'] }
  ];

  const projectsData = [
    { title: 'Research Projects', items: ['Disease Research', 'Genetic Studies', 'Nutrition Studies'] },
    { title: 'Technology Solutions', items: ['IoT Monitoring', 'Mobile Apps', 'Data Analytics'] }
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    setLanguageDropdownOpen(false);
  };

  const handleResourcesEnter = () => {
    if (window.innerWidth > 991) setResourcesMenuOpen(true);
  };
  const handleResourcesLeave = () => {
    if (window.innerWidth > 991) setResourcesMenuOpen(false);
  };
  const handleProjectsEnter = () => {
    if (window.innerWidth > 991) setProjectsMenuOpen(true);
  };
  const handleProjectsLeave = () => {
    if (window.innerWidth > 991) setProjectsMenuOpen(false);
  };
  const handleResourcesClick = (e) => {
    e.preventDefault();
    if (window.innerWidth <= 991) {
      setResourcesMenuOpen(!resourcesMenuOpen);
    }
  };
  const handleProjectsClick = (e) => {
    e.preventDefault();
    if (window.innerWidth <= 991) {
      setProjectsMenuOpen(!projectsMenuOpen);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid px-4">
          <a className="navbar-brand fw-bold text-dark fs-4" href="/">
            CattleSense
          </a>

          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={toggleNavbar}
            aria-expanded={isOpen}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className={`nav-link px-3 ${location.pathname === '/' || location.pathname === '/home' ? 'active' : ''}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown-mega" ref={resourcesRef} onMouseEnter={handleResourcesEnter} onMouseLeave={handleResourcesLeave}>
                <a 
                  href="/"
                  className={`nav-link fw-medium px-3 ${location.pathname === '/resources' ? 'active' : ''}`}
                  onClick={handleResourcesClick}
                >
                  Resources
                </a>
                <div className={`mega-menu resources-mega ${resourcesMenuOpen ? 'show' : ''}`}>
                  <div className="mega-content">
                    {resourcesData.map((category, index) => (
                      <div key={index} className="mega-category">
                        <h3 className="mega-category-title">{category.title}</h3>
                        <ul className="mega-category-list">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link to={`/resources/${category.title.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown-mega" ref={projectsRef} onMouseEnter={handleProjectsEnter} onMouseLeave={handleProjectsLeave}>
                <a 
                  href="/"
                  className={`nav-link fw-medium px-3 ${location.pathname === '/projects' ? 'active' : ''}`}
                  onClick={handleProjectsClick}
                >
                  Projects
                </a>
                <div className={`mega-menu projects-mega ${projectsMenuOpen ? 'show' : ''}`}>
                  <div className="mega-content">
                    {projectsData.map((category, index) => (
                      <div key={index} className="mega-category">
                        <h3 className="mega-category-title">{category.title}</h3>
                        <ul className="mega-category-list">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link to={`/projects/${category.title.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <Link to="/about" className={`nav-link fw-medium px-3 ${location.pathname === '/about' ? 'active' : ''}`}>
                  About
                </Link>
              </li>
            </ul>

            <div className="d-flex flex-lg-row gap-2">
              <div className="nav-item dropdown" ref={languageRef}>
                <button
                  className="btn dropdown-toggle btn-sm"
                  type="button"
                  onClick={toggleLanguageDropdown}
                >
                  <span className="material-symbols-outlined" id="navIcon3">
                    language
                  </span>
                </button>
                <div className={`language-pane ${languageDropdownOpen ? 'show' : ''}`}>
                  <div className="language-header">
                    Choose a language
                  </div>
                  <div className="language-grid">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className={`language-item ${selectedLanguage === language.name ? 'active' : ''}`}
                        onClick={() => handleLanguageSelect(language)}
                      >
                        <span className="language-name">{language.name}</span>
                        <span className="language-native">{language.nativeName}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="nav-item dropdown" ref={userMenuRef}>
                <button
                  className="btn btn-outline-dark dropdown-toggle nav-login-btn"
                  onClick={toggleUserMenu}
                >
                  <span className="material-symbols-outlined" id="navIcon2">account_circle</span>
                </button>
                <ul className={`dropdown-menu user-menu ${userMenuOpen ? 'show' : ''}`}>
                  <li className='dropdown-item'>
                    <Link to='/help'>
                      <span className="material-symbols-outlined">help</span>
                      Help
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li className='dropdown-item'>
                    <Link to='/farmers'> For Farmers</Link>
                  </li>
                  <li className='dropdown-item'>
                    <Link to='/civil'> For Civilian</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li className='dropdown-item'>
                    <Link to='/auth/login'>Login/Signup</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}