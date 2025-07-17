 // RestaurantDetailModal.jsx
import React from 'react';
import './RestaurantDetailModel.css'; // Optional for modal styling

const RestaurantDetailModal = ({ restaurant, onClose }) => {
  const handleOrder = (item) => {
    alert(`Ordering ${item.name} from ${restaurant.name}`);
    // You can implement actual POST request to order endpoint here
  };

  const handleBookTable = () => {
    alert(`Booking table at ${restaurant.name}`);
    
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{restaurant.name}</h2>
        <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
        <p><strong>Address:</strong> {restaurant.address}</p>

        <h3>Menu</h3>
        <ul>
          {restaurant.menu?.map((item, idx) => (
            <li key={idx}>
              {item.name} - ₹{item.price}
              <button onClick={() => handleOrder(item)}>Order</button>
            </li>
          ))}
        </ul>

        <button className="book-btn" onClick={handleBookTable}>Book a Table</button>
      </div>
    </div>
  );
};

export default RestaurantDetailModal;
