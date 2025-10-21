import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, loginWithGoogle, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      clearError();
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Authentication error:', error);
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
        <div className="col-12 col-md-8 col-lg-7 p-0">
          <div className="login-right">
            <div className="login-card">
              <h3 className='text-center'>Proceed to log into your CattleSense account</h3>
              <div className="login-content">
                <h3 className="sign-in-title">Log in with:</h3>

                <div className="google-login">
                  <button className='btn google-btn' onClick={handleGoogleSignIn}>
                    Login with Google
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
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email or username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-options">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label my-auto" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="forgot-password">
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="btn sign-in-btn"
                    disabled={loading}
                  >
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
