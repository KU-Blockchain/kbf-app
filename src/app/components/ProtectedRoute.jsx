// components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isVerified } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const storedIsVerified = sessionStorage.getItem('isVerified') === 'true';
    if (!storedIsVerified) {
      router.push('/');
    }
  }, [isVerified, router]);

  if (!isVerified) {
    return null; // could also render a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;
