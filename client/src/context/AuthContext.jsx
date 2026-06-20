import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sri_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      // Mock auth simulation for quick demo, or query backend if online
      if (username === 'admin' && password === 'admin123') {
        const mockUser = {
          id: 'user-1',
          username: 'admin',
          name: 'Sarah D\'Souza',
          role: 'Admin', // Roles: Admin, Stylist, Manager
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
          email: 'sarah.dsouza@srijewellers.com'
        };
        setUser(mockUser);
        localStorage.setItem('sri_user', JSON.stringify(mockUser));
        setLoading(false);
        return true;
      } else if (username === 'manager' && password === 'manager123') {
        const mockUser = {
          id: 'user-2',
          username: 'manager',
          name: 'Rajesh Kumar',
          role: 'Manager',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
          email: 'rajesh.k@srijewellers.com'
        };
        setUser(mockUser);
        localStorage.setItem('sri_user', JSON.stringify(mockUser));
        setLoading(false);
        return true;
      } else if (username === 'stylist' && password === 'stylist123') {
        const mockUser = {
          id: 'user-3',
          username: 'stylist',
          name: 'Priya Mehta',
          role: 'Stylist',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
          email: 'priya.mehta@srijewellers.com'
        };
        setUser(mockUser);
        localStorage.setItem('sri_user', JSON.stringify(mockUser));
        setLoading(false);
        return true;
      } else {
        throw new Error('Invalid username or password. Use admin/admin123, manager/manager123, or stylist/stylist123.');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sri_user');
  };

  const updateRole = (newRole) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    setUser(updated);
    localStorage.setItem('sri_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, updateRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
