
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, AlertTriangle, Shield, TrendingUp, Users, ArrowRight, Gavel, ChevronRight, Stethoscope, HardHat, Scale as ScaleIcon, BadgeCheck, FileText, Search, Sliders, PenTool, Rocket, CheckCircle } from 'lucide-react';
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

function SeguroRCProfissional() {
  const { toast } = useToast();
  useScrollTracking();
  const { handleFormSubmit, isLoading } = useFormSubmission();
  const formStartedRef = useRef(false);

  const [formData, setFormData] = useState({
    nome: '',
    profissao: '',
    whatsapp: '',
    email: '',
    atendeComo: '',
    lgpdConsent: false
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      trackEvent('form_start', { type: 'Seguro RC' });
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
        title: 'Atenção',
        description: 'É necessário aceitar os termos de privacidade.',
        variant: 'destructive'
      });
      return;
    }

    await handleFormSubmit('Seguro RC Profissional', formData, () => {
      setIsSuccess(true);
      setFormData({ nome: '', profissao: '', whatsapp: '', email: '', atendeComo: '', lgpdConsent: false });
      formStartedRef.current = false;
    });
  };

  const faqData = [
    { question: 'O que caracteriza um erro profissional?', answer: 'Qualquer falha, omissão ou negligência no exercício da profissão que cause dano a terceiro. Ex: um médico que erra o diagnóstico, um engenheiro que calcula mal uma viga, um advogado que perde um prazo recursal.' },
    { question: 'A apólice cobre acordos extrajudiciais?', answer: 'Sim, e é incentivado. Se houver reclamação de um terceiro, a seguradora pode autorizar um acordo para evitar o desgaste e custo de um processo judicial. A indenização é paga diretamente pela seguradora.' },
    { question: 'Cobre danos à minha reputação?', answer: 'Diretamente não (não paga "multa" por imagem ruim), mas indiretamente sim: oferece verba para Assessoria de Imprensa e Gestão de Crise para mitigar danos à imagem pública após um sinistro.' },
    { question: 'O que é a "Retroatividade"?', answer: 'É uma cláusula que permite cobrir erros cometidos no passado, desde que você não tenha conhecimento deles (reclamação ainda não feita). Fundamental para quem já atua há anos sem seguro.' },
  ];

  const methodSteps = [
    { icon: Search, title: 'Entender', description: 'Avaliamos sua especialidade e histórico para dimensionar a exposição ao risco.' },
    { icon: Sliders, title: 'Revisar', description: 'Verificamos contratos e procedimentos para mitigar vulnerabilidades jurídicas.' },
    { icon: PenTool, title: 'Desenhar', description: 'Definimos os limites de cobertura (LMI) ideais para sua proteção patrimonial.' },
    { icon: Rocket, title: 'Implementar', description: 'Ativação da blindagem e suporte jurídico imediato em caso de notificação.' }
  ];

  return (
    <>
      <Helmet>
        <title>Seguro de Responsabilidade Civil Profissional | Grafo Capital</title>
        <meta name="description" content="Seguro E&O para médicos, advogados e engenheiros. Proteção contra processos, erros profissionais e custos de defesa jurídica." />
      </Helmet>
      
      <div className='min-h-screen bg-slate-950 font-sans selection:bg-purple-500/30 overflow-x-hidden'>
        <Header />
        <Toaster />
        
        {/* HERO SECTION */}
        <section className='relative min-h-[90vh] flex items-center justify-center pt-32 pb-20'>
          <GraphBackground color="#a855f7" />
          <HexagonBackground color="text-purple-500/10" className="opacity-50" />
          
          <div className='container mx-auto px-4 relative z-10'>
             <div className="flex items-center gap-2 text-xs text-slate-500 mb-8 uppercase tracking-widest">
                <span>Home</span> <ChevronRight className="w-3 h-3" /> <span className="text-purple-400 font-bold">RC Profissional</span>
             </div>

            <div className='grid lg:grid-cols-2 gap-16 items-center'>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='text-left'
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 backdrop-blur-md">
                   <Shield className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300 text-sm font-medium tracking-wide uppercase">Blindagem de Carreira</span>
                </div>
                
                <h1 className='text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight'>
                  Sua carreira blindada contra imprevistos <br />
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-200 to-white'>
                    jurídicos.
                  </span>
                </h1>
                
                <p className='text-xl text-slate-400 max-w-xl mb-10 leading-relaxed'>
                  Exerça sua profissão com a segurança de ter a melhor defesa técnica e proteção financeira contra processos e reclamações de terceiros.
                </p>
                
                <div className='flex flex-wrap gap-4'>
                  <Button 
                    size='lg' 
                    className='h-14 px-8 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-lg shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)] transition-all hover:scale-105'
                    onClick={scrollToForm}
                  >
                    Fazer análise de RC Profissional
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
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop" 
                        alt="Profissional em ambiente de trabalho focado"
                        className="rounded-[2rem] shadow-2xl border border-slate-800 w-full object-cover h-[600px] grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    
                     <div className="absolute top-1/2 -right-8 bg-purple-950/90 p-6 rounded-xl border border-purple-500/30 backdrop-blur-md shadow-2xl max-w-xs transform -translate-y-1/2">
                        <div className="flex items-center gap-3 mb-3">
                            <Gavel className="w-8 h-8 text-purple-400" />
                            <span className="text-white font-bold leading-tight">Defesa Jurídica Especializada</span>
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
            <h2 className="text-3xl font-bold text-white text-center mb-12">Blindagem essencial para:</h2>
            <div className="grid md:grid-cols-3 gap-6">
               {[
                 { title: "Área da Saúde", desc: "Médicos, Dentistas e Clínicas expostos a acusações de erro médico.", icon: Stethoscope },
                 { title: "Engenharia e Obras", desc: "Engenheiros e Arquitetos responsáveis por projetos, estruturas e execução.", icon: HardHat },
                 { title: "Jurídico e Contábil", desc: "Advogados e Contadores que lidam com prazos e patrimônio de terceiros.", icon: ScaleIcon },
               ].map((item, i) => (
                  <div key={i} className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all">
                     <item.icon className="w-10 h-10 text-purple-400 mb-4" />
                     <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                     <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
               ))}
            </div>
          </div>
        </section>

        {/* A DOR REAL */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
             <HexagonBackground color="text-red-500/10" className="opacity-20" />
             <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12">
                   <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">A dor real</h2>
                   <p className="text-slate-400 text-lg">
                      Ser inocente não basta. Provar que você não errou custa caro, e ter seus bens bloqueados durante um processo pode inviabilizar sua vida pessoal.
                   </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto mt-12">
                   <div className="p-6 bg-red-950/20 border border-red-900/50 rounded-2xl">
                      <div className="flex items-start gap-4">
                         <AlertTriangle className="w-8 h-8 text-red-500 shrink-0 mt-1" />
                         <div>
                            <h4 className="text-white font-bold mb-2">Custos de Defesa</h4>
                            <p className="text-slate-400 text-sm">Honorários advocatícios e perícias técnicas em processos complexos podem ultrapassar facilmente seis dígitos.</p>
                         </div>
                      </div>
                   </div>
                   <div className="p-6 bg-red-950/20 border border-red-900/50 rounded-2xl">
                       <div className="flex items-start gap-4">
                         <Gavel className="w-8 h-8 text-red-500 shrink-0 mt-1" />
                         <div>
                            <h4 className="text-white font-bold mb-2">Condenações Elevadas</h4>
                            <p className="text-slate-400 text-sm">Indenizações por danos materiais, corporais e morais podem comprometer todo o patrimônio que você construiu.</p>
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
                   { title: "Defesa Especializada", desc: "Advogados especialistas na sua área para garantir a melhor defesa técnica." },
                   { title: "Acordos Extrajudiciais", desc: "Agilidade para encerrar disputas antes que virem processos longos e caros." },
                   { title: "Proteção de Imagem", desc: "Gestão de crise para preservar sua reputação perante o mercado e clientes." },
                   { title: "Retroatividade", desc: "Cobertura para fatos geradores desconhecidos ocorridos antes da contratação." }
                 ].map((item, i) => (
                    <div key={i} className="text-center">
                       <div className="w-16 h-16 mx-auto bg-purple-900/20 rounded-full flex items-center justify-center mb-4 border border-purple-500/20">
                          <Shield className="w-8 h-8 text-purple-400" />
                       </div>
                       <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                       <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* MID-PAGE CTA - STRATEGICALLY PLACED BETWEEN BENEFITS AND METHOD */}
        <section className="py-16 bg-gradient-to-r from-purple-950/40 to-slate-950 border-y border-purple-900/20">
          <div className="container mx-auto px-4 text-center">
             <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Carreira protegida, mente tranquila.</h3>
                <p className="text-slate-400 mb-8 text-lg">Não deixe que um erro técnico comprometa anos de dedicação. Garanta sua blindagem hoje com quem entende do assunto.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button 
                      size="lg" 
                      onClick={scrollToForm}
                      className="bg-purple-600 hover:bg-purple-500 text-white rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_25px_-5px_rgba(168,85,247,0.4)] transition-transform hover:scale-105"
                   >
                      Quero meu Diagnóstico RC
                   </Button>
                </div>
             </div>
          </div>
        </section>

        {/* MÉTODO GRAFO */}
        <ProcessSteps color="text-purple-400" borderColor="border-purple-500" steps={methodSteps} />

        {/* PREMIUM FORM */}
        <section id='conversion-form' className='py-24 relative overflow-hidden'>
          <div className='absolute inset-0 bg-purple-900/10'></div>
          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-4xl mx-auto bg-slate-950 rounded-[2.5rem] border border-purple-900/30 p-8 md:p-12 shadow-2xl relative overflow-hidden'>
              
              <div className="grid md:grid-cols-5 gap-12">
                <div className="md:col-span-2 space-y-6">
                  <h2 className='text-3xl font-bold text-white'>Proposta Personalizada</h2>
                  <p className='text-slate-400'>Preencha para receber uma cotação alinhada à sua especialidade.</p>
                  
                  <div className="bg-purple-950/30 p-4 rounded-xl border border-purple-500/20 mt-8">
                     <p className="text-purple-200 text-xs italic">"Durmo tranquilo sabendo que meu patrimônio pessoal não está em risco por conta da minha profissão."</p>
                     <p className="text-white font-bold text-xs mt-2 mt-4">- Dr. André L., Anestesiologista</p>
                  </div>
                </div>

                <div className='md:col-span-3'>
                  {isSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-8 text-center h-full flex flex-col justify-center items-center"
                    >
                      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
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
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-purple-500 focus:border-purple-500'
                            placeholder='Seu nome'
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor='profissao' className='text-slate-300 ml-1'>Profissão / Área</Label>
                          <Input
                            id='profissao'
                            value={formData.profissao}
                            onChange={(e) => setFormData({...formData, profissao: e.target.value})}
                            onFocus={handleFormStart}
                            required
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-purple-500 focus:border-purple-500'
                            placeholder='Ex: Médico, Engenheiro'
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor='whatsapp' className='text-slate-300 ml-1'>WhatsApp</Label>
                          <Input
                            id='whatsapp'
                            type="tel"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                            onFocus={handleFormStart}
                            required
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-purple-500 focus:border-purple-500'
                            placeholder='(00) 90000-0000'
                          />
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
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-purple-500 focus:border-purple-500'
                            placeholder='seu@email.com'
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className='text-slate-300 ml-1'>Atende como</Label>
                         <div className="flex gap-4 mt-2">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="atendeComo" 
                                value="Pessoa Física" 
                                className="accent-purple-500 w-4 h-4"
                                onChange={(e) => setFormData({...formData, atendeComo: e.target.value})}
                              />
                              <span className="text-slate-300 text-sm">Pessoa Física</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="atendeComo" 
                                value="Pessoa Jurídica" 
                                className="accent-purple-500 w-4 h-4"
                                onChange={(e) => setFormData({...formData, atendeComo: e.target.value})}
                              />
                              <span className="text-slate-300 text-sm">Pessoa Jurídica</span>
                            </label>
                         </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 pt-2">
                        <Checkbox
                          id='lgpd'
                          checked={formData.lgpdConsent}
                          onCheckedChange={(checked) => setFormData({...formData, lgpdConsent: checked})}
                          className='border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 mt-1'
                        />
                        <Label htmlFor='lgpd' className='text-xs text-slate-500 leading-relaxed cursor-pointer'>
                          Ao enviar, você autoriza contato da Grafo Capital para orientação e atendimento.
                        </Label>
                      </div>

                      <Button type='submit' size='lg' disabled={isLoading} className='w-full h-14 text-lg bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-lg shadow-purple-900/20 disabled:opacity-70 disabled:cursor-not-allowed'>
                        {isLoading ? 'Enviando...' : 'Quero meu Diagnóstico RC'}
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
        <ChatWidget solution="RC Profissional" />
      </div>
    </>
  );
}

export default SeguroRCProfissional;
