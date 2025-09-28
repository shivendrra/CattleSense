import React, { useEffect, useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LoadingContext } from '../contexts/AppLoadingContext';
import { useAuth } from '../contexts/AuthContext';

import Lander from './Lander';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import About from './About';
import NotFound from './NotFound';
import Conatct from './Conatct';
import Career from './Career';
import FAQ from './FAQ';
import Help from './Help';
import Legal from './Legal';
import Consumer from './Consumer';
import Farmers from './Farmers';
import Veterinary from './Veterinary';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null;
  }
  return currentUser ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null;
  }
  return !currentUser ? children : <Navigate to="/home" />;
};

const HomeRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null;
  }
  return currentUser ? <Home /> : <Lander />;
};

export default function PageRoutes() {
  const location = useLocation();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [location.pathname, setLoading]);

  return (
    <Routes>
      <Route path="/auth/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/auth/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/for/farmers" element={<PublicRoute><Farmers /></PublicRoute>} />
      <Route path="/for/veterinary" element={<PublicRoute><Veterinary /></PublicRoute>} />
      <Route path="/for/consumer" element={<PublicRoute><Consumer /></PublicRoute>} />
      <Route path="/faq" element={<PublicRoute><FAQ /></PublicRoute>} />
      <Route path="/help" element={<PublicRoute><Help /></PublicRoute>} />
      <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
      <Route path="/contact" element={<PublicRoute><Conatct /></PublicRoute>} />
      <Route path="/careers" element={<PublicRoute><Career /></PublicRoute>} />
      <Route path="/legal" element={<PublicRoute><Legal /></PublicRoute>} />

      <Route path="/" element={<HomeRoute />} />
      <Route path="*" element={<NotFound />} />

      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    </Routes>
  );
}