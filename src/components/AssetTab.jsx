// src/components/dashboard/AssetClassPanel.jsx
import { useState } from 'react';
import { Tab } from '@headlessui/react';

export default function AssetClassPanel() {
  const [selectedTab, setSelectedTab] = useState(0);

  const assetClasses = [
    {
      name: "Forex",
      icon: "💱",
      description: "Currency pairs with institutional-grade liquidity",
      metrics: {
        exposure: "$450,000",
        allocation: "18%",
        ytdReturn: "+5.2%",
        topPairs: ["EUR/USD", "USD/JPY", "GBP/USD"]
      }
    },
    {
      name: "Crypto",
      icon: "🪙",
      description: "Digital asset strategies with quant-driven execution",
      metrics: {
        exposure: "$380,000",
        allocation: "15%",
        ytdReturn: "+22.7%",
        topAssets: ["BTC", "ETH", "SOL"]
      }
    },
    {
      name: "Bonds",
      icon: "📈",
      description: "Fixed income securities across duration spectrum",
      metrics: {
        exposure: "$620,000",
        allocation: "25%",
        ytdReturn: "+3.8%",
        topHoldings: ["US 10Y", "Corporate IG", "TIPS"]
      }
    },
    {
      name: "Stocks",
      icon: "📊",
      description: "Global equity positions with algorithmic management",
      metrics: {
        exposure: "$950,000",
        allocation: "38%",
        ytdReturn: "+12.1%",
        topSectors: ["Tech", "Healthcare", "Financials"]
      }
    },
    {
      name: "Commodities",
      icon: "⛏️",
      description: "Physical and derivative commodity exposure",
      metrics: {
        exposure: "$150,000",
        allocation: "6%",
        ytdReturn: "+8.3%",
        topAssets: ["Gold", "Oil", "Copper"]
      }
    }
  ];

  return (
    <div className="mt-8">
      <div 
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)'
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Asset Class Exposure</h2>
          <div className="text-sm text-white/70">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 overflow-x-auto pb-2">
            {assetClasses.map((asset, idx) => (
              <Tab
                key={idx}
                className={({ selected }) =>
                  `flex items-center px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    selected
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-400/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span className="mr-2 text-lg">{asset.icon}</span>
                {asset.name}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-6">
            {assetClasses.map((asset, idx) => (
              <Tab.Panel key={idx}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Metric Cards */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h3 className="text-sm text-white/70 mb-2">Exposure</h3>
                    <p className="text-2xl font-bold text-white">{asset.metrics.exposure}</p>
                    <p className="text-sm text-white/60 mt-1">{asset.metrics.allocation} of portfolio</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h3 className="text-sm text-white/70 mb-2">YTD Return</h3>
                    <p className={`text-2xl font-bold ${
                      asset.metrics.ytdReturn.includes('+') ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {asset.metrics.ytdReturn}
                    </p>
                    <p className="text-sm text-white/60 mt-1">vs benchmark +{Math.floor(Math.random() * 4) + 1}%</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h3 className="text-sm text-white/70 mb-2">Top Holdings</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {asset.metrics.topPairs?.map((pair, i) => (
                        <span key={i} className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs">
                          {pair}
                        </span>
                      ))}
                      {asset.metrics.topAssets?.map((asset, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs">
                          {asset}
                        </span>
                      ))}
                      {asset.metrics.topHoldings?.map((holding, i) => (
                        <span key={i} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs">
                          {holding}
                        </span>
                      ))}
                      {asset.metrics.topSectors?.map((sector, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs">
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Strategy Description */}
                <div className="mt-6 bg-black/20 rounded-xl p-4 border border-white/5">
                  <h3 className="text-sm font-medium text-white/80 mb-2">{asset.name} Strategy</h3>
                  <p className="text-white/70 text-sm">{asset.description}</p>
                  <button className="mt-3 text-xs flex items-center text-amber-400 hover:text-amber-300">
                    View detailed strategy
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>

        {/* Allocation Chart (Placeholder) */}
        <div className="mt-8 bg-white/5 rounded-xl p-4 h-64 flex items-center justify-center border border-white/10">
          <div className="text-center text-white/50">
            <p>Allocation breakdown chart</p>
            <p className="text-xs mt-2">Pie/Bar chart visualization would appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}