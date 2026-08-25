import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Utensils,
  Receipt,
  Navigation,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OrderConfirmationModal: React.FC = () => {
  const {
    confirmedOrderId,
    setConfirmedOrderId,
    orders,
    setTrackingOrderId,
    setReceiptOrderId,
    setCustomerPage,
  } = useApp();

  if (!confirmedOrderId) return null;

  const order = orders.find((o) => o.id === confirmedOrderId);
  if (!order) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD5] text-center p-6 sm:p-8 space-y-6"
        >
          {/* Top celebration icon */}
          <div className="relative mx-auto w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center border-2 border-emerald-200 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E28743] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#E28743] text-[9px] text-white font-bold items-center justify-center">
                ★
              </span>
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#E28743] font-bold">
              Brew &amp; Bite Kitchen
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C1810]">
              Order Confirmed! 🎉
            </h2>
            <p className="text-xs sm:text-sm text-[#6F4E37] max-w-sm mx-auto">
              Your order has been received and our kitchen team has begun handcrafting your meal.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E8DFD5] text-left space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD5]">
              <div>
                <span className="text-[11px] text-[#8B5A2B] block uppercase tracking-wider font-semibold">
                  Order Number
                </span>
                <span className="text-lg font-bold font-mono text-[#2C1810]">
                  #{order.id}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#8B5A2B] block uppercase tracking-wider font-semibold">
                  Estimated Ready Time
                </span>
                <span className="text-sm font-bold text-emerald-700 flex items-center gap-1 justify-end">
                  <Clock className="w-3.5 h-3.5" />
                  {order.estimatedReadyTime}
                </span>
              </div>
            </div>

            {/* Quick Item list */}
            <div className="space-y-1.5 text-xs text-[#5C4033]">
              {order.items.map((it) => (
                <div key={it.cartItemId} className="flex justify-between">
                  <span>
                    {it.quantity}x {it.menuItem.name}
                  </span>
                  <span className="font-mono text-[#2C1810]">₹{it.totalPrice}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E8DFD5] flex items-center justify-between text-xs font-bold text-[#2C1810]">
              <span>Total Paid ({order.paymentMethod.toUpperCase()})</span>
              <span className="font-mono text-sm">₹{order.total.toFixed(2)}</span>
            </div>

            {order.orderType === 'dine_in' && order.tableDetails && (
              <div className="bg-white p-2 rounded-xl border border-[#E8DFD5] text-xs text-[#6F4E37] flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#E28743] shrink-0" />
                <span>
                  Preparing for <strong>Table {order.tableDetails.tableNumber}</strong>. Server will bring it directly to your table.
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                setTrackingOrderId(order.id);
                setConfirmedOrderId(null);
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Track Live Order Status</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setReceiptOrderId(order.id);
                  setConfirmedOrderId(null);
                }}
                className="py-2.5 px-3 rounded-xl border border-[#E8DFD5] hover:bg-[#F2ECE4] text-[#2C1810] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Receipt className="w-3.5 h-3.5 text-[#8B5A2B]" />
                <span>View Receipt</span>
              </button>

              <button
                onClick={() => {
                  setConfirmedOrderId(null);
                  setCustomerPage('menu');
                }}
                className="py-2.5 px-3 rounded-xl border border-[#E8DFD5] hover:bg-[#F2ECE4] text-[#2C1810] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#8B5A2B]" />
                <span>Continue Menu</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
