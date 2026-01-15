
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'bn' | 'mr' | 'te' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // Placeholder for compatibility
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Check for existing Google Translate cookie on load
    // Cookie format: googtrans=/en/hi
    const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
    if (match && match[2]) {
      const parts = match[2].split('/');
      // parts[2] corresponds to the target language code
      if (parts[2]) {
        const langCode = parts[2];
        if (['en', 'hi', 'bn', 'mr', 'te', 'ta'].includes(langCode)) {
          setLanguageState(langCode as Language);
        }
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;

    setLanguageState(lang);

    // Set cookie for Google Translate
    // The format required is /sourceLang/targetLang
    const cookieValue = `/en/${lang}`;

    // Set cookie for root path and domain to ensure it sticks
    document.cookie = `googtrans=${cookieValue}; path=/;`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;

    // Reload the page to trigger Google Translate script to re-process the DOM
    window.location.reload();
  };

  // Legacy placeholder function, not used for full-site translation
  const t = (text: string) => text;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};