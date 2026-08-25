import React from 'react';
import { motion } from 'motion/react';
import {
  Coffee,
  Heart,
  Award,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Mail,
  Wifi,
  Dog,
  Zap,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutPage: React.FC = () => {
  const { setCustomerPage } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* Hero Heading */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E28743]">
          Our Craft &amp; Heritage
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2C1810] leading-tight">
          Where Artisanal Coffee Meets Soulful Food
        </h1>
        <p className="text-sm sm:text-base text-[#6F4E37] leading-relaxed">
          Founded on the principle that exceptional coffee and honest, handcrafted food belong together in a space that feels like home.
        </p>
      </div>

      {/* Main Image Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-16/9 sm:aspect-21/9 bg-stone-100">
        <img
          src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80"
          alt="Brew & Bite Café Atmosphere"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E28743]">
            Since 2021 • Indiranagar, Bengaluru
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold">
            The Brew &amp; Bite Experience
          </h3>
        </div>
      </div>

      {/* Story 2-Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-xs sm:text-sm text-[#5C4033] leading-relaxed">
          <h2 className="text-2xl font-serif font-bold text-[#2C1810]">
            Directly from Shade-Grown Hills to Your Cup
          </h2>
          <p>
            Every morning at 6:00 AM, our roasters begin profiling Arabica beans sourced directly from certified estates in Chikmagalur and Coorg. We roast in micro-batches to preserve delicate tasting notes of cocoa, berries, and spiced caramel.
          </p>
          <p>
            Our kitchen runs on the same uncompromising philosophy: sourdough loaves fermented for 36 hours, free-range eggs, house-made marinara simmered for hours, and desserts baked fresh every morning without artificial preservatives.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCustomerPage('menu')}
              className="px-6 py-2.5 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white font-bold text-xs transition-colors"
            >
              Taste the Menu
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl overflow-hidden shadow-sm aspect-square bg-stone-100 border border-[#E8DFD5]">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80"
              alt="Pour over coffee"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm aspect-square bg-stone-100 border border-[#E8DFD5] mt-6">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80"
              alt="Artisanal food"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Café Amenities / Highlights */}
      <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-10 border border-[#E8DFD5] space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h3 className="font-serif font-bold text-2xl text-[#2C1810]">
            Designed for Your Comfort
          </h3>
          <p className="text-xs text-[#6F4E37]">
            Whether you are here for deep work, brunch with friends, or a quick espresso on the go.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              title: '300 Mbps Wi-Fi',
              desc: 'High-speed fiber for seamless remote work & meetings.',
              icon: <Wifi className="w-5 h-5 text-[#E28743]" />,
            },
            {
              title: 'Pet Friendly Patio',
              desc: 'Lush outdoor garden where your furry friends are always welcome.',
              icon: <Dog className="w-5 h-5 text-[#E28743]" />,
            },
            {
              title: 'Power at Every Booth',
              desc: 'Universal outlets and USB-C ports at every dining table.',
              icon: <Zap className="w-5 h-5 text-[#E28743]" />,
            },
            {
              title: 'Private Meeting Nook',
              desc: 'Dedicated 6-seater booth for collaborative teams and quiet discussions.',
              icon: <Users className="w-5 h-5 text-[#E28743]" />,
            },
          ].map((am, i) => (
            <div key={i} className="p-4 bg-white rounded-2xl border border-[#E8DFD5] space-y-2 text-center">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center mx-auto">
                {am.icon}
              </div>
              <h4 className="font-bold text-xs text-[#2C1810]">{am.title}</h4>
              <p className="text-[11px] text-stone-500 leading-tight">{am.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
