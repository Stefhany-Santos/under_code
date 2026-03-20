'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

export function Navbar({ cartCount, onCartClick, onSignInClick, onSignUpClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, userRole, logout } = useAuth();

  const navLinks = [
    { href: '#', label: 'Inicio' },
    { href: '#store', label: 'Loja' },
    { href: '#', label: 'Suporte' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight text-white">
            Under<span className="text-emerald-500">Code</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Cart */}
          <button
            onClick={onCartClick}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-medium text-white">
                {cartCount}
              </span>
            )}
          </button>

          {userRole === 'guest' ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSignInClick}
                className="h-9 border border-zinc-800 bg-transparent text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                onClick={onSignUpClick}
                className="h-9 bg-white text-black hover:bg-zinc-200"
              >
                Get Started
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-400">
                {user?.name}
              </span>
              {userRole === 'admin' && (
                <Badge className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  Admin
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="h-9 border border-zinc-800 bg-transparent text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
              >
                Sair
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 md:hidden"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-zinc-800 bg-black md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2">
                {userRole === 'guest' ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { onSignInClick(); setMobileMenuOpen(false); }}
                      className="flex-1 border border-zinc-800 bg-transparent text-zinc-300"
                    >
                      Sign In
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => { onSignUpClick(); setMobileMenuOpen(false); }}
                      className="flex-1 bg-white text-black"
                    >
                      Get Started
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="flex-1 border border-zinc-800 bg-transparent text-zinc-400"
                  >
                    Sair
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
