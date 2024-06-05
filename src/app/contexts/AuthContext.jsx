"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // load the verification status and user details from session storage when the component mounts
    sessionStorage.setItem('isVerified', 'true');
    const storedIsVerified = sessionStorage.getItem('isVerified') === 'true';
    const storedFirstName = "Micah"//sessionStorage.getItem('firstName');
    const storedLastName = "Borghese"//sessionStorage.getItem('lastName');
    const storedEmail = "micahborghese@gmail.com"//sessionStorage.getItem('email');

    if (storedIsVerified) {
      setIsVerified(storedIsVerified);
      setFirstName(storedFirstName);
      setLastName(storedLastName);
      setEmail(storedEmail);
    }
  }, []);

  const verifyUser = (message) => {
    setIsVerified(true);
    setFirstName(message.givenName);
    setLastName(message.familyName);
    setEmail(message.email);

    sessionStorage.setItem('isVerified', 'true');
    sessionStorage.setItem('firstName', message.givenName);
    sessionStorage.setItem('lastName', message.familyName);
    sessionStorage.setItem('email', message.email);
  };

  const logoutUser = () => {
    setIsVerified(false);
    setFirstName('');
    setLastName('');
    setEmail('');

    sessionStorage.removeItem('isVerified');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('email');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isVerified, 
        firstName, 
        lastName, 
        email, 
        verifyUser, 
        logoutUser 
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
