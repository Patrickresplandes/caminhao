"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
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

        <body className={inter.className}>
          <div className="flex">
            {!noSidebarRoutes.includes(pathname) && (
              <div className="fixed top-0 left-0 h-screen z-30">
                <Sidebar />
              </div>
            )}
            <div className={`w-full ${noSidebarRoutes.includes(pathname) ? "ml-0" : "lg:ml-14"}`}>
              {children}
            </div>

          </div>

        </body>
    </html>
  );
}
