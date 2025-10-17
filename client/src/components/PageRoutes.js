import React, { useEffect, useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LoadingContext } from '../contexts/AppLoadingContext';
import { useAuth } from '../contexts/AuthContext';

import Lander from './Lander';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import About from './About';
import Blog from './Blog';
import BlogPost from './sub/blog/BlogPage';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import Contact from './Conatct';
import Account from './Account';
import Career from './Career';
import FAQ from './FAQ';
import Help from './Help';
import Legal from './Legal';
import Consumer from './Consumer';
import Farmers from './Farmers';
import Veterinary from './Veterinary';
import Profile from './Profile';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) return null;
  return currentUser ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) return null;
  return !currentUser ? children : <Navigate to="/home" />;
};

const HomeRoute = () => {
  const { currentUser, loading } = useAuth();
  if (loading) return null;
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

      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      <Route path="/faq" element={<FAQ />} />
      <Route path="/help" element={<Help />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/careers" element={<Career />} />
      <Route path="/legal" element={<Legal />} />

      <Route path="/" element={<HomeRoute />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}