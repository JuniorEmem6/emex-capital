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


  const assets = [{
    asset: "Bitcoin",
    price: "$107,000",
    change: "↑1.4%"
  }, {
    asset: "Gold",
    price: "$3150",
    change: "↓1.4%"
  },
  {
    asset: "EURUSD",
    price: "$1.135",
    change: "↓1.4%"
  },

  {
    asset: "Solana",
    price: "$256",
    change: "↓1.4%"
  },

  {
    asset: "SPX",
    price: "$56,990",
    change: "↑1.4%"
  },

  {
    asset: "USDJPY",
    price: "141.64",
    change: "↓1.04%"
  },

  {
    asset: "USDCHF",
    price: "0.82160",
    change: "↑1.04%"
  },

  {
    asset: "Ripple",
    price: "1.30",
    change: "↓1.04%"
  }
]

  return (
    <section className="relative bg-slate-900 overflow-hidden">

      <div className="absolute inset-0">
        {/* Stock Ticker */}
        <motion.div
          className="absolute top-20 left-[200px] right-20 h-8 bg-slate-800/80 backdrop-blur-sm w-[2100px]"
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
            {assets.map((asset, i) => (
              <ul key={i} className="mx-8 flex items-center">
                <li className="text-amber-400 mr-2">{asset.asset}</li>
                <li className="text-rose-400 mr-2">{asset.price}</li>
                <li className="text-emerald-400 mr-2">{asset.change}</li>
                <li className="mx-2">•</li>
              </ul>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content Container (Same as before) */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pt-32 pb-20">
        {/* ... Your existing hero content ... */}
      </div>
    </section>
  );
}

export default HeroWithFinanceBG