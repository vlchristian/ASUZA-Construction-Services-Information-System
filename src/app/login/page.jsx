"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Header from "@/components/Header";
import Image from "next/image";

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
        
        <div className="flex flex-col h-screen">
            <Header/>
            <div className="absolute inset-0 -z-10">
                    <Image
                        src="/bg.jpg"
                        alt="Background"
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                </div>
                <div className="flex-1 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 shadow-xl rounded z-10">

                <h1 className="text-black font-bold text-2xl">Welcome back</h1>
                <p className="text-gray-400 mb-4">Please enter your details</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="text-red-600 text-center bg-red-100 p-2 mb-4 text-sm">{error}</div>
                    )}
                    <div className="mb-4">
                        <label className="block mb-1 text-black">Email</label>
                        <input type="email"
                            name="email"
                            className="mt-1 w-full p-2 border border-gray-700 rounded placeholder-gray-400 text-black"
                            placeholder="Email"
                            required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-1 text-black">Password</label>
                        <input type="password"
                            name="password"
                            className="mt-1 w-full p-2 border border-gray-700 rounded placeholder-gray-400 text-black"
                            placeholder="Password"
                            required />
                    </div>
                    <button type="submit"
                        disabled={loading}
                        className="w-full bg-orange-600 text-white rounded-md py-2 hover:bg-orange-700 disabled:opacity-50">{
                            loading ? "Logging in..." : "Login"
                        }</button>
                    <p className="text-center text-sm text-black">Don't have an account? <Link href={"/register"} className="text-orange-600 hover:underline">Register</Link></p>
                </form>
            </div>
            </div>
        </div>
    );
}