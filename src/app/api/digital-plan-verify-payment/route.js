import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

// ⚡ RESEND INITIALIZATION
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      razorpay_order_id, razorpay_payment_id, razorpay_signature, 
      userId, planKey, planName, price, userEmail, userName 
    } = body;

    // 🔐 1. RAZORPAY SIGNATURE CHECK
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "YOUR_SECRET_HERE";
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.error("🚨 SIGNATURE_MISMATCH: Digital payment verification failed!");
      return NextResponse.json({ success: false, error: "Signature Mismatch!" }, { status: 400 });
    }

    console.log("⚠️ DATABASE SAVING BYPASSED FOR DIGITAL PLAN TO SEAMLESS BUILD");
    console.log(`Plan Details -> User: ${userName}, Plan: ${planName}`);

    // 📧 2. SEND PREMIUM EMAIL VIA RESEND
    await resend.emails.send({
      from: "Stonenox AI <support@stonenox.com>",
      to: userEmail, 
      subject: `🎉 Plan Activated Successfully: ${planName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #000; color: #fff;">
          <h2 style="color: #0ea5e9; text-transform: uppercase; tracking-wider: 2px;">STONENOX AI</h2>
          <p style="color: #ccc;">Hi <b>${userName}</b>,</p>
          <p style="color: #ccc;">Aapka account (<b>${userEmail}</b>) par <b>${planName}</b> activate ho gaya hai.</p>
          <hr style="border: none; border-top: 1px solid #222; margin: 20px 0;" />
          <p style="color: #aaa;"><b>Price:</b> ₹${price}</p>
          <p style="font-size: 11px; color: #555; margin-top: 30px;">Thank you for building with Stonenox.</p>
        </div>
      `,
    });

    console.log("🚀 Mail fired successfully via Resend!");
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("💥 CRASH IN DIGITAL PAYMENT VERIFICATION:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}