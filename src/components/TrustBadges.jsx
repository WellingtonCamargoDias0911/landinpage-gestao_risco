import React from 'react';

const TrustBadges = () => {
  return (
    <div className="py-8 border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <p className="text-center text-slate-500 text-xs uppercase tracking-widest mb-6 font-semibold">Regulação e Conformidade</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Placeholders for regulatory badges - using stylized text for this environment */}
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-xs">S</div>
              <span className="text-sm font-bold text-slate-300">SUSEP <span className="font-normal text-xs block text-slate-500">Regulado</span></span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-xs">L</div>
              <span className="text-sm font-bold text-slate-300">LGPD <span className="font-normal text-xs block text-slate-500">Compliant</span></span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-xs">SSL</div>
              <span className="text-sm font-bold text-slate-300">256-bit <span className="font-normal text-xs block text-slate-500">Encryption</span></span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;