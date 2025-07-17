 import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import './thankyou.css';

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.bookingDetails;

  const { width, height } = useWindowSize(); // for full-screen confetti

  const handleDownload = () => {
    if (!booking) return;

    const content = `
    Booking Confirmation

    Name: ${booking.customerName}
    Restaurant: ${booking.restaurantName || 'Your Restaurant'}
    Date: ${booking.date}
    Time: ${booking.time}
    Guests: ${booking.guests}
    Amount Paid: ₹${booking.amount}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `Booking_Confirmation_${booking.customerName}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="thankyou-wrapper">
      <Confetti width={width} height={height} numberOfPieces={250} recycle={false} />
      <div className="thankyou-card">
        <h1>🎉 Thank You for Your Booking!</h1>
        {booking ? (
          <>
            <p><strong>Name:</strong> {booking.customerName}</p>
            <p><strong>Restaurant:</strong> {booking.restaurantName}</p>
            <p><strong>Date & Time:</strong> {booking.date} at {booking.time}</p>
            <p><strong>Guests:</strong> {booking.guests}</p>
            <p><strong>Total Paid:</strong> ₹{booking.amount}</p>

            <div className="btn-group">
              <button className="btn download" onClick={handleDownload}>Download Confirmation</button>
              <button className="btn home" onClick={() => navigate('/home')}>Back to Home</button>
            </div>
          </>
        ) : (
          <p>No booking data found.</p>
        )}
      </div>
    </div>
  );
};

export default ThankYou;
