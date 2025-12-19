"use client";

import { useState } from "react";
import { registerSchema } from "@/lib/validators/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Header from "@/components/Header";
import Image from "next/image";

export default function RegisterPage() {
    const router = useRouter();
    const [serverError, setServerError] = useState(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        setServerError(null);
        try{
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if(!response.ok){
                setServerError(result.message);
                return;
            }
            router.push('/pending')
        } catch (error) {
            setServerError("Something went wrong");
        }
    }
    return (
    
    <div className="flex flex-col h-screen">
      <Header/>
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

      <div className="max-w-md w-full bg-white p-8 rounded shadow-xl z-10">
        <h2 className="text-2xl font-bold text-black">Create your account</h2>
                <p className="text-gray-400 mb-4">Please enter your details</p>

        {serverError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              {...register("username")}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-black"
              placeholder="username"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              {...register("fullName")}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-black"
              placeholder="Full Name"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-black"
              placeholder="email@address.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-black"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-black"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>
          <p className="text-black text-center text-sm">Already have an account? <Link href={"/login"} className="text-orange-600 hover:underline">Login</Link> here</p>
        </form>
      </div>
      </div>
    </div>
  );
}