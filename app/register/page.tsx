'use client'
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Button from "../componentes/ui/Button";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            if (!response.ok) {
                throw new Error('Failed to register');
            }
            router.push('/login')
            //onRegister(); // Llamamos a la función pasada por prop para cambiar la vista
        } catch (err) {
            setError('Failed to register');
        }
    };

    return (
        <div className="min-h-screen max-h-screen flex items-center justify-center bg-no-repeat bg-center" style={{ backgroundImage: "url('/images/bg-login.png')" }}>
            <div className="bg-contain bg-no-repeat bg-center p-20" style={{ backgroundImage: "url('/elements/container.png')"}}>
            <div className="bg-contain bg-center bg-no-repeat text-transparent w-full h-96 -mb-44 -mt-32" style={{ backgroundImage: "url('/elements/titulo.png')"}}>.</div>
                <div>
                    <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900 -mb-16">Register for an account</h2>
                </div>
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
                                className="mt-2 rounded-md p-1.5 w-full mb-2 placeholder-black placeholder-opacity-40 text-black bg-green-500"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="rounded-md p-1.5 w-full mb-2 placeholder-black placeholder-opacity-40 text-black bg-green-500"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-md p-1.5 w-full mb-2 placeholder-black placeholder-opacity-40 text-black bg-green-500"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <div className='flex flex-row justify-center items-center -mt-5'>
                        <Button
                        //type="submit"
                            className="w-1/2 flex justify-center -ml-5 py-2 px-4 text-xl font-black text-gray-800"
                            text="Register"
                        />
                        <Link href="/login">
                            <Button 
                                className="w-full ml-4 mr-3 flex justify-center py-2 px-4 text-xl font-black text-gray-800"
                                text="Back to login"
                            />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

