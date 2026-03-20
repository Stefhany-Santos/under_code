'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/store/hero-section';
import { FeaturesSection } from '@/components/store/features-section';
import { ProductGrid } from '@/components/store/product-grid';
import { ProductDetailModal } from '@/components/store/product-detail-modal';
import { CheckoutModal } from '@/components/store/checkout-modal';
import { AuthModals } from '@/components/auth/auth-modals';
import { ClientDashboard } from '@/components/client/client-dashboard';
import { AdminLayout } from '@/components/admin/admin-layout';
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
  const { userRole, setUserRole } = useAuth();

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

  // Handler for admin to exit and view store as guest
  const handleExitAdmin = () => {
    setUserRole('guest');
    setCurrentView('store');
  };

  // Show different content based on userRole and currentView
  const renderContent = () => {
    // Support view - accessible from any role
    if (currentView === 'support') {
      return <SupportView />;
    }
    
    // Dashboard view - for logged in users
    if (currentView === 'dashboard') {
      if (userRole === 'customer') {
        return <ClientDashboard />;
      }
    }
    
    // Store view - different content based on login status
    const isGuest = userRole === 'guest';
    
    return (
      <>
        {/* Marketing sections - only for guests */}
        {isGuest && (
          <>
            <HeroSection />
            <FeaturesSection />
          </>
        )}
        
        {/* Product catalog - always shown, with extra padding for logged users */}
        <div className={!isGuest ? 'pt-16' : ''}>
          <ProductGrid
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewDetails}
          />
        </div>
      </>
    );
  };

  // Render isolated Admin Layout when admin is in dashboard view
  if (userRole === 'admin' && currentView === 'dashboard') {
    return (
      <>
        <AdminLayout onExitAdmin={handleExitAdmin} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar
        cartCount={cart.length}
        onCartClick={() => setIsCheckoutOpen(true)}
        onSignInClick={() => setIsLoginOpen(true)}
        onSignUpClick={() => setIsRegisterOpen(true)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main className="pt-16">
        {renderContent()}
      </main>

      <Footer />

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
