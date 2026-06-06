import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen selection:bg-orange-600 selection:text-white">
      {/* 1. Navigation Bar */}
      <Navbar />

      {/* 2. Home Section (ID: home) */}
      <section id="home" className="scroll-mt-20">
        <Hero />
      </section>

      {/* 3. About Section (ID: founders ya about) */}
      <section id="about" className="scroll-mt-20">
        <About />
      </section>

      {/* 4. Services Section (ID: services) */}
      <section id="services" className="scroll-mt-20">
        <Services />
      </section>

      {/* 5. Contact Section (ID: contact) */}
      <section id="contact" className="scroll-mt-20">
        <Contact />
      </section>

      {/* Extra Space for Bottom Aesthetic */}
      <div className="bg-black py-10 text-center border-t border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">
          © 2026 Lahre IT Solutions • A Lahre Group Venture
        </p>
      </div>
    </main>
  );
}