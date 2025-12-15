"use client";
import Link from "next/link";

export default function PendingPage() {
    return (
        <div className="bg-white items-center justify-center flex flex-col min-h-screen">
            <div className="bg-white rounded-lg shadow-md max-w-md w-full text-center p-8">
            <h1 className="text-black font-bold mb-4">Registration Successful!</h1>
            <p className="text-sm text-gray-600 mb-6">Your account is <strong>pending for admin approval</strong>. You will recieve an email once your account is active.</p>
            <Link
            href={"/"}
            className="block text-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >Go to Home Page</Link>
            </div>
        </div>
    )
}