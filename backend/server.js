 import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import customerRoutes from './customer/routers/customerRouters.js';
import restaurantRoutes from './restaurant/routers/searchRestaurants.js';
import bookingRoutes from './restaurant/routers/bookingRoutes.js';
import axios from 'axios';

//track the backend ....
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => res.send('Welcome to DineSpot backend'));
app.get('/test-overpass', async (req, res) => {
  try {
    const query = `
      [out:json];
      node["amenity"="restaurant"](around:1000,17.3850,78.4867);
      out;
    `;

    const response = await axios({
      method: 'post',
      url: 'https://overpass-api.de/api/interpreter',
      headers: {
        'Content-Type': 'text/plain',
        'User-Agent': 'DineSpot/1.0'
      },
      data: query,
      timeout: 15000
    });

    res.json(response.data);
  } catch (err) {
    console.error('Test Overpass API Error:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'Overpass test failed', details: err.message });
  }
});


mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err.message));
