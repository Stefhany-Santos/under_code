'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowRight,
  Check,
} from 'lucide-react';

interface AuthModalsProps {
  loginOpen: boolean;
  registerOpen: boolean;
  onLoginOpenChange: (open: boolean) => void;
  onRegisterOpenChange: (open: boolean) => void;
}

// Cloudflare Turnstile Mock Widget
function TurnstileWidget() {
  return (
    <div className="mx-auto flex h-[65px] w-full max-w-[300px] items-center gap-3 rounded-md border border-zinc-700 bg-[#222222] px-3">
      <div className="flex h-6 w-6 items-center justify-center rounded border border-zinc-600 bg-zinc-800">
        <Check className="h-4 w-4 text-emerald-500" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-zinc-400">Verifying you are human.</p>
        <p className="text-[10px] text-zinc-600">This may take a few seconds.</p>
      </div>
      <div className="flex flex-col items-end">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#F6821F"/>
          <path d="M2 17L12 22L22 17" stroke="#F6821F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#F6821F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[8px] text-zinc-600">Cloudflare</span>
      </div>
    </div>
  );
}

export function AuthModals({ 
  loginOpen, 
  registerOpen, 
  onLoginOpenChange, 
  onRegisterOpenChange 
}: AuthModalsProps) {
  const { login } = useAuth();
  const { toast } = useToast();
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState('');

  // Register state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const resetLoginForm = () => {
    setLoginEmail('');
    setLoginPassword('');
    setShowLoginPassword(false);
    setAuthError('');
  };

  const resetRegisterForm = () => {
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
    setShowRegisterPassword(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: 'Campos obrigatorios',
        description: 'Preencha email e senha.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoggingIn(true);
    
    setTimeout(() => {
      // Validate credentials
      if (loginEmail === 'admin@admin.com' && loginPassword === 'admin') {
        login('admin');
        setIsLoggingIn(false);
        onLoginOpenChange(false);
        resetLoginForm();
        toast({
          title: 'Login realizado com sucesso!',
          description: 'Bem-vindo ao painel administrativo.',
        });
        window.location.href = '/admin';
      } else if (loginEmail === 'usuario@usuario.com' && loginPassword === 'usuario') {
        login('customer');
        setIsLoggingIn(false);
        onLoginOpenChange(false);
        resetLoginForm();
        toast({
          title: 'Login realizado com sucesso!',
          description: 'Bem-vindo de volta!',
        });
        window.location.href = '/dashboard';
      } else {
        setIsLoggingIn(false);
        setAuthError('Credenciais invalidas. Use admin@admin.com ou usuario@usuario.com para testar.');
      }
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      toast({
        title: 'Campos obrigatorios',
        description: 'Preencha todos os campos.',
        variant: 'destructive',
      });
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: 'Senhas nao conferem',
        description: 'A senha e a confirmacao devem ser iguais.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      onRegisterOpenChange(false);
      resetRegisterForm();
      toast({
        title: 'Cadastro pendente',
        description: 'Integracao com back-end em desenvolvimento.',
      });
    }, 1000);
  };

  const switchToRegister = () => {
    onLoginOpenChange(false);
    resetLoginForm();
    setTimeout(() => onRegisterOpenChange(true), 150);
  };

  const switchToLogin = () => {
    onRegisterOpenChange(false);
    setTimeout(() => onLoginOpenChange(true), 150);
  };

  return (
    <>
      {/* Login Modal */}
      <Dialog open={loginOpen} onOpenChange={(open) => {
        if (!open) resetLoginForm();
        onLoginOpenChange(open);
      }}>
        <DialogContent className="border-zinc-800 bg-zinc-950 sm:max-w-md">
          <div className="absolute inset-0 -z-10 bg-black/90" />
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-zinc-50">Entrar</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Acesse sua conta para gerenciar seus scripts
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-zinc-300">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    setAuthError('');
                  }}
                  autoComplete="email"
                  className="border-zinc-800 bg-zinc-900 pl-10 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password" className="text-zinc-300">Senha</Label>
                <button
                  type="button"
                  className="text-xs text-zinc-500 hover:text-zinc-400"
                >
                  Esqueci a senha
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  id="login-password"
                  type={showLoginPassword ? 'text' : 'password'}
                  placeholder="********"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setAuthError('');
                  }}
                  autoComplete="current-password"
                  className="border-zinc-800 bg-zinc-900 pl-10 pr-10 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-700"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-400"
                >
                  {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {authError && (
              <p className="text-sm text-red-400/80">{authError}</p>
            )}

            {/* Cloudflare Turnstile Widget */}
            <TurnstileWidget />

            <Button 
              type="submit" 
              className="w-full bg-white font-medium text-black hover:bg-zinc-200"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Autenticando...
                </>
              ) : (
                <>
                  Entrar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="space-y-2 pt-4 text-center">
            <p className="text-sm text-zinc-500">
              Nao tem uma conta?{' '}
              <button
                type="button"
                onClick={switchToRegister}
                className="text-zinc-300 hover:text-white"
              >
                Criar conta
              </button>
            </p>
            {/* Dev hint */}
            <p className="text-xs text-zinc-600">
              Dev: use admin@admin.com ou usuario@usuario.com (senha igual ao email)
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Register Modal */}
      <Dialog open={registerOpen} onOpenChange={onRegisterOpenChange}>
        <DialogContent className="border-zinc-800 bg-zinc-950 sm:max-w-md">
          <div className="absolute inset-0 -z-10 bg-black/90" />
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-zinc-50">Criar conta</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Junte-se a comunidade Under Code
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRegister} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="register-name" className="text-zinc-300">Nome</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Seu nome"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  autoComplete="name"
                  className="border-zinc-800 bg-zinc-900 pl-10 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-email" className="text-zinc-300">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  id="register-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  autoComplete="email"
                  className="border-zinc-800 bg-zinc-900 pl-10 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-zinc-300">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    id="register-password"
                    type={showRegisterPassword ? 'text' : 'password'}
                    placeholder="******"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    autoComplete="new-password"
                    className="border-zinc-800 bg-zinc-900 pl-10 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-700"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm" className="text-zinc-300">Confirmar</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    id="register-confirm"
                    type={showRegisterPassword ? 'text' : 'password'}
                    placeholder="******"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    className="border-zinc-800 bg-zinc-900 pl-10 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-700"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowRegisterPassword(!showRegisterPassword)}
              className="text-xs text-zinc-500 hover:text-zinc-400"
            >
              {showRegisterPassword ? 'Ocultar senhas' : 'Mostrar senhas'}
            </button>

            {/* Cloudflare Turnstile Widget */}
            <TurnstileWidget />

            <Button 
              type="submit" 
              className="w-full bg-white font-medium text-black hover:bg-zinc-200"
              disabled={isRegistering}
            >
              {isRegistering ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                <>
                  Criar conta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="pt-4 text-center">
            <p className="text-sm text-zinc-500">
              Ja tem uma conta?{' '}
              <button
                type="button"
                onClick={switchToLogin}
                className="text-zinc-300 hover:text-white"
              >
                Fazer login
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
