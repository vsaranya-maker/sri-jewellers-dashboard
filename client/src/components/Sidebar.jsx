import React from 'react';
import { 
  Home, 
  Gem, 
  Package, 
  Crown, 
  TrendingUp, 
  Heart, 
  Gift, 
  LineChart, 
  Bot, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ currentTab, setCurrentTab, collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'collections', label: 'Collection Studio', icon: Gem },
    { id: 'orders', label: 'Order Hub', icon: Package },
    { id: 'customers', label: 'Customer Lounge', icon: Crown },
    { id: 'trends', label: 'Trend Center', icon: TrendingUp },
    { id: 'bridal', label: 'Bridal Corner', icon: Heart },
    { id: 'offers', label: 'Offer Vault', icon: Gift },
    { id: 'growth', label: 'Growth Insights', icon: LineChart },
    { id: 'ai-stylist', label: 'AI Stylist', icon: Bot },
    { id: 'control-center', label: 'Control Center', icon: Settings },
  ];

  return (
    <aside className={`
      fixed top-0 left-0 h-screen z-30 
      glass-panel border-r border-gray-100 
      flex flex-col justify-between
      transition-all duration-300 ease-in-out
      ${collapsed ? 'w-20' : 'w-72'}
    `}>
      {/* Brand Header */}
      <div>
        <div className="h-24 flex items-center justify-between px-6 border-b border-[#B331F1]/10">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold to-[#FF62BB] flex items-center justify-center shadow-lg">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-serif text-lg font-bold tracking-wider text-gold">SRI JEWELLERS</h1>
                <p className="text-[10px] text-gold/60 uppercase tracking-widest">Luxury Dashboard</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-tr from-gold to-[#FF62BB] flex items-center justify-center shadow-lg">
              <Crown className="w-5 h-5 text-white" />
            </div>
          )}
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-1.5 rounded-lg border border-[#B331F1]/30 bg-white text-[#B331F1] hover:bg-[#B331F1]/10 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-8 px-4 space-y-1.5 flex-1 overflow-y-auto max-h-[calc(100vh-16rem)]">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`
                  w-full flex items-center py-3.5 px-4 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-gold/15 to-[#FF97D0]/5 text-gold border-l-4 border-gold shadow-md' 
                    : 'text-[#6B7280] hover:text-gold hover:bg-gold/5'
                  }
                `}
                title={collapsed ? item.label : ''}
              >
                <IconComponent className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-gold' : 'text-[#6B7280] group-hover:text-gold'}`} />
                {!collapsed && (
                  <span className="ml-4 text-sm font-medium tracking-wide">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Footer Profile & Logout */}
      <div className="p-4 border-t border-[#B331F1]/10">
        {user && !collapsed && (
          <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-white border border-[#B331F1]/15">
            <div className="flex items-center space-x-3">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full border border-gold/40 object-cover"
              />
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-[#111827] truncate">{user.name}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/10 text-gold font-medium border border-gold/20 inline-block mt-0.5">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={logout}
          className={`
            w-full flex items-center py-3.5 px-4 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-500/5 transition-colors group
          `}
          title={collapsed ? 'Log Out' : ''}
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          {!collapsed && (
            <span className="ml-4 text-sm font-medium tracking-wide">Log Out</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
