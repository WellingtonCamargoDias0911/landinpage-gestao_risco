
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, MessageSquare, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trackEvent } from '@/lib/analytics';
import { useFormSubmission } from '@/hooks/useFormSubmission';

const ChatWidget = ({ solution }) => {
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
    if (!isOpen) {
      trackEvent('chat_widget_open', { solution });
    }
    setIsOpen(!isOpen);
  };

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      trackEvent('form_start', { type: solution || 'Chat Geral' });
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

    await handleFormSubmit(solution || 'Chat Geral', formData, () => {
      setTimeout(() => {
        const message = encodeURIComponent("Olá, estou no seu site e quero falar sobre " + (solution || "soluções"));
        window.location.href = `https://api.whatsapp.com/send/?phone=5511999999999&text=${message}`;
        setIsOpen(false);
        setFormData({ nome: '', email: '', telefone: '', cidade: '' });
        formStartedRef.current = false;
      }, 1000);
    });
  };

  return (
    <>
      <div className="fixed bottom-6 right-4 z-50 md:bottom-8 md:right-8 flex flex-col items-end gap-4 pointer-events-none">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-[350px] max-w-[calc(100vw-2rem)] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
              style={{ maxHeight: '550px' }}
            >
              <div className="bg-blue-600 p-4 flex justify-between items-center shadow-md shrink-0">
                <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-white" />
                    <h3 className="font-bold text-white">Fale conosco</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 bg-slate-900/50">
                  <div className="bg-slate-800/50 p-3 rounded-xl rounded-tl-none mb-6 inline-block max-w-[85%] border border-slate-700/50">
                    <p className="text-sm text-slate-300">Olá! Como podemos ajudar? Preencha seus dados para iniciar o atendimento.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="nome" className="text-xs text-slate-400 font-medium ml-1">Nome</Label>
                        <Input 
                          id="nome" 
                          value={formData.nome} 
                          onChange={handleChange}
                          onFocus={handleFormStart}
                          required
                          className="bg-slate-950 border-slate-800 focus:border-blue-500 transition-colors text-white"
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs text-slate-400 font-medium ml-1">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={formData.email} 
                          onChange={handleChange}
                          onFocus={handleFormStart}
                          required
                          className="bg-slate-950 border-slate-800 focus:border-blue-500 transition-colors text-white"
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="telefone" className="text-xs text-slate-400 font-medium ml-1">Telefone</Label>
                        <Input 
                          id="telefone" 
                          type="tel"
                          value={formData.telefone} 
                          onChange={handleChange}
                          onFocus={handleFormStart}
                          required
                          className="bg-slate-950 border-slate-800 focus:border-blue-500 transition-colors text-white"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="cidade" className="text-xs text-slate-400 font-medium ml-1">Cidade</Label>
                        <Input 
                          id="cidade" 
                          value={formData.cidade} 
                          onChange={handleChange}
                          onFocus={handleFormStart}
                          required
                          className="bg-slate-950 border-slate-800 focus:border-blue-500 transition-colors text-white"
                          placeholder="Digite sua cidade"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-10 mt-2"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span className="mr-2">Iniciar Conversa</span> <Send className="w-4 h-4" /></>}
                      </Button>
                  </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-[60px] h-[60px] rounded-full shadow-lg flex items-center justify-center transition-colors pointer-events-auto ${isOpen ? 'bg-slate-800 text-white border border-slate-700' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-8 h-8" />}
        </motion.button>
      </div>
    </>
  );
};

export default ChatWidget;
