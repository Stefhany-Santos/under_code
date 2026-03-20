'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/store/hero-section';
import { FeaturesSection } from '@/components/store/features-section';
import { ProductGrid } from '@/components/store/product-grid';
import { WelcomeHeader } from '@/components/store/welcome-header';
import { ProductDetailModal } from '@/components/store/product-detail-modal';
import { CheckoutModal } from '@/components/store/checkout-modal';
import { AuthModals } from '@/components/auth/auth-modals';
import { ClientDashboard } from '@/components/client/client-dashboard';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { SupportView } from '@/components/support/support-view';
import { Script } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/contexts/auth-context';

export default function Home() {
  const [cart, setCart] = useState<Script[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Script | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'store' | 'support' | 'dashboard'>('store');
  const { toast } = useToast();
  const { userRole, user } = useAuth();

  const handleAddToCart = (script: Script) => {
    if (cart.find(s => s.id === script.id)) {
      toast({
        title: 'Script ja no carrinho',
        description: `"${script.name}" ja esta no seu carrinho.`,
        variant: 'destructive',
      });
      return;
    }
    setCart([...cart, script]);
    toast({
      title: 'Script adicionado',
      description: `"${script.name}" foi adicionado ao carrinho.`,
    });
  };

  const handleRemoveFromCart = (scriptId: string) => {
    setCart(cart.filter(s => s.id !== scriptId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleViewDetails = (script: Script) => {
    setSelectedProduct(script);
    setIsProductDetailOpen(true);
  };

  // Check if admin - renders isolated admin center
  const isAdmin = userRole === 'admin';

  // Show different content based on userRole and currentView
  const renderContent = () => {
    // Admin Center - completely isolated from storefront
    if (isAdmin) {
      return <AdminDashboard />;
    }
    
    // Support view - accessible from any role (except admin)
    if (currentView === 'support') {
      return <SupportView />;
    }
    
    // Dashboard view - for logged in customers
    if (currentView === 'dashboard') {
      if (userRole === 'customer') {
        return <ClientDashboard />;
      }
    }
    
    // Store view - different content based on login status
    const isGuest = userRole === 'guest';
    const isLoggedIn = !isGuest;
    
    return (
      <>
        {/* Marketing sections - only for guests */}
        {isGuest && (
          <>
            <HeroSection />
            <FeaturesSection />
          </>
        )}
        
        {/* Welcome Header - only for logged in users */}
        {isLoggedIn && user && (
          <WelcomeHeader
            userName={user.name.split(' ')[0]}
            onNavigateToDashboard={() => setCurrentView('dashboard')}
          />
        )}
        
        {/* Product catalog - always shown */}
        <ProductGrid
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
          isLoggedIn={isLoggedIn}
        />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar
        cartCount={cart.length}
        onCartClick={() => setIsCheckoutOpen(true)}
        onSignInClick={() => setIsLoginOpen(true)}
        onSignUpClick={() => setIsRegisterOpen(true)}
        currentView={currentView}
        onViewChange={setCurrentView}
        isAdmin={isAdmin}
      />

      <main className="pt-16">
        {renderContent()}
      </main>

      {!isAdmin && <Footer />}

      {/* Auth Modals */}
      <AuthModals
        loginOpen={isLoginOpen}
        registerOpen={isRegisterOpen}
        onLoginOpenChange={setIsLoginOpen}
        onRegisterOpenChange={setIsRegisterOpen}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        open={isProductDetailOpen}
        onOpenChange={setIsProductDetailOpen}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        open={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <Toaster />
    </div>
  );
}
