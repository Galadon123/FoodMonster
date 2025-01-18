const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;

    // Debug log for incoming data
    console.log('Signup Request Body:', req.body);

    try {
        // Check for missing fields
        if (!name || !email || !phone || !password) {
            return res.status(400).send('All fields are required');
        }

        // Check for duplicate email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const user = new User({ name, email, phone, password: hashedPassword });
        await user.save();

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Signup Error:', error.message); // Log the exact error for debugging
        res.status(500).send('Internal server error');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Debug log for incoming data
    console.log('Login Request Body:', req.body);

    try {
        // Check for missing fields
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Login Error:', error.message); // Log the exact error for debugging
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
