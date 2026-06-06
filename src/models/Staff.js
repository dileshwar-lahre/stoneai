import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    employeeId: {
      type: String,
      default: "",
    },

    staffType: {
      type: String,
      enum: [
        "sales",
        "ads_manager",
        "social_media_manager",
        "hr",
        "support",
        "accountant",
      ],
      default: "sales",
    },

    companyName: {
      type: String,
      default: "",
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

    permissions: {
      type: [String],
      default: ["crm_view"],
    },
  },
  { timestamps: true }
);

const Staff =
  mongoose.models.Staff ||
  mongoose.model("Staff", StaffSchema);

export default Staff;