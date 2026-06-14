import { NextResponse } from "next/server";

// 🎯 TERE WORKING RELATIVE PATHS (BINA TOUCH KIYE AS IT IS INJECTED)
import { connectDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import { createToken } from "../../../../../lib/auth";
import { Resend } from "resend"; // Resend initialization ready for deployment

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req) {
  // ⚡ DYNAMIC DOMAIN DETECTOR ENGINE (Local me local chalega, production me live url)
  const currentOrigin = req.nextUrl.origin; 
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || currentOrigin;

  try {
    await connectDB();

    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      console.error("🚨 [AUTH ERROR]: Google authentication code missing.");
      return NextResponse.redirect(`${baseUrl}/login`);
    }

    const tokenResponse = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID || "",
          client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
          redirect_uri: `${baseUrl}/api/auth/google/callback`, // 🎯 Exact dynamic callback matching console config
          grant_type: "authorization_code",
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("🚨 [AUTH ERROR]: Access Token request failed:", tokenData);
      return NextResponse.redirect(`${baseUrl}/login`);
    }

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const userData = await userResponse.json();

    if (!userData.email) {
      console.error("🚨 [AUTH ERROR]: User email context target missing.");
      return NextResponse.redirect(`${baseUrl}/login`);
    }

    // 🔍 Database Sync Block (Email normalization included)
    let user = await User.findOne({
      email: userData.email.toLowerCase(),
    });
    let isNewUser = false;

    if (!user) {
      console.log("🟢 [DEBUG]: CHAALU HUA - NAYA USER DETECTED:", userData.email);
      isNewUser = true;
      user = await User.create({
        name: userData.name || "",
        email: userData.email.toLowerCase(),
        password: null,
        provider: "google",
        googleId: userData.id,
        picture: userData.picture || "",
        isVerified: true,
        isOnboarded: false,
        lastLogin: new Date(),
      });
    } else {
      console.log("🟡 [DEBUG]: PURANA USER HAI, LOG IN HO RAHA HAI:", user.email);
      user.name = userData.name || user.name;
      user.provider = "google";
      user.googleId = userData.id;
      user.picture = userData.picture || user.picture;
      user.isVerified = true;
      user.lastLogin = new Date();

      await user.save();
    }

    // ==========================================================
    // 📧 EMAIL DISPATCH ENGINE (Isolating mail engine to prevent pipeline crashes)
    // ==========================================================
    if (isNewUser) {
      try {
        await resend.emails.send({
          from: "Stonenox <support@stonenox.com>",
          to: [user.email],
          subject: "Welcome to Stonenox - Let's Grow Your Business 🚀",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #0B1220; border: 1px solid rgba(6, 182, 212, 0.15); border-radius: 24px; color: #E2E8F0;">
              <div style="text-align: center; margin-bottom: 28px;">
                <h1 style="font-size: 32px; font-weight: 800; color: #22D3EE; text-transform: uppercase; margin:0;">STONENOX</h1>
              </div>
              <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 12px; color: #FFFFFF; text-align: center;">Welcome aboard, ${user.name || "Partner"}! 👋</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #94A3B8; text-align: center; margin-bottom: 28px;">Bhai, humein khushi hai ki aapne Stonenox ko chuna. Hum aapke business ko automate karne me poori help karenge.</p>
              <div style="text-align: center; margin-top: 20px;">
                <a href="${baseUrl}/billing" target="_blank" style="display: inline-block; padding: 14px 32px; background-color: #22D3EE; color: #000000; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 12px; text-transform: uppercase;">Explore Growth Plans 🚀</a>
              </div>
            </div>
          `,
        });
        console.log("🎯 [DEBUG]: Welcome mail fired seamlessly.");
      } catch (mailErr) {
        console.error("❌ [DEBUG]: RESEND EXCEPTION BYPASSED:", mailErr.message);
      }
    }

    const token = createToken(user);

    const nextPath = user.isOnboarded
      ? "/dashboard/profile"
      : "/onboarding";

    const response = NextResponse.redirect(`${baseUrl}${nextPath}`);

    response.cookies.set("mdp_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("GOOGLE AUTH ERROR ❌", error);
    // 🔥 Absolute safe fallback: Kabhi bhi localhost par crash nahi hoga live server me!
    return NextResponse.redirect(`${baseUrl}/login`);
  }
}