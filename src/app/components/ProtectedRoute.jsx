// components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { isVerified } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isVerified) {
      router.push('/');
    }
  }, [isVerified, router]);

  if (!isVerified) {
    return null; // could also render a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;
