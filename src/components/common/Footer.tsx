import React from 'react';
import { Coffee, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCustomerPage, setCurrentView } = useApp();

  return (
    <footer className="bg-[#1E130D] text-[#FBF8F4] pt-14 pb-10 border-t border-[#6F4E37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E28743] flex items-center justify-center text-[#1E130D]">
                <Coffee className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold font-serif tracking-tight text-[#FBF8F4]">
                BREW &amp; BITE
              </span>
            </div>
            <p className="text-sm text-[#D4C3B3] leading-relaxed">
              "Good coffee. Great food. Your way."
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              Serving artisanal single-origin Arabica roasts, handcrafted sourdough toasts, gourmet pastas, and delicate desserts in a serene neighborhood ambiance.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" className="w-8 h-8 rounded-lg bg-[#2C1810] hover:bg-[#E28743] text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-lg bg-[#2C1810] hover:bg-[#E28743] text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-8 h-8 rounded-lg bg-[#2C1810] hover:bg-[#E28743] text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4A373]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#D4C3B3]">
              <li>
                <button
                  onClick={() => { setCustomerPage('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#E28743] transition-colors"
                >
                  Digital Menu &amp; Specials
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCustomerPage('offers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#E28743] transition-colors"
                >
                  Offers &amp; Promo Codes
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCustomerPage('rewards'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#E28743] transition-colors"
                >
                  Brew Loyalty Rewards
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCustomerPage('orders'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#E28743] transition-colors"
                >
                  Live Order Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCustomerPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#E28743] transition-colors"
                >
                  About Our Roastery
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#E28743] hover:underline transition-colors flex items-center gap-1 font-medium pt-1"
                >
                  <span>Café Staff &amp; POS Login →</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Timings */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4A373]">
              Opening Hours
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D4C3B3]">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E28743] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Monday – Friday</span>
                  <span>7:30 AM – 11:00 PM</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E28743] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Saturday – Sunday</span>
                  <span>7:00 AM – 11:30 PM (Weekend Brunch)</span>
                </div>
              </li>
              <li className="pt-1 text-[#8B5A2B]">
                <span className="inline-block px-2 py-0.5 rounded bg-[#40534C] text-emerald-200 text-[11px] font-semibold">
                  Kitchen Open Now • Ready for Orders
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4A373]">
              Visit Our Café
            </h4>
            <div className="space-y-2.5 text-xs text-[#D4C3B3]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E28743] shrink-0 mt-0.5" />
                <span>
                  124/B Heritage Boulevard, Indiranagar 100ft Road, Bengaluru, Karnataka 560038
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E28743] shrink-0" />
                <span>+91 (080) 4122-BREW / +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E28743] shrink-0" />
                <span>hello@brewandbite.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#6F4E37]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 Brew &amp; Bite Roastery &amp; Café. All rights reserved.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span className="text-[#D4A373]">FSSAI Lic: 11223344556677</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
