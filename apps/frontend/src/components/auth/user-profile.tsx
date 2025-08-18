'use client';

import { useAuth0 } from '@auth0/auth0-react';

export const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated || !user) {
    return <div>No autenticado</div>;
  }

  return (
    <div className="flex items-center space-x-4">
      {user.picture && (
        <img
          src={user.picture}
          alt={user.name || 'Usuario'}
          className="w-10 h-10 rounded-full"
        />
      )}
      <div>
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};