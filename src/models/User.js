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
      enum: ["owner", "agency", "staff"],
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
  },
  { timestamps: true }
);

const User =
  mongoose.models.User ||
  mongoose.model("User", UserSchema);

export default User;