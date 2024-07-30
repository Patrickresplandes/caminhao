"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; 
  }

  return (
    <div className="h-full w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-semibold">Menu</div>
      <nav className="flex flex-col mt-4">
        <Link href="/dashboard" className="p-4 hover:bg-gray-700">Dashboard</Link>
        <Link href="/cadastro-motorista" className="p-4 hover:bg-gray-700">Cadastro Motorista</Link>
        <Link href="/cadastro-nota" className="p-4 hover:bg-gray-700">Cadastro Nota</Link>
        <Link href="/visualizar-nota" className="p-4 hover:bg-gray-700">Visualizar Nota</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
