import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import EmexLogo from "../assets/emex-logo.svg";

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const assets = [
    { 
      name: "Gold", 
      symbol: "XAU", 
      value: 1987.32, 
      change: 1.8,
      icon: "🟡"
    },
    { 
      name: "Crude Oil", 
      symbol: "CL1", 
      value: 78.45, 
      change: 0.9,
      icon: "🛢️" 
    },
    { 
      name: "Silver", 
      symbol: "XAG", 
      value: 24.18, 
      change: -0.7,
      icon: "⚪"
    },
    { 
      name: "Solana", 
      symbol: "SOL", 
      value: 149.32, 
      change: 2.1,
      icon: "🔵"
    },
    { 
      name: "Bitcoin", 
      symbol: "BTC", 
      value: 63428.90, 
      change: 2.1,
      icon: "🟠"
    },
  ];

  const currencies = [
    { 
      name: "USD/JPY", 
      value: 157.32, 
      change: 1.8,
      trend: "up" 
    },
    { 
      name: "EUR/USD", 
      value: 1.0845, 
      change: 0.9,
      trend: "up" 
    },
    { 
      name: "AUD/USD", 
      value: 0.6618, 
      change: -0.7,
      trend: "down" 
    },
    { 
      name: "USD/CAD", 
      value: 1.3632, 
      change: 2.1,
      trend: "up" 
    },
    { 
      name: "GBP/USD", 
      value: 1.2689, 
      change: -0.4,
      trend: "down" 
    },

    { 
      name: "USD/CHF", 
      value: 0.8229, 
      change: 0.84,
      trend: "up" 
    },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-slate-900 overflow-hidden lg:pt-15"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-amber-400/30 to-transparent rounded-full mix-blend-soft-light filter blur-3xl animate-float1"></div>
        <div className="absolute top-2/3 right-1/3 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-transparent rounded-full mix-blend-soft-light filter blur-3xl animate-float2"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* Logo & Tagline - Enhanced */}
          <div className="flex items-center mb-8">
            <img
              src={EmexLogo}
              alt="Emex Capital"
              className="h-12 sm:h-16 w-auto"
            />
            <span className="ml-4 text-sm sm:text-lg font-medium text-amber-400 border-l border-amber-400/30 pl-4 py-1">
              QUANTITATIVE EDGE SINCE 2025
            </span>
          </div>

          {/* Main Headline with Staggered Animation */}
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-600">Systematic Alpha</span><br />
              For The Digital Age
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl leading-relaxed"
          >
            Harnessing alternative data and machine learning to uncover market inefficiencies across crypto and traditional assets.
          </motion.p>

          {/* CTAs with Improved Styling */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <motion.a
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 8px 25px -5px rgba(245, 158, 11, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              href="/login"
              className="bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold py-4 px-8 rounded-lg text-center transition-all duration-300"
            >
              Investor Portal
            </motion.a>
            <motion.a
              whileHover={{ 
                scale: 1.03,
                backgroundColor: "rgba(245, 158, 11, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              href="/pitchbook"
              className="bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10 font-bold py-4 px-8 rounded-lg text-center transition-all duration-300"
            >
              Request Pitchbook
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Asset Tickers - Desktop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 w-[500px] bg-slate-800/50 backdrop-blur-md rounded-l-2xl p-5 border-l border-t border-b border-slate-700/50"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-amber-400">Asset Watchlist</h3>
            <span className="text-xs text-slate-400">LIVE</span>
          </div>
          
          <div className="space-y-4">
            {assets.map((asset, i) => (
              <motion.div 
                key={i}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center justify-between p-2 hover:bg-slate-700/30 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-xl mr-3">{asset.icon}</span>
                  <div>
                    <p className="font-medium text-white">{asset.name}</p>
                    <p className="text-xs text-slate-400">{asset.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-white">${asset.value.toLocaleString()}</p>
                  <p className={`text-xs font-medium ${asset.change > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {asset.change > 0 ? '↑' : '↓'} {Math.abs(asset.change)}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 mb-4">
            <h3 className="text-lg font-bold text-amber-400">FX Markets</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {currencies.map((currency, i) => (
              <motion.div
                key={i}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="bg-slate-700/30 p-3 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-white">{currency.name}</p>
                  <p className={`text-sm font-mono ${currency.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {currency.trend === 'up' ? '↑' : '↓'} {currency.change}%
                  </p>
                </div>
                <p className="font-mono text-white mt-1">{currency.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile-Friendly Asset Display */}
        <motion.div 
          className="lg:hidden mt-[30px]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4">
              {assets.slice(0, 3).map((asset, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0 bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 w-[125px]"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-lg mr-2">{asset.icon}</span>
                    <p className="font-medium text-white text-sm">{asset.symbol}</p>
                  </div>
                  <p className="font-mono text-white text-lg">${asset.value.toLocaleString()}</p>
                  <p className={`text-xs mt-1 ${asset.change > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {asset.change > 0 ? '↑' : '↓'} {Math.abs(asset.change)}%
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* New Fund Highlights - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-[10px] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl"
        >
          {[
            {
              value: "AI-Driven",
              label: "Portfolio Engine",
              emoji: "🤖",
              color: "bg-linear-to-br from-purple-500 to-indigo-600",
              desc: "Real-time market adaptation"
            },
            {
              value: "0% Fees",
              label: "Founding Investors",
              emoji: "🎯",
              color: "bg-linear-to-br from-emerald-500 to-teal-600",
              desc: "Limited availability"
            },
            {
              value: "24/7",
              label: "Global Coverage",
              emoji: "🌎",
              color: "bg-gradient-to-br from-sky-500 to-blue-600",
              desc: "Crypto + Traditional"
            },
            {
              value: "$1k",
              label: "Minimum Entry",
              emoji: "🔓",
              color: "bg-linear-to-br from-amber-500 to-orange-600",
              desc: "Institutional-grade access"
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)"
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                delay: 1.2 + i * 0.1
              }}
              className={`${item.color} backdrop-blur-sm p-5 rounded-xl border border-white/10 shadow-lg hover:shadow-xl transition-all`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <p className="text-white text-xl font-bold">{item.value}</p>
                  <p className="text-white/90 text-sm font-medium">{item.label}</p>
                </div>
              </div>
              <p className="text-white/80 text-xs mt-3 leading-tight">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scrolling Indicator - Enhanced */}
      <motion.div
        animate={{
          y: [0, 15, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <svg
            className="w-6 h-6 text-amber-400 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          <span className="text-xs text-amber-400/80 font-medium">EXPLORE STRATEGIES</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;