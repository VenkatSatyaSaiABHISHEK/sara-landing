"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  MessageSquare,
  CalendarCheck,
  Sparkles,
  UserCheck,
  Mic,
  Volume2,
  PhoneOff,
  Check,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { VoiceWaveform } from "@/components/ui/VoiceWaveform";

const countryCodes = [
  { label: "IN", code: "+91" },
  { label: "US", code: "+1" },
  { label: "UK", code: "+44" },
  { label: "AE", code: "+971" },
];

const demoDialogueStages = [
  {
    speaker: "sara" as const,
    time: "00:07",
    line: "Hi there, this is SARA calling regarding your inquiry. Are you looking to automate inbound lead qualification?",
    stage: "Connecting & Qualifying",
    stepProgress: 1,
    score: 64,
  },
  {
    speaker: "prospect" as const,
    time: "00:19",
    line: "Yes — we get inquiries outside office hours and want an AI sales agent that answers questions and books demos.",
    stage: "Understanding Requirements",
    stepProgress: 2,
    score: 84,
  },
  {
    speaker: "sara" as const,
    time: "00:34",
    line: "Got it. Let's lock a quick walkthrough for Thursday at 2:00 PM and pass your notes straight to our team.",
    stage: "Meeting Booked · Thu 2:00 PM",
    stepProgress: 3,
    score: 92,
  },
];

