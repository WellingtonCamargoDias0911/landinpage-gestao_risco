
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Briefcase, Shield, TrendingUp, Users, CheckCircle, ArrowRight, ChevronRight, AlertTriangle, Search, Sliders, PenTool, Rocket, Building2, Factory, Store, ChevronDown } from 'lucide-react';
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

function SeguroEmpresarial() {
  const { toast } = useToast();
  useScrollTracking();
  const { handleFormSubmit, isLoading } = useFormSubmission();
  const formStartedRef = useRef(false);

  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    whatsapp: '',
    segmento: '',
    cidade: '',
    lgpdConsent: false
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      trackEvent('form_start', { type: 'Seguro Empresarial' });
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
    
    await handleFormSubmit('Seguro Empresarial', formData, () => {
      setIsSuccess(true);
      setFormData({ nome: '', empresa: '', whatsapp: '', segmento: '', cidade: '', lgpdConsent: false });
      formStartedRef.current = false;
    });
  };

  const faqData = [
    { question: 'Qual a diferença entre seguro empresarial e patrimonial?', answer: 'São termos frequentemente usados como sinônimos. Ambos protegem ativos da empresa (prédio, equipamentos, estoque) e operações (lucros cessantes, responsabilidade civil). O importante é ter cobertura adequada ao seu risco.' },
    { question: 'O que são Lucros Cessantes?', answer: 'É a cobertura que garante o faturamento perdido durante a paralisação forçada por sinistro. Essencial para manter o pagamento de salários, aluguel e outras despesas fixas enquanto você se recupera.' },
    { question: 'Preciso fazer vistoria?', answer: 'Sim, para riscos de médio e grande porte. A seguradora avalia sistemas de proteção (alarmes, sprinklers, extintores) e características da operação. Quanto melhor sua gestão de risco, menor o custo do seguro.' },
  ];

  const methodSteps = [
    { icon: Search, title: 'Entender operação', description: 'Mapeamos o fluxo do seu negócio para identificar onde estão os riscos críticos.' },
    { icon: Sliders, title: 'Revisar cenário', description: 'Analisamos apólices atuais e sistemas de proteção existentes.' },
    { icon: PenTool, title: 'Desenhar opções', description: 'Estruturamos coberturas que protegem o patrimônio e a continuidade.' },
    { icon: Rocket, title: 'Implementar e acompanhar', description: 'Ativação da apólice e gestão contínua de sinistros e renovações.' }
  ];

  return (
    <>
      <Helmet>
        <title>Seguro Empresarial | Raio‑X e orientação consultiva — Grafo Capital</title>
        <meta name="description" content="Seguro Empresarial com orientação consultiva. Faça um Raio‑X da proteção da operação: prioridades, lacunas e opções comparáveis." />
      </Helmet>
      
      <div className='min-h-screen bg-slate-950 font-sans selection:bg-emerald-500/30 overflow-x-hidden'>
        <Header />
        <Toaster />
        
        {/* HERO A SECTION */}
        <section className='relative min-h-[90vh] flex items-center justify-center pt-32 pb-20'>
          <GraphBackground color="#10b981" />
          <HexagonBackground color="text-emerald-500/10" className="opacity-50" />
          
          <div className='container mx-auto px-4 relative z-10'>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-8 uppercase tracking-widest">
              <span>Home</span> <ChevronRight className="w-3 h-3" /> <span className="text-emerald-400 font-bold">Seguro Empresarial</span>
            </div>

            <div className='grid lg:grid-cols-2 gap-16 items-center'>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='text-left'
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-md">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 text-sm font-medium tracking-wide uppercase">Gestão de Riscos Corporativos</span>
                </div>
                
                <h1 className='text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight'>
                  Seguro Empresarial com orientação consultiva para <br />
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-white'>
                    proteger sua operação.
                  </span>
                </h1>
                
                <p className='text-xl text-slate-400 max-w-xl mb-10 leading-relaxed'>
                  A Grafo Capital faz um Raio-X da proteção da sua empresa: identificamos prioridades, reduzimos lacunas e apresentamos opções comparáveis com clareza.
                </p>

                <ul className="space-y-3 mb-10 text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Proteção conectada à realidade do negócio</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Revisão de limites e cláusulas contratuais</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Implementação ágil e suporte técnico</span>
                  </li>
                </ul>
                
                <div className='flex flex-wrap gap-4'>
                  <Button 
                    size='lg' 
                    className='h-14 px-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-lg shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] transition-all hover:scale-105'
                    onClick={scrollToForm}
                  >
                    Fazer Raio‑X Empresarial
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
                    src="https://images.unsplash.com/photo-1570126618953-d437176e8c79?q=80&w=2070&auto=format&fit=crop" 
                    alt="Ambiente corporativo moderno e seguro"
                    className="rounded-[2rem] shadow-2xl border border-slate-800 w-full object-cover h-[600px] grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur border border-emerald-500/30 p-6 rounded-2xl shadow-xl max-w-xs">
                    <div className="flex items-center gap-3 mb-2">
                       <Shield className="w-6 h-6 text-emerald-400" />
                       <span className="text-white font-bold">Blindagem Operacional</span>
                    </div>
                    <p className="text-slate-400 text-xs">Análise de vulnerabilidades físicas e financeiras.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HERO B SECTION */}
        <section className="py-20 bg-emerald-950/20 border-y border-emerald-900/20">
           <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto">
                 Um evento não deveria decidir o destino da sua empresa.
              </h1>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                 Imprevistos acontecem, mas a recuperação deve ser planejada. Garanta que sua operação tenha fôlego para superar crises.
              </p>
              <Button 
                 size="lg" 
                 onClick={scrollToForm}
                 className="bg-white text-emerald-900 hover:bg-slate-100 rounded-full px-10 h-14 text-lg font-bold shadow-lg"
              >
                 Quero meu Raio‑X
              </Button>
           </div>
        </section>

        {/* O RISCO INVISÍVEL */}
        <section className="py-24 bg-slate-900 relative">
             <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16">
                   <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">O risco invisível</h2>
                   <p className="text-slate-400 text-lg">
                      Muitas empresas contratam seguros "de prateleira" que não cobrem o valor real de reposição ou ignoram os custos fixos durante uma parada.
                   </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                   {[
                      "Patrimônio subavaliado na apólice",
                      "Ausência de Lucros Cessantes",
                      "Exclusões contratuais desconhecidas",
                      "Franquias incompatíveis com o caixa"
                   ].map((item, i) => (
                      <div key={i} className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-start gap-4 hover:border-red-500/30 transition-colors">
                         <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
                         <p className="text-slate-300 font-medium">{item}</p>
                      </div>
                   ))}
                </div>
             </div>
        </section>

        {/* O QUE VOCÊ GANHA */}
        <section className="py-24 bg-slate-900">
           <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white text-center mb-16">O que você ganha com a Grafo</h2>
              <div className="grid md:grid-cols-4 gap-8">
                 {[
                   { title: "Continuidade", desc: "Fluxo de caixa garantido para honrar salários e fornecedores mesmo com portas fechadas." },
                   { title: "Reposição Real", desc: "Coberturas calculadas para repor equipamentos e estoque a valor de mercado atual." },
                   { title: "Prevenção", desc: "Orientações para mitigar riscos antes que virem sinistros." },
                   { title: "Defesa", desc: "Proteção contra processos de terceiros (clientes, vizinhos, fornecedores)." }
                 ].map((item, i) => (
                    <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-emerald-500/10 hover:bg-emerald-900/10 transition-colors">
                       <div className="w-12 h-12 bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4 border border-emerald-500/20">
                          <CheckCircle className="w-6 h-6 text-emerald-400" />
                       </div>
                       <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                       <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* MÉTODO GRAFO */}
        <ProcessSteps color="text-emerald-400" borderColor="border-emerald-500" steps={methodSteps} />

        {/* SOLUÇÕES TÍPICAS */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
             <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-3xl font-bold text-white text-center mb-12">Soluções Típicas por Setor</h2>
                <div className="grid md:grid-cols-3 gap-8">
                   <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
                      <Factory className="w-10 h-10 text-emerald-400 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Indústria</h3>
                      <p className="text-slate-400 text-sm">Foco em riscos operacionais, quebra de máquinas, estoque e responsabilidade civil de produtos.</p>
                   </div>
                   <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
                      <Store className="w-10 h-10 text-emerald-400 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Comércio</h3>
                      <p className="text-slate-400 text-sm">Proteção contra roubo, danos elétricos, vendaval e responsabilidade civil operações em loja.</p>
                   </div>
                   <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
                      <Building2 className="w-10 h-10 text-emerald-400 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Serviços</h3>
                      <p className="text-slate-400 text-sm">Ênfase em equipamentos eletrônicos, dados (Cyber) e responsabilidade civil profissional.</p>
                   </div>
                </div>
             </div>
        </section>

        {/* FORM SECTION */}
        <section id='conversion-form' className='py-24 relative overflow-hidden'>
          <div className='absolute inset-0 bg-emerald-900/5'></div>
          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-4xl mx-auto bg-slate-950 rounded-[2.5rem] border border-emerald-900/30 p-8 md:p-12 shadow-2xl'>
              <div className="grid md:grid-cols-5 gap-12">
                <div className="md:col-span-2 space-y-6">
                  <h2 className='text-3xl font-bold text-white'>Diagnóstico de Risco</h2>
                  <p className='text-slate-400'>Preencha para receber uma análise completa e personalizada da sua exposição empresarial.</p>
                  
                  <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/20 mt-8">
                      <p className="text-emerald-200 text-xs italic">"A análise detalhada da Grafo nos salvou de um prejuízo enorme quando tivemos um incidente elétrico."</p>
                      <p className="text-white font-bold text-xs mt-2">- Gestor de TI, São Paulo</p>
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
                      <p className="text-slate-300">Em breve um especialista entrará em contato.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className='space-y-5'>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor='nome' className='text-slate-300 ml-1'>Nome do Responsável</Label>
                          <Input
                            id='nome'
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                            onFocus={handleFormStart}
                            required
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-emerald-500 focus:border-emerald-500'
                            placeholder='Seu nome'
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor='empresa' className='text-slate-300 ml-1'>Empresa / CNPJ</Label>
                          <Input
                            id='empresa'
                            value={formData.empresa}
                            onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                            onFocus={handleFormStart}
                            required
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-emerald-500 focus:border-emerald-500'
                            placeholder='Nome ou CNPJ'
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
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-emerald-500 focus:border-emerald-500'
                            placeholder='(00) 00000-0000'
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
                            className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-emerald-500 focus:border-emerald-500'
                            placeholder='Ex: São Paulo - SP'
                          />
                        </div>
                      </div>

                      <div className="space-y-2 relative">
                        <Label htmlFor='segmento' className='text-slate-300 ml-1 mb-2 block'>Segmento</Label>
                        <div className="relative">
                          <select
                            id='segmento'
                            value={formData.segmento}
                            onChange={(e) => setFormData({...formData, segmento: e.target.value})}
                            onFocus={handleFormStart}
                            required
                            className='w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none transition-all hover:border-slate-600'
                          >
                            <option value="" disabled className='text-slate-500'>Selecione o segmento</option>
                            <option value="Comércio" className='text-slate-900 bg-white'>Comércio</option>
                            <option value="Serviços" className='text-slate-900 bg-white'>Serviços</option>
                            <option value="Indústria" className='text-slate-900 bg-white'>Indústria</option>
                            <option value="Outro" className='text-slate-900 bg-white'>Outro</option>
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
                          className='border-slate-600 data-[state=checked]:bg-emerald-600 mt-1'
                        />
                        <Label htmlFor='lgpd' className='text-xs text-slate-500 leading-relaxed cursor-pointer'>
                          Ao enviar, você autoriza contato da Grafo Capital para diagnóstico e orientação sobre seguro empresarial.
                        </Label>
                      </div>

                      <Button type='submit' size='lg' disabled={isLoading} className='w-full h-14 text-lg bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-900/20 disabled:opacity-70 disabled:cursor-not-allowed'>
                        {isLoading ? 'Enviando...' : 'Solicitar Diagnóstico'}
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
        <ChatWidget solution="Seguro Empresarial" />
      </div>
    </>
  );
}

export default SeguroEmpresarial;
