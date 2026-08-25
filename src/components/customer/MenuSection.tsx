import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Coffee,
  CupSoda,
  Egg,
  Sandwich,
  UtensilsCrossed,
  Pizza,
  Salad,
  Cookie,
  Flame,
  SlidersHorizontal,
  Star,
  Check,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCategory, MenuItem } from '../../types';
import { ProductCard } from './ProductCard';

export const MenuSection: React.FC = () => {
  const {
    menuItems,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [vegFilter, setVegFilter] = useState<boolean>(false);
  const [veganFilter, setVeganFilter] = useState<boolean>(false);
  const [spicyFilter, setSpicyFilter] = useState<boolean>(false);
  const [bestsellerFilter, setBestsellerFilter] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'rating'>('recommended');

  const categories: { id: string; name: string; icon: React.ReactNode }[] = [
    { id: 'All', name: 'All Items', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'Coffee', name: 'Coffee', icon: <Coffee className="w-4 h-4" /> },
    { id: 'Tea', name: 'Tea & Chai', icon: <Coffee className="w-4 h-4" /> },
    { id: 'Breakfast', name: 'Breakfast', icon: <Egg className="w-4 h-4" /> },
    { id: 'Sandwiches', name: 'Sandwiches', icon: <Sandwich className="w-4 h-4" /> },
    { id: 'Burgers', name: 'Burgers', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'Pizza', name: 'Pizza', icon: <Pizza className="w-4 h-4" /> },
    { id: 'Pasta', name: 'Pasta', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'Snacks', name: 'Snacks', icon: <Salad className="w-4 h-4" /> },
    { id: 'Desserts', name: 'Desserts', icon: <Cookie className="w-4 h-4" /> },
    { id: 'Cold Beverages', name: 'Cold Beverages', icon: <CupSoda className="w-4 h-4" /> },
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return menuItems.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // Dietary filters
      if (vegFilter && !item.isVeg) return false;
      if (veganFilter && !item.isVegan) return false;
      if (spicyFilter && !item.isSpicy) return false;
      if (bestsellerFilter && !item.isBestseller) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Recommended: bestsellers first
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [menuItems, selectedCategory, searchQuery, vegFilter, veganFilter, spicyFilter, bestsellerFilter, sortBy]);

  const hasActiveFilters = vegFilter || veganFilter || spicyFilter || bestsellerFilter || searchQuery.trim() !== '' || selectedCategory !== 'All';

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setVegFilter(false);
    setVeganFilter(false);
    setSpicyFilter(false);
    setBestsellerFilter(false);
    setSortBy('recommended');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Top Banner Header */}
      <div className="space-y-2 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E28743]">
          Artisanal Digital Menu
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1810]">
          Explore Our Handcrafted Menu
        </h1>
        <p className="text-xs sm:text-sm text-[#6F4E37] max-w-xl">
          Single-origin coffees, wholesome breakfast toasts, woodfired sourdough pizzas, and freshly baked pastries.
        </p>
      </div>

      {/* Search Bar & Sort Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-[#E8DFD5] shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cappuccino, avocado toast, pasta, brownies..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E8DFD5] text-sm focus:outline-none focus:ring-2 focus:ring-[#E28743]/40 bg-[#FBF8F4]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-stone-500 font-medium whitespace-nowrap">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs sm:text-sm py-2 px-3 rounded-xl border border-[#E8DFD5] bg-[#FBF8F4] font-medium text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#E28743]/40 cursor-pointer"
          >
            <option value="recommended">Featured / Bestseller</option>
            <option value="rating">Highest Rated ★</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Scrollable Pills */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs ${
                  isSelected
                    ? 'bg-[#2C1810] text-[#FBF8F4] scale-[1.02] shadow-sm'
                    : 'bg-white text-[#5C4033] hover:bg-[#F2ECE4] border border-[#E8DFD5]'
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dietary Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {/* Veg Chip */}
          <button
            onClick={() => setVegFilter(!vegFilter)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              vegFilter
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${vegFilter ? 'bg-white' : 'bg-emerald-600'}`} />
            <span>Pure Veg</span>
          </button>

          {/* Vegan Chip */}
          <button
            onClick={() => setVeganFilter(!veganFilter)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              veganFilter
                ? 'bg-green-700 text-white border-green-700 shadow-xs'
                : 'bg-white text-green-800 border-green-300 hover:bg-green-50'
            }`}
          >
            <span>🌿 Vegan</span>
          </button>

          {/* Spicy Chip */}
          <button
            onClick={() => setSpicyFilter(!spicyFilter)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              spicyFilter
                ? 'bg-red-600 text-white border-red-600 shadow-xs'
                : 'bg-white text-red-800 border-red-300 hover:bg-red-50'
            }`}
          >
            <Flame className="w-3 h-3" />
            <span>Spicy</span>
          </button>

          {/* Bestseller Chip */}
          <button
            onClick={() => setBestsellerFilter(!bestsellerFilter)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              bestsellerFilter
                ? 'bg-[#E28743] text-white border-[#E28743] shadow-xs'
                : 'bg-white text-[#8B5A2B] border-[#D4A373] hover:bg-[#FAF6F0]'
            }`}
          >
            <Star className="w-3 h-3" />
            <span>Bestsellers</span>
          </button>
        </div>

        {/* Counter & Clear Button */}
        <div className="flex items-center gap-3 text-xs text-stone-500">
          <span>
            Showing <strong>{filteredProducts.length}</strong> items
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-[#E28743] hover:underline font-bold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E8DFD5] p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#8B5A2B] mx-auto">
            <Search className="w-8 h-8 opacity-60" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-[#2C1810]">
              No menu items match your search
            </h3>
            <p className="text-xs text-[#6F4E37]">
              Try adjusting your search keywords or removing active dietary filters.
            </p>
          </div>
          <button
            onClick={clearAllFilters}
            className="px-5 py-2.5 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white text-xs font-semibold transition-colors"
          >
            Show All Menu Items
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
