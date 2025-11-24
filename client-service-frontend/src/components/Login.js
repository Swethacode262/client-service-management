import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [userType, setUserType] = useState('USER'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      
      if (userType === 'ADMIN') {
        if (email === 'admin@example.com' && password === 'admin@123') {
          const loggedInUser = {
            id: 0,
            username: 'Admin',
            email: email,
            role: 'ADMIN',
          };
          localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
          navigate('/');
          return;
        } else {
          alert('Admin credentials incorrect. Try logging in as User.');
          return;
        }
      }

      
      const res = await axios.post('http://localhost:8080/api/user/login', { email, password });
      const loggedInUser = {
        id: res.data.id,
        username: res.data.username,
        email: res.data.email,
        role: 'USER',
      };
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message || 'Login failed');
      } else {
        alert('Login failed');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        {/* User/Admin Toggle */}
        <div className="user-type-buttons">
          <button
            type="button"
            className={userType === 'ADMIN' ? 'active' : ''}
            onClick={() => setUserType('ADMIN')}
          >
            Admin
          </button>
          <button
            type="button"
            className={userType === 'USER' ? 'active' : ''}
            onClick={() => setUserType('USER')}
          >
            User
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <small className="error">{errors.email}</small>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <small className="error">{errors.password}</small>}

          <button type="submit">Login</button>
        </form>

        {/* Registration link */}
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;
