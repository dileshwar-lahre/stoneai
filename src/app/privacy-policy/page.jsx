export const metadata = {
  title: "Privacy Policy | Stonenox AI",
  description: "Privacy Policy for Stonenox AI",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 px-4 pb-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <span className="rounded-full bg-cyan-100 px-4 py-1 text-sm font-medium text-cyan-700">
            Stonenox AI
          </span>

          <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-3 text-gray-500">
            Last Updated: 13 June 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <Section
            title="1. Introduction"
            content="Stonenox AI is a CRM, social media management, AI automation, and digital marketing platform. We value your privacy and are committed to protecting your personal and business information."
          />

          <Section
            title="2. Information We Collect"
            content="We may collect your name, email address, phone number, company information, connected social media account data, billing details, and usage activity when you use our services."
          />

          <Section
            title="3. How We Use Your Information"
            content="We use collected information to create accounts, verify users, send OTPs, provide CRM services, schedule social media content, manage subscriptions, process payments, and improve our platform."
          />

          <Section
            title="4. WhatsApp, Email & Notifications"
            content="We may send OTPs, payment receipts, account alerts, service updates, subscription notifications, and important communications through WhatsApp, email, or in-app notifications."
          />

          <Section
            title="5. Social Media Integrations"
            content="When you connect platforms such as Facebook, Instagram, Google Business Profile, or advertising accounts, Stonenox AI only accesses authorized information required to provide analytics, reporting, scheduling, CRM, and automation services."
          />

          <Section
            title="6. Payment Information"
            content="Payments may be processed through secure third-party payment providers. Stonenox AI does not store complete card details, UPI credentials, or banking passwords."
          />

          <Section
            title="7. Data Sharing"
            content="We do not sell your personal data. Information may be shared with trusted service providers such as hosting, database, communication, analytics, and payment partners when necessary to operate our services."
          />

          <Section
            title="8. Data Security"
            content="We use secure technologies, encrypted connections, restricted access controls, and monitoring systems to help protect your information from unauthorized access."
          />

          <Section
            title="9. Cookies"
            content="Our platform may use cookies and similar technologies to maintain login sessions, improve user experience, analyze traffic, and enhance platform performance."
          />

          <Section
            title="10. User Rights"
            content="Users may request access, correction, or deletion of personal information by contacting our support team. Some data may be retained where required by law or for business records."
          />

          <Section
            title="11. Changes to This Policy"
            content="We may update this Privacy Policy from time to time. Updated versions will be published on this page with a revised date."
          />

          <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Contact Us
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Company:</strong> Stonenox AI
              </p>

              <p>
                <strong>Email:</strong> support@stonenox.com
              </p>

              <p>
                <strong>Website:</strong> https://stonenox.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({ title, content }) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        {title}
      </h2>

      <p className="leading-7 text-gray-600">
        {content}
      </p>
    </section>
  );
}