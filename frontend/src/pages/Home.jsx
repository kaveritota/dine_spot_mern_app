  import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import bgImage from '../assets/bg_image.png';
import Location from '../components/Location';
import Cuisines from '../components/Cuisines';
import About from './About';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm';

const Home = () => {
  const [location, setLocation] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const restaurantsPerPage = 12;
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('userToken'); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    alert('Logged out successfully!');
    navigate('/');
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/'); // Redirect to login if not logged in
    }
  }, [isLoggedIn, navigate]);

  const handleSearch = () => {
    if (!location.trim()) {
      alert('Please enter a location');
      return;
    }
    navigate(`/restaurants?location=${encodeURIComponent(location)}`);
  };

  const handleCardClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowBookingForm(true);
  };

  const indexOfLast = currentPage * restaurantsPerPage;
  const indexOfFirst = indexOfLast - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);

  const carouselTexts = [
    'Discover Flavours around you...',
    'Savor Local Delights!',
    'Book Tables Instantly!',
    'Explore Top-Rated Restaurants!',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselTexts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-wrapper">
      <div className="home-hero" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="hero-overlay">
          <div className="search-bar-row">
            <div className="search-input-wrapper">
              <FaMapMarkerAlt className="location-icon" />
              <input
                type="text"
                placeholder="Enter a location (e.g. kukatpally, Charminar)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>

          <h1 style={{ fontSize: '50px', color: 'black' }}>{carouselTexts[currentIndex]}</h1>
        </div>
      </div>

      <div className="restaurant-grid">
        {loading && <p>Loading restaurants...</p>}
        {currentRestaurants.map((r) => (
          <div className="card" key={r.id} onClick={() => handleCardClick(r)}>
            <img
              src={r.image}
              alt={r.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x300.png?text=No+Image';
              }}
            />
            <h3>{r.name}</h3>
            <p>
              <strong>Cuisine:</strong> {r.cuisine}
            </p>
            <p>{r.address}</p>
          </div>
        ))}
      </div>

      {!loading && restaurants.length > restaurantsPerPage && (
        <div className="pagination-controls">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
            ⬅
          </button>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
            ➡
          </button>
        </div>
      )}

      {showBookingForm && selectedRestaurant && (
        <BookingForm restaurant={selectedRestaurant} onClose={() => setShowBookingForm(false)} />
      )}

        
      
   
      <Location />
      <Cuisines />
      <About />
      <Footer />
    
     </div>
     
  );
};

export default Home;
