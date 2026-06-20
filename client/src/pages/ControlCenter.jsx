import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, RefreshCcw, UserCheck, Eye, EyeOff, Check, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';

const ControlCenter = () => {
  const { user, updateRole } = useAuth();
  
  // Settings states
  const [jwtExp, setJwtExp] = useState('24h');
  const [mfa, setMfa] = useState(true);
  const [csrf, setCsrf] = useState(true);
  const [showKey, setShowKey] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const handleRoleChange = (role) => {
    updateRole(role);
    triggerSaveMessage(`Role updated to ${role}. Dashboard permissions updated.`);
  };

  const handleSeedReset = () => {
    if (confirm('Are you sure you want to reset all products, orders, and customer data to showroom defaults? This resets your local storage.')) {
      localStorage.removeItem('sri_products');
      localStorage.removeItem('sri_orders');
      localStorage.removeItem('sri_customers');
      localStorage.removeItem('sri_offers');
      window.location.reload();
    }
  };

  const triggerSaveMessage = (msg) => {
    setSavedMessage(msg);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8 max-w-4xl text-sm"
    >
      {/* Toast Save Message */}
      {savedMessage && (
        <div className="fixed top-8 right-8 z-50 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#B331F1] to-[#FF62BB] text-white font-semibold flex items-center space-x-2 shadow-2xl border border-purple-300/20 animate-bounce">
          <Check className="w-5 h-5" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Role Management */}
      <GlassCard>
        <div className="flex items-center space-x-2.5 mb-6">
          <UserCheck className="w-5 h-5 text-[#B331F1]" />
          <h3 className="font-serif text-lg font-semibold text-[#111827]">Executive Role Permissions</h3>
        </div>

        <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">
          Sri Jewellers utilizes role-based access control (RBAC). Switch roles below to test different permission layers instantly:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { role: 'Admin', desc: 'Full write access to Collections, order hub management, database settings, and campaign launches.' },
            { role: 'Manager', desc: 'Write access to Collections, status progression on orders, but restricted database reset.' },
            { role: 'Stylist', desc: 'Read-only catalog workspace. Restricted from adding products, updating orders, or launching coupons.' }
          ].map((r) => (
            <button
              key={r.role}
              onClick={() => handleRoleChange(r.role)}
              className={`p-4 rounded-xl border text-left transition-all ${user?.role === r.role ? 'border-[#B331F1] bg-[#B331F1]/5 shadow-md shadow-purple-500/5' : 'border-gray-200 bg-white/40 hover:bg-purple-500/5'}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`font-semibold ${user?.role === r.role ? 'text-[#111827]' : 'text-[#6B7280]'}`}>{r.role} Workspace</span>
                {user?.role === r.role && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF62BB] text-white font-bold uppercase">Active</span>
                )}
              </div>
              <p className="text-xs text-[#6B7280] leading-normal">{r.desc}</p>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* System database configs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security configs */}
        <GlassCard>
          <div className="flex items-center space-x-2.5 mb-6">
            <Shield className="w-5 h-5 text-[#B331F1]" />
            <h3 className="font-serif text-lg font-semibold text-[#111827]">Security & API Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase">JWT Signature Duration</label>
              <select
                value={jwtExp}
                onChange={(e) => {
                  setJwtExp(e.target.value);
                  triggerSaveMessage(`JWT Expiry updated to ${e.target.value}.`);
                }}
                className="w-full p-2.5 rounded-xl glass-input text-[#111827] text-sm bg-white/50 border border-gray-200 focus:outline-none focus:border-[#B331F1]"
              >
                <option value="1h" className="bg-white text-[#111827]">1 Hour (Short session)</option>
                <option value="24h" className="bg-white text-[#111827]">24 Hours (Standard session)</option>
                <option value="7d" className="bg-white text-[#111827]">7 Days (Extended session)</option>
              </select>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-white/40 border border-gray-200">
              <div>
                <p className="font-semibold text-[#111827] text-xs">Two-Factor Authentication (2FA)</p>
                <span className="text-[10px] text-[#6B7280]">Requires OTP code on executive logins</span>
              </div>
              <input 
                type="checkbox" 
                checked={mfa}
                onChange={(e) => {
                  setMfa(e.target.checked);
                  triggerSaveMessage(`MFA settings updated.`);
                }}
                className="w-4 h-4 accent-[#B331F1] cursor-pointer"
              />
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-white/40 border border-gray-200">
              <div>
                <p className="font-semibold text-[#111827] text-xs">Anti-CSRF Tokens</p>
                <span className="text-[10px] text-[#6B7280]">Enable session CSRF injection tokens</span>
              </div>
              <input 
                type="checkbox" 
                checked={csrf}
                onChange={(e) => {
                  setCsrf(e.target.checked);
                  triggerSaveMessage(`CSRF token protection ${e.target.checked ? 'enabled' : 'disabled'}.`);
                }}
                className="w-4 h-4 accent-[#B331F1] cursor-pointer"
              />
            </div>
          </div>
        </GlassCard>

        {/* Database configurations */}
        <GlassCard className="flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2.5 mb-6">
              <Database className="w-5 h-5 text-[#B331F1]" />
              <h3 className="font-serif text-lg font-semibold text-[#111827]">Database Operations</h3>
            </div>

            <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
              Sri Jewellers utilizes local persistent fallback state. If you make modifications to products, coupons, or order hubs and wish to start fresh, trigger a database seed reset below.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleSeedReset}
              className="w-full py-3.5 px-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 hover:bg-red-500/25 transition-all text-xs font-semibold flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset & Seed Default Data</span>
            </button>
            <p className="text-[10px] text-[#6B7280] text-center">WARNING: This actions deletes all custom creations.</p>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
};

export default ControlCenter;
