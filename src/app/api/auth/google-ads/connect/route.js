import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // 1. Core Environmental Variables Isolation
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/google-ads/callback`;

    if (!clientId) {
      console.error("🚨 CRITICAL: GOOGLE_CLIENT_ID .env.local file me nahi mil raha hai bhai!");
      return NextResponse.json(
        { error: "Google OAuth Client Configuration Missing from Env structure" },
        { status: 500 }
      );
    }

    // 2. Strict Scope Formatting Configuration (Bina kisi extra hidden slash ke)
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/googleads"
    ];

    // 3. Construct Native Google Authorization Gateway Endpoint URL
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    
    googleAuthUrl.searchParams.append("client_id", clientId.trim());
    googleAuthUrl.searchParams.append("redirect_uri", redirectUri.trim());
    googleAuthUrl.searchParams.append("response_type", "code");
    
    // Scopes array ko clean standard single space (" ") se join karke pass karo
    googleAuthUrl.searchParams.append("scope", scopes.join(" "));
    
    // ⚡ OFFLINE ACCESS PARAMETERS: Long-term backend synchronization tokens ke liye mandatory hai
    googleAuthUrl.searchParams.append("access_type", "offline");
    
    // 🔥 THE FIX: 'select_account' se cookies overlap block hoga aur 'consent' se refresh token generate hoga
    googleAuthUrl.searchParams.append("prompt", "select_account consent"); 

    console.log("🚀 FORCING RE-AUTHENTICATION: Redirecting user to clean Google Ads Gateway Screen...");

    // 4. Fire the absolute application response redirect native payload
    return NextResponse.redirect(googleAuthUrl.toString());

  } catch (error) {
    console.error("💥 GOOGLE_ADS_CONNECT_ROUTE_CRASH_REPORT:", error);
    return NextResponse.json(
      { error: "Internal App Router Connection Failure", details: error.message },
      { status: 500 }
    );
  }
}