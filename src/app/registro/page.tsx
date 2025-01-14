"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/fireBase"; 
export default function Register() {
    const [formData, setFormData] = useState({ nome: "", email: "", senha: "" });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Cria o usuário com o Firebase Authentication
            await createUserWithEmailAndPassword(auth, formData.email, formData.senha);
            toast.success("Usuário registrado com sucesso!");
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (error: any) {
            // Tratar erros de registro
            const errorMessage = error.message || "Erro ao registrar usuário";
            toast.error(errorMessage);
        }
    };

    return (
        <>
            <title>Registro</title>
            <div className="flex justify-center items-center w-full h-screen bg-indigo-700">
                <section className="bg-indigo-700 text-center">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-indigo-800 dark:border-indigo-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-indigo-700 md:text-2xl dark:text-white">
                                    Crie sua Conta
                                </h1>
                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                    <div className="text-left">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-indigo-700 dark:text-white">
                                            Nome
                                        </label>
                                        <input
                                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-indigo-50 border border-indigo-300 text-indigo-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Seu Nome"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-700 dark:text-white">
                                            E-mail
                                        </label>
                                        <input
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-indigo-50 border border-indigo-300 text-indigo-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="seuemail@empresa.com"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-indigo-700 dark:text-white">
                                            Senha
                                        </label>
                                        <input
                                            onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-indigo-50 border border-indigo-300 text-indigo-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Criar
                                    </button>
                                    <p className="text-sm font-light text-indigo-500 dark:text-indigo-400">
                                        Já tem uma conta?{" "}
                                        <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            Login
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <ToastContainer />
            </div>
        </>
    );
}
