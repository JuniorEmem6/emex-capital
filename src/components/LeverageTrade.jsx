// src/components/dashboard/PortfolioTab.jsx
import { useState } from 'react';
import { ArrowPathIcon, ArrowDownTrayIcon, BanknotesIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

export default function PortfolioTab() {

  const [activeCapitalTab, setActiveCapitalTab] = useState('request');

  const handleRequestCapital = (amount) => {
    // API integration would go here
    alert(`Request submitted for $${amount} in leverage capital`);
  };

  const handleAddCapital = (amount) => {
    // API integration would go here
    alert(`$${amount} added to margin account`);
  };

  const handleWithdrawProfit = (amount) => {
    // API integration would go here
    alert(`$${amount} profit withdrawal requested`);
  };

  return (
    <div className="space-y-8 mt-[25px]">
      {/* Existing Portfolio Components... */}

      {/* Leverage Trading Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <GlassCapitalMetrics />
       
        {/* Capital Management */}
        <div className="bg-slate-50 rounded-lg p-6">
          <h4 className="text-lg font-medium mb-4">Capital Management</h4>
          
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 mb-6">
            <button
              onClick={() => setActiveCapitalTab('request')}
              className={`px-4 py-2 text-sm font-medium ${
                activeCapitalTab === 'request'
                  ? 'border-b-2 border-amber-500 text-amber-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Request Capital
            </button>
            <button
              onClick={() => setActiveCapitalTab('add')}
              className={`px-4 py-2 text-sm font-medium ${
                activeCapitalTab === 'add'
                  ? 'border-b-2 border-amber-500 text-amber-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Add Capital
            </button>
            <button
              onClick={() => setActiveCapitalTab('withdraw')}
              className={`px-4 py-2 text-sm font-medium ${
                activeCapitalTab === 'withdraw'
                  ? 'border-b-2 border-amber-500 text-amber-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Withdraw Profit
            </button>
          </div>

          {/* Request Capital Tab */}
          {activeCapitalTab === 'request' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amount Requested</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-7 pr-12 py-3 border-slate-300 rounded-md"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <span className="text-slate-500 sm:text-sm pr-3">USD</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Purpose</label>
                <select className="block w-full py-3 border-slate-300 rounded-md">
                  <option>Portfolio Leverage</option>
                  <option>Opportunity Fund</option>
                  <option>Margin Call Coverage</option>
                </select>
              </div>
              <button
                onClick={() => handleRequestCapital(100000)}
                className="flex items-center justify-center w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-md"
              >
                <BanknotesIcon className="h-5 w-5 mr-2" />
                Submit Capital Request
              </button>
              <p className="text-xs text-slate-500 mt-2">
                Typical approval time: 1-2 business days. Max leverage ratio: 4:1
              </p>
            </div>
          )}

          {/* Add Capital Tab */}
          {activeCapitalTab === 'add' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amount to Add</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-7 pr-12 py-3 border-slate-300 rounded-md"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <span className="text-slate-500 sm:text-sm pr-3">USD</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Source</label>
                <select className="block w-full py-3 border-slate-300 rounded-md">
                  <option>Primary Bank Account</option>
                  <option>Other Portfolio</option>
                  <option>Wire Transfer</option>
                </select>
              </div>
              <button
                onClick={() => handleAddCapital(50000)}
                className="flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-md"
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Add to Margin Account
              </button>
              <p className="text-xs text-slate-500 mt-2">
                Funds typically available within 1 business day
              </p>
            </div>
          )}

          {/* Withdraw Profit Tab */}
          {activeCapitalTab === 'withdraw' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Available Profit</label>
                <p className="text-2xl font-mono text-emerald-600">$47,250.00</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Withdrawal Amount</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-7 pr-12 py-3 border-slate-300 rounded-md"
                    placeholder="0.00"
                    max="47250"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <span className="text-slate-500 sm:text-sm pr-3">USD</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Destination</label>
                <select className="block w-full py-3 border-slate-300 rounded-md">
                  <option>Primary Bank Account</option>
                  <option>Other Investment Account</option>
                  <option>Digital Wallet</option>
                </select>
              </div>
              <button
                onClick={() => handleWithdrawProfit(25000)}
                className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md"
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                Request Profit Withdrawal
              </button>
              <p className="text-xs text-slate-500 mt-2">
                Processing time: 3-5 business days. $25 fee for expedited transfers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// src/components/GlassCapitalMetrics.jsx
const GlassCapitalMetrics = () => {
    const metrics = [
      {
        title: "Total Capital",
        value: "$1,250,000",
        change: "+2.4%",
        isPositive: true,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: "Monthly Profit",
        value: "$28,450",
        change: "+5.2%",
        isPositive: true,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )
      },
      {
        title: "Interest Rate",
        value: "8.25%",
        change: "0.0%",
        isPositive: null,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
          </svg>
        )
      },
      {
        title: "Capital Interest",
        value: "$10,312",
        change: "+1.8%",
        isPositive: true,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      }
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)'
            }}
          >
            {/* Floating bubbles */}
            <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-5 -left-5 w-16 h-16 rounded-full bg-amber-400/10"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-white/80">{metric.title}</p>
                  <p className="text-2xl font-bold text-white mt-2">{metric.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${metric.isPositive === null ? 'bg-slate-500/20' : metric.isPositive ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
                  {metric.icon}
                </div>
              </div>
              
              <div className={`mt-4 inline-flex items-center text-sm font-medium px-3 py-1 rounded-full ${
                metric.isPositive === null 
                  ? 'bg-slate-500/20 text-slate-200' 
                  : metric.isPositive 
                    ? 'bg-emerald-500/20 text-emerald-200' 
                    : 'bg-rose-500/20 text-rose-200'
              }`}>
                {metric.change}
                {metric.isPositive !== null && (
                  <svg 
                    className={`ml-1 h-4 w-4 ${metric.isPositive ? 'text-emerald-300' : 'text-rose-300'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={metric.isPositive ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }