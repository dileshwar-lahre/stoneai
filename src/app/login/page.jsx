"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaTimes,
  FaGoogle,
} from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState("");

  // =========================
  // MANUAL LOGIN
  // =========================
  const handleLogin = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Login failed");
        return;
      }

      // SAVE TOKEN
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login Successful 🚀");

      // DIRECT REDIRECT
      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================
  const handleGoogleLogin = () => {
    try {
      setGoogleLoading(true);
      // FULL PAGE REDIRECT
      window.location.assign("/api/auth/google");
    } catch (error) {
      console.log(error);
      setGoogleLoading(false);
    }
  };

  return (
    /* 🛠️ FIXED: 'fixed inset-0' ko hatakar layout flow set kiya taaki footer hamesha bottom me rahe */
    <div className="w-full min-h-[85vh] relative flex items-center justify-center px-4 py-16 bg-[#000000]">

      {/* CARD */}
      <div className="w-full max-w-[430px] bg-[#0B1220] border border-cyan-500/20 rounded-2xl p-6 relative shadow-2xl z-10">

        {/* CLOSE */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          <FaTimes />
        </button>

        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img
            src="/images/mydigitalpatron.png"
            className="w-14 h-14 rounded-xl border border-cyan-500/20"
            alt="logo"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center text-cyan-400">
          Login to AdsCRM
        </h1>

        <p className="text-center text-gray-400 text-sm mt-1 mb-6">
          Manage Ads, Leads & Campaigns
        </p>

        {/* MESSAGE */}
        {message && (
          <div className="mb-4 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm rounded-xl p-3 text-center">
            {message}
          </div>
        )}

        {/* FORM */}
        <div className="space-y-3">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-cyan-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white focus:border-cyan-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* FORGOT */}
          <div className="text-right">
            <button
              type="button"
              className="text-xs text-cyan-400 hover:text-cyan-300 transition"
            >
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-white/10"></div>
          <span className="text-gray-500 text-xs">OR</span>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 bg-white text-black px-5 py-3 rounded-xl font-medium hover:bg-gray-200 transition disabled:opacity-50"
        >
          <FaGoogle />
          {googleLoading ? "Redirecting..." : "Continue with Google"}
        </button>

        {/* REGISTER */}
        <div className="mt-5 text-center">
          <span className="text-gray-400 text-sm">
            Don&apos;t have an account?
          </span>
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="ml-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition"
          >
            Register
          </button>
        </div>

      </div>

    </div>
  );
}