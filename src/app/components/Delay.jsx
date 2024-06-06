"use client";
import React, { useState, useEffect } from 'react';
import '../globals.css'; 

const DelayedComponent = ({ delay, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 10); // Small delay to trigger transition
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <>
      {shouldRender && (
        <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
          {children}
        </div>
      )}
    </>
  );
};

export default DelayedComponent;
