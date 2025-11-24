import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  
  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

 
  const handleRegister = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; 
    }

    try {
      await axios.post('http://localhost:8080/api/user/register', { 
        name, 
        email, 
        password 
      });
      
      alert('Registered successfully');
      navigate('/');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>

          {/* FULL NAME */}
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          {errors.name && <p className="error-text">{errors.name}</p>}

          {/* EMAIL */}
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          {/* PASSWORD */}
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <button type="submit">Register</button>
        </form>

        <p>Already have an account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
