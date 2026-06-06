"use client";

import { useState } from "react";
import Spline from "@splinetool/react-spline";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import SupportChat from "./chat/SupportChat";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white font-sans selection:bg-cyan-500 selection:text-black">

      {/* 1. DESKTOP SOCIAL BAR */}
      <div className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-10 md:flex">
        <FaLinkedinIn className="cursor-pointer text-2xl text-white transition duration-300 hover:scale-125 hover:text-cyan-400" />
        <FaTwitter className="cursor-pointer text-2xl text-white transition duration-300 hover:scale-125 hover:text-cyan-400" />
        <FaInstagram className="cursor-pointer text-2xl text-white transition duration-300 hover:scale-125 hover:text-pink-500" />
        <FaFacebookF className="cursor-pointer text-2xl text-white transition duration-300 hover:scale-125 hover:text-blue-500" />
        <div className="h-24 w-[1px] bg-white/30" />
      </div>

      {/* 2. MOBILE SOCIAL BAR */}
      <div className="absolute left-6 top-[24%] z-30 flex flex-col items-center gap-6 md:hidden">
        <FaLinkedinIn className="text-xl text-white hover:text-cyan-400 transition" />
        <FaTwitter className="text-xl text-white hover:text-cyan-400 transition" />
        <FaInstagram className="text-xl text-white hover:text-pink-500 transition" />
        <FaFacebookF className="text-xl text-white hover:text-blue-500 transition" />
      </div>

      {/* 3. TOP RIGHT ACTION ACCENT */}
      <div className="absolute right-6 top-6 z-30 flex items-center gap-6">
        <button className="text-lg font-medium text-white transition hover:text-cyan-400">
          Let’s Start
        </button>

        <div className="flex cursor-pointer flex-col gap-1 group">
          <span className="h-[2px] w-8 bg-white group-hover:bg-cyan-400 transition" />
          <span className="h-[2px] w-8 bg-white group-hover:bg-cyan-400 transition" />
          <span className="h-[2px] w-8 bg-white group-hover:bg-cyan-400 transition" />
        </div>
      </div>

      {/* 4. DESKTOP MODEL */}
      <div className="absolute right-[2%] top-[58%] -translate-y-1/2 z-20 hidden md:flex h-[750px] w-[750px] max-w-[45vw] items-center justify-center overflow-visible">

        <div className="relative w-full h-full flex items-center justify-center overflow-visible">

          {/* AI TALKING TEXT */}
          <div className="absolute right-16 top-36 z-50 animate-pulse pointer-events-none">

            <span className="rounded-full border border-cyan-400/20 bg-white/5 px-5 py-3 text-sm tracking-wide text-cyan-300 backdrop-blur-xl">
              any qna • double click
            </span>

          </div>

          {/* DOUBLE CLICK LAYER */}
          <div
            onDoubleClick={() => setChatOpen(true)}
            className="absolute inset-0 z-40 cursor-pointer"
          />

          {/* SPLINE MODEL */}
          <Spline
            scene="https://prod.spline.design/wp1uEIxK9qdr8hip/scene.splinecode"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />

        </div>

      </div>

      {/* 5. MAIN CONTENT */}
      <div className="relative z-10 mx-auto flex flex-col md:flex-row min-h-screen max-w-7xl px-6 md:px-10">

        {/* MOBILE MODEL */}
        <div className="w-full aspect-square max-w-[500px] sm:max-w-[550px] relative mt-28 mx-auto flex items-center justify-center md:hidden z-0 pl-20 overflow-visible">

          <div className="w-[135%] h-[135%] absolute top-0 left-0 flex items-center justify-center scale-135 overflow-visible">

            <Spline
              scene="https://prod.spline.design/wp1uEIxK9qdr8hip/scene.splinecode"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />

          </div>

        </div>

        {/* CONTENT BLOCK */}
        <section className="w-full max-w-2xl flex items-center pt-24 pb-20 md:pb-0 md:pt-24 min-h-[40vh] md:min-h-screen text-center md:text-left">

          <div className="w-full">

            {/* TAG */}
            <div className="mb-6 flex items-center justify-center gap-3 md:justify-start">

              <div className="h-[1px] w-12 bg-white" />

              <span className="text-lg font-semibold text-white tracking-wide">
                Innovation
              </span>

            </div>

            {/* HEADING */}
            <h1 className="text-4xl font-extrabold leading-tight md:text-7xl tracking-tight">

              Scale Your <br />

              <span className="font-light text-white block mt-1 md:inline md:mt-0">
                Business Digitally.
              </span>

            </h1>

            {/* PARAGRAPH */}
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-300 md:mx-0 md:mt-8 md:text-lg md:leading-8">

              Stonenox AI helps brands grow faster with intelligent automation,
              creative digital experiences, and high-performing marketing
              systems built for modern businesses.

            </p>

            {/* BUTTON */}
            <div className="mt-8 flex justify-center md:justify-start">

              <button className="group flex items-center gap-4 rounded-full bg-white/10 px-5 py-4 backdrop-blur-md transition duration-300 hover:bg-white/20 active:scale-98">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-black transition-transform duration-500 group-hover:rotate-45">
                  ↗
                </div>

                <span className="text-lg font-semibold text-white">
                  Start Building
                </span>

              </button>

            </div>

          </div>

        </section>

      </div>

      {/* SUPPORT CHAT */}
      {chatOpen && (
        <SupportChat onClose={() => setChatOpen(false)} />
      )}

    </main>
  );
}