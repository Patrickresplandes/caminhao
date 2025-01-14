"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut, FiHome, FiUser, FiTool, FiFileText } from "react-icons/fi";
import { signOut } from "firebase/auth"; 
import { auth } from "@/fireBase";

const Sidebar = () => {
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const logout = async () => {
    try {
      await signOut(auth); 
      router.push("/login")
    } catch (error) {
      console.error("Erro ao fazer logout:", error); 
    }
  };

  return (
    <div className="h-full w-64 bg-gray-800 text-white flex flex-col justify-between">
      <div>
        <div className="p-4 text-2xl font-semibold">Menu</div>
        <nav className="flex flex-col mt-4">
          <Link href="/dashboard" className="p-4 flex items-center hover:bg-gray-700">
            <FiHome className="mr-2" /> Dashboard
          </Link>
          <Link href="/cadastro-motorista" className="p-4 flex items-center hover:bg-gray-700">
            <FiUser className="mr-2" /> Motoristas
          </Link>
          <Link href="/manutencao" className="p-4 flex items-center hover:bg-gray-700">
            <FiTool className="mr-2" /> Manutenção
          </Link>
          <Link href="/cadastro-nota" className="p-4 flex items-center hover:bg-gray-700">
            <FiFileText className="mr-2" /> Cadastro Nota
          </Link>
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
