"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    whatsapp: "",
    city: "",
    state: "",

    businessName: "",
    businessCategory: "",
    website: "",

    agencyName: "",
    ownerName: "",
    agencyWebsite: "",
    totalClients: "1-10",
    services: "",

    employeeId: "",
    staffType: "sales",
    companyName: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!role) {
      alert("Please select your role");
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    try {
      setLoading(true);

      const res = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          role,
          ...form,
          services: form.services
            ? form.services
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : [],
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || data.error || "Something went wrong");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.subscription) {
        localStorage.setItem(
          "subscription",
          JSON.stringify(data.subscription)
        );
      }

      router.push("/dashboard");
    } catch (error) {
      console.log("ONBOARDING SUBMIT ERROR ❌", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-[#111827] border border-cyan-500/20 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="mb-8">
          <p className="text-cyan-400 text-sm font-semibold">
            STONENOX AI SETUP
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Complete your profile
          </h1>

          <p className="text-gray-400 mt-2">
            Select your role and we will prepare the right dashboard for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            type="button"
            onClick={() => setRole("owner")}
            className={`rounded-2xl border p-5 text-left transition ${
              role === "owner"
                ? "bg-cyan-500 text-black border-cyan-500"
                : "bg-black/20 border-white/10 hover:border-cyan-400"
            }`}
          >
            <h3 className="text-lg font-bold">Business Owner</h3>
            <p className="text-sm mt-2 opacity-80">
              Connect channels, manage leads and view reports.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setRole("agency")}
            className={`rounded-2xl border p-5 text-left transition ${
              role === "agency"
                ? "bg-cyan-500 text-black border-cyan-500"
                : "bg-black/20 border-white/10 hover:border-cyan-400"
            }`}
          >
            <h3 className="text-lg font-bold">Agency</h3>
            <p className="text-sm mt-2 opacity-80">
              Manage clients, campaigns and agency reports.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setRole("staff")}
            className={`rounded-2xl border p-5 text-left transition ${
              role === "staff"
                ? "bg-cyan-500 text-black border-cyan-500"
                : "bg-black/20 border-white/10 hover:border-cyan-400"
            }`}
          >
            <h3 className="text-lg font-bold">Staff</h3>
            <p className="text-sm mt-2 opacity-80">
              Work on assigned leads, reports and tasks.
            </p>
          </button>
        </div>

        {role && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-cyan-400 mb-4">
                Basic Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="phone"
                  placeholder="Mobile Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  name="whatsapp"
                  placeholder="WhatsApp Number"
                  value={form.whatsapp}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>

            {role === "owner" && (
              <div>
                <h2 className="text-xl font-semibold text-cyan-400 mb-4">
                  Business Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="businessName"
                    placeholder="Business Name"
                    value={form.businessName}
                    onChange={handleChange}
                    className="input"
                  />

                  <select
                    name="businessCategory"
                    value={form.businessCategory}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Select Business Category</option>
                    <option value="real_estate">Real Estate</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="gym">Gym</option>
                    <option value="education">Education</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="ecommerce">Ecommerce</option>
                    <option value="digital_marketing">
                      Digital Marketing
                    </option>
                    <option value="other">Other</option>
                  </select>

                  <input
                    name="website"
                    placeholder="Website URL optional"
                    value={form.website}
                    onChange={handleChange}
                    className="input md:col-span-2"
                  />
                </div>
              </div>
            )}

            {role === "agency" && (
              <div>
                <h2 className="text-xl font-semibold text-cyan-400 mb-4">
                  Agency Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="agencyName"
                    placeholder="Agency Name"
                    value={form.agencyName}
                    onChange={handleChange}
                    className="input"
                  />

                  <input
                    name="ownerName"
                    placeholder="Owner Name"
                    value={form.ownerName}
                    onChange={handleChange}
                    className="input"
                  />

                  <input
                    name="agencyWebsite"
                    placeholder="Agency Website optional"
                    value={form.agencyWebsite}
                    onChange={handleChange}
                    className="input"
                  />

                  <select
                    name="totalClients"
                    value={form.totalClients}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="1-10">1 - 10 Clients</option>
                    <option value="10-50">10 - 50 Clients</option>
                    <option value="50+">50+ Clients</option>
                  </select>

                  <input
                    name="services"
                    placeholder="Services: SEO, Meta Ads, Google Ads"
                    value={form.services}
                    onChange={handleChange}
                    className="input md:col-span-2"
                  />
                </div>
              </div>
            )}

            {role === "staff" && (
              <div>
                <h2 className="text-xl font-semibold text-cyan-400 mb-4">
                  Staff Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="employeeId"
                    placeholder="Employee ID"
                    value={form.employeeId}
                    onChange={handleChange}
                    className="input"
                  />

                  <select
                    name="staffType"
                    value={form.staffType}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="sales">Sales</option>
                    <option value="ads_manager">Ads Manager</option>
                    <option value="social_media_manager">
                      Social Media Manager
                    </option>
                    <option value="hr">HR</option>
                    <option value="support">Support</option>
                    <option value="accountant">Accountant</option>
                  </select>

                  <input
                    name="companyName"
                    placeholder="Company Name"
                    value={form.companyName}
                    onChange={handleChange}
                    className="input md:col-span-2"
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !role}
              className="w-full py-4 rounded-2xl bg-cyan-500 text-black font-bold hover:bg-cyan-600 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}