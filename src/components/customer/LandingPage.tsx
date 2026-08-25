import React from 'react';
import { motion } from 'motion/react';
import {
  Coffee,
  ArrowRight,
  Sparkles,
  Flame,
  Award,
  Clock,
  MapPin,
  Star,
  Gift,
  ShieldCheck,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';

export const LandingPage: React.FC = () => {
  const { setCustomerPage, menuItems, setSelectedCategory } = useApp();

  const featuredItems = menuItems.filter((i) => i.isBestseller).slice(0, 4);
  const breakfastSpecials = menuItems.filter((i) => i.category === 'Breakfast' || i.category === 'Coffee').slice(0, 4);

  const reviews = [
    {
      name: 'Aarav Nair',
      role: 'Regular Coffee Enthusiast',
      rating: 5,
      comment:
        'The Artisan Cappuccino paired with their Avocado Toast on sourdough is hands down the best morning routine in town. Smooth ordering experience too!',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    },
    {
      name: 'Meera Sengupta',
      role: 'Food Blogger',
      rating: 5,
      comment:
        'Ordered via the Table QR code during Sunday brunch. Fast preparation, piping hot Woodfired Margherita pizza, and seamless digital receipt tracking.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    },
    {
      name: 'Karan Malhotra',
      role: 'Remote Software Lead',
      rating: 5,
      comment:
        'Brew & Bite is my go-to workspace. High-speed Wi-Fi, single-origin pour overs, and the loyalty points actually unlock free coffee fast!',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 sm:space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E28743]/10 border border-[#E28743]/30 text-[#8B5A2B] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#E28743]" />
                <span>Single-Origin Roasts &amp; Gourmet Dining</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2C1810] tracking-tight leading-[1.1]">
                  Your favorite café, <br />
                  <span className="text-[#E28743] italic">just a few taps away.</span>
                </h1>
                <p className="text-base sm:text-lg text-[#6F4E37] max-w-xl leading-relaxed">
                  "Good coffee. Great food. Your way." Freshly roasted single-origin espresso, artisanal sourdough sandwiches, woodfired pizzas, and decadent desserts.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => {
                    setCustomerPage('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 sm:px-8 py-3.5 rounded-2xl bg-[#2C1810] hover:bg-[#E28743] text-[#FBF8F4] font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 active:scale-95"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setCustomerPage('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 sm:px-8 py-3.5 rounded-2xl bg-white hover:bg-[#F2ECE4] text-[#2C1810] font-bold text-sm sm:text-base border border-[#E8DFD5] shadow-sm transition-all flex items-center gap-2"
                >
                  <Coffee className="w-4 h-4 text-[#E28743]" />
                  <span>View Full Menu</span>
                </button>
              </div>

              {/* Mini Highlights bar */}
              <div className="pt-4 border-t border-[#E8DFD5] grid grid-cols-3 gap-4 text-xs text-[#5C4033]">
                <div>
                  <strong className="block font-serif text-lg sm:text-xl font-bold text-[#2C1810]">
                    100%
                  </strong>
                  <span>Arabica Beans</span>
                </div>
                <div>
                  <strong className="block font-serif text-lg sm:text-xl font-bold text-[#2C1810]">
                    &lt; 15 mins
                  </strong>
                  <span>Average Prep Time</span>
                </div>
                <div>
                  <strong className="block font-serif text-lg sm:text-xl font-bold text-[#2C1810]">
                    4.9 ★
                  </strong>
                  <span>Over 2,500+ Reviews</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main hero image card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
                    alt="Brew & Bite Café Interior & Coffee"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <span className="text-xs uppercase tracking-widest text-[#E28743] font-bold">
                      Signature Experience
                    </span>
                    <h3 className="text-xl font-serif font-bold">
                      Artisan Roastery &amp; Bakery
                    </h3>
                    <p className="text-xs text-stone-300">
                      Crafted with passion, roasted fresh daily in Bengaluru.
                    </p>
                  </div>
                </div>

                {/* Floating mini badge: Today's special */}
                <div className="absolute -top-4 -left-4 bg-white p-3.5 rounded-2xl shadow-xl border border-[#E8DFD5] flex items-center gap-3 animate-bounce duration-1000">
                  <div className="w-10 h-10 rounded-xl bg-[#E28743] text-white flex items-center justify-center font-bold">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block">
                      Today's Special
                    </span>
                    <strong className="text-xs text-[#2C1810] block">
                      Nitro Cold Brew • ₹220
                    </strong>
                  </div>
                </div>

                {/* Floating mini badge: Table QR ready */}
                <div className="absolute -bottom-4 -right-4 bg-[#2C1810] text-[#FBF8F4] p-3.5 rounded-2xl shadow-xl border border-[#6F4E37] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#40534C] text-emerald-300 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#D4A373] font-bold block">
                      Dine-In Ready
                    </span>
                    <strong className="text-xs block">
                      Scan Table QR &amp; Order
                    </strong>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. PROMOTIONAL OFFER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#2C1810] via-[#4A2818] to-[#2C1810] p-6 sm:p-10 text-white shadow-xl overflow-hidden border border-[#6F4E37]/40">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="bg-[#E28743] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                Limited Time Welcome Offer
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FBF8F4]">
                Get 10% OFF Your First Online or Table Order!
              </h2>
              <p className="text-xs sm:text-sm text-[#D4C3B3] max-w-xl">
                Use code <strong className="text-[#E28743] font-mono font-bold">WELCOME10</strong> during checkout to unlock instant savings on your fresh coffee &amp; gourmet food.
              </p>
            </div>

            <button
              onClick={() => {
                setCustomerPage('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-[#E28743] hover:bg-[#c67434] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all shrink-0 active:scale-95 flex items-center gap-2"
            >
              <span>Claim Discount Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. POPULAR & FEATURED DISHES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E28743]">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C1810] mt-1">
              Customer Favorites &amp; Bestsellers
            </h2>
            <p className="text-xs sm:text-sm text-[#6F4E37]">
              Handpicked delicacies loved by our daily coffee patrons.
            </p>
          </div>

          <button
            onClick={() => {
              setCustomerPage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm font-bold text-[#8B5A2B] hover:text-[#2C1810] flex items-center gap-1 group"
          >
            <span>Explore All 10 Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-[#FAF6F0] py-14 border-y border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E28743]">
              Effortless Dining
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C1810]">
              How Digital Ordering Works
            </h2>
            <p className="text-xs sm:text-sm text-[#6F4E37]">
              Order seamlessly whether you are sitting at Table 12, on the go for takeaway, or relaxing at home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: '01',
                title: 'Browse & Customize',
                description: 'Explore single-origin roasts, artisan bread sandwiches, and customize milk, syrups, & toppings to taste.',
                icon: <Coffee className="w-6 h-6 text-[#E28743]" />,
              },
              {
                step: '02',
                title: 'Choose Dine-In or Takeaway',
                description: 'Select your Table number for instant table service or choose Takeaway / Doorstep Delivery with live tracking.',
                icon: <Clock className="w-6 h-6 text-[#E28743]" />,
              },
              {
                step: '03',
                title: 'Live Tracking & Rewards',
                description: 'Watch the kitchen prepare your ticket in real-time and automatically earn Brew Points toward free drinks.',
                icon: <Gift className="w-6 h-6 text-[#E28743]" />,
              },
            ].map((st) => (
              <div
                key={st.step}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFD5] shadow-xs relative space-y-4"
              >
                <span className="font-mono font-bold text-3xl text-[#E8DFD5] absolute top-6 right-6">
                  {st.step}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] flex items-center justify-center">
                  {st.icon}
                </div>
                <h3 className="font-serif font-bold text-lg text-[#2C1810]">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6F4E37] leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REVIEWS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E28743]">
            Community Love
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C1810]">
            Loved by Coffee Enthusiasts &amp; Foodies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-[#E8DFD5] shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#5C4033] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#F2ECE4]">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover bg-stone-100"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#2C1810] leading-tight">
                    {rev.name}
                  </h4>
                  <span className="text-[11px] text-[#8B5A2B]">{rev.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CAFÉ LOCATION & HOURS OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E130D] text-[#FBF8F4] rounded-3xl p-6 sm:p-10 border border-[#6F4E37]/40 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E28743]/20 text-[#E28743] text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Indiranagar, Bengaluru</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FBF8F4]">
              Visit Our Artisanal Sanctuary
            </h2>
            <p className="text-xs sm:text-sm text-[#D4C3B3] leading-relaxed">
              Step into a calm haven filled with the aroma of freshly ground Arabica beans, sunlit window booths, lush patio greenery, and soulful acoustic jazz.
            </p>

            <div className="space-y-2 text-xs text-[#D4C3B3] pt-2">
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E28743]" />
                <span>Mon – Sun: 7:30 AM – 11:30 PM (Kitchen Open)</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E28743]" />
                <span>124/B Heritage Boulevard, Indiranagar 100ft Road, Bengaluru</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setCustomerPage('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-[#E28743] hover:bg-[#c67434] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Order Ahead for Pickup or Dine-In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border-2 border-stone-700 shadow-xl h-64 sm:h-72 bg-stone-800 relative">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
              alt="Brew & Bite Café Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl text-xs text-white flex items-center justify-between">
              <span>📍 124/B Indiranagar, Bengaluru</span>
              <span className="text-emerald-400 font-bold">● Open Now</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
