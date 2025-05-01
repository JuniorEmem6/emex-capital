// src/pages/auth/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmexLogo from '../assets/emex-logo.svg';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    accreditation: false,
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'Required';
    if (!formData.lastName) newErrors.lastName = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (formData.password.length < 8) newErrors.password = 'Minimum 8 characters';
    if (!formData.accreditation) newErrors.accreditation = 'Required for compliance';
    if (!formData.terms) newErrors.terms = 'Must accept terms';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/verify-email');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 py-6">
        <div className="container mx-auto px-6">
          <Link to="/" className="flex items-center">
            <img src={EmexLogo} alt="Emex Capital" className="h-8 w-auto" />
            <span className="ml-3 text-xl font-bold text-white">
              EMEX <span className="text-amber-400">CAPITAL</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              Create Institutional Account
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-amber-600 hover:text-amber-500">
                Sign in
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm bg-white p-6 border border-slate-200">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.firstName ? 'border-rose-300' : 'border-slate-300'
                    } placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-rose-600">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.lastName ? 'border-rose-300' : 'border-slate-300'
                    } placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-rose-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.email ? 'border-rose-300' : 'border-slate-300'
                  } placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-rose-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.password ? 'border-rose-300' : 'border-slate-300'
                  } placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-rose-600">{errors.password}</p>
                )}
                <p className="mt-1 text-xs text-slate-500">
                  Minimum 8 characters with uppercase, number, and special character
                </p>
              </div>

              {/* Accreditation */}
              <div className="mb-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="accreditation"
                      name="accreditation"
                      type="checkbox"
                      checked={formData.accreditation}
                      onChange={handleChange}
                      className="focus:ring-amber-500 h-4 w-4 text-amber-600 border-slate-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="accreditation" className="font-medium text-slate-700">
                      I qualify as an accredited investor
                    </label>
                    <p className="text-slate-500">
                      (Income &gt;$200K individual/$300K joint or net worth &gt;$1M excluding primary residence)
                    </p>
                    {errors.accreditation && (
                      <p className="mt-1 text-sm text-rose-600">{errors.accreditation}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="mb-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={formData.terms}
                      onChange={handleChange}
                      className="focus:ring-amber-500 h-4 w-4 text-amber-600 border-slate-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-slate-700">
                      I agree to the{' '}
                      <a href="/terms" className="text-amber-600 hover:text-amber-500">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-amber-600 hover:text-amber-500">
                        Privacy Policy
                      </a>
                    </label>
                    {errors.terms && (
                      <p className="mt-1 text-sm text-rose-600">{errors.terms}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isSubmitting ? 'bg-amber-400' : 'bg-amber-600 hover:bg-amber-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Register Account'
                )}
              </button>
            </div>
          </form>

          {/* Compliance Notice */}
          <div className="mt-6 p-4 bg-slate-100 rounded-md text-xs text-slate-600">
            <p>
              <strong>SEC Compliance:</strong> By registering, you acknowledge Emex Capital LLC is a SEC-registered investment advisor. All investors must verify accreditation status before accessing investment opportunities.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-slate-200">
        <div className="container mx-auto px-6 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Emex Capital LLC. All rights reserved.</p>
          <p className="mt-1">Member FINRA/SIPC</p>
        </div>
      </footer>
    </div>
  );
}