import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    businessName: {
      type: String,
      default: "",
      trim: true,
    },

    businessCategory: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    subscriptionPlan: {
      type: String,
      enum: ["free", "starter", "growth", "pro"],
      default: "free",
    },

    subscriptionStatus: {
      type: String,
      enum: ["trial", "active", "expired", "cancelled"],
      default: "trial",
    },
  },
  { timestamps: true }
);

const Owner =
  mongoose.models.Owner ||
  mongoose.model("Owner", OwnerSchema);

export default Owner;