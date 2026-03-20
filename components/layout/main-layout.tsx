'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Code2, 
  ShoppingCart,
  Menu,
  X,
  Github,
  MessageCircle,
  Search,
  User,
  LayoutDashboard,
  Package,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, UserRole } from '@/contexts/auth-context';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
  onCartClick: () => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export function MainLayout({ 
  children, 
  activeTab, 
  onTabChange, 
  cartCount,
  onCartClick,
  onLoginClick,
  onRegisterClick
}: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, userRole, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onTabChange('store');
  };

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Header */}
      <header className="glass-strong sticky top-0 z-50 border-b border-border/50">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          {/* Logo */}
          <motion.div 
            className="flex shrink-0 items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="glow-primary-sm flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Code2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">Under Code</span>
              <span className="ml-2 hidden rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-medium text-primary sm:inline">
                BETA
              </span>
            </div>
          </motion.div>

          {/* Search Bar - Desktop */}
          <div className="hidden max-w-md flex-1 md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar scripts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-border/30 bg-secondary/30 pl-10 focus:border-primary/50"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="icon" 
                className="relative border-border/50 hover:border-primary/50 hover:bg-primary/10"
                onClick={onCartClick}
              >
                <ShoppingCart className="h-5 w-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-xs text-primary-foreground glow-primary-sm">
                        {cartCount}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Auth Actions based on userRole */}
            {userRole === 'guest' ? (
              /* Guest - Show Login/Register buttons */
              <div className="hidden items-center gap-2 md:flex">
                <Button 
                  variant="outline" 
                  className="border-border/50 hover:border-primary/50 hover:bg-primary/10"
                  onClick={onLoginClick}
                >
                  Login
                </Button>
                <Button 
                  className="glow-primary-sm"
                  onClick={onRegisterClick}
                >
                  Criar Conta
                </Button>
              </div>
            ) : (
              /* Authenticated - Show Profile Dropdown */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="hidden gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/10 md:flex"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[100px] truncate">{user?.name.split(' ')[0]}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-strong w-56 border-border/50">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem 
                    className="cursor-pointer gap-2"
                    onClick={() => onTabChange('client')}
                  >
                    <Package className="h-4 w-4" />
                    Meu Dashboard
                  </DropdownMenuItem>
                  {userRole === 'admin' && (
                    <DropdownMenuItem 
                      className="cursor-pointer gap-2"
                      onClick={() => onTabChange('admin')}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Painel Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem 
                    className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* Mobile menu button */}
            <Button 
              variant="outline" 
              size="icon" 
              className="border-border/50 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="glass overflow-hidden border-t border-border/30 md:hidden"
            >
              <nav className="flex flex-col gap-2 p-4">
                {/* Mobile Search */}
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar scripts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-border/30 bg-secondary/30 pl-10"
                  />
                </div>

                {/* Guest: Login/Register */}
                {userRole === 'guest' && (
                  <>
                    <Button
                      variant="outline"
                      className="justify-start gap-2 border-border/50"
                      onClick={() => {
                        onLoginClick();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <User className="h-4 w-4" />
                      Login
                    </Button>
                    <Button
                      className="justify-start gap-2 glow-primary-sm"
                      onClick={() => {
                        onRegisterClick();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Criar Conta
                    </Button>
                  </>
                )}

                {/* Authenticated: Navigation options */}
                {userRole !== 'guest' && (
                  <>
                    <div className="mb-2 flex items-center gap-3 rounded-lg bg-secondary/30 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-bold text-primary">
                        {user?.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <Button
                      variant={activeTab === 'client' ? 'default' : 'ghost'}
                      className={`justify-start gap-2 ${activeTab === 'client' ? 'glow-primary-sm' : ''}`}
                      onClick={() => {
                        onTabChange('client');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Package className="h-4 w-4" />
                      Meu Dashboard
                    </Button>
                    {userRole === 'admin' && (
                      <Button
                        variant={activeTab === 'admin' ? 'default' : 'ghost'}
                        className={`justify-start gap-2 ${activeTab === 'admin' ? 'glow-primary-sm' : ''}`}
                        onClick={() => {
                          onTabChange('admin');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Painel Admin
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      className="justify-start gap-2 text-destructive hover:text-destructive"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Sair
                    </Button>
                  </>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>

      {/* Footer */}
      <footer className="glass-strong border-t border-border/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="glow-primary-sm flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <Code2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Under Code</span>
              </div>
              <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                A melhor loja de scripts premium para servidores de FiveM. 
                Qualidade, segurança e suporte dedicado para seu servidor de GTA RP.
              </p>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="border-border/50 hover:border-primary/50 hover:bg-primary/10">
                  <Github className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="border-border/50 hover:border-primary/50 hover:bg-primary/10">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Links</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="transition-colors hover:text-primary">Scripts QBox</a></li>
                <li><a href="#" className="transition-colors hover:text-primary">Scripts QBCore</a></li>
                <li><a href="#" className="transition-colors hover:text-primary">Documentação</a></li>
                <li><a href="#" className="transition-colors hover:text-primary">Discord</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="transition-colors hover:text-primary">Termos de Uso</a></li>
                <li><a href="#" className="transition-colors hover:text-primary">Privacidade</a></li>
                <li><a href="#" className="transition-colors hover:text-primary">Reembolso</a></li>
                <li><a href="#" className="transition-colors hover:text-primary">Licenciamento</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Under Code. Todos os direitos reservados.
            </p>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              Feito com <span className="text-primary">&#9829;</span> para a comunidade FiveM
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
