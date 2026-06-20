import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Activity, 
  ArrowUpRight, 
  Plus, 
  Tag, 
  Wand2 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useDashboard } from '../context/DashboardContext';
import GlassCard from '../components/GlassCard';

const Dashboard = ({ setCurrentTab }) => {
  const { products, orders, customers, activities } = useDashboard();

  // Dynamic calculations based on state
  const totalRevenue = orders
    .filter(o => o.status !== 'Returned')
    .reduce((sum, o) => sum + o.total, 0) + 145000; // Base baseline revenue for scale

  const totalOrders = orders.length + 382; // Baseline orders
  const activeCustomers = customers.length + 154; // Baseline customers

  // Recharts Chart Data
  const revenueData = [
    { name: 'Jan', revenue: 125000 },
    { name: 'Feb', revenue: 132000 },
    { name: 'Mar', revenue: 141000 },
    { name: 'Apr', revenue: 138000 },
    { name: 'May', revenue: 148000 },
    { name: 'Jun', revenue: totalRevenue },
  ];

  const orderDistributionData = [
    { name: 'Pending', count: orders.filter(o => o.status === 'Pending').length + 5 },
    { name: 'Shipped', count: orders.filter(o => o.status === 'Shipped').length + 12 },
    { name: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length + 84 },
    { name: 'Returned', count: orders.filter(o => o.status === 'Returned').length + 3 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* 4 Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard hover className="relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest">Total Revenue</p>
              <h3 className="text-3xl font-serif font-bold text-[#111827] mt-1.5">${totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-all duration-300">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-1.5 text-xs text-gold-dark font-medium">
            <ArrowUpRight className="w-4 h-4" />
            <span>+12.4% from last month</span>
          </div>
        </GlassCard>

        <GlassCard hover className="relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest">Total Orders</p>
              <h3 className="text-3xl font-serif font-bold text-[#111827] mt-1.5">{totalOrders}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gold-dark/10 border border-gold-dark/20 flex items-center justify-center text-gold-dark group-hover:bg-gold-dark/20 transition-all duration-300">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-1.5 text-xs text-gold font-medium">
            <ArrowUpRight className="w-4 h-4" />
            <span>+8.2% from last week</span>
          </div>
        </GlassCard>

        <GlassCard hover className="relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest">Active VIPs</p>
              <h3 className="text-3xl font-serif font-bold text-[#111827] mt-1.5">{activeCustomers}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FF97D0]/20 border border-[#FF97D0]/40 flex items-center justify-center text-gold-dark group-hover:bg-[#FF97D0]/30 transition-all duration-300">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-1.5 text-xs text-[#FF62BB] font-medium">
            <ArrowUpRight className="w-4 h-4" />
            <span>+4.1% customer growth</span>
          </div>
        </GlassCard>

        <GlassCard hover className="relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest">Bridal Conversion</p>
              <h3 className="text-3xl font-serif font-bold text-[#111827] mt-1.5">24.5%</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gold-light/40 border border-gold-light/70 flex items-center justify-center text-gold group-hover:bg-gold-light/60 transition-all duration-300">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-1.5 text-xs text-gold font-medium">
            <ArrowUpRight className="w-4 h-4" />
            <span>Highest conversion in rings</span>
          </div>
        </GlassCard>
      </div>

      {/* Grid for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart */}
        <GlassCard className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-serif text-lg font-semibold text-[#111827]">Revenue Performance</h4>
              <p className="text-xs text-[#6B7280]">Monthly gross sales trends</p>
            </div>
            <span className="text-xs font-semibold bg-gold/15 text-gold border border-gold/20 px-3 py-1 rounded-full">
              H1 2026
            </span>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B331F1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FF97D0" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(179, 49, 241, 0.05)" />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={11} />
                <YAxis stroke="#6B7280" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(179, 49, 241, 0.25)', borderRadius: '12px' }}
                  labelStyle={{ color: '#B331F1', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#B331F1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Order Status Distribution Bar Chart */}
        <GlassCard>
          <div className="mb-6">
            <h4 className="font-serif text-lg font-semibold text-[#111827]">Order Statuses</h4>
            <p className="text-xs text-[#6B7280]">Status logs for active sales</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(179, 49, 241, 0.05)" />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={11} />
                <YAxis stroke="#6B7280" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(179, 49, 241, 0.25)', borderRadius: '12px' }}
                  labelStyle={{ color: '#B331F1', fontWeight: 'bold' }}
                />
                <Bar dataKey="count" fill="#B331F1" radius={[8, 8, 0, 0]} maxBarSize={40}>
                  {orderDistributionData.map((entry, index) => {
                    const colors = ['#B331F1', '#FF62BB', '#FF97D0', '#FBF5A7'];
                    return <rect key={`rect-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Quick Actions & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <GlassCard className="h-full flex flex-col justify-between">
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#111827] mb-4">Quick Executive Actions</h4>
            <div className="space-y-3">
              <button 
                onClick={() => setCurrentTab('collections')}
                className="w-full py-3.5 px-4 rounded-xl glass-panel-gold hover:bg-gold/10 flex items-center justify-between text-left group transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Plus className="w-5 h-5 text-gold" />
                  <span className="text-sm font-semibold text-[#111827]">Add Jewellery Item</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gold/60 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>

              <button 
                onClick={() => setCurrentTab('offers')}
                className="w-full py-3.5 px-4 rounded-xl bg-white border border-[#B331F1]/15 hover:bg-[#B331F1]/5 flex items-center justify-between text-left group transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Tag className="w-5 h-5 text-gold" />
                  <span className="text-sm font-semibold text-[#111827]">Launch Promo Coupon</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#B331F1] group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>

              <button 
                onClick={() => setCurrentTab('ai-stylist')}
                className="w-full py-3.5 px-4 rounded-xl bg-white border border-[#B331F1]/15 hover:bg-[#B331F1]/5 flex items-center justify-between text-left group transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Wand2 className="w-5 h-5 text-gold-dark" />
                  <span className="text-sm font-semibold text-[#111827]">Generate AI Description</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#B331F1] group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-[#B331F1]/5 border border-[#B331F1]/15 text-center">
            <span className="text-xs text-[#B331F1] font-semibold">✨ Sri Jewellers Premium Loyalty System active.</span>
          </div>
        </GlassCard>

        {/* Recent Activities Timeline */}
        <GlassCard className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-serif text-lg font-semibold text-[#111827]">Live Activity Feed</h4>
              <p className="text-xs text-[#6B7280]">Recent workspace movements</p>
            </div>
            <Activity className="w-5 h-5 text-gold" />
          </div>

          <div className="space-y-4">
            {activities.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-[#B331F1]/5 border border-transparent hover:border-[#B331F1]/10 transition-all duration-200">
                <div className="w-2.5 h-2.5 rounded-full bg-gold mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(179,49,241,0.6)]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#6B7280] leading-normal">
                    <span className="font-semibold text-[#111827] mr-1.5">{activity.user}</span>
                    {activity.action}
                    <span className="font-medium text-gold ml-1.5">"{activity.item}"</span>
                  </p>
                  <span className="text-[10px] text-[#6B7280] mt-1 inline-block">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
};

export default Dashboard;
