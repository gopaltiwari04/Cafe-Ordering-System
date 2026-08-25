import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, Coffee, CheckCircle, QrCode } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReceiptModal: React.FC = () => {
  const { receiptOrderId, setReceiptOrderId, orders, showToast } = useApp();

  if (!receiptOrderId) return null;

  const order = orders.find((o) => o.id === receiptOrderId);
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast('Invoice PDF downloaded successfully (Simulated)', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD5] flex flex-col max-h-[90vh]"
        >
          {/* Header Action Bar */}
          <div className="p-4 bg-[#FBF8F4] border-b border-[#E8DFD5] flex items-center justify-between no-print">
            <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider">
              Tax Invoice &amp; Receipt
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="p-2 rounded-lg bg-white border border-[#E8DFD5] text-[#2C1810] hover:bg-[#F2ECE4] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                title="Print Receipt"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button
                onClick={handleDownload}
                className="p-2 rounded-lg bg-white border border-[#E8DFD5] text-[#2C1810] hover:bg-[#F2ECE4] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
              <button
                onClick={() => setReceiptOrderId(null)}
                className="w-8 h-8 rounded-full bg-[#F2ECE4] hover:bg-[#E8DFD5] text-stone-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Receipt Paper Container */}
          <div
            id="printable-receipt"
            className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white font-mono text-xs text-[#2C1810] space-y-4"
          >
            {/* Café Brand Header */}
            <div className="text-center space-y-1 pb-4 border-b border-dashed border-stone-300">
              <div className="flex items-center justify-center gap-1.5 text-[#2C1810] font-serif font-bold text-xl">
                <Coffee className="w-5 h-5 text-[#E28743]" />
                <span>BREW &amp; BITE</span>
              </div>
              <p className="text-[11px] text-stone-500 font-sans">
                Artisanal Café &amp; Micro Roastery
              </p>
              <p className="text-[10px] text-stone-500">
                124/B Heritage Blvd, Indiranagar, Bengaluru, 560038
              </p>
              <p className="text-[10px] text-stone-500">GSTIN: 29AAAAA0000A1Z5 | FSSAI: 11223344556677</p>
            </div>

            {/* Order & Customer Metadata */}
            <div className="space-y-1 py-1 border-b border-dashed border-stone-300 text-[11px]">
              <div className="flex justify-between">
                <span>Invoice / Order:</span>
                <strong className="font-bold">#{order.id}</strong>
              </div>
              <div className="flex justify-between">
                <span>Date &amp; Time:</span>
                <span>{new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span>{order.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Fulfillment:</span>
                <strong className="uppercase">
                  {order.orderType === 'dine_in'
                    ? `Dine-In (Table ${order.tableDetails?.tableNumber || 12})`
                    : order.orderType === 'pickup'
                    ? 'Takeaway Pickup'
                    : 'Delivery'}
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Payment:</span>
                <span className="uppercase text-emerald-700 font-bold">
                  {order.paymentMethod} (PAID ✓)
                </span>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="space-y-2 py-2 border-b border-dashed border-stone-300">
              <div className="flex justify-between font-bold text-[11px] text-stone-500 uppercase">
                <span>Item / Modifiers</span>
                <span>Qty</span>
                <span>Amount</span>
              </div>

              {order.items.map((it, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between">
                    <span className="font-semibold text-stone-900">{it.menuItem.name}</span>
                    <span className="text-center w-8">{it.quantity}</span>
                    <span className="font-bold">₹{it.totalPrice.toFixed(2)}</span>
                  </div>
                  {it.selectedCustomizations.length > 0 && (
                    <div className="text-[10px] text-stone-500 pl-2">
                      {it.selectedCustomizations.flatMap((c) => c.selectedOptionNames).join(' + ')}
                    </div>
                  )}
                  {it.specialInstructions && (
                    <div className="text-[10px] italic text-[#8B5A2B] pl-2">
                      Note: {it.specialInstructions}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Totals & Tax Calculation */}
            <div className="space-y-1.5 py-1 text-[11px]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{order.subtotal.toFixed(2)}</span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({order.promoCodeApplied || 'Voucher'}):</span>
                  <span>-₹{order.discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>CGST (2.5%) + SGST (2.5%):</span>
                <span>₹{order.tax.toFixed(2)}</span>
              </div>

              {order.packagingFee > 0 && (
                <div className="flex justify-between">
                  <span>Eco Packaging:</span>
                  <span>₹{order.packagingFee.toFixed(2)}</span>
                </div>
              )}

              {order.deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Delivery Charges:</span>
                  <span>₹{order.deliveryFee.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-stone-900 flex justify-between text-sm font-bold text-stone-900">
                <span>GRAND TOTAL:</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Footer barcode/QR and thank you */}
            <div className="pt-4 text-center space-y-2 border-t border-dashed border-stone-300">
              <div className="flex justify-center">
                <div className="p-2 bg-stone-100 rounded-lg inline-block">
                  <QrCode className="w-16 h-16 text-stone-800" />
                </div>
              </div>
              <p className="text-[10px] text-stone-500 font-sans">
                Scan to view live digital receipt &amp; track reward points.
              </p>
              <p className="font-serif font-bold text-xs text-[#2C1810]">
                Thank you for visiting Brew &amp; Bite! ☕
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
