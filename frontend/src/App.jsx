 import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import RestaurantPage from './pages/RestaurantsPage';  
import BookingPage from './pages/BookingPage';          
import PaymentPage from './pages/PaymentPage';
import MyBookingsPage from './pages/MyBookingsPage';
import ThankYou from './pages/ThankYou';

function App() {
  const location = useLocation();

  const hideNavbarRoutes = ['/', '/register'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/restaurants" element={<RestaurantPage />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/thank-you" element={<ThankYou/>}/>
      </Routes>

      {/* Optional: Keep this always visible */}
      {/* <div>
        <AddRestaurantForm />
      </div> */}
    </>
  );
}

export default App;
