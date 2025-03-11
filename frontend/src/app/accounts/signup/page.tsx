'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '@/services/api/auth/auth';

export default function SignUp() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Basic validation
        if ( !formData.email || !formData.password) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }
        try {
            await registerUser(formData);
            router.push('/accounts/login');
        } catch (err) {
            console.log(err);
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">

                    <h2 className="mb-6 text-center text-2xl font-bold">
                        Create your account
                    </h2>

                
                {error && (
                    <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
                        {error}
                    </div>
                )}
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md ">
                        
                        <div>
                            <label htmlFor="email" className="mb-1 block text-sm font-medium">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email" 
                                required
                                className="w-full rounded-md border border-gray-300 p-2"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="mb-1 block text-sm font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="w-full rounded-md border border-gray-300 p-2"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="w-full rounded-md border border-gray-300 p-2"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {loading ? 'Creating account...' : 'Sign up'}
                        </button>
                    </div>
                </form>

                <div className="text-sm text-center">
                    Already have an account?{' '}
                    <Link href="/accounts/login" className="text-blue-600 hover:underline">
                        login
                    </Link>
                </div>
            </div>
        </div>
    );
}