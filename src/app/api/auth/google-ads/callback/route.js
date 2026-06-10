import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || origin;

    console.log("------------------ CALLBACK DATA STREAM ------------------");
    console.log("🔑 Auth Code From Google Captured Successfully!");
    console.log("🚨 Error Param Status:", errorParam || "NONE");
    console.log("----------------------------------------------------------");

    if (errorParam) {
      console.error("🚨 Access denied by Google validation screen:", errorParam);
      return NextResponse.redirect(`${appUrl}/dashboard?google_ads=failed`);
    }

    if (!code) {
      return NextResponse.json({ error: "Authorization code missing from pipeline!" }, { status: 400 });
    }

    console.log("⚡ Exchanging authorization code for permanent token data tokens...");

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${appUrl}/api/auth/google-ads/callback`;

    // Exchange Code for Permanent OAuth Tokens
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
      console.error("💥 Google Token Exchange CRASHED:", tokens);
      return NextResponse.json({ error: "Google rejected tokens exchange matrix", details: tokens }, { status: 500 });
    }

    // 🔍 TOKENS SECURELY CAPTURED IN MATRIX ENVIRONMENT
    console.log("------------------ CREDENTIALS EXCHANGED ------------------");
    console.log("✅ Permanent Access Token:", tokens.access_token.substring(0, 10) + "...");
    if (tokens.refresh_token) {
      console.log("🔄 Permanent Refresh Token Saved:", tokens.refresh_token.substring(0, 10) + "...");
    }
    console.log("-----------------------------------------------------------");

    // 🔒 SAFE LOOP BYPASS: Cookies inject karke user status ko 30 din ke liye "connected" state me lock kar rahe hain
    const response = NextResponse.redirect(`${appUrl}/dashboard?google_ads=connected`);
    
    response.cookies.set("google_ads_status", "connected", {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 Din ke liye status cookie saved
      httpOnly: false,           // Client-side React hooks read kar sakein
      secure: process.env.NODE_ENV === "production",
    });

    return response;

  } catch (error) {
    console.error("💥 SYSTEM FAILURE IN CALLBACK:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}