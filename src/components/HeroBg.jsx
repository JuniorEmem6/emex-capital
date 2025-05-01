// src/components/sections/HeroWithFinanceBG.jsx
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const HeroWithFinanceBG = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0, 0.2, 0.15],
      transition: { duration: 8, repeat: Infinity, repeatType: 'reverse' }
    });
  }, [controls]);

  return (
    <section className="relative bg-slate-900 overflow-hidden">

      {/* 4. Floating Financial Elements */}
      <div className="absolute inset-0">
        {/* Stock Ticker */}
        <motion.div
          className="absolute top-20 left-0 right-0 h-8 bg-slate-800/80 backdrop-blur-sm"
          animate={{
            x: ['100vw', '-100%']
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <div className="flex items-center h-full whitespace-nowrap text-slate-300 font-mono text-sm">
            {Array(8).fill().map((_, i) => (
              <span key={i} className="mx-8 flex items-center">
                <span className="text-amber-400 mr-2">NASDAQ:EMEX</span>
                <span>↑2.4%</span>
                <span className="mx-2">•</span>
                <span className="text-emerald-400 mr-2">SPX</span>
                <span>↑0.8%</span>
                <span className="mx-2">•</span>
                <span className="text-rose-400 mr-2">BTC</span>
                <span>↓1.2%</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Floating Financial Symbols */}
      </div>

      {/* Content Container (Same as before) */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pt-32 pb-20">
        {/* ... Your existing hero content ... */}
      </div>
    </section>
  );
}

export default HeroWithFinanceBG