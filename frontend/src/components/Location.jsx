 import React, { useState } from 'react';

const popularLocalities = [
  { name: 'Kukatpally', image: '/images/Kukatpally.jpeg' },
  { name: 'Madhapur', image: '/images/Madhapur.jpeg' },
  { name: 'Hitech City', image: '/images/HighTechCity.jpeg' },
  { name: 'Jubilee Hills', image: '/images/JubliHills.jpeg' },
  { name: 'Gachibowli', image: '/images/Gachibowli.jpeg' },
];

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');

  // const handleLocationClick = async (locationName) => {
  //   setSelectedLocation(locationName);
  //   setRestaurants([]);
  //   setError('');

  //   try {
  //     const response = await fetch(`http://localhost:5000/api/restaurants/search?location=${encodeURIComponent(locationName)}`);
  //     const data = await response.json();
  //     console.log("Fetched data:", data);
  //     setRestaurants(data.restaurants || []);
  //   } catch (err) {
  //     setError('Failed to fetch restaurants. Please try again later.');
  //   }
  // };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Popular Localities Near You</h2>

      <div style={styles.cardGrid}>
        {popularLocalities.map((loc, index) => (
          <div
            key={index}
            onClick={() => handleLocationClick(loc.name)}
            style={{
              ...styles.card,
              backgroundImage: `url(${loc.image})`,
            }}
          >
            <div style={styles.overlay}>
              <span style={styles.cardTitle}>{loc.name}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedLocation && (
        <div style={{ marginTop: '40px' }}>
          <h3 style={styles.subheading}>Restaurants in {selectedLocation}</h3>
          {error && <p style={styles.error}>{error}</p>}

          {/* Render restaurant list or show a message */}
          {restaurants.length > 0 ? (
            <ul style={styles.restaurantList}>
              {restaurants.map((restaurant, index) => (
                <li key={index} style={styles.restaurantItem}>
                  🍽️ {restaurant.name}
                </li>
              ))}
            </ul>
          ) : (
            !error && <p>Loading restaurants...</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '40px 20px',
    backgroundColor: '#fafafa',
    maxWidth: '1200px',
    margin: '0 auto',
    overflowX: 'hidden',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#2c3e50',
    textAlign: 'center',
  },
  subheading: {
    fontSize: '22px',
    color: '#2c3e50',
    textAlign: 'center',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px',
    width: '100%',
  },
  card: {
    height: '160px',
    borderRadius: '20px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease',
  },
  overlay: {
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(4px)',
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: '22px',
    fontWeight: '600',
    textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)',
  },
  restaurantList: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '10px',
    textAlign: 'center',
  },
  restaurantItem: {
    fontSize: '18px',
    padding: '6px 0',
    color: '#555',
  },
  error: {
    color: 'red',
    fontSize: '16px',
    textAlign: 'center',
  },
};

export default Locations;
