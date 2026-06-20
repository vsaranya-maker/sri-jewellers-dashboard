import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, Plus, X, Search, Sparkles, AlertCircle } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';

const CollectionStudio = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useDashboard();
  const { user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Necklaces');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const categories = [
    'All',
    'Trendy Jewellery',
    'Fashion Jewellery',
    'Bridal Jewellery',
    'Earrings',
    'Chains',
    'Necklaces',
    'Bracelets',
    'Rings',
    'Couple Rings',
    'Hair Accessories',
    'Handbags',
    'Gift Collections'
  ];

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setName('');
    setCategory('Necklaces');
    setPrice('');
    setStock('');
    setDescription('');
    setImage('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=400'); // Default elegant jewel placeholder
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setStock(product.stock);
    setDescription(product.description || '');
    setImage(product.image || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !stock) return;

    const productData = {
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      description,
      image,
      collection: category === 'Bridal Jewellery' ? 'Bridal Corner' : 'Trendy Jewellery'
    };

    if (editingProduct) {
      updateProduct({ ...editingProduct, ...productData });
    } else {
      addProduct(productData);
    }
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isReadOnly = user?.role === 'Stylist';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Top action header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search product code/name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm glass-input text-[#111827] bg-white/50 border border-gray-200 focus:outline-none focus:border-[#B331F1]"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm glass-input text-[#111827] bg-white/50 border border-gray-200 focus:outline-none focus:border-[#B331F1] min-w-[180px]"
          >
            {categories.map((c, i) => (
              <option key={i} value={c} className="bg-white text-[#111827]">{c}</option>
            ))}
          </select>
        </div>

        {/* Add Product Button */}
        {!isReadOnly ? (
          <button 
            onClick={handleOpenAddModal}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#B331F1] to-[#FF62BB] hover:from-[#FF62BB] hover:to-[#B331F1] text-white font-semibold text-sm flex items-center justify-center space-x-2 transition-all duration-300 shadow-md shadow-purple-500/10 hover:shadow-purple-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Jewellery Item</span>
          </button>
        ) : (
          <div className="text-xs text-[#8B6B00] flex items-center space-x-1.5 p-3 rounded-xl bg-[#FBF5A7]/30 border border-[#FBF5A7]/60">
            <AlertCircle className="w-4 h-4 text-[#8B6B00]" />
            <span>Stylist role: View-only access</span>
          </div>
        )}
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <GlassCard key={product.id} hover className="flex flex-col justify-between h-[450px] relative group border border-gray-200 overflow-hidden shadow-sm">
            {/* Hover Image Overlay */}
            <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm border border-[#B331F1]/30 text-[#B331F1] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                {product.category}
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-base font-semibold text-[#111827] tracking-wide truncate">{product.name}</h4>
                <p className="text-xs text-[#6B7280] mt-2 line-clamp-2 leading-relaxed">{product.description}</p>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xl font-serif font-bold text-[#B331F1]">${product.price.toLocaleString()}</span>
                  <span className={`text-xs font-semibold ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {product.stock > 0 ? `${product.stock} left in stock` : 'Out of stock'}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                  <span className="text-[10px] font-medium text-[#6B7280] uppercase tracking-widest">
                    Sales: {product.sales} units
                  </span>
                  
                  {!isReadOnly && (
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => handleOpenEditModal(product)}
                        className="p-1.5 rounded-lg border border-gray-200 bg-white text-[#6B7280] hover:text-[#B331F1] hover:bg-purple-500/5 transition-colors"
                        title="Edit Item"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm('Delete this item from collections?')) deleteProduct(product.id);
                        }}
                        className="p-1.5 rounded-lg border border-gray-200 bg-white text-[#6B7280] hover:text-red-600 hover:bg-red-500/5 transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* CRUD Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl bg-white p-6 relative shadow-2xl border border-[#B331F1]/30"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-[#6B7280] hover:text-[#111827]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="w-5 h-5 text-[#B331F1]" />
                <h3 className="font-serif text-xl font-semibold text-[#111827]">
                  {editingProduct ? 'Edit Jewellery Item' : 'New Collection Entry'}
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] mb-1.5">Jewellery Name</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-[#111827] bg-white border border-gray-200 focus:outline-none focus:border-[#B331F1]"
                    placeholder="E.g., Royal Diamond Necklace"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6B7280] mb-1.5">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl glass-input text-[#111827] bg-white border border-gray-200 focus:outline-none focus:border-[#B331F1]"
                    >
                      {categories.filter(c => c !== 'All').map((c, i) => (
                        <option key={i} value={c} className="bg-white text-[#111827]">{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6B7280] mb-1.5">Image URL</label>
                    <input 
                      type="text" 
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full p-2.5 rounded-xl glass-input text-[#111827] bg-white border border-gray-200 focus:outline-none focus:border-[#B331F1]"
                      placeholder="Image URL link"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6B7280] mb-1.5">Price ($)</label>
                    <input 
                      type="number" 
                      required
                      min="1"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full p-2.5 rounded-xl glass-input text-[#111827] bg-white border border-gray-200 focus:outline-none focus:border-[#B331F1]"
                      placeholder="Price in USD"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6B7280] mb-1.5">Stock Count</label>
                    <input 
                      type="number" 
                      required
                      min="0"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full p-2.5 rounded-xl glass-input text-[#111827] bg-white border border-gray-200 focus:outline-none focus:border-[#B331F1]"
                      placeholder="Stock quantity"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] mb-1.5">Detailed Description</label>
                  <textarea 
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-input text-[#111827] bg-white border border-gray-200 focus:outline-none focus:border-[#B331F1]"
                    placeholder="Enter elegant jewelry copy description..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-[#B331F1] to-[#FF62BB] hover:from-[#FF62BB] hover:to-[#B331F1] text-white font-semibold tracking-wider transition-all shadow-md shadow-purple-500/10 hover:shadow-purple-500/20"
                >
                  {editingProduct ? 'Save Modifications' : 'Publish to Showrooms'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CollectionStudio;
