import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  CheckCircle2,
  ChefHat,
  RotateCcw,
  Receipt,
  Star,
  Navigation,
  Utensils,
  Truck,
  ShoppingBag,
  X,
  MessageSquare,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';

export const MyOrdersPage: React.FC = () => {
  const {
    orders,
    reorderItems,
    setTrackingOrderId,
    setReceiptOrderId,
    setCustomerPage,
    rateOrder,
  } = useApp();

  const [ratingOrderTarget, setRatingOrderTarget] = useState<Order | null>(null);
  const [starCount, setStarCount] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState<string>('');

  const activeOrders = orders.filter(
    (o) => o.status === 'placed' || o.status === 'confirmed' || o.status === 'preparing' || o.status === 'ready'
  );
  const pastOrders = orders.filter((o) => o.status === 'completed' || o.status === 'cancelled');

  const handleOpenRateModal = (order: Order) => {
    setRatingOrderTarget(order);
    setStarCount(order.rating || 5);
    setFeedbackText(order.feedback || '');
  };

  const handleSaveRating = () => {
    if (!ratingOrderTarget) return;
    rateOrder(ratingOrderTarget.id, starCount, feedbackText);
    setRatingOrderTarget(null);
  };

  const renderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return (
          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            Placed
          </span>
        );
      case 'confirmed':
        return (
          <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
            Confirmed
          </span>
        );
      case 'preparing':
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-300 flex items-center gap-1">
            <ChefHat className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            Preparing
          </span>
        );
      case 'ready':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-300 flex items-center gap-1 animate-pulse">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Ready for You!
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold border border-stone-200">
            Completed ✓
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200">
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E28743]">
          Customer History
        </span>
        <h1 className="text-3xl font-serif font-bold text-[#2C1810]">
          My Orders &amp; Receipts
        </h1>
        <p className="text-xs sm:text-sm text-[#6F4E37]">
          Track your live kitchen orders, download digital tax invoices, or reorder your favorites in 1 click.
        </p>
      </div>

      {/* ACTIVE ORDERS SECTION */}
      {activeOrders.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E28743] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E28743]"></span>
            </span>
            <h2 className="text-lg font-bold font-serif text-[#2C1810]">
              Active Kitchen Orders ({activeOrders.length})
            </h2>
          </div>

          <div className="space-y-4">
            {activeOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border-2 border-[#E28743]/40 p-4 sm:p-6 shadow-md space-y-4 relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2C1810] text-[#E28743] flex items-center justify-center font-mono font-bold text-sm">
                      #{order.id.replace('BB', '')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-[#2C1810]">
                          Order #{order.id}
                        </h3>
                        {renderStatusBadge(order.status)}
                      </div>
                      <span className="text-xs text-stone-500">
                        Placed {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} •{' '}
                        {order.orderType === 'dine_in'
                          ? `Table ${order.tableDetails?.tableNumber || 12} (Dine-In)`
                          : order.orderType === 'pickup'
                          ? 'Takeaway'
                          : 'Doorstep Delivery'}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono font-bold text-lg text-[#2C1810]">
                    ₹{order.total.toFixed(2)}
                  </span>
                </div>

                {/* Items preview */}
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E8DFD5] text-xs text-[#5C4033] space-y-1">
                  {order.items.map((it) => (
                    <div key={it.cartItemId} className="flex justify-between">
                      <span>
                        {it.quantity}x {it.menuItem.name}
                      </span>
                      <span className="font-mono text-[#2C1810]">₹{it.totalPrice}</span>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <Clock className="w-4 h-4 text-[#E28743]" />
                    <span>Est. Ready: <strong>{order.estimatedReadyTime}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setReceiptOrderId(order.id)}
                      className="px-3 py-1.5 rounded-lg border border-[#E8DFD5] hover:bg-[#F2ECE4] text-xs font-semibold text-[#2C1810] flex items-center gap-1 transition-colors"
                    >
                      <Receipt className="w-3.5 h-3.5 text-[#8B5A2B]" />
                      <span>Receipt</span>
                    </button>

                    <button
                      onClick={() => setTrackingOrderId(order.id)}
                      className="px-4 py-2 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Live Tracker</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PAST ORDERS SECTION */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-serif text-[#2C1810]">
          Previous Orders
        </h2>

        {pastOrders.length === 0 && activeOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E8DFD5] p-12 text-center space-y-3">
            <ShoppingBag className="w-12 h-12 text-[#8B5A2B] mx-auto opacity-50" />
            <h3 className="font-serif font-bold text-lg text-[#2C1810]">
              No past orders yet
            </h3>
            <p className="text-xs text-[#6F4E37]">
              Once you place an order, you can view your digital receipts and reorder in 1 tap.
            </p>
            <button
              onClick={() => setCustomerPage('menu')}
              className="px-5 py-2.5 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white text-xs font-semibold"
            >
              Order Something Delicious
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {pastOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-[#E8DFD5] p-4 sm:p-6 shadow-xs space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-[#2C1810]">
                        Order #{order.id}
                      </h3>
                      {renderStatusBadge(order.status)}
                    </div>
                    <span className="text-xs text-stone-500">
                      {new Date(order.createdAt).toLocaleDateString([], { dateStyle: 'medium' })} •{' '}
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'} •{' '}
                      {order.orderType.toUpperCase()}
                    </span>
                  </div>

                  <span className="font-mono font-bold text-base text-[#2C1810]">
                    ₹{order.total.toFixed(2)}
                  </span>
                </div>

                {/* Items summary */}
                <div className="text-xs text-[#5C4033] space-y-1">
                  {order.items.map((it) => (
                    <div key={it.cartItemId} className="flex justify-between">
                      <span>
                        {it.quantity}x {it.menuItem.name}
                      </span>
                      <span className="font-mono text-stone-500">₹{it.totalPrice}</span>
                    </div>
                  ))}
                </div>

                {/* Rating if exists */}
                {order.rating && (
                  <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs text-amber-900 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < order.rating! ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                          }`}
                        />
                      ))}
                      <span className="text-stone-700 ml-1 font-medium italic">
                        "{order.feedback || 'Loved it!'}"
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400">Rated</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F2ECE4]">
                  <button
                    onClick={() => handleOpenRateModal(order)}
                    className="text-xs text-[#8B5A2B] hover:text-[#2C1810] font-semibold flex items-center gap-1"
                  >
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    <span>{order.rating ? 'Edit Rating' : 'Rate Order ★'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setReceiptOrderId(order.id)}
                      className="px-3 py-1.5 rounded-lg border border-[#E8DFD5] hover:bg-[#F2ECE4] text-xs font-semibold text-[#2C1810] flex items-center gap-1 transition-colors"
                    >
                      <Receipt className="w-3.5 h-3.5 text-[#8B5A2B]" />
                      <span>Receipt</span>
                    </button>

                    <button
                      onClick={() => reorderItems(order)}
                      className="px-4 py-1.5 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder Items</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RATE ORDER MODAL */}
      <AnimatePresence>
        {ratingOrderTarget && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-3xl p-6 border border-[#E8DFD5] shadow-2xl space-y-5 text-center relative"
            >
              <button
                onClick={() => setRatingOrderTarget(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="font-serif font-bold text-xl text-[#2C1810]">
                  How was your experience?
                </h3>
                <p className="text-xs text-[#6F4E37]">
                  Order #{ratingOrderTarget.id}
                </p>
              </div>

              {/* Star Selector */}
              <div className="flex justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setStarCount(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= starCount ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Feedback text */}
              <div className="text-left space-y-1">
                <label className="text-xs font-bold text-[#2C1810] uppercase tracking-wide">
                  Share Your Thoughts
                </label>
                <textarea
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Tell our chefs what you loved or how we can improve..."
                  className="w-full text-xs p-3 rounded-xl border border-[#E8DFD5] bg-[#FBF8F4] focus:outline-none focus:ring-2 focus:ring-[#E28743]/40 resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setRatingOrderTarget(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E8DFD5] text-xs font-semibold text-[#2C1810]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRating}
                  className="flex-1 py-2.5 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white text-xs font-bold transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
