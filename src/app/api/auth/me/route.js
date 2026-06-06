import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// 🛠️ Pure relative paths - Next.js compiler isko mana nahi kar sakta
import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { verifyToken } from "../../../../lib/auth";

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

    if (!decoded) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token",
        },
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.id).select(
      "-password"
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}