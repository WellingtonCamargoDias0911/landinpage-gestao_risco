import React from 'react';
import { motion } from 'framer-motion';

const Timeline = ({ steps, color = "bg-blue-500" }) => {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-16">Próximos Passos</h2>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className="flex-1 md:w-1/2 ml-12 md:ml-0">
                  <div className={`bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-${color.split('-')[1]}-500/50 transition-colors shadow-lg`}>
                    <div className={`text-xs font-bold uppercase tracking-wider mb-2 text-${color.split('-')[1]}-400`}>Passo 0{idx + 1}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-4 border-slate-800 flex items-center justify-center z-10">
                    <div className={`w-2 h-2 rounded-full ${color}`}></div>
                </div>

                {/* Empty Space for alignment */}
                <div className="hidden md:block flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;