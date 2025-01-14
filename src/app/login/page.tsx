"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/fireBase";
import Cookies from "js-cookie";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.senha
      );
      const token = await userCredential.user.getIdToken(); 

      
      Cookies.set("authToken", token, {
        expires: 7, 
        path: "/", 
      });

      toast.success("Login realizado com sucesso!");
      router.push("/"); 
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        toast.error("Usuário não encontrado.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Senha incorreta.");
      } else {
        toast.error("Erro ao fazer login. Tente novamente.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-indigo-700">
        <title>Login System</title>
        <meta name="description" content="registro caminhão" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/caminhao.jpg" />
        <section className="bg-indigo-700 text-center text-indigo-600">
          <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-indigo-800 dark:border-indigo-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-indigo-600 md:text-2xl dark:text-white">
                Login
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="text-left">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    E-mail
                  </label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    type="email"
                    name="email"
                    id="email"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
                <div className="text-left">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Senha
                  </label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, senha: e.target.value })
                    }
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-indigo-500 dark:text-indigo-400">
                  Ainda não tem uma conta?{" "}
                  <Link
                    href="/registro"
                    className="font-medium text-indigo-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  );
}
