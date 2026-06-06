import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "../../../../lib/mongodb";
import { verifyToken } from "../../../../lib/auth";

import User from "../../../../models/User";
import Owner from "../../../../models/Owner";
import Agency from "../../../../models/Agency";
import Staff from "../../../../models/Staff";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const token =
      cookieStore.get("mdp_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Not logged in",
        },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token",
        },
        { status: 401 }
      );
    }

    const user = await User.findById(
      decoded.id
    )
      .select("-password")
      .lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    let profile = null;

    if (user.role === "owner") {
      profile = await Owner.findOne({
        userId: user._id,
      }).lean();
    }

    if (user.role === "agency") {
      profile = await Agency.findOne({
        userId: user._id,
      }).lean();
    }

    if (user.role === "staff") {
      profile = await Staff.findOne({
        userId: user._id,
      }).lean();
    }

    return NextResponse.json({
      success: true,
      user,
      profile,
    });
  } catch (error) {
    console.log("PROFILE API ERROR ❌", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}