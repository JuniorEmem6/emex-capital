// src/components/sections/LiveMarketChart.jsx
import { useState } from 'react';
import TradingViewChart from './TradingView';

export default function LiveMarketChart() {
  const [activeTab, setActiveTab] = useState('SPX'); // Default to S&P 500

  const marketTabs = [
    { id: 'SPX', name: 'S&P 500', symbol: 'SPX' },
    { id: 'NDX', name: 'NASDAQ 100', symbol: 'NDX' },
    { id: 'BTC', name: 'Bitcoin', symbol: 'BTCUSD' },
    { id: 'XAU', name: 'Gold', symbol: 'XAUUSD' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-300 to-slate-600">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-500 mb-4">
            <span className="text-amber-400">Market Intelligence</span> At Your Fingertips
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            "Markets are never wrong - opinions often are."<br />
            Track real-time performance with institutional-grade analytics
          </p>
        </div>

        {/* Chart Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 mt-[-20px]">
          {marketTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* TradingView Widget */}
        <TradingViewChart />
       

        {/* Market Insight Footer */}
        <div className="mt-8 text-center text-slate-400 text-sm">
          <p>
            Chart displays delayed data. For real-time feeds, please{' '}
            <a href="/login" className="text-amber-400 hover:underline">
              log in to your investor portal
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}