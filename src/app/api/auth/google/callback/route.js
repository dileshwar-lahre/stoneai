import { NextResponse } from "next/server";

import { connectDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/User";

import { createToken } from "../../../../../lib/auth";

export async function GET(req) {
  try {
    await connectDB();

    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(
        "http://localhost:3000/login"
      );
    }

    const tokenResponse = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },

        body: new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri:
            "http://localhost:3000/api/auth/google/callback",
          grant_type: "authorization_code",
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return NextResponse.redirect(
        "http://localhost:3000/login"
      );
    }

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const userData = await userResponse.json();

    if (!userData.email) {
      return NextResponse.redirect(
        "http://localhost:3000/login"
      );
    }

    let user = await User.findOne({
      email: userData.email,
    });

    if (!user) {
      user = await User.create({
        name: userData.name || "",
        email: userData.email,
        password: null,
        provider: "google",
        googleId: userData.id,
        picture: userData.picture || "",
        isVerified: true,
        isOnboarded: false,
        lastLogin: new Date(),
      });
    } else {
      user.name = userData.name || user.name;
      user.provider = "google";
      user.googleId = userData.id;
      user.picture = userData.picture || user.picture;
      user.isVerified = true;
      user.lastLogin = new Date();

      await user.save();
    }

    const token = createToken(user);

    const nextPath = user.isOnboarded
      ? "/dashboard/profile"
      : "/onboarding";

    const response = NextResponse.redirect(
      `http://localhost:3000${nextPath}`
    );

    response.cookies.set("mdp_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (error) {
    console.log("GOOGLE AUTH ERROR ❌", error);

    return NextResponse.redirect(
      "http://localhost:3000/login"
    );
  }
}