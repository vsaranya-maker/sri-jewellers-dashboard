const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Fallback DB if MongoDB is not running
let productsDB = [
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
  }
];

let ordersDB = [
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
  }
];

let customersDB = [
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
  }
];

let offersDB = [
  {
    id: 'off-1',
    code: 'FESTIVE10',
    discount: 10,
    type: 'Percentage',
    status: 'Active',
    usageCount: 84,
    expiryDate: '2026-08-31',
  }
];

// Mongoose Schemas (Used if MongoDB connects)
const ProductSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  collectionName: String,
  price: Number,
  stock: Number,
  rating: Number,
  description: String,
  image: String,
  sales: Number
});

const OrderSchema = new mongoose.Schema({
  id: String,
  customerName: String,
  customerEmail: String,
  items: Array,
  total: Number,
  status: String,
  paymentStatus: String,
  date: String,
  trackingNumber: String
});

let Product, Order;
let isMongoConnected = false;

// Attempt MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sri_jewellers';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Connected to:', MONGO_URI);
  isMongoConnected = true;
  Product = mongoose.model('Product', ProductSchema);
  Order = mongoose.model('Order', OrderSchema);
}).catch(err => {
  console.warn('MongoDB connection failed. Continuing in local-fallback mode.');
});

// API Routes

// Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    database: isMongoConnected ? 'MongoDB Connected' : 'In-Memory Mock Fallback Database Mode'
  });
});

// PRODUCTS API
app.get('/api/products', async (req, res) => {
  if (isMongoConnected) {
    const products = await Product.find();
    return res.json(products);
  }
  res.json(productsDB);
});

app.post('/api/products', async (req, res) => {
  const newProduct = req.body;
  if (isMongoConnected) {
    const dbProduct = new Product(newProduct);
    await dbProduct.save();
    return res.status(201).json(dbProduct);
  }
  productsDB.unshift(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  if (isMongoConnected) {
    await Product.findOneAndUpdate({ id }, updatedProduct);
    return res.json(updatedProduct);
  }
  productsDB = productsDB.map(p => p.id === id ? updatedProduct : p);
  res.json(updatedProduct);
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  if (isMongoConnected) {
    await Product.findOneAndDelete({ id });
    return res.json({ message: 'Deleted successfully' });
  }
  productsDB = productsDB.filter(p => p.id !== id);
  res.json({ message: 'Deleted successfully' });
});

// ORDERS API
app.get('/api/orders', async (req, res) => {
  if (isMongoConnected) {
    const orders = await Order.find();
    return res.json(orders);
  }
  res.json(ordersDB);
});

app.put('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (isMongoConnected) {
    const order = await Order.findOneAndUpdate({ id }, { status }, { new: true });
    return res.json(order);
  }
  ordersDB = ordersDB.map(o => o.id === id ? { ...o, status } : o);
  res.json({ id, status });
});

// CUSTOMERS API
app.get('/api/customers', (req, res) => {
  res.json(customersDB);
});

// OFFERS API
app.get('/api/offers', (req, res) => {
  res.json(offersDB);
});

app.post('/api/offers', (req, res) => {
  const newOffer = req.body;
  offersDB.unshift(newOffer);
  res.status(201).json(newOffer);
});

app.listen(PORT, () => {
  console.log(`Sri Jewellers backend server running on http://localhost:${PORT}`);
});
