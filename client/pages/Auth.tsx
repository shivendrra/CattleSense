
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('consumer');
  const [error, setError] = useState('');
  const { login, signup, loginWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();

  const assetUrl = "https://raw.githubusercontent.com/shivendrra/CattleSense/dev/assets/";

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, name, role);
      }
      // Navigation is handled by the useEffect above when currentUser updates
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Authentication failed. Please check credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
      // Navigation is handled by the useEffect above
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Google Sign In failed.");
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-surface border-r border-gray-100">
         <div className="absolute inset-0 bg-primary/5"></div>
        <img 
          src={`${assetUrl}img/background.png`} 
          alt="Cattle Farming" 
          className="absolute inset-0 w-full h-full object-cover p-0 opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-center p-16 bg-black/20">
           <div className="text-darkBlue max-w-lg relative z-10 bg-white/95 p-10 backdrop-blur-md border border-white/50 shadow-2xl rounded-sm">
             <div className="w-16 h-1 bg-primary mb-8"></div>
             <h2 className="text-5xl font-serif mb-6 leading-tight">Public Data Portal</h2>
             <p className="text-lg opacity-80 font-light leading-relaxed text-gray-700">Access real-time AMU data, MRL compliance trends, and national health reports.</p>
           </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 bg-white relative">
        {/* Back to Home Button */}
        <div className="absolute top-8 left-8">
            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm font-medium">
                <span className="material-symbols-outlined text-lg">arrow_back</span> Back to Home
            </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-serif text-darkBlue mb-2">{isLogin ? 'Welcome Back' : 'Create Access ID'}</h2>
            <p className="text-gray-500 font-light">
              {isLogin ? 'Enter your credentials to access the data portal.' : 'Register to request access to public datasets.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2 rounded-md">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-5">
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 text-darkBlue rounded-md focus:outline-none focus:border-darkBlue focus:bg-white transition-all shadow-sm"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Account Type</label>
                    <div className="relative">
                      <select 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-3.5 bg-gray-50 border border-gray-200 text-darkBlue rounded-md focus:outline-none focus:border-darkBlue focus:bg-white transition-all appearance-none shadow-sm cursor-pointer"
                      >
                        <option value="consumer">Consumer (Public Access)</option>
                        <option value="researcher">Researcher (Data Access)</option>
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none material-symbols-outlined text-gray-400">arrow_drop_down</span>
                    </div>
                  </div>
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 text-darkBlue rounded-md focus:outline-none focus:border-darkBlue focus:bg-white transition-all shadow-sm"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 text-darkBlue rounded-md focus:outline-none focus:border-darkBlue focus:bg-white transition-all pr-12 shadow-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-darkBlue transition-colors focus:outline-none flex items-center justify-center p-1"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-darkBlue text-white font-medium py-3.5 rounded-md hover:bg-black transition-all shadow-lg hover:shadow-xl mt-2 transform hover:-translate-y-0.5">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400 font-light">Or continue with</span>
            </div>
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-200 text-darkBlue font-medium py-3.5 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
          >
             <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
             <span>Sign in with Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-primary font-bold hover:text-darkBlue transition-colors hover:underline decoration-1 underline-offset-4 ml-1">
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
