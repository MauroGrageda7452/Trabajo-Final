import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import React from 'react';
import Button from './Button';

const Logout: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('authToken');
    router.push('/login');
  };

  return (
    <Button onClick={handleLogout} text="Salir" className="text-gray-900  font-black p-2 rounded mr-3" />
  );
};

export default Logout;