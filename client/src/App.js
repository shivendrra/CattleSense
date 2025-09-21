import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoadingProvider } from './contexts/AppLoadingContext';
import SpiralLoader from './components/SpiralLoader';
import Navbar from './components/Navbar';
import PageRoutes from './components/PageRoutes';
import './App.css';

function App() {
  return (
    <Router>
      <LoadingProvider>
        <AuthProvider>
          <SpiralLoader />
          <Navbar />
          <PageRoutes />
        </AuthProvider>
      </LoadingProvider>
    </Router>
  );
}

export default App;