import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css'; 

function Dashboard() {
  const [stats, setStats] = useState({ OPEN: 0, IN_PROGRESS: 0, CLOSED: 0 });

  useEffect(() => {
    axios.get('http://localhost:8080/api/request/all')
      .then(res => {
        const open = res.data.filter(r => r.status === 'OPEN').length;
        const inProgress = res.data.filter(r => r.status === 'IN_PROGRESS').length;
        const closed = res.data.filter(r => r.status === 'CLOSED').length;
        setStats({ OPEN: open, IN_PROGRESS: inProgress, CLOSED: closed });
      });
  }, []);

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <h1>Client Service Management</h1>
      </header>

      {/* Stats Section */}
      <div className="stats">
        <div className="stat open">Open Requests: {stats.OPEN}</div>
        <div className="stat in-progress">In Progress: {stats.IN_PROGRESS}</div>
        <div className="stat closed">Closed: {stats.CLOSED}</div>
      </div>

      {/* Navigation Buttons */}
      <div className="buttons">
        <Link to="/requests" className="btn btn-blue">View All Requests</Link>
        <Link to="/create-request" className="btn btn-green">Create Request</Link>
        <Link to="/" className="btn btn-red">Logout</Link>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Client Service Management. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
