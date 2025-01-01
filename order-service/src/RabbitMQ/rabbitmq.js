const amqp = require('amqplib');

let channel, connection;

const connectRabbitMQ = async () => {
      try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertExchange('order_exchange_fanout', 'fanout');
        await channel.assertQueue('order.process');
        await channel.assertQueue('order.confirmation');
        // Bind queues to exchange
        await channel.bindQueue('order.process', 'order_exchange_fanout');
        await channel.bindQueue('order.confirmation', 'order_exchange_fanout');
        console.log('RabbitMQ connected...');
      } catch (error) {
        console.error('RabbitMQ connection error:', error);
        process.exit(1);
      }
};

const publishOrder = async (order) => {
  try {
    const message = JSON.stringify(order);
    channel.publish('order_exchange_fanout', '', Buffer.from(message));
    console.log('Order published to RabbitMQ');
  } catch (error) {
    console.error('Error publishing order:', error);
  }
};

module.exports = { connectRabbitMQ, publishOrder };
