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
    const res = await axios.post('http://localhost:8080/api/user/login', { email, password });
    
    
   const loggedInUser = {
  id: res.data.id,   
  username: res.data.username,
  email: res.data.email,
  role: userType === 'ADMIN' && email === 'swetharachuri@gmail.com' ? 'ADMIN' : 'USER'
};
localStorage.setItem('currentUser', JSON.stringify(loggedInUser));

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
        <div className="user-type-buttons">
    <button type="button" onClick={() => setUserType('ADMIN')}>Admin</button>
    <button type="button" onClick={() => setUserType('USER')}>User</button>
  </div>
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

        {/* Link to Registration Page */}
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;
