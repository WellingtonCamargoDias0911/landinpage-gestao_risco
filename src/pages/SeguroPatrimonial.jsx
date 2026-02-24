
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Building2, Flame, TrendingUp, ArrowRight, ShieldCheck, Factory, Store, Building, ChevronRight, Search, Sliders, PenTool, Rocket, AlertOctagon, CheckCircle } from 'lucide-react';
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

function SeguroPatrimonial() {
  const { toast } = useToast();
  useScrollTracking();
  const { handleFormSubmit, isLoading } = useFormSubmission();
  const formStartedRef = useRef(false);

  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    whatsapp: '',
    cidade: '',
    segmento: '',
    lgpdConsent: false
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      trackEvent('form_start', { type: 'Seguro Patrimonial' });
      formStartedRef.current = true;
    }
  };

  const scrollToForm = () => {
    document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' });
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
    
    await handleFormSubmit('Seguro Patrimonial', formData, () => {
      setIsSuccess(true);
      setFormData({ nome: '', empresa: '', whatsapp: '', cidade: '', segmento: '', lgpdConsent: false });
      formStartedRef.current = false;
    });
  };

  const faqData = [
    { question: 'O seguro cobre Lucros Cessantes?', answer: 'Sim. Esta é uma das coberturas mais críticas. Se um incêndio parar sua fábrica, o seguro paga não apenas a reconstrução do prédio, mas também o faturamento que você deixou de ter durante a obra, garantindo o pagamento de salários, fornecedores e seu próprio pró-labore.' },
    { question: 'Como é calculado o valor do risco?', answer: 'Realizamos uma Inspeção de Risco (presencial ou remota) para avaliar sistemas de proteção (hidrantes, sprinklers), tipo de construção e atividade. Quanto melhor sua prevenção, menor o custo do seguro.' },
    { question: 'Cobre equipamentos eletrônicos?', answer: 'Sim. Temos coberturas específicas para Danos Elétricos (curto-circuito), Roubo/Furto e Quebra de Máquinas. Ideal para servidores, maquinário industrial e equipamentos de alto valor.' },
    { question: 'Quanto tempo demora a indenização?', answer: 'Para sinistros de pequena monta (até R$ 50k), muitas seguradoras pagam em até 7 dias após o envio dos documentos. Para grandes riscos, o processo é mais complexo, mas nossa consultoria acompanha para agilizar a regulação.' },
  ];

  const methodSteps = [
    { icon: Search, title: 'Entender', description: 'Imersão na sua operation para mapear riscos físicos e financeiros.' },
    { icon: Sliders, title: 'Revisar', description: 'Auditoria dos sistemas de proteção atuais e apólices vigentes.' },
    { icon: PenTool, title: 'Desenhar', description: 'Modelagem de coberturas para garantir reposição integral e lucros cessantes.' },
    { icon: Rocket, title: 'Implementar', description: 'Gestão de risco ativa e suporte técnico em caso de sinistro.' }
  ];

  return (
    <>
      <Helmet>
        <title>Seguro Patrimonial e Riscos Corporativos | Grafo Capital</title>
        <meta name="description" content="Proteção completa para ativos empresariais, lucros cessantes e responsabilidade civil. Gestão de riscos para indústrias e comércios." />
      </Helmet>
      
      <div className='min-h-screen bg-slate-950 font-sans selection:bg-emerald-500/30 overflow-x-hidden'>
        <Header />
        <Toaster />
        
        {/* HERO SECTION */}
        <section className='relative min-h-[90vh] flex items-center justify-center pt-32 pb-20'>
          <GraphBackground color="#10b981" />
          <HexagonBackground color="text-emerald-500/10" className="opacity-50" />
          
          <div className='container mx-auto px-4 relative z-10'>
             <div className="flex items-center gap-2 text-xs text-slate-500 mb-8 uppercase tracking-widest">
                <span>Home</span> <ChevronRight className="w-3 h-3" /> <span className="text-emerald-400 font-bold">Seguro Patrimonial</span>
             </div>

            <div className='grid lg:grid-cols-2 gap-16 items-center'>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='text-left'
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-md">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                  <span className="text-emerald-300 text-sm font-medium tracking-wide uppercase">Gestão de Riscos Corporativos</span>
                </div>
                
                <h1 className='text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight'>
                  Garanta a continuidade da sua empresa, não importa <br />
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-white'>
                    o imprevisto.
                  </span>
                </h1>
                
                <p className='text-xl text-slate-400 max-w-xl mb-10 leading-relaxed'>
                  Proteção patrimonial robusta e gestão de riscos para que seu negócio nunca pare, mesmo diante do inesperado.
                </p>
                
                <div className='flex flex-wrap gap-4'>
                  <Button 
                    size='lg' 
                    className='h-14 px-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-lg shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] transition-all hover:scale-105'
                    onClick={scrollToForm}
                  >
                    Fazer Raio‑X do Patrimônio
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
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                        alt="Fachada de edifício corporativo moderno"
                        className="rounded-[2rem] shadow-2xl border border-slate-800 w-full object-cover h-[600px] grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    
                     <div className="absolute top-10 right-10 bg-emerald-950/90 p-4 rounded-xl border border-emerald-500/30 backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                            <span className="text-white font-bold text-sm">Continuidade Garantida</span>
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
            <h2 className="text-3xl font-bold text-white text-center mb-12">Proteção sob medida para:</h2>
            <div className="grid md:grid-cols-3 gap-6">
               {[
                 { title: "Indústrias", desc: "Fábricas com maquinário pesado, estoques inflamáveis e complexidade operacional.", icon: Factory },
                 { title: "Varejo e Comércio", desc: "Lojas, restaurantes e shoppings com alto fluxo de clientes e mercadorias.", icon: Store },
                 { title: "Escritórios Corporativos", desc: "Empresas de serviços com foco em proteção de equipamentos eletrônicos e dados.", icon: Building },
               ].map((item, i) => (
                  <div key={i} className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all">
                     <item.icon className="w-10 h-10 text-emerald-400 mb-4" />
                     <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                     <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
               ))}
            </div>
          </div>
        </section>

        {/* O RISCO INVISÍVEL */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
             <HexagonBackground color="text-red-500/10" className="opacity-20" />
             <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12">
                   <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">O risco invisível</h2>
                   <p className="text-slate-400 text-lg">
                      O maior perigo para uma empresa não é o incêndio em si, mas a incapacidade de honrar compromissos financeiros no dia seguinte.
                   </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto mt-12">
                   <div className="p-6 bg-red-950/20 border border-red-900/50 rounded-2xl">
                      <div className="flex items-start gap-4">
                         <Flame className="w-8 h-8 text-red-500 shrink-0 mt-1" />
                         <div>
                            <h4 className="text-white font-bold mb-2">Custos Fixos Ativos</h4>
                            <p className="text-slate-400 text-sm">Mesmo com a operação parada, salários e aluguel continuam vencendo. Sem caixa, a recuperação torna-se impossível.</p>
                         </div>
                      </div>
                   </div>
                   <div className="p-6 bg-red-950/20 border border-red-900/50 rounded-2xl">
                       <div className="flex items-start gap-4">
                         <AlertOctagon className="w-8 h-8 text-red-500 shrink-0 mt-1" />
                         <div>
                            <h4 className="text-white font-bold mb-2">Depreciação na Indenização</h4>
                            <p className="text-slate-400 text-sm">Apólices mal contratadas pagam o valor depreciado dos bens, inviabilizando a compra de máquinas novas.</p>
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
                   { title: "Continuidade de Negócios", desc: "Garantia de fluxo de caixa para manter a empresa viva durante a reconstrução." },
                   { title: "Lucros Cessantes", desc: "Cobertura do lucro líquido que deixou de ser realizado devido ao sinistro." },
                   { title: "Reposição a Novo", desc: "Indenização suficiente para comprar equipamentos novos, sem descontar o uso." },
                   { title: "Gerenciamento de Risco", desc: "Consultoria preventiva para identificar e mitigar vulnerabilidades." }
                 ].map((item, i) => (
                    <div key={i} className="text-center">
                       <div className="w-16 h-16 mx-auto bg-emerald-900/20 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20">
                          <ShieldCheck className="w-8 h-8 text-emerald-400" />
                       </div>
                       <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                       <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* MID-PAGE CTA */}
        <section className="py-16 bg-gradient-to-r from-emerald-950/40 to-slate-950 border-y border-emerald-900/20">
          <div className="container mx-auto px-4 text-center">
             <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Sua empresa está realmente segura?</h3>
                <p className="text-slate-400 mb-8 text-lg">Identifique vulnerabilidades antes que elas custem caro. Solicite um diagnóstico completo e gratuito.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button 
                      size="lg" 
                      onClick={scrollToForm}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-10 h-14 text-lg font-semibold shadow-[0_0_25px_-5px_rgba(16,185,129,0.4)] transition-transform hover:scale-105"
                   >
                      Quero meu Raio‑X
                   </Button>
                </div>
             </div>
          </div>
        </section>

        {/* MÉTODO GRAFO */}
        <ProcessSteps color="text-emerald-400" borderColor="border-emerald-500" steps={methodSteps} />

        {/* PREMIUM FORM */}
        <section id='formulario' className='py-24 relative overflow-hidden'>
          <div className='absolute inset-0 bg-emerald-900/5'></div>
          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-4xl mx-auto bg-slate-950 rounded-[2.5rem] border border-emerald-900/30 p-8 md:p-12 shadow-2xl relative overflow-hidden'>
              
              <div className="grid md:grid-cols-5 gap-12">
                <div className="md:col-span-2 space-y-6">
                  <h2 className='text-3xl font-bold text-white'>Análise de Risco Corporativo</h2>
                  <p className='text-slate-400'>Solicite um estudo detalhado para blindar o patrimônio da sua empresa.</p>
                  
                  <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/20 mt-8">
                      <p className="text-emerald-200 text-xs italic">"Recuperamos nossa fábrica em 45 dias graças à agilidade da Grafo no sinistro."</p>
                      <p className="text-white font-bold text-xs mt-2 mt-4">- Diretor Industrial, Setor Plástico</p>
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

                      <div className="space-y-2">
                        <Label htmlFor='segmento' className='text-slate-300 ml-1'>Segmento da Empresa</Label>
                        <Input
                          id='segmento'
                          value={formData.segmento}
                          onChange={(e) => setFormData({...formData, segmento: e.target.value})}
                          onFocus={handleFormStart}
                          required
                          className='bg-slate-900/50 border-slate-700 text-white h-12 rounded-xl focus:ring-emerald-500 focus:border-emerald-500'
                          placeholder='Ex: Indústria Têxtil, Restaurante'
                        />
                      </div>
                      
                      <div className="flex items-start space-x-3 pt-2">
                        <Checkbox
                          id='lgpd'
                          checked={formData.lgpdConsent}
                          onCheckedChange={(checked) => setFormData({...formData, lgpdConsent: checked})}
                          className='border-slate-600 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 mt-1'
                        />
                        <Label htmlFor='lgpd' className='text-xs text-slate-500 leading-relaxed cursor-pointer'>
                          Ao enviar, você autoriza contato da Grafo Capital para orientação e atendimento.
                        </Label>
                      </div>

                      <Button type='submit' size='lg' disabled={isLoading} className='w-full h-14 text-lg bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-900/20 disabled:opacity-70 disabled:cursor-not-allowed'>
                        {isLoading ? 'Enviando...' : 'Quero meu Raio‑X'}
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
        <ChatWidget solution="Seguro Patrimonial" />
      </div>
    </>
  );
}

export default SeguroPatrimonial;
