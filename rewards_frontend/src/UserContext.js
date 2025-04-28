import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState({
    user_id: localStorage.getItem('user_id') || '',
    email: localStorage.getItem('email') || '',
    token: localStorage.getItem('token') || '',
  });

  const login = (email, token, user_id) => {
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', user_id)
    setUserDetails(email, token, user_id);
  }

  const setUserDetails = (email, token, user_id) => {
    setUser({ email, token, user_id });
  };

  return (
    <UserContext.Provider value={{ user, setUser, setUserDetails, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);