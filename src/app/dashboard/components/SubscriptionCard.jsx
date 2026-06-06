"use client";

import { useEffect, useState } from "react";

export default function SubscriptionCard() {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const storedSubscription = localStorage.getItem("subscription");

    if (storedSubscription) {
      setSubscription(JSON.parse(storedSubscription));
    }
  }, []);

  if (!subscription) {
    return (
      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
        <h2 className="text-lg font-bold text-yellow-400">
          No Active Plan Found
        </h2>
        <p className="mt-2 text-sm text-gray-300">
          Please complete onboarding or choose a subscription plan.
        </p>
      </div>
    );
  }

  const endDate = new Date(subscription.currentPeriodEnd);
  const today = new Date();

  const remainingDays = Math.max(
    0,
    Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#111827] p-5 shadow-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-cyan-400">
            CURRENT PLAN
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            {subscription.planName}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Status:{" "}
            <span className="font-semibold text-green-400">
              {subscription.status}
            </span>
          </p>
        </div>

        <div className="rounded-2xl bg-cyan-500 px-5 py-3 text-center text-black">
          <p className="text-3xl font-black">{remainingDays}</p>
          <p className="text-xs font-bold">Days Left</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl bg-black/30 p-3">
          <p className="text-xs text-gray-400">Channels</p>
          <p className="text-lg font-bold text-white">
            {subscription.limits?.channels || 0}
          </p>
        </div>

        <div className="rounded-xl bg-black/30 p-3">
          <p className="text-xs text-gray-400">Clients</p>
          <p className="text-lg font-bold text-white">
            {subscription.limits?.clients || 0}
          </p>
        </div>

        <div className="rounded-xl bg-black/30 p-3">
          <p className="text-xs text-gray-400">Staff</p>
          <p className="text-lg font-bold text-white">
            {subscription.limits?.totalStaff || 0}
          </p>
        </div>

        <div className="rounded-xl bg-black/30 p-3">
          <p className="text-xs text-gray-400">Price</p>
          <p className="text-lg font-bold text-white">
            ₹{subscription.price || 0}
          </p>
        </div>
      </div>
    </div>
  );
}