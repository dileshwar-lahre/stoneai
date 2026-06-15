import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// 🎯 EXACT RELATIVE DEPTH LOCKED
import { connectDB } from "../../../../lib/mongodb";
import { verifyToken } from "../../../../lib/auth";

import User from "../../../../models/User";
import Owner from "../../../../models/Owner";
import Agency from "../../../../models/Agency";
import Staff from "../../../../models/Staff";
import Subscription from "../../../../models/Subscription"; 

export async function GET() {
  console.log("==================================================");
  console.log("🚀 [DEBUG TRIGGER]: PROFILE API HITTED!");
  console.log("==================================================");

  try {
    await connectDB();
    console.log("🔌 [DEBUG 1]: MongoDB Connected Successfully.");

    const cookieStore = await cookies();
    const token = cookieStore.get("mdp_token")?.value;
    
    console.log("🍪 [DEBUG 2]: Cookie 'mdp_token' value is:", token ? "FOUND (Token Exists)" : "NOT FOUND (Null/Undefined) 🚨");

    // 🔒 Security Layer 1: Check token
    if (!token) {
      console.log("❌ [DEBUG TERMINATION]: No token found. Sending 401 Unauthorized.");
      return NextResponse.json({ success: false, message: "Not logged in" }, { status: 401 });
    }

    let decoded = null;
    try {
      decoded = verifyToken(token);
      console.log("🔑 [DEBUG 3]: Token Decoded Payload:", decoded);
    } catch (tokenErr) {
      console.log("💥 [DEBUG CRASH]: Token decoding failed totally! Error:", tokenErr.message);
    }

    if (!decoded?.id) {
      console.log("❌ [DEBUG TERMINATION]: Decoded ID not found or invalid token. Sending 401.");
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    console.log("🔍 [DEBUG 4]: Fetching user from DB with ID:", decoded.id);
    const user = await User.findById(decoded.id).select("-password").lean();
    
    if (!user) {
      console.log("❌ [DEBUG TERMINATION]: User ID exists in token but NOT FOUND in MongoDB! Sending 404.");
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    console.log("👤 [DEBUG 5]: User found in DB! Email:", user.email, "| Role:", user.role);

    let profile = null;
    try {
      if (user.role === "owner") {
        profile = await Owner.findOne({ userId: user._id }).lean();
      } else if (user.role === "agency") {
        profile = await Agency.findOne({ userId: user._id }).lean();
      } else if (user.role === "staff") {
        profile = await Staff.findOne({ userId: user._id }).lean();
      }
      console.log("💼 [DEBUG 6]: Role Profile found:", profile ? "YES" : "NO (Empty Profile Object)");
    } catch (profileErr) {
      console.log("⚠️ [DEBUG EXCEPTION]: Profile sub-fetch handled safely:", profileErr.message);
    }

    let planDetails = {
      planName: "No Active Plan",
      planKey: "free",
      status: "inactive",
      price: 0,
      daysLeft: 0,
      limits: { channels: "0 Allocated", postsPerMonth: "0 Posts" }
    };

    try {
      console.log("📊 [DEBUG 7]: Querying Subscription for User ID:", user._id);
      const subscription = await Subscription.findOne({ userId: user._id }).sort({ createdAt: -1 }).lean();

      if (subscription) {
        console.log("💳 [DEBUG 8]: Subscription row matched in DB:", subscription.planName);
        const today = new Date();
        const endDate = new Date(subscription.currentPeriodEnd);
        const timeDiff = endDate.getTime() - today.getTime();
        const daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));

        planDetails = {
          planName: subscription.planName || "7 Days Live Trial",
          planKey: subscription.planKey || "trial",
          status: subscription.status || "active",
          price: subscription.price || 0,
          startDate: subscription.currentPeriodStart,
          endDate: subscription.currentPeriodEnd,
          daysLeft: daysRemaining,
          limits: subscription.limits || {}
        };
      } else {
        console.log("ℹ️ [DEBUG 8]: No subscription active. Using default Free object.");
      }
    } catch (subErr) {
      console.log("⚠️ [DEBUG EXCEPTION]: Subscription engine safe catch:", subErr.message);
    }

    console.log("✅ [DEBUG SUCCESS]: Payload built perfectly. Sending Response 200 OK.");
    console.log("==================================================");

    return NextResponse.json({
      success: true,
      user,
      profile,
      hasPlan: planDetails.planKey !== "free",
      planDetails: planDetails 
    });

  } catch (error) {
    console.log("💥 [DEBUG CRITICAL ERROR]: Catch block triggered in Main Route!:", error.message);
    console.log("==================================================");
    return NextResponse.json({ success: false, error: "System bypass active" }, { status: 200 });
  }
}