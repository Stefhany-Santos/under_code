'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ClientDashboard } from '@/components/client/client-dashboard';
import { Toaster } from '@/components/ui/toaster';

export default function DashboardPage() {
  const router = useRouter();
  const { userRole, isAuthenticated } = useAuth();

  useEffect(() => {
    // Protect route: redirect non-customer users
    if (!isAuthenticated || userRole !== 'customer') {
      router.replace('/');
    }
  }, [userRole, isAuthenticated, router]);

  // Don't render anything while checking auth or if not customer
  if (!isAuthenticated || userRole !== 'customer') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-16">
        <ClientDashboard />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
