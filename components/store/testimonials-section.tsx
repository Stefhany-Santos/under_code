'use client';

import { motion } from 'framer-motion';
import { Star, Quote, MessageSquare } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Carlos "ThunderRP"',
    role: 'Dono do ThunderCity RP',
    avatar: 'TC',
    rating: 5,
    text: 'Os scripts da Under Code transformaram completamente meu servidor. A qualidade do código é impecável e o suporte no Discord é extremamente rápido. Recomendo demais!',
    server: '250+ jogadores diários',
  },
  {
    id: 2,
    name: 'Ana Beatriz',
    role: 'Administradora do Brasil RP',
    avatar: 'AB',
    rating: 5,
    text: 'Já testei várias lojas de scripts e a Under Code é disparada a melhor. Os scripts são otimizados, não dão lag e a documentação é muito completa. Vale cada centavo!',
    server: '180+ jogadores diários',
  },
  {
    id: 3,
    name: 'Pedro "Syntax"',
    role: 'Dev do Cidade Alta RP',
    avatar: 'SX',
    rating: 5,
    text: 'Como desenvolvedor, fico impressionado com a qualidade do código. Sem memory leaks, bem estruturado e fácil de customizar. A Under Code levou meu servidor a outro nível.',
    server: '400+ jogadores diários',
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
            <MessageSquare className="h-4 w-4" />
            Social Proof
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            O que nossos <span className="gradient-text">clientes</span> dizem
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Mais de 1.200 donos de servidores confiam nos scripts da Under Code para suas comunidades.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card group relative rounded-2xl p-8 transition-all hover:border-primary/30 hover:glow-primary-sm"
            >
              {/* Quote icon */}
              <div className="absolute right-6 top-6 text-primary/10 transition-colors group-hover:text-primary/20">
                <Quote className="h-12 w-12" />
              </div>

              {/* Rating */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-lg font-bold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  <p className="mt-0.5 text-xs text-primary">{testimonial.server}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          {[
            { value: '1.200+', label: 'Clientes Satisfeitos' },
            { value: '4.9/5', label: 'Avaliação Média' },
            { value: '50+', label: 'Scripts Disponíveis' },
            { value: '24h', label: 'Tempo de Resposta' },
          ].map((stat) => (
            <div key={stat.label} className="min-w-[120px]">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
