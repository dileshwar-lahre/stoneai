import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const appId = process.env.FACEBOOK_APP_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/facebook/callback`;

    if (!appId || appId.includes("YAHAN_APNI")) {
      console.error("🚨 FACEBOOK_APP_ID missing hai env me bhai!");
      return NextResponse.json({ error: "Meta App ID Configuration Missing" }, { status: 500 });
    }

    // 🔥 INSTAGRAM & FACEBOOK SUPER SCOPES
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
    
    // Meta me commas se separate hota hai scope
    metaAuthUrl.searchParams.append("scope", scopes.join(","));
    metaAuthUrl.searchParams.append("auth_type", "rerequest");

    console.log("🚀 Meta Connect Route: Redirecting user to Facebook/Instagram Permissions...");

    return NextResponse.redirect(metaAuthUrl.toString());

  } catch (error) {
    console.error("💥 META_CONNECT_ROUTE_CRASH:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}