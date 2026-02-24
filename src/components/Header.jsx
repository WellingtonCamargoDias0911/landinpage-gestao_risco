import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solutions = [
    { name: 'Seguro Auto', path: '/seguro-auto' },
    { name: 'Seguro de Vida', path: '/seguro-vida' },
    { name: 'Seguro Residencial', path: '/seguro-residencial' },
    { name: 'Seguro Empresarial', path: '/seguro-empresarial' },
    { name: 'RC Profissional', path: '/seguro-rc-profissional' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center cursor-pointer z-50">
            <img 
              src="https://horizons-cdn.hostinger.com/c45e6ee7-d291-42e1-bbe2-4397bc561d93/141e5143af484e73ba6ea23a6f9b318e.png" 
              alt="Grafo Capital Logo" 
              className="h-24 md:h-28 w-auto object-contain transition-all duration-300" 
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-slate-300 hover:text-white font-medium transition-colors"
            >
              Home
            </Link>

            <div className="relative group">
              <button 
                className="flex items-center space-x-1 text-slate-300 hover:text-white font-medium transition-colors py-2"
                onMouseEnter={() => setIsSolutionsOpen(true)}
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
              >
                <span>Soluções</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Dropdown Menu */}
              <div 
                className="absolute left-0 top-full pt-2 w-56 hidden group-hover:block hover:block"
                onMouseEnter={() => setIsSolutionsOpen(true)}
                onMouseLeave={() => setIsSolutionsOpen(false)}
              >
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden p-2">
                  {solutions.map((option) => (
                    <Link 
                      key={option.path}
                      to={option.path}
                      className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Button 
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6"
              onClick={() => {
                const element = document.getElementById('conversion-form');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Falar com Assessor
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-slate-950 z-40 pt-24 px-4 md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6">
              <Link 
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-medium text-slate-300 hover:text-white"
              >
                Home
              </Link>
              
              <div className="space-y-4">
                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold px-2">Nossas Soluções</p>
                {solutions.map((option) => (
                  <Link 
                    key={option.path}
                    to={option.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 bg-slate-900/50 rounded-xl text-slate-200 hover:bg-slate-900 border border-slate-800/50"
                  >
                    {option.name}
                  </Link>
                ))}
              </div>

              <div className="pt-8 pb-12">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white h-12 rounded-xl text-lg"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const element = document.getElementById('conversion-form');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Solicitar Contato
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;