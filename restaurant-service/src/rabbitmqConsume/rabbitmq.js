// src/rabbitmq.js
const amqp = require('amqplib');
const Order = require('../models/order');


let channel, connection;
// Connect to RabbitMQ
async function connectRabbitMQ() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();

    const queue = 'order.process';
    const queue2 = 'order.acceptance';
    const exchange = 'order_exchange_restaurant';

    // Assert Queue
    await channel.assertQueue(queue, { durable: true });
    await channel.assertQueue(queue2, { durable: true });

    // Declare the direct exchange
    await channel.assertExchange(exchange, 'direct', { durable: true });

    // Bind the queue to the exchange with a routing key
    const routingKey = 'order.acceptance';
    await channel.bindQueue(queue2, exchange, routingKey);

    console.log('Restaurant Service connected to RabbitMQ and waiting for orders...');

    // Consume the message from the queue
    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const order = JSON.parse(msg.content.toString());
        await processOrder(order, exchange, routingKey);
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error('RabbitMQ connection error:', err);
  }
}

// Process the order by updating the status
async function processOrder(order, exchange, routingKey) {
  try {
    console.log('Processing order:', order._id);
    setTimeout(async () => {
      const updatedOrder = await Order.findByIdAndUpdate(order._id, { status: 'accepted' }, { new: true });
      // Publish the message with the routing key
      await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(updatedOrder)));
      console.log('Order accepted and published to RabbitMQ');
    }, 30000);

  } catch (err) {
    console.error('Error processing order:', err);
  }
}

module.exports = { connectRabbitMQ, processOrder };
