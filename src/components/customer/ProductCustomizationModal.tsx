import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Check, Star, Clock, Flame, ShoppingBag, Sparkles } from 'lucide-react';
import { MenuItem, SelectedCustomization } from '../../types';
import { useApp } from '../../context/AppContext';

export const ProductCustomizationModal: React.FC = () => {
  const { customizingItem, setCustomizingItem, addToCart, setIsCartDrawerOpen } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Initialize default options when modal opens with a new item
  useEffect(() => {
    if (!customizingItem) return;

    setQuantity(1);
    setSpecialInstructions('');

    const initialMap: Record<string, string[]> = {};
    if (customizingItem.customizationGroups) {
      customizingItem.customizationGroups.forEach((group) => {
        if (group.type === 'single' && group.options.length > 0) {
          initialMap[group.id] = [group.options[0].id]; // default first option
        } else {
          initialMap[group.id] = [];
        }
      });
    }
    setSelectedOptions(initialMap);
  }, [customizingItem]);

  if (!customizingItem) return null;

  const handleSingleSelect = (groupId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupId]: [optionId],
    }));
  };

  const handleMultipleToggle = (groupId: string, optionId: string) => {
    setSelectedOptions((prev) => {
      const currentList = prev[groupId] || [];
      const exists = currentList.includes(optionId);
      const updated = exists
        ? currentList.filter((id) => id !== optionId)
        : [...currentList, optionId];
      return {
        ...prev,
        [groupId]: updated,
      };
    });
  };

  // Calculate extra price from selections
  let extrasPrice = 0;
  const compiledCustomizations: SelectedCustomization[] = [];

  if (customizingItem.customizationGroups) {
    customizingItem.customizationGroups.forEach((group) => {
      const selectedIds = selectedOptions[group.id] || [];
      if (selectedIds.length > 0) {
        const selectedOptionObjs = group.options.filter((o) => selectedIds.includes(o.id));
        const groupAdditionalPrice = selectedOptionObjs.reduce((sum, o) => sum + o.price, 0);
        extrasPrice += groupAdditionalPrice;

        compiledCustomizations.push({
          groupId: group.id,
          groupTitle: group.title,
          selectedOptionIds: selectedIds,
          selectedOptionNames: selectedOptionObjs.map(
            (o) => `${o.name}${o.price > 0 ? ` (+₹${o.price})` : ''}`
          ),
          additionalPrice: groupAdditionalPrice,
        });
      }
    });
  }

  const unitPrice = customizingItem.price + extrasPrice;
  const grandTotal = unitPrice * quantity;

  const handleConfirmAddToCart = () => {
    addToCart(customizingItem, compiledCustomizations, quantity, specialInstructions);
    setCustomizingItem(null);
    setIsCartDrawerOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD5] max-h-[90vh] flex flex-col"
        >
          {/* Header Image with close button */}
          <div className="relative h-48 sm:h-56 w-full bg-stone-100 shrink-0">
            <img
              src={customizingItem.image}
              alt={customizingItem.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            <button
              onClick={() => setCustomizingItem(null)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Overlaid Title & Tags */}
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center p-0.5 border bg-white shadow-xs ${
                    customizingItem.isVeg ? 'border-emerald-600' : 'border-red-600'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      customizingItem.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                    }`}
                  />
                </div>
                <span className="text-xs bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full font-medium">
                  {customizingItem.category}
                </span>
                {customizingItem.isBestseller && (
                  <span className="text-xs bg-[#E28743] text-white px-2 py-0.5 rounded-full font-bold">
                    Bestseller
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif leading-tight">
                {customizingItem.name}
              </h2>
            </div>
          </div>

          {/* Scrollable Customization Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Description & metadata */}
            <div className="space-y-2 pb-4 border-b border-[#F2ECE4]">
              <p className="text-xs sm:text-sm text-[#5C4033] leading-relaxed">
                {customizingItem.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-[#8B5A2B] font-medium pt-1">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <strong className="text-[#2C1810]">{customizingItem.rating}</strong> (
                  {customizingItem.reviewCount} reviews)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  <span>Prep: {customizingItem.prepTime}</span>
                </span>
                {customizingItem.calories && (
                  <>
                    <span>•</span>
                    <span>{customizingItem.calories} kcal</span>
                  </>
                )}
              </div>
            </div>

            {/* Customization Groups */}
            {customizingItem.customizationGroups && customizingItem.customizationGroups.length > 0 ? (
              customizingItem.customizationGroups.map((group) => {
                const currentSelectedIds = selectedOptions[group.id] || [];

                return (
                  <div key={group.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#2C1810] uppercase tracking-wide">
                        {group.title}
                      </h4>
                      <span className="text-[11px] text-[#8B5A2B] font-medium bg-[#F2ECE4] px-2 py-0.5 rounded-full">
                        {group.type === 'single' ? 'Choose 1' : 'Optional Multi'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {group.options.map((opt) => {
                        const isSelected = currentSelectedIds.includes(opt.id);

                        return (
                          <div
                            key={opt.id}
                            onClick={() =>
                              group.type === 'single'
                                ? handleSingleSelect(group.id, opt.id)
                                : handleMultipleToggle(group.id, opt.id)
                            }
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                              isSelected
                                ? 'border-[#E28743] bg-[#E28743]/5 shadow-xs'
                                : 'border-[#E8DFD5] hover:border-[#D4A373] bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                                  group.type === 'single' ? 'rounded-full' : 'rounded-md'
                                } ${
                                  isSelected
                                    ? 'bg-[#E28743] border-[#E28743] text-white'
                                    : 'border-[#D4C3B3] bg-white'
                                }`}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <span className="text-sm font-medium text-[#2C1810]">
                                {opt.name}
                              </span>
                            </div>

                            <span className="text-xs font-mono font-semibold text-[#8B5A2B]">
                              {opt.price > 0 ? `+₹${opt.price}` : 'Included'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-3 bg-[#FAF6F0] rounded-xl text-xs text-[#8B5A2B] text-center">
                This chef's recipe item is freshly prepared to signature perfection!
              </div>
            )}

            {/* Special Instructions Field */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-[#2C1810] uppercase tracking-wide flex items-center justify-between">
                <span>Special Instructions</span>
                <span className="text-stone-400 font-normal lowercase">(optional)</span>
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Extra hot, less ice, crispy edges, no seasoning..."
                rows={2}
                maxLength={140}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#E8DFD5] focus:outline-none focus:ring-2 focus:ring-[#E28743]/40 focus:border-[#E28743] bg-[#FBF8F4] resize-none"
              />
            </div>
          </div>

          {/* Sticky Bottom Actions Bar */}
          <div className="p-4 sm:p-5 bg-[#F8F4EE] border-t border-[#E8DFD5] flex items-center justify-between gap-4 shrink-0">
            {/* Quantity +/- */}
            <div className="flex items-center bg-white border border-[#E8DFD5] rounded-xl p-1 shadow-xs">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F2ECE4] text-[#2C1810] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold font-mono text-sm text-[#2C1810]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F2ECE4] text-[#2C1810] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Confirm Add to Cart Button with total price */}
            <button
              onClick={handleConfirmAddToCart}
              className="flex-1 flex items-center justify-between px-5 py-3 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-[#FBF8F4] font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Order</span>
              </div>
              <span className="font-mono text-base font-bold">
                ₹{grandTotal}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
