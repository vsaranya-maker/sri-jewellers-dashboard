import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Plus, Percent, RefreshCw, Calendar, Trash2, Award } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';

const OfferVault = () => {
  const { offers, addOffer } = useDashboard();
  const { user } = useAuth();
  
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [type, setType] = useState('Percentage');
  const [expiryDate, setExpiryDate] = useState('');

  const generateRandomCode = () => {
    const prefixes = ['SRI', 'GOLD', 'DIAMOND', 'LUX', 'BRIDAL', 'ROYAL'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNumber = Math.floor(10 + Math.random() * 90); // 10-99
    setCode(`${randomPrefix}${randomNumber}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code || !discount || !expiryDate) return;

    addOffer({
      code: code.toUpperCase(),
      discount: Number(discount),
      type,
      status: 'Active',
      expiryDate
    });

    // Reset Form
    setCode('');
    setDiscount('');
    setExpiryDate('');
  };

  const isReadOnly = user?.role === 'Stylist';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Upper overview charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard hover className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#6B7280] uppercase tracking-widest">Active Coupons</h4>
            <p className="text-2xl font-serif font-bold text-[#111827] mt-0.5">{offers.filter(o => o.status === 'Active').length} Active</p>
          </div>
        </GlassCard>

        <GlassCard hover className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gold-light/10 border border-gold-light/20 flex items-center justify-center text-[#B331F1]">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#6B7280] uppercase tracking-widest">Average Discount</h4>
            <p className="text-2xl font-serif font-bold text-[#111827] mt-0.5">15.5% Saved</p>
          </div>
        </GlassCard>

        <GlassCard hover className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gold-dark/10 border border-gold-dark/20 flex items-center justify-center text-gold-dark">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#6B7280] uppercase tracking-widest">Campaign conversions</h4>
            <p className="text-2xl font-serif font-bold text-[#111827] mt-0.5">224 Redeemed</p>
          </div>
        </GlassCard>
      </div>

      {/* Main Campaign Builder & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Builder Form */}
        <GlassCard className="h-full">
          <div className="flex items-center space-x-2.5 mb-6">
            <Plus className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-lg font-semibold text-[#111827]">Campaign Coupon Builder</h3>
          </div>

          {isReadOnly ? (
            <div className="text-xs text-gold p-4 rounded-xl bg-gold/10 border border-gold/20 text-center">
              Stylists do not have campaign creation permissions.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] mb-1.5">Coupon Code</label>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    required 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 p-2.5 rounded-xl glass-input text-[#111827] text-sm uppercase bg-white/50 border border-gray-200 focus:outline-none focus:border-[#B331F1]"
                    placeholder="E.g., FESTIVE25"
                  />
                  <button 
                    type="button"
                    onClick={generateRandomCode}
                    className="px-3 rounded-xl border border-gold/40 hover:bg-gold/15 text-gold transition-colors flex items-center justify-center"
                    title="Generate Random Code"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] mb-1.5">Discount Value</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-[#111827] text-sm bg-white/50 border border-gray-200 focus:outline-none focus:border-[#B331F1]"
                    placeholder={type === 'Percentage' ? 'E.g., 10 (%)' : 'E.g., 500 ($)'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] mb-1.5">Discount Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-[#111827] text-sm bg-white/50 border border-gray-200 focus:outline-none focus:border-[#B331F1]"
                  >
                    <option value="Percentage" className="bg-white text-[#111827]">Percentage (%)</option>
                    <option value="Flat Rate" className="bg-white text-[#111827]">Flat Rate ($)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B7280] mb-1.5">Expiry Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    required
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-[#111827] text-sm cursor-pointer bg-white/50 border border-gray-200 focus:outline-none focus:border-[#B331F1]"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-[#B331F1] to-[#FF62BB] hover:from-[#FF62BB] hover:to-[#B331F1] text-white font-semibold tracking-wider transition-all shadow-md shadow-purple-500/10 hover:shadow-purple-500/20"
              >
                Launch Coupon Campaign
              </button>
            </form>
          )}
        </GlassCard>

        {/* Campaigns Table */}
        <GlassCard className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-lg font-semibold text-[#111827]">Active Promotional Vault</h3>
          </div>

          <div className="overflow-x-auto font-sans">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-[#6B7280] text-xs font-semibold uppercase tracking-wider">
                  <th className="pb-4">Promo Code</th>
                  <th className="pb-4">Reduction</th>
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Redeemed</th>
                  <th className="pb-4">Expires</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-[#111827]">
                {offers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-purple-500/5 transition-colors">
                    <td className="py-4 font-mono text-gold text-sm font-semibold">
                      {offer.code}
                    </td>
                    <td className="py-4 font-serif text-base font-bold text-[#111827]">
                      {offer.type === 'Percentage' ? `${offer.discount}%` : `$${offer.discount.toLocaleString()}`}
                    </td>
                    <td className="py-4 text-xs text-[#6B7280]">
                      {offer.type}
                    </td>
                    <td className="py-4 font-semibold text-[#111827]">
                      {offer.usageCount} times
                    </td>
                    <td className="py-4 text-xs text-[#6B7280]">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#B331F1]/60" />
                        <span>{offer.expiryDate}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${offer.status === 'Active' ? 'bg-[#B331F1]/10 text-[#B331F1] border-[#B331F1]/25' : 'bg-[#FF62BB]/10 text-[#FF62BB] border-[#FF62BB]/20'}`}>
                        {offer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
};

export default OfferVault;
