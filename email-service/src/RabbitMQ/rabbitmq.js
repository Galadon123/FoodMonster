// src/rabbitmq.js
const amqp = require('amqplib');
const { sendOrderConfirmationEmail } = require('../email/email');
const { sendOrderAcceptanceEmail } = require('../email/email');
// Connect to RabbitMQ and consume order confirmation messages
async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'order.confirmation';
    const queue2 = 'order.acceptance';

    await channel.assertQueue(queue, { durable: true });
    await channel.assertQueue(queue2, { durable: true });
    console.log('Email Service connected to RabbitMQ and waiting for orders...');

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const order = JSON.parse(msg.content.toString());
        await sendOrderConfirmationEmail(order); // Call email service
        channel.ack(msg);
      }
    });

    channel.consume(queue2, async (msg) => {
      if (msg !== null) {
        const order = JSON.parse(msg.content.toString());
        await sendOrderAcceptanceEmail(order); // Call email service
        channel.ack(msg);
      }
    });
  } catch (err) {
     console.error('RabbitMQ connection error:', err);
  }
}

module.exports = { connectRabbitMQ };
