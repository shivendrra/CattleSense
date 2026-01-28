
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieContextType {
  isConsentGiven: boolean | null; // null = not yet decided
  preferences: CookiePreferences;
  acceptAll: () => void;
  rejectAll: () => void;
  updatePreferences: (prefs: CookiePreferences) => void;
  resetConsent: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const useCookie = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
};

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConsentGiven, setIsConsentGiven] = useState<boolean | null>(null);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true
    analytics: false,
    marketing: false,
  });

  const STORAGE_KEY = 'cattlesense_cookie_consent';

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setIsConsentGiven(true);
        setPreferences(parsed);
      } catch (e) {
        // Invalid json, reset
        localStorage.removeItem(STORAGE_KEY);
      }
    } else {
      setIsConsentGiven(null);
    }
  }, []);

  const saveToStorage = (prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsConsentGiven(true);
  };

  const acceptAll = () => {
    saveToStorage({ essential: true, analytics: true, marketing: true });
  };

  const rejectAll = () => {
    saveToStorage({ essential: true, analytics: false, marketing: false });
  };

  const updatePreferences = (newPrefs: CookiePreferences) => {
    // Ensure essential is always true
    saveToStorage({ ...newPrefs, essential: true });
  };

  const resetConsent = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsConsentGiven(null);
    setPreferences({ essential: true, analytics: false, marketing: false });
  };

  return (
    <CookieContext.Provider value={{ isConsentGiven, preferences, acceptAll, rejectAll, updatePreferences, resetConsent }}>
      {children}
    </CookieContext.Provider>
  );
};
