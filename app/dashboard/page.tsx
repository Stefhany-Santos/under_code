'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ClientDashboard } from '@/components/client/client-dashboard';
import { Toaster } from '@/components/ui/toaster';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const { userRole, isAuthenticated } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading while mounting
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  // After mounted, check auth and redirect if needed
  if (!isAuthenticated || userRole !== 'customer') {
    redirect('/');
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
