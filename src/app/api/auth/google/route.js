import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;

    // 🌐 JUGAAZ: URL ko dynamic nikal lo (Local par localhost, Vercel par vercel domain)
    const { origin } = request.nextUrl; 
    const redirectUri = `${origin}/api/auth/google/callback`;

    const scope = "openid email profile";

    if (!clientId) {
      console.error("🚨 CRITICAL: GOOGLE_CLIENT_ID env me missing hai bhai!");
      return NextResponse.json({ error: "Google Client ID nahi mili" }, { status: 500 });
    }

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&prompt=consent`;

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("💥 GOOGLE_REDIRECT_ROUTE_ERROR:", error);
    return NextResponse.json({ error: "Google redirection failed" }, { status: 500 });
  }
}