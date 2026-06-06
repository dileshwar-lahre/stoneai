import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
  try {
    const body = await request.text(); // Raw body chahiye verification ke liye
    const signature = request.headers.get("x-razorpay-signature");

    // 🚨 Yeh secret hum khud tayar karenge aur Razorpay me daalenge
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET; 

    // Safety check: Verify karo ki message sach me Razorpay se hi aaya hai
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Gaddari korbe! Invalid Signature" }, { status: 400 });
    }

    const eventData = JSON.parse(body);

    // 🟢 Agar payment successfully capture ho gaya
    if (eventData.event === "payment.captured") {
      const paymentDetails = eventData.payload.payment.entity;
      console.log("💰 PAISA AA GAYA BHAI! Payment ID:", paymentDetails.id);
      console.log("Amount:", paymentDetails.amount / 100);
      
      // Yahan par tum database me user ka plan active karne ka code likh sakte ho
    }

    return NextResponse.json({ status: "ok" });

  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}