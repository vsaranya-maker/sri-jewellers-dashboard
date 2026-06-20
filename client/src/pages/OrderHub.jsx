import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, RotateCcw, DollarSign, ExternalLink, RefreshCw } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';

const OrderHub = () => {
  const { orders, updateOrderStatus } = useDashboard();
  const { user } = useAuth();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <RefreshCw className="w-4 h-4 text-[#8B6B00] animate-spin-slow" />;
      case 'Shipped': return <Truck className="w-4 h-4 text-[#C91A7B]" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4 text-[#B331F1]" />;
      case 'Returned': return <RotateCcw className="w-4 h-4 text-[#FF62BB]" />;
      default: return <Package className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-[#FBF5A7]/40 text-[#8B6B00] border-[#FBF5A7]/80';
      case 'Shipped':
        return 'bg-[#FF97D0]/20 text-[#C91A7B] border-[#FF97D0]/40';
      case 'Delivered':
        return 'bg-[#B331F1]/10 text-[#B331F1] border-[#B331F1]/25';
      case 'Returned':
        return 'bg-[#FF62BB]/10 text-[#FF62BB] border-[#FF62BB]/20';
      default:
        return 'bg-gray-100 text-[#6B7280] border-gray-200';
    }
  };

  const getPaymentBadge = (status) => {
    return status === 'Paid' 
      ? 'bg-[#B331F1]/10 text-[#B331F1] border-[#B331F1]/25'
      : status === 'Refunded'
        ? 'bg-[#FF62BB]/10 text-[#FF62BB] border-[#FF62BB]/20'
        : 'bg-[#FBF5A7]/40 text-[#8B6B00] border-[#FBF5A7]/80';
  };

  const handleNextStatus = (order) => {
    if (order.status === 'Pending') {
      updateOrderStatus(order.id, 'Shipped');
    } else if (order.status === 'Shipped') {
      updateOrderStatus(order.id, 'Delivered');
    }
  };

  const handleProcessReturn = (order) => {
    updateOrderStatus(order.id, 'Returned');
  };

  const isReadOnly = user?.role === 'Stylist';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Metrics mini Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard hover className="py-4 px-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest">Pending Orders</p>
            <h4 className="text-2xl font-serif font-bold text-[#111827] mt-1">
              {orders.filter(o => o.status === 'Pending').length}
            </h4>
          </div>
          <RefreshCw className="w-8 h-8 text-[#B331F1]" />
        </GlassCard>

        <GlassCard hover className="py-4 px-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest">In Transit</p>
            <h4 className="text-2xl font-serif font-bold text-[#111827] mt-1">
              {orders.filter(o => o.status === 'Shipped').length}
            </h4>
          </div>
          <Truck className="w-8 h-8 text-[#FF62BB]" />
        </GlassCard>

        <GlassCard hover className="py-4 px-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest">Completed Delivery</p>
            <h4 className="text-2xl font-serif font-bold text-[#111827] mt-1">
              {orders.filter(o => o.status === 'Delivered').length}
            </h4>
          </div>
          <CheckCircle className="w-8 h-8 text-[#FF97D0]" />
        </GlassCard>

        <GlassCard hover className="py-4 px-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest">Return/Refunds</p>
            <h4 className="text-2xl font-serif font-bold text-[#111827] mt-1">
              {orders.filter(o => o.status === 'Returned').length}
            </h4>
          </div>
          <RotateCcw className="w-8 h-8 text-[#B331F1]" />
        </GlassCard>
      </div>

      {/* Main Order Registry */}
      <GlassCard className="overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#111827]">Order Registry Hub</h3>
            <p className="text-xs text-[#6B7280] font-medium">Log showing all showroom and digital purchases</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-[#6B7280] text-xs font-semibold uppercase tracking-wider">
                <th className="pb-4">Order ID</th>
                <th className="pb-4">VIP Customer</th>
                <th className="pb-4">Items / Luxury Selection</th>
                <th className="pb-4">Total Price</th>
                <th className="pb-4">Payment Status</th>
                <th className="pb-4">Order Status</th>
                {!isReadOnly && <th className="pb-4 text-center">Progress Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-[#111827]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gold/5 transition-colors">
                  <td className="py-4 font-mono text-[#B331F1] text-xs">
                    {order.id}
                  </td>
                  <td className="py-4">
                    <div>
                      <p className="text-[#111827] font-semibold">{order.customerName}</p>
                      <span className="text-[10px] text-[#6B7280] font-normal">{order.customerEmail}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="space-y-1">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="text-xs">
                          {item.productName} <span className="text-gold">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 font-serif text-base font-semibold text-[#111827]">
                    ${order.total.toLocaleString()}
                  </td>
                  <td className="py-4">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getPaymentBadge(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border flex items-center space-x-1.5 ${getStatusBadge(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </span>
                    </div>
                    {order.trackingNumber && (
                      <div className="text-[10px] text-gray-500 font-mono mt-1 flex items-center space-x-1">
                        <span>{order.trackingNumber}</span>
                        <ExternalLink className="w-2.5 h-2.5 cursor-pointer hover:text-gold" />
                      </div>
                    )}
                  </td>
                  
                  {!isReadOnly && (
                    <td className="py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        {(order.status === 'Pending' || order.status === 'Shipped') && (
                          <button
                            onClick={() => handleNextStatus(order)}
                            className="py-1.5 px-3 rounded-lg bg-gold/15 text-gold border border-gold/30 hover:bg-gold/30 text-xs transition-colors"
                          >
                            {order.status === 'Pending' ? 'Ship Package' : 'Complete Delivery'}
                          </button>
                        )}
                        {order.status === 'Delivered' && (
                          <button
                            onClick={() => handleProcessReturn(order)}
                            className="py-1.5 px-3 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/25 text-xs transition-colors"
                          >
                            Flag Return
                          </button>
                        )}
                        {(order.status === 'Returned' || order.status === 'Delivered') && (
                          <span className="text-xs text-gray-500 italic py-1.5">No actions</span>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default OrderHub;
