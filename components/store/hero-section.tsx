'use client';

import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black pb-16 pt-32">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-zinc-400">Scripts premium para FiveM</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
            Eleve seu servidor ao
            <br />
            <span className="text-zinc-500">proximo nivel</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-12 max-w-lg text-base text-zinc-400 sm:text-lg">
            Scripts de alta qualidade para QBox e QBCore. 
            Codigo limpo, suporte dedicado e atualizacoes constantes.
          </p>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-12 text-center"
          >
            <div>
              <p className="text-2xl font-semibold text-zinc-50">2.300+</p>
              <p className="text-sm text-zinc-500">Clientes ativos</p>
            </div>
            <div className="hidden h-8 w-px bg-zinc-800 sm:block" />
            <div>
              <p className="text-2xl font-semibold text-zinc-50">15.000+</p>
              <p className="text-sm text-zinc-500">Downloads</p>
            </div>
            <div className="hidden h-8 w-px bg-zinc-800 sm:block" />
            <div>
              <p className="text-2xl font-semibold text-zinc-50">4.8/5</p>
              <p className="text-sm text-zinc-500">Avaliacao media</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
