import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ShieldCheck, DollarSign, RefreshCw, Layers } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const BridalCorner = () => {
  // Configurator selections
  const [necklace, setNecklace] = useState('royal'); // royal, floral, minimal
  const [earring, setEarring] = useState('heavy'); // heavy, drop, jhumka
  const [bangleCount, setBangleCount] = useState(4); // 2, 4, 8
  const [includeWaistbelt, setIncludeWaistbelt] = useState(false);

  // Pricing details
  const pricing = {
    necklace: { royal: 8500, floral: 5200, minimal: 3500 },
    earring: { heavy: 2400, drop: 1800, jhumka: 1200 },
    banglePrice: 800, // per pair
    waistbelt: 4200
  };

  const calculateTotal = () => {
    let price = pricing.necklace[necklace] + pricing.earring[earring];
    price += (bangleCount / 2) * pricing.banglePrice;
    if (includeWaistbelt) price += pricing.waistbelt;
    return price;
  };

  const getNecklaceLabel = () => {
    if (necklace === 'royal') return 'Royal Heritage Kundan Choker (22k)';
    if (necklace === 'floral') return 'Eternal Floral Rose Gold Set (18k)';
    return 'Classic Leaflet Gold Chain Set (22k)';
  };

  const getEarringLabel = () => {
    if (earring === 'heavy') return 'Grand Chandbali Diamond Drops';
    if (earring === 'drop') return 'Minimal Emerald Danglers';
    return 'Traditional Jhumka Earrings';
  };

  const packages = [
    {
      name: 'Vedic Splendor Bridal Pack',
      price: 15500,
      description: 'The ultimate royal compilation including the Grand Kundan Choker, matching Chandbalis, and 8 Gold Kadas.',
      saving: 'Save $1,200',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400',
      tag: 'Bestseller'
    },
    {
      name: 'Modern Grace Platinum Set',
      price: 12800,
      description: 'A contemporary platinum arrangement containing the Diamond Solitaire Necklace and drop earrings.',
      saving: 'Save $800',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400',
      tag: 'Exclusive'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest font-mono">Bridal Revenue</span>
            <h4 className="text-2xl font-serif font-bold text-[#111827] mt-1">$68,400</h4>
            <p className="text-[10px] text-[#B331F1] font-semibold mt-1">▲ 15% growth this month</p>
          </div>
          <Heart className="w-8 h-8 text-[#B331F1]" />
        </GlassCard>

        <GlassCard className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest font-mono">Custom Inquiries</span>
            <h4 className="text-2xl font-serif font-bold text-[#111827] mt-1">42 Booked</h4>
            <p className="text-[10px] text-[#6B7280] mt-1">Consultation requests</p>
          </div>
          <Sparkles className="w-8 h-8 text-[#FF62BB]" />
        </GlassCard>

        <GlassCard className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest font-mono">Avg Pack Value</span>
            <h4 className="text-2xl font-serif font-bold text-[#111827] mt-1">$14,200</h4>
            <p className="text-[10px] text-[#B331F1] font-semibold mt-1">Premium customizations</p>
          </div>
          <Layers className="w-8 h-8 text-[#B331F1]" />
        </GlassCard>
      </div>

      {/* Interactive Bridal Studio customizer & Packages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customizer */}
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center space-x-2.5 mb-6">
            <Heart className="w-5 h-5 text-[#B331F1]" />
            <h3 className="font-serif text-lg font-semibold text-[#111827]">Custom Bridal Package Architect</h3>
          </div>

          <div className="space-y-6 text-sm text-[#111827]">
            {/* Necklace selection */}
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] mb-2 uppercase tracking-wider">1. Select Centerpiece Necklace</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button 
                  onClick={() => setNecklace('royal')}
                  className={`p-3 rounded-xl border text-left transition-all ${necklace === 'royal' ? 'border-[#B331F1] bg-[#B331F1]/5' : 'border-gray-200 bg-white/40'}`}
                >
                  <p className={`font-semibold ${necklace === 'royal' ? 'text-[#111827]' : 'text-[#6B7280]'}`}>Royal Kundan Choker</p>
                  <span className="text-xs text-[#B331F1] font-bold mt-1 inline-block">$8,500</span>
                </button>
                <button 
                  onClick={() => setNecklace('floral')}
                  className={`p-3 rounded-xl border text-left transition-all ${necklace === 'floral' ? 'border-[#B331F1] bg-[#B331F1]/5' : 'border-gray-200 bg-white/40'}`}
                >
                  <p className={`font-semibold ${necklace === 'floral' ? 'text-[#111827]' : 'text-[#6B7280]'}`}>Floral Rose Gold</p>
                  <span className="text-xs text-[#B331F1] font-bold mt-1 inline-block">$5,200</span>
                </button>
                <button 
                  onClick={() => setNecklace('minimal')}
                  className={`p-3 rounded-xl border text-left transition-all ${necklace === 'minimal' ? 'border-[#B331F1] bg-[#B331F1]/5' : 'border-gray-200 bg-white/40'}`}
                >
                  <p className={`font-semibold ${necklace === 'minimal' ? 'text-[#111827]' : 'text-[#6B7280]'}`}>Leaflet Gold Set</p>
                  <span className="text-xs text-[#B331F1] font-bold mt-1 inline-block">$3,500</span>
                </button>
              </div>
            </div>

            {/* Earring selection */}
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] mb-2 uppercase tracking-wider">2. Select Bridal Earrings</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button 
                  onClick={() => setEarring('heavy')}
                  className={`p-3 rounded-xl border text-left transition-all ${earring === 'heavy' ? 'border-[#B331F1] bg-[#B331F1]/5' : 'border-gray-200 bg-white/40'}`}
                >
                  <p className={`font-semibold ${earring === 'heavy' ? 'text-[#111827]' : 'text-[#6B7280]'}`}>Grand Chandbalis</p>
                  <span className="text-xs text-[#B331F1] font-bold mt-1 inline-block">$2,400</span>
                </button>
                <button 
                  onClick={() => setEarring('drop')}
                  className={`p-3 rounded-xl border text-left transition-all ${earring === 'drop' ? 'border-[#B331F1] bg-[#B331F1]/5' : 'border-gray-200 bg-white/40'}`}
                >
                  <p className={`font-semibold ${earring === 'drop' ? 'text-[#111827]' : 'text-[#6B7280]'}`}>Emerald Danglers</p>
                  <span className="text-xs text-[#B331F1] font-bold mt-1 inline-block">$1,800</span>
                </button>
                <button 
                  onClick={() => setEarring('jhumka')}
                  className={`p-3 rounded-xl border text-left transition-all ${earring === 'jhumka' ? 'border-[#B331F1] bg-[#B331F1]/5' : 'border-gray-200 bg-white/40'}`}
                >
                  <p className={`font-semibold ${earring === 'jhumka' ? 'text-[#111827]' : 'text-[#6B7280]'}`}>Traditional Jhumkas</p>
                  <span className="text-xs text-[#B331F1] font-bold mt-1 inline-block">$1,200</span>
                </button>
              </div>
            </div>

            {/* Bangles count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] mb-2 uppercase tracking-wider">3. Bangles Selection</label>
                <select
                  value={bangleCount}
                  onChange={(e) => setBangleCount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl glass-input text-[#111827] text-sm bg-white/50 border border-gray-200 focus:outline-none focus:border-[#B331F1]"
                >
                  <option value={2} className="bg-white text-[#111827]">2 Bangles (1 Pair) - $800</option>
                  <option value={4} className="bg-white text-[#111827]">4 Bangles (2 Pairs) - $1,600</option>
                  <option value={8} className="bg-white text-[#111827]">8 Bangles (4 Pairs) - $3,200</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B7280] mb-2 uppercase tracking-wider">4. Waistbelt (Oddiyanam) Add-on</label>
                <div className="flex items-center space-x-3 h-[46px] px-3.5 rounded-xl bg-white/40 border border-gray-200 text-[#111827]">
                  <input 
                    type="checkbox" 
                    id="waistbelt"
                    checked={includeWaistbelt}
                    onChange={(e) => setIncludeWaistbelt(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#B331F1] cursor-pointer"
                  />
                  <label htmlFor="waistbelt" className="text-sm font-semibold cursor-pointer select-none">
                    Add 22k Gold Waistbelt (+$4,200)
                  </label>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Pricing Summary */}
        <GlassCard className="flex flex-col justify-between h-full border border-[#B331F1]/25 shadow-lg shadow-purple-500/5">
          <div>
            <div className="pb-4 border-b border-gray-200 text-center">
              <span className="text-[10px] font-bold text-[#B331F1] uppercase tracking-widest font-mono">Custom Pack Invoice</span>
              <h3 className="font-serif text-2xl font-bold text-[#111827] mt-1">Sri Custom Bridal Set</h3>
            </div>

            <div className="mt-6 space-y-4 text-xs text-[#6B7280]">
              <div className="flex justify-between items-start">
                <span className="font-semibold text-[#111827]">Necklace:</span>
                <span className="text-right text-[#6B7280] max-w-[150px] truncate">{getNecklaceLabel()}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-semibold text-[#111827]">Earrings:</span>
                <span className="text-right text-[#6B7280]">{getEarringLabel()}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-semibold text-[#111827]">Bangles:</span>
                <span className="text-[#6B7280]">{bangleCount} Gold Bangles</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-semibold text-[#111827]">Waistbelt:</span>
                <span className="text-[#6B7280]">{includeWaistbelt ? 'Included' : 'None'}</span>
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-sm font-semibold">
                <span className="text-[#111827]">Estimated Total:</span>
                <span className="text-lg text-[#FF62BB] font-bold font-serif">${calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <button 
              onClick={() => alert(`Consultation request saved for bridal package total: $${calculateTotal().toLocaleString()}`)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B331F1] to-[#FF62BB] hover:from-[#FF62BB] hover:to-[#B331F1] text-white font-semibold text-sm transition-all shadow-md shadow-purple-500/10 hover:shadow-purple-500/20"
            >
              Book Consultation
            </button>
            <p className="text-[10px] text-[#6B7280] text-center flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B331F1]" />
              <span>Sri Trust Guarantee: Authenticity Certification</span>
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Packages list */}
      <GlassCard>
        <h3 className="font-serif text-lg font-semibold text-[#111827] mb-6">Signature Preset Bridal Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map((pack, idx) => (
            <div key={idx} className="flex flex-col md:flex-row rounded-xl overflow-hidden bg-white/50 border border-gray-200 group hover:border-[#B331F1]/50 transition-all duration-300 shadow-sm">
              <div className="w-full md:w-40 h-40 relative flex-shrink-0">
                <img src={pack.image} alt={pack.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-2.5 left-2.5 text-[9px] font-bold bg-[#B331F1] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {pack.tag}
                </span>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#111827] group-hover:text-[#B331F1] transition-colors">{pack.name}</h4>
                  <p className="text-xs text-[#6B7280] mt-1">{pack.description}</p>
                </div>
                <div className="flex justify-between items-baseline mt-4">
                  <span className="text-lg font-serif font-bold text-[#B331F1]">${pack.price.toLocaleString()}</span>
                  <span className="text-[10px] font-bold text-[#8B6B00] bg-[#FBF5A7]/40 px-2 py-0.5 rounded-full uppercase tracking-widest">{pack.saving}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default BridalCorner;
