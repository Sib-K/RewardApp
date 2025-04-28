import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Rewards from './components/Rewards';
import RedemptionHistory from './components/RedemptionHistory';
import { UserProvider, useUser } from './UserContext';

function AppLayout() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {


    setUser({ email: '', token: '', user_id: '' });
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');

    navigate('/login');
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-left">
          {user?.token && (
            <>
              <Link to="/rewards" className="nav-link">Browse Rewards</Link>
              <Link to="/history" className="nav-link">Redemption History</Link>
            </>
          )}
        </div>
        <div className="nav-right">
          {user?.token ? (
            <button onClick={handleLogout} className="nav-link nav-button">Logout</button>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/rewards" element={user?.token ? <Rewards /> : <Navigate to="/login" />} />
        <Route path="/history" element={user?.token ? <RedemptionHistory /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <UserProvider>
      <Router>
        <AppLayout />
      </Router>
    </UserProvider>
  );
}
