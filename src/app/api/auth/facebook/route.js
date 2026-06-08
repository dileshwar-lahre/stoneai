import { NextResponse } from "next/server";

// 👁️ CRITICAL TRACER LOGS: Server runtime track karne ke liye
console.log("--------------------------------------------------");
console.log("🔥 ALERT: Facebook Connect API Route File Loaded By Node Engine!");
console.log("--------------------------------------------------");

export async function GET(request) {
  try {
    console.log("📥 Inside GET Method Handler of Facebook Connect");
    
    const appId = process.env.FACEBOOK_APP_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/facebook/callback`;

    console.log("🔍 ENV CHECK -> APP_ID:", appId ? "FOUND" : "MISSING", "| REDIRECT_URI:", redirectUri);

    if (!appId || appId.includes("YAHAN_APNI")) {
      console.error("🚨 CONFIG_ERROR: FACEBOOK_APP_ID environment variable config me nahi mila bhai!");
      return NextResponse.json({ error: "Meta App ID Configuration Missing" }, { status: 500 });
    }

    const scopes = [
      "public_profile",
      "email",
      "pages_show_list",
      "pages_read_engagement",
      "instagram_basic",
      "instagram_manage_insights"
    ];

    const metaAuthUrl = new URL("https://www.facebook.com/v19.0/dialog/oauth");
    metaAuthUrl.searchParams.append("client_id", appId.trim());
    metaAuthUrl.searchParams.append("redirect_uri", redirectUri.trim());
    metaAuthUrl.searchParams.append("response_type", "code");
    metaAuthUrl.searchParams.append("scope", scopes.join(","));
    metaAuthUrl.searchParams.append("auth_type", "rerequest");

    console.log("🚀 URL BUILT SUCCESSFUL! Hard redirecting to Meta Gateway Screen...");
    return NextResponse.redirect(metaAuthUrl.toString());

  } catch (error) {
    console.error("💥 CRITICAL_GET_METHOD_CRASH:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}