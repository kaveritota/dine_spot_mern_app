 import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  email: String,
  name: String, // customer's name
  restaurantId: String, // or ObjectId
  restaurantName: String,  
  date: String,
  time: String,
  guests: Number,
});

export default mongoose.model('Booking', bookingSchema);
