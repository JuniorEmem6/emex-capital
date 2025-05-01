// src/components/sections/InstitutionalTrust.jsx
import { motion } from 'framer-motion';

const partners = [
  { name: 'Prestige Wealth Management', logo: '/logos/prestige.svg', comment: 'Emex has consistently delivered alpha in our clients portfolios for 5 consecutive quarters.' },
  { name: 'Global Pension Partners', logo: '/logos/gpp.svg', comment: 'Their risk-managed approach provides the perfect balance for our retirement funds.' },
  { name: 'QuantTech Capital', logo: '/logos/quanttech.svg', comment: 'The only fund we trust with our algorithmic overlay strategies.' }
];

const awards = [
  { year: '2023', title: 'Best Quant Fund', issuer: 'HFM Awards' },
  { year: '2022', title: 'Top 10 Hedge Fund', issuer: 'Institutional Investor' },
  { year: '2021', title: 'Innovation Excellence', issuer: 'AI Finance' }
];

export default function InstitutionalTrust() {
  return (
    <section className="py-8 bg-slate-950 relative overflow-hidden">
      {/* Floating financial symbols */}
      <div className="absolute inset-0 opacity-5">
        {['₿', '$', '€', '¥', '£', '∆', 'Σ'].map((symbol, i) => (
          <motion.span
            key={i}
            className="absolute text-6xl"
            style={{
              left: `${5 + (i * 14)}%`,
              top: `${10 + (i * 8)}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {symbol}
          </motion.span>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted by <span className="text-amber-400">Institutions</span> Worldwide
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Partnering with leading financial organizations to deliver exceptional risk-adjusted returns
          </p>
        </motion.div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-400/5 to-transparent p-8 rounded-xl border border-amber-400/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Industry Recognition
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {awards.map((award, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-amber-400 text-3xl font-bold mb-2">{award.year}</div>
                <h4 className="text-white font-medium">{award.title}</h4>
                <p className="text-slate-400 text-sm">{award.issuer}</p>
              </div>
            ))}
            <div className="bg-slate-800/50 rounded-lg flex items-center justify-center">
              <button className="text-amber-400 hover:text-white text-sm font-medium py-3 px-6 transition-colors">
                View All Awards →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}