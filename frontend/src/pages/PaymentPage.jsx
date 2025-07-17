 import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css'

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;

  const [showOptions, setShowOptions] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');

  if (!bookingDetails) {
    return (
      <div className="payment-container">
        <h2>No booking found</h2>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  const {
    customerName,
    restaurantName,
    date,
    time,
    guests,
    amount
  } = bookingDetails;

  const handleFinalPayment = () => {
    alert(`Payment successful using ${selectedMethod.toUpperCase()}!`);
    navigate('/thank-you', {
      state: {
        bookingDetails,
      },
    });
  };

  return (
    <div className='payment-page'>
    <div className="payment-container">
      <h2>Payment Summary</h2>
      <div className="payment-details">
        <p><strong>Name:</strong> {customerName}</p>
        <p><strong>Restaurant:</strong> {restaurantName || 'Selected Restaurant'}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Guests:</strong> {guests}</p>
        <p><strong>Total Amount:</strong> ₹{amount}</p>
      </div>

      {!showOptions ? (
        <button className="pay-btn" onClick={() => setShowOptions(true)}>
          Proceed to Pay ₹{amount}
        </button>
      ) : (
        <div className="payment-methods">
          <h3>Select Payment Method</h3>
          <button className={`method-btn ${selectedMethod === 'upi' ? 'selected' : ''}`} onClick={() => setSelectedMethod('upi')}>
            Pay using UPI
          </button>
          <button className={`method-btn ${selectedMethod === 'card' ? 'selected' : ''}`} onClick={() => setSelectedMethod('card')}>
            Pay using Credit/Debit Card
          </button>

          {selectedMethod && (
            <button className="pay-btn confirm" onClick={handleFinalPayment}>
              Pay Now (₹{amount})
            </button>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default Payment;
