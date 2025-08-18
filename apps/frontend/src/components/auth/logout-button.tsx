'use client';

import { useAuth0 } from '@auth0/auth0-react';

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Cerrar Sesión
    </button>
  );
};