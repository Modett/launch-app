"use client";

import { useState } from "react";

const API_URL =
  process.env.WAITLIST_API_URL || "https://launch-app-536c.vercel.app";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Thank you! You've been added to the waitlist.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(
          data.error ||
            `Error ${res.status}: Something went wrong. Please try again.`,
        );
        console.error("API Error:", { status: res.status, error: data });
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to connect to the server.",
      );
      console.error("Waitlist submission error:", error);
    }
  };

  return (
    <div className="w-[348px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col"
        style={{ gap: "12px" }}
      >
        <input
          type="email"
          required
          placeholder="Enter e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[54px] bg-white border border-[#3E5460] text-gray-800 focus:outline-none focus:border-[#3E5460] transition-colors box-border"
          style={{
            width: "348px",
            fontSize: "14px",
            lineHeight: "24px",
            fontWeight: 400,
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full h-[54px] bg-[#3E5460] hover:bg-[#2D3F4A] font-medium uppercase transition-all disabled:opacity-60 disabled:cursor-not-allowed box-border border-0"
          style={{
            width: "348px",
            fontSize: "14px",
            lineHeight: "24px",
            letterSpacing: "3px",
            color: "#FFFFFF",
            border: "none",
            outline: "none",
          }}
        >
          {status === "loading" ? "JOINING..." : "JOIN THE WAITLIST"}
        </button>
      </form>

      {message && (
        <p
          className={`text-center text-sm ${status === "success" ? "text-green-700" : "text-red-700"}`}
          style={{ marginTop: "12px" }}
        >
          {message}
        </p>
      )}

      <p
        className="text-center text-xs text-gray-600 leading-relaxed"
        style={{ marginTop: "16px", width: "350px" }}
      >
        By subscribing, you agree to our privacy policy and terms of service
      </p>
    </div>
  );
}
