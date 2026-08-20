import './globals.css';

export const metadata = {
  title: "Stonenox - Best Tech Company | Web, Android & iOS App Development",
  description: "Stonenox is the best tech company specializing in full-stack web development, Android and iOS mobile app development, cyber security, and high-performance digital solutions.",
  keywords: "Stonenox, Best Tech Company, Web Development, Android App Development, iOS App Development, Digital Marketing, Bilaspur, Chhattisgarh",
  icons: {
    icon: '/stonenox.ico',
    shortcut: '/stonenox.ico',
    apple: '/stonenox.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/stonenox.ico" type="image/x-icon" />
      </head>
      <body className="bg-[#000000] text-white font-sans selection:bg-orange-600 selection:text-white">
        {children}
        
        {/* Global SEO Footer & FAQ Section */}
        <footer className="bg-black border-t border-white/10 py-16 px-6 mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-orange-500 text-xs font-black tracking-[0.3em] uppercase">Stonenox Insights</span>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mt-2">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6 text-sm text-slate-400">
              <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl">
                <h3 className="text-white font-bold text-base mb-2">What makes Stonenox the best tech company?</h3>
                <p>We deliver top-tier web development, secure Android & iOS mobile applications, and high-impact digital marketing with a focus on scale and robust architecture.</p>
              </div>

              <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl">
                <h3 className="text-white font-bold text-base mb-2">Who leads Stonenox?</h3>
                <p>Stonenox is led by Dileshwar Lahre as the Founder & CEO, driving innovation and digital transformation for startups and established enterprises.</p>
              </div>

              <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl">
                <h3 className="text-white font-bold text-base mb-2">Where is Stonenox based?</h3>
                <p>We are headquartered in Bilaspur, Chhattisgarh, delivering world-class IT and software solutions globally.</p>
              </div>
            </div>

            <div className="text-center mt-12 pt-8 border-t border-white/5 text-xs text-slate-500 font-medium">
              &copy; {new Date().getFullYear()} Stonenox. All rights reserved. Best Tech Company for Web & App Development.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}