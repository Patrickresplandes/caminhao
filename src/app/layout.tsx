"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/ui/SideBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const noSidebarRoutes = ["/login", "/registro"];

  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <div className="flex">
          {!noSidebarRoutes.includes(pathname) && (
              <div className="fixed top-0 left-0 h-screen z-30">
                <Sidebar />
              </div>
            )}
            <div className="lg:ml-14 w-full">{children}</div>
          </div>
          
        </body>
      </AuthProvider>
    </html>
  );
}
