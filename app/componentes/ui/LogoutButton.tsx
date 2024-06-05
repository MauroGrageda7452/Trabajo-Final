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
    <Button onClick={handleLogout} text="Logout" className="bg-red-500 text-white p-2 rounded mt-2 mr-3" />
  );
};

export default Logout;