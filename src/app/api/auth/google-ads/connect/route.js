import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // 1. Core Environmental Variables Isolation
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/google-ads/callback`;

    if (!clientId) {
      console.error("🚨 CRITICAL BUG: GOOGLE_CLIENT_ID missing!");
      return NextResponse.json({ error: "Configuration Missing" }, { status: 500 });
    }

    // 🔍 INTERNAL DEBUG MATRIX: Check user intentionality
    const url = new URL(request.url);
    const isManualTrigger = url.searchParams.get("trigger") === "manual";

    // 🛑 CRITICAL LOOP GUARD
    if (!isManualTrigger) {
      return NextResponse.json({
        success: true,
        connectUrl: `${url.origin}/api/auth/google-ads/connect?trigger=manual`
      });
    }

    // 🛠️ THE GOLDEN MATCH: Jo console me add kiya, wahi sateek link code me!
    const scopes = [
      "https://www.googleapis.com/auth/adwords" // 🔥 100% Matching with Cloud Console Sensitive Table
    ];

    console.log("------------------ SCOPE MATCH ENGINE ------------------");
    console.log("📡 Callback Redirect URI Map:", redirectUri);
    console.log("🚀 Injecting Registered Scope:", scopes.join(" "));
    console.log("--------------------------------------------------------");

    // 3. Construct Native Google Authorization Gateway Endpoint URL
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    
    googleAuthUrl.searchParams.append("client_id", clientId.trim());
    googleAuthUrl.searchParams.append("redirect_uri", redirectUri.trim());
    googleAuthUrl.searchParams.append("response_type", "code");
    googleAuthUrl.searchParams.append("scope", scopes.join(" "));
    googleAuthUrl.searchParams.append("access_type", "offline");
    googleAuthUrl.searchParams.append("prompt", "select_account consent"); 

    return NextResponse.redirect(googleAuthUrl.toString());

  } catch (error) {
    console.error("💥 GOOGLE_ADS_CONNECT_ROUTE_CRASH_REPORT:", error);
    return NextResponse.json({ error: "Internal Failure", details: error.message }, { status: 500 });
  }
}