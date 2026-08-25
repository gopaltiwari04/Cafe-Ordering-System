import React from 'react';
import { AppContextProvider, useApp } from './context/AppContext';
import { DemoToolbar } from './components/common/DemoToolbar';
import { ToastContainer } from './components/common/ToastContainer';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './components/customer/LandingPage';
import { MenuSection } from './components/customer/MenuSection';
import { OffersPage } from './components/customer/OffersPage';
import { MyOrdersPage } from './components/customer/MyOrdersPage';
import { RewardsPage } from './components/customer/RewardsPage';
import { AboutPage } from './components/customer/AboutPage';
import { AccountPage } from './components/customer/AccountPage';
import { TableQRSimulator } from './components/customer/TableQRSimulator';
import { CartDrawer } from './components/customer/CartDrawer';
import { CheckoutModal } from './components/customer/CheckoutModal';
import { OrderConfirmationModal } from './components/customer/OrderConfirmationModal';
import { OrderTrackerModal } from './components/customer/OrderTrackerModal';
import { ReceiptModal } from './components/customer/ReceiptModal';
import { ProductCustomizationModal } from './components/customer/ProductCustomizationModal';
import { KitchenDisplaySystem } from './components/admin/KitchenDisplaySystem';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainAppContent: React.FC = () => {
  const { currentView, customerPage } = useApp();

  // Render Kitchen Display System
  if (currentView === 'kitchen') {
    return (
      <div className="min-h-screen bg-[#120B08]">
        <DemoToolbar />
        <KitchenDisplaySystem />
        <ToastContainer />
      </div>
    );
  }

  // Render Admin / Café Manager Dashboard
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-[#F4EFEA]">
        <DemoToolbar />
        <AdminDashboard />
        <ToastContainer />
        <ReceiptModal />
      </div>
    );
  }

  // Render Customer or Table QR Flow
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4] text-[#2C1810] font-sans selection:bg-[#E28743]/20 selection:text-[#2C1810]">
      {/* Floating Demo Mode Controller */}
      <DemoToolbar />

      {/* Global Notifications */}
      <ToastContainer />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentView === 'qr_table' ? (
          <TableQRSimulator />
        ) : (
          <>
            {customerPage === 'home' && <LandingPage />}
            {customerPage === 'menu' && <MenuSection />}
            {customerPage === 'offers' && <OffersPage />}
            {customerPage === 'orders' && <MyOrdersPage />}
            {customerPage === 'rewards' && <RewardsPage />}
            {customerPage === 'about' && <AboutPage />}
            {customerPage === 'account' && <AccountPage />}
          </>
        )}
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <OrderTrackerModal />
      <ReceiptModal />
      <ProductCustomizationModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppContextProvider>
      <MainAppContent />
    </AppContextProvider>
  );
}
