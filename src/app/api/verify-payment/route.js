import { NextResponse } from "next/server";
import crypto from "crypto";

// 🛠️ 3 level step-back structure
import { connectDB } from "../../../lib/mongodb"; 
import Subscription from "../../../models/Subscription";

export async function POST(request) {
  try {
    await connectToDB();
    const body = await request.json();

    const { 
      userId, 
      role, 
      planKey, 
      planName, 
      price, 
      durationDays,
      isTrialActivation // 👈 Frontend se free trial flag check karne ke liye
    } = body;

    // 🎁 1. IF IT IS A FREE TRIAL ACTIVATION
    if (isTrialActivation) {
      const updatedSubscription = await Subscription.findOneAndUpdate(
        { userId: userId },
        { 
          $set: {
            role: role, // 'owner' ya 'agency' database me link ho jayega
            planKey: "trial",
            planName: "7 Days Free Trial",
            price: 0,
            status: "trial", // schema string status
            durationDays: 7,
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 din dynamic setup
            limits: {
              channels: 3,
              staffPerOwner: 0,
              clients: 0,
              totalStaff: 0
            },
            paymentProvider: "manual"
          }
        },
        { new: true, upsert: true }
      );

      return NextResponse.json({ success: true, subscription: updatedSubscription });
    }

    // 💳 2. OTHERWISE: IT IS A PAID RAZORPAY TRANSACTION
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      
      // Dynamic paid limits definition
      let limits = { channels: 3, staffPerOwner: 0, clients: 0, totalStaff: 0 };
      if (planKey === "basic") limits = { channels: 5, staffPerOwner: 2, clients: 2, totalStaff: 2 };
      if (planKey === "standard") limits = { channels: 10, staffPerOwner: 5, clients: 10, totalStaff: 5 };
      if (planKey === "premium") limits = { channels: 99, staffPerOwner: 20, clients: 99, totalStaff: 20 };

      const updatedSubscription = await Subscription.findOneAndUpdate(
        { userId: userId },
        { 
          $set: {
            role: role, // User ka original role ("agency" ya "owner") yahan maintain rahega
            planKey: planKey,
            planName: planName,
            price: price,
            status: "active",
            durationDays: durationDays,
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000),
            limits: limits,
            paymentProvider: "razorpay",
            providerCustomerId: razorpay_payment_id
          }
        },
        { new: true, upsert: true }
      );

      return NextResponse.json({ success: true, subscription: updatedSubscription });
    } else {
      return NextResponse.json({ error: "Signature mismatch" }, { status: 400 });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}