"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { FaCheck, FaArrowRight, FaLock, FaTimes, FaFileInvoiceDollar, FaLayerGroup, FaBolt, FaRocket } from "react-icons/fa";

export default function BillingPage() {
  const [userRole, setUserRole] = useState(null); // owner, agency, staff
  const [userId, setUserId] = useState(null);
  
  // 🎯 LIVE LOGGED-IN USER PROFILE STATES
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  
  // 🧭 POPUP CONTROLS
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPlanTier, setSelectedPlanTier] = useState("basic"); // trial, basic, premium
  const [months, setMonths] = useState(1);

  // LIVE INVOICE BREAKDOWN DISPLAY
  const [breakdown, setBreakdown] = useState({
    basePrice: 0,
    discount: 0,
    subTotal: 0,
    razorpayFees: 0,
    actualTotal: 0 // 🔥 This is the final absolute amount containing plan price + gateway fees
  });

  // 📡 PURE CUSTOM INSTANT PROFILE CHECKER
  useEffect(() => {
    async function fetchUserRoleContext() {
      try {
        const res = await fetch("/api/user/profile", { 
          cache: "no-store",
          headers: { "Content-Type": "application/json" }
        });
        const json = await res.json();
        
        if (json.success && json.user) {
          setUserRole(json.user.role || "owner");
          setUserId(json.user._id || json.user.id);
          setUserEmail(json.user.email || "");
          setUserName(json.user.name || "Ecosystem Partner");
        } else {
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("🚨 Custom profile synchronization failed:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserRoleContext();
  }, []);

  // 🧠 UPDATED MATH ENGINE: Injected Automatic Customer Surcharge Routing
  useEffect(() => {
    if (selectedPlanTier === "trial") {
      setBreakdown({
        basePrice: 1,
        discount: 0,
        subTotal: 1,
        razorpayFees: 0.02,
        actualTotal: 1.02 // ₹1 + 2% transaction fee
      });
      return;
    }

    let basePricePerMonth = selectedPlanTier === "basic" ? 5000 : 10000;
    let rawTotal = basePricePerMonth * months;
    let discountedTotal = rawTotal;

    // 🎯 Specialized Month Bulk Offer Calculation Blueprint
    if (months === 12) {
      discountedTotal = selectedPlanTier === "basic" ? 50000 : 100000;
    } else if (months === 3) {
      discountedTotal = rawTotal * 0.95; // 5% Off
    } else if (months === 6) {
      discountedTotal = rawTotal * 0.90; // 10% Off
    }

    // 💳 REVENUE PROTECTION LOGIC: Calculate 2% surcharge and ADD it to the total bill
    let rzpFee = discountedTotal * 0.02;
    let grandTotalIncludingFees = discountedTotal + rzpFee;

    setBreakdown({
      basePrice: rawTotal,
      discount: rawTotal - discountedTotal,
      subTotal: discountedTotal,
      razorpayFees: rzpFee,
      actualTotal: grandTotalIncludingFees // 🔥 Real payable value updated safely
    });

  }, [selectedPlanTier, months, showCheckoutModal]);

  // Open Checkout Popup Engine
  const openCheckoutPipeline = (tier) => {
    setSelectedPlanTier(tier);
    setMonths(1); // Reset to default on every fresh click
    setShowCheckoutModal(true);
  };

  // 💳 REAL RAZORPAY GATEWAY DISPATCHER
  const handleRazorpayPayment = async () => {
    setPaymentLoading(true);
    try {
      if (typeof window === "undefined" || !window.Razorpay) {
        alert("🚨 Razorpay SDK script loaded nahi hai bhai! Page refresh karke check karo.");
        setPaymentLoading(false);
        return;
      }

      const clientKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "YAHAN_APNI_RZP_LIVE_KEY_ID_DIRECT_PASTE_KARO";
      
      let planNameString = "Basic Digital Growth Plan";
      if (selectedPlanTier === "trial") planNameString = "7 Days Live Trial Plan";
      if (selectedPlanTier === "premium") planNameString = "Premium Elite Growth Plan";
      
      // 🔥 Target checkout values load final compiled value (Price + Fees)
      const finalPayableAmount = breakdown.actualTotal; 
      const calculatedDuration = selectedPlanTier === "trial" ? 7 : months * 30;

      // 1. Create order token block from backend passing real value with surcharge
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalPayableAmount }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation backend failed");

      // 2. Build deployment parameters configuration
      const options = {
        key: clientKeyId.trim(),
        amount: data.amount,
        currency: data.currency,
        name: "Stonenox AI",
        description: `Deployment for ${planNameString}`,
        order_id: data.order_id,
        prefill: {
          name: userName,
          email: userEmail, 
          contact: "9131460470",
          method: "upi"
        },
        config: {
          display: {
            blocks: {
              upi: {
                name: "Direct UPI / Instant Apps",
                instruments: [{ method: "upi", apps: ["google_pay", "phonepe", "paytm", "bhim"] }]
              }
            },
            sequence: ["block.upi"],
            preferences: { show_default_blocks: true }
          }
        },
        handler: async function (response) {
          // 3. Fire payload straight back to verify API endpoint with full email receipt tags
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId,
              userEmail,               
              userName,                
              planKey: selectedPlanTier,
              planName: planNameString,
              price: breakdown.actualTotal, // Database and Resend records will save absolute final billing ledger logs
              durationDays: calculatedDuration,
              monthsCount: selectedPlanTier === "trial" ? 0 : months
            }),
          });
          
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert(`🎉 Payment Successful! Assets deployed and digital receipt dispatched to ${userEmail}`);
            window.location.href = "/dashboard/profile";
          } else {
            alert("Verification Failed: " + verifyData.error);
          }
        },
        theme: { color: "#0ea5e9" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("💥 PAYMENT_GATEWAY_INTEGRATION_ERROR:", err);
      alert("Error: " + err.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex items-center justify-center font-bold text-xs tracking-widest animate-pulse">
        INITIALIZING PROVISIONING COMPONENT LEDGER...
      </div>
    );
  }

  if (userRole === "staff") {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center border border-red-500/20 mb-4 text-xl"><FaLock /></div>
        <h2 className="text-lg font-black uppercase tracking-tight">Access Restricted</h2>
        <p className="text-xs text-neutral-500 max-w-xs mt-1 font-medium">Staff tokens cannot manipulate core billing cycles.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white p-4 md:p-8 select-none antialiased">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      
      {/* HEADER CONTROLS */}
      <div className="max-w-4xl mx-auto text-center mb-12 mt-6">
        <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest rounded-full">
          STONENOX DIGITAL PORTAL PLATFORMS //
        </span>
        <h1 className="text-3xl md:text-4xl font-black mt-3 tracking-tight">Choose Your Allocation Plan</h1>
        <p className="text-sm text-neutral-400 mt-2 font-medium max-w-md mx-auto">
          Scale your business automation with omnichannel content engines and specialized live testing systems.
        </p>
      </div>

      {/* THREE CARD LAYOUT GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pb-12">
        
        {/* ======= CARD 1: 7-DAYS LIVE TRIAL TEST HUB (₹1) ======= */}
        <div className="border border-dashed border-neutral-800 rounded-3xl p-6 bg-neutral-950/20 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-6 shadow-md">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-neutral-500 text-[11px] font-bold font-mono">
              <FaRocket className="text-emerald-500" /> LIVE SANDBOX MATRIX
            </div>
            <h3 className="text-2xl font-black text-white">7 Days Live Trial</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">Perfect module override to securely validate live gateway routing using real bank accounts.</p>
            
            <div className="pt-2 flex items-baseline gap-1">
              <span className="text-3xl font-black text-white">₹1</span>
              <span className="text-xs text-neutral-500 font-mono">/7 days duration</span>
            </div>
            
            <ul className="space-y-2.5 text-[12px] text-neutral-500 font-medium border-t border-white/5 pt-5">
              <li className="flex items-center gap-2.5"><FaCheck size={11} className="text-emerald-500 shrink-0" /> Real Flow Verification Guarantee</li>
              <li className="flex items-center gap-2.5"><FaCheck size={11} className="text-emerald-500 shrink-0" /> 3 Handles (Sandbox Link Logs)</li>
              <li className="flex items-center gap-2.5"><FaCheck size={11} className="text-emerald-500 shrink-0" /> 2 Test Post Actions Deployment</li>
              <li className="flex items-center gap-2.5"><FaCheck size={11} className="text-emerald-500 shrink-0" /> Resend Automatic HTML Bill to Gmail</li>
            </ul>
          </div>

          <button 
            type="button"
            onClick={() => openCheckoutPipeline("trial")}
            className="w-full py-3 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 group active:scale-95"
          >
            Launch Live Test <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ======= CARD 2: BASIC GROWTH PLAN (₹5,000) ======= */}
        <div className="border border-neutral-900 rounded-3xl p-6 bg-neutral-950/40 hover:border-neutral-800 transition-all flex flex-col justify-between space-y-6 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-neutral-400 text-[11px] font-bold font-mono">
              <FaLayerGroup className="text-cyan-400" /> BASE ALLOCATION
            </div>
            <h3 className="text-2xl font-black text-white">Basic Digital Plan</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">Perfect system map for small business localized market growth penetration.</p>
            
            <div className="pt-2 flex items-baseline gap-1">
              <span className="text-3xl font-black text-white">₹5,000</span>
              <span className="text-xs text-neutral-500 font-mono">/month</span>
            </div>
            
            <ul className="space-y-2.5 text-[12px] text-neutral-400 font-semibold border-t border-white/5 pt-5">
              <li className="flex items-center gap-2.5"><FaCheck size={11} className="text-cyan-400 shrink-0" /> 3 Social Handles (Insta, FB, GMB)</li>
              <li className="flex items-center gap-2.5"><FaCheck size={11} className="text-cyan-400 shrink-0" /> 10 Tailored Posts / Month</li>
              <li className="flex items-center gap-2.5"><FaCheck size={11} className="text-cyan-400 shrink-0" /> Basic SEO & SMO Support Operations</li>
              <li className="flex items-center gap-2.5"><FaCheck size={11} className="text-cyan-400 shrink-0" /> Basic Google & Meta Ads Setup</li>
              <li className="font-mono text-[10px] text-neutral-500 mt-2 block italic">※ Razorpay flat 2% gateway surcharge applies dynamically.</li>
            </ul>
          </div>

          <button 
            type="button"
            onClick={() => openCheckoutPipeline("basic")}
            className="w-full py-3.5 bg-neutral-900 border border-neutral-800 text-white hover:bg-white hover:text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 group active:scale-95"
          >
            Get Started <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ======= CARD 3: PREMIUM ELITE PLAN (₹10,000) ======= */}
        <div className="border border-neutral-900 rounded-3xl p-6 bg-neutral-950/70 hover:border-cyan-500/20 transition-all flex flex-col justify-between space-y-6 shadow-2xl relative">
          <div className="absolute top-0 right-0 bg-cyan-500 text-black font-black text-[8px] uppercase tracking-widest px-3 py-1 rounded-bl-xl font-mono">High ROI</div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-[11px] font-bold font-mono">
              <FaBolt /> ELITE AUTOMATION
            </div>
            <h3 className="text-2xl font-black text-white">Premium Elite Plan</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">Aggressive scale strategy for market dominance with deep automated tracking nodes.</p>
            
            <div className="pt-2 flex items-baseline gap-1">
              <span className="text-3xl font-black text-cyan-400">₹10,000</span>
              <span className="text-xs text-neutral-500 font-mono">/month</span>
            </div>
            
            <ul className="space-y-2.5 text-[12px] text-neutral-300 font-bold border-t border-white/5 pt-5">
              <li className="flex items-center gap-2.5"><FaCheck size={11} className="text-cyan-400 shrink-0" /> 3 Handles + Priority Layout Mapping</li>
              <li className="flex items-center gap-2.5"><FaCheck size={11} className="text-cyan-400 shrink-0" /> 30 High-Conversion Posts / Month</li>
              <li className="flex items-center gap-2.5"><FaCheck size={11} className="text-cyan-400 shrink-0" /> Advanced SEO Blueprint + Elite SMO</li>
              <li className="flex items-center gap-2.5"><FaCheck size={11} className="text-cyan-400 shrink-0" /> High-ROI Google & Meta Ads Terminal</li>
              <li className="font-mono text-[10px] text-neutral-500 mt-2 block italic">※ Razorpay flat 2% gateway surcharge applies dynamically.</li>
            </ul>
          </div>

          <button 
            type="button"
            onClick={() => openCheckoutPipeline("premium")}
            className="w-full py-3.5 bg-cyan-500 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:bg-cyan-400 shadow-xl shadow-cyan-500/10 flex items-center justify-center gap-2 group active:scale-95"
          >
            Deploy Premium <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* ================= 👑 ALL-IN-ONE REAL CHECKOUT POPUP MODAL ================= */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-900 flex justify-between items-center bg-black/40">
              <div className="flex items-center gap-2 text-cyan-400">
                <FaFileInvoiceDollar size={18} />
                <h3 className="font-black text-xs uppercase tracking-wider text-white">Secure Contract Allocation</h3>
              </div>
              <button type="button" onClick={() => setShowCheckoutModal(false)} className="text-neutral-500 hover:text-white transition-all"><FaTimes size={16} /></button>
            </div>

            {/* Modal Body & Dynamic Controls */}
            <div className="p-6 space-y-5 font-mono">
              <div className="space-y-1 bg-black/40 border border-neutral-900 p-3 rounded-xl">
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">Selected Package</span>
                <p className="text-sm font-black text-white uppercase">
                  {selectedPlanTier === "trial" ? "7 Days Live Trial Plan" : selectedPlanTier === "basic" ? "Basic Digital Plan" : "Premium Elite Plan"}
                </p>
              </div>

              {/* DYNAMIC LEASE DROP-SELECTOR */}
              {selectedPlanTier !== "trial" && (
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Select Subscription Timeline</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "1 Month", value: 1 }, 
                      { label: "3 Mo (-5%)", value: 3 }, 
                      { label: "6 Mo (-10%)", value: 6 }, 
                      { label: "12 Mo (Save! 🚀)", value: 12 }
                    ].map((item) => (
                      <button 
                        key={item.value} 
                        type="button"
                        onClick={() => setMonths(item.value)} 
                        className={`p-2.5 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all border ${months === item.value ? "bg-white border-white text-black font-black" : "bg-black border-neutral-800 text-neutral-400 hover:border-neutral-700"}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* LIVE PRICING BREAKDOWN FEED WITH ADDED SURCHARGE */}
              <div className="border-t border-neutral-900 pt-4 space-y-2 text-xs font-bold text-neutral-400">
                <div className="flex justify-between"><span>Plan Standard Cost:</span><span className="text-white">₹{breakdown.subTotal.toLocaleString("en-IN")}</span></div>
                {selectedPlanTier !== "trial" && <div className="flex justify-between text-neutral-500"><span>Standard Base Base:</span><span className="line-through">₹{breakdown.basePrice.toLocaleString("en-IN")}</span></div>}
                {selectedPlanTier !== "trial" && <div className="flex justify-between text-cyan-500"><span>Bundle Discounts:</span><span>-₹{breakdown.discount.toLocaleString("en-IN")}</span></div>}
                
                {/* 💳 INJECTED ACCURATE ADDITION VIEW */}
                <div className="flex justify-between text-amber-500 text-[11px]">
                  <span>Razorpay Surcharge (+2%):</span>
                  <span>+₹{breakdown.razorpayFees.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                {months === 12 && selectedPlanTier !== "trial" && <p className="text-[9px] text-cyan-400 uppercase tracking-tight font-sans animate-pulse">🎯 Flat Bulk Offer Activated</p>}
              </div>

              {/* REAL COMPUTED COMBINED VALUE CARD */}
              <div className="bg-black/60 border border-neutral-900 p-4 rounded-xl flex justify-between items-center text-sm font-black text-white mt-4">
                <div className="flex flex-col">
                  <span className="uppercase text-[9px] tracking-wider text-cyan-400 font-sans">Gross Payable Node</span>
                  <span className="text-[9px] font-normal text-neutral-500 lowercase mt-0.5">Includes Deployed Gateway Processing Fees</span>
                </div>
                {/* 🔥 Shows accumulated price (e.g. ₹5,100 instead of ₹5,000) */}
                <span className="text-2xl text-cyan-400 font-mono">₹{breakdown.actualTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-5 bg-black/60 border-t border-neutral-900 flex gap-3">
              <button type="button" onClick={() => setShowCheckoutModal(false)} className="flex-1 py-3 border border-neutral-800 rounded-xl text-xs font-black uppercase text-neutral-400 hover:text-white transition-all">Cancel</button>
              <button 
                type="button"
                onClick={handleRazorpayPayment} 
                disabled={paymentLoading} 
                className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center disabled:opacity-40"
              >
                {paymentLoading ? "Processing Node..." : `Pay Total ₹${breakdown.actualTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}