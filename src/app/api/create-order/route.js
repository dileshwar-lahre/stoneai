import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request) {
  // Ek dum clean diagnosis report object create kiya
  let diagnosisReport = {
    envCheck: {
      keyIdStatus: "Not Evaluated",
      keySecretStatus: "Not Evaluated",
      detectedPrefix: "None",
    },
    razorpayServerConnection: "Not Attempted",
    exactErrorDetails: null,
  };

  try {
    const { amount } = await request.json();

    // 1. Fetch from everywhere safely (Hardcoded strings ya environment strings)
    // Agars tumne direct string likha hai toh wahi utha lega, nahi toh env se padhega
    const rawKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "YAHAN_AGAR_HARDCODE_HAI_TOH_APNI_ID_DALO";
    const rawKeySecret = process.env.RAZORPAY_KEY_SECRET || "YAHAN_APNI_SECRET_KEY_DALO";

    const keyId = rawKeyId?.trim();
    const keySecret = rawKeySecret?.trim();

    // 🕵️‍♂️ Phase 1: Environment / String Configuration Audit
    if (!keyId || keyId.includes("YAHAN_AGAR") || keyId === "") {
      diagnosisReport.envCheck.keyIdStatus = "❌ CRITICAL: Key ID khali hai ya abhi bhi replacement text chuta hua hai!";
    } else {
      diagnosisReport.envCheck.keyIdStatus = `✅ OK (Length: ${keyId.length} characters)`;
      diagnosisReport.envCheck.detectedPrefix = keyId.substring(0, 9); // 'rzp_test_' ya 'rzp_live_' dikhayega
    }

    if (!keySecret || keySecret.includes("YAHAN_APNI") || keySecret === "") {
      diagnosisReport.envCheck.keySecretStatus = "❌ CRITICAL: Key Secret khali hai ya placeholder text hai!";
    } else {
      diagnosisReport.envCheck.keySecretStatus = `✅ OK (Length: ${keySecret.length} characters)`;
    }

    // Agar dono me se ek bhi config me jhol hai toh turant report bahar pheko
    if (diagnosisReport.envCheck.keyIdStatus.includes("❌") || diagnosisReport.envCheck.keySecretStatus.includes("❌")) {
      return NextResponse.json({
        success: false,
        error: "Configuration Setup Level Error (Code me hi key missing hai bhai!)",
        diagnosis: diagnosisReport
      }, { status: 400 });
    }

    // 🕵️‍♂️ Phase 2: Razorpay Client Initialization
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const cleanAmount = Number(amount);
    if (isNaN(cleanAmount) || cleanAmount <= 0) {
      return NextResponse.json({ success: false, error: "Amount structure is invalid" }, { status: 400 });
    }

    const options = {
      amount: Math.round(cleanAmount * 100), // Paise
      currency: "INR",
      receipt: `receipt_diag_${Date.now()}`,
    };

    // 🕵️‍♂️ Phase 3: Razorpay Server Authentication Hit
    try {
      const order = await razorpay.orders.create(options);
      
      // Agar control yahan tak aaya matlab APNI CODES AUR CONFIGURATION 100% PERFECT HAIN!
      diagnosisReport.razorpayServerConnection = "🚀 SUCCESS: Keys are 100% Valid. Order Created!";
      
      return NextResponse.json({ 
        success: true,
        order_id: order.id, 
        amount: order.amount, 
        currency: order.currency,
        diagnosis: diagnosisReport
      });

    } catch (rzpError) {
      diagnosisReport.exactErrorDetails = rzpError.message || rzpError;
      
      // Sateek check agar status 401 hai ya error object me authentication failed hai
      if (rzpError.statusCode === 401 || JSON.stringify(rzpError).includes("Authentication failed")) {
        diagnosisReport.razorpayServerConnection = "❌ AUTHENTICATION_FAILED: Tumhari keys ka format sahi hai, Next.js config bhi sahi hai, par Razorpay Database me ye ID/Secret Blocked ya Invalid hain! Nayi keys regenerate karo dashboard se.";
      } else {
        diagnosisReport.razorpayServerConnection = "⚠️ NETWORK_OR_OTHER_ERROR: Razorpay tak request gyi par kisi aur vajah se fail hui.";
      }

      return NextResponse.json({
        success: false,
        error: "Razorpay Gateway Connection Refused",
        diagnosis: diagnosisReport
      }, { status: rzpError.statusCode || 500 });
    }

  } catch (globalError) {
    return NextResponse.json({ 
      success: false, 
      error: "Global Code Thread Crash", 
      details: globalError.message 
    }, { status: 500 });
  }
}