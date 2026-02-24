
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Car, Shield, Wrench, Clock, CheckCircle, ArrowRight, ChevronRight, AlertOctagon, Search, Sliders, PenTool, Rocket, RefreshCw, FileText, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import ProcessSteps from '@/components/ProcessSteps';
import FAQ from '@/components/FAQ';
import Header from '@/components/Header';
import GraphBackground from '@/components/GraphBackground';
import HexagonBackground from '@/components/HexagonBackground';
import CarImageCarousel from '@/components/CarImageCarousel';
import ChatWidget from '@/components/ChatWidget';
import { trackEvent, useScrollTracking } from '@/lib/analytics';
import { useFormSubmission } from '@/hooks/useFormSubmission';

function SeguroAuto() {
  const { toast } = useToast();
  useScrollTracking();
  const { handleFormSubmit, isLoading } = useFormSubmission();
  const formStartedRef = useRef(false);

  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    cidade: '',
    tipoSolicitacao: '',
    lgpdConsent: false
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      trackEvent('form_start', { type: 'Seguro Auto' });
      formStartedRef.current = true;
    }
  };

  const scrollToForm = () => {
    document.getElementById('conversion-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    if (!formData.lgpdConsent) {
      toast({
        title: 'Consentimento Necessário',
        description: 'Precisamos do seu consentimento para prosseguir.',
        variant: 'destructive'
      });
      return;
    }
    
    await handleFormSubmit('Seguro Auto', formData, () => {
      setIsSuccess(true);
      setFormData({ nome: '', whatsapp: '', email: '', cidade: '', tipoSolicitacao: '', lgpdConsent: false });
      formStartedRef.current = false;
    });
  };

  const faqData = [
    { question: 'Qual a diferença entre cobertura compreensiva e terceiros?', answer: 'Compreensiva cobre danos ao seu veículo (colisão, roubo, incêndio) e terceiros. Terceiros cobre apenas danos causados a outros veículos e pessoas. A escolha depende do valor do seu carro e do seu perfil de risco.' },
    { question: 'Como funciona a franquia?', answer: 'É o valor que você paga em caso de sinistro com culpa. Franquias menores deixam o seguro mais caro, mas reduzem seu desembolso em caso de acidente. Ajudamos a encontrar o equilíbrio ideal.' },
    { question: 'Posso escolher a oficina?', answer: 'Depende da modalidade. Seguros com rede referenciada têm preço melhor. Seguros com livre escolha permitem qualquer oficina, mas custam mais. Avaliamos o que compensa para você.' },
  ];

  const methodSteps = [
    { icon: Search, title: 'Entender perfil', description: 'Mapeamos o uso do veículo, condutores e necessidades específicas.' },
    { icon: Sliders, title: 'Revisar cenário', description: 'Comparamos bônus de renovação e histórico de sinistros.' },
    { icon: PenTool, title: 'Apresentar opções', description: 'Seleção das melhores seguradoras com clareza sobre franquias e coberturas.' },
    { icon: Rocket, title: 'Implementar e acompanhar', description: 'Emissão ágil e suporte 24h em caso de necessidade.' }
  ];

  return (
    <>
      <Helmet>
        <title>Seguro Auto | Cotação guiada e orientação consultiva — Grafo Capital</title>
        <meta name="description" content="Seguro Auto com orientação consultiva. Cotação guiada para entender opções e contratar com clareza. Atendimento por WhatsApp." />
      </Helmet>
      
      <div className='min-h-screen bg-slate-950 font-sans selection:bg-orange-500/30 overflow-x-hidden'>
        <Header />
        <Toaster />
        
        {/* HERO A SECTION */}
        <section className='relative min-h-[90vh] flex items-center justify-center pt-32 pb-20'>
          <GraphBackground color="#f97316" />
          <HexagonBackground color="text-orange-500/10" className="opacity-50" />
          
          <div className='container mx-auto px-4 relative z-10'>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-8 uppercase tracking-widest">
              <span>Home</span> <ChevronRight className="w-3 h-3" /> <span className="text-orange-400 font-bold">Seguro Auto</span>
            </div>

            <div className='grid lg:grid-cols-2 gap-16 items-center'>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='text-left'
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8 backdrop-blur-md">
                  <Car className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-300 text-sm font-medium tracking-wide uppercase">Proteção Automotiva Completa</span>
                </div>
                
                <h1 className='text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight'>
                  Seguro Auto com cotação guiada e <br />
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-200 to-white'>
                    orientação consultiva.
                  </span>
                </h1>
                
                <p className='text-xl text-slate-400 max-w-xl mb-10 leading-relaxed'>
                  Não é só sobre preço. Ajudamos você a entender as opções, escolher as melhores coberturas e garantir suporte quando mais precisar.
                </p>

                <ul className="space-y-3 mb-10 text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                    <span>Cotação guiada nas melhores seguradoras</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                    <span>Clareza sobre prioridades e franquias</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                    <span>Suporte humano na contratação e sinistro</span>
                  </li>
                </ul>
                
                <div className='flex flex-wrap gap-4'>
                  <Button 
                    size='lg' 
                    className='h-14 px-8 bg-orange-600 hover:bg-orange-500 text-white rounded-full text-lg shadow-[0_0_20px_-5px_rgba(249,115,22,0.5)] transition-all hover:scale-105'
                    onClick={scrollToForm}
                  >
                    Cotar com um assessor
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className='relative hidden lg:block'
              >
                <div className="relative z-10">
                  <CarImageCarousel />
                  <div className="absolute -bottom-6 -right-6 bg-slate-900/90 backdrop-blur border border-orange-500/30 p-6 rounded-2xl shadow-xl max-w-xs z-20">
                    <div className="flex items-center gap-3 mb-2">
                       <Clock className="w-6 h-6 text-orange-400" />
                       <span className="text-white font-bold">Agilidade no Atendimento</span>
                    </div>
                    <p className="text-slate-400 text-xs">Cotações rápidas e comparativas para você decidir sem perder tempo.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HERO B SECTION */}
        <section className="py-20 bg-orange-950/20 border-y border-orange-900/20">
           <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto">
                 Seu carro não é 'um bem'. É o que faz sua vida rodar.
              </h1>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                 Não deixe sua mobilidade descoberta. Garanta assistência e reposição rápida para não travar sua rotina.
              </p>
              <Button 
                 size="lg" 
                 onClick={scrollToForm}
                 className="bg-white text-orange-900 hover:bg-slate-100 rounded-full px-10 h-14 text-lg font-bold shadow-lg"
              >
                 Quero cotar agora
              </Button>
           </div>
        </section>

        {/* O PROBLEMA REAL */}
        <section className="py-24 bg-slate-900 relative">
             <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16">
                   <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">O prejuízo começa quando a rotina trava</h2>
                   <p className="text-slate-400 text-lg">
                      Um acidente leve pode deixar seu carro parado por semanas. Sem carro reserva ou assistência rápida, o custo com táxi e o estresse superam o valor da franquia.
                   </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                   <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-start gap-4 hover:border-orange-500/30 transition-colors">
                      <AlertOctagon className="w-8 h-8 text-orange-500 shrink-0" />
                      <div>
                          <h4 className="text-white font-bold mb-2">Compromissos acumulados</h4>
                          <p className="text-slate-400">Reuniões, escola das crianças e viagens. Tudo depende da sua mobilidade.</p>
                      </div>
                   </div>
                   <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-start gap-4 hover:border-orange-500/30 transition-colors">
                      <Wrench className="w-8 h-8 text-orange-500 shrink-0" />
                      <div>
                          <h4 className="text-white font-bold mb-2">Peças e Mão de Obra</h4>
                          <p className="text-slate-400">O custo de reparo aumentou drasticamente nos últimos anos. Uma lanterna pode custar milhares de reais.</p>
                      </div>
                   </div>
                </div>
             </div>
        </section>

        {/* O QUE VOCÊ GANHA */}
        <section className="py-24 bg-slate-900">
           <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white text-center mb-16">O que você ganha</h2>
              <div className="grid md:grid-cols-3 gap-8">
                 {[
                   { title: "Decisão Simples", desc: "Comparamos as opções e explicamos os prós e contras de cada seguradora." },
                   { title: "Menos Ruído", desc: "Filtramos o 'segurês' e focamos no que importa: proteção e serviço." },
                   { title: "Estrutura", desc: "Acompanhamento vitalício, da contratação à renovação e sinistro." }
                 ].map((item, i) => (
                    <div key={i} className="text-center bg-slate-900/50 p-8 rounded-2xl border border-orange-500/10">
                       <div className="w-16 h-16 mx-auto bg-orange-900/20 rounded-full flex items-center justify-center mb-6 border border-orange-500/20">
                          <CheckCircle className="w-8 h-8 text-orange-400" />
                       </div>
                       <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                       <p className="text-slate-400">{item.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* MÉTODO GRAFO */}
        <ProcessSteps color="text-orange-400" borderColor="border-orange-500" steps={methodSteps} />

        {/* TIPOS DE NECESSIDADE */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
             <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-3xl font-bold text-white text-center mb-12">Seguro Auto para quem…</h2>
                <div className="grid md:grid-cols-3 gap-8">
                   <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
                      <Shield className="w-10 h-10 text-orange-400 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Busca Previsibilidade</h3>
                      <p className="text-slate-400 text-sm">Proteção financeira contra perda total, roubo ou danos a terceiros que poderiam desfalcar suas economias.</p>
                   </div>
                   <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
                      <RefreshCw className="w-10 h-10 text-orange-400 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Precisa Renovar</h3>
                      <p className="text-slate-400 text-sm">Analisamos seu bônus e buscamos melhores condições de mercado para sua renovação.</p>
                   </div>
                   <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
                      <FileText className="w-10 h-10 text-orange-400 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Quer Clareza</h3>
                      <p className="text-slate-400 text-sm">Entenda exatamente o que está contratando, sem letras miúdas ou surpresas na hora H.</p>
                   </div>
                </div>
             </div>
        </section>

        {/* FORM SECTION */}
        <section id='conversion-form' className='py-24 relative overflow-hidden'>
          <div className='absolute inset-0 bg-orange-900/5'></div>
          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-4xl mx-auto bg-slate-950 rounded-[2.5rem] border border-orange-900/30 p-8 md:p-12 shadow-2xl'>
              <div className="grid md:grid-cols-5 gap-12">
                <div className="md:col-span-2 space-y-6">
                  <h2 className='text-3xl font-bold text-white'>Cotação Personalizada</h2>
                  <p className='text-slate-400'>Preencha os dados para receber as melhores opções do mercado para seu perfil.</p>
                  
                  <div className="bg-orange-950/30 p-4 rounded-xl border border-orange-500/20 mt-8">
                      <p className="text-orange-200 text-xs italic">"Rápido, prático e com preço justo. A consultoria fez toda diferença para escolher a melhor franquia."</p>
                      <p className="text-white font-bold text-xs mt-2">- Cliente satisfeito</p>
                  </div>
                </div>

                <div className='md:col-span-3'>
                  {isSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-8 text-center h-full flex flex-col justify-center items-center"
                    >
                      <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Recebido!</h3>
                      <p className="text-slate-300">Em breve um assessor entrará em contato.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className='space-y-5'>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor='nome' className='text-slate-300 ml-1'>Nome Completo</Label>
                          <Input
                            id='nome'
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                            onFocus={handleFormStart}
                            required
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-orange-500 focus:border-orange-500'
                            placeholder='Seu nome'
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor='whatsapp' className='text-slate-300 ml-1'>WhatsApp</Label>
                          <Input
                            id='whatsapp'
                            type="tel"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                            onFocus={handleFormStart}
                            required
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-orange-500 focus:border-orange-500'
                            placeholder='(00) 00000-0000'
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                         <div className="space-y-2">
                          <Label htmlFor='email' className='text-slate-300 ml-1'>E-mail</Label>
                          <Input
                            id='email'
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            onFocus={handleFormStart}
                            required
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-orange-500 focus:border-orange-500'
                            placeholder='seu@email.com'
                          />
                        </div>
                         <div className="space-y-2">
                          <Label htmlFor='cidade' className='text-slate-300 ml-1'>Cidade / UF</Label>
                          <Input
                            id='cidade'
                            value={formData.cidade}
                            onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                            onFocus={handleFormStart}
                            required
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-orange-500 focus:border-orange-500'
                            placeholder='São Paulo - SP'
                          />
                        </div>
                      </div>

                      <div className="space-y-2 relative">
                        <Label htmlFor='tipoSolicitacao' className='text-slate-300 ml-1 mb-2 block'>Tipo de Solicitação</Label>
                        <div className="relative">
                          <select
                            id='tipoSolicitacao'
                            value={formData.tipoSolicitacao}
                            onChange={(e) => setFormData({...formData, tipoSolicitacao: e.target.value})}
                            onFocus={handleFormStart}
                            required
                            className='w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none transition-all hover:border-slate-600'
                          >
                            <option value="" disabled className='text-slate-500'>Selecione o tipo de solicitação</option>
                            <option value="Nova Cotação" className='text-slate-900 bg-white'>Nova Cotação</option>
                            <option value="Renovação" className='text-slate-900 bg-white'>Renovação</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <ChevronDown className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 pt-2">
                        <Checkbox
                          id='lgpd'
                          checked={formData.lgpdConsent}
                          onCheckedChange={(checked) => setFormData({...formData, lgpdConsent: checked})}
                          className='border-slate-600 data-[state=checked]:bg-orange-600 mt-1'
                        />
                        <Label htmlFor='lgpd' className='text-xs text-slate-500 leading-relaxed cursor-pointer'>
                          Autorizo contato da Grafo Capital para cotação e orientação sobre seguro auto.
                        </Label>
                      </div>

                      <Button type='submit' size='lg' disabled={isLoading} className='w-full h-14 text-lg bg-orange-600 hover:bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-900/20'>
                        {isLoading ? 'Enviando...' : 'Solicitar Cotação'}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <FAQ faqData={faqData} />

        <footer className='py-8 border-t border-slate-900 bg-slate-950 text-center relative z-10'>
          <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <img src="https://horizons-cdn.hostinger.com/c45e6ee7-d291-42e1-bbe2-4397bc561d93/b89b8cff4b45fd28c60a468afbbd59b1.png" alt="Icon" className="h-6 w-auto" />
          </div>
          <p className='text-slate-600 text-sm'>© 2026 Grafo Capital. Todos os direitos reservados.</p>
        </footer>
        <ChatWidget solution="Seguro Auto" />
      </div>
    </>
  );
}

export default SeguroAuto;
