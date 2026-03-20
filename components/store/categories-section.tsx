'use client';

import { motion } from 'framer-motion';
import { Car, Wallet, Monitor, ShieldCheck, Wrench, Users, MapPin, Radio } from 'lucide-react';

const categories = [
  {
    id: 'vehicles',
    name: 'Veículos',
    description: 'Sistemas de veículos, garagens e concessionárias',
    icon: Car,
    count: 12,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    id: 'economy',
    name: 'Economia',
    description: 'Bancos, empregos e sistemas financeiros',
    icon: Wallet,
    count: 8,
    gradient: 'from-emerald-500/20 to-green-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'ui',
    name: 'Interface',
    description: 'HUDs, menus e elementos visuais',
    icon: Monitor,
    count: 15,
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
  {
    id: 'police',
    name: 'Policial',
    description: 'MDT, prisões e sistemas policiais',
    icon: ShieldCheck,
    count: 6,
    gradient: 'from-red-500/20 to-orange-500/20',
    iconColor: 'text-red-400',
  },
  {
    id: 'misc',
    name: 'Utilitários',
    description: 'Ferramentas e scripts diversos',
    icon: Wrench,
    count: 10,
    gradient: 'from-amber-500/20 to-yellow-500/20',
    iconColor: 'text-amber-400',
  },
  {
    id: 'social',
    name: 'Social',
    description: 'Interações, emotes e comunicação',
    icon: Users,
    count: 7,
    gradient: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-400',
  },
  {
    id: 'housing',
    name: 'Imóveis',
    description: 'Casas, apartamentos e propriedades',
    icon: MapPin,
    count: 5,
    gradient: 'from-teal-500/20 to-cyan-500/20',
    iconColor: 'text-teal-400',
  },
  {
    id: 'communication',
    name: 'Comunicação',
    description: 'Rádios, telefones e sistemas de voz',
    icon: Radio,
    count: 4,
    gradient: 'from-indigo-500/20 to-blue-500/20',
    iconColor: 'text-indigo-400',
  },
];

export function CategoriesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Categorias em <span className="gradient-text">Destaque</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore nossa coleção organizada por categoria. Encontre o script perfeito para seu servidor.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card group relative overflow-hidden rounded-2xl p-6 text-left transition-all hover:border-primary/30 hover:glow-primary-sm"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 transition-opacity group-hover:opacity-100`} />
              
              {/* Content */}
              <div className="relative">
                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/50 transition-all group-hover:bg-primary/20`}>
                  <category.icon className={`h-7 w-7 ${category.iconColor} transition-colors group-hover:text-primary`} />
                </div>
                
                <h3 className="mb-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {category.name}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
                
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {category.count} scripts
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
