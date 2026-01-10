
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Lander from './pages/Lander';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import About from './pages/About';
import FarmerGuide from './pages/guides/FarmerGuide';
import VetGuide from './pages/guides/VetGuide';
import ConsumerGuide from './pages/guides/ConsumerGuide';
import ResearcherGuide from './pages/guides/ResearcherGuide';
import PolicymakerGuide from './pages/guides/PolicymakerGuide';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// New Pages
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import FAQ from './pages/FAQ';
import HelpSupport from './pages/HelpSupport';
import NotFound from './pages/NotFound';
import { PrivacyPolicy, TermsOfService, CookiePolicy } from './pages/Legal';

// Route Guard Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in but profile incomplete, force to onboarding
  // UNLESS we are already on the onboarding page
  if (!currentUser.is_profile_complete && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

// Guard to prevent accessing onboarding if already complete
const OnboardingGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  if (currentUser?.is_profile_complete) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <DataProvider>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-white text-darkBlue">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Lander />} />
                  <Route path="/login" element={<Auth />} />

                  <Route path="/onboarding" element={
                    <ProtectedRoute>
                      <OnboardingGuard>
                        <Onboarding />
                      </OnboardingGuard>
                    </ProtectedRoute>
                  } />

                  {/* Publicly Accessible Dashboard */}
                  <Route path="/dashboard" element={<Dashboard />} />

                  {/* Protected Routes */}
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

                  <Route path="/about" element={<About />} />

                  {/* Informational Pages */}
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/support" element={<HelpSupport />} />

                  {/* Legal Pages */}
                  <Route path="/legal/privacy" element={<PrivacyPolicy />} />
                  <Route path="/legal/terms" element={<TermsOfService />} />
                  <Route path="/legal/cookies" element={<CookiePolicy />} />

                  {/* Guides */}
                  <Route path="/guide/farmer" element={<FarmerGuide />} />
                  <Route path="/guide/vet" element={<VetGuide />} />
                  <Route path="/guide/consumer" element={<ConsumerGuide />} />
                  <Route path="/guide/researcher" element={<ResearcherGuide />} />
                  <Route path="/guide/policymaker" element={<PolicymakerGuide />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </DataProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;