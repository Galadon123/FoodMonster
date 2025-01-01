const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  foodItems: [String],
  status: {
    type: String,
    default: 'pending' // possible values: pending, accepted, delivered
  },
  email: String
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
