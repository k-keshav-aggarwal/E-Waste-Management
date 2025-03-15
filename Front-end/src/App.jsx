import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero, AboutUs, ContactUs, Footer, Impact, Navbar, Chatbot } from '../components/imports';
import Login from '../components/Authorization_Authentication/Login';
import Signup from '../components/Authorization_Authentication/Signup';
import E_Shop from '../components/E_Shop/E_shop';
import Profile from '../components/Profile/Profile';
import CentresList from '../components/Profile/CentresList';
import Admin from '../components/Admin/Admin';
import './App.css';

function App() {
  // Initialize state from local storage or default values
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem('userRole') || 'no'
  );

  // Update local storage whenever isLoggedIn or userRole changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('userRole', userRole);
  }, [isLoggedIn, userRole]);

  // Handle login by receiving the role from the Login component
  const handleLogin = (role) => {
    setIsLoggedIn(true);
    if (role === 'admin') {
      setUserRole('yes');
    } else {
      setUserRole('no');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('no');
    // Clear local storage on logout
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} userRole={userRole} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Impact />
              <AboutUs />
              <ContactUs />
              <Footer />
              <Chatbot />
            </>
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/centresList" element={<CentresList />} />
        <Route path="/e-shop" element={<E_Shop />} />
      </Routes>
    </Router>
  );
}

export default App;