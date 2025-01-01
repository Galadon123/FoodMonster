// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const { connectRabbitMQ, sendOrderConfirmation } = require('./src/RabbitMQ/rabbitmq');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).send('Email Service is healthy');
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Email service running on port ${process.env.PORT}`);
  connectRabbitMQ(); // Connect to RabbitMQ and start listening for messages
});                                                                                                                                                                                                                                                                                                             