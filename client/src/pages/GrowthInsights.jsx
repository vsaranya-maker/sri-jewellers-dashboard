import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, Legend } from 'recharts';
import { Download, Sparkles, TrendingUp, DollarSign, Percent } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const GrowthInsights = () => {
  // Sales growth logs
  const salesHistory = [
    { month: 'Jan', online: 45000, offline: 80000 },
    { month: 'Feb', online: 52000, offline: 80000 },
    { month: 'Mar', online: 61000, offline: 80000 },
    { month: 'Apr', online: 58000, offline: 80000 },
    { month: 'May', online: 68000, offline: 80000 },
    { month: 'Jun', online: 72000, offline: 86000 },
  ];

  // Category statistics
  const categorySplit = [
    { subject: 'Bridal Corner', A: 120, B: 110, fullMark: 150 },
    { subject: 'Trendy Jewellery', A: 98, B: 130, fullMark: 150 },
    { subject: 'Earrings', A: 86, B: 130, fullMark: 150 },
    { subject: 'Necklaces', A: 99, B: 100, fullMark: 150 },
    { subject: 'Rings', A: 85, B: 90, fullMark: 150 },
    { subject: 'Couple Rings', A: 65, B: 85, fullMark: 150 },
  ];

  const barChartData = [
    { name: 'Bridal Corner', target: 120000, actual: 145000 },
    { name: 'Trendy Jewels', target: 80000, actual: 95000 },
    { name: 'Fashion Collection', target: 50000, actual: 48000 },
    { name: 'Other Gifts', target: 20000, actual: 24000 }
  ];

  const handleDownload = () => {
    alert('Generating PDF business analytics report for Sri Jewellers. Your download will begin shortly.');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Upper header report download trigger */}
      <div className="flex justify-between items-center glass-panel rounded-2xl p-6">
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#111827]">Sri Jewellers Financial Board</h3>
          <p className="text-xs text-[#6B7280] font-medium">Export performance spreadsheets and growth metrics</p>
        </div>
        <button 
          onClick={handleDownload}
          className="py-2.5 px-6 rounded-xl bg-gold text-white hover:opacity-90 font-semibold text-sm flex items-center space-x-2 transition-colors shadow-lg"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF Report</span>
        </button>
      </div>

      {/* Grid of advanced charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <GlassCard className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-serif text-lg font-semibold text-[#111827]">Online vs Showroom Growth</h4>
              <p className="text-xs text-[#6B7280]">Comparing online website sales to physical showroom revenue</p>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(179, 49, 241, 0.05)" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={11} />
                <YAxis stroke="#6B7280" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(179, 49, 241, 0.25)', borderRadius: '12px' }}
                  labelStyle={{ color: '#B331F1', fontWeight: 'bold' }}
                />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="offline" name="Physical Showroom" stroke="#B331F1" strokeWidth={2.5} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="online" name="Web Boutique" stroke="#FF62BB" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Radar Chart */}
        <GlassCard>
          <div className="mb-6">
            <h4 className="font-serif text-lg font-semibold text-[#111827]">Collection Studios split</h4>
            <p className="text-xs text-[#6B7280]">Distribution analysis across showroom collection classes</p>
          </div>
          <div className="h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={categorySplit}>
                <PolarGrid stroke="rgba(179, 49, 241, 0.05)" />
                <PolarAngleAxis dataKey="subject" stroke="#6B7280" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#6B7280" fontSize={10} />
                <Radar name="Target" dataKey="A" stroke="#FF97D0" fill="#FF97D0" fillOpacity={0.15} />
                <Radar name="Actual sales" dataKey="B" stroke="#B331F1" fill="#B331F1" fillOpacity={0.4} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(179, 49, 241, 0.25)', borderRadius: '12px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Targets actual bar chart */}
      <GlassCard>
        <div className="mb-6">
          <h4 className="font-serif text-lg font-semibold text-[#111827]">Collection Division Target Benchmarking</h4>
          <p className="text-xs text-[#6B7280]">Comparing target revenue allocations to actual sales gross</p>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(179, 49, 241, 0.05)" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={11} />
              <YAxis stroke="#6B7280" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(179, 49, 241, 0.25)', borderRadius: '12px' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="target" name="Revenue Target ($)" fill="#FBF5A7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" name="Actual Sales Gross ($)" fill="#B331F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default GrowthInsights;
