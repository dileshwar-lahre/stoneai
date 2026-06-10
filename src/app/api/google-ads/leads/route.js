import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const adsStatus = cookieStore.get("google_ads_status")?.value;

    // 1. Safe Guard: Check Connection
    if (adsStatus !== "connected") {
      return NextResponse.json({ error: "Not Linked" }, { status: 401 });
    }

    const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
    const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;

    // 2. Dynamic Fallback Engine: Agar developer token abhi nahi mila, toh crash nahi karenge, live format data bhejenge
    if (!customerId || !developerToken) {
      console.log("⚠️ Dev Config missing, streaming high-fidelity simulation data for Stonenox UI...");
      
      // Real-time leads layout format mock
      const mockLeadsData = [
        { id: "101", name: "CGINFRAX_Bilaspur_Leads", status: "ENABLED", leads: 47, clicks: 820, impressions: 12400, budgetSpent: 4500 },
        { id: "102", name: "Stonenox_Premium_SEO_Campaign", status: "ENABLED", leads: 29, clicks: 410, impressions: 5800, budgetSpent: 3200 },
        { id: "103", name: "Healthy_Wings_Physio_Local", status: "ENABLED", leads: 18, clicks: 290, impressions: 3100, budgetSpent: 1800 }
      ];

      return NextResponse.json({
        success: true,
        mode: "development_sandbox",
        totalCampaigns: mockLeadsData.length,
        data: mockLeadsData
      });
    }

    // 3. Real Google Ads API Call (Jab tokens poore mil jayenge)
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId.trim(),
        client_secret: clientSecret.trim(),
        refresh_token: refreshToken.trim(),
        grant_type: "refresh_token",
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const googleAdsUrl = `https://googleads.googleapis.com/v17/customers/${customerId}/googleAds:search`;
    const gaqlQuery = {
      query: `SELECT campaign.id, campaign.name, campaign.status, metrics.conversions, metrics.clicks, metrics.impressions, metrics.cost_micros FROM campaign WHERE campaign.status = 'ENABLED' LIMIT 10`
    };

    const adsResponse = await fetch(googleAdsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "developer-token": developerToken.trim(),
      },
      body: JSON.stringify(gaqlQuery),
    });

    const adsData = await adsResponse.json();

    if (!adsResponse.ok) {
      return NextResponse.json({ error: "API Refused Data", details: adsData }, { status: 500 });
    }

    const formattedCampaigns = adsData.results?.map((row) => ({
      id: row.campaign.id,
      name: row.campaign.name,
      status: row.campaign.status,
      leads: row.metrics?.conversions || 0,
      clicks: row.metrics?.clicks || 0,
      impressions: row.metrics?.impressions || 0,
      budgetSpent: (row.metrics?.costMicros || 0) / 1000000,
    })) || [];

    return NextResponse.json({ success: true, mode: "production_live", totalCampaigns: formattedCampaigns.length, data: formattedCampaigns });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}