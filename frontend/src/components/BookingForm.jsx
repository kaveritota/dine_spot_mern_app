 import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

const BookingForm = ({ restaurant, onClose }) => {
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = String(parseInt(hours, 10) + 12);

    return `${hours.padStart(2, '0')}:${minutes}`;
  };

  const isBefore10AM = (time12h) => {
    const time24 = convertTo24Hour(time12h);
    const [hour] = time24.split(':').map(Number);
    return hour < 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isBefore10AM(form.time)) {
      alert('This restaurant opens after 10:00 AM. Please select a time after 10:00 AM.');
      return;
    }

    try {
      const bookingData = {
        customerName: form.customerName,
        email: form.email,
        phone: form.phone,
        date: form.date,
        time: convertTo24Hour(form.time),
        guests: form.guests,
        restaurantId: restaurant._id,
        restaurantName: restaurant.name,
      };

      const res = await axios.post('https://dine-spot-mern-app.onrender.com/api/bookings', bookingData);

      alert(`Booking confirmed for ${form.time}!`);

      navigate('/payment', {
        state: {
          bookingDetails: {
            ...res.data,
            ...form,
            amount: 500,
          },
        },
      });
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book. Try again.');
    }
  };

  const timeOptions = [];
  for (let hour = 10; hour <= 22; hour++) {
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    timeOptions.push(`${hour12}:00 ${ampm}`);
    timeOptions.push(`${hour12}:30 ${ampm}`);
  }

  return (
    <div className="form-overlay">
      <div className="modal">
        <h2>Book a Table at {restaurant.name}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="customerName"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            required
          />
          <input
            name="date"
            type="date"
            onChange={handleChange}
            required
          />
          <select
            name="time"
            value={form.time}
            onChange={handleChange}
            className="custom-select"
            required
          >
            <option value="">Select Time</option>
            {timeOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <input
            name="guests"
            type="number"
            placeholder="Guests"
            onChange={handleChange}
            required
          />
          <button type="submit">Confirm Booking</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
