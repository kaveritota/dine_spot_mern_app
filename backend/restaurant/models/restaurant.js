 import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  cuisine: { type: String },
  image: { type: String },
  lat: { type: Number },
  lon: { type: Number },

  // ✅ Menu for this restaurant
  menu: [menuItemSchema],
});

export default mongoose.model('Restaurant', restaurantSchema);
