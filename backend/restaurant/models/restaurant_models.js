const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true },  
  },
  cuisine: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: Number
});

 
restaurantSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Restaurant', restaurantSchema);
