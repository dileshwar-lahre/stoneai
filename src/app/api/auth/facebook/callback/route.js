import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      console.error("🚨 User cancelled Meta access:", errorParam);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?facebook=failed`);
    }

    if (!code) {
      return NextResponse.json({ error: "Meta code nahi mila bhai!" }, { status: 400 });
    }

    console.log("⚡ Code mil gaya! Exchanging for Permanent Long-Lived Meta Token...");

    const appId = process.env.FACEBOOK_APP_ID;
    const appSecret = process.env.FACEBOOK_APP_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/facebook/callback`;

    // 1. Get Short-Lived User Access Token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${appId?.trim()}&redirect_uri=${redirectUri.trim()}&client_secret=${appSecret?.trim()}&code=${code}`
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("💥 Meta User Token Exchange Failed:", tokenData);
      return NextResponse.json({ error: "Meta Token Exchange Failed", details: tokenData }, { status: 500 });
    }

    const userAccessToken = tokenData.access_token;

    // 2. ⚡ UPGRADE TO LONG-LIVED PERSISTENT TOKEN (60 Days / Permanent)
    const longLivedResponse = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId?.trim()}&client_secret=${appSecret?.trim()}&fb_exchange_token=${userAccessToken}`
    );
    const longLivedData = await longLivedResponse.json();
    
    if (!longLivedResponse.ok) {
      console.error("💥 Meta Long Lived Token Upgrade Failed:", longLivedData);
      return NextResponse.json({ error: "Failed to upgrade Meta token", details: longLivedData }, { status: 500 });
    }

    const permanentToken = longLivedData.access_token;
    
    // ✅ TOKENS CHURA LIYE BHAI!
    console.log("🚀 SUCCESS! Permanent Meta Token Secured!");
    console.log("💾 Permanent Token:", permanentToken);

    // TODO: await connectDB(); (Database me save karne ke liye ready)

    // 3. User ko wapas dashboard par bhej do status ke sath
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?facebook=connected`);

  } catch (error) {
    console.error("💥 META_CALLBACK_ROUTE_CRASH:", error);
    return NextResponse.json({ error: "Internal Server Error in Callback", details: error.message }, { status: 500 });
  }
}