"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // load the verification status from session storage when the component mounts
    const storedIsVerified = sessionStorage.getItem('isVerified') === 'true';
    if (storedIsVerified) {
      setIsVerified(storedIsVerified);
    }
  }, []);

  const verifyUser = (message) => {
    setIsVerified(true);
    console.log('User authenticated with credentials:', message);
    sessionStorage.setItem('isVerified', 'true');
    setFirstName(message.givenName);
    setLastName(message.familyName);
    setEmail(message.email);
  };

  const logoutUser = () => {
    setIsVerified(false);
    sessionStorage.removeItem('isVerified');
  };

  return (
    <AuthContext.Provider value={{ isVerified, firstName, lastName, email, verifyUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
