import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Emex Capital color palette
const colors = {
  primary: "#003366", // Dark blue
  secondary: "#FFD700", // Gold
  accent: "#00CC99", // Teal
  lightBg: "#F0F8FF", // Alice blue
  darkText: "#1A1A1A", // Almost black
  lightText: "#666666", // Medium gray
  success: "#28A745", // Green
  warning: "#FFC107", // Yellow
  danger: "#DC3545", // Red
};

const PrivateCallsPlatform = () => {
  const [activeTab, setActiveTab] = useState("calls");
  const [subscriptionLevel, setSubscriptionLevel] = useState(null);
  const [selectedCall, setSelectedCall] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState(null);
  const [news, setNews] = useState([]);
  const [activeNewsTab, setActiveNewsTab] = useState("crypto");
  const [marketData, setMarketData] = useState(null);

  const subscriptionPlans = {
    premium: {
      name: "Premium",
      price: "$99/month",
      features: [
        "3-5 private calls weekly",
        "Memecoin & crypto focus",
        "Basic research reports",
        "Email support"
      ]
    },
    vip: {
      name: "VIP",
      price: "$499/month",
      features: [
        "5-10 private calls weekly",
        "All asset classes",
        "In-depth research reports",
        "24/7 analyst access",
        "Portfolio reviews"
      ]
    }
  };

  // Sample private calls data (same as before)
  const privateCalls = [
    {
      id: 1,
      asset: "DOGERISE",
      type: "Memecoin",
      entry: "$0.0038",
      current: "$0.0045",
      target: "$0.015",
      timeframe: "3-6 months",
      risk: "Medium",
      analysis:
        "Breaking key resistance with strong community growth. Our technical analysis indicates a breakout pattern forming with increasing volume. The memecoin sector is showing renewed interest from retail investors.",
      catalysts: [
        "Upcoming exchange listings confirmed for Q1",
        "Major influencer partnerships announced",
        "V2 tokenomics implementation next month",
      ],
      risks: [
        "Market-wide corrections could impact momentum",
        "Regulatory developments in memecoin space",
        "Liquidity concerns if volume declines",
      ],
      date: "2023-11-15",
      accessLevel: "premium",
      performance: [18, 42, 65, 82, 94, 100],
    },
    {
      id: 2,
      asset: "ETH",
      type: "Cryptocurrency",
      entry: "$1850",
      current: "$2100",
      target: "$2500",
      timeframe: "6-9 months",
      risk: "Low",
      analysis:
        "ETF approval catalyst with decreasing exchange reserves. Ethereum's network activity shows sustained growth in DeFi and NFT sectors. The upcoming EIP-4844 upgrade will significantly reduce gas fees.",
      catalysts: [
        "Spot ETF approval expected in Q2",
        "EIP-4844 implementation scheduled",
        "Institutional staking increasing",
      ],
      risks: [
        "Macroeconomic factors affecting crypto",
        "Layer 2 competition intensifying",
        "Regulatory uncertainty around staking",
      ],
      date: "2023-11-10",
      accessLevel: "premium",
      performance: [13, 27, 42, 58, 71, 84],
    },
    {
      id: 3,
      asset: "NVDA",
      type: "Stock",
      entry: "$485",
      current: "$520",
      target: "$650",
      timeframe: "12 months",
      risk: "Medium",
      analysis:
        "AI leadership with 200% YoY data center growth. NVIDIA continues to dominate the AI accelerator market with their H100 GPUs. The company has secured multi-year supply agreements with major cloud providers.",
      catalysts: [
        "Next-gen AI chips launching in H2",
        "Data center demand exceeding supply",
        "Automotive AI partnerships expanding",
      ],
      risks: [
        "Geopolitical tensions affecting supply chain",
        "Competition from custom silicon solutions",
        "Valuation concerns in tech sector",
      ],
      date: "2023-11-05",
      accessLevel: "vip",
      performance: [7, 15, 28, 42, 55, 70],
    },
    {
      id: 4,
      asset: "SOL",
      type: "Cryptocurrency",
      entry: "$38",
      current: "$45",
      target: "$75",
      timeframe: "4-6 months",
      risk: "High",
      analysis:
        "Institutional adoption increasing with Firedancer upgrade. Solana's throughput improvements and reliability fixes are attracting serious developer interest. The network has fully recovered from previous outages with improved stability.",
      catalysts: [
        "Firedancer client launching in Q2",
        "Major DeFi protocols migrating to Solana",
        "Institutional validator participation growing",
      ],
      risks: [
        "Network performance under peak load",
        "Competition from other high-speed chains",
        "Concentration of validator nodes",
      ],
      date: "2023-10-28",
      accessLevel: "vip",
      performance: [22, 48, 72, 90, 105, 118],
    },
  ];

  // Sample news data
  const newsData = {
    crypto: [
      {
        id: 1,
        title: "Bitcoin Surges Past $45K as ETF Approval Speculation Grows",
        source: "CoinDesk",
        time: "2h ago",
        excerpt:
          "BTC price jumps 8% amid renewed optimism about spot ETF approvals in the US market.",
        sentiment: "positive",
      },
      {
        id: 2,
        title: "Ethereum's Dencun Upgrade Goes Live on Testnet",
        source: "The Block",
        time: "5h ago",
        excerpt:
          "The upgrade promises to significantly reduce Layer 2 transaction fees when it hits mainnet in Q1 2024.",
        sentiment: "positive",
      },
      {
        id: 3,
        title: "Binance Settles with US Regulators for $4.3 Billion",
        source: "Reuters",
        time: "1d ago",
        excerpt:
          "The exchange will pay massive fines but can continue operating under new compliance measures.",
        sentiment: "neutral",
      },
    ],
    stocks: [
      {
        id: 4,
        title: "S&P 500 Hits Record High on Dovish Fed Comments",
        source: "Wall Street Journal",
        time: "3h ago",
        excerpt:
          "Index climbs 1.2% as Powell suggests rate cuts may come sooner than expected.",
        sentiment: "positive",
      },
      {
        id: 5,
        title: "Nvidia Shares Dip After China Export Restrictions",
        source: "CNBC",
        time: "8h ago",
        excerpt:
          "Chipmaker falls 3% despite strong earnings as new export rules threaten China revenue.",
        sentiment: "negative",
      },
      {
        id: 6,
        title: "Tesla Cybertruck Deliveries Begin Amid Production Challenges",
        source: "Bloomberg",
        time: "1d ago",
        excerpt:
          "First customers receive vehicles as company warns of 18-month ramp-up period.",
        sentiment: "neutral",
      },
    ],
    finance: [
      {
        id: 7,
        title: "Fed Holds Rates Steady, Signals 2024 Cuts",
        source: "Financial Times",
        time: "1d ago",
        excerpt:
          "Central bank keeps benchmark rate at 5.25-5.50% but projects 75bps of cuts next year.",
        sentiment: "positive",
      },
      {
        id: 8,
        title: "US Treasury Yields Fall to 4-Month Lows",
        source: "MarketWatch",
        time: "4h ago",
        excerpt:
          "10-year yield drops below 4.2% as bond market prices in dovish Fed pivot.",
        sentiment: "positive",
      },
      {
        id: 9,
        title: "Oil Prices Slide Amid Demand Concerns",
        source: "Reuters",
        time: "6h ago",
        excerpt:
          "Brent crude falls 3% to $78 as global economic worries outweigh OPEC+ cuts.",
        sentiment: "negative",
      },
    ],
  };

  // Sample market data
  const sampleMarketData = {
    crypto: [
      {
        symbol: "BTC",
        name: "Bitcoin",
        price: "$45,230",
        change: "+5.2%",
        chartData: [42000, 42500, 43200, 43800, 44500, 45230],
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        price: "$2,380",
        change: "+3.8%",
        chartData: [2280, 2300, 2320, 2340, 2360, 2380],
      },
      {
        symbol: "SOL",
        name: "Solana",
        price: "$102",
        change: "+12.4%",
        chartData: [90, 92, 95, 98, 100, 102],
      },
    ],
    stocks: [
      {
        symbol: "SPX",
        name: "S&P 500",
        price: "4,750",
        change: "+1.1%",
        chartData: [4680, 4700, 4720, 4730, 4740, 4750],
      },
      {
        symbol: "NVDA",
        name: "Nvidia",
        price: "$485",
        change: "-2.3%",
        chartData: [495, 490, 488, 487, 486, 485],
      },
      {
        symbol: "AAPL",
        name: "Apple",
        price: "$195",
        change: "+0.8%",
        chartData: [192, 193, 194, 194.5, 195, 195],
      },
    ],
    indices: [
      {
        symbol: "DXY",
        name: "US Dollar Index",
        price: "102.5",
        change: "-0.4%",
        chartData: [103, 102.8, 102.7, 102.6, 102.5, 102.5],
      },
      {
        symbol: "VIX",
        name: "Volatility Index",
        price: "12.8",
        change: "-5.6%",
        chartData: [13.5, 13.2, 13.0, 12.9, 12.8, 12.8],
      },
      {
        symbol: "GC",
        name: "Gold",
        price: "$2,050",
        change: "+1.2%",
        chartData: [2020, 2025, 2030, 2035, 2040, 2050],
      },
    ],
  };

  const filteredCalls = subscriptionLevel 
    ? privateCalls.filter(call => 
        subscriptionLevel === 'vip' || call.accessLevel === 'premium'
      )
    : privateCalls.filter(call => false);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setPerformanceData({
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
        datasets: [
          {
            label: "Average Call Performance",
            data: [15, 32, 48, 65, 78, 90],
            backgroundColor: colors.accent,
            borderRadius: 4,
          },
        ],
      });
      setNews(newsData[activeNewsTab]);
      setMarketData(sampleMarketData);
    }, 1500);

    return () => clearTimeout(timer);
  }, [activeNewsTab]);

  // ... (keep existing utility functions)

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.lightBg }}>
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div
              className="w-10 h-10 rounded-full"
              style={{ backgroundColor: colors.primary }}
            ></div>
            <span
              className="ml-3 text-xl font-bold"
              style={{ color: colors.primary }}
            >
              EMEX CAPITAL
            </span>
          </motion.div>

          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "calls" ? "text-white" : "text-gray-700"
              }`}
              style={{
                backgroundColor:
                  activeTab === "calls" ? colors.primary : "transparent",
              }}
              onClick={() => setActiveTab("calls")}
            >
              Private Calls
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "news" ? "text-white" : "text-gray-700"
              }`}
              style={{
                backgroundColor:
                  activeTab === "news" ? colors.primary : "transparent",
              }}
              onClick={() => setActiveTab("news")}
            >
              Market News
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === "subscribe" ? "text-white" : "text-gray-700"
              }`}
              style={{
                backgroundColor:
                  activeTab === "subscribe" ? colors.primary : "transparent",
              }}
              onClick={() => setActiveTab("subscribe")}
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "calls" && (
            <motion.div
              key="calls"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold text-emex-blue">
                    Private Investment Calls
                  </h2>
                  <p className="text-gray-600">
                    {subscriptionLevel
                      ? `You're viewing ${
                          subscriptionLevel === "vip" ? "all" : "premium"
                        } calls as a ${
                          subscriptionPlans[subscriptionLevel].name
                        } member`
                      : "Subscribe to access our exclusive investment calls"}
                  </p>
                </div>

                {!subscriptionLevel ? (
                  <div className="p-8 text-center">
                    <div className="max-w-md mx-auto bg-emex-light-blue p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">
                        Premium Content Locked
                      </h3>
                      <p className="mb-6">
                        Access our team's highest-conviction investment ideas
                        across memecoins, tokens, and equities.
                      </p>
                      <button
                        className="bg-emex-yellow text-emex-blue px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition"
                        onClick={() => setActiveTab("subscribe")}
                      >
                        Unlock Access Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {/* Calls List */}
                    <div className="md:col-span-1 border-r">
                      <div className="p-4 bg-gray-50 border-b">
                        <h3 className="font-semibold">
                          Recent Calls ({filteredCalls.length})
                        </h3>
                      </div>
                      <div className="divide-y">
                        {filteredCalls.map((call) => (
                          <div
                            key={call.id}
                            className={`p-4 cursor-pointer hover:bg-gray-50 ${
                              selectedCall?.id === call.id
                                ? "bg-emex-light-blue"
                                : ""
                            }`}
                            onClick={() => setSelectedCall(call)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="font-bold text-emex-blue">
                                  {call.asset}
                                </span>
                                <span className="ml-2 text-xs px-2 py-1 bg-gray-200 rounded-full">
                                  {call.type}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {call.date}
                              </span>
                            </div>
                            <div className="mt-2 flex justify-between">
                              <span className="text-sm">
                                Entry: {call.entry}
                              </span>
                              <span className="text-sm font-semibold text-emex-green">
                                Target: {call.target}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Call Detail */}
                    <div className="md:col-span-2">
                      {selectedCall ? (
                        <div className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-2xl font-bold text-emex-blue">
                                {selectedCall.asset}
                              </h3>
                              <div className="flex items-center mt-2 space-x-3">
                                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                                  {selectedCall.type}
                                </span>
                                <span className="text-sm">
                                  Risk: {selectedCall.risk}
                                </span>
                                <span className="text-sm">
                                  Timeframe: {selectedCall.timeframe}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-500">
                                Published
                              </div>
                              <div className="font-medium">
                                {selectedCall.date}
                              </div>
                            </div>
                          </div>

                          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="font-semibold text-lg mb-4 text-emex-blue">
                                Trade Details
                              </h4>
                              <div className="space-y-4">
                                <div>
                                  <div className="text-sm text-gray-500">
                                    Entry Price
                                  </div>
                                  <div className="text-xl font-bold">
                                    {selectedCall.entry}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500">
                                    Price Target
                                  </div>
                                  <div className="text-xl font-bold text-emex-green">
                                    {selectedCall.target}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-500">
                                    Potential Return
                                  </div>
                                  <div className="text-xl font-bold text-emex-green">
                                    {Math.round(
                                      (parseFloat(
                                        selectedCall.target.replace("$", "")
                                      ) /
                                        parseFloat(
                                          selectedCall.entry.replace("$", "")
                                        ) -
                                        1) *
                                        100
                                    )}
                                    %
                                  </div>
                                </div>
                              </div>

                              <div className="mt-8">
                                <h4 className="font-semibold text-lg mb-4 text-emex-blue">
                                  Position Sizing
                                </h4>
                                <div className="bg-emex-light-blue p-4 rounded-lg">
                                  <div className="text-sm mb-2">
                                    For a $10,000 portfolio:
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Conservative:</span>
                                    <span className="font-medium">
                                      2% ($200)
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Moderate:</span>
                                    <span className="font-medium">
                                      5% ($500)
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Aggressive:</span>
                                    <span className="font-medium">
                                      10% ($1,000)
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-lg mb-4 text-emex-blue">
                                Analysis
                              </h4>
                              <div className="prose">
                                <p>{selectedCall.analysis}</p>

                                <h5 className="font-medium mt-6">
                                  Key Catalysts
                                </h5>
                                <ul className="list-disc pl-5 space-y-1 mt-2">
                                  <li>Upcoming protocol upgrades</li>
                                  <li>Exchange listings expected</li>
                                  <li>Strong on-chain activity</li>
                                </ul>

                                <h5 className="font-medium mt-4">
                                  Risk Factors
                                </h5>
                                <ul className="list-disc pl-5 space-y-1 mt-2">
                                  <li>Market-wide corrections</li>
                                  <li>Regulatory developments</li>
                                  <li>Liquidity concerns</li>
                                </ul>
                              </div>

                              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <h5 className="font-medium text-yellow-800">
                                  Current Status
                                </h5>
                                <div className="mt-2 flex items-center">
                                  <div className="w-3 h-3 rounded-full bg-emex-green mr-2"></div>
                                  <span>Active (12% towards target)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          Select a call from the list to view details
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "news" && (
            <motion.div
              key="news"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b">
                <h2
                  className="text-2xl font-bold"
                  style={{ color: colors.primary }}
                >
                  Market News & Data
                </h2>
                <p className="text-gray-600">
                  Stay updated with the latest market-moving information
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* News Tabs */}
                <div className="lg:col-span-2 p-6 border-r">
                  <div className="flex border-b">
                    <button
                      className={`px-4 py-2 font-medium ${
                        activeNewsTab === "crypto" ? "border-b-2" : ""
                      }`}
                      style={{
                        borderColor:
                          activeNewsTab === "crypto"
                            ? colors.primary
                            : "transparent",
                        color:
                          activeNewsTab === "crypto"
                            ? colors.primary
                            : colors.lightText,
                      }}
                      onClick={() => setActiveNewsTab("crypto")}
                    >
                      Crypto
                    </button>
                    <button
                      className={`px-4 py-2 font-medium ${
                        activeNewsTab === "stocks" ? "border-b-2" : ""
                      }`}
                      style={{
                        borderColor:
                          activeNewsTab === "stocks"
                            ? colors.primary
                            : "transparent",
                        color:
                          activeNewsTab === "stocks"
                            ? colors.primary
                            : colors.lightText,
                      }}
                      onClick={() => setActiveNewsTab("stocks")}
                    >
                      Stocks
                    </button>
                    <button
                      className={`px-4 py-2 font-medium ${
                        activeNewsTab === "finance" ? "border-b-2" : ""
                      }`}
                      style={{
                        borderColor:
                          activeNewsTab === "finance"
                            ? colors.primary
                            : "transparent",
                        color:
                          activeNewsTab === "finance"
                            ? colors.primary
                            : colors.lightText,
                      }}
                      onClick={() => setActiveNewsTab("finance")}
                    >
                      Financial
                    </button>
                  </div>

                  {isLoading ? (
                    <div className="mt-6 space-y-6">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                          <div className="h-3 bg-gray-100 rounded w-full"></div>
                          <div className="h-3 bg-gray-100 rounded w-5/6 mt-2"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 divide-y">
                      {news.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="py-4 cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex justify-between items-start">
                            <h3
                              className="font-medium"
                              style={{ color: colors.darkText }}
                            >
                              {item.title}
                            </h3>
                            <span
                              className="text-xs px-2 py-1 rounded-full"
                              style={{
                                backgroundColor:
                                  item.sentiment === "positive"
                                    ? colors.success + "20"
                                    : item.sentiment === "negative"
                                    ? colors.danger + "20"
                                    : colors.warning + "20",
                                color:
                                  item.sentiment === "positive"
                                    ? colors.success
                                    : item.sentiment === "negative"
                                    ? colors.danger
                                    : colors.warning,
                              }}
                            >
                              {item.sentiment}
                            </span>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <span>{item.source}</span>
                            <span className="mx-2">•</span>
                            <span>{item.time}</span>
                          </div>
                          <p className="mt-2 text-sm text-gray-700">
                            {item.excerpt}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Market Data */}
                <div className="p-6">
                  <h3
                    className="font-bold mb-4"
                    style={{ color: colors.primary }}
                  >
                    Market Snapshot
                  </h3>

                  {isLoading ? (
                    <div className="space-y-6">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                          <div className="h-20 bg-gray-100 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {marketData[
                        activeNewsTab === "finance" ? "indices" : activeNewsTab
                      ]?.map((item) => (
                        <motion.div
                          key={item.symbol}
                          whileHover={{ scale: 1.02 }}
                          className="p-4 border rounded-lg"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <h4
                                className="font-medium"
                                style={{ color: colors.primary }}
                              >
                                {item.name}
                              </h4>
                              <span className="text-sm text-gray-500">
                                {item.symbol}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{item.price}</div>
                              <div
                                className={`text-sm ${
                                  item.change.startsWith("+")
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {item.change}
                              </div>
                            </div>
                          </div>
                          <div className="h-16">
                            <Line
                              data={{
                                labels: ["", "", "", "", "", ""],
                                datasets: [
                                  {
                                    data: item.chartData,
                                    borderColor: item.change.startsWith("+")
                                      ? colors.success
                                      : colors.danger,
                                    borderWidth: 2,
                                    tension: 0.3,
                                    pointRadius: 0,
                                  },
                                ],
                              }}
                              options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                  legend: {
                                    display: false,
                                  },
                                  tooltip: {
                                    enabled: false,
                                  },
                                },
                                scales: {
                                  x: {
                                    display: false,
                                  },
                                  y: {
                                    display: false,
                                  },
                                },
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Market Overview */}
                  <div className="mt-8">
                    <h3
                      className="font-bold mb-4"
                      style={{ color: colors.primary }}
                    >
                      Market Overview
                    </h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: colors.lightBg }}
                      >
                        <div className="text-sm text-gray-500">Crypto Cap</div>
                        <div className="font-bold">$1.62T</div>
                        <div className="text-sm text-green-600">+3.2%</div>
                      </div>
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: colors.lightBg }}
                      >
                        <div className="text-sm text-gray-500">S&P 500</div>
                        <div className="font-bold">4,750</div>
                        <div className="text-sm text-green-600">+1.1%</div>
                      </div>
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: colors.lightBg }}
                      >
                        <div className="text-sm text-gray-500">DXY</div>
                        <div className="font-bold">102.5</div>
                        <div className="text-sm text-red-600">-0.4%</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Analysis */}
                  <div
                    className="mt-8 p-4 rounded-lg"
                    style={{ backgroundColor: colors.lightBg }}
                  >
                    <h4
                      className="font-medium mb-2"
                      style={{ color: colors.primary }}
                    >
                      Today's Sentiment
                    </h4>
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                        style={{
                          backgroundColor: colors.success,
                          color: "white",
                        }}
                      >
                        ↑
                      </div>
                      <div>
                        <p className="text-sm">
                          Markets are mostly positive today with
                        </p>
                        <p className="text-sm font-medium">
                          72% of assets in green
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "subscribe" && (
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-emex-blue mb-2">
                  Private Call Subscription
                </h2>
                <p className="text-gray-600 mb-6">
                  Gain access to our proprietary investment calls and research
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(subscriptionPlans).map(([key, plan]) => (
                    <div
                      key={key}
                      className={`border rounded-xl p-6 transition-all ${
                        subscriptionLevel === key
                          ? "ring-2 ring-emex-blue"
                          : "hover:shadow-md"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-emex-blue">
                          {plan.name}
                        </h3>
                        <span className="bg-emex-yellow text-emex-blue px-3 py-1 rounded-full text-sm font-medium">
                          {plan.price}
                        </span>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <svg
                              className="w-5 h-5 text-emex-green mr-2 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {subscriptionLevel === key ? (
                        <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium cursor-default">
                          Current Plan
                        </button>
                      ) : (
                        <button
                          className="w-full bg-emex-blue text-white py-3 rounded-lg font-medium hover:bg-emex-dark-blue transition"
                          onClick={() => setSubscriptionLevel(key)}
                        >
                          Subscribe Now
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {subscriptionLevel && (
                  <div className="mt-8 bg-emex-light-blue p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">
                      Payment Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border rounded-lg"
                          placeholder="4242 4242 4242 4242"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Expiration
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border rounded-lg"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border rounded-lg"
                          placeholder="123"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Country
                        </label>
                        <select className="w-full p-3 border rounded-lg">
                          <option>United States</option>
                          <option>United Kingdom</option>
                          <option>Singapore</option>
                        </select>
                      </div>
                    </div>
                    <button
                      className="w-full bg-emex-green text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
                      onClick={() => {
                        setActiveTab("calls");
                        setSelectedCall(privateCalls[0]);
                      }}
                    >
                      Complete Subscription
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default PrivateCallsPlatform;
