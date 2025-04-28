import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { signup as signUpUser, login as loginUser } from '../api';
import { useNavigate } from 'react-router-dom';
import './styles/Auth.css';

function SignUp() {
  const { login } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpUser({ name, email, password });
      const response = await loginUser({ email, password });
      const { email: userEmail, token } = response.data;
      const user_id = response.data.user.id;
      login(userEmail, token, user_id);
  
      navigate('/rewards');
      window.location.reload();
    } catch (err) {
      setError("Error creating account. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <p className="auth-error">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="string"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="auth-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          required
        />
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
