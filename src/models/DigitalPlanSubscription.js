import mongoose from "mongoose";

const DigitalPlanSubscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tumhare primary user model ka naam jo bhi ho
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
    planKey: {
      type: String, 
      required: true, // starter, advanced, premium, web_dev, etc.
    },
    planName: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "inactive"],
      default: "active",
    },
    activatedAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true, // Isme hum automatic 30 days baad ka time frontend/backend se calculate karke store karenge
    },
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Puraane models check karne ke liye check mechanism
export default mongoose.models.DigitalPlanSubscription || 
  mongoose.model("DigitalPlanSubscription", DigitalPlanSubscriptionSchema);