function formatCallTime(seconds: number) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function HeroSection() {
  const [countryIdx, setCountryIdx] = useState(0);
  const [phoneInput, setPhoneInput] = useState("");
  const [callState, setCallState] = useState<"active" | "dialing" | "ended">("active");
  const [stageIdx, setStageIdx] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(7);
  const [dialedDisplay, setDialedDisplay] = useState("Vikram Patel (Demo)");
  const [mobileView, setMobileView] = useState<"phone" | "chat" | "web">("phone");

  useEffect(() => {
    if (callState !== "active") return;
    const tick = window.setInterval(() => {
      setSecondsElapsed((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(tick);
  }, [callState]);

  useEffect(() => {
    if (callState !== "active") return;
    const cycle = window.setInterval(() => {
      setStageIdx((i) => (i + 1) % demoDialogueStages.length);
    }, 4200);
    return () => window.clearInterval(cycle);
  }, [callState]);

  const handleTryCall = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phoneInput.trim();
    const target = cleaned
      ? `${countryCodes[countryIdx].code} ${cleaned}`
      : "Sample Demo Call";
    setDialedDisplay(target);
    setCallState("dialing");
    setSecondsElapsed(0);
    setStageIdx(0);
    window.setTimeout(() => {
      setCallState("active");
      setSecondsElapsed(4);
    }, 950);
  };

  const currentStage = demoDialogueStages[stageIdx];

  return (
    <section className="relative pt-[84px] sm:pt-[96px] bg-white overflow-x-clip">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-6 sm:pt-10 pb-0">
        {/* Top Centered Cluster — Signature Ringg / Enterprise Voice Agent Mark */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center text-center"
        >
          {/* Fanned Tactile App Icon Cluster */}
          <div className="flex items-center justify-center -space-x-2 mb-6 select-none">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white shadow-md flex items-center justify-center -rotate-12 border-2 border-white">
              <MessageSquare size={17} />
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F3F4F6] text-[#111111] shadow-md flex items-center justify-center -rotate-6 border-2 border-white">
              <CalendarCheck size={17} />
            </div>
            <div className="relative z-10 w-12 h-12 rounded-2xl bg-[#111111] text-white shadow-lg flex items-center justify-center border-2 border-white">
              <svg
                width="22"
                height="22"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 14H9L11.5 8L14.5 20L17 11L19.5 14H22"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="22.5" cy="9" r="2" fill="#FF6428" />
              </svg>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#FFF4EF] text-[#FF6428] shadow-md flex items-center justify-center rotate-6 border-2 border-white">
              <Sparkles size={17} />
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#FF6428] text-white shadow-md flex items-center justify-center rotate-12 border-2 border-white">
              <Phone size={17} />
            </div>
          </div>

          {/* Calm Serene Centered Display Headline */}
          <h1 className="max-w-4xl text-[clamp(34px,4.2vw,52px)] font-normal tracking-[-0.03em] leading-[1.08] text-[#111111]">
            Your AI Sales Team.{" "}
            <span className="text-[#FF6428] whitespace-nowrap">Always Ready.</span>
          </h1>

          <p className="mt-4 max-w-xl text-[16px] sm:text-[18px] font-normal leading-[1.55] text-[#6B7280]">
            Engage prospects, conduct natural voice calls, qualify leads, and book meetings
            — automatically around the clock.
          </p>

          {/* Signature Hero Try-Out Pill Bar */}
          <form
            onSubmit={handleTryCall}
            className="mt-7 w-full max-w-[440px] flex items-center h-[54px] rounded-full border border-[#E5E7EB] bg-white p-1.5 pl-4 shadow-[0_14px_40px_-10px_rgba(255,100,40,0.14)] focus-within:border-[#111111] transition-colors"
          >
            <button
              type="button"
              onClick={() => setCountryIdx((c) => (c + 1) % countryCodes.length)}
              className="inline-flex items-center gap-1 pr-2.5 mr-2 border-r border-[#E5E7EB] text-[13px] text-[#111111] shrink-0 cursor-pointer"
              title="Switch country code"
            >
              <span className="text-[11px] font-mono text-[#6B7280] bg-[#F3F4F6] px-1.5 py-0.5 rounded">
                {countryCodes[countryIdx].label}
              </span>
              <span className="text-[13px] font-medium text-[#111111]">
                {countryCodes[countryIdx].code}
              </span>
              <ChevronDown size={12} className="text-[#9CA3AF]" />
            </button>

            <input
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="Phone Number"
              aria-label="Enter phone number to preview a demo call"
              className="flex-1 min-w-0 bg-transparent text-[14.5px] text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none"
            />

            <button
              type="submit"
              className="h-full shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 rounded-full bg-[#111111] text-white text-[13.5px] font-medium hover:bg-[#FF6428] transition-colors cursor-pointer"
            >
              <Phone size={14} />
              <span>{callState === "dialing" ? "Calling..." : "Try an agent"}</span>
            </button>
          </form>

          {/* Subtle Truthful Companion Actions */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12.5px] text-[#6B7280]">
            <span>Triggers interactive demo below</span>
            <span className="text-[#D1D5DB]">·</span>
            <a
              href="https://sara.saadhyam.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[#111111] hover:text-[#FF6428] transition-colors"
            >
              Place live call on Saadhyam
              <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>

        {/* Mobile Device Switcher (visible < md so phones showcase clean uncrowded views) */}
        <div className="md:hidden mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#F3F4F6] border border-[#E5E7EB]">
            {(
              [
                { k: "phone", label: "Voice Call" },
                { k: "chat", label: "Follow-up" },
                { k: "web", label: "CRM Sync" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.k}
                type="button"
                onClick={() => setMobileView(tab.k)}
                className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium transition-colors ${
                  mobileView === tab.k
                    ? "bg-[#111111] text-white"
                    : "text-[#555961]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lower Centerpiece — Multi-Device Mockup Stage with Soft Bottom Fade */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8 md:mt-12 mx-auto max-w-[1080px]"
          style={{
            maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
          }}
        >
          <div className="relative flex flex-col md:flex-row items-center md:items-end justify-center gap-6 md:gap-0 pt-4 pb-6">
            {/* LEFT DEVICE: Light iPhone — Follow-Up & Calendar Recap */}
            <div
              className={`${
                mobileView === "chat" ? "block" : "hidden md:block"
              } md:relative md:z-10 md:-mr-10 md:mb-0 w-[290px] sm:w-[270px] rounded-[38px] bg-[#1F2937] p-[7px] shadow-[0_24px_60px_-15px_rgba(17,17,17,0.22)]`}
            >
              <div className="rounded-[31px] bg-white overflow-hidden h-[380px] flex flex-col">
                {/* Dynamic Island & Status */}
                <div className="px-5 pt-3 pb-2 flex items-center justify-between text-[11px] font-medium text-[#111111]">
                  <span>9:41</span>
                  <span className="w-16 h-4 rounded-full bg-[#111111]" />
                  <span>5G</span>
                </div>
                <div className="px-4 py-2.5 border-b border-[#F3F4F6] flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center text-[11px] font-bold">
                    S
                  </div>
                  <div>
                    <p className="text-[12.5px] font-semibold text-[#111111] leading-none">
                      SARA Follow-Up
                    </p>
                    <p className="text-[10.5px] text-emerald-600 mt-0.5">
                      Automated recap
                    </p>
                  </div>
                </div>

                <div className="p-3.5 space-y-2.5 bg-[#FAFAFB] flex-1 text-[11.5px]">
                  <div className="bg-white border border-[#E5E7EB] rounded-2xl rounded-tl-sm p-3 text-[#1F2937] shadow-2xs">
                    Hi! Thanks for speaking with me. Here is your confirmed walkthrough
                    with our team for Thursday at 2:00 PM.
                  </div>
                  <div className="ml-auto max-w-[85%] bg-[#111111] text-white rounded-2xl rounded-tr-sm p-3">
                    Sounds great — looking forward to the walkthrough.
                  </div>
                  <div className="rounded-xl bg-[#FFF4EF] border border-[#FF6428]/25 p-2.5 flex items-center gap-2 text-[#111111]">
                    <CalendarCheck size={14} className="text-[#FF6428] shrink-0" />
                    <span className="font-medium text-[11px]">
                      Calendar invite synced
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER DEVICE: Obsidian iPhone Pro — Active Voice Agent Call */}
            <div
              className={`${
                mobileView === "phone" ? "block" : "hidden md:block"
              } relative z-30 w-[300px] sm:w-[285px] rounded-[42px] bg-[#18181B] p-[8px] shadow-[0_32px_80px_-16px_rgba(17,17,17,0.42)]`}
            >
              <div className="rounded-[34px] bg-[#0B0C10] text-white overflow-hidden h-[430px] flex flex-col justify-between p-5">
                {/* Status + Dynamic Island */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-white/75 mb-5">
                    <span>9:41</span>
                    <span className="w-20 h-5 rounded-full bg-black border border-white/10" />
                    <span>LTE</span>
                  </div>

                  <div className="text-center space-y-1">
                    <p className="text-[12px] text-[#FF6428] font-medium tabular-nums">
                      {callState === "dialing"
                        ? "Dialing Demo..."
                        : callState === "ended"
                        ? "Call Ended"
                        : formatCallTime(secondsElapsed)}
                    </p>
                    <h2 className="text-[20px] font-medium tracking-tight text-white">
                      SARA AI
                    </h2>
                    <p className="text-[12px] text-white/55 truncate">{dialedDisplay}</p>
                  </div>
                </div>

                {/* Live Voice Waveform Inside Phone Screen */}
                <div className="space-y-3 my-2">
                  <div className="px-2 py-3 rounded-2xl bg-white/[0.04] border border-white/10">
                    <VoiceWaveform
                      active={callState === "active"}
                      speaker={callState === "active" ? currentStage.speaker : "idle"}
                      height={46}
                      bars={34}
                      dark
                    />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentStage.line}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-center text-[11.5px] leading-relaxed text-white/75 px-1 line-clamp-3 min-h-[52px]"
                    >
                      &ldquo;{currentStage.line}&rdquo;
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Tactile Call Control Buttons */}
                <div className="flex items-center justify-center gap-4 pb-1">
                  <button
                    type="button"
                    onClick={() => setCallState("active")}
                    aria-label="Microphone toggle"
                    className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Mic size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setStageIdx((s) => (s + 1) % demoDialogueStages.length)}
                    aria-label="Switch speaker turn"
                    className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Volume2 size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCallState((c) => (c === "ended" ? "active" : "ended"))
                    }
                    aria-label="Toggle call state"
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                      callState === "ended"
                        ? "bg-emerald-500 text-white"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    {callState === "ended" ? <Phone size={16} /> : <PhoneOff size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT DEVICE: Large Desktop Web Application Window */}
            <div
              className={`${
                mobileView === "web" ? "block" : "hidden md:block"
              } md:relative md:z-20 md:-ml-10 w-full max-w-[330px] sm:max-w-[490px] rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_24px_64px_-18px_rgba(17,17,17,0.16)] overflow-hidden`}
            >
              {/* Browser Window Chrome */}
              <div className="h-9 px-4 border-b border-[#EFEFF3] bg-[#FAFAFB] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB]" />
                </div>
                <span className="text-[11px] text-[#8B909A]">sara.saadhyam.com</span>
                <span className="text-[10.5px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Demo
                </span>
              </div>

              {/* Clean Enterprise Qualification Flow View */}
              <div className="p-6 sm:p-8 md:pl-16 h-[350px] flex flex-col justify-between bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[12px] text-[#6B7280]">Live qualification status</p>
                    <h3 className="text-[19px] font-medium text-[#111111] tracking-tight mt-0.5">
                      {currentStage.stage}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[28px] font-medium text-[#111111] tabular-nums leading-none">
                      {currentStage.score}
                    </span>
                    <span className="text-[12px] text-[#9CA3AF] ml-0.5">/100</span>
                  </div>
                </div>

                {/* Progress Milestones Synced to Live Call */}
                <div className="space-y-3 my-2">
                  {[
                    {
                      label: "Engaged lead via natural voice call",
                      done: currentStage.stepProgress >= 1,
                    },
                    {
                      label: "Captured inbound coverage requirement",
                      done: currentStage.stepProgress >= 2,
                    },
                    {
                      label: "Booked walkthrough & prepared rep summary",
                      done: currentStage.stepProgress >= 3,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl bg-[#FAFAFB] border border-[#EFEFF3]"
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          item.done
                            ? "bg-[#FF6428] text-white"
                            : "bg-[#E5E7EB] text-transparent"
                        }`}
                      >
                        <Check size={11} strokeWidth={2.5} />
                      </span>
                      <span
                        className={`text-[13px] ${
                          item.done ? "text-[#111111] font-medium" : "text-[#9CA3AF]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6]">
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-[#6B7280]">
                    <UserCheck size={14} className="text-[#FF6428]" />
                    Human escalation ready
                  </span>
                  <a
                    href="#product"
                    className="px-3.5 py-1.5 rounded-full bg-[#FF6428] text-white text-[12px] font-medium hover:bg-[#E55219] transition-colors"
                  >
                    Inspect Full Call →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
