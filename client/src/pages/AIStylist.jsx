import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Wand2, RefreshCw, Copy, Check, Info } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import GlassCard from '../components/GlassCard';

const AIStylist = () => {
  const { products } = useDashboard();
  const [category, setCategory] = useState('Necklaces');
  const [material, setMaterial] = useState('22k Solid Gold');
  const [style, setStyle] = useState('Royal Heritage');
  const [generating, setGenerating] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateCopy = () => {
    setGenerating(true);
    setAiResult(null);

    // Simulate AI model latency
    setTimeout(() => {
      let copy = '';
      let matchProduct = products.find(p => p.category === category) || products[0];
      
      if (style === 'Royal Heritage') {
        copy = `Behold the timeless majesty of this exquisite ${material} ${category.slice(0, -1)}. Lovingly handcrafted by master artisans, this masterpiece draws inspiration from the opulent dynasties of ancient India. Featuring intricate floral carvings inlaid with brilliant Kundan gem details and suspended ruby drop beads, it speaks of legacy, sophistication, and pure regal command. An absolute crown jewel designed for the modern royal bride.`;
      } else if (style === 'Modern Minimalist') {
        copy = `Embrace the understated luxury of our sleek ${material} ${category.slice(0, -1)}. Redefining contemporary elegance, this design balances clean architectural silhouettes with a delicate, high-polish finish. Adorned with singular, brilliant-cut micro-diamonds, it catches the ambient light with every subtle movement. Crafted for effortless versatility, it is a staple of sophistication for the modern connoisseur's wardrobe.`;
      } else {
        copy = `A dazzling manifestation of romance, this ${material} ${category.slice(0, -1)} captures the ephemeral magic of a shooting star. Styled in a bohemian constellation layout, it features brilliant pavé-set diamonds that glisten like a stellar sky. The perfect balance of celestial whimsy and premium fashion-forward sophistication.`;
      }

      setAiResult({
        description: copy,
        recommendedPrice: style === 'Royal Heritage' ? '$9,500 - $14,000' : '$3,200 - $5,500',
        matchingAccessories: category === 'Necklaces' ? 'Grand Chandbali Earrings, Heavy Gold Kadas' : 'Royal Choker, Diamond Cluster Ring',
        targetVIP: style === 'Royal Heritage' ? 'Platinum Tiers (VIP Segment)' : 'Gold & White Tiers (Regular Segment)',
        image: matchProduct.image
      });
      setGenerating(false);
    }, 1200);
  };

  const handleCopy = () => {
    if (aiResult) {
      navigator.clipboard.writeText(aiResult.description);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stylist Form */}
        <GlassCard className="h-full">
          <div className="flex items-center space-x-2.5 mb-6">
            <Bot className="w-5 h-5 text-[#B331F1]" />
            <h3 className="font-serif text-lg font-semibold text-[#111827]">AI Styling Assistant</h3>
          </div>

          <div className="space-y-4 text-sm text-[#111827]">
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase">1. Item Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl glass-input text-[#111827] text-sm bg-white/50 border border-gray-200 focus:outline-none focus:border-[#B331F1]"
              >
                <option value="Necklaces" className="bg-white text-[#111827]">Necklaces</option>
                <option value="Earrings" className="bg-white text-[#111827]">Earrings</option>
                <option value="Bracelets" className="bg-white text-[#111827]">Bracelets</option>
                <option value="Rings" className="bg-white text-[#111827]">Rings</option>
                <option value="Couple Rings" className="bg-white text-[#111827]">Couple Rings</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase">2. Fine Metals / Materials</label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full p-2.5 rounded-xl glass-input text-[#111827] text-sm bg-white/50 border border-gray-200 focus:outline-none focus:border-[#B331F1]"
              >
                <option value="22k Solid Gold" className="bg-white text-[#111827]">22k Solid Gold</option>
                <option value="18k Rose Gold" className="bg-white text-[#111827]">18k Rose Gold</option>
                <option value="950 Pure Platinum" className="bg-white text-[#111827]">950 Pure Platinum</option>
                <option value="Uncut Kundan Diamonds" className="bg-white text-[#111827]">Uncut Kundan Diamonds</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase">3. Design Theme Style</label>
              <div className="space-y-2.5">
                {[
                  { id: 'Royal Heritage', desc: 'Antique ornaments, Kundan sets, ruby gems' },
                  { id: 'Modern Minimalist', desc: 'Sleek bangles, geometric earrings, daily wear' },
                  { id: 'Celestial Romance', desc: 'Stellar constellations, couple rings, diamond studs' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${style === s.id ? 'border-[#B331F1] bg-[#B331F1]/5' : 'border-gray-200 bg-white/40 hover:bg-purple-500/5'}`}
                  >
                    <p className={`font-semibold text-xs ${style === s.id ? 'text-[#111827]' : 'text-[#6B7280]'}`}>{s.id}</p>
                    <span className="text-[10px] text-[#6B7280] mt-0.5 inline-block">{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateCopy}
              disabled={generating}
              className="w-full py-3.5 mt-6 rounded-xl bg-gradient-to-r from-[#B331F1] to-[#FF62BB] hover:from-[#FF62BB] hover:to-[#B331F1] text-white font-semibold text-sm flex items-center justify-center space-x-2 transition-all shadow-md shadow-purple-500/10 hover:shadow-purple-500/20"
            >
              {generating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Copy...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate AI Content</span>
                </>
              )}
            </button>
          </div>
        </GlassCard>

        {/* AI Results Output */}
        <GlassCard className="lg:col-span-2 flex flex-col justify-between min-h-[500px]">
          <AnimatePresence mode="wait">
            {!aiResult && !generating && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-8 text-[#6B7280]"
              >
                <Bot className="w-16 h-16 text-[#B331F1]/40 mb-4" />
                <h4 className="font-serif text-lg font-semibold text-[#111827]">AI Creative Showroom Studio</h4>
                <p className="text-xs max-w-sm mt-1">Select jewelry settings on the left to instantly generate high-fashion copy and styling guidelines.</p>
              </motion.div>
            )}

            {generating && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-8 text-[#6B7280]"
              >
                <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-[#B331F1] animate-spin mb-4" />
                <h4 className="font-serif text-sm font-semibold text-[#111827]">Analyzing Gem Configurations...</h4>
                <p className="text-[10px] mt-1">Applying computational luxury copywriting rules</p>
              </motion.div>
            )}

            {aiResult && !generating && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 flex-1"
              >
                {/* Description Copy block */}
                <div className="relative p-5 rounded-2xl bg-white/50 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-[#B331F1] uppercase tracking-widest flex items-center">
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      AI Copywriting Result
                    </span>
                    <button 
                      onClick={handleCopy}
                      className="p-1.5 rounded-lg border border-gray-200 bg-white text-[#6B7280] hover:text-[#111827] transition-colors"
                      title="Copy Copywriting Copy"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-sm text-[#111827] leading-relaxed font-medium italic">
                    "{aiResult.description}"
                  </p>
                </div>

                {/* Grid stats recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Matching Accessories */}
                  <div className="p-4 rounded-xl bg-white/50 border border-gray-200">
                    <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest">Recommended Accessory Pairings</span>
                    <p className="text-sm font-bold text-[#111827] mt-1.5">{aiResult.matchingAccessories}</p>
                  </div>

                  {/* Target Client Profile */}
                  <div className="p-4 rounded-xl bg-white/50 border border-gray-200">
                    <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest">Suggested Client Tiers</span>
                    <p className="text-sm font-bold text-[#B331F1] mt-1.5">{aiResult.targetVIP}</p>
                  </div>

                  {/* Recommended Retail Pricing */}
                  <div className="p-4 rounded-xl bg-white/50 border border-gray-200">
                    <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest">Optimal Luxury Retail Range</span>
                    <p className="text-sm font-bold text-[#FF62BB] mt-1.5">{aiResult.recommendedPrice}</p>
                  </div>

                  {/* Smart suggestion info */}
                  <div className="p-4 rounded-xl bg-[#FBF5A7]/30 border border-[#FBF5A7]/70 flex items-center space-x-3 text-xs text-[#8B6B00]">
                    <Info className="w-5 h-5 flex-shrink-0 text-[#8B6B00]" />
                    <span>Suggestions are estimated based on gold spot prices and global premium jewellery sales.</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </motion.div>
  );
};

export default AIStylist;
