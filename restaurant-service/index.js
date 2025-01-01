// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { connectRabbitMQ, processOrder } = require('./src/rabbitmqConsume/rabbitmq');
const Order = require('./src/models/order');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Restaurant DB connected...'))
  .catch((err) => console.error('Restaurant DB connection error:', err));

// Connect to RabbitMQ
connectRabbitMQ();


// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).send('Restaurant Service is healthy');
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Restaurant service running on port ${process.env.PORT}`);
});
