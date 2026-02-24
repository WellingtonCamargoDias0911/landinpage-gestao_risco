import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const images = [{
  url: "https://images.unsplash.com/photo-1569280349955-2f3b0adf2697?q=80&w=2070&auto=format&fit=crop",
  alt: "Veículo de luxo em exposição"
}, {
  url: "https://images.unsplash.com/photo-1604028807192-53de6aea46d4?q=80&w=2070&auto=format&fit=crop",
  alt: "Veículo sedan moderno na cidade"
}, {
  url: "https://images.unsplash.com/photo-1569692617080-447c0d0106cb?q=80&w=2070&auto=format&fit=crop",
  alt: "Carro compacto econômico"
}, {
  url: "https://images.unsplash.com/photo-1581856509592-1364ea830dc1?q=80&w=2070&auto=format&fit=crop",
  alt: "Veículo moderno com design arrojado"
}];
const CarImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const paginate = useCallback(newDirection => {
    setDirection(newDirection);
    setCurrentIndex(prevIndex => (prevIndex + newDirection + images.length) % images.length);
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate]);
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);
  const variants = {
    enter: direction => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: direction => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };
  return <div className="relative overflow-hidden h-[600px] w-full rounded-[2rem] shadow-2xl border border-slate-800 group bg-slate-900" role="region" aria-label="Galeria de imagens de veículos">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img key={currentIndex} src={images[currentIndex].url} alt={images[currentIndex].alt} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{
        x: {
          type: "spring",
          stiffness: 300,
          damping: 30
        },
        opacity: {
          duration: 0.2
        }
      }} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
        <button onClick={() => paginate(-1)} className="p-2 rounded-full bg-slate-900/50 hover:bg-slate-900/80 text-white backdrop-blur-sm transition-all pointer-events-auto opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 border border-slate-700" aria-label="Imagem anterior">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={() => paginate(1)} className="p-2 rounded-full bg-slate-900/50 hover:bg-slate-900/80 text-white backdrop-blur-sm transition-all pointer-events-auto opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 border border-slate-700" aria-label="Próxima imagem">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/5">
        {images.map((_, index) => <button key={index} onClick={() => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
      }} className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-orange-500 w-8' : 'bg-white/50 w-2 hover:bg-white/80'}`} aria-label={`Ir para imagem ${index + 1}`} aria-current={index === currentIndex ? 'true' : 'false'} />)}
      </div>
    </div>;
};
export default CarImageCarousel;