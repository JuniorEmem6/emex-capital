import { motion } from "framer-motion";
import { FiTrendingUp, FiShield, FiGlobe } from "react-icons/fi";

const WealthSection = () => {
  const pillars = [
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Growth",
      description: "Our quantitative models identify high-potential opportunities in emerging markets before they reach mainstream attention.",
      stats: "+25% avg annual returns",
      color: "from-amber-400 to-amber-600"
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Protection",
      description: "Multi-layered risk management protocols designed to preserve capital through all market conditions.",
      stats: "0.82 correlation to S&P 500",
      color: "from-emerald-400 to-emerald-600"
    },
    {
      icon: <FiGlobe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Diversified exposure across 27 countries and 14 sectors with 24/7 monitoring of global markets.",
      stats: "14 asset classes",
      color: "from-blue-400 to-blue-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="relative py-24 bg-linear-to-br from-slate-900 to-slate-800 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400 rounded-full mix-blend-overlay filter blur-3xl animate-float1"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl animate-float2"></div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-600">
              Wealth Creation
            </span> {' '}
            <span className="text-white">Engineered</span>
          </motion.h2>
          
          <motion.div 
            variants={itemVariants}
            className="w-24 h-1 bg-linear-to-r from-amber-400 to-amber-600 mx-auto mb-8"
          />
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-slate-300 leading-relaxed"
          >
            Emex Capital combines institutional-grade research with machine learning to build and preserve wealth across generations.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-0" />
              
              <div className="relative z-10 h-full bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 group-hover:border-transparent transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-lg bg-gradient-to-br ${pillar.color} text-white`}>
                  {pillar.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{pillar.title}</h3>
                <p className="text-slate-300 mb-6">{pillar.description}</p>
                
                <div className="flex items-center">
                  <div className="w-8 h-px bg-linear-to-r from-amber-400 to-transparent mr-3" />
                  <span className="text-sm font-medium text-amber-400">{pillar.stats}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Performance footnote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center text-slate-400 text-sm"
        >
          <p>* Past performance is not indicative of future results. All investments carry risk.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default WealthSection;