import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './styles/Login.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup, loginWithGoogle, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      clearError();
      const displayName = `${firstName} ${lastName}`;
      await signup(email, password, displayName);
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      clearError();
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Google sign-in error:', error);
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
              <h3 className='text-center'>Proceed to log into your CattleSense account</h3>

              <div className="login-content">
                <h3 className="sign-in-title">Sign up with:</h3>

                <div className="google-login">
                  <button
                    className="btn google-btn"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                  >
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
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group form-group-inline">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn sign-in-btn"
                    disabled={loading}
                  >
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
