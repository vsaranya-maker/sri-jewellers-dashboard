import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Flame, Award, Globe, ArrowUpRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const TrendCenter = () => {
  const trendingItems = [
    {
      id: 1,
      rank: 1,
      name: 'Vows of Love Couple Rings',
      category: 'Couple Rings',
      growth: '+42%',
      orders: 84,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 2,
      rank: 2,
      name: 'Aurora Diamond Jhumkas',
      category: 'Earrings',
      growth: '+31%',
      orders: 72,
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 3,
      rank: 3,
      name: 'Royal Heritage Necklace',
      category: 'Necklaces',
      growth: '+18%',
      orders: 54,
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=400',
    }
  ];

  const seasonalTrends = [
    {
      title: 'Summer Solstice Gold',
      period: 'June - August 2026',
      description: 'Demand for minimal 18k solid gold bracelets and layered chains has increased by 54% as customers pivot to lightweight stacking styles.',
      accent: 'text-amber-400',
      badge: 'Active Summer'
    },
    {
      title: 'Monsoon Bridal Radiance',
      period: 'July - September 2026',
      description: 'Anticipated wedding spikes drive inquiries for uncut diamonds (Polki) and emerald chokers. Bridal consultations are up by 25% year-on-year.',
      accent: 'text-emerald-400',
      badge: 'Trending Bridal'
    }
  ];

  const getBadgeStyle = (badge) => {
    if (badge.includes('Summer')) return 'bg-[#FBF5A7]/30 text-[#8B6B00] border-[#FBF5A7]/60';
    return 'bg-[#FF97D0]/20 text-[#C91A7B] border-[#FF97D0]/40';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Visual Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Sentiment */}
        <GlassCard className="flex flex-col justify-between h-52">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Market Status</span>
              <h4 className="font-serif text-lg font-semibold text-[#111827] mt-1">Global Jewellery Demand</h4>
            </div>
            <Globe className="w-5 h-5 text-[#B331F1] animate-pulse" />
          </div>
          <div>
            <span className="text-3xl font-serif font-bold text-[#B331F1]">+14.2%</span>
            <p className="text-xs text-[#6B7280] mt-1">Growth in luxury gold and platinum bridal segments globally.</p>
          </div>
        </GlassCard>

        {/* Top Performer */}
        <GlassCard className="flex flex-col justify-between h-52">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Bestseller</span>
              <h4 className="font-serif text-lg font-semibold text-[#111827] mt-1">Top Category Spark</h4>
            </div>
            <Flame className="w-5 h-5 text-[#FF62BB]" />
          </div>
          <div>
            <span className="text-3xl font-serif font-bold text-[#111827]">Necklaces</span>
            <p className="text-xs text-[#6B7280] mt-1">Generates 46% of total revenue in the last 30 days.</p>
          </div>
        </GlassCard>

        {/* AI Insight */}
        <GlassCard className="flex flex-col justify-between h-52">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">AI Stylist Insight</span>
              <h4 className="font-serif text-lg font-semibold text-[#111827] mt-1">Consumer Pivot</h4>
            </div>
            <Sparkles className="w-5 h-5 text-[#FF97D0]" />
          </div>
          <div>
            <span className="text-base font-semibold text-[#B331F1]">High Personalization</span>
            <p className="text-xs text-[#6B7280] mt-1">Couple Rings search counts increased by 65%. Dynamic customized packaging is recommended.</p>
          </div>
        </GlassCard>
      </div>

      {/* Main trends layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hot list */}
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center space-x-2.5 mb-6">
            <TrendingUp className="w-5 h-5 text-[#B331F1]" />
            <h3 className="font-serif text-lg font-semibold text-[#111827]">Trending Jewellery Showcase</h3>
          </div>

          <div className="space-y-4">
            {trendingItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-4 rounded-xl bg-white/50 border border-gray-200 hover:border-[#B331F1]/30 hover:bg-[#B331F1]/5 transition-all duration-300 group shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <span className="font-serif text-2xl font-bold text-[#B331F1]/40 group-hover:text-[#B331F1] w-6">
                    0{item.rank}
                  </span>
                  
                  {/* Image */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                  />

                  <div>
                    <h4 className="text-sm font-semibold text-[#111827] group-hover:text-[#B331F1] transition-colors">{item.name}</h4>
                    <span className="text-[10px] text-[#6B7280]">{item.category}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold text-[#FF62BB] flex items-center justify-end">
                    <ArrowUpRight className="w-4 h-4 mr-0.5" />
                    {item.growth}
                  </span>
                  <span className="text-[10px] text-[#6B7280]">{item.orders} orders</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Seasonal trends */}
        <GlassCard>
          <div className="flex items-center space-x-2.5 mb-6">
            <Award className="w-5 h-5 text-[#B331F1]" />
            <h3 className="font-serif text-lg font-semibold text-[#111827]">Seasonal Forecasts</h3>
          </div>

          <div className="space-y-5">
            {seasonalTrends.map((trend, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/50 border border-gray-200 relative shadow-sm">
                <span className={`absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle(trend.badge)}`}>
                  {trend.badge}
                </span>
                <h4 className="font-serif text-base font-semibold text-[#111827]">{trend.title}</h4>
                <span className="text-[10px] text-[#6B7280]">{trend.period}</span>
                <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">{trend.description}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
};

export default TrendCenter;
