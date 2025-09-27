import React, { useEffect, useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LoadingContext } from '../contexts/AppLoadingContext';
import { useAuth } from '../contexts/AuthContext';

import Lander from './Lander';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import NotFound from './NotFound';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null;
  }
  // return currentUser ? children : <Navigate to="/auth/login" />;
  return currentUser ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null;
  }
  return !currentUser ? children : <Navigate to="/home" />;
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

      <Route path="/" element={<PublicRoute><Lander /></PublicRoute>} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}