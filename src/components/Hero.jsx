// src/components/sections/Hero.jsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import EmexLogo from "../assets/emex-logo.svg";

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const sectors = [
    { name: "Gold", value: 72, change: 1.8 },
    { name: "Crude Oil", value: 65, change: 0.9 },
    { name: "Silver", value: 58, change: -0.7 },
    { name: "Solana", value: 49, change: 2.1 },
    { name: "Bitcoin", value: 49, change: 2.1 },
  ];

  const currency = [
    { name: "USDJPY", value: 72, change: 1.8 },
    { name: "EURUSD", value: 65, change: 0.9 },
    { name: "AUDUSD", value: 58, change: -0.7 },
    { name: "USDCAD", value: 49, change: 2.1 },
    { name: "GBPUSD", value: 49, change: 2.1 },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-slate-900 overflow-hidden mt-[-100px]"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400 rounded-full mix-blend-overlay filter blur-3xl animate-float1"></div>
        <div className="absolute top-2/3 right-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl animate-float2"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pt-32 pb-20 ml-[200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Logo & Tagline */}
          <div className="flex items-center mb-8 ml-[-40px]">
            <img src={EmexLogo} alt="Emex Capital" className="h-16 w-auto" />
            <span className="ml-4 text-lg font-medium text-amber-400 border-l border-amber-400/30 pl-4">
              EST. 2025 | $1.2B AUM
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="text-amber-400">Alpha Generation</span> Through
            <br />
            Quantitative Innovation
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl">
            Emex Capital combines institutional expertise with machine learning
            to deliver uncorrelated returns in all market conditions.
          </p>

          {/* CTAs */}
          <div className="flex sm:flex-row gap-4">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="/login"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 px-8 rounded-lg text-center transition-colors"
            >
              Investor Portal
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="/contact"
              className="bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10 font-bold py-4 px-8 rounded-lg text-center transition-colors"
            >
              Speak to Our Team
            </motion.a>
          </div>
        </motion.div>

        {/* Performance Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 flex  md:grid-cols-4 gap-4 max-w-4xl"
        >
          {[
            { value: "15.2%", label: "Annualized Return" },
            { value: "0.82", label: "Correlation to S&P 500" },
            { value: "1.4", label: "Sharpe Ratio" },
            { value: "24+", label: "Institutional Partners" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg border border-slate-700 w-[200px]"
            >
              <p className="text-amber-400 text-2xl font-bold">{item.value}</p>
              <p className="text-slate-300 text-sm">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {["₿", "$", "€", "¥", "£", "∆", "Σ"].map((symbol, i) => (
        <motion.span
          key={i}
          className="absolute text-slate-500 text-6xl"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + i * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 7 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {symbol}
        </motion.span>
      ))}

      {/* Our Pairs */}
        <div className="absolute bottom-[550px] left-[800px] right-0 flex justify-center gap-8">
          {sectors.map((sector, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ y: 0 }}
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  sector.change > 0 ? "bg-emerald-400/20" : "bg-rose-400/20"
                }`}
              >
                <span
                  className={`text-xl font-bold ${
                    sector.change > 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {sector.change > 0 ? "+" : ""}
                  {sector.change}%
                </span>
              </div>
              <span className="text-slate-400 text-sm">{sector.name}</span>
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-[400px] left-[800px] right-0 flex justify-center gap-8">
          {currency.map((sector, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ y: 0 }}
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  sector.change > 0 ? "bg-emerald-400/20" : "bg-rose-400/20"
                }`}
              >
                <span
                  className={`text-xl font-bold ${
                    sector.change > 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {sector.change > 0 ? "+" : ""}
                  {sector.change}%
                </span>
              </div>
              <span className="text-slate-400 text-sm">{sector.name}</span>
            </motion.div>
          ))}
        </div>

      {/* Scrolling Indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        className="absolute bottom-[150px] left-1/2 transform -translate-x-1/2"
      >
        <svg
          className="w-8 h-8 text-amber-400"
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
      </motion.div>
    </section>
  );
};

export default Hero;
