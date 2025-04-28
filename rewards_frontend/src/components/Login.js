import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { login as loginUser } from '../api';
import './styles/Auth.css';

const Login = () => {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginUser({ email, password });
      const { email: userEmail, token } = response.data;
      const user_id = response.data.user.id;

      login(userEmail, token, user_id);
  
      navigate('/rewards');
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <button type="submit" className="auth-button">Login</button>
      </form>
      {error && <p className="auth-error">{error}</p>}
    </div>
  );
};

export default Login;
