 import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyBookingsPage.css'; 

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace this with actual logged-in user ID or email if available
  const userEmail = localStorage.getItem('userEmail'); // Or from context/auth

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(` https://dine-spot-mern-app.onrender.com/api/bookings/user/${userEmail}`);
        setBookings(res.data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        alert('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail]);

  return (
    <div className="my-bookings-container">
      <h2>My Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-card">
              <h3>{booking.restaurantName || 'Restaurant'}</h3>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Guests:</strong> {booking.guests}</p>
              <p><strong>Status:</strong> Confirmed</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookingsPage;
