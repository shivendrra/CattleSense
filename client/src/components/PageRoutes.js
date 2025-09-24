import React, { useEffect, useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LoadingContext } from '../contexts/AppLoadingContext';
import { useAuth } from '../contexts/AuthContext';

import Lander from './Lander';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null;
  }
  // return currentUser ? children : <Navigate to="/login" />;
  return currentUser ? children : <Navigate to="/" />;
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
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />

      <Route path="/" element={<ProtectedRoute><Lander /></ProtectedRoute>} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    </Routes>
  );
}