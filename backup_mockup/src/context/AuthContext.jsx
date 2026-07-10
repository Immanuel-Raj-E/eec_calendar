import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('eec_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (roleKey) => {
    const matchedUser = MOCK_USERS[roleKey.toLowerCase()];
    if (matchedUser) {
      setUser(matchedUser);
      localStorage.setItem('eec_current_user', JSON.stringify(matchedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eec_current_user');
  };

  const updateProfile = (updatedProfile) => {
    setUser(updatedProfile);
    localStorage.setItem('eec_current_user', JSON.stringify(updatedProfile));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
