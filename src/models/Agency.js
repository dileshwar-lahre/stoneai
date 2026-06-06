import mongoose from "mongoose";

const AgencySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    agencyName: {
      type: String,
      default: "",
      trim: true,
    },

    ownerName: {
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

    website: {
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

    totalClients: {
      type: String,
      enum: ["1-10", "10-50", "50+"],
      default: "1-10",
    },

    services: {
      type: [String],
      default: [],
    },

    subscriptionPlan: {
      type: String,
      enum: ["free", "starter", "growth", "agency"],
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

const Agency =
  mongoose.models.Agency ||
  mongoose.model("Agency", AgencySchema);

export default Agency;