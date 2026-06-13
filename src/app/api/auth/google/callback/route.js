import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import { createToken } from "../../../../../lib/auth";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req) {
  try {
    await connectDB();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const code = req.nextUrl.searchParams.get("code");

    if (!code) return NextResponse.redirect(`${baseUrl}/login`);

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${baseUrl}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) return NextResponse.redirect(`${baseUrl}/login`);

    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const userData = await userResponse.json();
    if (!userData.email) return NextResponse.redirect(`${baseUrl}/login`);

    // 🔍 Target Check Engine
    let user = await User.findOne({ email: userData.email });
    let isNewUser = false;

    if (!user) {
      console.log("🟢 [DEBUG]: CHAALU HUA - NAYA USER DETECTED:", userData.email);
      isNewUser = true;
      user = await User.create({
        name: userData.name || "",
        email: userData.email,
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
    // 📧 EMAIL DISPATCH ENGINE
    // ==========================================================
    if (isNewUser) {
      console.log("🚀 [DEBUG]: Resend Key Check:", process.env.RESEND_API_KEY ? "KEY MIL GAYI VANHA ✅" : "KEY GAIB HAI BC ❌");
      try {
        const mailResult = await resend.emails.send({
          from: "Stonenox <support@stonenox.com>",
          to: [user.email],
          subject: "Welcome to Stonenox - Let's Grow Your Business 🚀",
          html: `
            <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #0B1220; border: 1px solid rgba(6, 182, 212, 0.15); border-radius: 24px; color: #E2E8F0;">
              <div style="text-align: center; margin-bottom: 28px;">
                <h1 style="font-size: 32px; font-weight: 800; color: #22D3EE; text-transform: uppercase; margin:0;">STONENOX</h1>
                <p style="font-size: 11px; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.2em; margin-top: 6px;">Accelerating Digital Dominance</p>
              </div>

              <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 12px; color: #FFFFFF; text-align: center;">
                Welcome aboard, ${user.name || "Growth Partner"}! 👋
              </h2>
              <p style="font-size: 14px; line-height: 1.6; color: #94A3B8; text-align: center; margin-bottom: 28px;">
                Bhai, humein khushi hai ki aapne Stonenox ko chuna. Aapka account data secure ho chuka hai. Hum aapke business ko automate karne aur market me rock-solid scale karne me poori help karenge.
              </p>

              <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 16px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 700; color: #22D3EE; text-transform: uppercase;">🛠️ Our Service Ecosystem</h3>
                <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #CBD5E1; line-height: 1.8;">
                  <li><strong>Full-Stack Applications:</strong> Web & Mobile tech powered by Next.js & React Native.</li>
                  <li><strong>Automated Ads & CRM Pipelines:</strong> Turn traffic into high-converting revenue.</li>
                  <li><strong>Local SEO Architecture:</strong> Search engine dominance tailored for fast organic scale.</li>
                </ul>
              </div>

              <div style="background: rgba(34, 211, 238, 0.05); border: 1px solid rgba(34, 211, 238, 0.2); padding: 20px; border-radius: 16px; margin-bottom: 32px;">
                <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #FFFFFF; text-transform: uppercase;">📈 Unleash Enterprise Power</h3>
                <p style="font-size: 13px; color: #94A3B8; margin: 0 0 16px 0;">Apne business ki limitations ko khatam karne ke liye hamara premium plan select karein.</p>
                <div style="text-align: center;">
                  <a href="${baseUrl}/checkout" target="_blank" style="display: inline-block; padding: 14px 32px; background-color: #22D3EE; color: #000000; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 12px; text-transform: uppercase;">Explore Growth Plans 🚀</a>
                </div>
              </div>

              <hr style="border: 0; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-bottom: 20px;" />

              <div style="text-align: center;">
                <p style="font-size: 12px; color: #64748B; margin: 0;">
                  Hamare platform ke sahi aur safe use ke liye naye <a href="${baseUrl}/privacy-policy" target="_blank" style="color: #22D3EE; text-decoration: underline;">Privacy Policy</a> ko zaroor padhein.
                </p>
              </div>
            </div>
          `,
        });
        console.log("🎯 [DEBUG]: RESEND SUCCESS LOG ✅:", mailResult);
      } catch (mailErr) {
        console.log("❌ [DEBUG]: RESEND MAIL CRASH ENGINE ERROR:", mailErr.message);
      }
    }

    const token = createToken(user);
    const nextPath = user.isOnboarded ? "/dashboard/profile" : "/onboarding";
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
    console.log("GOOGLE AUTH ERROR ❌", error);
    const fallbackUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return NextResponse.redirect(`${fallbackUrl}/login`);
  }
}