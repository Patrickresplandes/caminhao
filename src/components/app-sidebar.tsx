"use client";

import { useSidebar } from "@/components/ui/sidebar"; // Importando o contexto
import Link from "next/link";
import { FiHome, FiUser, FiTool, FiFileText, FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth"; 
import { auth } from "@/fireBase"; // Importando a autenticação do Firebase
import { useRouter } from "next/navigation";

const AppSidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar(); // Obtendo o estado do sidebar
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut(auth); // Realiza o logout no Firebase
      router.push("/login"); // Redireciona para a página de login
    } catch (error) {
      console.error("Erro ao fazer logout:", error); // Tratamento de erro
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all ${
        isOpen ? "w-64" : "w-0" // Controla a largura do sidebar com base no estado
      }`}
    >
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

export { AppSidebar };
