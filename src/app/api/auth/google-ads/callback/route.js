import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // 1. Google ne jo wapas aate waqt temporary code diya hai, use URL se nikalo
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");

    // Agar user ne cancel kar diya ya koi panga hua
    if (errorParam) {
      console.error("🚨 User ne access mana kar diya ya Google error aaya:", errorParam);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?google_ads=failed`);
    }

    if (!code) {
      return NextResponse.json({ error: "Authorization code nahi mila bhai!" }, { status: 400 });
    }

    console.log("⚡ Google se temporary connection code mil gaya hai. Ab tokens exchange karenge...");

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/google-ads/callback`;

    // 2. Is temporary code ko Google ke main server par bhejkar permanent Secret Tokens maango
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: code,
        client_id: clientId.trim(),
        client_secret: clientSecret.trim(),
        redirect_uri: redirectUri.trim(),
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("💥 Google Token Exchange Failed:", tokens);
      return NextResponse.json({ error: "Google ne permanent token dene se mana kiya", details: tokens }, { status: 500 });
    }

    // 🔍 BOOM! Google ne hume tokens de diye!
    console.log("✅ SUCCESS! Google Ads permanent connection tokens mil gaye hain!");
    console.log("🔑 Access Token (Short-lived):", tokens.access_token);
    console.log("🔄 Refresh Token (Long-lived - Persistent):", tokens.refresh_token);

    // 3. DATABASE HOOK (Abhi console me print kar rahe hain, iske baad save karenge)
    // TODO: await connectDB();
    // Tumhare user document me tokens save karne ka logic yahan aayega bhai.
    console.log("💾 Ready to save tokens to MongoDB for integration mapping...");

    // 4. Connection successfully lock hone ke baad user ko ?google_ads=connected ke sath dashboard par bhejo
    // Isse hamara naya sidebar automatic is parameter ko padh kar state "Connected" kar dega!
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?google_ads=connected`);

  } catch (error) {
    console.error("💥 GOOGLE_ADS_CALLBACK_ROUTE_CRASH:", error);
    return NextResponse.json({ error: "Internal Server Error in Callback", details: error.message }, { status: 500 });
  }
}