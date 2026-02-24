import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

const StickyWhatsApp = ({ message }) => {
  const handleClick = () => {
    trackEvent('cta_whatsapp_click', { location: 'sticky_footer' });
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5511999999999?text=${encodedMessage}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-4 z-50 md:bottom-8 md:right-8 group"
    >
      <button
        onClick={handleClick}
        className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-2 pr-6 rounded-full shadow-lg hover:bg-emerald-500/90 hover:border-emerald-500 transition-all duration-300"
      >
        <div className="bg-[#25D366] p-3 rounded-full shadow-inner shadow-black/10">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div className="text-left">
            <p className="text-sm font-bold text-white leading-tight">Falar no WhatsApp</p>
            <p className="text-[10px] text-emerald-200 font-medium group-hover:text-emerald-100">Atendimento consultivo</p>
        </div>
      </button>
    </motion.div>
  );
};

export default StickyWhatsApp;