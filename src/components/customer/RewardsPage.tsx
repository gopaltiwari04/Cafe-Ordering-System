import React from 'react';
import { motion } from 'motion/react';
import {
  Gift,
  Coffee,
  Sparkles,
  Award,
  Tag,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RewardItem } from '../../types';

export const RewardsPage: React.FC = () => {
  const {
    loyaltyPoints,
    rewards,
    redeemReward,
    setIsCartDrawerOpen,
    setCustomerPage,
  } = useApp();

  // Next reward calculation
  const nextReward = rewards.find((r) => r.pointsRequired > loyaltyPoints) || rewards[rewards.length - 1];
  const pointsToNext = Math.max(0, nextReward.pointsRequired - loyaltyPoints);
  const progressPercent = Math.min(100, (loyaltyPoints / nextReward.pointsRequired) * 100);

  const handleRedeem = (reward: RewardItem) => {
    const success = redeemReward(reward);
    if (success) {
      setIsCartDrawerOpen(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E28743]">
          Loyalty &amp; Perks
        </span>
        <h1 className="text-3xl font-serif font-bold text-[#2C1810]">
          BREW REWARDS
        </h1>
        <p className="text-xs sm:text-sm text-[#6F4E37]">
          Earn 1 Brew Point for every ₹10 spent. Unlock complimentary single-origin brews, signature desserts, and instant bill vouchers.
        </p>
      </div>

      {/* Points Card Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#2C1810] via-[#4A2818] to-[#1E130D] p-6 sm:p-8 text-[#FBF8F4] border border-[#6F4E37]/50 shadow-xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#E28743] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Gold Tier Member
              </span>
              <span className="text-xs text-[#D4C3B3]">Rohan Sharma</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight">
                {loyaltyPoints.toLocaleString()}
              </span>
              <span className="text-sm font-bold text-[#D4A373] uppercase tracking-wider">
                Brew Points
              </span>
            </div>
            <p className="text-xs text-[#D4C3B3] max-w-md">
              {pointsToNext > 0
                ? `You're just ${pointsToNext} points away from unlocking "${nextReward.title}"!`
                : 'You have unlocked top-tier rewards! Treat yourself.'}
            </p>
          </div>

          <div className="w-full md:w-64 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="flex justify-between text-xs text-[#D4C3B3] font-medium">
              <span>Next Milestone</span>
              <span className="font-mono text-white font-bold">{nextReward.pointsRequired} pts</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#E28743] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-stone-400 block text-right">
              {progressPercent.toFixed(0)}% completed
            </span>
          </div>
        </div>
      </div>

      {/* Rewards Catalog */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-[#2C1810]">
          Redeemable Rewards Catalog
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((rew) => {
            const isUnlocked = loyaltyPoints >= rew.pointsRequired;

            return (
              <div
                key={rew.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                  isUnlocked
                    ? 'bg-white border-[#E28743]/50 shadow-sm hover:shadow-md'
                    : 'bg-[#FAF6F0] border-[#E8DFD5] opacity-75'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      isUnlocked
                        ? 'bg-[#2C1810] text-[#E28743]'
                        : 'bg-[#E8DFD5] text-stone-400'
                    }`}
                  >
                    {rew.iconName === 'Coffee' ? (
                      <Coffee className="w-6 h-6" />
                    ) : rew.iconName === 'Sparkles' ? (
                      <Sparkles className="w-6 h-6" />
                    ) : rew.iconName === 'Tag' ? (
                      <Tag className="w-6 h-6" />
                    ) : (
                      <Award className="w-6 h-6" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-[#2C1810]">
                        {rew.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#6F4E37] leading-relaxed">
                      {rew.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F2ECE4] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#8B5A2B]">
                    <span>Requires:</span>
                    <strong className="text-[#2C1810] text-sm">
                      {rew.pointsRequired} pts
                    </strong>
                  </div>

                  {isUnlocked ? (
                    <button
                      onClick={() => handleRedeem(rew)}
                      className="px-4 py-2 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E28743]" />
                      <span>Redeem Voucher</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-stone-400 font-medium">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How to Earn More */}
      <div className="bg-[#FAF6F0] p-6 rounded-3xl border border-[#E8DFD5] space-y-3">
        <h3 className="font-serif font-bold text-lg text-[#2C1810] flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#E28743]" />
          <span>Ways to Earn Brew Points</span>
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5C4033] pt-1">
          <li className="p-3 bg-white rounded-xl border border-[#E8DFD5]">
            <strong className="block text-[#2C1810] mb-0.5">Order Food &amp; Coffee</strong>
            <span>Earn 1 point for every ₹10 spent online or at tables.</span>
          </li>
          <li className="p-3 bg-white rounded-xl border border-[#E8DFD5]">
            <strong className="block text-[#2C1810] mb-0.5">Rate Your Orders</strong>
            <span>Get +20 bonus points on leaving 5-star kitchen feedback.</span>
          </li>
          <li className="p-3 bg-white rounded-xl border border-[#E8DFD5]">
            <strong className="block text-[#2C1810] mb-0.5">Weekend Double Points</strong>
            <span>Enjoy 2x points multiplier on all weekend dine-in brunches.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
