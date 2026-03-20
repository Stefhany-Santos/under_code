'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  cartCount?: number;
  onCartClick?: () => void;
  onSignInClick?: () => void;
  onSignUpClick?: () => void;
}

export function Navbar({ cartCount = 0, onCartClick, onSignInClick, onSignUpClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { user, userRole, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAvatarDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setAvatarDropdownOpen(false);
    router.push('/');
  };

  const handleDashboardClick = () => {
    setAvatarDropdownOpen(false);
    if (userRole === 'admin') {
      router.push('/admin');
    } else if (userRole === 'customer') {
      router.push('/dashboard');
    }
  };

  const isHomePage = pathname === '/';
  const isSupportPage = pathname === '/support';

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
          <Link
            href="/"
            className={`text-sm transition-colors ${
              isHomePage && !isSupportPage ? 'text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/#store"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Loja
          </Link>
          <Link
            href="/support"
            className={`text-sm transition-colors ${
              isSupportPage ? 'text-emerald-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Suporte
          </Link>
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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm text-zinc-300">{user?.name}</span>
                {userRole === 'admin' && (
                  <Badge className="border border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-400">
                    Admin
                  </Badge>
                )}
                <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${avatarDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {avatarDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-xl"
                  >
                    <div className="border-b border-zinc-800 px-4 py-3">
                      <p className="text-sm font-medium text-white">{user?.name}</p>
                      <p className="text-xs text-zinc-500">{user?.email}</p>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={handleDashboardClick}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        {userRole === 'admin' ? 'Dashboard Admin' : 'Meu Painel'}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                      >
                        <LogOut className="h-4 w-4" />
                        Sair
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left text-sm transition-colors ${
                  isHomePage ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Inicio
              </Link>
              <Link
                href="/#store"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                Loja
              </Link>
              <Link
                href="/support"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left text-sm transition-colors ${
                  isSupportPage ? 'text-emerald-400' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Suporte
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                {userRole === 'guest' ? (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { onSignInClick?.(); setMobileMenuOpen(false); }}
                      className="flex-1 border border-zinc-800 bg-transparent text-zinc-300"
                    >
                      Sign In
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => { onSignUpClick?.(); setMobileMenuOpen(false); }}
                      className="flex-1 bg-white text-black"
                    >
                      Get Started
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 border-t border-zinc-800 pt-4">
                    <div className="flex items-center gap-3 pb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{user?.name}</p>
                        <p className="text-xs text-zinc-500">{user?.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { handleDashboardClick(); setMobileMenuOpen(false); }}
                      className="justify-start border border-zinc-800 bg-transparent text-zinc-300"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      {userRole === 'admin' ? 'Dashboard Admin' : 'Meu Painel'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                      className="justify-start border border-zinc-800 bg-transparent text-zinc-400"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
