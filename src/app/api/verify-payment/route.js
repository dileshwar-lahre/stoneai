import { NextResponse } from "next/server";
import crypto from "crypto";

// 🎯 FIXED 100% CORRECT RELATIVE PATHS BASED ON YOUR TREE
import { connectDB } from "../../../lib/mongodb"; 
import Subscription from "../../../models/Subscription"; 
import User from "../../../models/User"; 
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      userEmail,
      userName,
      planKey,
      planName,
      price,
      durationDays,
      monthsCount
    } = body;

    // ==========================================================
    // 🔒 CRYPTOGRAPHIC SIGNATURE VALIDATION LAYERS
    // ==========================================================
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "APNI_RZP_SECRET_KEY");
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 400 });
    }

    // 📅 CALCULATE ACCURATE CYCLES DEADLINE
    const startDate = new Date();
    const endDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);

    // ==========================================================
    // 📊 TRI-TIER PLAN RESOURCE ALLOCATION MATRIX
    // ==========================================================
    let limits = {};
    let currentStatus = "active";

    if (planKey === "trial") {
      currentStatus = "trial";
      limits = {
        channels: "3 Handles (Instagram, Facebook, Google Business) [Sandbox mode]",
        postsPerMonth: "2 Test Posts Total Allocation",
        crmAccess: "Basic Sandbox CRM Interface Access",
        seo: "Sandbox SEO Report Audit Run",
        smo: "Sandbox SMO Module Check",
        adsManagement: "Disabled During 7-Day Live Testing"
      };
    } else if (planKey === "basic") {
      limits = {
        channels: "3 Handles (Instagram, Facebook, Google Business)",
        postsPerMonth: "10 Optimized Posts / Month",
        crmAccess: "Basic CRM Access Terminal",
        seo: "Basic Search Engine Optimization",
        smo: "Basic Social Media Optimization",
        adsManagement: "Basic Google & Meta Ads Setup"
      };
    } else {
      limits = {
        channels: "3 Handles + Priority Content Layout Mapping",
        postsPerMonth: "30 High-Conversion Posts / Month",
        crmAccess: "Premium Pro CRM Access Terminal",
        seo: "Advanced SEO Blueprint Architecture",
        smo: "Elite Social Media Management Operations",
        adsManagement: "Full High-ROI Google & Meta Ads Management"
      };
    }

    // 🎯 DATABASE UPDATE SYSTEM OVERHEAD WRITE
    await Subscription.findOneAndUpdate(
      { userId: userId },
      {
        userId,
        role: planKey,
        planKey,
        planName,
        price,
        status: currentStatus,
        durationDays,
        currentPeriodStart: startDate,
        currentPeriodEnd: endDate,
        paymentProvider: "razorpay",
        features: ["CRM", "Post Scheduler", "Google Ads Data", "Meta Ads Data", "SEO Ops", "SMO Tracker"],
        limits,
        autoPay: false
      },
      { upsert: true, returnDocument: 'after' }
    );

    // 🔄 STATE SYNC ENGINE
    await User.findByIdAndUpdate(userId, {
      role: planKey,
      isOnboarded: true
    });

    // ==========================================================
    // 📧 AUTOMATED INVOICE RECEIPT INJECTOR ENGINE (Resend Framework)
    // ==========================================================
    try {
      const displayDuration = planKey === "trial" ? "7 Days Trial Term" : `${monthsCount} Month(s)`;

      await resend.emails.send({
        from: "Stonenox Billing <billing@stonenox.com>",
        to: [userEmail.toLowerCase().trim()],
        subject: `Payment Confirmed - Invoice Ledger [${razorpay_payment_id}] 📜`,
        html: `
          <div style="font-family: monospace, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #000000; color: #ffffff; border: 1px solid #1f2937; border-radius: 16px;">
            <div style="text-align: center; border-bottom: 1px dashed #374151; padding-bottom: 20px;">
              <h1 style="color: #0ea5e9; font-size: 28px; font-weight: 900; letter-spacing: 2px; margin: 0;">STONENOX AI</h1>
              <p style="color: #6b7280; font-size: 11px; margin-top: 4px;">SECURE DIGITAL RECEIPT TRANSACTION INVOICE</p>
            </div>

            <div style="margin-top: 24px; font-size: 13px; line-height: 1.6; color: #d1d5db;">
              <p><strong>Merchant Identifier:</strong> Stonenox Growth Engines Pvt Ltd</p>
              <p><strong>Customer Identity:</strong> ${userName} (${userEmail})</p>
              <p><strong>Razorpay Payment ID:</strong> ${razorpay_payment_id}</p>
              <p><strong>Invoice Date:</strong> ${startDate.toLocaleDateString("en-IN")}</p>
            </div>

            <div style="margin-top: 24px; background-color: #0a0a0a; border: 1px solid #111827; padding: 16px; border-radius: 12px;">
              <table style="width: 100%; font-size: 12px; border-collapse: collapse; text-align: left; color: #bcbcbc;">
                <thead>
                  <tr style="border-bottom: 1px solid #1f2937; font-weight: 900; color: #ffffff;">
                    <th style="padding-bottom: 8px;">Allocation Module</th>
                    <th style="padding-bottom: 8px; text-align: center;">Duration</th>
                    <th style="padding-bottom: 8px; text-align: right;">Gross Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid #111827;">
                    <td style="padding: 12px 0; font-weight: bold; color: #ffffff;">${planName}</td>
                    <td style="padding: 12px 0; text-align: center;">${displayDuration}</td>
                    <td style="padding: 12px 0; text-align: right; color: #0ea5e9; font-weight: bold;">₹${price.toLocaleString("en-IN")}</td>
                  </tr>
                </tbody>
              </table>

              <div style="margin-top: 16px; border-top: 1px solid #1f2937; padding-top: 12px;">
                <p style="margin: 0 0 8px 0; font-size: 11px; color: #6b7280; font-weight: bold; text-transform: uppercase;">📦 DEPLOYED MODULE INCLUSIONS:</p>
                <ul style="margin: 0; padding-left: 16px; font-size: 11px; color: #9ca3af; line-height: 1.7;">
                  <li>• ${limits.channels}</li>
                  <li>• ${limits.postsPerMonth}</li>
                  <li>• ${limits.crmAccess}</li>
                  <li>• ${limits.seo}</li>
                  <li>• ${limits.smo}</li>
                  <li>• ${limits.adsManagement}</li>
                </ul>
              </div>
            </div>

            <div style="margin-top: 24px; font-size: 11px; color: #9ca3af; border-top: 1px dashed #374151; padding-top: 16px;">
              <p><strong>✓ Database Sync Active:</strong> Extended terminal node lease values until <strong>${endDate.toLocaleDateString("en-IN")}</strong>.</p>
              <p style="color: #6b7280; text-align: center; margin-top: 20px;">Thank you for deploying with Stonenox Core Node Infrastructure System.</p>
            </div>
          </div>
        `
      });
    } catch (mailErr) {
      console.error("❌ [RECEIPT MAIL EXCEPTION]:", mailErr.message);
    }

    return NextResponse.json({ success: true, message: "Payment validated and assets provisioned." });

  } catch (error) {
    console.error("💥 [VERIFICATION INTERFACE EXCEPTION]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}