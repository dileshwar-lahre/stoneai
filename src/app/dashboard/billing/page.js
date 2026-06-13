"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { FaCheck, FaUsers, FaArrowRight, FaLock, FaTimes, FaFileInvoiceDollar } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

export default function BillingPage() {
  const [userRole, setUserRole] = useState(null); // owner, agency, staff
  const [userId, setUserId] = useState(null);
  
  // 🎯 LIVE LOGGED-IN USER PROFILE STATES (NO STATIC DATA)
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  
  // 🧭 INVOICE MODAL OPEN/CLOSE STATE
  const [showInvoice, setShowInvoice] = useState(false);

  // 🧭 PARAMETERS STATE MATRIX
  const [months, setMonths] = useState(1);
  const [whatsappReporting, setWhatsappReporting] = useState("no"); 
  const [staffCount, setStaffCount] = useState(3); 
  const [finalPrice, setFinalPrice] = useState(0);

  // PLANS SELECTION HOOKS
  const [agencyBasePlan, setAgencyBasePlan] = useState("10"); // 10, 20, 50
  const [ownerBasePlan, setOwnerBasePlan] = useState("499"); // 499, 999, 2999

  // LIVE INVOICE ITEM-WISE PRICE BREAKDOWN
  const [breakdown, setBreakdown] = useState({
    basePrice: 0,
    staffCost: 0,
    whatsappCost: 0
  });

  // 💵 BASELINE STATIC PRICING MATRIX
  const BASE_PRICES = {
    "499": 499,
    "999": 999,
    "2999": 2999,
    "10": 4999,
    "20": 7999,
    "50": 14999
  };

  // 📡 PURE CUSTOM INSTANT PROFILE CHECKER (Bypassing next-auth completely)
  useEffect(() => {
    async function fetchUserRoleContext() {
      try {
        const res = await fetch("/api/user/profile", { 
          cache: "no-store",
          headers: { "Content-Type": "application/json" }
        });
        const json = await res.json();
        
        if (json.success && json.user) {
          // Dynamic layout refresh using database context keys
          setUserRole(json.user.role || "owner");
          setUserId(json.user._id || json.user.id);
          
          // 🎯 Dynamic extraction of active session info
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

  // 🧠 PRICING MATH ENGINE
  useEffect(() => {
    if (!userRole) return;

    let baseCost = userRole === "agency" ? BASE_PRICES[agencyBasePlan] : BASE_PRICES[ownerBasePlan];
    let extraStaffCost = staffCount > 3 ? (staffCount - 3) * 500 : 0;
    let whatsappCost = whatsappReporting === "yes" ? 5000 : 0;

    let totalPerMonth = baseCost + extraStaffCost + whatsappCost;
    let calculatedTotal = totalPerMonth * months;

    // Term discounts
    if (months === 6) calculatedTotal *= 0.9;  
    if (months === 12) calculatedTotal *= 0.8; 

    // Sync breakdown metrics live
    setBreakdown({
      basePrice: baseCost * months,
      staffCost: extraStaffCost * months,
      whatsappCost: whatsappCost * months
    });

    // 🚀 TESTING MODE MANDATE: Dynamic parameters show honge par payable check force karke ₹1 lock kar diya hai
    setFinalPrice(1);

  }, [userRole, months, whatsappReporting, staffCount, agencyBasePlan, ownerBasePlan]);

  // Handle Deploy Button Click -> Open Invoice Popup
  const handleDeployContract = (e) => {
    e.preventDefault();
    setShowInvoice(true);
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
      const planNameString = userRole === "agency" ? `Agency Bundle (${agencyBasePlan} Clients)` : `Owner Plan (Base ₹${ownerBasePlan})`;
      const selectedPlanKey = userRole === "agency" ? agencyBasePlan : ownerBasePlan;

      // 1. Hit your working order generator route directly (Passing ₹1 payload)
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalPrice }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation backend failed");

      // 2. Build options configuration layout
      const options = {
        key: clientKeyId.trim(),
        amount: data.amount,
        currency: data.currency,
        name: "Stonenox AI",
        description: `Payment for ${planNameString}`,
        order_id: data.order_id,
        prefill: {
          name: userName,
          email: userEmail, // 🎯 Active Login Email dynamically goes to Razorpay window
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
          // 3. Fire dynamic login data payload straight back to your verify API endpoint
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId,
              userEmail,               // 🎯 100% Dynamic Logged-In email passed to database & Resend
              userName,                // 🎯 Dynamic Logged-In user name
              planKey: selectedPlanKey,
              planName: planNameString,
              price: finalPrice,       // ₹1
              durationDays: months * 30,
              planType: userRole       // owner ya agency role tracker status
            }),
          });
          
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert(`Paisa Aa Gaya Bhai! User Table Saved & Mail Delivered 🎉`);
            window.location.href = "/dashboard";
          } else {
            alert("Verification Failed: " + verifyData.error);
          }
        },
        theme: { color: "#7c3aed" },
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
      <div className="min-h-screen bg-[#07090e] text-white flex items-center justify-center font-bold text-xs tracking-widest animate-pulse">
        INITIALIZING PROVISIONING NODE...
      </div>
    );
  }

  if (userRole === "staff") {
    return (
      <div className="min-h-screen bg-[#07090e] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center border border-red-500/20 mb-4 text-xl"><FaLock /></div>
        <h2 className="text-lg font-black uppercase tracking-tight">Access Restricted</h2>
        <p className="text-xs text-neutral-500 max-w-xs mt-1 font-medium">Staff tokens cannot manipulate core billing cycles.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 md:p-8 select-none antialiased">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      
      {/* HEADER CONTROLS */}
      <div className="max-w-6xl mx-auto text-center mb-12 mt-6">
        <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest rounded-full">
          Mail Tool Beta v.01
        </span>
        <h1 className="text-3xl md:text-4xl font-black mt-3 tracking-tight">Choose Your Deployment Plan</h1>
        <p className="text-sm text-neutral-400 mt-2 font-medium max-w-md mx-auto">
          Scale your business automation with zero hidden contracts. Cancel or upgrade anytime.
        </p>
      </div>

      {/* CORE CARDS WRAPPER SPLITTER */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT COLUMN ROW DEPLOYMENTS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* ======= AGENCY LAYOUT LOOP ======= */}
            {userRole === "agency" && (
              <>
                <div onClick={() => setAgencyBasePlan("10")} className={`border rounded-2xl p-6 cursor-pointer bg-[#0c0f17] transition-all relative ${agencyBasePlan === "10" ? "border-purple-600 ring-2 ring-purple-600/20 shadow-2xl" : "border-neutral-900 hover:border-neutral-700"}`}>
                  <h3 className="text-sm font-black uppercase text-neutral-400 tracking-wider">10 Clients</h3>
                  <div className="mt-4 flex items-baseline gap-1"><span className="text-2xl font-black">₹4,999</span><span className="text-xs text-neutral-500 font-medium">/mo</span></div>
                  <div className="mt-6 space-y-3 text-xs text-neutral-400 font-bold border-t border-neutral-900 pt-4">
                    <div className="flex items-center gap-2"><FaCheck className="text-purple-500 shrink-0" /> 10 Account Pipelines</div>
                    <div className="flex items-center gap-2"><FaCheck className="text-purple-500 shrink-0" /> 3 Team Terminal Seats</div>
                  </div>
                </div>

                <div onClick={() => setAgencyBasePlan("20")} className={`border rounded-2xl p-6 cursor-pointer bg-[#0c0f17] transition-all relative ${agencyBasePlan === "20" ? "border-purple-600 ring-2 ring-purple-600/20 shadow-2xl" : "border-neutral-900 hover:border-neutral-700"}`}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-black px-3 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-full">Most Popular</div>
                  <h3 className="text-sm font-black uppercase text-purple-400 tracking-wider mt-1">20 Clients</h3>
                  <div className="mt-4 flex items-baseline gap-1"><span className="text-2xl font-black">₹7,999</span><span className="text-xs text-neutral-500 font-medium">/mo</span></div>
                  <div className="mt-6 space-y-3 text-xs text-neutral-400 font-bold border-t border-neutral-900 pt-4">
                    <div className="flex items-center gap-2"><FaCheck className="text-purple-500 shrink-0" /> 20 Account Pipelines</div>
                    <div className="flex items-center gap-2"><FaCheck className="text-purple-500 shrink-0" /> 3 Team Terminal Seats</div>
                  </div>
                </div>

                <div onClick={() => setAgencyBasePlan("50")} className={`border rounded-2xl p-6 cursor-pointer bg-[#0c0f17] transition-all relative ${agencyBasePlan === "50" ? "border-purple-600 ring-2 ring-purple-600/20 shadow-2xl" : "border-neutral-900 hover:border-neutral-700"}`}>
                  <h3 className="text-sm font-black uppercase text-neutral-400 tracking-wider">50 Clients</h3>
                  <div className="mt-4 flex items-baseline gap-1"><span className="text-2xl font-black">₹14,999</span><span className="text-xs text-neutral-500 font-medium">/mo</span></div>
                  <div className="mt-6 space-y-3 text-xs text-neutral-400 font-bold border-t border-neutral-900 pt-4">
                    <div className="flex items-center gap-2"><FaCheck className="text-purple-500 shrink-0" /> 50 Account Pipelines</div>
                    <div className="flex items-center gap-2"><FaCheck className="text-purple-500 shrink-0" /> 3 Team Terminal Seats</div>
                  </div>
                </div>
              </>
            )}

            {/* ======= OWNER LAYOUT LOOP ======= */}
            {userRole === "owner" && (
              <>
                <div onClick={() => setOwnerBasePlan("499")} className={`border rounded-2xl p-6 cursor-pointer bg-[#0c0f17] transition-all ${ownerBasePlan === "499" ? "border-purple-600 ring-2 ring-purple-600/20 shadow-2xl" : "border-neutral-900 hover:border-neutral-700"}`}>
                  <h3 className="text-sm font-black uppercase text-neutral-400 tracking-wider">Basic Node</h3>
                  <div className="mt-4 flex items-baseline gap-1"><span className="text-2xl font-black">₹499</span><span className="text-xs text-neutral-500 font-medium">/mo</span></div>
                  <div className="mt-6 space-y-3 text-xs text-neutral-400 font-bold border-t border-neutral-900 pt-4">
                    <div className="flex items-center gap-2"><FaCheck className="text-purple-500 shrink-0" /> Core CRM Funnel Access</div>
                    <div className="flex items-center gap-2"><FaCheck className="text-purple-500 shrink-0" /> Social Scheduler Module</div>
                  </div>
                </div>

                <div onClick={() => setOwnerBasePlan("999")} className={`border rounded-2xl p-6 cursor-pointer bg-[#0c0f17] transition-all relative ${ownerBasePlan === "999" ? "border-purple-500 ring-2 ring-purple-600/20 shadow-2xl" : "border-neutral-900 hover:border-neutral-700"}`}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-black px-3 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-full">Best Seller</div>
                  <h3 className="text-sm font-black uppercase text-purple-400 tracking-wider mt-1">Growth Node</h3>
                  <div className="mt-4 flex items-baseline gap-1"><span className="text-2xl font-black">₹999</span><span className="text-xs text-neutral-500 font-medium">/mo</span></div>
                  <div className="mt-6 space-y-3 text-xs text-neutral-400 font-bold border-t border-neutral-900 pt-4">
                    <div className="flex items-center gap-2"><FaCheck className="text-purple-500 shrink-0" /> Full Automation Rules</div>
                    <div className="flex items-center gap-2"><FaCheck className="text-purple-500 shrink-0" /> Priority Server Traffic</div>
                  </div>
                </div>

                <div onClick={() => setOwnerBasePlan("2999")} className={`border rounded-2xl p-6 cursor-pointer bg-[#0c0f17] transition-all ${ownerBasePlan === "2999" ? "border-purple-600 ring-2 ring-purple-600/20 shadow-2xl" : "border-neutral-900 hover:border-neutral-700"}`}>
                  <h3 className="text-sm font-black uppercase text-neutral-400 tracking-wider">Enterprise</h3>
                  <div className="mt-4 flex items-baseline gap-1"><span className="text-2xl font-black">₹2,999</span><span className="text-xs text-neutral-500 font-medium">/mo</span></div>
                  <div className="mt-6 space-y-3 text-xs text-neutral-400 font-bold border-t border-neutral-900 pt-4">
                    <div className="flex items-center gap-2"><FaCheck className="text-purple-500 shrink-0" /> Unlimited Database Flow</div>
                    <div className="flex items-center gap-2"><FaCheck className="text-purple-500 shrink-0" /> Dedicated Web Node Setup</div>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* DYNAMIC MODIFIERS CONTROL PERIOD PANEL */}
          <div className="bg-[#0c0f17] border border-neutral-900 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                <FaWhatsapp className="text-emerald-500" /> WhatsApp Alert System
              </label>
              <select value={whatsappReporting} onChange={(e) => setWhatsappReporting(e.target.value)} className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-xs font-black uppercase text-neutral-300 outline-none focus:border-purple-600">
                <option value="no">Dashboard Engine Only (Default)</option>
                <option value="yes">Route Live Reports to WhatsApp (+₹5,000/mo)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                <FaUsers /> Additional Staff Seats
              </label>
              <select value={staffCount} onChange={(e) => setStaffCount(Number(e.target.value))} className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-xs font-black uppercase text-neutral-300 outline-none focus:border-purple-600">
                <option value={3}>3 Seats Included (Standard)</option>
                <option value={4}>4 Seats (+₹500/mo add-on)</option>
                <option value={5}>5 Seats (+₹1,000/mo add-on)</option>
                <option value={8}>8 Seats (+₹2,500/mo add-on)</option>
                <option value={10}>10 Seats (+₹3,500/mo add-on)</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2 pt-2 border-t border-neutral-900">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">Choose Billing Cycle Period</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[{ label: "1 Month", value: 1 }, { label: "3 Months", value: 3 }, { label: "6 Months (-10%)", value: 6 }, { label: "12 Months (-20%)", value: 12 }].map((item) => (
                  <button key={item.value} onClick={() => setMonths(item.value)} className={`p-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all border ${months === item.value ? "bg-purple-600 border-purple-500 text-black font-black" : "bg-black border-neutral-800 text-neutral-400"}`}>{item.label}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY SIDE CARD PANEL */}
        <div className="bg-[#0c0f17] border border-neutral-900 rounded-2xl p-6 space-y-6 lg:sticky lg:top-36">
          <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest">// Order Summary</h3>
          
          <div className="bg-black/40 border border-neutral-900 rounded-xl p-4 space-y-4 text-xs font-bold text-neutral-400">
            <div className="flex justify-between items-center">
              <span>Base Plan:</span>
              <span className="text-white uppercase font-black">
                {userRole === "agency" ? `Agency ${agencyBasePlan}` : `Owner ₹${ownerBasePlan}`}
              </span>
            </div>
            <div className="flex justify-between items-center"><span>Allocated Seats:</span><span className="text-white font-black">{staffCount} Users</span></div>
            <div className="flex justify-between items-center"><span>WhatsApp Core:</span><span className={`font-black ${whatsappReporting === "yes" ? "text-purple-400" : "text-neutral-500"}`}>{whatsappReporting === "yes" ? "ACTIVE" : "OFF"}</span></div>
            <div className="flex justify-between items-center border-t border-neutral-900 pt-3"><span>Cycle Term:</span><span className="text-purple-400 font-black tracking-wider">{months} Month(s)</span></div>
          </div>

          <div className="text-center py-2">
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest block">Total Checkout Price</span>
            <h2 className="text-4xl font-black font-mono text-white mt-1">₹1</h2> {/* Force display for local testing engine review */}
          </div>

          <button onClick={handleDeployContract} className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-purple-600/10 flex items-center justify-center gap-2 group">
            Deploy This Package <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* ================= 👑 INVOICE POPUP MODAL BLOCK ================= */}
      {showInvoice && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0c0f17] border border-neutral-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative">
            <div className="p-6 border-b border-neutral-900 flex justify-between items-center bg-neutral-950/40">
              <div className="flex items-center gap-2 text-purple-400">
                <FaFileInvoiceDollar size={18} />
                <h3 className="font-black text-sm uppercase tracking-wider text-white">Stonenox Invoice</h3>
              </div>
              <button onClick={() => setShowInvoice(false)} className="text-neutral-500 hover:text-white"><FaTimes size={16} /></button>
            </div>

            <div className="p-6 space-y-4 text-xs font-bold text-neutral-400">
              <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">// Plan & Add-ons Breakup</p>
              <div className="flex justify-between border-b border-neutral-900 pb-2"><span>Base Plan Cost ({months} Mo):</span><span className="text-white font-mono">₹{breakdown.basePrice.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between border-b border-neutral-900 pb-2"><span>Staff Add-on Cost:</span><span className="text-white font-mono">₹{breakdown.staffCost.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between border-b border-neutral-900 pb-2"><span>WhatsApp Alerts Node:</span><span className={`font-mono ${breakdown.whatsappCost > 0 ? "text-emerald-400" : "text-neutral-500"}`}>₹{breakdown.whatsappCost.toLocaleString("en-IN")}</span></div>
              {months >= 6 && <div className="flex justify-between text-purple-400 border-b border-neutral-900 pb-2"><span>Cycle Discount Applied:</span><span className="font-mono">-{months === 6 ? "10%" : "20%"} OFF</span></div>}
              <div className="bg-black/40 border border-neutral-900 p-4 rounded-xl flex justify-between items-center text-sm font-black text-white mt-6">
                <span className="uppercase text-[10px] tracking-wider text-neutral-500">Gross Payable Amount</span>
                <span className="text-xl text-purple-400 font-mono">₹1</span>
              </div>
            </div>

            <div className="p-6 bg-neutral-950/60 border-t border-neutral-900 flex gap-3">
              <button onClick={() => setShowInvoice(false)} className="flex-1 py-3 border border-neutral-800 rounded-xl text-xs font-black uppercase text-neutral-400 hover:text-white">Cancel</button>
              <button onClick={() => { setShowInvoice(false); handleRazorpayPayment(); }} disabled={paymentLoading} className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center">{paymentLoading ? "Processing..." : "Pay Now"}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}