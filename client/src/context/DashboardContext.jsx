import React, { createContext, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext();

// Elegant Seed Data for Sri Jewellers
const initialProducts = [
  {
    id: 'prod-1',
    name: 'Eternal Rose Bridal Set',
    category: 'Bridal Jewellery',
    collection: 'Bridal Corner',
    price: 12500,
    stock: 5,
    rating: 4.9,
    description: 'A breathtaking 22k gold bridal set featuring intricate floral engravings, brilliant diamonds, and hanging ruby beads.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400',
    sales: 12,
  },
  {
    id: 'prod-2',
    name: 'Royal Heritage Necklace',
    category: 'Necklaces',
    collection: 'Trendy Jewellery',
    price: 8900,
    stock: 8,
    rating: 4.8,
    description: 'An antique Kundan necklace set with matching earrings, inspired by royal Indian heritage.',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=400',
    sales: 24,
  },
  {
    id: 'prod-3',
    name: 'Aurora Diamond Jhumkas',
    category: 'Earrings',
    collection: 'Fashion Jewellery',
    price: 3200,
    stock: 15,
    rating: 4.7,
    description: 'Exquisite diamond drop earrings featuring a traditional jhumka silhouette with a modern geometric twist.',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=400',
    sales: 45,
  },
  {
    id: 'prod-4',
    name: 'Golden Grace Bangle',
    category: 'Bracelets',
    collection: 'Trendy Jewellery',
    price: 4500,
    stock: 10,
    rating: 4.6,
    description: 'Crafted in 18k solid gold, this sleek luxury bangle is designed for everyday elegance.',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=400',
    sales: 32,
  },
  {
    id: 'prod-5',
    name: 'Vows of Love Couple Rings',
    category: 'Couple Rings',
    collection: 'Trendy Jewellery',
    price: 6800,
    stock: 12,
    rating: 4.9,
    description: 'Matching platinum couple rings adorned with singular brilliant-cut diamonds, representing eternal commitment.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400',
    sales: 18,
  }
];

const initialOrders = [
  {
    id: 'ord-1021',
    customerName: 'Meera Sharma',
    customerEmail: 'meera.s@gmail.com',
    items: [{ productName: 'Eternal Rose Bridal Set', quantity: 1, price: 12500 }],
    total: 12500,
    status: 'Delivered',
    paymentStatus: 'Paid',
    date: '2026-06-15',
    trackingNumber: 'TRK983742918',
  },
  {
    id: 'ord-1022',
    customerName: 'Arjun Verma',
    customerEmail: 'arjun.v@yahoo.com',
    items: [{ productName: 'Aurora Diamond Jhumkas', quantity: 2, price: 3200 }],
    total: 6400,
    status: 'Shipped',
    paymentStatus: 'Paid',
    date: '2026-06-17',
    trackingNumber: 'TRK283479102',
  },
  {
    id: 'ord-1023',
    customerName: 'Priya Patel',
    customerEmail: 'priya.p@outlook.com',
    items: [{ productName: 'Royal Heritage Necklace', quantity: 1, price: 8900 }],
    total: 8900,
    status: 'Pending',
    paymentStatus: 'Pending',
    date: '2026-06-18',
    trackingNumber: 'TRK182390847',
  },
  {
    id: 'ord-1024',
    customerName: 'Rohan Kapoor',
    customerEmail: 'rohan.k@gmail.com',
    items: [{ productName: 'Golden Grace Bangle', quantity: 1, price: 4500 }],
    total: 4500,
    status: 'Returned',
    paymentStatus: 'Refunded',
    date: '2026-06-10',
    trackingNumber: 'TRK582098471',
  }
];

const initialCustomers = [
  {
    id: 'cust-1',
    name: 'Meera Sharma',
    email: 'meera.s@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    loyaltyPoints: 1250,
    tier: 'Platinum',
    segment: 'VIP',
    totalSpent: 24500,
    status: 'Active',
  },
  {
    id: 'cust-2',
    name: 'Arjun Verma',
    email: 'arjun.v@yahoo.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    loyaltyPoints: 640,
    tier: 'Gold',
    segment: 'Loyal',
    totalSpent: 12800,
    status: 'Active',
  },
  {
    id: 'cust-3',
    name: 'Priya Patel',
    email: 'priya.p@outlook.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
    loyaltyPoints: 890,
    tier: 'Gold',
    segment: 'Regular',
    totalSpent: 8900,
    status: 'Active',
  },
  {
    id: 'cust-4',
    name: 'Rohan Kapoor',
    email: 'rohan.k@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    loyaltyPoints: 450,
    tier: 'White',
    segment: 'Slipping',
    totalSpent: 4500,
    status: 'Inactive',
  }
];

const initialOffers = [
  {
    id: 'off-1',
    code: 'FESTIVE10',
    discount: 10,
    type: 'Percentage',
    status: 'Active',
    usageCount: 84,
    expiryDate: '2026-08-31',
  },
  {
    id: 'off-2',
    code: 'BRIDALVIP',
    discount: 1500,
    type: 'Flat Rate',
    status: 'Active',
    usageCount: 12,
    expiryDate: '2026-07-15',
  },
  {
    id: 'off-3',
    code: 'GOLDEN20',
    discount: 20,
    type: 'Percentage',
    status: 'Expired',
    usageCount: 120,
    expiryDate: '2026-05-31',
  }
];

export const DashboardProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const local = localStorage.getItem('sri_products');
    return local ? JSON.parse(local) : initialProducts;
  });

  const [orders, setOrders] = useState(() => {
    const local = localStorage.getItem('sri_orders');
    return local ? JSON.parse(local) : initialOrders;
  });

  const [customers, setCustomers] = useState(() => {
    const local = localStorage.getItem('sri_customers');
    return local ? JSON.parse(local) : initialCustomers;
  });

  const [offers, setOffers] = useState(() => {
    const local = localStorage.getItem('sri_offers');
    return local ? JSON.parse(local) : initialOffers;
  });

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'order', message: 'New order #1023 received from Priya Patel (Total: $8,900)', read: false, time: '2 mins ago' },
    { id: 2, type: 'stock', message: 'Eternal Rose Bridal Set is low on stock (Only 5 left)', read: false, time: '1 hour ago' },
    { id: 3, type: 'return', message: 'Return request approved for order #1024', read: true, time: '1 day ago' },
  ]);

  const [activities, setActivities] = useState([
    { id: 1, user: 'Admin Sarah', action: 'added a new product to Collection Studio', item: 'Aurora Diamond Jhumkas', time: '10 mins ago' },
    { id: 2, user: 'Manager Raj', action: 'updated the status of order #1022 to', item: 'Shipped', time: '40 mins ago' },
    { id: 3, user: 'Stylist Priya', action: 'generated a new description for', item: 'Royal Heritage Necklace', time: '2 hours ago' },
    { id: 4, user: 'System', action: 'completed automated customer segmentation analysis', item: 'Customer Lounge', time: '4 hours ago' }
  ]);

  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Sync state to LocalStorage as a persistent fallback
  useEffect(() => {
    localStorage.setItem('sri_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sri_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sri_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('sri_offers', JSON.stringify(offers));
  }, [offers]);

  // Attempt to sync with Express API
  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const testConnection = async () => {
      try {
        const res = await fetch(`${API_URL}/health`);
        if (res.ok) {
          setIsBackendConnected(true);
          // Fetch remote data
          fetchData();
        }
      } catch (e) {
        setIsBackendConnected(false);
      }
    };
    testConnection();
  }, []);

  const fetchData = async () => {
    try {
      const pRes = await fetch(`${API_URL}/products`);
      if (pRes.ok) setProducts(await pRes.json());

      const oRes = await fetch(`${API_URL}/orders`);
      if (oRes.ok) setOrders(await oRes.json());

      const cRes = await fetch(`${API_URL}/customers`);
      if (cRes.ok) setCustomers(await cRes.json());

      const offRes = await fetch(`${API_URL}/offers`);
      if (offRes.ok) setOffers(await offRes.json());
    } catch (e) {
      console.warn('Backend sync failed. Running in fallback client-only mode.');
    }
  };

  // Product CRUD
  const addProduct = async (product) => {
    const newProduct = {
      ...product,
      id: `prod-${Date.now()}`,
      sales: 0,
      rating: 4.5,
    };
    setProducts(prev => [newProduct, ...prev]);
    addActivity('Admin', 'added a new product', newProduct.name);

    if (isBackendConnected) {
      try {
        await fetch(`${API_URL}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct)
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const updateProduct = async (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    addActivity('Admin', 'updated product details for', updatedProduct.name);

    if (isBackendConnected) {
      try {
        await fetch(`${API_URL}/products/${updatedProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProduct)
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const deleteProduct = async (id) => {
    const prodName = products.find(p => p.id === id)?.name || id;
    setProducts(prev => prev.filter(p => p.id !== id));
    addActivity('Admin', 'deleted product', prodName);

    if (isBackendConnected) {
      try {
        await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Order CRUD/Updates
  const updateOrderStatus = async (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    addActivity('Manager', `updated status of order ${orderId} to`, status);

    // Update low stock if order completed
    if (status === 'Delivered') {
      const order = orders.find(o => o.id === orderId);
      if (order && order.items) {
        order.items.forEach(item => {
          setProducts(prevProducts => prevProducts.map(p => {
            if (p.name === item.productName) {
              const newStock = Math.max(0, p.stock - item.quantity);
              if (newStock <= 3) {
                addNotification('stock', `${p.name} is low on stock (${newStock} left)`);
              }
              return { ...p, stock: newStock, sales: p.sales + item.quantity };
            }
            return p;
          }));
        });
      }
    }

    if (isBackendConnected) {
      try {
        await fetch(`${API_URL}/orders/${orderId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Customer Loyalty updates
  const addLoyaltyPoints = (customerId, points) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const newPoints = c.loyaltyPoints + points;
        let newTier = c.tier;
        if (newPoints >= 1000) newTier = 'Platinum';
        else if (newPoints >= 500) newTier = 'Gold';
        else if (newPoints >= 200) newTier = 'White';
        return { ...c, loyaltyPoints: newPoints, tier: newTier };
      }
      return c;
    }));
  };

  // Coupon / Offer management
  const addOffer = async (offer) => {
    const newOffer = {
      ...offer,
      id: `off-${Date.now()}`,
      usageCount: 0,
    };
    setOffers(prev => [newOffer, ...prev]);
    addActivity('Admin', 'created a new offer coupon', newOffer.code);

    if (isBackendConnected) {
      try {
        await fetch(`${API_URL}/offers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOffer)
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Activity feed helper
  const addActivity = (user, action, item) => {
    const newActivity = {
      id: Date.now(),
      user,
      action,
      item,
      time: 'Just now',
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 19)]);
  };

  // Notification helper
  const addNotification = (type, message) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
      read: false,
      time: 'Just now',
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <DashboardContext.Provider value={{
      products,
      orders,
      customers,
      offers,
      notifications,
      activities,
      isBackendConnected,
      addProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus,
      addLoyaltyPoints,
      addOffer,
      markAllNotificationsAsRead
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
