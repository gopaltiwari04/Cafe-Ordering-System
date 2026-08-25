import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Heart,
  Award,
  ShieldCheck,
  Save,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';

export const AccountPage: React.FC = () => {
  const {
    customerProfile,
    setCustomerProfile,
    loyaltyPoints,
    savedAddresses,
    favorites,
    menuItems,
    showToast,
    setCustomerPage,
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formName, setFormName] = useState(customerProfile.name);
  const [formPhone, setFormPhone] = useState(customerProfile.phone);
  const [formEmail, setFormEmail] = useState(customerProfile.email);

  const favoriteItems = menuItems.filter((i) => favorites.includes(i.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerProfile({
      name: formName,
      phone: formPhone,
      email: formEmail,
    });
    setIsEditing(false);
    showToast('Customer profile updated successfully', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E28743]">
          Customer Portal
        </span>
        <h1 className="text-3xl font-serif font-bold text-[#2C1810]">
          My Profile &amp; Preferences
        </h1>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl border border-[#E8DFD5] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F2ECE4]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#2C1810] text-[#E28743] font-serif font-bold text-2xl flex items-center justify-center shadow-inner">
              {customerProfile.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#2C1810]">
                {customerProfile.name}
              </h2>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Guest Account
              </span>
            </div>
          </div>

          <div className="bg-[#FAF6F0] px-4 py-2.5 rounded-2xl border border-[#E8DFD5] flex items-center gap-3">
            <Award className="w-6 h-6 text-[#E28743]" />
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-500 block">
                Loyalty Balance
              </span>
              <strong className="text-sm font-mono text-[#2C1810]">
                {loyaltyPoints} Points
              </strong>
            </div>
          </div>
        </div>

        {/* Profile Details Form */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2C1810] uppercase mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#E8DFD5] bg-[#FBF8F4]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2C1810] uppercase mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#E8DFD5] bg-[#FBF8F4]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2C1810] uppercase mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#E8DFD5] bg-[#FBF8F4]"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl border border-[#E8DFD5] text-xs font-semibold text-[#2C1810]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white text-xs font-bold transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5C4033]">
            <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#E8DFD5]">
              <span className="text-[10px] uppercase font-bold text-[#8B5A2B] block mb-1">
                Full Name
              </span>
              <p className="font-semibold text-sm text-[#2C1810] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-stone-400" />
                {customerProfile.name}
              </p>
            </div>

            <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#E8DFD5]">
              <span className="text-[10px] uppercase font-bold text-[#8B5A2B] block mb-1">
                Phone Number
              </span>
              <p className="font-semibold text-sm text-[#2C1810] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                {customerProfile.phone}
              </p>
            </div>

            <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#E8DFD5]">
              <span className="text-[10px] uppercase font-bold text-[#8B5A2B] block mb-1">
                Email Address
              </span>
              <p className="font-semibold text-sm text-[#2C1810] flex items-center gap-1.5 truncate">
                <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="truncate">{customerProfile.email}</span>
              </p>
            </div>

            <div className="sm:col-span-3 flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-[#E28743] hover:underline font-bold"
              >
                Edit Contact Details
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Saved Delivery Addresses */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-[#2C1810] flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#E28743]" />
          <span>Saved Addresses</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedAddresses.map((addr) => (
            <div
              key={addr.id}
              className="p-4 bg-white rounded-2xl border border-[#E8DFD5] shadow-xs space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs uppercase px-2 py-0.5 rounded-full bg-[#FAF6F0] text-[#8B5A2B] border border-[#E8DFD5]">
                  {addr.title}
                </span>
                {addr.isDefault && (
                  <span className="text-[10px] text-emerald-700 font-bold">
                    Default
                  </span>
                )}
              </div>
              <p className="text-xs text-[#5C4033] leading-relaxed">
                {addr.address}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Favorites Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-serif text-[#2C1810] flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span>My Favorite Dishes ({favoriteItems.length})</span>
          </h2>
          <button
            onClick={() => setCustomerPage('menu')}
            className="text-xs text-[#8B5A2B] hover:underline font-bold"
          >
            Explore Menu
          </button>
        </div>

        {favoriteItems.length === 0 ? (
          <div className="p-8 bg-white rounded-2xl border border-[#E8DFD5] text-center text-xs text-[#6F4E37]">
            You haven't saved any favorites yet. Tap the heart icon on any menu card to bookmark your favorites!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
