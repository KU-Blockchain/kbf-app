"use client";
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);

  const verifyUser = (authToken) => {
    setIsVerified(true);
    console.log('User authenticated with token:', authToken);
  };

  return (
    <AuthContext.Provider value={{ isVerified, verifyUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
