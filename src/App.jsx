
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CarFront, DoorOpen, TrendingUp, HeartHandshake as Handshake, CheckCircle, ArrowRight, ChevronDown, Check, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import GraphBackground from '@/components/GraphBackground';
import HexagonBackground from '@/components/HexagonBackground';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import LazySection from '@/components/LazySection';
import { trackEvent, trackPageView } from '@/lib/analytics';
import { getFAQSchema } from '@/lib/seo';
import { useFormSubmission } from '@/hooks/useFormSubmission';

// Import Pages
import SeguroAuto from '@/pages/SeguroAuto';
import SeguroVida from '@/pages/SeguroVida';
import SeguroResidencial from '@/pages/SeguroResidencial';
import SeguroEmpresarial from '@/pages/SeguroEmpresarial';
import SeguroRCProfissional from '@/pages/SeguroRCProfissional';
import SeguroPatrimonial from '@/pages/SeguroPatrimonial';
import NotFound from '@/pages/NotFound';

// Memoized Header for performance
const MemoHeader = React.memo(Header);

const Home = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { handleFormSubmit, isLoading } = useFormSubmission();
  const formStartedRef = useRef(false);
  
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    cidade: '',
    interesse: []
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const solutions = useMemo(() => [
    {
      icon: Heart,
      title: 'Seguro de Vida',
      description: 'Proteção para quem depende de você. Renda, educação, tranquilidade.',
      path: '/seguro-vida',
      color: 'from-blue-600 to-blue-800',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: CarFront,
      title: 'Seguro Auto',
      description: 'Cotação guiada e clareza sobre prioridades do seu perfil de uso.',
      path: '/seguro-auto',
      color: 'from-orange-600 to-orange-800',
      borderColor: 'border-orange-500/30'
    },
    {
      icon: DoorOpen,
      title: 'Seguro Residencial e Condomínio',
      description: 'Proteção do lar e do patrimônio, com método consultivo.',
      path: '/seguro-residencial',
      color: 'from-teal-600 to-teal-800',
      borderColor: 'border-teal-500/30'
    },
    {
      icon: TrendingUp,
      title: 'Seguro Empresarial',
      description: 'Continuidade operacional e previsibilidade para seu negócio.',
      path: '/seguro-empresarial',
      color: 'from-emerald-600 to-emerald-800',
      borderColor: 'border-emerald-500/30'
    },
    {
      icon: Handshake,
      title: 'Seguro Profissional (RC)',
      description: 'Responsabilidade civil e proteção da sua profissão.',
      path: '/seguro-rc-profissional',
      color: 'from-purple-600 to-purple-800',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: Building,
      title: 'Seguro Patrimonial',
      description: 'Proteção completa para ativos corporativos e lucros cessantes.',
      path: '/seguro-patrimonial',
      color: 'from-emerald-600 to-emerald-800',
      borderColor: 'border-emerald-500/30'
    }
  ], []);

  const faqData = useMemo(() => [
    { q: "Atendem pessoa física e empresa?", a: "Sim. A orientação muda conforme cenário e prioridade." },
    { q: "Já tenho seguro. Ainda faz sentido?", a: "Sim. Muitas melhorias vêm de revisão de coerência, atualização e lacunas." },
    { q: "Isso é só cotação?", a: "Não. A proposta é entender antes do decidir, com método consultivo." }
  ], []);

  const handleSolutionClick = useCallback((path) => {
    trackEvent('solution_card_click', { path });
    navigate(path);
  }, [navigate]);

  const scrollToForm = useCallback(() => {
    const element = document.getElementById('conversion-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  const scrollToSolutions = useCallback(() => {
    const element = document.getElementById('solutions-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      trackEvent('form_start', { type: 'Diagnóstico de Seguros' });
      formStartedRef.current = true;
    }
  };

  const handleInterestChange = useCallback((value) => {
      setFormData(prev => {
          const interests = prev.interesse.includes(value) 
            ? prev.interesse.filter(i => i !== value)
            : [...prev.interesse, value];
          return { ...prev, interesse: interests };
      });
  }, []);

  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    // Format interesse array into string for webhook
    const submissionData = {
      ...formData,
      interesse: formData.interesse.join(', ')
    };

    await handleFormSubmit('Diagnóstico de Seguros', submissionData, () => {
        setIsSuccess(true);
        formStartedRef.current = false;
        toast({ title: 'Diagnóstico solicitado', description: 'Em breve entraremos em contato.' });
    });
  };

  return (
    <>
      <SEO 
        title="Gestão de Risco e Seguros | Orientação Consultiva — Grafo Capital"
        description="A Grafo Capital conecta você ao que realmente importa: entender riscos, organizar prioridades e estruturar a proteção certa."
        schemas={[getFAQSchema(faqData)]}
      />
      <div className='min-h-screen bg-slate-950 font-sans selection:bg-slate-700 overflow-x-hidden text-slate-200'>
        <MemoHeader />

        {/* 1. HERO SECTION */}
        <section className='relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden'>
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1675270714610-11a5cadcc7b3?q=80&w=2070&auto=format&fit=crop" 
              alt="Business meeting representing risk management"
              className="w-full h-full object-cover opacity-40"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950"></div>
          </div>
          
          <GraphBackground color="#cbd5e1" />

          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-5xl mx-auto text-center'>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight'
              >
                Gestão de Risco com soluções de proteção para cada fase da sua vida e do seu negócio.
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className='text-lg md:text-2xl text-slate-300 font-light max-w-4xl mx-auto mb-10 leading-relaxed'
              >
                A Grafo Capital conecta você ao que realmente importa: entender riscos, organizar prioridades e estruturar a proteção certa, com orientação consultiva e implementação.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'
              >
                 <Button 
                  size='lg' 
                  onClick={scrollToForm}
                  className='h-16 px-10 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-lg font-bold shadow-lg shadow-blue-900/20 transition-all hover:scale-105'
                 >
                   Solicitar diagnóstico
                 </Button>
                 <Button 
                  size='lg' 
                  variant='outline'
                  onClick={scrollToSolutions}
                  className='h-16 px-10 border-white/20 hover:bg-white/10 text-white rounded-full text-lg transition-all'
                 >
                   Conhecer soluções
                 </Button>
              </motion.div>

              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.8, delay: 0.6 }}
                 className="grid md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto"
              >
                  {[
                      "Diagnóstico guiado para definir prioridades",
                      "Soluções específicas (Vida, Auto, Residencial, Empresarial)",
                      "Clareza antes da decisão: você entende opções comparáveis"
                  ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                          <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-300 font-medium">{item}</span>
                      </div>
                  ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. SOLUTIONS SECTION */}
        <section id='solutions-section' className='py-24 px-4 relative bg-slate-900/30'>
            <HexagonBackground color="text-slate-500/5" className="opacity-30" />
            <div className='container mx-auto relative z-10'>
              <div className='text-center mb-16 max-w-3xl mx-auto'>
                  <h2 className='text-3xl md:text-5xl font-bold text-white mb-6'>Escolha a solução ideal para a sua necessidade.</h2>
                  <p className='text-slate-400 text-lg'>Cada cenário pede um tipo de proteção. Se você já sabe por onde começar, escolha abaixo e vá direto para a página da solução.</p>
              </div>

              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                  {solutions.map((sol, i) => (
                      <div 
                          key={i}
                          className={`bg-slate-950 border ${sol.borderColor} p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col items-start h-full transform hover:scale-[1.02] hover:-translate-y-1`}
                          onClick={() => handleSolutionClick(sol.path)}
                      >
                          <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${sol.color} flex items-center justify-center mb-6 shadow-md`}>
                              <sol.icon className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">{sol.title}</h3>
                          <p className='text-slate-400 text-sm mb-8 leading-relaxed'>{sol.description}</p>
                          <div className="mt-auto flex items-center text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                              Explorar a solução <ArrowRight className="ml-2 w-4 h-4" />
                          </div>
                      </div>
                  ))}
              </div>
              <p className='text-center text-slate-500 mt-12 text-sm'>Se estiver em dúvida, peça o diagnóstico e nós direcionamos a solução.</p>
            </div>
        </section>

        {/* 3. WHY RISK MANAGEMENT */}
        <LazySection threshold={0.1}>
          <section className='py-24 bg-gradient-to-b from-slate-950 to-slate-900'>
              <div className='container mx-auto px-4'>
                  <h2 className='text-3xl md:text-5xl font-bold text-white text-center mb-16'>Seguro sem estratégia vira surpresa.<br />Gestão de risco vira decisão.</h2>
                  
                  <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                      {[
                          { title: "Risco é inevitável. Impacto é administrável.", text: "Gestão de risco organiza o que importa, reduz lacunas e evita decisões no susto." },
                          { title: "O problema não é contratar. É descobrir tarde.", text: "A diferença está em entender prioridades e coerência, antes do momento crítico." },
                          { title: "Cada cliente tem um risco dominante.", text: "Família e renda, rotina e mobilidade, lar e patrimônio, empresa e operação, profissão e responsabilidade: a solução muda conforme o cenário." }
                      ].map((block, i) => (
                          <div key={i} className='bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl hover:bg-slate-800/80 transition-colors'>
                              <h3 className='text-xl font-bold text-white mb-4 leading-snug'>{block.title}</h3>
                              <p className='text-slate-400 leading-relaxed'>{block.text}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </section>
        </LazySection>

        {/* 4. MÉTODO GRAFO */}
        <LazySection threshold={0.1}>
          <section className='py-24 px-4 bg-slate-950 relative overflow-hidden'>
               <div className='container mx-auto relative z-10'>
                   <h2 className='text-3xl md:text-5xl font-bold text-white text-center mb-20'>Como a Grafo trabalha</h2>
                   
                   <div className='max-w-5xl mx-auto relative'>
                       <div className='hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-blue-500/50 to-blue-500/20 -translate-x-1/2'></div>
                       
                       {[
                           "Entender seu cenário (rotina, bens, responsabilidades, prioridades)",
                           "Revisar o que já existe (quando houver) para identificar lacunas e excessos",
                           "Desenhar opções comparáveis (clareza do que muda, sem jargão)",
                           "Implementar e acompanhar (proteção que acompanha mudanças)"
                       ].map((step, i) => (
                           <div key={i} className={`flex flex-col md:flex-row items-center gap-8 mb-16 last:mb-0 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                               <div className='w-full md:w-1/2 flex justify-center md:justify-end md:pr-12 text-right'>
                                   <div className={`text-5xl font-black text-slate-800 hidden md:block ${i % 2 !== 0 ? 'md:text-left md:pr-0 md:pl-12' : ''}`}>0{i+1}</div>
                               </div>
                               
                               <div className='absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-950 z-10 hidden md:block shadow-[0_0_15px_rgba(59,130,246,0.5)]'></div>
                               
                               <div className={`w-full md:w-1/2 md:pl-12 ${i % 2 !== 0 ? 'md:pl-0 md:pr-12 md:text-right' : ''}`}>
                                   <div className='bg-slate-900/80 backdrop-blur border border-slate-800 p-6 rounded-xl shadow-lg inline-block w-full max-w-md'>
                                       <div className='md:hidden text-2xl font-bold text-blue-500 mb-2'>0{i+1}</div>
                                       <p className='text-lg text-white font-medium'>{step}</p>
                                   </div>
                               </div>
                           </div>
                       ))}
                   </div>
                   <p className='text-center text-slate-500 mt-16 text-sm italic'>Condições, limites e coberturas variam conforme contratação e apólice.</p>
               </div>
          </section>
        </LazySection>

        {/* 5. MAIN CONVERSION FORM */}
        <section id='conversion-form' className='py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-950 relative'>
            <div className='max-w-3xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative z-10'>
                <div className='text-center mb-10'>
                    <h2 className='text-3xl font-bold text-white mb-4'>Diagnóstico de Gestão de Risco</h2>
                    <p className='text-slate-300'>Preencha o essencial e um assessor da Grafo Capital entra em contato para entender seu cenário e direcionar a solução mais coerente.</p>
                </div>

                {isSuccess ? (
                    <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-12 text-center animate-in fade-in zoom-in duration-500">
                      <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg shadow-emerald-500/20">
                        <Check className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Recebido!</h3>
                      <p className="text-slate-300">Em breve um assessor da Grafo Capital entra em contato.</p>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className='space-y-6'>
                        <div className='space-y-2'>
                            <Label htmlFor="nome" className="text-white">Nome</Label>
                            <Input 
                              id="nome" 
                              required 
                              onFocus={handleFormStart}
                              className="bg-slate-900/50 border-slate-700 text-white h-12"
                              value={formData.nome}
                              onChange={handleInputChange}
                            />
                        </div>
                        
                        <div className='grid md:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <Label htmlFor="whatsapp" className="text-white">WhatsApp / Telefone</Label>
                                <Input 
                                  id="whatsapp" 
                                  type="tel" 
                                  required 
                                  onFocus={handleFormStart}
                                  className="bg-slate-900/50 border-slate-700 text-white h-12"
                                  value={formData.whatsapp}
                                  onChange={handleInputChange}
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor="email" className="text-white">E-mail</Label>
                                <Input 
                                  id="email" 
                                  type="email" 
                                  required 
                                  onFocus={handleFormStart}
                                  className="bg-slate-900/50 border-slate-700 text-white h-12"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor="cidade" className="text-white">Cidade</Label>
                            <Input 
                              id="cidade" 
                              required 
                              onFocus={handleFormStart}
                              className="bg-slate-900/50 border-slate-700 text-white h-12"
                              placeholder="Digite sua cidade"
                              value={formData.cidade}
                              onChange={handleInputChange}
                            />
                        </div>

                        <div className='space-y-3'>
                            <Label className="text-white">Você quer proteger agora?</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {['Vida e renda', 'Auto', 'Residencial', 'Empresarial', 'Profissional (RC)', 'Patrimonial'].map((option) => (
                                    <div 
                                      key={option} 
                                      className={`
                                          cursor-pointer rounded-xl border px-4 py-3 text-sm font-medium transition-all
                                          ${formData.interesse.includes(option) 
                                              ? 'bg-blue-600 border-blue-500 text-white shadow-md' 
                                              : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-500'}
                                      `}
                                      onClick={() => {
                                        handleFormStart();
                                        handleInterestChange(option);
                                      }}
                                    >
                                      <div className="flex items-center gap-2">
                                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.interesse.includes(option) ? 'border-white' : 'border-slate-500'}`}>
                                              {formData.interesse.includes(option) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                          </div>
                                          {option}
                                      </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="pt-2">
                          <Button type="submit" size="lg" disabled={isLoading} className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-500 rounded-xl font-bold shadow-lg">
                              {isLoading ? 'Enviando...' : 'Enviar e solicitar contato'}
                          </Button>
                          <p className="text-center text-xs text-slate-500 mt-4">Ao enviar, você autoriza contato da Grafo Capital para orientação e atendimento.</p>
                        </div>
                    </form>
                )}
            </div>
        </section>

        {/* 6. FAQ SECTION */}
        <LazySection threshold={0.1}>
          <section className='py-24 px-4'>
              <div className='max-w-3xl mx-auto'>
                  <h2 className='text-3xl font-bold text-white text-center mb-12'>Perguntas Frequentes</h2>
                  <div className='space-y-4'>
                      {faqData.map((item, i) => (
                          <div key={i} className='bg-white/5 border border-white/10 rounded-xl overflow-hidden'>
                              <button 
                                 onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                 className='w-full text-left px-6 py-5 flex justify-between items-center hover:bg-white/5 transition-colors'
                              >
                                  <span className='font-bold text-lg text-white pr-4'>{item.q}</span>
                                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                              </button>
                              <AnimatePresence>
                                  {openFaq === i && (
                                      <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        className='overflow-hidden'
                                      >
                                          <div className='px-6 pb-6 text-slate-300 leading-relaxed border-t border-white/5 pt-4'>
                                              {item.a}
                                          </div>
                                      </motion.div>
                                  )}
                              </AnimatePresence>
                          </div>
                      ))}
                  </div>
              </div>
          </section>
        </LazySection>

        {/* FOOTER */}
        <footer className='py-8 border-t border-slate-900 bg-slate-950 text-center relative z-10'>
          <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <img 
              src="https://horizons-cdn.hostinger.com/c45e6ee7-d291-42e1-bbe2-4397bc561d93/b89b8cff4b45fd28c60a468afbbd59b1.png" 
              alt="Icon" 
              className="h-6 w-auto"
              loading="lazy"
            />
          </div>
          <p className='text-slate-600 text-sm'>© 2026 Grafo Capital. Todos os direitos reservados.</p>
        </footer>
      </div>
    </>
  );
};

function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return (
    <>
       <Toaster />
       <Routes>
         <Route path="/" element={<Home />} />
         
         <Route path="/seguro-auto" element={<SeguroAuto />} />
         <Route path="/seguro-vida" element={<SeguroVida />} />
         <Route path="/seguro-residencial" element={<SeguroResidencial />} />
         <Route path="/seguro-empresarial" element={<SeguroEmpresarial />} />
         <Route path="/seguro-rc-profissional" element={<SeguroRCProfissional />} />
         <Route path="/seguro-patrimonial" element={<SeguroPatrimonial />} />

         {/* REDIRECTS FOR LEGACY OR ALTERNATIVE URLS */}
         <Route path="/gestao-de-risco/seguro-auto" element={<SeguroAuto />} />
         <Route path="/gestao-de-risco/seguro-vida" element={<SeguroVida />} />
         <Route path="/gestao-de-risco/seguro-residencial" element={<SeguroResidencial />} />
         <Route path="/gestao-de-risco/seguro-empresarial" element={<SeguroEmpresarial />} />
         <Route path="/gestao-de-risco/seguro-rc-profissional" element={<SeguroRCProfissional />} />
         <Route path="/gestao-de-risco/seguro-patrimonial" element={<SeguroPatrimonial />} />

         {/* CATCH ALL 404 */}
         <Route path="*" element={<NotFound />} />
       </Routes>
    </>
  );
}

export default App;
