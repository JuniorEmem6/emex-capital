// src/components/admin/InvestorDashboard.jsx
import { useState } from 'react';
import { Tab } from '@headlessui/react';
import {
  UserGroupIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  CogIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

export default function DashboardAdmin() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [balance, setBalance] = useState(1250000.75);


  // Mock investor data
  const investors = [
    {
      id: 1,
      name: "James Wilson",
      type: "Institutional",
      entity: "Prestige Wealth Management",
      aum: 12500000,
      allocation: "Quant Alpha Fund (45%)",
      status: "active",
      lastActivity: "2 days ago",
      kycStatus: "verified"
    },
    {
      id: 2,
      name: "Sophia Chen",
      type: "UHNWI",
      entity: "Family Office",
      aum: 8500000,
      allocation: "Global Macro (60%)",
      status: "active",
      lastActivity: "1 week ago",
      kycStatus: "verified"
    },
    {
      id: 3,
      name: "Robert Johnson",
      type: "Fund of Funds",
      entity: "Global Pension Partners",
      aum: 25000000,
      allocation: "Multi-Strategy (100%)",
      status: "pending",
      lastActivity: "1 month ago",
      kycStatus: "in_review"
    },
    {
      id: 4,
      name: "Emma Davis",
      type: "Endowment",
      entity: "Ivy University",
      aum: 18000000,
      allocation: "Market Neutral (30%)",
      status: "inactive",
      lastActivity: "3 months ago",
      kycStatus: "expired"
    }
  ];

  const filteredInvestors = investors.filter(investor =>
    investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    investor.entity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      {/* Header */}
      <header className="bg-slate-900 text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-amber-400">Emex</span> Investor Manager
          </h1>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-slate-400 text-sm">Total Balance</p>
            </div>
          </div>
        </div>
      </header>
      {/* <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Investor Management</h1>
          <p className="text-slate-400">Monitor and administer investor accounts</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search investors..."
              className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            New Investor
          </button>
        </div>
      </div> */}

      {/* Main Dashboard */}
      <div 
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)'
        }}
      >
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 border-b border-white/10 pb-2">
            {[
              { name: "Overview", icon: <ChartBarIcon className="h-5 w-5 mr-2" /> },
              { name: "Investors", icon: <UserGroupIcon className="h-5 w-5 mr-2" /> },
              { name: "Portfolios", icon: <CurrencyDollarIcon className="h-5 w-5 mr-2" /> },
              { name: "Documents", icon: <DocumentTextIcon className="h-5 w-5 mr-2" /> },
              { name: "Performance", icon: <ArrowTrendingUpIcon className="h-5 w-5 mr-2" /> },
            ].map((tab, idx) => (
              <Tab
                key={idx}
                className={({ selected }) =>
                  `flex items-center px-4 py-2 rounded-t-lg text-sm font-medium ${
                    selected
                      ? 'bg-amber-500/20 text-amber-400 border-b-2 border-amber-400'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {tab.icon}
                {tab.name}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-6">
            {/* Overview Panel */}
            <Tab.Panel>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-4">AUM Distribution</h3>
                  <div className="h-64">
                    {/* Placeholder for AUM chart */}
                    <div className="flex items-center justify-center h-full text-white/30">
                      Asset under management chart
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-4">Investor Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-white/70">Active</span>
                      <span className="text-white">2</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-white/70">Inactive</span>
                      <span className="text-white">1</span>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-2xl font-bold text-white">$64M</p>
                      <p className="text-sm text-white/60">Total AUM</p>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <p className="text-2xl font-bold text-white">$42M</p>
                      <p className="text-sm text-white/60">Available Cash</p>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <p className="text-2xl font-bold text-white">$106M</p>
                      <p className="text-sm text-white/60">Total Equity</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="text-sm text-white/80">
                      <p>James Wilson deposited $250,000</p>
                      <p className="text-xs text-white/50">2 days ago</p>
                    </div>
                    <div className="text-sm text-white/80">
                      <p>Sophia Chen requested withdrawal</p>
                      <p className="text-xs text-white/50">1 week ago</p>
                    </div>
                    <div className="text-sm text-white/80">
                      <p>New application from Ivy University</p>
                      <p className="text-xs text-white/50">3 weeks ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Investors Panel */}
            <Tab.Panel>
              <div className="overflow-hidden shadow ring-1 ring-black/5 rounded-lg">
                <table className="min-w-full divide-y divide-white/10">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Investor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">AUM</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Allocation</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">KYC</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/5 divide-y divide-white/10">
                    {filteredInvestors.map((investor) => (
                      <tr key={investor.id} className="hover:bg-white/10">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                              <UserCircleIcon className="h-6 w-6 text-amber-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{investor.name}</div>
                              <div className="text-sm text-white/60">{investor.entity}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{investor.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          ${(investor.aum / 1000000).toFixed(1)}M
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{investor.allocation}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            investor.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : investor.status === 'pending'
                                ? 'bg-amber-500/10 text-amber-400'
                                : 'bg-slate-500/10 text-slate-400'
                          }`}>
                            {investor.status.charAt(0).toUpperCase() + investor.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            investor.kycStatus === 'verified'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : investor.kycStatus === 'in_review'
                                ? 'bg-amber-500/10 text-amber-400'
                                : 'bg-rose-500/10 text-rose-400'
                          }`}>
                            {investor.kycStatus === 'verified' ? 'Verified' : 
                             investor.kycStatus === 'in_review' ? 'In Review' : 'Expired'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-amber-400 hover:text-amber-300 mr-3">Manage</button>
                          <button className="text-blue-400 hover:text-blue-300">Reports</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab.Panel>

            {/* Portfolios Panel */}
            <Tab.Panel>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-medium text-white mb-6">Portfolio Allocation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-96">
                    {/* Placeholder for allocation chart */}
                    <div className="flex items-center justify-center h-full text-white/30 border border-dashed border-white/20 rounded-lg">
                      Portfolio allocation chart
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-white mb-4">By Strategy</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Quant Alpha", amount: "$28.2M", percentage: "44%" },
                        { name: "Global Macro", amount: "$18.7M", percentage: "29%" },
                        { name: "Market Neutral", amount: "$12.1M", percentage: "19%" },
                        { name: "Cash", amount: "$5.0M", percentage: "8%" }
                      ].map((strategy, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/80">{strategy.name}</span>
                            <span className="text-white">{strategy.amount}</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-amber-400 h-2 rounded-full" 
                              style={{ width: strategy.percentage }}
                            ></div>
                          </div>
                          <div className="text-right text-xs text-white/60 mt-1">
                            {strategy.percentage} of AUM
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Other Panels... */}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

// Mock icon component
function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}

function UserCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}