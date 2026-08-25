import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  Sparkles,
  Utensils,
  Truck,
  ShoppingBag as PickupIcon,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OrderType } from '../../types';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartPackaging,
    cartDelivery,
    cartGrandTotal,
    freeDeliveryDistance,
    appliedCoupon,
    appliedReward,
    applyCoupon,
    removeCoupon,
    removeReward,
    orderType,
    setOrderType,
    setIsCheckoutOpen,
    coupons,
    setCustomerPage,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleApplyPromo = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code) return;
    const success = applyCoupon(code);
    if (success) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
        {/* Backdrop click to close */}
        <div
          onClick={() => setIsCartDrawerOpen(false)}
          className="absolute inset-0"
        />

        {/* Drawer container */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-[#FBF8F4] h-full shadow-2xl flex flex-col z-10 border-l border-[#E8DFD5]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#E8DFD5] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2C1810] text-[#E28743] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold font-serif text-lg text-[#2C1810]">
                  Your Order Cart
                </h3>
                <span className="text-xs text-[#8B5A2B] font-medium">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-stone-500 hover:text-red-600 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F2ECE4] hover:bg-[#E8DFD5] text-stone-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Content */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-[#F2ECE4] flex items-center justify-center text-[#8B5A2B] mb-4">
                <ShoppingBag className="w-10 h-10 opacity-60" />
              </div>
              <h4 className="font-serif font-bold text-xl text-[#2C1810] mb-1">
                Your cart is feeling light!
              </h4>
              <p className="text-xs text-[#6F4E37] max-w-xs mb-6">
                Explore our single-origin coffees, handcrafted sourdough sandwiches, and fresh pastries.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setCustomerPage('menu');
                }}
                className="px-6 py-2.5 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white text-sm font-semibold shadow-md transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Order Type Pill Selector */}
              <div className="bg-white p-1 rounded-xl border border-[#E8DFD5] flex items-center justify-between gap-1 shadow-xs">
                <button
                  onClick={() => setOrderType('dine_in')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    orderType === 'dine_in'
                      ? 'bg-[#2C1810] text-[#FBF8F4] shadow-xs'
                      : 'text-[#6F4E37] hover:bg-[#F8F4EE]'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Dine In</span>
                </button>

                <button
                  onClick={() => setOrderType('pickup')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    orderType === 'pickup'
                      ? 'bg-[#2C1810] text-[#FBF8F4] shadow-xs'
                      : 'text-[#6F4E37] hover:bg-[#F8F4EE]'
                  }`}
                >
                  <PickupIcon className="w-3.5 h-3.5" />
                  <span>Takeaway</span>
                </button>

                <button
                  onClick={() => setOrderType('delivery')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    orderType === 'delivery'
                      ? 'bg-[#2C1810] text-[#FBF8F4] shadow-xs'
                      : 'text-[#6F4E37] hover:bg-[#F8F4EE]'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Delivery</span>
                </button>
              </div>

              {/* Free Delivery Progress Bar if delivery selected */}
              {orderType === 'delivery' && (
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E8DFD5] space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium text-[#2C1810]">
                    <span>
                      {freeDeliveryDistance > 0 ? (
                        <>You are <strong className="text-[#E28743] font-bold">₹{freeDeliveryDistance}</strong> away from FREE delivery!</>
                      ) : (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Congratulations! You got FREE Delivery!
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-stone-500">Threshold: ₹499</span>
                  </div>
                  <div className="w-full bg-[#E8DFD5] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#E28743] h-full transition-all duration-300 rounded-full"
                      style={{ width: `${Math.min(100, (cartSubtotal / 499) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* List of Cart Items */}
              <div className="space-y-2.5">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3 bg-white rounded-xl border border-[#E8DFD5] shadow-xs flex items-start justify-between gap-3"
                  >
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-14 h-14 rounded-lg object-cover bg-stone-100 shrink-0 mt-0.5"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-sm text-[#2C1810] leading-tight truncate">
                          {item.menuItem.name}
                        </h4>
                        <span className="font-mono font-bold text-sm text-[#2C1810] shrink-0">
                          ₹{item.totalPrice}
                        </span>
                      </div>

                      {/* Customizations tags */}
                      {item.selectedCustomizations && item.selectedCustomizations.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.selectedCustomizations.flatMap((c) =>
                            c.selectedOptionNames.map((name, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] bg-[#FAF6F0] text-[#6F4E37] px-1.5 py-0.2 rounded border border-[#E8DFD5]"
                              >
                                {name}
                              </span>
                            ))
                          )}
                        </div>
                      )}

                      {item.specialInstructions && (
                        <p className="text-[11px] text-[#8B5A2B] italic mt-1 bg-stone-50 p-1 rounded">
                          "{item.specialInstructions}"
                        </p>
                      )}

                      {/* Controls: Quantity +/- and remove */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100">
                        <span className="text-[11px] text-stone-500 font-mono">
                          ₹{item.itemPrice} each
                        </span>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-[#F8F4EE] border border-[#E8DFD5] rounded-lg p-0.5">
                            <button
                              onClick={() => updateCartQuantity(item.cartItemId, -1)}
                              className="w-6 h-6 rounded flex items-center justify-center hover:bg-white text-[#2C1810] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-bold text-xs text-[#2C1810] font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.cartItemId, 1)}
                              className="w-6 h-6 rounded flex items-center justify-center hover:bg-white text-[#2C1810] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="p-1 text-stone-400 hover:text-red-500 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Voucher Section */}
              <div className="p-3.5 bg-white rounded-xl border border-[#E8DFD5] space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2C1810] uppercase tracking-wide flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#E28743]" />
                    <span>Offers &amp; Vouchers</span>
                  </span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <strong>{appliedCoupon.code}</strong> applied!
                        <span className="block text-[11px] text-emerald-700">
                          Saving ₹{cartDiscount} on this order
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-800 hover:text-red-600 font-bold text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ) : appliedReward ? (
                  <div className="flex items-center justify-between p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <strong>{appliedReward.title}</strong>
                        <span className="block text-[11px] text-amber-700">
                          Loyalty voucher discount of ₹{cartDiscount}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={removeReward}
                      className="text-amber-800 hover:text-red-600 font-bold text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Enter code (e.g. WELCOME10)"
                        className="flex-1 text-xs p-2.5 rounded-lg border border-[#E8DFD5] bg-[#FBF8F4] uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-[#E28743]"
                      />
                      <button
                        onClick={() => handleApplyPromo()}
                        className="px-4 py-2 bg-[#2C1810] hover:bg-[#E28743] text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Quick suggestion chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {coupons.slice(0, 3).map((c) => (
                        <button
                          key={c.id}
                          onClick={() => handleApplyPromo(c.code)}
                          className="text-[10px] bg-[#FAF6F0] hover:bg-[#E8DFD5] border border-[#E8DFD5] text-[#6F4E37] px-2 py-1 rounded-md font-mono transition-colors"
                        >
                          {c.code}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bill Details Summary Card */}
              <div className="p-4 bg-white rounded-xl border border-[#E8DFD5] space-y-2 text-xs text-[#5C4033] shadow-xs">
                <h5 className="font-bold text-[#2C1810] uppercase tracking-wider text-[11px] mb-2">
                  Order Breakdown
                </h5>
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="font-mono text-[#2C1810]">₹{cartSubtotal.toFixed(2)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount Applied</span>
                    <span className="font-mono">-₹{cartDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Taxes &amp; GST (5%)</span>
                  <span className="font-mono text-[#2C1810]">₹{cartTax.toFixed(2)}</span>
                </div>

                {cartPackaging > 0 && (
                  <div className="flex justify-between">
                    <span>Eco-Packaging Fee</span>
                    <span className="font-mono text-[#2C1810]">₹{cartPackaging.toFixed(2)}</span>
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Partner Fee</span>
                    <span className="font-mono text-[#2C1810]">
                      {cartDelivery === 0 ? (
                        <span className="text-emerald-700 font-bold">FREE</span>
                      ) : (
                        `₹${cartDelivery.toFixed(2)}`
                      )}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#E8DFD5] flex justify-between items-center text-sm font-bold text-[#2C1810]">
                  <span>To Pay</span>
                  <span className="text-base font-mono text-[#2C1810]">
                    ₹{cartGrandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Sticky Footer Action */}
          {cart.length > 0 && (
            <div className="p-4 bg-white border-t border-[#E8DFD5] shrink-0">
              <button
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-[#FBF8F4] font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <div>
                  <span className="block text-[11px] text-[#D4A373] text-left font-normal uppercase tracking-wider">
                    Total Amount
                  </span>
                  <span className="font-mono text-base font-bold">
                    ₹{cartGrandTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
