"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, isLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        isLoading(true);
        setError("")
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            const result = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
            });
            if (result.error) {
                setError(result.error);
                isLoading(false);
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            setError("Something went wrong.");
            isLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-500">
            <div className="max-w-md w-full bg-gray-50 p-8 rounded-lg shadow-md">
                
            <h1 className="text-black font-bold mb-4 text-center text-2xl">Login</h1>
            <form onSubmit={handleSubmit} className= "space-y-4">
                {error && (
                    <div className="text-red-600 text-center bg-red-100 p-2 mb-4 text-sm">{error}</div>
                )}
                <div className="mb-4">
                    <label className="block mb-1 text-black">Email</label>
                    <input type="email"
                        name="email"
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-black"
                        placeholder="Email"
                        required />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 text-black">Password</label>
                    <input type="password"
                        name="password"
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-black"
                        placeholder="Password"
                        required />
                </div>
                <button type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 disabled:opacity-50">{
                        loading ? "Logging in..." : "Login"
                    }</button>
            </form>
            </div>
        </div>
    );
}