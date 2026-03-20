'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} UnderCode. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link 
              href="#" 
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Termos de Servico
            </Link>
            <Link 
              href="#" 
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Privacidade
            </Link>
            <Link 
              href="#" 
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Discord
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
