"use client";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-sky-500 selection:text-white">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        
        {/* Main Header */}
        <div className="border-b border-slate-200 pb-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cancellation & Refund Policy
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Last Updated: June 5, 2026
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8">
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Thank you for choosing <span className="font-semibold text-slate-900">Stonenox</span>. We strive to provide the best digital and marketing services. Since our offerings are digital services and customized solutions, we maintain a transparent policy regarding cancellations and refunds.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          
          {/* Section 1 */}
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-sky-500">1.</span> Service Cancellation
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Customers can request the cancellation of an ongoing service project or subscription plan. To initiate a cancellation, you must contact our support team at least **7 working days** before the next billing cycle or phase commencement. Once a service phase has started, that specific phase cannot be cancelled.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-sky-500">2.</span> Refund Policy for Digital Services
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Due to the nature of customized digital services, software development, and marketing campaigns, **payments once processed are generally non-refundable**. Resources, efforts, and tools are allocated instantly upon project initiation. 
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mt-2">
              However, refunds may be considered on a case-by-case basis solely if Stonenox fails to deliver the promised scope of work due to internal technical limitations.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-sky-500">3.</span> Processing of Approved Refunds
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              If a refund is approved by our management team, the amount will be credited back to the original payment source (Bank Account, UPI, or Card) via the Razorpay API. Approved refunds typically take **5 to 7 working days** to reflect in your account, depending on your bank's processing cycle.
            </p>
          </section>

          {/* Section 4 - Contact Details */}
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-sky-500">4.</span> Reach Out to Us
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              If you have any issues with a payment, transactional dispute, or wish to request a project cancellation, please reach out to our dedicated support channels:
            </p>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-sm md:text-base text-slate-600 space-y-2">
              <p><span className="font-semibold text-slate-900">Team:</span> Stonenox Support Team</p>
              <p><span className="font-semibold text-slate-900">Email:</span> <a href="mailto:support@stonenox.com" className="text-sky-600 hover:underline">support@stonenox.com</a></p>
              <p><span className="font-semibold text-slate-900">Phone:</span> <a href="tel:+919131460470" className="text-sky-600 hover:underline">+91 9131460470</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}