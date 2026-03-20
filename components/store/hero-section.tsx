'use client';

import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black pb-24 pt-32">
      {/* Subtle grid pattern background */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-zinc-400">Scripts premium para FiveM</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-zinc-50 text-balance sm:text-5xl md:text-6xl">
            Eleve seu servidor ao
            <br />
            <span className="text-zinc-500">proximo nivel</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-12 max-w-lg text-base leading-relaxed text-zinc-400 text-pretty sm:text-lg">
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
