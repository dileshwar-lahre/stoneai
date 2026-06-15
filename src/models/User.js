import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: null,
    },

    provider: {
      type: String,
      enum: ["manual", "google"],
      default: "manual",
    },

    googleId: {
      type: String,
      default: null,
    },

    picture: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      // 🔥 FIXED: Added 'trial', 'basic', and 'premium' inside enum so Mongoose validator allows payment plan updates
      enum: ["owner", "agency", "staff", "trial", "basic", "premium"], 
      default: null,
    },

    isOnboarded: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    // ⚡ PLAN DETAILS BLOCK (Bina purana code tode, naya data yahan store hoga)
    planDetails: {
      planKey: { type: String, default: "free" },          // starter, growth, business_pro, trial, etc.
      planName: { type: String, default: "Free Tier" },    // Display name
      pricePaid: { type: Number, default: 0 },             // Kitna paisa diya (Testing me 1)
      // 🔥 UPDATED ENUM HERE AS WELL: Added 'trial' to match checkout states cleanly
      status: { type: String, enum: ["active", "expired", "inactive", "trial"], default: "inactive" },
      activatedAt: { type: Date, default: null },
      expiresAt: { type: Date, default: null },            // Automatic 30 days baad ka logic
      razorpay_order_id: { type: String, default: null },
      razorpay_payment_id: { type: String, default: null },
    },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User ||
  mongoose.model("User", UserSchema);

export default User;