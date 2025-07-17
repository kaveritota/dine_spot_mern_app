 import axios from 'axios';
import dotenv from 'dotenv';
import Restaurant from '../models/restaurant.js'; // ✅ Ensure the model file is named correctly

dotenv.config();

export const searchRestaurants = async (req, res) => {
  const { location } = req.query;
  const searchLocation = location?.toLowerCase() || 'hyderabad';

  try {
    let overpassQuery = '';
    if (searchLocation === 'hyderabad') {
      overpassQuery = `
        [out:json];
        node["amenity"="restaurant"](around:7000,17.3850,78.4867);
        out;
      `;
    } else {
      const geoRes = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: searchLocation, format: 'json'},
        headers: { 'User-Agent': 'DineSpot/1.0' },
      });

      if (!geoRes.data.length) {
        return res.status(404).json({ error: 'Location not found' });
      }

      const { lat, lon } = geoRes.data[0];
      overpassQuery = `
        [out:json];
        node["amenity"="restaurant"](around:7000,${lat},${lon});
        out;
      `;
    }

    // ✅ Add missing User-Agent header
    const overpassRes = await axios.post(
      'https://overpass-api.de/api/interpreter',
      overpassQuery,
      {
        headers: {
          'Content-Type': 'text/plain',
          'User-Agent': 'DineSpot/1.0'
        }
      }
    );

    const results = await Promise.all(
      overpassRes.data.elements.map(async (place) => {
        const name = place.tags.name || 'Unnamed Restaurant';
        const street = place.tags['addr:street'] || '';
        const city = place.tags['addr:city'] || '';
        const housenumber = place.tags['addr:housenumber'] || '';
        const postcode = place.tags['addr:postcode'] || '';
        const address = `${housenumber} ${street}, ${city} ${postcode}`.trim() || 'Address not available';
        const cuisine = place.tags.cuisine || 'Cuisine not specified';

        let image = 'https://cdn.pixabay.com/photo/2017/03/21/17/56/restaurant-2169793_1280.jpg';
        try {
          const unsplashRes = await axios.get('https://api.unsplash.com/search/photos', {
            headers: {
              Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
            },
            params: {
              query: `${name} restaurant`,
              per_page: 1,
            },
          });

          image = unsplashRes.data.results[0]?.urls?.regular || image;
        } catch (imgErr) {
          console.warn(`Image fetch failed for ${name}`, imgErr.message);
        }

        //  Use correct model name: Restaurant
        let existing = await Restaurant.findOne({ osmId: place.id });

        if (!existing) {
          existing = new Restaurant({
            osmId: place.id,
            name,
            address,
            cuisine,
            lat: place.lat,
            lon: place.lon,
            image,
            menu: [], // You can add real menu later via admin or Compass
          });

          await existing.save();
        }

        return existing;
      })
    );

    res.json(results);
   } catch (error) {
  console.error('🔥 OpenStreetMap/Unsplash/Mongo Error 🔥');
  console.error('Message:', error.message);
  console.error('Stack:', error.stack);
  
  if (error.response) {
    console.error('Error response status:', error.response.status);
    console.error('Error response data:', error.response.data);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Unknown error:', error);
  }

  res.status(500).json({ error: 'Failed to fetch restaurants' ,err:error});
}


};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//  Add or update menu for a restaurant
export const addMenu = async (req, res) => {
  const { restaurantId } = req.params;
  const { menu } = req.body;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    restaurant.menu = menu;
    await restaurant.save();

    res.status(200).json({ message: 'Menu added successfully', restaurant });
  } catch (error) {
    console.error('Error adding menu:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
