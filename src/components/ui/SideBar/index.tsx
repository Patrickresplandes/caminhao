"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut, FiHome, FiUser, FiTool, FiFileText, FiDollarSign } from "react-icons/fi";
import { signOut } from "firebase/auth"; 
import { auth } from "@/fireBase";

const Sidebar = () => {
  const [hydrated, setHydrated] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true); 
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
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error); 
    }
  };

  return (
    <div
      className={`h-screen ${
        isCollapsed ? "w-16" : "w-64"
      } bg-gray-800 text-white flex flex-col justify-between transition-all duration-300`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <div>
        <div className={`p-4 text-2xl font-semibold ${isCollapsed && "hidden"}`}>
          Menu
        </div>
        <nav className="flex flex-col mt-4">
          <Link href="/dashboard" className="p-4 flex items-center hover:bg-gray-700">
            <FiHome className="mr-2" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          <Link href="/cadastro-motorista" className="p-4 flex items-center hover:bg-gray-700">
            <FiUser className="mr-2" />
            {!isCollapsed && <span>Motoristas</span>}
          </Link>
          <Link href="/manutencao" className="p-4 flex items-center hover:bg-gray-700">
            <FiTool className="mr-2" />
            {!isCollapsed && <span>Manutenção</span>}
          </Link>
          <Link href="/cadastro-nota" className="p-4 flex items-center hover:bg-gray-700">
            <FiFileText className="mr-2" />
            {!isCollapsed && <span>Cadastro Nota</span>}
          </Link>
          <Link href="/controle-or" className="p-4 flex items-center hover:bg-gray-700">
            <FiDollarSign className="mr-2" />
            {!isCollapsed && <span>Cadastro OR</span>}
          </Link>
        </nav>
      </div>
      <div className="p-4">
        <button
          onClick={logout}
          className="flex items-center justify-center w-full p-2 bg-red-600 hover:bg-gray-600 text-white font-semibold text-sm rounded transition duration-200"
        >
          <FiLogOut className="mr-2" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
