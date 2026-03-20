'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  LogOut, 
  ChevronDown, 
  ExternalLink,
  Store
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { motion, AnimatePresence } from 'framer-motion';

export function AdminHeader() {
  const [mounted, setMounted] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && pendingRoute) {
      router.push(pendingRoute);
      setPendingRoute(null);
    }
  }, [mounted, pendingRoute, router]);

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
    setPendingRoute('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-6">
        {/* Logo */}
        <Link href="/admin" className="flex items-center gap-3">
          <span className="text-xl font-semibold tracking-tight text-white">
            Under<span className="text-emerald-500">Code</span>
          </span>
          <Badge className="border border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-400">
            Admin
          </Badge>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* View Store Button */}
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 gap-2 border border-zinc-800 bg-transparent text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
            >
              <Store className="h-4 w-4" />
              Ver Loja
              <ExternalLink className="h-3 w-3" />
            </Button>
          </Link>

          {/* Avatar Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <User className="h-4 w-4" />
              </div>
              <span className="text-sm text-zinc-300">{user?.name}</span>
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
        </div>
      </div>
    </header>
  );
}
