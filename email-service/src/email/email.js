const nodemailer = require('nodemailer');

// Create a reusable transporter function
function getEmailTransporter() {
  return nodemailer.createTransport({
    service: 'gmail', // Change this to your preferred email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// Send order confirmation email
async function sendOrderConfirmationEmail(order) {
  try {
    const transporter = getEmailTransporter(); // Get the reusable transporter

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: order.email,
      subject: 'Order Confirmation - FoodMonster',
      text: `Dear ${order.customerName},\n\nThank you for your order. Your order ID is ${order._id}. Your order is in ${order.status} status.\n\nBest regards,\nFoodMonster Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', order.email);
  } catch (err) {
    console.error('Error sending confirmation email:', err);
  }
}

// Send order acceptance email
async function sendOrderAcceptanceEmail(order) {
  try {
    const transporter = getEmailTransporter(); // Get the reusable transporter

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: order.email,
      subject: 'Order Accepted - FoodMonster',
      text: `Dear ${order.customerName},\n\nYour order with ID ${order._id} has been ${order.status} and is now being prepared. Thank you for choosing FoodMonster!\n\nBest regards,\nFoodMonster Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Acceptance email sent to:', order.email);
  } catch (err) {
    console.error('Error sending acceptance email:', err);
  }
}

module.exports = { sendOrderConfirmationEmail, sendOrderAcceptanceEmail };
