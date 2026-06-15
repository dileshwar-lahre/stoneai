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
      type: String, // 🔥 FIXED: Removed strict enum so it can accept 'basic', 'premium', 'trial' dynamic keys seamlessly
      required: true,
    },

    planKey: {
      type: String,
      default: "trial", // 'trial', 'basic', 'premium'
    },

    planName: {
      type: String,
      default: "7 Days Live Trial Plan",
    },

    price: {
      type: Number,
      default: 1, // Default updated to ₹1 for live transaction drive verification
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

    // 📊 FIXED: Changed sub-fields types to Mixed/String so they safely record text formatting limits
    limits: {
      channels: {
        type: mongoose.Schema.Types.Mixed,
        default: "3 Social Channels",
      },
      postsPerMonth: {
        type: mongoose.Schema.Types.Mixed,
        default: "10 Posts / Month",
      },
      crmAccess: {
        type: mongoose.Schema.Types.Mixed,
        default: "Basic CRM Access",
      },
      seo: {
        type: mongoose.Schema.Types.Mixed,
        default: "Basic SEO",
      },
      smo: {
        type: mongoose.Schema.Types.Mixed,
        default: "Basic SMO",
      },
      adsManagement: {
        type: mongoose.Schema.Types.Mixed,
        default: "Basic Ads Setup",
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