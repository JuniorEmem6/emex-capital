import { useState } from "react";
import { Link } from "react-router-dom";
import EmexLogo from "../assets/emex-logo.svg";

const EmexPitchbookRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    title: "",
    phone: "",
    interest: "",
    subscribe: false,
    terms: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Required field";
    if (!formData.email.trim()) newErrors.email = "Required field";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.company.trim()) newErrors.company = "Required field";
    if (!formData.title.trim()) newErrors.title = "Required field";
    if (!formData.terms) newErrors.terms = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // API call would go here
      console.log("Form submitted:", formData);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#f5f7fa" }}
      >
        <div
          className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center"
          style={{ borderTop: "4px solid #0056b3" }}
        >
          <div className="mb-4" style={{ color: "#00a86b" }}>
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#333333" }}>
            Request Received
          </h2>
          <p className="mb-6" style={{ color: "#666666" }}>
            Thank you for your interest in Emex Capital. Our team will review
            your request and send the pitchbook materials to your email shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 rounded-md font-medium transition-colors"
            style={{ backgroundColor: "#0056b3", color: "white" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#003366")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
          >
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f7fa" }}>
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
      {/* <header className="py-12 px-4 sm:px-6 lg:px-8 text-white" 
              style={{ background: 'linear-gradient(to right, #003366, #0056b3)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            Emex logo placeholder
            <div className="bg-white p-3 rounded-full">
              <svg className="w-10 h-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: '#0056b3' }}>
                <path d="M12 2L4 12l8 10 8-10z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Request Emex Capital Pitchbook</h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: '#a0c4e0' }}>
            Access our exclusive investment materials and market insights
          </p>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="lg:w-1/2">
            <div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-lg"
              style={{ borderTop: "4px solid #0056b3" }}
            >
              <h2
                className="text-2xl font-bold mb-6 flex items-center"
                style={{ color: "#333333" }}
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "#0056b3" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Request Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#333333" }}
                  >
                    Full Name <span style={{ color: "#d9534f" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-offset-2"
                    style={{
                      border: `1px solid ${
                        errors.name ? "#d9534f" : "#e0e0e0"
                      }`,
                      outline: "none",
                      focusRing: "2px solid #0056b3",
                    }}
                    placeholder="John Smith"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm" style={{ color: "#d9534f" }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#333333" }}
                  >
                    Email Address <span style={{ color: "#d9534f" }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-offset-2"
                    style={{
                      border: `1px solid ${
                        errors.email ? "#d9534f" : "#e0e0e0"
                      }`,
                      outline: "none",
                    }}
                    placeholder="john@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm" style={{ color: "#d9534f" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Company Field */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#333333" }}
                  >
                    Company Name <span style={{ color: "#d9534f" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-offset-2"
                    style={{
                      border: `1px solid ${
                        errors.company ? "#d9534f" : "#e0e0e0"
                      }`,
                      outline: "none",
                    }}
                    placeholder="Acme Corporation"
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm" style={{ color: "#d9534f" }}>
                      {errors.company}
                    </p>
                  )}
                </div>

                {/* Title Field */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#333333" }}
                  >
                    Job Title <span style={{ color: "#d9534f" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-offset-2"
                    style={{
                      border: `1px solid ${
                        errors.title ? "#d9534f" : "#e0e0e0"
                      }`,
                      outline: "none",
                    }}
                    placeholder="Investment Director"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm" style={{ color: "#d9534f" }}>
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#333333" }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-offset-2"
                    style={{
                      border: "1px solid #e0e0e0",
                      outline: "none",
                    }}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Interest Field */}
                <div>
                  <label
                    htmlFor="interest"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#333333" }}
                  >
                    Investment Interest
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-offset-2"
                    style={{
                      border: "1px solid #e0e0e0",
                      outline: "none",
                      color: "#333333",
                    }}
                  >
                    <option value="">Select your interest</option>
                    <option value="private-equity">Private Equity</option>
                    <option value="real-assets">Real Assets</option>
                    <option value="credit-strategies">Credit Strategies</option>
                    <option value="secondaries">Secondaries</option>
                  </select>
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="subscribe"
                        name="subscribe"
                        type="checkbox"
                        checked={formData.subscribe}
                        onChange={handleChange}
                        className="h-4 w-4 rounded focus:ring-2 focus:ring-offset-2"
                        style={{
                          border: "1px solid #e0e0e0",
                          color: "#0056b3",
                        }}
                      />
                    </div>
                    <label
                      htmlFor="subscribe"
                      className="ml-3 text-sm"
                      style={{ color: "#333333" }}
                    >
                      Subscribe to Emex Capital insights
                    </label>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={formData.terms}
                        onChange={handleChange}
                        className="h-4 w-4 rounded focus:ring-2 focus:ring-offset-2"
                        style={{
                          border: `1px solid ${
                            errors.terms ? "#d9534f" : "#e0e0e0"
                          }`,
                          color: errors.terms ? "#d9534f" : "#0056b3",
                        }}
                        required
                      />
                    </div>
                    <label
                      htmlFor="terms"
                      className="ml-3 text-sm"
                      style={{ color: "#333333" }}
                    >
                      I agree to Emex Capital's{" "}
                      <a
                        href="#"
                        style={{ color: "#0056b3" }}
                        className="hover:underline"
                      >
                        terms of use
                      </a>{" "}
                      <span style={{ color: "#d9534f" }}>*</span>
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="mt-1 text-sm" style={{ color: "#d9534f" }}>
                      {errors.terms}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    backgroundColor: "#0056b3",
                    color: "white",
                    border: "none",
                    outline: "none",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#003366")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0056b3")
                  }
                >
                  Request Pitchbook
                </button>
              </form>
            </div>
          </div>

          {/* Info Section */}
          <div className="lg:w-1/2">
            <div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-lg h-full"
              style={{ borderTop: "4px solid #00a86b" }}
            >
              <h2
                className="text-2xl font-bold mb-6 flex items-center"
                style={{ color: "#333333" }}
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "#00a86b" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Emex Capital Materials
              </h2>
              <p className="mb-8" style={{ color: "#666666" }}>
                Our pitchbook provides comprehensive information about Emex
                Capital's investment philosophy, track record, and current
                opportunities across private markets.
              </p>

              <div className="space-y-6">
                {/* Feature 1 */}
                <div className="flex">
                  <div
                    className="flex-shrink-0 p-3 rounded-full"
                    style={{ backgroundColor: "#e0f0e9" }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "#00a86b" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold" style={{ color: "#333333" }}>
                      Investment Strategy
                    </h3>
                    <p className="text-sm mt-1" style={{ color: "#666666" }}>
                      Detailed overview of our disciplined investment approach
                      and sector focus.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex">
                  <div
                    className="flex-shrink-0 p-3 rounded-full"
                    style={{ backgroundColor: "#e0f0e9" }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "#00a86b" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold" style={{ color: "#333333" }}>
                      Performance Metrics
                    </h3>
                    <p className="text-sm mt-1" style={{ color: "#666666" }}>
                      Comprehensive performance data across our investment
                      vehicles.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex">
                  <div
                    className="flex-shrink-0 p-3 rounded-full"
                    style={{ backgroundColor: "#e0f0e9" }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "#00a86b" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold" style={{ color: "#333333" }}>
                      Team Expertise
                    </h3>
                    <p className="text-sm mt-1" style={{ color: "#666666" }}>
                      Profiles of our senior investment professionals and their
                      experience.
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex">
                  <div
                    className="flex-shrink-0 p-3 rounded-full"
                    style={{ backgroundColor: "#e0f0e9" }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "#00a86b" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold" style={{ color: "#333333" }}>
                      Market Insights
                    </h3>
                    <p className="text-sm mt-1" style={{ color: "#666666" }}>
                      Proprietary research and analysis on current market
                      opportunities.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="mt-8 pt-6"
                style={{ borderTop: "1px solid #e0e0e0" }}
              >
                <h3 className="font-medium mb-3" style={{ color: "#333333" }}>
                  Confidentiality Notice
                </h3>
                <p className="text-xs" style={{ color: "#666666" }}>
                  The information contained in Emex Capital materials is
                  confidential and intended solely for the use of the individual
                  or entity to whom it is addressed. Unauthorized distribution
                  is prohibited.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-8 px-4 sm:px-6 lg:px-8 text-white"
        style={{ backgroundColor: "#333333" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="container mx-auto px-6">
                <Link to="/" className="flex items-center">
                  <img
                    src={EmexLogo}
                    alt="Emex Capital"
                    className="h-8 w-auto"
                  />
                  <span className="ml-[-30px] text-xl font-bold text-white">
                    EMEX <span className="text-amber-400">CAPITAL</span>
                  </span>
                </Link>
              </div>
            </div>
            <div className="text-sm" style={{ color: "#a0c4e0" }}>
              © {new Date().getFullYear()} Emex Capital. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmexPitchbookRequest;
