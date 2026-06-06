"use client";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-sky-500 selection:text-white">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        
        {/* Main Header */}
        <div className="border-b border-slate-200 pb-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Last Updated: June 5, 2026
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8">
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            At <span className="font-semibold text-slate-900">Stonenox</span>, we highly value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or make a secure payment through the Razorpay gateway.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          
          {/* Section 1 */}
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-sky-500">1.</span> Information We Collect
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-2">
              When you use our platform or process a payment, we collect basic details required to fulfill your request:
            </p>
            <ul className="list-disc list-inside text-slate-600 text-sm md:text-base space-y-1 ml-2">
              <li>Identity Details: Name, Email address, and Contact number.</li>
              <li>Transaction Details: Order ID and Payment status (processed securely via Razorpay).</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-sky-500">2.</span> How We Use Your Data
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Your information is used strictly to process transactions, send payment receipts, provide customer support, and ensure a secure environment. **We never sell, rent, or trade your personal data with third-party marketers.**
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-sky-500">3.</span> Payment Security (Razorpay)
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              All financial transactions are handled securely by our payment partner, <span className="font-semibold text-slate-900">Razorpay</span>. Stonenox does **NOT** store your credit card numbers, CVVs, or banking passwords on our servers. Razorpay uses industry-standard encryption (SSL) to keep your financial data protected.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-sky-500">4.</span> Data Retention & Rights
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              We retain transaction records only as long as necessary for tax compliance and accounting purposes. You have the right to request the modification or deletion of your personal account information at any time by contacting us.
            </p>
          </section>

          {/* Section 5 - Contact Details Updated */}
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-sky-500">5.</span> Contact Support Team
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or data handling, feel free to reach out to our team:
            </p>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-sm md:text-base text-slate-600 space-y-2">
              <p><span className="font-semibold text-slate-900">Team:</span> Stonenox Support Team</p>
              <p><span className="font-semibold text-slate-900">Email:</span> <a href="mailto:support@stonenox.com" className="text-sky-600 hover:underline">support@stonenox.com</a></p>
              <p><span className="font-semibold text-slate-900">Phone:</span> <a href="tel:+919131460470" className="text-sky-600 hover:underline">+91 9131460470</a></p>
              <p><span className="font-semibold text-slate-900">Location:</span> Chhattisgarh, India</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}