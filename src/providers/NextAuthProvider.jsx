// 📂 src/providers/NextAuthProvider.jsx
"use client";

import { SessionProvider } from "next-auth/react";

// 🚨 Dhayan do: Yahan 'export default' hona zaroori hai!
export default function NextAuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}