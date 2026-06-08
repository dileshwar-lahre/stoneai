"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";

export default function DigitalPlansPage() {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 19, minutes: 0, seconds: 0 });

  // 👑 DEFINED 6 STRATEGIC GROWTH PLANS
  const plans = [
    {
      planKey: "starter",
      planName: "Starter Retainer",
      actualPrice: 5000,
      originalPrice: 9090,
      discountPercent: 45,
      period: "Month",
      desc: "Essential social architecture for local business growth channels.",
      features: [
        "10 Optimized Posts + 10 Stories per month",
        "3 Network Handlers (Instagram, Facebook, Google)",
        "Standard SEO & SMO Architecture Setup",
        "Google & Meta Ads Management Framework",
        "Stone CRM 0.1 Business Core Access",
        "Weekly Performance Analytics Reports"
      ]
    },
    {
      planKey: "advanced",
      planName: "Advanced Growth",
      actualPrice: 10000,
      originalPrice: 18180,
      discountPercent: 45,
      period: "Month",
      popular: true,
      desc: "Accelerated market reach with automated reporting channels.",
      features: [
        "15 High-Engagement Posts + 15 Stories",
        "3 Network Handlers (Instagram, Facebook, Google)",
        "Intermediate Search Engine Optimization",
        "Advanced Multi-Channel Campaign Infrastructure",
        "Stone CRM 0.2 Automation Matrix",
        "2x Weekly Automated WhatsApp Delivery Reports"
      ]
    },
    {
      planKey: "premium",
      planName: "Enterprise Premium",
      actualPrice: 20000,
      originalPrice: 36360,
      discountPercent: 45,
      period: "Month",
      desc: "Absolute market dominance with predictive lead pipelines.",
      features: [
        "30 Premium Corporate Posts + 30 Stories",
        "Full Google Business Engine Optimization",
        "Competitor Tracking SEO & SMO Matrix",
        "Hyper-Targeted High-ROI Performance Campaigns",
        "Stone CRM Ultimate Core Version Connected",
        "Real-time Automated WhatsApp Analytics Sync"
      ]
    },
    {
      planKey: "web_dev",
      planName: "Advanced E-Commerce Platform",
      actualPrice: 30000,
      originalPrice: 37500,
      discountPercent: 20,
      period: "One-Time Development",
      desc: "High-conversion architecture built for enterprise commerce.",
      features: [
        "Advanced Secure Login & Session Infrastructure",
        "Hyper-Fast Search & Algolia Filtering Engines",
        "Complete Commercial Inventory Architecture",
        "Integrated Razorpay Native Checkout Framework",
        "Next.js High-Performance Speed Optimization",
        "1 Year Technical Engine Maintenance Support"
      ]
    },
    {
      planKey: "app_dev",
      planName: "Unified Web + Native App Stack",
      actualPrice: 50000,
      originalPrice: 62500,
      discountPercent: 20,
      period: "One-Time Development",
      desc: "Full-stack mobile and scalable cloud environment.",
      features: [
        "Premium Web Application (Next.js Production Core)",
        "Native iOS & Android Applications (React Native)",
        "Elastic Search & Secure Authentication Protocols",
        "Native Payment Gateway Integrations",
        "Unified Super-Admin Panel Command Console",
        "High-Scale Database Layer Setup (MongoDB/AWS)"
      ]
    },
    {
      planKey: "mega_combo",
      planName: "Ultimate AI Stack + 1 Year Retainer",
      actualPrice: 100000,
      originalPrice: 125000,
      discountPercent: 20,
      period: "Complete Turnkey Bundle",
      mega: true,
      desc: "The absolute turnkey framework for maximum immediate authority.",
      features: [
        "Full Production Web App + iOS & Android Native Stacks",
        "Algolia Cloud Search, Secure Auth & E-Com Infrastructure",
        "1 FULL YEAR EXECUTIVE DIGITAL MARKETING RETAINER INCLUDED",
        "30 Custom Posts + 30 Stories monthly for 12 months",
        "Stone CRM Enterprise Premium Lifetime License",
        "Daily WhatsApp Analytics Synchronized Reports"
      ]
    }
  ];

  const [selectedPlan, setSelectedPlan] = useState(plans[1]);

  useEffect(() => {
    // ⏱️ INFINITE 19-HOUR COUNTER ENGINE
    const getStoredTarget = () => {
      const stored = localStorage.getItem("stonenox_countdown_target");
      if (stored) {
        const targetTime = parseInt(stored, 10);
        if (targetTime > Date.now()) return targetTime;
      }
      return Date.now() + 19 * 60 * 60 * 1000;
    };

    let targetTimestamp = getStoredTarget();
    localStorage.setItem("stonenox_countdown_target", targetTimestamp.toString());

    const interval = setInterval(() => {
      const difference = targetTimestamp - Date.now();
      if (difference <= 0) {
        targetTimestamp = Date.now() + 19 * 60 * 60 * 1000;
        localStorage.setItem("stonenox_countdown_target", targetTimestamp.toString());
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const payNow = async () => {
    setPaymentLoading(true);
    try {
      if (typeof window === "undefined" || !window.Razorpay) {
        alert("🚨 Razorpay SDK component missing on client window! Refresh required.");
        setPaymentLoading(false);
        return;
      }

      const clientKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_HERE";

      // 1. Hit standard order generation route (amount passing)
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedPlan.actualPrice }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order generation failed");

      // 2. Razorpay Interface Triggering Setup
      const options = {
        key: clientKeyId.trim(), 
        amount: data.amount,
        currency: data.currency,
        name: "Stonenox AI Platforms",
        description: `Operational Purchase: ${selectedPlan.planName}`,
        order_id: data.order_id,
        prefill: {
          name: "Dileshwar Lahre",
          email: "dileshwarlahre806@gmail.com", 
          contact: "9131460470",
          method: "upi"
        },
        config: {
          display: {
            blocks: {
              upi: {
                name: "Direct UPI Ecosystem / Apps",
                instruments: [{ method: "upi", apps: ["google_pay", "phonepe", "paytm", "bhim"] }]
              }
            },
            sequence: ["block.upi"],
            preferences: { show_default_blocks: true }
          }
        },
        handler: async function (response) {
          // 🚀 DIRECT HITTING OUR DEDICATED VERIFICATION ROUTE (Step 2)
          const verifyRes = await fetch("/api/digital-plan-verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: "65c3b2e1f1d2c3b4a5e6f7a8", // Production mapping ID block
              planKey: selectedPlan.planKey,
              planName: selectedPlan.planName,
              price: selectedPlan.actualPrice,
              userEmail: "dileshwarlahre806@gmail.com", // Dynamic receiver email channel
              userName: "Dileshwar Lahre"
            }),
          });
          
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            // LocalStorage cache update for quick local session tracks
            localStorage.setItem("digital_subscription", JSON.stringify(verifyData.subscription));
            alert(`Paisa Aa Gaya Bhai! ${selectedPlan.planName} Active 🎉`);
            window.location.href = "/dashboard";
          } else {
            alert("Verification Blocked: " + verifyData.error);
          }
        },
        theme: { color: "#0ea5e9" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      alert(" Ecosysten Bridge Error: " + err.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col justify-center items-center pt-32 pb-16 px-4 select-none">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      {/* ⏱️ COUNTDOWN CONTAINER */}
      <div className="max-w-6xl w-full bg-orange-50 border border-orange-200 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3 mb-10">
        <div className="text-center sm:text-left">
          <span className="text-orange-700 font-black text-xs uppercase tracking-wide">🇮🇳 Special India Region Subsidy Live</span>
          <p className="text-slate-500 text-[11px] font-medium mt-0.5">Corporate growth rates locked safely to active runtime module.</p>
        </div>
        <div className="bg-slate-900 text-orange-400 font-mono text-sm px-4 py-1.5 rounded-xl font-bold tracking-tight shadow-sm">
          Offer Ends: {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
        </div>
      </div>

      <div className="max-w-3xl w-full text-center mb-16">
        <span className="text-sky-600 font-bold text-xs tracking-wider uppercase bg-sky-50 px-4 py-1 rounded-full">
          Stonenox Hub Console
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-4">
          Select Workspace Model
        </h1>
      </div>

      {/* MATRIX DATA GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full mb-16">
        {plans.map((plan) => (
          <div
            key={plan.planKey}
            onClick={() => setSelectedPlan(plan)}
            className={`cursor-pointer p-8 rounded-3xl border transition-all duration-300 bg-white flex flex-col justify-between relative ${
              selectedPlan.planKey === plan.planKey
                ? "border-sky-500 ring-4 ring-sky-100 shadow-xl transform -translate-y-2"
                : "border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 right-6 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-[10px] font-black tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                Most Popular Retainer
              </span>
            )}
            {plan.mega && (
              <span className="absolute -top-3 right-6 bg-gradient-to-r from-rose-500 to-red-500 text-white text-[10px] font-black tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                Best Value Combo
              </span>
            )}

            <div>
              <div className="mb-4">
                <h3 className="font-extrabold text-lg text-slate-900">{plan.planName}</h3>
                <p className="text-slate-400 text-[11px] font-semibold mt-1 leading-relaxed">{plan.desc}</p>
              </div>

              <div className="my-6 border-b border-slate-100 pb-6">
                <div className="text-slate-400 text-xs font-bold line-through">
                  ₹{plan.originalPrice.toLocaleString("en-IN")}
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-black text-slate-900">₹{plan.actualPrice.toLocaleString("en-IN")}</span>
                  <span className="text-slate-400 text-xs font-medium">/{plan.period}</span>
                  <span className="ml-2 text-[9px] bg-green-50 text-green-600 font-bold px-1.5 py-0.5 rounded">
                    {plan.discountPercent}% OFF
                  </span>
                </div>
              </div>

              <ul className="space-y-3.5 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-600">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              <div className={`w-full text-center py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all ${
                selectedPlan.planKey === plan.planKey ? "bg-sky-500 text-white border-sky-500" : "bg-slate-50 text-slate-500 border-slate-200"
              }`}>
                {selectedPlan.planKey === plan.planKey ? "Active Selection" : "Mount Tier"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHECKOUT BOX PANEL */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-2xl max-w-md w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />
        
        <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center mb-6 border border-slate-100 text-left shadow-inner">
          <div>
            <span className="text-slate-800 text-xs font-black block tracking-tight leading-tight">{selectedPlan.planName}</span>
            <span className="text-[10px] text-slate-400 font-bold tracking-wide">Rate Type: {selectedPlan.period}</span>
          </div>
          <span className="text-xl font-black text-slate-900">₹{selectedPlan.actualPrice.toLocaleString("en-IN")}</span>
        </div>

        <button
          onClick={payNow}
          disabled={paymentLoading}
          className="w-full py-4 px-6 text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 disabled:from-slate-300 rounded-xl shadow-md transition-all duration-200 active:scale-[0.99]"
        >
          {paymentLoading ? "Processing Secure Order..." : `Activate ${selectedPlan.planName}`}
        </button>
      </div>
    </div>
  );
}