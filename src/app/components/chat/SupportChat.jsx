"use client";

import { useEffect, useRef, useState } from "react";

export default function SupportChat({ onClose }) {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "👋 Hi! How can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // AUTO SCROLL
  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);

  // SMART HUMAN-CONTACT DETECTOR
  const shouldShowButtons = (userText, aiText) => {

    const triggerWords = [
      "price",
      "pricing",
      "cost",
      "budget",
      "quote",
      "payment",
      "plan",
      "package",
      "hire",
      "contact",
      "call",
      "consultation",
      "meeting",
      "talk",
      "discuss",
      "custom",
      "project",
      "service",
      "agency",
      "need help",
      "confused",
      "not understand",
      "support",
      "demo",
      "team",
      "work with you",
      "start project",
    ];

    const text =
      `${userText} ${aiText}`.toLowerCase();

    return triggerWords.some((word) =>
      text.includes(word)
    );
  };

  // SEND MESSAGE
  const handleSend = async () => {

    if (!message.trim()) return;

    const currentMessage = message;

    // USER MESSAGE
    const userMessage = {
      role: "user",
      text: currentMessage,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setMessage("");

    setLoading(true);

    try {

      const res = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: currentMessage,
        }),
      });

      const data = await res.json();

      // AI MESSAGE
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data.reply || "No response",
          userQuery: currentMessage,
        },
      ]);

    } catch (error) {

      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "❌ Something went wrong",
          userQuery: currentMessage,
        },
      ]);

    }

    setLoading(false);
  };

  return (
    <div className="fixed right-6 top-[58%] z-[999999] w-[340px] -translate-y-1/2 overflow-hidden rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.08)]">

      {/* TOP */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">

        <div>
          <h2 className="text-base font-semibold tracking-wide text-white">
            Stonenox AI
          </h2>

          <p className="text-xs text-gray-400">
            Ask anything
          </p>
        </div>

        <button
          onClick={onClose}
          className="rounded-full bg-white/5 px-2.5 py-1.5 text-sm text-white transition hover:bg-white/10"
        >
          ✕
        </button>

      </div>

      {/* CHAT */}
      <div className="h-[360px] overflow-y-auto px-4 py-4 space-y-4">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm backdrop-blur-md ${
                msg.role === "user"
                  ? "bg-cyan-400 text-black"
                  : "border border-white/10 bg-white/5 text-white"
              }`}
            >

              {/* MESSAGE */}
              <p className="leading-6 whitespace-pre-line">
                {msg.text}
              </p>

              {/* SMART HUMAN CTA */}
              {msg.role === "ai" &&
                index !== 0 &&
                shouldShowButtons(
                  msg.userQuery || "",
                  msg.text
                ) && (

                <div className="mt-4">

                  <p className="mb-3 text-xs text-gray-400">
                    For detailed discussion connect with our team 👇
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {/* CALL */}
                    <a
                      href="tel:9131460470"
                      className="rounded-full border border-cyan-400 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
                    >
                      📞 Call
                    </a>

                    {/* WHATSAPP */}
                    <a
                      href="https://wa.me/919131460470?text=Hi%20I%20want%20to%20discuss%20my%20project"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-green-400 bg-green-400/10 px-4 py-2 text-xs font-semibold text-green-300 transition hover:bg-green-400 hover:text-black"
                    >
                      💬 WhatsApp
                    </a>

                  </div>

                </div>

              )}

            </div>

          </div>

        ))}

        {/* LOADING */}
        {loading && (

          <div className="flex justify-start">

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">

              Typing...

            </div>

          </div>

        )}

        <div ref={chatEndRef} />

      </div>

      {/* INPUT */}
      <div className="border-t border-white/10 p-3">

        <div className="flex items-center gap-2">

          <input
            type="text"

            value={message}

            onChange={(e) =>
              setMessage(e.target.value)
            }

            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}

            placeholder="Ask anything..."

            className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-gray-500"
          />

          <button
            onClick={handleSend}
            className="rounded-2xl bg-cyan-400 px-4 py-2 text-sm font-medium text-black transition hover:bg-cyan-300"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}