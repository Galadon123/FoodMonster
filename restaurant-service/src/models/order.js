// src/models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  foodItems: [String],
  email: String,
  status: { type: String, enum: ['pending', 'accepted', 'delivered'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
