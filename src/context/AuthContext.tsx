"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { signInRequest, recoverUserInformation } from '@/services/auth';
import { toast } from "react-toastify";

type User = {
  email: string;
}

type SignInData = {
  email: string;
  senha: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const token = Cookies.get('tokenCar');
    if (token) {
      recoverUserInformation(token).then(response => {
        console.log('Recovered user info:', response.user);
        setUser(response.user);
      }).catch(error => {
        console.error('Failed to recover user information:', error);
        Cookies.remove('tokenCar'); // Remover token inválido
      });
    }
  }, []);

  async function signIn({ email, senha }: SignInData) {
    try {
      const { tokenCar, user } = await signInRequest({ email, senha });

      Cookies.set('tokenCar', tokenCar, {
        expires: 1,
      });
      setUser(user);
      router.push('/'); 
    } catch (error) {
      console.error('Failed to sign in:', error);
      toast.error('Login failed. Please check your credentials and try again.');
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
