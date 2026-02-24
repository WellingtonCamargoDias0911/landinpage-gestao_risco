import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const ComparisonTable = ({ title, items, highlightColor = "bg-blue-600" }) => {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800 overflow-hidden"
        >
          <div className="grid grid-cols-3 p-6 border-b border-slate-800 bg-slate-950/50">
            <div className="col-span-1 font-bold text-slate-400 text-sm uppercase tracking-wider flex items-center">Critério</div>
            <div className="col-span-1 text-center font-bold text-slate-500 text-sm uppercase tracking-wider">Sem Proteção</div>
            <div className={`col-span-1 text-center font-bold text-white text-sm uppercase tracking-wider rounded-lg py-1 ${highlightColor} shadow-lg`}>Com Grafo Capital</div>
          </div>
          
          <div className="divide-y divide-slate-800/50">
            {items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-3 p-6 hover:bg-white/5 transition-colors items-center group">
                <div className="col-span-1 text-slate-300 font-medium pr-4">{item.criteria}</div>
                <div className="col-span-1 text-center flex justify-center text-slate-500">
                   {item.withoutText ? (
                       <span className="text-xs">{item.withoutText}</span>
                   ) : (
                       <X className="w-5 h-5 text-red-500/50" />
                   )}
                </div>
                <div className="col-span-1 text-center flex justify-center text-white relative">
                   {/* Background highlight for the winning column */}
                   <div className={`absolute inset-y-0 -inset-x-6 ${highlightColor} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}></div>
                   {item.withText ? (
                       <span className="text-xs font-bold text-emerald-400">{item.withText}</span>
                   ) : (
                       <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                           <Check className="w-4 h-4 text-emerald-500" />
                       </div>
                   )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;