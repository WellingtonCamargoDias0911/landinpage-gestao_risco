import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { motion } from 'framer-motion';

const LazySection = ({ children, className = '', threshold = 0.1, delay = 0 }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold });

  return (
    <div ref={ref} className={`min-h-[100px] ${className}`}>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay }}
        >
          {children}
        </motion.div>
      ) : (
        <div className="w-full h-24" /> // Placeholder to prevent layout shift
      )}
    </div>
  );
};

export default LazySection;