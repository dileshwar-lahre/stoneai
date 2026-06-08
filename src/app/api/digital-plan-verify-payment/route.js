import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { connectDB } from "@/lib/db"; 
import DigitalPlanSubscription from "@/models/DigitalPlanSubscription"; 

// ⚡ RESEND INITIALIZATION (Only 1 Line!)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      razorpay_order_id, razorpay_payment_id, razorpay_signature, 
      userId, planKey, planName, price, userEmail, userName 
    } = body;

    // 🔐 1. RAZORPAY SIGNATURE CHECK (Same as before)
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "YOUR_SECRET_HERE";
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: "Signature Mismatch!" }, { status: 400 });
    }

    const activatedAt = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(activatedAt.getDate() + 30);

    // 💾 2. DATABASE SAVING (Isolated & Safe)
    await connectDB();
    await DigitalPlanSubscription.create({
      userId, userEmail, userName, planKey, planName,
      amountPaid: Number(price), status: "active", activatedAt, expiresAt,
      razorpay_order_id, razorpay_payment_id
    });

    // 📧 3. SEND PREMIUM EMAIL VIA RESEND (Super Easy!)
    await resend.emails.send({
      from: "Stonenox AI <support@stonenox.com>",
      to: userEmail, // Logged in bande ki dynamic email id
      subject: `🎉 Plan Activated Successfully: ${planName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0ea5e9;">STONENOX AI</h2>
          <p>Hi <b>${userName}</b>,</p>
          <p>Aapka account (<b>${userEmail}</b>) par <b>${planName}</b> activate ho gaya hai.</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p><b>Price:</b> ₹${price}</p>
          <p><b>Valid Till:</b> ${expiresAt.toLocaleDateString("en-IN")}</p>
          <p style="font-size: 11px; color: #999;">Thank you for building with Stonenox.</p>
        </div>
      `,
    });

    console.log("🚀 Mail fired successfully via Resend!");
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("💥 CRASH:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}