'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Toaster } from '@/components/ui/toaster';

export default function AdminPage() {
  const router = useRouter();
  const { userRole, isAuthenticated } = useAuth();

  useEffect(() => {
    // Protect route: redirect non-admin users to home
    if (!isAuthenticated || userRole !== 'admin') {
      router.replace('/');
    }
  }, [userRole, isAuthenticated, router]);

  // Don't render anything while checking auth or if not admin
  if (!isAuthenticated || userRole !== 'admin') {
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
