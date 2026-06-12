"use client"; // 🚨 Layout ko client component bana diya taaki SessionProvider direct chal sake

import { SessionProvider } from "next-auth/react"; // 🔥 Direct Next-Auth se import kiya
import Navbar from './components/Navbar';
import './globals.css';
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased" suppressHydrationWarning>
        {/* 🚀 Bina kisi external file ke direct wrapper lag gaya! */}
        <SessionProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer/>
        </SessionProvider>
      </body>
    </html>
  );
}