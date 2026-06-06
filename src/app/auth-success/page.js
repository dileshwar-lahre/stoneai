"use client";

import { useEffect } from "react";

export default function AuthSuccessPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const email = params.get("email");
    const name = params.get("name");
    const picture = params.get("picture");
    const next = params.get("next") || "/dashboard/profile";

    localStorage.clear();

    if (!email) {
      window.location.replace("/login");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
        name,
        picture,
      })
    );

    window.location.replace(next);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Logging you in...
    </div>
  );
}