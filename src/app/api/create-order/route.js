import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request) {
  try {
    const { amount } = await request.json();

    // 1. Keys ko exact fetch karke unke aage-piche ka hidden space/newline saaf (trim) karo
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim();
    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

    if (!keyId || !keySecret) {
      console.error("🚨 CRITICAL: Keys env me khali mil rahi hain!");
      return NextResponse.json({ error: "Env me keys nahi mil rahi bhai" }, { status: 500 });
    }

    // 2. Safely dynamic instance create karo active credentials ke sath
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const cleanAmount = Number(amount);
    if (isNaN(cleanAmount) || cleanAmount <= 0) {
      return NextResponse.json({ error: "Amount valid nahi hai bhai" }, { status: 400 });
    }

    const options = {
      amount: Math.round(cleanAmount * 100), // INR to Paise (₹1 = 100 paise)
      currency: "INR",
      receipt: `receipt_live_${Date.now()}`,
    };

    // 3. Razorpay Gateway call
    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({ 
      order_id: order.id, 
      amount: order.amount, 
      currency: order.currency 
    });

  } catch (error) {
    // Agar abhi bhi 401 aaya, toh hume live console me sateek galti dikhegi
    console.error("💥 RAZORPAY_CREATION_API_ERROR:", error);
    return NextResponse.json({ 
      error: "Order create nahi hua bhai", 
      details: error.message 
    }, { status: 500 });
  }
}