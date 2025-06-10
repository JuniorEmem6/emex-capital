import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiTrendingUp, FiArrowRight } from 'react-icons/fi';

const earlyAdopters = [
  { 
    name: 'Prestige Wealth Management', 
    logo: '/logos/prestige.svg', 
    comment: 'Excited to be early partners with Emex\'s innovative quantitative approach.',
    type: 'Wealth Manager'
  },
  { 
    name: 'Blockchain Ventures', 
    logo: '/logos/blockchain-ventures.svg', 
    comment: 'Their crypto-native quant strategies align perfectly with our investment thesis.',
    type: 'Crypto Fund'
  },
  { 
    name: 'NextGen Family Office', 
    logo: '/logos/nextgen.svg', 
    comment: 'We believe in backing next-generation investment managers with fresh perspectives.',
    type: 'Family Office'
  }
];

const milestones = [
  { 
    icon: <FiAward className="w-5 h-5" />,
    title: 'First Institutional Allocation', 
    description: 'Secured $50M from forward-thinking investors',
    date: '2025'
  },
  { 
    icon: <FiUsers className="w-5 h-5" />,
    title: 'Strategic Partnerships', 
    description: 'Collaborating with 3 leading fintech data providers',
    date: '2024'
  },
  { 
    icon: <FiTrendingUp className="w-5 h-5" />,
    title: 'Platform Launch', 
    description: 'Successfully deployed our quantitative engine',
    date: '2023'
  }
];

export default function InstitutionalTrust() {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
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
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400/10 rounded-full mix-blend-overlay filter blur-3xl"
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
          className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-overlay filter blur-3xl"
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Institutional Trust</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Selected by forward-thinking investors who recognize the potential of our next-generation approach
          </p>
        </motion.div>

        {/* Early Adopters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-xl font-bold text-white mb-8 text-center">
            Our Early Partners
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {earlyAdopters.map((partner, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 hover:border-amber-400/30 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center">
                    <img src={partner.logo} alt={partner.name} className="h-6 w-auto" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{partner.name}</h4>
                    <p className="text-slate-400 text-sm">{partner.type}</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">"{partner.comment}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 p-8 rounded-xl border border-slate-700/30"
        >
          <h3 className="text-xl font-bold text-white mb-8 text-center">
            Our Journey So Far
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-slate-800/30 p-6 rounded-lg border border-slate-700/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400">
                    {milestone.icon}
                  </div>
                  <span className="text-amber-400 font-bold">{milestone.date}</span>
                </div>
                <h4 className="text-white font-medium mb-2">{milestone.title}</h4>
                <p className="text-slate-300 text-sm">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-slate-300 mb-6">Become part of our growth story</p>
          <button className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-900 font-bold py-3 px-8 rounded-lg inline-flex items-center transition-all">
            Speak to Our Team
            <FiArrowRight className="ml-2" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}