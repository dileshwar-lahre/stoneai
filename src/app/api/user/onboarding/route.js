import { NextResponse } from "next/server";

import { connectDB } from "../../../../lib/mongodb";

import User from "../../../../models/User";
import Owner from "../../../../models/Owner";
import Agency from "../../../../models/Agency";
import Staff from "../../../../models/Staff";
import Subscription from "../../../../models/Subscription";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      email,
      role,
      phone,
      whatsapp,
      city,
      state,
      businessName,
      businessCategory,
      website,
      agencyName,
      ownerName,
      agencyWebsite,
      totalClients,
      services,
      employeeId,
      staffType,
      companyName,
    } = body;

    if (!email || !role) {
      return NextResponse.json(
        { success: false, message: "Email and role required" },
        { status: 400 }
      );
    }

    if (!["owner", "agency", "staff"].includes(role)) {
      return NextResponse.json(
        { success: false, message: "Invalid role" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    user.role = role;
    user.isOnboarded = true;
    await user.save();

    if (role === "owner") {
      await Owner.findOneAndUpdate(
        { userId: user._id },
        {
          userId: user._id,
          businessName: businessName || "",
          businessCategory: businessCategory || "",
          phone: phone || "",
          whatsapp: whatsapp || "",
          city: city || "",
          state: state || "",
          website: website || "",
        },
        { upsert: true, new: true }
      );
    }

    if (role === "agency") {
      await Agency.findOneAndUpdate(
        { userId: user._id },
        {
          userId: user._id,
          agencyName: agencyName || "",
          ownerName: ownerName || "",
          phone: phone || "",
          whatsapp: whatsapp || "",
          website: agencyWebsite || "",
          city: city || "",
          state: state || "",
          totalClients: totalClients || "1-10",
          services: Array.isArray(services) ? services : [],
        },
        { upsert: true, new: true }
      );
    }

    if (role === "staff") {
      await Staff.findOneAndUpdate(
        { userId: user._id },
        {
          userId: user._id,
          employeeId: employeeId || "",
          staffType: staffType || "sales",
          companyName: companyName || "",
          phone: phone || "",
          whatsapp: whatsapp || "",
          city: city || "",
        },
        { upsert: true, new: true }
      );
    }

    if (role === "owner" || role === "agency") {
      const existingSubscription = await Subscription.findOne({
        userId: user._id,
      });

      if (!existingSubscription) {
        const trialStart = new Date();
        const trialEnd = new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        );

        await Subscription.create({
          userId: user._id,
          role,
          planKey: "trial",
          planName: "7 Days Free Trial",
          price: 0,
          status: "trial",
          durationDays: 7,
          currentPeriodStart: trialStart,
          currentPeriodEnd: trialEnd,
          autoPay: false,

          limits:
            role === "owner"
              ? {
                  channels: 3,
                  staffPerOwner: 0,
                  clients: 0,
                  staffPerClient: 0,
                  totalStaff: 0,
                }
              : {
                  channels: 3,
                  staffPerOwner: 0,
                  clients: 1,
                  staffPerClient: 0,
                  totalStaff: 0,
                },

          features: [
            "CRM",
            "Post Scheduler",
            "Google Ads Data",
            "Meta Ads Data",
          ],

          paymentProvider: "manual",
        });
      }
    }

    const subscription = await Subscription.findOne({
      userId: user._id,
    });

    return NextResponse.json({
      success: true,
      message: "Onboarding completed",
      user,
      subscription,
    });
  } catch (error) {
    console.log("ONBOARDING ERROR ❌", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}