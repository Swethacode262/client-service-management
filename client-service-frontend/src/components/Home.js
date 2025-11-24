import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Client Service Management</h1>
      </header>

      <div className="home-content">
        <h2>Welcome</h2>
        <p>Manage your service requests easily</p>

        <div className="home-buttons">

          {/* ---------- BEFORE LOGIN ---------- */}
          {!user && (
            <>
              <Link to="/login" className="btn login-btn">Login</Link>
              <Link to="/register" className="btn register-btn">Register</Link>
            </>
          )}

          {/* ---------- ADMIN HOME PAGE ---------- */}
          {user?.role === "ADMIN" && (
            <>
              <Link to="/requests" className="btn">View All Requests</Link>
              <Link to="/requests" className="btn">Update/Delete Requests</Link>
              <button className="btn" onClick={logout}>Logout</button>
            </>
          )}

          {/* ---------- USER HOME PAGE ---------- */}
          {user?.role === "USER" && (
            <>
              <Link to="/create-request" className="btn">Create Request</Link>
              <Link to="/my-requests" className="btn">View My Requests</Link>
              <button className="btn" onClick={logout}>Logout</button>
            </>
          )}

        </div>
      </div>

      <footer className="home-footer">
        © 2025 Client Service Management
      </footer>
    </div>
  );
}

export default Home;
