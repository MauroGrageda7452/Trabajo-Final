'use client'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../componentes/ui/Button';

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      console.log('Login successful');

      Cookies.set('authToken', data.token); // Guarda el token de autenticación en cookies
      Cookies.set('userId', data.userId); // Guarda el userId en cookies
      router.push('/');  
    } catch (error) {
      setError(String(error));
    }
  };

  return (
    <div className="min-h-screen max-h-screen flex items-center justify-center bg-no-repeat bg-center" style={{ backgroundImage: "url('/images/bg-login.png')" }}>
      <div className="bg-contain bg-no-repeat bg-center p-20" style={{ backgroundImage: "url('/elements/container.png')"}}>
        <div className="bg-contain bg-center bg-no-repeat text-transparent w-full h-96 -mb-44 -mt-32" style={{ backgroundImage: "url('/elements/titulo.png')"}}>.</div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="bg-contain bg-no-repeat bg-center p-16" style={{ backgroundImage: "url('/elements/pass-container.png')"}}>
            <div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-md p-1.5 w-full mb-2 placeholder-black placeholder-opacity-40 text-black bg-green-500"
                placeholder="Username"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md p-1.5 w-full placeholder-black placeholder-opacity-40 text-black bg-green-500"
                placeholder="Password"
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className='flex flex-row justify-center items-center mt-4'>
            <Button
              //type="submit"
              className="w-1/2 flex justify-center -ml-5 py-2 px-4 text-xl font-black text-gray-800"
              text="Sign in"
            />
            <Link href="/register">
              <Button 
                className="w-full ml-4 mr-3 flex justify-center py-2 px-4 text-xl font-black text-gray-800"
                text="Register"
              />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

