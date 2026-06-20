import React, { useState } from 'react';
import { Bell, Search, History, User, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';

const Header = ({ currentTab, onActivityToggle, onSearchChange }) => {
  const { user } = useAuth();
  const { notifications, markAllNotificationsAsRead } = useDashboard();
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = () => {
    switch (currentTab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'collections': return 'Collection Studio';
      case 'orders': return 'Order Hub';
      case 'customers': return 'Customer Lounge';
      case 'trends': return 'Trend Center';
      case 'bridal': return 'Bridal Corner';
      case 'offers': return 'Offer Vault';
      case 'growth': return 'Growth Insights';
      case 'ai-stylist': return 'AI Stylist';
      case 'control-center': return 'Control Center';
      default: return 'Sri Jewellers';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-24 px-8 border-b border-[#B331F1]/10 flex items-center justify-between relative bg-white z-20">
      {/* Title */}
      <div>
        <h2 className="font-serif text-2xl font-semibold tracking-wide text-[#111827]">
          {getPageTitle()}
        </h2>
        <p className="text-xs text-gold font-medium">Sri Jewellers Premium Analytics</p>
      </div>

      {/* Global Search and Actions */}
      <div className="flex items-center space-x-6">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search items, orders, or VIP customers..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-80 pl-10 pr-4 py-2.5 rounded-full text-sm glass-input text-[#111827] bg-white border border-gray-200"
          />
        </div>

        {/* Activity Feed Toggle */}
        <button 
          onClick={onActivityToggle}
          className="p-2.5 rounded-full border border-[#B331F1]/20 hover:bg-[#B331F1]/5 hover:border-[#B331F1]/40 text-[#6B7280] hover:text-[#B331F1] transition-all duration-300 relative group"
          title="Activity Timeline"
        >
          <History className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-full border border-[#B331F1]/20 hover:bg-[#B331F1]/5 hover:border-[#B331F1]/40 text-[#6B7280] hover:text-[#B331F1] transition-all duration-300 relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF62BB] text-white text-[10px] font-bold flex items-center justify-center border border-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-96 rounded-2xl bg-white border border-[#B331F1]/30 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <h3 className="font-semibold text-sm text-[#111827] flex items-center">
                  Notifications
                  <span className="ml-2 text-[10px] bg-[#B331F1]/10 text-[#B331F1] border border-[#B331F1]/25 px-2 py-0.5 rounded-full">
                    {unreadCount} New
                  </span>
                </h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={() => {
                      markAllNotificationsAsRead();
                      setShowNotifications(false);
                    }}
                    className="text-xs text-[#B331F1] hover:underline flex items-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              <div className="mt-3 space-y-2 max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-xs text-[#6B7280] py-4 text-center">No notifications available</p>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={`p-2.5 rounded-xl border transition-colors ${n.read ? 'bg-white border-gray-100' : 'bg-[#B331F1]/5 border-[#B331F1]/10 hover:bg-[#B331F1]/10'}`}
                    >
                      <div className="flex justify-between items-start">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          n.type === 'order' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                          n.type === 'stock' ? 'bg-[#FBF5A7]/30 text-[#8B6B00] border-[#FBF5A7]/60' :
                          'bg-emerald-100 text-emerald-700 border-emerald-200'
                        }`}>
                          {n.type}
                        </span>
                        <span className="text-[9px] text-[#6B7280]">{n.time}</span>
                      </div>
                      <p className="text-xs text-[#111827] mt-1.5 leading-relaxed">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Details */}
        {user && (
          <div className="flex items-center space-x-3.5 pl-4 border-l border-[#B331F1]/20">
            <div className="hidden lg:block text-right">
              <h4 className="text-sm font-semibold text-[#111827] tracking-wide">{user.name}</h4>
              <p className="text-[10px] font-medium text-gold/80 tracking-widest uppercase">{user.role}</p>
            </div>
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-11 h-11 rounded-full border border-gold/50 shadow-md object-cover"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
