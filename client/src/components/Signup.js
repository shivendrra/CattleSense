import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import './styles/Login.css';

const API_BASE_URL = 'http://localhost:5000/api';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
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

  const handleAuthSuccess = async (userCredential, displayName) => {
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
            firebase_uid: userData.firebase_uid,
            displayName: displayName || userCredential.user.displayName
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

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const displayName = `${firstName.trim()} ${lastName.trim()}`;
      const userCredential = await signup(email, password, displayName);

      if (userCredential && userCredential.user) {
        await handleAuthSuccess(userCredential, displayName);
      } else {
        throw new Error('Signup failed - no user credential returned');
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please login instead.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else {
        setError(error.message || 'Signup failed. Please try again.');
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

        <div className="col-12 col-md-6 col-lg-7 p-0">
          <div className="login-right">
            <div className="login-card">
              <h3 className='text-center'>Create your CattleSense account</h3>

              <div className="login-content">
                <h3 className="sign-in-title">Sign up with:</h3>

                <div className="google-login">
                  <button className="btn google-btn" onClick={handleGoogleSignIn} disabled={loading}>
                    {loading ? 'Loading...' : 'Signup with Google'}
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
                  <div className="form-group form-group-inline">
                    <input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required disabled={loading} />
                    <input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required disabled={loading} />
                  </div>

                  <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required disabled={loading} />
                  </div>

                  <div className="form-group form-group-inline">
                    <div style={{ position: 'relative', flex: 1 }}>
                      <input type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required minLength={6} disabled={loading} style={{ paddingRight: '40px' }} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', padding: '5px' }} disabled={loading}>
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <input type={showConfirmPassword ? 'text' : 'password'} className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" required minLength={6} disabled={loading} style={{ paddingRight: '40px' }} />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', padding: '5px' }} disabled={loading}>
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="btn sign-in-btn" disabled={loading}>
                    {loading ? 'Loading...' : 'SIGN UP'}
                  </button>
                </form>

                <div className="register-link">
                  Already a member? <Link to="/auth/login">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}