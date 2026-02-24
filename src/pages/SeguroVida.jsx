
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Home, TrendingUp, CheckCircle, ArrowRight, Activity, XCircle, Search, Sliders, PenTool, Rocket } from 'lucide-react';
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

function SeguroVida() {
  const { toast } = useToast();
  useScrollTracking();
  const { handleFormSubmit, isLoading } = useFormSubmission();
  const formStartedRef = useRef(false);
  
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    dependentes: '',
    perfil: '',
    lgpdConsent: false
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      trackEvent('form_start', { type: 'Seguro Vida' });
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
        description: 'Precisamos do seu consentimento para prosseguir com a análise.',
        variant: 'destructive'
      });
      return;
    }
    
    await handleFormSubmit('Seguro de Vida', formData, () => {
      setIsSuccess(true);
      setFormData({ nome: '', whatsapp: '', email: '', dependentes: '', perfil: '', lgpdConsent: false });
      formStartedRef.current = false;
    });
  };

  const faqData = [
    { question: 'Quanto custa um seguro de vida?', answer: 'O valor é altamente personalizado. Para um jovem de 30 anos, pode custar menos que um jantar mensal. Para coberturas milionárias, o investimento é proporcional ao capital segurado, mas sempre uma fração pequena (geralmente <1%) do valor protegido.' },
    { question: 'O seguro entra em inventário?', answer: 'Não. O seguro de vida não entra em inventário e é isento de ITCMD (imposto sobre herança). Isso garante liquidez imediata (geralmente em até 30 dias) para sua família pagar as custas do próprio inventário dos outros bens.' },
    { question: 'Tenho doenças pré-existentes. Posso contratar?', answer: 'Sim, na maioria dos casos. A transparência é chave. Algumas seguradoras podem aceitar com agravo (valor maior) ou exclusão específica, mas existem produtos especializados para diversos perfis de saúde.' },
    { question: 'A apólice cobre pandemias e doenças graves?', answer: 'Trabalhamos apenas com seguradoras de primeira linha que cobriram pandemias (como COVID-19) mesmo quando havia exclusão contratual. Além disso, oferecemos coberturas em vida para Câncer, AVC, Infarto, que pagam o capital para você usar no tratamento.' },
    { question: 'Quem pode ser meu beneficiário?', answer: 'Quem você quiser. Não precisa ser parente ou herdeiro legal. Você tem liberdade total para indicar amigos, sócios ou instituições, e pode alterar a qualquer momento.' },
  ];

  const methodSteps = [
    { icon: Search, title: 'Entender', description: 'Mapeamos seu momento de vida, dependentes e patrimônio exposto.' },
    { icon: Sliders, title: 'Revisar', description: 'Analisamos apólices antigas e identificamos gaps de proteção.' },
    { icon: PenTool, title: 'Desenhar', description: 'Estruturamos o capital ideal com as melhores seguradoras do mercado.' },
    { icon: Rocket, title: 'Implementar', description: 'Emitimos a apólice e garantimos o acompanhamento durante a vigência do seguro.' }
  ];

  return (
    <>
      <Helmet>
        <title>Seguro de Vida e Sucessão Patrimonial | Grafo Capital</title>
        <meta name="description" content="Planejamento sucessório, proteção de renda e seguro de vida resgatável. Consultoria especializada para blindar o futuro da sua família." />
      </Helmet>
      
      <div className='min-h-screen bg-slate-950 font-sans selection:bg-blue-500/30 overflow-x-hidden'>
        <Header />
        <Toaster />
        
        {/* HERO SECTION */}
        <section className='relative min-h-[90vh] flex items-center justify-center pt-32 pb-20'>
          <GraphBackground color="#60a5fa" />
          <HexagonBackground className="opacity-50" />
          
          <div className='container mx-auto px-4 relative z-10'>
            <div className='grid lg:grid-cols-2 gap-16 items-center'>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='text-left'
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-blue-300 text-sm font-medium tracking-wide uppercase">Planejamento Sucessório & Proteção</span>
                </div>
                
                <h1 className='text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight'>
                  Garanta o futuro de quem você ama e a sua <br />
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white'>
                    tranquilidade hoje.
                  </span>
                </h1>
                
                <p className='text-xl text-slate-400 max-w-xl mb-10 leading-relaxed'>
                  Mais do que um seguro, uma estratégia de sucessão patrimonial que assegura liquidez, protege seu legado e cuida de você em vida.
                </p>
                
                <div className='flex flex-wrap gap-4'>
                  <Button 
                    size='lg' 
                    className='h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-lg shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] transition-all hover:scale-105'
                    onClick={scrollToForm}
                  >
                    Simular com um assessor
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
                        src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop" 
                        alt="Pai ensinando filho, representando legado e futuro"
                        className="rounded-[2rem] shadow-2xl border border-slate-800 w-full object-cover h-[600px] grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    
                    <div className="absolute -bottom-10 -left-10 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl max-w-xs">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-3 bg-blue-500/20 rounded-full">
                                <Shield className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-white font-bold">Liquidez Imediata</p>
                                <p className="text-slate-400 text-xs">Sem inventário</p>
                            </div>
                        </div>
                    </div>
                 </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PARA QUEM É */}
        <section className="py-24 bg-slate-900 relative">
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Para quem é este seguro?</h2>
            <div className="grid md:grid-cols-3 gap-6">
               {[
                 { title: "Pais de Família", desc: "Que desejam garantir a educação dos filhos e a manutenção do padrão de vida na sua ausência.", icon: Home },
                 { title: "Sócios e Empresários", desc: "Que precisam de sucessão empresarial e liquidez para que a família não seja forçada a vender cotas desvalorizadas.", icon: TrendingUp },
                 { title: "Profissionais Autônomos", desc: "Que dependem da própria saúde para gerar renda e precisam de proteção contra invalidez ou doenças graves.", icon: Activity },
               ].map((item, i) => (
                  <div key={i} className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
                     <item.icon className="w-10 h-10 text-blue-400 mb-4" />
                     <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                     <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
               ))}
            </div>
          </div>
        </section>

        {/* POR QUE ISSO VIRA URGENTE */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
             <HexagonBackground color="text-red-500/10" className="opacity-20" />
             <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12">
                   <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Por que isso vira urgente</h2>
                   <p className="text-slate-400 text-lg">
                      Imprevistos não avisam. A falta de liquidez no momento da sucessão é o fator #1 que dilapida patrimônios familiares construídos ao longo de décadas.
                   </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto mt-12">
                   <div className="p-6 bg-red-950/20 border border-red-900/50 rounded-2xl">
                      <div className="flex items-start gap-4">
                         <XCircle className="w-8 h-8 text-red-500 shrink-0 mt-1" />
                         <div>
                            <h4 className="text-white font-bold mb-2">Bloqueio de Bens</h4>
                            <p className="text-slate-400 text-sm">O inventário pode levar anos. Sem acesso às contas bancárias, quem paga as despesas da casa e da sucessão?</p>
                         </div>
                      </div>
                   </div>
                   <div className="p-6 bg-red-950/20 border border-red-900/50 rounded-2xl">
                       <div className="flex items-start gap-4">
                         <Activity className="w-8 h-8 text-red-500 shrink-0 mt-1" />
                         <div>
                            <h4 className="text-white font-bold mb-2">Perda de Renda em Vida</h4>
                            <p className="text-slate-400 text-sm">Doenças graves consomem reservas financeiras rapidamente. O seguro repõe esses recursos para que o tratamento seja a única preocupação.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
        </section>

        {/* O QUE VOCÊ GANHA */}
        <section className="py-24 bg-slate-900">
           <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white text-center mb-16">O que você ganha</h2>
              <div className="grid md:grid-cols-4 gap-8">
                 {[
                   { title: "Liquidez Imediata", desc: "Recursos livres de inventário em até 30 dias para custear despesas e impostos." },
                   { title: "Isenção de ITCMD", desc: "O seguro não é herança, portanto não incide o imposto estadual (até 8%)." },
                { title: "Capital para sua família", desc: "Se acontecer algo com você durante a vigência do seguro, seus beneficiários recebem o capital segurado conforme contrato." },
                   { title: "Gestão de Sinistros", desc: "Apoio humanizado e técnico para sua família no momento que ela mais precisa." }
                 ].map((item, i) => (
                    <div key={i} className="text-center">
                       <div className="w-16 h-16 mx-auto bg-blue-900/20 rounded-full flex items-center justify-center mb-4 border border-blue-500/20">
                          <CheckCircle className="w-8 h-8 text-blue-400" />
                       </div>
                       <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                       <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* MID-PAGE CTA - STRATEGICALLY PLACED BETWEEN BENEFITS AND METHOD */}
        <section className="py-16 bg-gradient-to-r from-blue-950/40 to-slate-950 border-y border-blue-900/20">
          <div className="container mx-auto px-4 text-center">
             <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Não deixe o futuro da sua família ao acaso.</h3>
                <p className="text-slate-400 mb-8 text-lg">Garanta liquidez, proteção e tranquilidade com um planejamento sucessório feito sob medida para você.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button 
                      size="lg" 
                      onClick={scrollToForm}
                      className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_25px_-5px_rgba(37,99,235,0.4)] transition-transform hover:scale-105"
                   >
                      Quero meu Mapa de Proteção
                   </Button>
                </div>
             </div>
          </div>
        </section>

        {/* MÉTODO GRAFO */}
        <ProcessSteps color="text-blue-400" borderColor="border-blue-500" steps={methodSteps} />

        {/* PREMIUM FORM */}
        <section id='conversion-form' className='py-24 relative overflow-hidden'>
          <div className='absolute inset-0 bg-blue-900/10'></div>
          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-4xl mx-auto bg-slate-950 rounded-[2.5rem] border border-slate-800 p-8 md:p-12 shadow-2xl relative overflow-hidden'>
              
              <div className="grid md:grid-cols-5 gap-12">
                <div className="md:col-span-2 space-y-6">
                  <h2 className='text-3xl font-bold text-white'>Vamos desenhar sua proteção?</h2>
                  <p className='text-slate-400'>Preencha os dados ao lado para receber uma análise de perfil gratuita e confidencial.</p>
                  
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 mt-8">
                     <p className="text-slate-300 text-xs italic">"A melhor decisão financeira que tomei para minha família."</p>
                     <div className="flex items-center gap-3 mt-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-xs">RM</div>
                        <div>
                            <p className="text-white text-xs font-bold">Roberto M.</p>
                            <p className="text-slate-500 text-xs">Empresário, 42 anos</p>
                        </div>
                     </div>
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
                      <p className="text-slate-300">Em breve um assessor da Grafo Capital entra em contato.</p>
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
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Digite seu nome'
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor='whatsapp' className='text-slate-300 ml-1'>WhatsApp</Label>
                          <Input
                            id='whatsapp'
                            type='tel'
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                            onFocus={handleFormStart}
                            required
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500'
                            placeholder='(00) 00000-0000'
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor='email' className='text-slate-300 ml-1'>E-mail</Label>
                        <Input
                          id='email'
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          onFocus={handleFormStart}
                          required
                          className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500'
                          placeholder='seu@email.com'
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label className='text-slate-300 ml-1'>Possui Dependentes?</Label>
                           <div className="flex gap-4 mt-2">
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                  type="radio" 
                                  name="dependentes" 
                                  value="Sim" 
                                  className="accent-blue-500 w-4 h-4"
                                  onChange={(e) => setFormData({...formData, dependentes: e.target.value})}
                                />
                                <span className="text-slate-300 text-sm">Sim</span>
                              </label>
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                  type="radio" 
                                  name="dependentes" 
                                  value="Não" 
                                  className="accent-blue-500 w-4 h-4"
                                  onChange={(e) => setFormData({...formData, dependentes: e.target.value})}
                                />
                                <span className="text-slate-300 text-sm">Não</span>
                              </label>
                           </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor='perfil' className='text-slate-300 ml-1'>Ocupação/Perfil</Label>
                          <Input
                            id='perfil'
                            value={formData.perfil}
                            onChange={(e) => setFormData({...formData, perfil: e.target.value})}
                            onFocus={handleFormStart}
                            required
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Ex: Médico, Empresário'
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 pt-2">
                        <Checkbox
                          id='lgpd'
                          checked={formData.lgpdConsent}
                          onCheckedChange={(checked) => setFormData({...formData, lgpdConsent: checked})}
                          className='border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 mt-1'
                        />
                        <Label htmlFor='lgpd' className='text-xs text-slate-500 leading-relaxed cursor-pointer'>
                          Ao enviar, você autoriza contato da Grafo Capital para orientação e atendimento.
                        </Label>
                      </div>

                      <Button type='submit' size='lg' disabled={isLoading} className='w-full h-14 text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed'>
                        {isLoading ? 'Enviando...' : 'Quero meu Mapa de Proteção'}
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
        <ChatWidget solution="Seguro Vida" />
      </div>
    </>
  );
}

export default SeguroVida;
