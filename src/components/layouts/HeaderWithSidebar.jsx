"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { navigation } from "@/config/nav";
import Image from "next/image";
import { useState } from "react";
import Header from "@/components/layouts/Header"

export default function HeaderWithSidebar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const userRole = session?.user?.role;
  const navItems = userRole && navigation[userRole] ? navigation[userRole] : [];

  if (!userRole) return null;

  return (
    <div className="w-full">
      <div className="bg-white border-b border-gray-200 flex items-center gap-4 px-4 py-2 relative">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none absolute left-4"
          >
            <div className="text-black text-3xl">=</div>
          </button>
        )}
        <div className="mx-auto">      
        <Header />
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0  bg-opacity-50 z-30"
        />
      )}
      <aside
        className={`fixed left-0 top-0 bg-white h-screen flex flex-col border-r border-gray-200 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden z-40
          ${isOpen ? "w-64 p-4" : "w-0 p-0 border-none"} 
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center justify-center flex-1">
            <Image
              src={"/logo.png"}
              width={50}
              height={50}
              alt="company logo"
              className="object-contain"
            />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
          >
            <div className="text-black ml-2 mr-2">X</div>
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathName === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-orange-600 text-white font-medium"
                    : "text-gray-500 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full mt-4 bg-red-600 text-white font-bold py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          LOGOUT
        </button>
      </aside>
    </div>
  );
}