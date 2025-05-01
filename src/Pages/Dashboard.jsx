// src/components/dashboard/InvestorDashboard.jsx
import { useState, useEffect } from 'react';
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';
import { ArrowTrendingUpIcon as ArrowTrendingUp, BanknotesIcon as Banknotes, WalletIcon as Wallet, ChartBarSquareIcon as ChartBarSquare } from '@heroicons/react/24/outline';
import PortfolioTab from '../components/LeverageTrade';


export default function InvestorDashboard() {
  const [balance, setBalance] = useState(1250000.75);
  const [portfolio, setPortfolio] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('portfolio');

  // Mock data fetch
  useEffect(() => {
    // In a real app, this would be API calls
    setPortfolio([
      { id: 1, name: 'Quant Alpha Fund', allocation: 45, value: 562500, change: 2.4 },
      { id: 2, name: 'Global Macro Fund', allocation: 30, value: 375000, change: -0.8 },
      { id: 3, name: 'Market Neutral', allocation: 25, value: 312500.75, change: 1.2 }
    ]);

    setTransactionHistory([
      { id: 1, type: 'deposit', amount: 500000, date: '2023-11-15', status: 'completed' },
      { id: 2, type: 'withdrawal', amount: 25000, date: '2023-10-28', status: 'completed' },
      { id: 3, type: 'dividend', amount: 18450, date: '2023-10-15', status: 'completed' }
    ]);
  }, []);

  const handleDeposit = (amount) => {
    setBalance(prev => prev + amount);
    setTransactionHistory(prev => [
      {
        id: Date.now(),
        type: 'deposit',
        amount,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      },
      ...prev
    ]);
  };

  const handleWithdrawal = (amount) => {
    if (amount > balance) return alert('Insufficient funds');
    setBalance(prev => prev - amount);
    setTransactionHistory(prev => [
      {
        id: Date.now(),
        type: 'withdrawal',
        amount,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      },
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard Header */}
      <header className="bg-slate-900 text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-amber-400">EMEX</span> INVESTOR PORTAL
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-slate-400 text-sm">Total Balance</p>
              <p className="text-2xl font-mono">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-md text-sm font-medium">
              Account Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="container mx-auto p-6">
        <TabGroup>
          <TabList className="flex space-x-1 rounded-xl bg-slate-200 p-1 mb-8">
            {[
              { name: 'Portfolio', icon: ChartBarSquare },
              { name: 'Deposit', icon: Banknotes },
              { name: 'Withdraw', icon: Wallet },
              { name: 'Performance', icon: ArrowTrendingUp }
            ].map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `flex items-center space-x-2 rounded-lg py-3 px-4 text-sm font-medium leading-5 ${
                    selected
                      ? 'bg-white text-amber-600 shadow'
                      : 'text-slate-600 hover:bg-white/[0.12] hover:text-slate-800'
                  }`
                }
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </Tab>
            ))}
          </TabList>

          <TabPanels className="mt-4">
            {/* Portfolio Tab */}
            <TabPanel className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-6">Your Investment Allocation</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-[25px]">
                {/* Portfolio Pie Chart (Mock) */}
                <div className="lg:col-span-1">
                  <div className="w-64 h-64 mx-auto relative">
                    <div className="absolute inset-0 rounded-full border-8 border-slate-100"></div>
                    <div 
                      className="absolute inset-0 rounded-full border-8 border-amber-400 clip-[0%_45%]" 
                      style={{ transform: 'rotate(0deg)' }}
                    ></div>
                    <div 
                      className="absolute inset-0 rounded-full border-8 border-blue-500 clip-[45%_75%]" 
                      style={{ transform: 'rotate(162deg)' }}
                    ></div>
                    <div 
                      className="absolute inset-0 rounded-full border-8 border-emerald-500 clip-[75%_100%]" 
                      style={{ transform: 'rotate(270deg)' }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
                        <p className="text-slate-500 text-sm">Total Value</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fund Breakdown */}
                <div className="lg:col-span-2">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Fund</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Allocation</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Value</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">24h Change</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {portfolio.map((fund) => (
                          <tr key={fund.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{fund.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-full bg-slate-200 rounded h-2.5">
                                  <div 
                                    className="bg-amber-400 h-2.5 rounded" 
                                    style={{ width: `${fund.allocation}%` }}
                                  ></div>
                                </div>
                                <span className="ml-2 text-slate-600">{fund.allocation}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              ${fund.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap ${
                              fund.change >= 0 ? 'text-emerald-600' : 'text-rose-600'
                            }`}>
                              {fund.change >= 0 ? '↑' : '↓'} {Math.abs(fund.change)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabPanel>

            <PortfolioTab />

            {/* Deposit Tab */}
            <TabPanel className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-6">Fund Your Account</h2>
              
              <div className="max-w-md mx-auto">
                <div className="bg-slate-50 p-6 rounded-lg mb-6">
                  <h3 className="font-medium mb-4">Available Transfer Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 border border-slate-200 rounded-lg cursor-pointer hover:border-amber-400">
                      <div className="bg-slate-100 p-2 rounded mr-4">
                        <Banknotes className="h-6 w-6 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium">Wire Transfer</p>
                        <p className="text-slate-500 text-sm">1-2 business days</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border border-slate-200 rounded-lg cursor-pointer hover:border-amber-400">
                      <div className="bg-slate-100 p-2 rounded mr-4">
                        <svg className="h-6 w-6 text-slate-600" viewBox="0 0 24 24">
                          {/* ACH Icon */}
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">ACH Transfer</p>
                        <p className="text-slate-500 text-sm">3-5 business days</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="font-medium mb-4">Deposit Amount</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Amount (USD)</label>
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
                  <button 
                    onClick={() => handleDeposit(10000)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-md"
                  >
                    Initiate Deposit
                  </button>
                </div>
              </div>
            </TabPanel>

            {/* Withdraw Tab */}
            <TabPanel className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-6">Withdraw Funds</h2>
              
              <div className="max-w-md mx-auto">
                <div className="bg-slate-50 p-6 rounded-lg mb-6">
                  <h3 className="font-medium mb-2">Available Balance</h3>
                  <p className="text-3xl font-mono mb-4">
                    ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Amount to Withdraw (USD)</label>
                      <input
                        type="number"
                        className="focus:ring-amber-500 focus:border-amber-500 block w-full py-3 border-slate-300 rounded-md"
                        placeholder="0.00"
                        max={balance}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Destination Account</label>
                      <select className="block w-full py-3 border-slate-300 rounded-md">
                        <option>Bank of America ****1234</option>
                        <option>Chase ****5678</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => handleWithdrawal(5000)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-md"
                >
                  Request Withdrawal
                </button>
                <p className="text-slate-500 text-sm mt-4">
                  Withdrawals typically process within 3-5 business days. A $25 fee applies for expedited processing.
                </p>
              </div>
            </TabPanel>

            {/* Performance Tab */}
            <TabPanel className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-6">Portfolio Performance</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="font-medium mb-4">Historical Returns</h3>
                  <div className="h-64 bg-white border border-slate-200 rounded p-4">
                    {/* Chart would go here */}
                    <div className="flex items-center justify-center h-full text-slate-400">
                      Performance chart visualization
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="font-medium mb-4">Risk Metrics</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Sharpe Ratio', value: '1.42', benchmark: '0.85' },
                      { name: 'Max Drawdown', value: '-8.2%', benchmark: '-12.5%' },
                      { name: 'Volatility', value: '6.8%', benchmark: '9.3%' },
                      { name: 'Beta', value: '0.32', benchmark: '1.00' }
                    ].map((metric, i) => (
                      <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-200 last:border-0">
                        <div>
                          <p className="font-medium">{metric.name}</p>
                          <p className="text-slate-500 text-sm">Benchmark: {metric.benchmark}</p>
                        </div>
                        <p className={`text-lg font-mono ${
                          metric.name === 'Max Drawdown' ? 'text-rose-600' : 'text-emerald-600'
                        }`}>
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-4">Recent Transactions</h3>
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {transactionHistory.map((txn) => (
                        <tr key={txn.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{txn.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap capitalize">{txn.type}</td>
                          <td className={`px-6 py-4 whitespace-nowrap ${
                            txn.type === 'deposit' || txn.type === 'dividend' ? 'text-emerald-600' : 'text-rose-600'
                          }`}>
                            {txn.type === 'deposit' || txn.type === 'dividend' ? '+' : '-'}${txn.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              txn.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {txn.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </main>

      {/* Dashboard Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Emex Capital LLC. All investments involve risk.</p>
          <p className="mt-2">
            For assistance, contact <a href="mailto:support@emexcapital.com" className="text-amber-600 hover:underline">support@emexcapital.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}