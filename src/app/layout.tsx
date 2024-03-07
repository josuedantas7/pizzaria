import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Notifier } from "@/components/Notifier/Notifier";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pizzaria",
  description: "A melhor pizzaria da cidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Notifier/>
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
