import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  Clock,
  ChefHat,
  Coffee,
  CheckCheck,
  Receipt,
  RotateCcw,
  Sparkles,
  Utensils,
  ArrowRight,
  PlayCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';

export const OrderTrackerModal: React.FC = () => {
  const {
    trackingOrderId,
    setTrackingOrderId,
    orders,
    simulateAutoAdvanceOrder,
    setReceiptOrderId,
    setCurrentView,
    callStaff,
  } = useApp();

  if (!trackingOrderId) return null;

  const order = orders.find((o) => o.id === trackingOrderId);
  if (!order) return null;

  const stages: {
    status: OrderStatus;
    title: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      status: 'placed',
      title: 'Order Placed',
      description: 'Received at café system',
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    {
      status: 'confirmed',
      title: 'Confirmed',
      description: 'Accepted by kitchen',
      icon: <CheckCheck className="w-4 h-4" />,
    },
    {
      status: 'preparing',
      title: 'Preparing',
      description: 'Baristas & chefs at work',
      icon: <ChefHat className="w-4 h-4" />,
    },
    {
      status: 'ready',
      title: order.orderType === 'delivery' ? 'Out for Delivery' : 'Ready for Pickup / Table',
      description: order.orderType === 'dine_in' ? 'Being served to your table' : 'Fresh & hot at the counter',
      icon: <Coffee className="w-4 h-4" />,
    },
    {
      status: 'completed',
      title: 'Completed',
      description: 'Enjoy your Brew & Bite!',
      icon: <Sparkles className="w-4 h-4" />,
    },
  ];

  const statusOrder: Record<OrderStatus, number> = {
    placed: 0,
    confirmed: 1,
    preparing: 2,
    ready: 3,
    completed: 4,
    cancelled: -1,
  };

  const currentStageIndex = statusOrder[order.status];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD5] flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#2C1810] text-[#FBF8F4] shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E28743] text-[#1E130D] flex items-center justify-center font-bold">
                <ChefHat className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-lg text-white">
                    Live Order Tracker
                  </h3>
                  <span className="font-mono text-xs bg-white/20 px-2 py-0.5 rounded-full text-[#D4A373]">
                    #{order.id}
                  </span>
                </div>
                <span className="text-xs text-[#D4C3B3]">
                  {order.orderType === 'dine_in'
                    ? `Dine-In • Table ${order.tableDetails?.tableNumber || 12}`
                    : order.orderType === 'pickup'
                    ? 'Takeaway Pickup'
                    : 'Doorstep Delivery'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setTrackingOrderId(null)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Dynamic Status Alert Banner */}
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                order.status === 'ready'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : order.status === 'preparing'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : order.status === 'completed'
                  ? 'bg-stone-100 border-stone-300 text-stone-900'
                  : 'bg-[#FAF6F0] border-[#E8DFD5] text-[#2C1810]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full animate-ping ${
                    order.status === 'ready'
                      ? 'bg-emerald-500'
                      : order.status === 'preparing'
                      ? 'bg-amber-500'
                      : 'bg-[#E28743]'
                  }`}
                />
                <div>
                  <h4 className="font-bold text-sm">
                    {order.status === 'placed' && 'Order Received & Queued'}
                    {order.status === 'confirmed' && 'Kitchen has Confirmed Order'}
                    {order.status === 'preparing' && 'Handcrafting in Kitchen Now...'}
                    {order.status === 'ready' && '🎉 Order is Ready & Fresh!'}
                    {order.status === 'completed' && 'Order Completed • Bon Appétit!'}
                  </h4>
                  <p className="text-xs opacity-80">
                    {order.status === 'ready'
                      ? 'Please collect from counter or server is bringing to table.'
                      : `Estimated readiness: ${order.estimatedReadyTime}`}
                  </p>
                </div>
              </div>

              {order.status === 'preparing' && (
                <span className="font-mono text-xs font-bold px-2 py-1 bg-white rounded-lg border border-amber-200 shadow-xs shrink-0">
                  ~8 mins left
                </span>
              )}
            </div>

            {/* Vertical Stepper Timeline */}
            <div className="space-y-4 relative pl-2">
              {stages.map((stage, idx) => {
                const isPassed = currentStageIndex > idx;
                const isCurrent = currentStageIndex === idx;

                return (
                  <div key={stage.status} className="flex items-start gap-4 relative group">
                    {/* Connecting line */}
                    {idx < stages.length - 1 && (
                      <div
                        className={`absolute left-4 top-8 bottom-0 w-0.5 -ml-[1px] transition-colors duration-500 ${
                          currentStageIndex > idx ? 'bg-[#E28743]' : 'bg-[#E8DFD5]'
                        }`}
                        style={{ height: 'calc(100% + 4px)' }}
                      />
                    )}

                    {/* Step Icon circle */}
                    <div
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold transition-all shadow-xs ${
                        isCurrent
                          ? 'bg-[#E28743] text-white ring-4 ring-[#E28743]/20 scale-110'
                          : isPassed
                          ? 'bg-[#2C1810] text-[#FBF8F4]'
                          : 'bg-[#F2ECE4] text-stone-400 border border-[#E8DFD5]'
                      }`}
                    >
                      {stage.icon}
                    </div>

                    {/* Step Details */}
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <h5
                          className={`text-sm font-bold ${
                            isCurrent
                              ? 'text-[#E28743]'
                              : isPassed
                              ? 'text-[#2C1810]'
                              : 'text-stone-400'
                          }`}
                        >
                          {stage.title}
                        </h5>
                        {isCurrent && (
                          <span className="text-[10px] uppercase font-bold text-[#E28743] bg-[#FAF6F0] px-2 py-0.5 rounded-full border border-[#E8DFD5]">
                            Current Stage
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">{stage.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Items Recap */}
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E8DFD5] space-y-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-[#8B5A2B] text-[10px] block">
                Items in this Ticket
              </span>
              {order.items.map((it) => (
                <div key={it.cartItemId} className="flex justify-between items-start text-[#2C1810]">
                  <div>
                    <span className="font-semibold">
                      {it.quantity}x {it.menuItem.name}
                    </span>
                    {it.selectedCustomizations.length > 0 && (
                      <span className="text-[11px] text-[#8B5A2B] block">
                        {it.selectedCustomizations.flatMap((c) => c.selectedOptionNames).join(', ')}
                      </span>
                    )}
                  </div>
                  <span className="font-mono font-bold">₹{it.totalPrice}</span>
                </div>
              ))}
            </div>

            {/* Interactive Demo Simulation Controls */}
            <div className="p-3 bg-[#1E130D] text-[#FBF8F4] rounded-2xl border border-[#6F4E37]/40 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#D4A373] font-bold flex items-center gap-1.5">
                  <PlayCircle className="w-4 h-4 text-[#E28743]" /> Demo Simulation Stepper
                </span>
                <span className="text-[10px] text-stone-400">Owner Demo Helper</span>
              </div>
              <p className="text-[11px] text-stone-300">
                Want to test how status updates look in real-time? Click below to advance the stage:
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => simulateAutoAdvanceOrder(order.id)}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-[#E28743] hover:bg-[#c67434] text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Advance Status (Next Step)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setTrackingOrderId(null);
                    setCurrentView('kitchen');
                  }}
                  className="py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>View in KDS</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-[#FBF8F4] border-t border-[#E8DFD5] flex items-center justify-between gap-3 shrink-0">
            <button
              onClick={() => {
                setReceiptOrderId(order.id);
                setTrackingOrderId(null);
              }}
              className="flex-1 py-2.5 px-4 rounded-xl border border-[#E8DFD5] hover:bg-white text-[#2C1810] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Receipt className="w-4 h-4 text-[#8B5A2B]" />
              <span>Digital Receipt</span>
            </button>

            {order.orderType === 'dine_in' && order.tableDetails && (
              <button
                onClick={() => callStaff(order.tableDetails!.tableNumber)}
                className="py-2.5 px-4 rounded-xl bg-[#2C1810] hover:bg-[#40534C] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Utensils className="w-4 h-4 text-[#E28743]" />
                <span>Call Staff</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
