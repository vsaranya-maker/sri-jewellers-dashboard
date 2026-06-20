import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldAlert, Sparkles, UserPlus, Gift, TrendingUp } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';

const CustomerLounge = () => {
  const { customers, addLoyaltyPoints } = useDashboard();
  const { user } = useAuth();

  const getTierBadgeColor = (tier) => {
    switch (tier) {
      case 'Platinum': return 'bg-[#B331F1]/10 text-[#B331F1] border-[#B331F1]/25';
      case 'Gold': return 'bg-[#FF62BB]/10 text-[#FF62BB] border-[#FF62BB]/20';
      case 'White': return 'bg-white text-gray-800 border-gray-300 shadow-sm';
      default: return 'bg-gray-100 text-gray-400 border-gray-200';
    }
  };

  const getSegmentColor = (segment) => {
    switch (segment) {
      case 'VIP': return 'bg-[#B331F1]/15 text-[#B331F1] border-[#B331F1]/30';
      case 'Loyal': return 'bg-[#FF62BB]/15 text-[#FF62BB] border-[#FF62BB]/30';
      case 'Regular': return 'bg-[#FF97D0]/20 text-[#C91A7B] border-[#FF97D0]/40';
      case 'Slipping': return 'bg-[#FBF5A7]/40 text-[#8B6B00] border-[#FBF5A7]/70';
      default: return 'bg-gray-100 text-gray-400 border-gray-200';
    }
  };

  const handleRewardPoints = (customerId) => {
    addLoyaltyPoints(customerId, 100);
  };

  const isReadOnly = user?.role === 'Stylist';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Analytics Insights Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard hover className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-[#FF97D0]/20 border border-[#FF97D0]/40 flex items-center justify-center text-[#C91A7B]">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#6B7280] uppercase tracking-widest">VIP Client Segment</h4>
            <p className="text-2xl font-serif font-bold text-[#111827] mt-0.5">38% VIPs</p>
          </div>
        </GlassCard>

        <GlassCard hover className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-[#B331F1]/10 border border-[#B331F1]/20 flex items-center justify-center text-[#B331F1]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#6B7280] uppercase tracking-widest">Loyalty Points Issued</h4>
            <p className="text-2xl font-serif font-bold text-[#111827] mt-0.5">82,450 Points</p>
          </div>
        </GlassCard>

        <GlassCard hover className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#6B7280] uppercase tracking-widest">Customer Lifetime Value</h4>
            <p className="text-2xl font-serif font-bold text-[#111827] mt-0.5">$6,480 Average</p>
          </div>
        </GlassCard>
      </div>

      {/* Main Customers List */}
      <GlassCard>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#111827]">VIP Club & Loyalty Lounge</h3>
            <p className="text-xs text-[#6B7280]">Manage client profiles, spend analytics, and premium tier classifications</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-[#6B7280] text-xs font-semibold uppercase tracking-wider">
                <th className="pb-4">Client</th>
                <th className="pb-4">Loyalty Tier</th>
                <th className="pb-4">Points Balance</th>
                <th className="pb-4">Total Purchases</th>
                <th className="pb-4">Engagement Index</th>
                <th className="pb-4">Status</th>
                {!isReadOnly && <th className="pb-4 text-center">Reward Loyalty</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-[#111827]">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-purple-500/5 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center space-x-3.5">
                      <img 
                        src={c.avatar} 
                        alt={c.name} 
                        className="w-10 h-10 rounded-full border border-purple-500/30 object-cover"
                      />
                      <div>
                        <p className="text-[#111827] font-semibold">{c.name}</p>
                        <span className="text-[10px] text-[#6B7280] font-normal">{c.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${getTierBadgeColor(c.tier)}`}>
                      {c.tier}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-[#B331F1]" />
                      <span className="text-[#111827] font-semibold">{c.loyaltyPoints}</span>
                    </div>
                  </td>
                  <td className="py-4 font-serif text-base font-bold text-[#111827]">
                    ${c.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-4">
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${getSegmentColor(c.segment)}`}>
                      {c.segment}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${c.status === 'Active' ? 'bg-[#B331F1]/10 text-[#B331F1] border-[#B331F1]/20' : 'bg-[#FF62BB]/10 text-[#FF62BB] border-[#FF62BB]/20'}`}>
                      {c.status}
                    </span>
                  </td>
                  
                  {!isReadOnly && (
                    <td className="py-4 text-center">
                      <button
                        onClick={() => handleRewardPoints(c.id)}
                        className="py-1.5 px-3 rounded-lg bg-[#B331F1]/10 text-[#B331F1] border border-[#B331F1]/30 hover:bg-[#B331F1]/20 text-xs transition-colors flex items-center justify-center space-x-1.5 mx-auto"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>+100 Points</span>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default CustomerLounge;
