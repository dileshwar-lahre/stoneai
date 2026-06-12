import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "../../../../lib/mongodb"; 
import User from "../../../../models/User"; // 🔥 Direct tera User model!

export async function GET(request) {
  try {
    // 📡 1. Browser ke cookie store se email nikaalo jo tumne custom login me set kiya h
    const cookieStore = await cookies();
    let userEmail = cookieStore.get("user_email")?.value;

    // Fallback: Agar cookie nahi mili toh URL query param check karo
    if (!userEmail) {
      const { searchParams } = new URL(request.url);
      userEmail = searchParams.get("email");
    }

    // Guard: Agar dono jagah se email nahi mila, toh guest responsive data bhejo
    if (!userEmail || userEmail === "undefined") {
      return NextResponse.json({
        success: true,
        role: "guest",
        displayName: "Guest Console",
        planName: "FREE TIER",
        userRealName: "NOT LOGGED IN",
        userPicture: ""
      });
    }

    // 📡 2. Database connect karo
    await connectDB();

    // 🕵️‍♂️ 3. Direct tere User collection me query maaro
    const activeUser = await User.findOne({ email: userEmail.toLowerCase().trim() });
    
    if (!activeUser) {
      return NextResponse.json({
        success: true,
        role: "guest",
        displayName: "Unknown Node",
        planName: "FREE TIER",
        userRealName: "UNKNOWN USER",
        userPicture: ""
      });
    }

    // ⚡ 4. Role Mapping Engine: Tere enum ke hisab se dynamic structure
    const currentRole = activeUser.role || "owner"; // Default fallback agar role null h
    let calculatedPlan = "STANDARD TIER";
    let calculatedDisplay = "My Console";

    if (currentRole === "agency") {
      calculatedPlan = "AGENCY TIER";
      calculatedDisplay = activeUser.name ? `${activeUser.name} Agency` : "My Agency";
    } else if (currentRole === "owner") {
      calculatedPlan = "OWNER PRO TIER";
      calculatedDisplay = "Business Console";
    } else if (currentRole === "staff") {
      calculatedPlan = "STAFF TERMINAL";
      calculatedDisplay = "Team Access";
    }

    // 🏁 5. Return solid, un-crashable data to frontend
    return NextResponse.json({
      success: true,
      role: currentRole, // owner, agency, staff
      displayName: calculatedDisplay,
      planName: calculatedPlan,
      userRealName: activeUser.name || "No Name Set",
      userPicture: activeUser.picture || ""
    });

  } catch (error) {
    console.error("💥 CRITICAL ERROR IN UNIFIED ROLE CHECK:", error);
    return NextResponse.json({ success: false, error: "Database linking failed" }, { status: 500 });
  }
}