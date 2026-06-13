import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { connectDB } from "@/lib/mongodb"; // 🎯 Apna correct connection path check kar lena bhai
import User from "@/models/User";         // Tere updated model ka import

// ⚡ RESEND INITIALIZATION
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    // 🔌 0. CONNECT DATABASE
    await connectDB();

    const body = await request.json();
    const { 
      razorpay_order_id, razorpay_payment_id, razorpay_signature, 
      userId, planKey, planName, price, userEmail, userName, durationDays 
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

    // 📅 2. DYNAMIC EXPIRY CALCULATION (Default 30 days agar duration na mile)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + (durationDays || 30));

    // 🗄️ 3. DATABASE INJECTION ENGINE (Save inside User model)
    const user = await User.findById(userId);
    if (!user) {
      console.error(`🚨 USER_NOT_FOUND: User ID ${userId} cluster me nahi mili!`);
      return NextResponse.json({ success: false, error: "User profile not found in cluster!" }, { status: 404 });
    }

    // Sub-object framework me plan details aur status inject karo
    user.isOnboarded = true;
    user.isVerified = true;
    user.planDetails = {
      planKey: planKey || "starter",
      planName: planName,
      pricePaid: price, // Testing me frontend se ₹1 aayega
      status: "active",
      activatedAt: new Date(),
      expiresAt: expiryDate,
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
    };

    await user.save();
    console.log(`✅ DATABASE_SAVED: Plan details injected safely for ${userEmail}`);

    // 📧 4. SEND PREMIUM EMAIL VIA RESEND
    await resend.emails.send({
      from: "Stonenox AI <support@stonenox.com>",
      to: userEmail, 
      subject: `🎉 Plan Activated Successfully: ${planName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 32px; border: 1px solid #1f293d; border-radius: 16px; background-color: #0B1220; color: #fff;">
          <h2 style="color: #22d3ee; text-transform: uppercase; tracking-wider: 2px; margin-top: 0;">STONENOX AI</h2>
          <p style="color: #e2e8f0; font-size: 15px;">Hi <b>${userName}</b>,</p>
          <p style="color: #94a3b8; font-size: 14px; line-height: 1.5;">Aapka account (<b>${userEmail}</b>) par <b>${planName}</b> successfully activate ho gya hai.</p>
          
          <div style="background-color: #07090e; padding: 16px; border-radius: 12px; margin: 20px 0; font-size: 13px; border: 1px solid #1f293d; line-height: 1.8;">
            <strong style="color: #22d3ee;">--- Billing Information ---</strong><br/>
            <span style="color: #94a3b8;">Amount Paid:</span> <span style="color: #fff; font-family: monospace;">₹${price}</span><br/>
            <span style="color: #94a3b8;">Transaction ID:</span> <span style="color: #fff; font-family: monospace;">${razorpay_payment_id}</span><br/>
            <span style="color: #94a3b8;">Expiry Date:</span> <span style="color: #fff;">${expiryDate.toDateString()}</span>
          </div>

          <hr style="border: none; border-top: 1px solid #1f293d; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b; margin: 0; text-align: center;">Thank you for building with Stonenox.</p>
        </div>
      `,
    });

    console.log(`🚀 Mail fired successfully to active user node: ${userEmail}`);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("💥 CRASH IN DIGITAL PAYMENT VERIFICATION:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}