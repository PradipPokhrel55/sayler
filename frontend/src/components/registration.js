import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long.");
        }
        if (/^\d+$/.test(password)) {
            errors.push("Password cannot be entirely numeric.");
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrors({});

        // Validate passwords
        if (formData.password !== formData.password2) {
            setMessage('Passwords do not match.');
            return;
        }

        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) {
            setMessage(passwordErrors.join(" "));
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/user/api/register/', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setMessage('Registration successful');
        } catch (error) {
            console.error('Registration error:', error);
            if (error.response && error.response.data) {
                const serverErrors = error.response.data;
                setErrors(serverErrors);
                setMessage('Registration failed. Please check the errors below.');
            } else {
                setMessage('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                {message && <p className={`text-center mb-4 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex items-center">
                        <label className="w-1/3 text-gray-700">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-2/3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="w-1/3 text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-2/3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="w-1/3 text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-2/3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="w-1/3 text-gray-700">RePassword:</label>
                        <input
                            type="password"
                            name="password2"
                            value={formData.password2}
                            onChange={handleChange}
                            required
                            className="w-2/3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
