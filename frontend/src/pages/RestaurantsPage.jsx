 import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import './RestaurantsPage.css';

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const restaurantsPerPage = 12;
  const query = new URLSearchParams(useLocation().search);
  const location = query.get('location');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dine-spot-mern-app.onrender.com/api/restaurants/search?location=${encodeURIComponent(location)}`
        );
        console.log(response,"response")

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();

            const validRestaurants = data.filter(
                 (r) =>
                  r.name &&
                  typeof r.name === 'string' &&
                   r.name.trim().toLowerCase() !== 'unnamed restaurant' &&
                  r.image &&
                  typeof r.image === 'string' &&
                   r.image.trim() !== '' &&
                 r.image.trim() !== 'https://cdn.pixabay.com/photo/2017/03/21/17/56/restaurant-2169793_1280.jpg'
               );

        if (validRestaurants.length === 0) {
          alert('Please enter a valid location. No restaurants found.');
          navigate('/home');
          return;
        }

        setRestaurants(validRestaurants);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        // alert('Something went wrong. Please try again.');
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchRestaurants();
    }
  }, [location, navigate]);

  const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);
  const displayedRestaurants = restaurants.slice(
    (currentPage - 1) * restaurantsPerPage,
    currentPage * restaurantsPerPage
  );

  if (loading) return <Loader />;

  return (
    <div className="restaurants-page">
      <h2>Restaurants in {location}</h2>

      <div className="restaurant-grid">
        {displayedRestaurants.map((r) => (
          <div className="card" key={r._id} onClick={() => navigate(`/book/${r._id}`)}>
            <img
              src={r.image}
              alt={r.name}
            />
            <h3>{r.name}</h3>
            <p><strong>Cuisine:</strong> {r.cuisine}</p>
            <p>{r.address?.replace(/,\s*$/, '')}</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ⬅ Prev
          </button>

          <span>Page {currentPage} of {totalPages}</span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;
