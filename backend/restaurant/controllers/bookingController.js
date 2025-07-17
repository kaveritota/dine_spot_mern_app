 import Booking from '../models/Booking.js';
export const getBookingsByEmail = async (req, res) => {
  try {
    const email = req.params.email;
     const bookings = await Booking.find({ email }); 
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};
export const createBooking = async (req, res) => {
  try {
    const { email, name, restaurantId, date, time, guests } = req.body;
    const booking = new Booking({
      email,
      name,
      restaurantId, 
      restaurantName: req.body.restaurantName, 
      date,
      time,
      guests,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
};
