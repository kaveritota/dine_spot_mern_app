 import React, { useState } from 'react';

const cuisines = [
  { name: 'Biryani', image: '/images/biryani.jpeg' },
  { name: 'Chinese', image: '/images/chinese.jpeg' },
  { name: 'South Indian', image: '/images/southindian.jpeg' },
  { name: 'Italian', image: '/images/italian.jpeg' },
  { name: 'Desserts', image: '/images/desserts.jpeg' },
  { name: 'Cafe', image: '/images/cafe.jpeg' },
  { name: 'Bakery', image: '/images/bakery.jpeg' },
  { name: 'North Indian', image: '/images/northindian.jpeg' },
//   { name: 'Fast Food', image: '/images/fastfood.jpg' },
];

const Cuisines = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');

  const handleCuisineClick = async (cuisine) => {
    setSelectedCuisine(cuisine);
    setRestaurants([]);
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/restaurants/cuisine/${cuisine}`);
      const data = await response.json();
      setRestaurants(data.restaurants || []);
    } catch (err) {
      setError('Failed to fetch restaurants.');
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Browse by Cuisines</h2>

      <div style={styles.grid}>
        {cuisines.map((cuisine, index) => (
          <div
            key={index}
            onClick={() => handleCuisineClick(cuisine.name)}
            style={{
              ...styles.card,
              backgroundImage: `url(${cuisine.image})`,
            }}
          >
            <div style={styles.overlay}>
              <span style={styles.title}>{cuisine.name}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedCuisine && (
        <>
          <h3 style={styles.subheading}>Restaurants serving {selectedCuisine}</h3>
          {error && <p style={styles.error}>{error}</p>}
          <ul style={styles.restaurantList}>
            {restaurants.length === 0 && !error ? (
              <p>Loading...</p>
            ) : (
              restaurants.map((r, i) => (
                <li key={i} style={styles.restaurantItem}>🍽️ {r.name}</li>
              ))
            )}
          </ul>
        </>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '40px 20px',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  grid: {
    display: 'flex',
    overflowX: 'auto',
    gap: '20px',
    paddingBottom: '10px',
  },
  card: {
    flex: '0 0 160px',
    height: '160px',
    borderRadius: '12px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    cursor: 'pointer',
    position: 'relative',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.4)',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
  },
  title: {
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    textShadow: '0 2px 5px rgba(0,0,0,0.5)',
  },
  subheading: {
    fontSize: '22px',
    marginTop: '30px',
    marginBottom: '10px',
  },
  restaurantList: {
    listStyleType: 'none',
    padding: 0,
  },
  restaurantItem: {
    fontSize: '18px',
    padding: '6px 0',
    color: '#555',
  },
  error: {
    color: 'red',
    fontSize: '16px',
  },
};

export default Cuisines;
