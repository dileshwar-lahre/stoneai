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

    // 2. ⚡ UPGRADE TO LONG-LIVED PERSISTENT TOKEN
    const longLivedResponse = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId?.trim()}&client_secret=${appSecret?.trim()}&fb_exchange_token=${userAccessToken}`
    );
    const longLivedData = await longLivedResponse.json();
    
    if (!longLivedResponse.ok) {
      console.error("💥 Meta Long Lived Token Upgrade Failed:", longLivedData);
      return NextResponse.json({ error: "Failed to upgrade Meta token", details: longLivedData }, { status: 500 });
    }

    const permanentToken = longLivedData.access_token;
    console.log("🚀 SUCCESS! Permanent Meta Token Secured!");

    // ==========================================
    // 🔥 NEW: STEP 3 - FETCH FACEBOOK PAGES LIST
    // ==========================================
    console.log("🔄 Fetching user's Facebook Pages...");
    const pagesResponse = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${permanentToken}`
    );
    const pagesData = await pagesResponse.json();

    if (!pagesResponse.ok) {
      console.error("💥 Failed to fetch FB Pages:", pagesData);
      return NextResponse.json({ error: "Failed to fetch Facebook Pages", details: pagesData }, { status: 500 });
    }

    const userPages = pagesData.data; // Yeh saare pages ki array hai

    if (!userPages || userPages.length === 0) {
      console.error("🚨 User ke paas koi Facebook Page nahi mila!");
      return NextResponse.json({ error: "No Facebook Pages found for this account." }, { status: 404 });
    }

    // Multitasking Setup: Abhi ke liye hum list ka PEHLA page auto-connect kar rahe hain
    // (Aap chahein toh pure userPages array ko DB me daal kar frontend par dropdown de sakte hain)
    const targetPage = userPages[0]; 
    const pageId = targetPage.id;
    const pageAccessToken = targetPage.access_token; // 🔑 YEH HAI MAIN KEY LEADS NIKALNE KE LIYE

    console.log(`📌 Target Page Selected: ${targetPage.name} (ID: ${pageId})`);

    // ==========================================
    // 🔥 NEW: STEP 4 - PROGRAMMATIC WEBHOOK SUBSCRIBE
    // ==========================================
    console.log("📡 Subscribing Page to CRM Leadgen Webhook...");
    const subscribeResponse = await fetch(
      `https://graph.facebook.com/v19.0/${pageId}/subscribed_apps`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscribed_fields: "leadgen",
          access_token: pageAccessToken
        })
      }
    );
    const subscribeData = await subscribeResponse.json();

    if (!subscribeResponse.ok) {
      console.error("🚨 Webhook Subscription Failed:", subscribeData);
      // Fail ho bhi jaye toh page token mil chuka hai, handle kar sakte hain
    } else {
      console.log("✅ Webhook Subscribed Successfully for this page!", subscribeData);
    }

    // ==========================================
    // 💾 STEP 5 - SAVE EVERYTHING TO DATABASE
    // ==========================================
    // await connectDB();
    // Hint Schema for Multitasking (Save these fields for the active user):
    /*
    await db.collection('users').updateOne(
        { _id: currentUser.id }, // Jo user login hai aapke CRM me
        { 
            $set: {
                "facebookConfig.isConnected": true,
                "facebookConfig.pageId": pageId,
                "facebookConfig.pageAccessToken": pageAccessToken, // Har user ka apna alag token
                "facebookConfig.pageName": targetPage.name
            }
        }
    );
    */

    console.log("🎉 Phase 1 Complete! Redirecting user back to CRM Dashboard.");
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?facebook=connected`);

  } catch (error) {
    console.error("💥 META_CALLBACK_ROUTE_CRASH:", error);
    return NextResponse.json({ error: "Internal Server Error in Callback", details: error.message }, { status: 500 });
  }
}