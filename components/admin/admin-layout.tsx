'use client';

import { useState } from 'react';
import { AdminHeader } from './admin-header';
import { AdminSidebar, AdminView } from './admin-sidebar';
import { AdminDashboardContent } from './admin-dashboard-content';
import { AdminCategories } from './admin-categories';
import { AdminProducts } from './admin-products';
import { AdminOrders } from './admin-orders';
import { AdminCustomers } from './admin-customers';
import { AdminSettings } from './admin-settings';

interface AdminLayoutProps {
  onExitAdmin: () => void;
}

export function AdminLayout({ onExitAdmin }: AdminLayoutProps) {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminDashboardContent />;
      case 'categories':
        return <AdminCategories />;
      case 'products':
        return <AdminProducts />;
      case 'orders':
        return <AdminOrders />;
      case 'customers':
        return <AdminCustomers />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <AdminHeader onViewStore={onExitAdmin} />
      <AdminSidebar currentView={currentView} onViewChange={setCurrentView} />
      
      {/* Main Content Area */}
      <main className="ml-64 pt-16">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
