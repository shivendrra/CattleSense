import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import './styles/Login.css';

const API_BASE_URL = 'http://localhost:5000/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const verifyWithBackend = async (idToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Backend verification failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Backend verification error:', error);
      throw error;
    }
  };

  const handleAuthSuccess = async (userCredential) => {
    try {
      if (!userCredential?.user) {
        throw new Error('Invalid user credential');
      }

      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem('firebaseToken', idToken);

      const userData = await verifyWithBackend(idToken);

      if (!userData.user_exists) {
        navigate('/onboarding/initial', {
          state: {
            email: userData.email,
            firebase_uid: userData.firebase_uid
          }
        });
      } else if (!userData.is_profile_complete) {
        navigate('/onboarding/continue', {
          state: {
            onboarding_step: userData.onboarding_step,
            role: userData.role
          }
        });
      } else {
        const dashboardRoutes = {
          farmer: '/dashboard/farmer',
          veterinary: '/dashboard/veterinary',
          government: '/dashboard/government',
          researcher: '/dashboard/researcher'
        };
        navigate(dashboardRoutes[userData.role] || '/dashboard');
      }
    } catch (error) {
      console.error('Auth success handler error:', error);
      setError(error.message || 'Authentication failed. Please try again.');
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      setError('');
      console.log('Attempting login with:', email);
      const userCredential = await login(email, password);
      console.log('Login result:', userCredential);
      
      if (userCredential && userCredential.user) {
        console.log('User authenticated, calling handleAuthSuccess');
        await handleAuthSuccess(userCredential);
      } else {
        console.error('No user credential returned:', userCredential);
        throw new Error('Login failed - no user credential returned');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Invalid email or password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (error.code === 'auth/user-disabled') {
        setError('This account has been disabled.');
      } else {
        setError(error.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const userCredential = await loginWithGoogle();
      
      if (userCredential && userCredential.user) {
        await handleAuthSuccess(userCredential);
      } else {
        throw new Error('Google sign-in failed - no user credential returned');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled. Please try again.');
      } else {
        setError(error.message || 'Google sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="row">
        <div className="col-6 col-md-4 col-lg-5 p-0">
          <div className="login-left"></div>
        </div>
        <div className="col-12 col-md-8 col-lg-7 p-0">
          <div className="login-right">
            <div className="login-card">
              <h3 className='text-center'>Proceed to log into your CattleSense account</h3>
              <div className="login-content">
                <h3 className="sign-in-title">Log in with:</h3>

                <div className="google-login">
                  <button className='btn google-btn' onClick={handleGoogleSignIn} disabled={loading}>
                    {loading ? 'Loading...' : 'Login with Google'}
                  </button>
                </div>

                <div className="divider">
                  <span>or:</span>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email or username" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required disabled={loading} />
                  </div>

                  <div className="form-group" style={{ position: 'relative' }}>
                    <input type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required disabled={loading} style={{ paddingRight: '40px' }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', padding: '5px' }} disabled={loading}>
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <div className="form-options">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} disabled={loading} />
                      <label className="form-check-label my-auto" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="forgot-password">
                      Forgot password?
                    </Link>
                  </div>

                  <button type="submit" className="btn sign-in-btn" disabled={loading}>
                    {loading ? 'Loading...' : 'SIGN IN'}
                  </button>
                </form>

                <div className="register-link">
                  Not a member? <Link to="/auth/signup">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}