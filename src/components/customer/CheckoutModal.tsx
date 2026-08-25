import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Utensils,
  ShoppingBag,
  CreditCard,
  QrCode,
  Banknote,
  Clock,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod, OrderType } from '../../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    customerProfile,
    setCustomerProfile,
    orderType,
    setOrderType,
    tableDetails,
    setTableDetails,
    deliveryDetails,
    setDeliveryDetails,
    pickupDetails,
    setPickupDetails,
    cartGrandTotal,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartPackaging,
    cartDelivery,
    placeOrder,
    tables,
  } = useApp();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep((s) => (s + 1) as 2 | 3);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => (s - 1) as 1 | 2);
  };

  const handleFinalPlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(selectedPayment);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD5] flex flex-col max-h-[90vh]"
        >
          {/* Header & Step Tracker */}
          <div className="p-4 sm:p-6 bg-[#FBF8F4] border-b border-[#E8DFD5] shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold font-serif text-xl sm:text-2xl text-[#2C1810]">
                  Complete Your Order
                </h3>
                <span className="text-xs text-[#8B5A2B]">
                  Step {currentStep} of 3 • {currentStep === 1 ? 'Customer Details' : currentStep === 2 ? 'Order Fulfillment' : 'Payment Method'}
                </span>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F2ECE4] hover:bg-[#E8DFD5] text-stone-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Stepper Progress Indicator */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { step: 1, title: '1. Contact' },
                { step: 2, title: '2. Fulfillment' },
                { step: 3, title: '3. Payment' },
              ].map((s) => (
                <div key={s.step} className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full transition-colors ${
                      currentStep >= s.step ? 'bg-[#E28743]' : 'bg-[#E8DFD5]'
                    }`}
                  />
                  <span
                    className={`text-[11px] font-semibold block ${
                      currentStep >= s.step ? 'text-[#2C1810]' : 'text-stone-400'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Body Content by Step */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* STEP 1: Customer Contact Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#E8DFD5] text-xs text-[#6F4E37] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Your contact info is used for live SMS order updates and receipt delivery.
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2C1810] uppercase tracking-wide mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={customerProfile.name}
                        onChange={(e) =>
                          setCustomerProfile((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Rohan Sharma"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8DFD5] text-sm focus:outline-none focus:ring-2 focus:ring-[#E28743]/40 bg-[#FBF8F4]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2C1810] uppercase tracking-wide mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={customerProfile.phone}
                        onChange={(e) =>
                          setCustomerProfile((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8DFD5] text-sm focus:outline-none focus:ring-2 focus:ring-[#E28743]/40 bg-[#FBF8F4]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2C1810] uppercase tracking-wide mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={customerProfile.email}
                        onChange={(e) =>
                          setCustomerProfile((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="rohan.sharma@example.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8DFD5] text-sm focus:outline-none focus:ring-2 focus:ring-[#E28743]/40 bg-[#FBF8F4]"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Order Type and Specific Fulfillment Details */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-bold text-[#2C1810] uppercase tracking-wide mb-2">
                    How would you like to enjoy your order?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'dine_in' as OrderType, label: 'Dine In', icon: <Utensils className="w-4 h-4" /> },
                      { id: 'pickup' as OrderType, label: 'Takeaway', icon: <ShoppingBag className="w-4 h-4" /> },
                      { id: 'delivery' as OrderType, label: 'Delivery', icon: <MapPin className="w-4 h-4" /> },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setOrderType(t.id)}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${
                          orderType === t.id
                            ? 'bg-[#2C1810] text-[#FBF8F4] border-[#2C1810] shadow-sm'
                            : 'bg-white text-[#5C4033] border-[#E8DFD5] hover:border-[#D4A373]'
                        }`}
                      >
                        {t.icon}
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-form based on chosen order type */}
                {orderType === 'dine_in' && (
                  <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E8DFD5] space-y-3">
                    <h5 className="font-bold text-xs text-[#2C1810] uppercase tracking-wide flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-[#E28743]" />
                      <span>Select Table Number</span>
                    </h5>

                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {tables.map((tbl) => {
                        const isSelected = tableDetails.tableNumber === tbl.id;
                        return (
                          <button
                            key={tbl.id}
                            onClick={() =>
                              setTableDetails((prev) => ({ ...prev, tableNumber: tbl.id }))
                            }
                            className={`p-2 rounded-xl text-center border text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-[#E28743] text-white border-[#E28743] shadow-xs'
                                : 'bg-white border-[#E8DFD5] text-[#2C1810] hover:border-[#D4A373]'
                            }`}
                          >
                            <span className="block text-[10px] opacity-75">T</span>
                            <span className="text-sm font-mono">{tbl.id}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs text-[#8B5A2B]">
                      <span>Table Selected: <strong>Table {tableDetails.tableNumber}</strong></span>
                      <span className="text-[11px] bg-white px-2 py-0.5 rounded border border-[#E8DFD5]">
                        Window Booth Section
                      </span>
                    </div>
                  </div>
                )}

                {orderType === 'pickup' && (
                  <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E8DFD5] space-y-3">
                    <h5 className="font-bold text-xs text-[#2C1810] uppercase tracking-wide flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#E28743]" />
                      <span>Pickup Timing</span>
                    </h5>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setPickupDetails({ pickupTimeType: 'asap' })
                        }
                        className={`flex-1 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                          pickupDetails.pickupTimeType === 'asap'
                            ? 'bg-[#2C1810] text-[#FBF8F4] border-[#2C1810]'
                            : 'bg-white text-[#2C1810] border-[#E8DFD5]'
                        }`}
                      >
                        ASAP (~12-15 mins)
                      </button>

                      <button
                        onClick={() =>
                          setPickupDetails({
                            pickupTimeType: 'scheduled',
                            scheduledTime: 'In 30 mins',
                          })
                        }
                        className={`flex-1 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                          pickupDetails.pickupTimeType === 'scheduled'
                            ? 'bg-[#2C1810] text-[#FBF8F4] border-[#2C1810]'
                            : 'bg-white text-[#2C1810] border-[#E8DFD5]'
                        }`}
                      >
                        Schedule for Later
                      </button>
                    </div>
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2C1810] uppercase tracking-wide mb-1">
                        Delivery Address *
                      </label>
                      <textarea
                        rows={2}
                        value={deliveryDetails.address}
                        onChange={(e) =>
                          setDeliveryDetails((prev) => ({ ...prev, address: e.target.value }))
                        }
                        placeholder="Flat / Building name, Street, Area..."
                        className="w-full p-3 rounded-xl border border-[#E8DFD5] text-sm focus:outline-none focus:ring-2 focus:ring-[#E28743]/40 bg-[#FBF8F4] resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-[#2C1810] uppercase tracking-wide mb-1">
                          Nearby Landmark
                        </label>
                        <input
                          type="text"
                          value={deliveryDetails.landmark || ''}
                          onChange={(e) =>
                            setDeliveryDetails((prev) => ({ ...prev, landmark: e.target.value }))
                          }
                          placeholder="e.g. Near Metro Pillar 84"
                          className="w-full p-2.5 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:ring-2 focus:ring-[#E28743]/40 bg-[#FBF8F4]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#2C1810] uppercase tracking-wide mb-1">
                          Pincode
                        </label>
                        <input
                          type="text"
                          value={deliveryDetails.pincode || ''}
                          onChange={(e) =>
                            setDeliveryDetails((prev) => ({ ...prev, pincode: e.target.value }))
                          }
                          placeholder="560038"
                          className="w-full p-2.5 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:ring-2 focus:ring-[#E28743]/40 bg-[#FBF8F4]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 3: Payment Options & Simulation */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Demo Mode: 100% simulated instant secure payment. No real charges.
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      id: 'upi' as PaymentMethod,
                      title: 'Instant UPI Payment',
                      subtitle: 'Google Pay, PhonePe, Paytm, BHIM UPI',
                      icon: <QrCode className="w-5 h-5 text-[#E28743]" />,
                      badge: 'Fastest',
                    },
                    {
                      id: 'card' as PaymentMethod,
                      title: 'Credit / Debit Card',
                      subtitle: 'Visa, Mastercard, RuPay, Amex',
                      icon: <CreditCard className="w-5 h-5 text-[#6F4E37]" />,
                    },
                    {
                      id: 'counter' as PaymentMethod,
                      title: orderType === 'delivery' ? 'Cash on Delivery' : 'Pay at Café Counter',
                      subtitle: 'Cash / Card swipe at pickup or table settlement',
                      icon: <Banknote className="w-5 h-5 text-[#40534C]" />,
                    },
                  ].map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPayment(p.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        selectedPayment === p.id
                          ? 'border-[#E28743] bg-[#E28743]/5 shadow-xs'
                          : 'border-[#E8DFD5] hover:border-[#D4A373] bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center">
                          {p.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#2C1810]">
                              {p.title}
                            </span>
                            {p.badge && (
                              <span className="text-[10px] bg-[#E28743] text-white px-1.5 py-0.2 rounded font-bold">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-stone-500 block">
                            {p.subtitle}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          selectedPayment === p.id
                            ? 'border-[#E28743] bg-[#E28743] text-white'
                            : 'border-[#D4C3B3]'
                        }`}
                      >
                        {selectedPayment === p.id && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Final Order Review Pill */}
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E8DFD5] flex items-center justify-between text-xs font-medium">
                  <span>Grand Total to Pay:</span>
                  <span className="font-mono text-base font-bold text-[#2C1810]">
                    ₹{cartGrandTotal.toFixed(2)}
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sticky Bottom Actions */}
          <div className="p-4 sm:p-5 bg-[#FBF8F4] border-t border-[#E8DFD5] flex items-center justify-between gap-3 shrink-0">
            {currentStep > 1 ? (
              <button
                onClick={handlePrevStep}
                className="px-4 py-2.5 rounded-xl border border-[#E8DFD5] hover:bg-white text-[#2C1810] text-xs sm:text-sm font-semibold flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-md transition-colors"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinalPlaceOrder}
                disabled={isSubmitting}
                className="flex-1 py-3 px-6 rounded-xl bg-[#E28743] hover:bg-[#d47833] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  <span>Place Order • ₹{cartGrandTotal.toFixed(2)}</span>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
