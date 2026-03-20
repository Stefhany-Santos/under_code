'use client';

import { motion } from 'framer-motion';
import { Code2, Shield, Zap, Headphones, RefreshCw, Lock } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Codigo Limpo',
    description: 'Scripts bem documentados, seguindo as melhores praticas de desenvolvimento para FiveM.',
  },
  {
    icon: Shield,
    title: 'Anti-Leak',
    description: 'Protecao integrada contra vazamentos e uso nao autorizado dos scripts.',
  },
  {
    icon: Zap,
    title: 'Alta Performance',
    description: 'Otimizados para minimo impacto no servidor, sem causar lag ou travamentos.',
  },
  {
    icon: Headphones,
    title: 'Suporte Dedicado',
    description: 'Equipe pronta para ajudar via Discord com tempo de resposta rapido.',
  },
  {
    icon: RefreshCw,
    title: 'Atualizacoes Constantes',
    description: 'Melhorias frequentes e compatibilidade com as ultimas versoes do FiveM.',
  },
  {
    icon: Lock,
    title: 'Licenca Vitalicia',
    description: 'Compre uma vez, use para sempre. Sem taxas recorrentes ou assinaturas.',
  },
];

export function FeaturesSection() {
  return (
    <section className="relative bg-zinc-950 py-24">
      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-zinc-900" />
      
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-emerald-500">
            Por que nos escolher
          </span>
          <h2 className="mb-4 text-3xl font-medium tracking-tight text-white text-balance">
            Qualidade que faz a diferenca
          </h2>
          <p className="mx-auto max-w-lg text-zinc-400">
            Cada script e desenvolvido com atencao aos detalhes para garantir a melhor experiencia.
          </p>
        </motion.div>

        {/* Bento Grid with line separators */}
        <div className="grid grid-cols-1 divide-y divide-zinc-800 border-y border-zinc-800 md:grid-cols-3 md:divide-x md:divide-y-0">
          {features.slice(0, 3).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group p-8 transition-colors hover:bg-zinc-900/50"
            >
              <feature.icon className="mb-4 h-6 w-6 text-emerald-500" />
              <h3 className="mb-2 text-lg font-medium text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 divide-y divide-zinc-800 border-b border-zinc-800 md:grid-cols-3 md:divide-x md:divide-y-0">
          {features.slice(3, 6).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index + 3) * 0.1 }}
              className="group p-8 transition-colors hover:bg-zinc-900/50"
            >
              <feature.icon className="mb-4 h-6 w-6 text-emerald-500" />
              <h3 className="mb-2 text-lg font-medium text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
