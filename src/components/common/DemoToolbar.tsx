import React from 'react';
import { motion } from 'motion/react';
import {
  Smartphone,
  QrCode,
  ChefHat,
  LayoutDashboard,
  RotateCcw,
  Sparkles,
  PlayCircle,
  Bell,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DemoView } from '../../types';

export const DemoToolbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    orders,
    tables,
    simulateAutoAdvanceOrder,
    resetToDefaultData,
    showToast,
    notifications,
    setCustomerPage,
  } = useApp();

  const activeOrdersCount = orders.filter(
    (o) => o.status === 'placed' || o.status === 'confirmed' || o.status === 'preparing' || o.status === 'ready'
  ).length;

  const staffCallCount = tables.filter((t) => t.hasStaffCall).length;
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const handleSimulateLatest = () => {
    const activeOrder = orders.find(
      (o) => o.status === 'placed' || o.status === 'confirmed' || o.status === 'preparing' || o.status === 'ready'
    ) || orders[0];

    if (activeOrder) {
      simulateAutoAdvanceOrder(activeOrder.id);
    } else {
      showToast('No active orders to advance. Place an order first!', 'info');
    }
  };

  const handleSwitchToQR = () => {
    setCurrentView('qr_table');
    setCustomerPage('menu');
    showToast('Switched to Table 12 Dine-In QR Mode', 'info');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#1E130D] text-[#FBF8F4] border-b border-[#6F4E37]/40 px-3 sm:px-6 py-2 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
        {/* Brand Demo Tag */}
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E28743] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E28743]"></span>
          </span>
          <span className="font-semibold tracking-wider text-[#D4A373] uppercase text-[11px] sm:text-xs">
            Demo Mode Switcher
          </span>
        </div>

        {/* View Switcher Buttons */}
        <div className="flex items-center bg-[#2C1810] p-0.5 rounded-lg border border-[#6F4E37]/30">
          <button
            onClick={() => {
              setCurrentView('customer');
              showToast('Switched to Customer Ordering View', 'info');
            }}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md transition-all font-medium ${
              currentView === 'customer'
                ? 'bg-[#E28743] text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Customer View</span>
          </button>

          <button
            onClick={handleSwitchToQR}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md transition-all font-medium relative ${
              currentView === 'qr_table'
                ? 'bg-[#E28743] text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Table 12 (QR)</span>
            {staffCallCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            )}
          </button>

          <button
            onClick={() => {
              setCurrentView('kitchen');
              showToast('Switched to Kitchen Display System (KDS)', 'info');
            }}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md transition-all font-medium relative ${
              currentView === 'kitchen'
                ? 'bg-[#E28743] text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Kitchen (KDS)</span>
            <span className="xs:hidden">KDS</span>
            {activeOrdersCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#D4A373] text-[#1E130D] text-[10px] font-bold">
                {activeOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setCurrentView('admin');
              showToast('Switched to Admin Café Dashboard', 'info');
            }}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md transition-all font-medium relative ${
              currentView === 'admin'
                ? 'bg-[#E28743] text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Admin POS</span>
            {unreadNotifs > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            )}
          </button>
        </div>

        {/* Quick Demo Helper Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateLatest}
            title="Advance the status of the latest active order (Placed -> Confirmed -> Preparing -> Ready -> Completed)"
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#6F4E37]/60 hover:bg-[#6F4E37] text-stone-200 hover:text-white border border-[#8B5A2B]/40 transition-colors text-xs font-medium"
          >
            <PlayCircle className="w-3.5 h-3.5 text-[#E28743]" />
            <span className="hidden sm:inline">Simulate Order Progress</span>
            <span className="sm:hidden">Next Step</span>
          </button>

          <button
            onClick={resetToDefaultData}
            title="Reset demo data back to clean initial state"
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition-colors text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
