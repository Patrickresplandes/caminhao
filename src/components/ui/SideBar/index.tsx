"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi'; 

const Sidebar = () => {
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; 
  }

  const logout = () => {
    Cookies.remove('tokenCar');
    router.push('/login');
  };

  return (
    <div className="h-full w-64 bg-gray-800 text-white flex flex-col justify-between">
      <div>
        <div className="p-4 text-2xl font-semibold">Menu</div>
        <nav className="flex flex-col mt-4">
          <Link href="/dashboard" className="p-4 hover:bg-gray-700">Dashboard</Link>
          <Link href="/cadastro-motorista" className="p-4 hover:bg-gray-700">Motoristas</Link>
          <Link href="/manutencao" className="p-4 hover:bg-gray-700">Manutenção</Link>
          <Link href="/cadastro-nota" className="p-4 hover:bg-gray-700">Cadastro Nota</Link>
          <Link href="/visualizar-nota" className="p-4 hover:bg-gray-700">Visualizar Nota</Link>
        </nav>
      </div>
      <div className="p-4">
        <button 
          onClick={logout} 
          className="flex items-center justify-center w-full p-2 bg-red-600 hover:bg-gray-600 text-white font-semibold text-sm rounded transition duration-200"
        >
          <FiLogOut className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
