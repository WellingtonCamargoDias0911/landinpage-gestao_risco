
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, Shield, Zap, Droplets, CheckCircle, ArrowRight, ChevronRight, AlertCircle, Umbrella, Layers, Search, Sliders, PenTool, Rocket, Building, ChevronDown } from 'lucide-react';
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
import ChatWidget from '@/components/ChatWidget';
import { trackEvent, useScrollTracking } from '@/lib/analytics';
import { useFormSubmission } from '@/hooks/useFormSubmission';

function SeguroResidencial() {
  const { toast } = useToast();
  useScrollTracking();
  const { handleFormSubmit, isLoading } = useFormSubmission();
  const formStartedRef = useRef(false);

  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    tipo: '',
    cidade: '',
    lgpdConsent: false
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      trackEvent('form_start', { type: 'Seguro Residencial' });
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
    
    await handleFormSubmit('Seguro Residencial', formData, () => {
      setIsSuccess(true);
      setFormData({ nome: '', whatsapp: '', email: '', tipo: '', cidade: '', lgpdConsent: false });
      formStartedRef.current = false;
    });
  };

  const faqData = [
    { question: 'O que é coberto no conteúdo?', answer: 'Móveis, eletrodomésticos, eletrônicos, roupas e objetos pessoais. Você declara o valor total e, em caso de sinistro (incêndio, roubo, etc.), a seguradora indeniza até o limite contratado.' },
    { question: 'Seguro residencial cobre danos a terceiros?', answer: 'Sim, através da cobertura de Responsabilidade Civil. Se um vazamento do seu apartamento danificar o vizinho de baixo, por exemplo, o seguro paga os reparos.' },
    { question: 'Qual a diferença entre seguro residencial e condominial?', answer: 'Residencial protege o interior do seu imóvel (conteúdo, reformas, responsabilidade civil). Condominial protege as áreas comuns do prédio (estrutura, elevadores, portaria). Idealmente, você tem ambos.' },
  ];

  const methodSteps = [
    { icon: Search, title: 'Entender contexto', description: 'Avaliamos se é casa, apartamento ou condomínio e os riscos locais.' },
    { icon: Sliders, title: 'Revisar existente', description: 'Verificamos se já existe apólice condominial e o que ela cobre.' },
    { icon: PenTool, title: 'Desenhar opções', description: 'Estruturamos coberturas para roubo, danos elétricos e RC.' },
    { icon: Rocket, title: 'Implementar e acompanhar', description: 'Garantimos a proteção ativa e suporte em caso de sinistro.' }
  ];

  return (
    <>
      <Helmet>
        <title>Seguro Residencial e Condomínio | Orientação consultiva — Grafo Capital</title>
        <meta name="description" content="Seguro Residencial e Condomínio com orientação consultiva. Entenda prioridades, reduza lacunas e contrate com clareza. Atendimento por WhatsApp." />
      </Helmet>
      
      <div className='min-h-screen bg-slate-950 font-sans selection:bg-teal-500/30 overflow-x-hidden'>
        <Header />
        <Toaster />
        
        {/* HERO A SECTION */}
        <section className='relative min-h-[90vh] flex items-center justify-center pt-32 pb-20'>
          <GraphBackground color="#14b8a6" />
          <HexagonBackground color="text-teal-500/10" className="opacity-50" />
          
          <div className='container mx-auto px-4 relative z-10'>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-8 uppercase tracking-widest">
              <span>Home</span> <ChevronRight className="w-3 h-3" /> <span className="text-teal-400 font-bold">Seguro Residencial</span>
            </div>

            <div className='grid lg:grid-cols-2 gap-16 items-center'>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='text-left'
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-8 backdrop-blur-md">
                  <Home className="w-4 h-4 text-teal-400" />
                  <span className="text-teal-300 text-sm font-medium tracking-wide uppercase">Proteção para seu Lar</span>
                </div>
                
                <h1 className='text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight'>
                  Seguro Residencial e Condomínio com <br />
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-200 to-white'>
                    orientação clara e proteção sob medida.
                  </span>
                </h1>
                
                <p className='text-xl text-slate-400 max-w-xl mb-10 leading-relaxed'>
                  Proteja seu patrimônio e sua tranquilidade. Identificamos as coberturas essenciais para sua casa, apartamento ou condomínio, sem excessos.
                </p>

                <ul className="space-y-3 mb-10 text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-500" />
                    <span>Direcionamento para o tipo certo de imóvel</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-500" />
                    <span>Clareza sobre o que está e não está coberto</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-500" />
                    <span>Implementação rápida e sem burocracia</span>
                  </li>
                </ul>
                
                <div className='flex flex-wrap gap-4'>
                  <Button 
                    size='lg' 
                    className='h-14 px-8 bg-teal-600 hover:bg-teal-500 text-white rounded-full text-lg shadow-[0_0_20px_-5px_rgba(20,184,166,0.5)] transition-all hover:scale-105'
                    onClick={scrollToForm}
                  >
                    Quero orientação
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
                  <img 
                    src="https://images.unsplash.com/photo-1617228133035-2347f159e755?q=80&w=2070&auto=format&fit=crop" 
                    alt="Interior residencial aconchegante"
                    className="rounded-[2rem] shadow-2xl border border-slate-800 w-full object-cover h-[600px] grayscale hover:grayscale-0 transition-all duration-700"
                  />
                   <div className="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur border border-teal-500/30 p-6 rounded-2xl shadow-xl max-w-xs">
                    <div className="flex items-center gap-3 mb-2">
                       <Umbrella className="w-6 h-6 text-teal-400" />
                       <span className="text-white font-bold">Cobertura Abrangente</span>
                    </div>
                    <p className="text-slate-400 text-xs">De danos elétricos a vazamentos, cuidamos dos detalhes.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HERO B SECTION */}
        <section className="py-20 bg-teal-950/20 border-y border-teal-900/20">
           <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto">
                 Sua casa (ou condomínio) é onde a vida acontece. Proteja com critério.
              </h1>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                 Mais do que paredes, protegemos seu lar e sua paz de espírito contra incidentes que podem custar caro.
              </p>
              <Button 
                 size="lg" 
                 onClick={scrollToForm}
                 className="bg-white text-teal-900 hover:bg-slate-100 rounded-full px-10 h-14 text-lg font-bold shadow-lg"
              >
                 Falar com um assessor
              </Button>
           </div>
        </section>

        {/* POR QUE AS PESSOAS SÓ LEMBRAM DISSO TARDE */}
        <section className="py-24 bg-slate-900 relative">
             <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16">
                   <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Imprevisto não chega com aviso — chega com urgência</h2>
                   <p className="text-slate-400 text-lg">
                      Um cano estourado ou um curto-circuito podem causar prejuízos de milhares de reais em minutos. O custo do seguro é uma fração mínima desse risco.
                   </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                   <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-start gap-4 hover:border-teal-500/30 transition-colors">
                      <AlertCircle className="w-8 h-8 text-teal-500 shrink-0" />
                      <div>
                          <h4 className="text-white font-bold mb-2">Responsabilidade Civil</h4>
                          <p className="text-slate-400">Danos causados a vizinhos (como infiltrações) são sua responsabilidade. O seguro protege seu bolso nessas horas.</p>
                      </div>
                   </div>
                   <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-start gap-4 hover:border-teal-500/30 transition-colors">
                      <Zap className="w-8 h-8 text-teal-500 shrink-0" />
                      <div>
                          <h4 className="text-white font-bold mb-2">Assistências 24h</h4>
                          <p className="text-slate-400">Chaveiro, encanador e eletricista à disposição. Economia e praticidade no dia a dia, não só em desastres.</p>
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
                   { title: "Proteção Alinhada", desc: "Coberturas que fazem sentido para seu tipo de imóvel e estilo de vida." },
                   { title: "Clareza", desc: "Explicação simples sobre limites, exclusões e como acionar quando precisar." },
                   { title: "Consultoria", desc: "Apoio para identificar se a convenção do condomínio já cobre o suficiente." }
                 ].map((item, i) => (
                    <div key={i} className="text-center bg-slate-900/50 p-8 rounded-2xl border border-teal-500/10">
                       <div className="w-16 h-16 mx-auto bg-teal-900/20 rounded-full flex items-center justify-center mb-6 border border-teal-500/20">
                          <CheckCircle className="w-8 h-8 text-teal-400" />
                       </div>
                       <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                       <p className="text-slate-400">{item.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* MÉTODO GRAFO */}
        <ProcessSteps color="text-teal-400" borderColor="border-teal-500" steps={methodSteps} />

        {/* ESCOLHA SEU TIPO */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
             <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-3xl font-bold text-white text-center mb-12">Para qual cenário você precisa?</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                   <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
                      <Home className="w-12 h-12 text-teal-400 mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-4">Residencial</h3>
                      <p className="text-slate-400 mb-6">Para casas e apartamentos. Protege o conteúdo (móveis, eletrônicos), estrutura interna e sua responsabilidade civil familiar.</p>
                      <Button variant="outline" className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10" onClick={scrollToForm}>Cotar Residencial</Button>
                   </div>
                   <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
                      <Building className="w-12 h-12 text-teal-400 mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-4">Condomínio</h3>
                      <p className="text-slate-400 mb-6">Para síndicos e administradoras. Protege áreas comuns, estrutura do prédio, funcionários e responsabilidade civil do síndico.</p>
                      <Button variant="outline" className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10" onClick={scrollToForm}>Cotar Condomínio</Button>
                   </div>
                </div>
             </div>
        </section>

        {/* FORM SECTION */}
        <section id='conversion-form' className='py-24 relative overflow-hidden'>
          <div className='absolute inset-0 bg-teal-900/5'></div>
          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-4xl mx-auto bg-slate-950 rounded-[2.5rem] border border-teal-900/30 p-8 md:p-12 shadow-2xl'>
              <div className="grid md:grid-cols-5 gap-12">
                <div className="md:col-span-2 space-y-6">
                  <h2 className='text-3xl font-bold text-white'>Análise Personalizada</h2>
                  <p className='text-slate-400'>Informe seus dados para receber uma proposta adequada ao seu imóvel.</p>
                  
                  <div className="bg-teal-950/30 p-4 rounded-xl border border-teal-500/20 mt-8">
                      <p className="text-teal-200 text-xs italic">"O atendimento foi excelente. Descobri que meu seguro antigo não cobria danos elétricos, e ajustamos isso."</p>
                      <p className="text-white font-bold text-xs mt-2">- Mariana S.</p>
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
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-teal-500 focus:border-teal-500'
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
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-teal-500 focus:border-teal-500'
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
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-teal-500 focus:border-teal-500'
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
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-teal-500 focus:border-teal-500'
                            placeholder='São Paulo - SP'
                          />
                        </div>
                      </div>

                      <div className="space-y-2 relative">
                        <Label htmlFor='tipo' className='text-slate-300 ml-1 mb-2 block'>Tipo de Seguro</Label>
                        <div className="relative">
                          <select
                            id='tipo'
                            value={formData.tipo}
                            onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                            onFocus={handleFormStart}
                            required
                            className='w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none transition-all hover:border-slate-600'
                          >
                            <option value="" disabled className='text-slate-500'>Selecione o tipo de imóvel</option>
                            <option value="Residencial" className='text-slate-900 bg-white'>Residencial (Casa/Apto)</option>
                            <option value="Condomínio" className='text-slate-900 bg-white'>Condomínio (Prédio)</option>
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
                          className='border-slate-600 data-[state=checked]:bg-teal-600 mt-1'
                        />
                        <Label htmlFor='lgpd' className='text-xs text-slate-500 leading-relaxed cursor-pointer'>
                          Autorizo contato da Grafo Capital para análise e orientação sobre seguro residencial.
                        </Label>
                      </div>

                      <Button type='submit' size='lg' disabled={isLoading} className='w-full h-14 text-lg bg-teal-600 hover:bg-teal-500 text-white rounded-xl shadow-lg shadow-teal-900/20'>
                        {isLoading ? 'Enviando...' : 'Solicitar Análise'}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <FAQ faqData={faqData} />

        <footer className='py-8 border-t border-slate-900 bg-slate-950 text-center'>
          <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <img src="https://horizons-cdn.hostinger.com/c45e6ee7-d291-42e1-bbe2-4397bc561d93/b89b8cff4b45fd28c60a468afbbd59b1.png" alt="Icon" className="h-6 w-auto" />
          </div>
          <p className='text-slate-600 text-sm'>© 2026 Grafo Capital. Todos os direitos reservados.</p>
        </footer>
        <ChatWidget solution="Seguro Residencial" />
      </div>
    </>
  );
}

export default SeguroResidencial;
