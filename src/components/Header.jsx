// src/components/Header.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmexLogo from "../assets/emex-logo.svg";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-sm py-2"
          : "bg-slate-900/80 py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="ml-[205px]">
          <Link to="/" className="flex items-center">
            <img src={EmexLogo} alt="Emex Capital" className="h-10 w-auto" />
            <span className="ml-3 text-xl font-bold text-white hidden md:block">
              EMEX <span className="text-amber-400">CAPITAL</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between w-[350px]">
          <NavLink to="/strategies">Strategies</NavLink>
          <NavLink to="/performance">Performance</NavLink>
          <NavLink to="/team">Team</NavLink>
          <NavLink to="/insights">Insights</NavLink>
        </div>

        <Link to="/login">
          <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium px-5 py-2 rounded-md transition-colors">
            Investor Login
          </button>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="hidden block text-gray-500 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800/95 backdrop-blur-lg pb-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3 pt-2">
            <MobileNavLink
              to="/strategies"
              onClick={() => setMobileMenuOpen(false)}
            >
              Strategies
            </MobileNavLink>
            <MobileNavLink
              to="/performance"
              onClick={() => setMobileMenuOpen(false)}
            >
              Performance
            </MobileNavLink>
            <MobileNavLink to="/team" onClick={() => setMobileMenuOpen(false)}>
              Team
            </MobileNavLink>
            <MobileNavLink
              to="/insights"
              onClick={() => setMobileMenuOpen(false)}
            >
              Insights
            </MobileNavLink>
            <div className="mr-[100px] bg-[blue]">
              <Link to="/login">
                <p
                  className="bg-amber-500 text-slate-900 font-medium px-5 py-3 rounded-md text-center mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Investor Login
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Reusable NavLink Component
const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="text-slate-300 hover:text-amber-600 font-medium transition-colors relative group"
    >
      {children}
      <span className="absolute left-0 -bottom-1 h-0.5 bg-amber-400 w-0 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
};

// Reusable MobileNavLink Component
const MobileNavLink = ({ to, children, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-white py-3 px-4 hover:bg-slate-700/50 rounded-md transition-colors"
    >
      {children}
    </Link>
  );
};

export default Header;
