import React from 'react';
import { motion } from 'motion/react';
import { Plus, Star, Clock, Flame, Heart } from 'lucide-react';
import { MenuItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  item: MenuItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { setCustomizingItem, addToCart, favorites, toggleFavorite, showToast } = useApp();

  const isFav = favorites.includes(item.id);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.isAvailable) {
      showToast('Sorry, this item is currently sold out for the day', 'warning');
      return;
    }
    // If it has customization groups, open customization modal; else add directly
    if (item.customizationGroups && item.customizationGroups.length > 0) {
      setCustomizingItem(item);
    } else {
      addToCart(item, [], 1);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => {
        if (item.isAvailable) setCustomizingItem(item);
      }}
      className={`group relative bg-white rounded-2xl p-3 sm:p-4 border border-[#E8DFD5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer overflow-hidden ${
        !item.isAvailable ? 'opacity-65 grayscale-[20%]' : ''
      }`}
    >
      {/* Top badges & Favorite heart */}
      <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-3.5 bg-stone-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>

        {/* Veg / Non-Veg Indicator Icon */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          <div
            className={`w-5 h-5 rounded-md flex items-center justify-center p-0.5 border bg-white shadow-sm ${
              item.isVeg ? 'border-emerald-600' : 'border-red-600'
            }`}
            title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
              }`}
            />
          </div>

          {item.isBestseller && (
            <span className="bg-[#E28743] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
              Bestseller
            </span>
          )}

          {item.isSpicy && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
              <Flame className="w-2.5 h-2.5" /> Spicy
            </span>
          )}
        </div>

        {/* Heart Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 z-10 ${
            isFav
              ? 'bg-red-50 text-red-500 shadow'
              : 'bg-white/80 text-stone-700 hover:text-red-500'
          }`}
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500' : ''}`} />
        </button>

        {/* Rating & Prep Time overlay pill */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white font-medium z-10">
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>{item.rating}</span>
            <span className="text-stone-300 text-[10px]">({item.reviewCount})</span>
          </span>

          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-stone-300" />
            <span>{item.prepTime}</span>
          </span>
        </div>

        {!item.isAvailable && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white/95 text-[#2C1810] font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
              Sold Out Today
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-[#2C1810] text-base group-hover:text-[#E28743] transition-colors leading-tight">
              {item.name}
            </h3>
          </div>
          <p className="text-xs text-[#6F4E37]/80 line-clamp-2 leading-relaxed mb-3">
            {item.description}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-2 border-t border-[#F2ECE4] flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-[#8B5A2B] block -mb-0.5">Price</span>
            <span className="text-base sm:text-lg font-bold text-[#2C1810] font-mono">
              ₹{item.price}
            </span>
          </div>

          <button
            onClick={handleAddClick}
            disabled={!item.isAvailable}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-95 ${
              !item.isAvailable
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-[#2C1810] hover:bg-[#E28743] text-[#FBF8F4]'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{item.customizationGroups && item.customizationGroups.length > 0 ? 'Customize' : 'Add'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
