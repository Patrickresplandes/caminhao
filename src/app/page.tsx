"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tokenFromCookies = Cookies.get('authToken');
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

  if (token === null) {
    return null; 
  }

  return (
      <div className=' bg-indigo-700 flex w-full flex-col justify-center items-center text-white'>
        <p className='text-4xl font-extrabold mb-4'>Welcome to Home Page</p>
    </div>
  );
}
