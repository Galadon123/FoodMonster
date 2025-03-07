   // app.js
   const express = require('express');
   const mongoose = require('mongoose');
   const bodyParser = require('body-parser');
   const cors = require('cors'); // Import the cors package
   const authRoutes = require('./routes/auth');
   require('dotenv').config();

   const app = express();

   // Use CORS middleware
   app.use(cors());

   app.use(bodyParser.json());

   mongoose.connect('mongodb://localhost:27017/userrs', { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => console.log('MongoDB connected'))
       .catch(err => console.log(err));

   app.use('/api/auth', authRoutes);

   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));