"use client";
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const verifyUser = (message) => {
    setIsVerified(true);
    console.log('User authenticated with credentials:', message);
    setFirstName(message.givenName);
    setLastName(message.familyName);
    setEmail(message.email);
  };

  return (
    <AuthContext.Provider value={{ isVerified, firstName, lastName, email, verifyUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
