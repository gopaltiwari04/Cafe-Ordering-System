import React from 'react';
import { motion } from 'motion/react';
import {
  Utensils,
  Bell,
  Droplets,
  Receipt,
  Sparkles,
  ArrowRight,
  Coffee,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MenuSection } from './MenuSection';

export const TableQRSimulator: React.FC = () => {
  const {
    tableDetails,
    setTableDetails,
    setOrderType,
    callStaff,
    orders,
    setTrackingOrderId,
    setReceiptOrderId,
    showToast,
  } = useApp();

  const currentTableNum = tableDetails.tableNumber || 12;

  // Active table order if any
  const activeTableOrder = orders.find(
    (o) =>
      o.orderType === 'dine_in' &&
      o.tableDetails?.tableNumber === currentTableNum &&
      (o.status === 'placed' || o.status === 'confirmed' || o.status === 'preparing' || o.status === 'ready')
  );

  const handleRequestWater = () => {
    callStaff(currentTableNum);
    showToast(`Water bottle request sent to floor captain for Table ${currentTableNum}`, 'info');
  };

  const handleRequestBill = () => {
    callStaff(currentTableNum);
    showToast(`Bill settlement request dispatched for Table ${currentTableNum}`, 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Table Welcome Banner */}
      <div className="bg-[#2C1810] text-[#FBF8F4] py-8 border-b border-[#3D2518]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#E28743] text-[#1E130D] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Dine-In QR Session
                </span>
                <span className="text-xs text-[#D4C3B3]">
                  Connected via Table Scanner
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Welcome to Table {currentTableNum}
              </h1>
              <p className="text-xs sm:text-sm text-[#D4C3B3] max-w-xl">
                Window Booth Section • Anything you order here is instantly sent to the kitchen and delivered directly to your seat.
              </p>
            </div>

            {/* Quick Service Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => callStaff(currentTableNum)}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Bell className="w-3.5 h-3.5 text-[#E28743]" />
                <span>Call Waiter</span>
              </button>

              <button
                onClick={handleRequestWater}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Droplets className="w-3.5 h-3.5 text-blue-400" />
                <span>Request Water</span>
              </button>

              <button
                onClick={handleRequestBill}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Receipt className="w-3.5 h-3.5 text-emerald-400" />
                <span>Request Bill</span>
              </button>
            </div>
          </div>

          {/* Active order banner on table if present */}
          {activeTableOrder && (
            <div className="mt-6 p-4 bg-[#FAF6F0] rounded-2xl text-[#2C1810] border border-[#E8DFD5] flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E28743] text-white flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm font-bold">
                    Active Ticket #{activeTableOrder.id} is {activeTableOrder.status.toUpperCase()}
                  </strong>
                  <span className="text-xs text-[#6F4E37]">
                    Est. Ready: {activeTableOrder.estimatedReadyTime} • Total: ₹{activeTableOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setTrackingOrderId(activeTableOrder.id)}
                className="px-4 py-2 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white text-xs font-bold transition-colors"
              >
                Track Live Status →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Embedded Menu */}
      <MenuSection />
    </div>
  );
};
