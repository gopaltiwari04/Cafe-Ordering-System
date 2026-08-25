import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChefHat,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  CheckCheck,
  Utensils,
  ShoppingBag,
  Truck,
  Volume2,
  VolumeX,
  Maximize2,
  RefreshCw,
  Sparkles,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';

export const KitchenDisplaySystem: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    setCurrentView,
    setCustomerPage,
    showToast,
    tables,
    dismissStaffCall,
  } = useApp();

  const tableCalls = tables.filter((t) => t.hasStaffCall).map((t) => t.id);

  const [filterStatus, setFilterStatus] = useState<'all' | 'placed' | 'preparing' | 'ready'>('all');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter active kitchen orders
  const activeOrders = orders.filter(
    (o) => o.status === 'placed' || o.status === 'confirmed' || o.status === 'preparing' || o.status === 'ready'
  );

  const displayedOrders = activeOrders.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.status === filterStatus;
  });

  const getElapsedTimeInMinutes = (createdAt: string) => {
    const created = new Date(createdAt).getTime();
    const diffMs = currentTime.getTime() - created;
    const mins = Math.floor(diffMs / 60000);
    const secs = Math.floor((diffMs % 60000) / 1000);
    return { mins, secs, totalSecs: Math.floor(diffMs / 1000) };
  };

  const handleAdvance = (order: Order) => {
    if (order.status === 'placed' || order.status === 'confirmed') {
      updateOrderStatus(order.id, 'preparing');
      showToast(`Order #${order.id} is now PREPARING 🍳`, 'info');
    } else if (order.status === 'preparing') {
      updateOrderStatus(order.id, 'ready');
      showToast(`Order #${order.id} marked as READY ☕`, 'success');
    } else if (order.status === 'ready') {
      updateOrderStatus(order.id, 'completed');
      showToast(`Order #${order.id} COMPLETED ✓`, 'success');
    }
  };

  return (
    <div className="min-h-screen bg-[#120B08] text-[#FBF8F4] flex flex-col font-sans">
      {/* Top KDS Command Bar */}
      <header className="p-4 sm:p-5 bg-[#1E130D] border-b border-[#3D2518] flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E28743] text-[#1E130D] flex items-center justify-center font-bold shadow-md">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-lg text-white">
                KITCHEN DISPLAY SYSTEM (KDS)
              </h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono font-bold border border-emerald-500/30 animate-pulse">
                ● LIVE SYNC
              </span>
            </div>
            <span className="text-xs text-stone-400">
              Station: Main Hot Line &amp; Espresso Bar
            </span>
          </div>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filterStatus === 'all'
                ? 'bg-stone-700 text-white border-stone-500 font-bold'
                : 'bg-stone-900/60 border-stone-800 text-stone-400'
            }`}
          >
            All Active ({activeOrders.length})
          </button>

          <button
            onClick={() => setFilterStatus('placed')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filterStatus === 'placed'
                ? 'bg-blue-600 text-white border-blue-400 font-bold'
                : 'bg-blue-950/40 border-blue-900/50 text-blue-300'
            }`}
          >
            Queued ({activeOrders.filter((o) => o.status === 'placed' || o.status === 'confirmed').length})
          </button>

          <button
            onClick={() => setFilterStatus('preparing')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filterStatus === 'preparing'
                ? 'bg-amber-600 text-white border-amber-400 font-bold'
                : 'bg-amber-950/40 border-amber-900/50 text-amber-300'
            }`}
          >
            Cooking ({activeOrders.filter((o) => o.status === 'preparing').length})
          </button>

          <button
            onClick={() => setFilterStatus('ready')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filterStatus === 'ready'
                ? 'bg-emerald-600 text-white border-emerald-400 font-bold'
                : 'bg-emerald-950/40 border-emerald-900/50 text-emerald-300'
            }`}
          >
            Ready ({activeOrders.filter((o) => o.status === 'ready').length})
          </button>
        </div>

        {/* Right Tools: Clock, Sound, Switch view */}
        <div className="flex items-center gap-3">
          <div className="font-mono text-sm bg-black/40 px-3 py-1.5 rounded-lg border border-stone-800 text-[#E28743]">
            {currentTime.toLocaleTimeString()}
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-colors"
            title="Toggle kitchen chime"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
          </button>

          <button
            onClick={() => setCurrentView('customer')}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            Exit to Café View
          </button>
        </div>
      </header>

      {/* Staff Call Alert Banner if active */}
      {tableCalls.length > 0 && (
        <div className="bg-amber-500 text-black px-4 py-2.5 flex items-center justify-between font-bold text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 animate-bounce" />
            <span>
              TABLE SERVICE REQUEST: Table {tableCalls.join(', Table ')} requested assistance!
            </span>
          </div>
          <button
            onClick={() => dismissStaffCall(tableCalls[0])}
            className="bg-black text-white px-3 py-1 rounded-md text-[11px] hover:bg-stone-800"
          >
            Acknowledge Table {tableCalls[0]}
          </button>
        </div>
      )}

      {/* Main KDS Order Cards Grid */}
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        {displayedOrders.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center text-stone-500 space-y-4">
            <div className="w-20 h-20 rounded-full bg-[#1E130D] border border-stone-800 flex items-center justify-center text-stone-600">
              <CheckCheck className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold font-serif text-stone-300">
                All Kitchen Tickets Cleared!
              </h2>
              <p className="text-xs text-stone-500 max-w-sm">
                No active preparation tickets in this queue. New customer orders will chime instantly.
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentView('customer');
                setCustomerPage('menu');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#E28743] hover:bg-[#c67434] text-white text-xs font-bold transition-colors"
            >
              Place Demo Test Order
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedOrders.map((order) => {
              const elapsed = getElapsedTimeInMinutes(order.createdAt);
              const isUrgent = elapsed.mins >= 12;
              const isOverdue = elapsed.mins >= 18;

              return (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`rounded-2xl border flex flex-col justify-between overflow-hidden shadow-xl ${
                    order.status === 'ready'
                      ? 'bg-[#152219] border-emerald-700/60 ring-2 ring-emerald-500/30'
                      : order.status === 'preparing'
                      ? 'bg-[#22180D] border-amber-600/60 ring-1 ring-amber-500/20'
                      : 'bg-[#18110D] border-stone-700'
                  }`}
                >
                  {/* Ticket Header */}
                  <div
                    className={`p-3.5 border-b flex items-center justify-between ${
                      order.status === 'ready'
                        ? 'bg-emerald-950/80 border-emerald-800/60 text-emerald-200'
                        : order.status === 'preparing'
                        ? 'bg-amber-950/80 border-amber-800/60 text-amber-200'
                        : 'bg-stone-900/80 border-stone-800 text-stone-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-lg text-white">
                          #{order.id}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/40">
                          {order.orderType === 'dine_in'
                            ? `Table ${order.tableDetails?.tableNumber || 12}`
                            : order.orderType === 'pickup'
                            ? 'Takeaway'
                            : 'Delivery'}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-400 block mt-0.5">
                        Customer: <strong>{order.customer.name}</strong>
                      </span>
                    </div>

                    {/* Timer */}
                    <div
                      className={`text-right px-2.5 py-1 rounded-lg font-mono font-bold text-xs flex items-center gap-1 ${
                        isOverdue
                          ? 'bg-red-600 text-white animate-pulse'
                          : isUrgent
                          ? 'bg-amber-600 text-white'
                          : 'bg-black/50 text-stone-300'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {String(elapsed.mins).padStart(2, '0')}:{String(elapsed.secs).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Items List with Modifiers */}
                  <div className="p-4 flex-1 space-y-3 overflow-y-auto max-h-72">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="pb-2.5 border-b border-white/5 last:border-0 last:pb-0 space-y-1"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#E28743] text-black font-bold font-mono text-xs flex items-center justify-center shrink-0">
                              {item.quantity}
                            </span>
                            <strong className="text-sm text-white font-medium">
                              {item.menuItem.name}
                            </strong>
                          </div>
                        </div>

                        {/* Modifiers badge */}
                        {item.selectedCustomizations.length > 0 && (
                          <div className="pl-8 flex flex-wrap gap-1">
                            {item.selectedCustomizations.flatMap((c) =>
                              c.selectedOptionNames.map((opt, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 font-medium"
                                >
                                  {opt}
                                </span>
                              ))
                            )}
                          </div>
                        )}

                        {item.specialInstructions && (
                          <div className="pl-8 text-[11px] text-[#E28743] italic bg-black/40 p-1.5 rounded border border-[#E28743]/20">
                            Chef Note: "{item.specialInstructions}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Ticket Action Footer */}
                  <div className="p-3 bg-black/50 border-t border-stone-800 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-stone-400">
                      Total: ₹{order.total.toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleAdvance(order)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 ${
                        order.status === 'placed' || order.status === 'confirmed'
                          ? 'bg-amber-600 hover:bg-amber-500 text-white'
                          : order.status === 'preparing'
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-stone-700 hover:bg-stone-600 text-white'
                      }`}
                    >
                      {order.status === 'placed' || order.status === 'confirmed' ? (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Start Cooking</span>
                        </>
                      ) : order.status === 'preparing' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Mark Ready</span>
                        </>
                      ) : (
                        <>
                          <CheckCheck className="w-4 h-4" />
                          <span>Serve / Done</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
