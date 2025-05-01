// src/components/sections/StrategyVisualizer.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';


const strategies = [
  {
    name: 'Quantitative Alpha',
    description: 'AI-driven equity strategies leveraging alternative data',
    color: 'emerald'
  },
  {
    name: 'Global Macro',
    description: 'Opportunistic bets on macroeconomic trends',
    color: 'amber'
  },
  {
    name: 'Market Neutral',
    description: 'Long/short positions with zero beta exposure',
    color: 'blue'
  }
];

export default function StrategyVisualizer() {
  const [activeStrategy, setActiveStrategy] = useState(0);

  return (
    <section className="py-28 bg-slate-950 relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full ${Math.random() > 0.5 ? 'bg-emerald-400/20' : 'bg-amber-400/20'}`}
            style={{
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          Our <span className="text-amber-400">Investment</span> DNA
        </h2>
        <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mb-16">
          Explore the core strategies that power our performance
        </p>
        
        <div className="flex justify center items-center ml-[300px] md:grid-cols-3 gap-8">
          {strategies.map((strategy, i) => (
            <button
              key={i}
              onClick={() => setActiveStrategy(i)}
              className={`p-1 rounded-xl transition-all ${activeStrategy === i ? 
                `bg-${strategy.color}-400/10 border-${strategy.color}-400/50` : 
                'bg-slate-800/30 border-slate-700/30'} border`}
            >
              <div className={`p-6 rounded-lg ${activeStrategy === i ? 
                `bg-gradient-to-br from-${strategy.color}-400/5 to-${strategy.color}-400/10` : 
                'bg-slate-800/20'}`}>
                <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${activeStrategy === i ? 
                  `bg-${strategy.color}-400/10 text-${strategy.color}-400 border-${strategy.color}-400/30` : 
                  'bg-slate-700/50 text-slate-400 border-slate-600/30'} border`}>
                  {i+1}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${activeStrategy === i ? 'text-white' : 'text-slate-300'}`}>
                  {strategy.name}
                </h3>
                <p className={`text-sm ${activeStrategy === i ? 'text-slate-300' : 'text-slate-500'}`}>
                  {strategy.description}
                </p>
              </div>
            </button>
          ))}
        </div>
        
        {/* Animated visualization */}
        <div className="mt-16 h-64 rounded-xl overflow-hidden relative ">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
          
          {activeStrategy === 0 && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-64 h-64">
                {/* AI nodes visualization */}
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className={`absolute rounded-full bg-emerald-400/20 animate-pulse`}
                    style={{
                      width: `${20 + i * 15}px`,
                      height: `${20 + i * 15}px`,
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) scale(${1 + i * 0.1})`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
          
          {activeStrategy === 1 && (
            <motion.div 
              className="absolute bg-gradient-to-br from-amber-400/5 to-amber-400/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Globe visualization */}
            </motion.div>
          )}
          
          {activeStrategy === 2 && (
            <motion.div 
              className="absolute bg-gradient-to-br from-blue-400/5 to-blue-400/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Balanced scale visualization */}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}