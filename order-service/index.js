const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const connectDB = require('./src/ConnectDB/db');
const { connectRabbitMQ, publishOrder } = require('./src/RabbitMQ/rabbitmq');
const Order = require('./src/models/order');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Add CORS middleware
app.use(bodyParser.json());

// Connect to MongoDB and RabbitMQ
connectDB();
connectRabbitMQ();

// POST: Place an Order
app.post('/order', async (req, res) => {
    try {
        const { customerName, foodItems, email } = req.body;

        // Create order in MongoDB
        const newOrder = new Order({
            customerName,
            foodItems,
            email
        });
        await newOrder.save(); // Save the order to the database

        // Publish the order to RabbitMQ
        await publishOrder(newOrder);

        // Respond to client with Order ID
        res.status(201).json({
            message: 'Order placed successfully!',
            orderId: newOrder._id
        });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Failed to place order' });
    }
});

// GET: Track an Order
app.get('/order/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error tracking order:', error);
        res.status(500).json({ error: 'Failed to track order' });
    }
});

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Order service running on port ${process.env.PORT}`);
});
