'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'User' | 'Doctor' | 'Admin';
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo);
        return;
      }

      if (requiredRole && user.role !== requiredRole) {
        // Check if user has sufficient privileges
        const roleHierarchy = { 'User': 0, 'Doctor': 1, 'Admin': 2 };
        const userLevel = roleHierarchy[user.role];
        const requiredLevel = roleHierarchy[requiredRole];

        if (userLevel < requiredLevel) {
          router.push('/unauthorized');
          return;
        }
      }

      // Check if doctor is approved
      if (user.role === 'Doctor' && user.doctorStatus !== 'Approved' && requiredRole === 'Doctor') {
        router.push('/pending-approval');
        return;
      }
    }
  }, [user, loading, requiredRole, router, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
