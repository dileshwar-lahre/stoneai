import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb"; // Path check kar lena apne folder ke hisab se bhai

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { userId } = body;
    
    if (!userId) {
      return NextResponse.json({ hasActivePlan: false, error: "Missing User ID" }, { status: 400 });
    }

    // 📡 Database Connection Activate
    await connectDB();

    // 🧠 Dynamic Fallback Plan Object (Jab tak tumhara real dynamic pricing schema read na ho)
    const mockPlanDetails = {
      planName: "AGENCY GOLD TIER",
      planKey: "agency_combo",
      daysLeft: 30,
      activatedAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    };

    return NextResponse.json({
      success: true,
      hasActivePlan: true, 
      planDetails: mockPlanDetails
    }, { status: 200 });

  } catch (error) {
    console.error("💥 SUBSCRIPTION CLUSTER CRASH:", error);
    return NextResponse.json({ hasActivePlan: false, error: error.message }, { status: 500 });
  }
}