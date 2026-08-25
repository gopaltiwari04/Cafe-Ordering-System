import React from 'react';
import { motion } from 'motion/react';
import { Tag, Copy, Check, Sparkles, ArrowRight, Percent, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OffersPage: React.FC = () => {
  const { coupons, applyCoupon, setIsCartDrawerOpen, showToast } = useApp();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon code ${code} copied to clipboard!`, 'info');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleApplyDirect = (code: string) => {
    const success = applyCoupon(code);
    if (success) {
      setIsCartDrawerOpen(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E28743]">
          Deals &amp; Discounts
        </span>
        <h1 className="text-3xl font-serif font-bold text-[#2C1810]">
          Active Offers &amp; Promo Codes
        </h1>
        <p className="text-xs sm:text-sm text-[#6F4E37]">
          Save on your morning brew, afternoon toasties, and weekend dining. Apply codes directly at checkout.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white rounded-3xl border border-[#E8DFD5] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 relative overflow-hidden"
          >
            {/* Top offer badge */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAF6F0] text-[#8B5A2B] border border-[#E8DFD5] flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-[#E28743]" />
                  <span>
                    {coupon.discountType === 'percentage'
                      ? `${coupon.discountValue}% OFF`
                      : `₹${coupon.discountValue} FLAT OFF`}
                  </span>
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  Min spend: ₹{coupon.minOrderAmount}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl text-[#2C1810]">
                  {coupon.title}
                </h3>
                <p className="text-xs text-[#6F4E37] mt-1 leading-relaxed">
                  {coupon.description}
                </p>
              </div>
            </div>

            {/* Bottom code box and action */}
            <div className="pt-4 border-t border-[#F2ECE4] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 bg-[#F8F4EE] border border-dashed border-[#D4C3B3] rounded-xl px-3 py-2">
                <span className="font-mono font-bold text-sm text-[#2C1810] tracking-wider">
                  {coupon.code}
                </span>
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="text-stone-400 hover:text-[#2C1810] p-0.5"
                  title="Copy code"
                >
                  {copiedCode === coupon.code ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <button
                onClick={() => handleApplyDirect(coupon.code)}
                className="px-4 py-2.5 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1"
              >
                <span>Apply to Cart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
