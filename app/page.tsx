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
  const { userRole } = useAuth();

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

  // Show different content based on userRole and currentView
  const renderContent = () => {
    // Support view - accessible from any role
    if (currentView === 'support') {
      return <SupportView />;
    }
    
    // Dashboard view - for logged in users
    if (currentView === 'dashboard') {
      if (userRole === 'admin') {
        return <AdminDashboard />;
      }
      if (userRole === 'customer') {
        return <ClientDashboard />;
      }
    }
    
    // Store view - show store for everyone (including logged in users)
    return (
      <>
        <HeroSection />
        <FeaturesSection />
        <ProductGrid
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
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
