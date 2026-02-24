
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trackEvent } from '@/lib/analytics';
import { useFormSubmission } from '@/hooks/useFormSubmission';

const StickyWhatsAppModal = ({ solutionName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleFormSubmit, isLoading } = useFormSubmission();
  const formStartedRef = useRef(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: ''
  });

  const handleOpen = () => {
    trackEvent('whatsapp_modal_open', { solution: solutionName });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      trackEvent('form_start', { type: solutionName || 'WhatsApp Geral' });
      formStartedRef.current = true;
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    await handleFormSubmit(solutionName || 'WhatsApp Geral', formData, () => {
      setTimeout(() => {
        const message = encodeURIComponent(`Olá, estou no site e quero informações sobre ${solutionName || 'soluções'}.`);
        window.location.href = `https://api.whatsapp.com/send/?phone=5511999999999&text=${message}`;
        setIsOpen(false);
        setFormData({ nome: '', email: '', telefone: '', cidade: '' });
        formStartedRef.current = false;
      }, 1000);
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-4 z-50 md:bottom-8 md:right-8"
      >
        {!isOpen && (
          <button
            onClick={handleOpen}
            className="group flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-2 pr-6 rounded-full shadow-lg hover:bg-[#25D366]/90 hover:border-[#25D366] transition-all duration-300"
          >
            <div className="bg-[#25D366] p-3 rounded-full shadow-inner shadow-black/10 group-hover:bg-white/20">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white leading-tight">Falar no WhatsApp</p>
              <p className="text-[10px] text-emerald-200 font-medium group-hover:text-emerald-100">Atendimento online</p>
            </div>
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-slate-900/50 p-6 border-b border-slate-800 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    WhatsApp
                  </h3>
                  <p className="text-sm text-slate-400">Preencha para iniciar o atendimento</p>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 bg-slate-950">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-slate-200">Nome</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      onFocus={handleFormStart}
                      required
                      placeholder="Seu nome"
                      className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:ring-[#25D366] focus:border-[#25D366]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={handleFormStart}
                      required
                      placeholder="seu@email.com"
                      className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:ring-[#25D366] focus:border-[#25D366]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="text-slate-200">Telefone</Label>
                    <Input
                      id="telefone"
                      type="tel"
                      value={formData.telefone}
                      onChange={handleChange}
                      onFocus={handleFormStart}
                      required
                      placeholder="(11) 99999-9999"
                      className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:ring-[#25D366] focus:border-[#25D366]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cidade" className="text-slate-200">Cidade</Label>
                    <Input
                      id="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      onFocus={handleFormStart}
                      required
                      placeholder="Digite sua cidade"
                      className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:ring-[#25D366] focus:border-[#25D366]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold h-12 text-lg shadow-lg shadow-green-900/20 mt-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Conectando...
                      </>
                    ) : (
                      <>
                        Iniciar Conversa
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyWhatsAppModal;
