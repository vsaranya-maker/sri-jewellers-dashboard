import React, { useState } from 'react';
import { useAuth, AuthProvider } from './context/AuthContext';
import { useDashboard, DashboardProvider } from './context/DashboardContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CollectionStudio from './pages/CollectionStudio';
import OrderHub from './pages/OrderHub';
import CustomerLounge from './pages/CustomerLounge';
import TrendCenter from './pages/TrendCenter';
import BridalCorner from './pages/BridalCorner';
import OfferVault from './pages/OfferVault';
import GrowthInsights from './pages/GrowthInsights';
import AIStylist from './pages/AIStylist';
import ControlCenter from './pages/ControlCenter';
import GlassCard from './components/GlassCard';
import { Crown, Sparkles, KeyRound, Bot, History, X } from 'lucide-react';

const DashboardShell = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showActivityDrawer, setShowActivityDrawer] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const { activities } = useDashboard();

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard setCurrentTab={setCurrentTab} />;
      case 'collections':
        return <CollectionStudio />;
      case 'orders':
        return <OrderHub />;
      case 'customers':
        return <CustomerLounge />;
      case 'trends':
        return <TrendCenter />;
      case 'bridal':
        return <BridalCorner />;
      case 'offers':
        return <OfferVault />;
      case 'growth':
        return <GrowthInsights />;
      case 'ai-stylist':
        return <AIStylist />;
      case 'control-center':
        return <ControlCenter />;
      default:
        return <Dashboard setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
      />

      {/* Main Content Pane */}
      <div className={`
        flex-1 flex flex-col min-h-screen 
        transition-all duration-300
        ${sidebarCollapsed ? 'pl-20' : 'pl-72'}
      `}>
        {/* App Header */}
        <Header 
          currentTab={currentTab} 
          onActivityToggle={() => setShowActivityDrawer(!showActivityDrawer)} 
          onSearchChange={setGlobalSearch}
        />

        {/* View Frame */}
        <main className="flex-1 p-8 overflow-y-auto bg-transparent relative z-10">
          {renderActiveTab()}
        </main>
      </div>

      {/* Activity Drawer Sidebar */}
      {showActivityDrawer && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white border-l border-[#B331F1]/10 z-50 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-[#B331F1]/10 mb-6">
              <h3 className="font-serif text-base font-semibold text-[#111827] flex items-center">
                <History className="w-4 h-4 text-[#B331F1] mr-2" />
                System Audit Log
              </h3>
              <button 
                onClick={() => setShowActivityDrawer(false)}
                className="p-1 rounded-lg text-[#6B7280] hover:text-[#111827]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-10rem)] pr-2">
              {activities.map((a) => (
                <div key={a.id} className="text-xs p-3 rounded-lg bg-white border border-[#B331F1]/10 hover:border-[#B331F1]/30 transition-all shadow-sm">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-[#111827]">{a.user}</span>
                    <span className="text-[9px] text-[#6B7280]">{a.time}</span>
                  </div>
                  <p className="text-[#6B7280]">
                    {a.action} <span className="text-[#B331F1] font-medium">"{a.item}"</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#B331F1]/10 text-center text-[10px] text-[#6B7280] font-mono">
            Sri Audit Logs • Security Active
          </div>
        </div>
      )}
    </div>
  );
};

const LoginScreen = () => {
  const { login, error, loading } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#FFFDF0] to-[#FFFFFF]">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B331F1]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF62BB]/5 rounded-full blur-[120px] pointer-events-none" />

      <GlassCard className="w-full max-w-md p-8 relative z-10 border border-[#B331F1]/20 shadow-lg shadow-purple-500/5">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-[#B331F1] to-[#FF62BB] flex items-center justify-center shadow-lg mb-4">
            <Crown className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-widest text-[#B331F1]">SRI JEWELLERS</h1>
          <p className="text-[10px] text-[#6B7280] uppercase tracking-widest mt-1">Showroom Administrative Portal</p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 leading-normal text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wider">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-xl glass-input text-[#111827] bg-white border border-gray-200 focus:outline-none focus:border-[#B331F1] text-sm"
              placeholder="Enter credentials"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wider">Access PIN / Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 p-3 rounded-xl glass-input text-[#111827] bg-white border border-gray-200 focus:outline-none focus:border-[#B331F1] text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 mt-6 rounded-xl bg-gradient-to-r from-[#B331F1] to-[#FF62BB] hover:from-[#FF62BB] hover:to-[#B331F1] text-white font-semibold tracking-wider text-sm transition-all shadow-md shadow-purple-500/10 hover:shadow-purple-500/20 flex items-center justify-center space-x-2"
          >
            {loading ? <span>Loading Session...</span> : <span>Initiate Session</span>}
          </button>
        </form>

        {/* Demo Help Hints */}
        <div className="mt-8 pt-6 border-t border-[#B331F1]/10 text-center">
          <p className="text-[10px] text-[#6B7280] uppercase tracking-widest font-mono">Preset Showcase Logins</p>
          <div className="grid grid-cols-3 gap-2 mt-3 text-[10px] text-[#B331F1] font-semibold">
            <span className="cursor-pointer hover:underline" onClick={() => { setUsername('admin'); setPassword('admin123'); }}>admin (Admin)</span>
            <span className="cursor-pointer hover:underline" onClick={() => { setUsername('manager'); setPassword('manager123'); }}>manager (Mgr)</span>
            <span className="cursor-pointer hover:underline" onClick={() => { setUsername('stylist'); setPassword('stylist123'); }}>stylist (Stylist)</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

const MainAppContent = () => {
  const { user } = useAuth();
  return user ? <DashboardShell /> : <LoginScreen />;
};

const App = () => {
  return (
    <AuthProvider>
      <DashboardProvider>
        <MainAppContent />
      </DashboardProvider>
    </AuthProvider>
  );
};

export default App;
