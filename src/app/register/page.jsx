import Header from "@/components/layouts/Header";
import Image from "next/image";
import { RegisterForm } from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
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
          <RegisterForm/>
        </div>
      </div>
    </div>
  );
}