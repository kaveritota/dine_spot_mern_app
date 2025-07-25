import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import Loader from '../components/Loader';

const BookingPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`https://dine-spot-mern-app.onrender.com/api/restaurants/by-osm/${id}`);
        const data = await res.json();
        setRestaurant(data);
      } catch (err) {
        console.error(err);
        navigate('/restaurants');
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id, navigate]);

  if (loading) return <Loader />;

  return (
    <div style={{ padding: '2rem' }}>
      <BookingForm restaurant={restaurant} onClose={() => navigate('/home')} />
    </div>
  );
};

export default BookingPage;
