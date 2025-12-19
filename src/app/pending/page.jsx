"use client";
import Link from "next/link";
import Image from "next/image";

export default function PendingPage() {
    return (
        <div className="items-center justify-center flex flex-col min-h-screen">
            <div className="fixed inset-0 -z-50">
                                <Image
                                    src="/bg.jpg"
                                    alt="Background"
                                    fill
                                    className="object-cover brightness-50"
                                    priority
                                />
                                </div>
                                <div className="flex-1 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md max-w-md w-full text-center p-8">
            <h1 className="text-black font-bold mb-4">Registration Successful!</h1>
            <p className="text-sm text-gray-600 mb-6">Your account is <strong>pending for admin approval</strong>. You will recieve an email once your account is active.</p>
            <Link
            href={"/"}
            className="block text-center w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 disabled:opacity-50 transition-colors"
            >Go to Home Page</Link>
            </div>
            </div>
        </div>
    )
}