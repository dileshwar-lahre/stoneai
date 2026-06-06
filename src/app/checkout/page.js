"use client";
import { useState, useEffect } from "react";
import Script from "next/script";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("owner");
  
  const [selectedPlan, setSelectedPlan] = useState({ 
    planKey: "standard", 
    planName: "Standard Plan", 
    price: 999,
    durationDays: 30
  });

  const plans = [
    { 
      planKey: "basic", 
      planName: "Basic Plan", 
      price: 499, 
      durationDays: 30,
      isTrialAvailable: true,
      desc: "Perfect tier for single workspace deployment and basic automation.", 
      features: ["5 Channels Connected", "2 Staff Members Allowed", "7 Days Free Trial Available"]
    },
    { 
      planKey: "standard", 
      planName: "Standard Plan", 
      price: 999, 
      durationDays: 30,
      popular: true,
      desc: "Ideal tier for scaling up operations with dynamic workflow controls.", 
      features: ["10 Channels Connected", "5 Staff Members Allowed", "Priority Support Structure"]
    },
    { 
      planKey: "premium", 
      planName: "Premium Plan", 
      price: 2499, 
      durationDays: 30,
      desc: "Full enterprise stack to aggressively dominate your regional market.", 
      features: ["99 Channels Connected", "20 Staff Members Allowed", "Dedicated Account Manager"]
    },
  ];

  useEffect(() => {
    const storedSubscription = localStorage.getItem("subscription");
    if (storedSubscription) {
      try {
        const parsed = JSON.parse(storedSubscription);
        if (parsed?.role) setUserRole(parsed.role);
      } catch (e) {
        console.log("ROLE_FETCH_ERROR", e);
      }
    }
  }, []);

  // 🎁 7 Days Free Trial
  const activateFreeTrial = async () => {
    setLoading(true);
    try {
      // Temporary static fallback jab tak Auth integration na ho database se
      const currentUserId = "65c3b2e1f1d2c3b4a5e6f7a8"; 

      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isTrialActivation: true,
          userId: currentUserId,
          role: userRole,
          planKey: "trial",
          planName: "7 Days Free Trial",
          price: 0,
          durationDays: 7
        }),
      });
      const verifyData = await res.json();
      
      if (verifyData.success) {
        localStorage.setItem("subscription", JSON.stringify(verifyData.subscription));
        alert("🎉 7 Days Free Trial Successfully Activated, Bhai!");
        window.location.href = "/dashboard";
      } else {
        alert("Trial activate nahi ho paya: " + (verifyData.error || "Unknown Error"));
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 💳 Razorpay Paid Processing
  const payNow = async () => {
    setLoading(true);
    try {
      const currentUserId = "65c3b2e1f1d2c3b4a5e6f7a8"; // Valid Object ID structural representation

      // 1. Hit create order API
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedPlan.price }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order fail ho gaya");

      // 2. Client Side Gateway Options Build
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Exact env match check
        amount: data.amount,
        currency: data.currency,
        name: "Stonenox AI",
        description: `Payment for ${selectedPlan.planName}`,
        order_id: data.order_id,
        handler: async function (response) {
          // Send parameters securely to verification endpoint
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: currentUserId,
              role: userRole,
              planKey: selectedPlan.planKey,
              planName: selectedPlan.planName,
              price: selectedPlan.price,
              durationDays: selectedPlan.durationDays
            }),
          });
          
          const verifyData = await verifyRes.json();
          
          if (verifyData.success) {
            localStorage.setItem("subscription", JSON.stringify(verifyData.subscription));
            alert(`Paisa Aa Gaya Bhai! ${selectedPlan.planName} Active 🎉`);
            window.location.href = "/dashboard";
          } else {
            alert("Verification Failed: " + verifyData.error);
          }
        },
        prefill: {
          name: "Dileshwar Lahre",
          email: "support@stonenox.com",
          contact: "9131460470",
        },
        theme: { color: "#0ea5e9" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col justify-center items-center pt-32 pb-16 px-4">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Header Container */}
      <div className="max-w-3xl w-full text-center mb-12">
        <span className="text-sky-600 font-bold text-sm tracking-wider uppercase bg-sky-50 px-3 py-1 rounded-full">
          Stonenox {userRole} Workspace
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
          Select Your Workspace Limits
        </h1>
        <p className="text-slate-500 mt-2 text-sm">
          Plans are tailored globally. Content configuration maps directly to your account type.
        </p>
      </div>

      {/* Grid Layout Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-12">
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
              <span className="absolute -top-3 right-6 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                Most Popular
              </span>
            )}

            <div>
              <div className="mb-4">
                <h3 className="font-extrabold text-xl text-slate-900">{plan.planName}</h3>
                <p className="text-slate-400 text-sm mt-1">{plan.desc}</p>
              </div>

              <div className="my-6 border-b border-slate-100 pb-6">
                <span className="text-4xl font-black text-slate-900">₹{plan.price}</span>
                <span className="text-slate-400 text-sm font-medium">/{plan.durationDays} Days</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              {plan.isTrialAvailable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    activateFreeTrial();
                  }}
                  disabled={loading}
                  className="w-full text-center py-2.5 rounded-xl font-bold text-xs bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors mb-2"
                >
                  Start 7 Days Free Trial
                </button>
              )}

              <div className={`w-full text-center py-2.5 rounded-xl font-bold text-sm border transition-all ${
                selectedPlan.planKey === plan.planKey ? "bg-sky-500 text-white border-sky-500" : "bg-slate-50 text-slate-600 border-slate-200"
              }`}>
                {selectedPlan.planKey === plan.planKey ? "Selected Tier" : "Choose Tier"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Checkout Controls */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl max-w-md w-full text-center">
        <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center mb-6 border border-slate-100">
          <span className="text-slate-600 text-sm font-medium">{selectedPlan.planName}</span>
          <span className="text-xl font-extrabold text-slate-900">₹{selectedPlan.price}</span>
        </div>

        <button
          onClick={payNow}
          disabled={loading}
          className="w-full py-4 px-6 text-lg font-bold text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 disabled:from-slate-300 rounded-2xl shadow-lg transition-all duration-200"
        >
          {loading ? "Processing..." : `Buy ${selectedPlan.planName}`}
        </button>
      </div>
    </div>
  );
}