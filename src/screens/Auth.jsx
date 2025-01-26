import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [form, setForm] = useState({ fullname: '', email: '', password: '' });
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const url = isLogin
            ? 'https://weird-samaria-webdev01-77782589.koyeb.app/api/v1/login'
            : 'https://weird-samaria-webdev01-77782589.koyeb.app/api/v1/signup';
        // Credential: includes
        try {
            const response = await axios.post(url, form , {
                credentials: "include",
            });
            setMessage(response.data.message);
            if (isLogin) {
                navigate("/")
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    {isLogin ? 'Login' : 'Sign Up'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullname"
                                value={form.fullname}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Your full name"
                                required={!isLogin}
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 ml-1 underline focus:outline-none"
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
                {message && (
                    <p className="text-center mt-4 text-red-500">{message}</p>
                )}
            </div>
        </div>
    );
}
