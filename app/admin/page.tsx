'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Toaster } from '@/components/ui/toaster';

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { userRole, isAuthenticated } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only redirect after component is mounted
    if (mounted && (!isAuthenticated || userRole !== 'admin')) {
      router.replace('/');
    }
  }, [mounted, userRole, isAuthenticated, router]);

  // Don't render anything while checking auth or if not admin
  if (!mounted || !isAuthenticated || userRole !== 'admin') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <AdminLayout />
      <Toaster />
    </>
  );
}
