'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Toaster } from '@/components/ui/toaster';

export default function AdminPage() {
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
  if (!isAuthenticated || userRole !== 'admin') {
    redirect('/');
  }

  return (
    <>
      <AdminLayout />
      <Toaster />
    </>
  );
}
