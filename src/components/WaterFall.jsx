import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiBarChart2, FiCpu, FiGlobe } from "react-icons/fi";

const strategies = [
  {
    name: "Global Macro",
    description: "Opportunistic bets on macroeconomic trends across currencies, commodities, and interest rates",
    color: "amber",
    icon: <FiGlobe className="w-5 h-5" />,
    stats: [
      { label: "Avg Holding Period", value: "1-3 months" },
      { label: "Correlation", value: "0.32" }
    ]
  },
  {
    name: "Quantitative Alpha",
    description: "AI-driven equity strategies leveraging alternative data and machine learning models",
    color: "emerald",
    icon: <FiCpu className="w-5 h-5" />,
    stats: [
      { label: "Monthly Turnover", value: "15%" },
      { label: "Alpha Generation", value: "7.2%" }
    ]
  },
  {
    name: "Market Neutral",
    description: "Long/short positions with zero beta exposure and sector neutrality",
    color: "blue",
    icon: <FiBarChart2 className="w-5 h-5" />,
    stats: [
      { label: "Sharpe Ratio", value: "1.8" },
      { label: "Win Rate", value: "65%" }
    ]
  },
];

const colorMap = {
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-400/40",
    text: "text-amber-400",
    gradient: "from-amber-500/20 to-amber-600/10"
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-400/40",
    text: "text-emerald-400",
    gradient: "from-emerald-500/20 to-emerald-600/10"
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-400/40",
    text: "text-blue-400",
    gradient: "from-blue-500/20 to-blue-600/10"
  }
};

export default function StrategyVisualizer() {
  const [activeStrategy, setActiveStrategy] = useState(0);
  const currentColor = colorMap[strategies[activeStrategy].color];

  return (
    <section className="py-20 md:py-32 bg-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400/20 rounded-full mix-blend-overlay filter blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-overlay filter blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Investment</span> DNA
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Discover the quantitative edge behind our market-leading performance
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Strategy Selector */}
          <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-4 overflow-x-auto pb-4 lg:pb-0">
            {strategies.map((strategy, i) => {
              const isActive = activeStrategy === i;
              const color = colorMap[strategy.color];
              
              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStrategy(i)}
                  className={`flex-shrink-0 text-left p-5 rounded-xl border transition-all ${isActive ? `${color.border} ${color.bg}` : "border-slate-700/30 bg-slate-800/20"}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isActive ? `${color.bg} ${color.text}` : "bg-slate-700/50 text-slate-400"}`}>
                      {strategy.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold mb-1 ${isActive ? "text-white" : "text-slate-300"}`}>
                        {strategy.name}
                      </h3>
                      <p className={`text-sm ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                        {strategy.description.substring(0, 60)}...
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Strategy Details */}
          <div className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStrategy}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={`h-full p-8 rounded-xl border bg-linear-to-br ${currentColor.gradient} ${currentColor.border}`}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-8">
                    <div className={`w-16 h-16 rounded-xl ${currentColor.bg} flex items-center justify-center mb-4 ${currentColor.text}`}>
                      {strategies[activeStrategy].icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {strategies[activeStrategy].name}
                    </h3>
                    <p className="text-slate-300 mb-6">
                      {strategies[activeStrategy].description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {strategies[activeStrategy].stats.map((stat, i) => (
                        <div key={i} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
                          <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                          <p className="text-xl font-bold text-white">{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* <button className={`group flex items-center gap-2 ${currentColor.text} font-medium`}>
                      Explore strategy details
                      <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </button> */}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}