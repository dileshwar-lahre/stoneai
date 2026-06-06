import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["owner", "agency"],
      required: true,
    },

    planKey: {
      type: String,
      default: "trial",
    },

    planName: {
      type: String,
      default: "7 Days Free Trial",
    },

    price: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "trial",
        "active",
        "expired",
        "cancelled",
        "pending",
      ],
      default: "trial",
    },

    durationDays: {
      type: Number,
      default: 7,
    },

    currentPeriodStart: {
      type: Date,
      default: Date.now,
    },

    currentPeriodEnd: {
      type: Date,
      default: () =>
        new Date(
          Date.now() +
            7 * 24 * 60 * 60 * 1000
        ),
    },

    autoPay: {
      type: Boolean,
      default: false,
    },

    limits: {
      channels: {
        type: Number,
        default: 3,
      },

      staffPerOwner: {
        type: Number,
        default: 0,
      },

      clients: {
        type: Number,
        default: 0,
      },

      staffPerClient: {
        type: Number,
        default: 0,
      },

      totalStaff: {
        type: Number,
        default: 0,
      },
    },

    features: {
      type: [String],
      default: [],
    },

    paymentProvider: {
      type: String,
      default: "manual",
    },

    providerCustomerId: {
      type: String,
      default: "",
    },

    providerSubscriptionId: {
      type: String,
      default: "",
    },

    lastReminderSentAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription =
  mongoose.models.Subscription ||
  mongoose.model(
    "Subscription",
    SubscriptionSchema
  );

export default Subscription;