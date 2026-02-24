import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sliders, PenTool, Rocket } from 'lucide-react';

const ProcessSteps = ({ color = "text-blue-400", borderColor = "border-blue-500", steps }) => {
  const defaultSteps = [
    {
      icon: Search,
      title: 'Entender',
      description: 'Mapeamos profundamente seu cenário, riscos e objetivos.'
    },
    {
      icon: Sliders,
      title: 'Revisar',
      description: 'Analisamos lacunas atuais e oportunidades de proteção.'
    },
    {
      icon: PenTool,
      title: 'Desenhar',
      description: 'Criamos a arquitetura da solução ideal para sua necessidade.'
    },
    {
      icon: Rocket,
      title: 'Implementar',
      description: 'Execução técnica e acompanhamento vitalício.'
    }
  ];

  const activeSteps = steps || defaultSteps;

  return (
    <section className='py-24 px-4 relative overflow-hidden bg-slate-900/50'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
        >
            <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Método <span className={color}>Grafo</span>
            </h2>
            <p className='text-slate-400 text-lg max-w-2xl mx-auto'>
            Nossa metodologia proprietária de 4 etapas garante que sua proteção seja técnica, precisa e eficiente.
            </p>
        </motion.div>

        <div className='grid md:grid-cols-4 gap-8'>
          {activeSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className='relative group'
            >
              <div className='flex flex-col items-center text-center'>
                <div className={`relative z-10 w-20 h-20 rounded-2xl bg-slate-950 border ${borderColor} flex items-center justify-center mb-6 shadow-xl group-hover:-translate-y-2 transition-transform duration-300`}>
                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-white border border-slate-700">
                        {index + 1}
                    </span>
                  <step.icon className={`w-8 h-8 ${color}`} />
                </div>
                
                <h3 className='text-xl font-bold text-white mb-3'>{step.title}</h3>
                <p className='text-slate-400 text-sm leading-relaxed max-w-[200px]'>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;