import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Coffee,
  ShoppingBag,
  Gift,
  Tag,
  Clock,
  User,
  Menu as MenuIcon,
  X,
  Search,
  Heart,
  QrCode,
  Bell,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CustomerPage } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    customerPage,
    setCustomerPage,
    cart,
    setIsCartDrawerOpen,
    orders,
    loyaltyPoints,
    currentView,
    tables,
    callStaff,
    setTrackingOrderId,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const activeOrders = orders.filter(
    (o) => o.status === 'placed' || o.status === 'confirmed' || o.status === 'preparing' || o.status === 'ready'
  );

  const isDineInQR = currentView === 'qr_table';
  const table12 = tables.find((t) => t.id === 12);

  const navItems: { id: CustomerPage; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: <Coffee className="w-4 h-4" /> },
    { id: 'menu', label: 'Menu', icon: <Coffee className="w-4 h-4" /> },
    { id: 'offers', label: 'Offers', icon: <Tag className="w-4 h-4" /> },
    {
      id: 'orders',
      label: 'My Orders',
      icon: <Clock className="w-4 h-4" />,
      badge: activeOrders.length > 0 ? activeOrders.length : undefined,
    },
    { id: 'rewards', label: 'Rewards', icon: <Gift className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-10 sm:top-9 z-40 bg-[#FBF8F4]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-all">
      {/* Table 12 Dine-In Alert Ribbon if active */}
      {isDineInQR && (
        <div className="bg-[#40534C] text-[#FBF8F4] px-4 py-1.5 text-xs font-medium flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-[#D4A373] text-[#1E130D] px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">
                Dine-In Mode
              </span>
              <span>You are ordering from <strong>Table 12 (Window Section)</strong></span>
            </div>
            <button
              onClick={() => callStaff(12)}
              className="bg-[#E28743] hover:bg-[#c67434] text-white px-2.5 py-0.5 rounded text-xs font-semibold shadow-sm transition-colors flex items-center gap-1"
            >
              <Bell className="w-3 h-3" />
              <span>Call Staff</span>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div
            onClick={() => setCustomerPage('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#2C1810] to-[#1E130D] flex items-center justify-center text-[#E28743] shadow-md group-hover:scale-105 transition-transform border border-[#6F4E37]/30">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#2C1810] font-serif block leading-none">
                BREW &amp; BITE
              </span>
              <span className="text-[10px] sm:text-xs text-[#8B5A2B] tracking-wide font-medium">
                Artisanal Café &amp; Roastery
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = customerPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCustomerPage(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all relative flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#2C1810] text-[#FBF8F4] shadow-sm'
                      : 'text-[#5C4033] hover:text-[#2C1810] hover:bg-[#F2ECE4]'
                  }`}
                >
                  {item.label}
                  {item.badge !== undefined && (
                    <span className="bg-[#E28743] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Active Live Order Pill if exists */}
            {activeOrders.length > 0 && (
              <button
                onClick={() => setTrackingOrderId(activeOrders[0].id)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#40534C]/10 text-[#40534C] border border-[#40534C]/30 text-xs font-semibold hover:bg-[#40534C]/20 transition-colors animate-pulse"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Track #{activeOrders[0].id}</span>
              </button>
            )}

            {/* Loyalty Points Pill */}
            <button
              onClick={() => setCustomerPage('rewards')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F2ECE4] hover:bg-[#E8DFD5] text-[#2C1810] border border-[#D4C3B3]/40 text-xs font-semibold transition-colors"
            >
              <Gift className="w-3.5 h-3.5 text-[#E28743]" />
              <span>{loyaltyPoints} pts</span>
            </button>

            {/* Account Icon */}
            <button
              onClick={() => setCustomerPage('account')}
              className={`p-2 sm:p-2.5 rounded-xl transition-colors ${
                customerPage === 'account'
                  ? 'bg-[#2C1810] text-[#FBF8F4]'
                  : 'bg-[#F2ECE4] text-[#2C1810] hover:bg-[#E8DFD5]'
              }`}
              title="My Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#E28743] hover:bg-[#d47833] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Cart</span>
              {totalCartCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-white text-[#2C1810] text-xs font-bold shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-[#F2ECE4] text-[#2C1810] md:hidden hover:bg-[#E8DFD5] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#E8DFD5] bg-[#FBF8F4] px-4 py-4 space-y-1 shadow-lg"
          >
            {navItems.map((item) => {
              const isActive = customerPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCustomerPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#2C1810] text-[#FBF8F4]'
                      : 'text-[#5C4033] hover:bg-[#F2ECE4]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="bg-[#E28743] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-2 border-t border-[#E8DFD5] flex items-center justify-between text-xs px-3 py-2 text-[#8B5A2B]">
              <span>Brew Loyalty Points:</span>
              <strong className="text-[#2C1810] font-bold">{loyaltyPoints} pts</strong>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
