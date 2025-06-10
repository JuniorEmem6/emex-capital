// src/components/auth/UnifiedAuth.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, UserCircleIcon, BuildingOffice2Icon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function UnifiedAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // 'admin' or 'hr'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      if (email.includes('@emex.com') && password.length >= 8) {
        if (role === 'admin' && email.startsWith('admin')) {
          navigate('/admin-dashboard');
        } else if (role === 'hr' && email.startsWith('hr')) {
          navigate('/hr-dashboard');
        } else {
          setError('Invalid credentials for selected role');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Role Toggle */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 py-4 px-6 text-center font-medium flex items-center justify-center space-x-2 ${
                role === 'admin' 
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              <ShieldCheckIcon className="h-5 w-5" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => setRole('hr')}
              className={`flex-1 py-4 px-6 text-center font-medium flex items-center justify-center space-x-2 ${
                role === 'hr' 
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              <BuildingOffice2Icon className="h-5 w-5" />
              <span>HR</span>
            </button>
          </div>

          {/* Form Area */}
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className={`p-3 rounded-full ${
                role === 'admin' ? 'bg-amber-500/10' : 'bg-blue-500/10'
              }`}>
                {role === 'admin' ? (
                  <ShieldCheckIcon className={`h-10 w-10 ${role === 'admin' ? 'text-amber-400' : 'text-blue-400'}`} />
                ) : (
                  <BuildingOffice2Icon className={`h-10 w-10 ${role === 'hr' ? 'text-blue-400' : 'text-amber-400'}`} />
                )}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-white mb-2">
              {role === 'admin' ? 'Admin Portal' : 'HR Portal'}
            </h2>
            <p className="text-center text-white/60 mb-8">
              Sign in to your {role === 'admin' ? 'administrator' : 'HR'} account
            </p>

            {error && (
              <div className="mb-4 p-3 bg-rose-500/10 text-rose-400 rounded-lg text-sm flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                  Corporate Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border border-white/10 w-full pl-10 pr-3 py-3 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder={role === 'admin' ? 'admin@emex.com' : 'hr@emex.com'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border border-white/10 w-full pl-10 pr-3 py-3 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className='mt-[15px]'>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                    role === 'admin' 
                      ? 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500'
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    `Sign in as ${role === 'admin' ? 'Admin' : 'HR'}`
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-black/20 border-t border-white/10">
            <p className="text-xs text-center text-white/50">
              © {new Date().getFullYear()} Emex Capital. {role === 'admin' ? 'Administrator' : 'HR'} access only.
            </p>
          </div>
        </div>

        {/* Security Disclaimer */}
        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex">
            <svg className="h-5 w-5 text-amber-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-xs text-white/70">
              This system contains confidential information. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}