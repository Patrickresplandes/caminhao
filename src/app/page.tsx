"use client";

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/ui/SideBar';

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tokenFromCookies = Cookies.get('tokenCar');
      setToken(tokenFromCookies as string);
    }
  }, []);

  useEffect(() => {
    if (token === null) {
      return;
    }

    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const logout = () => {
    Cookies.remove('tokenCar');
    router.push('/login');
  };

  if (token === null) {
    return null; 
  }

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 bg-indigo-700 flex flex-col justify-center items-center text-white'>
        <p className='text-4xl font-extrabold mb-4'>Welcome to Home Page</p>
        <button 
          onClick={logout} 
          className='bg-white border-2 border-white hover:bg-transparent transition-all text-indigo-700 hover:text-white font-semibold text-lg px-4 py-2 rounded duration-700'
        >
          Logout
        </button>
      </div>
    </div>
  );
}
