"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowUpRight, Clock } from "lucide-react";
import { qaSandboxPrompts } from "@/data/content";
import { Reveal } from "@/components/ui";

const cadenceSteps = [
  {
    day: "Day 01",
    label: "Initial Discovery Call",
    detail:
      "SARA calls promptly after inquiry, answers initial questions, and logs buyer requirements.",
  },
  {
    day: "Day 03",
    label: "Context Check-In",
    detail:
      "Follows up referencing the specific product topic discussed on Day 01 — never generic templates.",
  },
  {
    day: "Day 12",
    label: "Dormant Re-engagement",
    detail:
      "Reaches back out naturally when timing reopens, reviving inactive pipeline leads automatically.",
  },
  {
    day: "Booked",
    label: "Meeting Confirmed",
    detail:
      "Prospect picks a calendar time and moves smoothly onto your sales team's calendar.",
  },
];

const qualificationProfiles = [
  {
    id: "ready",
    label: "Active Buyer",
    score: 91,
    fit: 94,
    clarity: 90,
    urgency: 88,
    verdict: "Book walkthrough / Escalate to rep",
  },
  {
    id: "evaluating",
    label: "Early Explorer",
    score: 68,
    fit: 78,
    clarity: 66,
    urgency: 58,
    verdict: "Schedule Day-3 follow-up call",
  },
  {
    id: "dormant",
    label: "Re-engaged Lead",
    score: 82,
    fit: 85,
    clarity: 84,
    urgency: 76,
    verdict: "Reactivated · Priority slot offered",
  },
];

const meetingSlots = [
  { day: "Thu", time: "11:00 AM" },
  { day: "Thu", time: "2:00 PM" },
  { day: "Fri", time: "10:30 AM" },
  { day: "Fri", time: "4:00 PM" },
];

export default function Features() {
  const [selectedQA, setSelectedQA] = useState(0);
  const [selectedCadence, setSelectedCadence] = useState(2);
  const [selectedProfile, setSelectedProfile] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(1);
  const [handoffAccepted, setHandoffAccepted] = useState(false);

  const activeQA = qaSandboxPrompts[selectedQA];
  const activeProfile = qualificationProfiles[selectedProfile];

  return (
    <section id="features" className="bg-[#F8F9FA] border-y border-[#EAECEF] py-24 lg:py-32">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 space-y-20 lg:space-y-24">
        <Reveal className="max-w-2xl">
          <h2 className="text-[clamp(28px,3.8vw,46px)] font-medium leading-[1.08] tracking-[-0.03em] text-[#111111]">
            Built around how sales conversations actually happen.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#555961]">
            Each capability below works interactively across conversations, qualification,
            follow-up loops, scheduling, and rep collaboration.
          </p>
        </Reveal>

        {/* Row 1: Open Architectural Split — Customer Q&A */}
        <Reveal className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-10 border-t border-[#E5E7EB]">
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-[24px] sm:text-[26px] font-medium tracking-[-0.02em] text-[#111111]">
              Natural customer conversations &amp; Q&amp;A
            </h3>
            <p className="text-[15px] leading-relaxed text-[#555961]">
              Select a common prospect question to preview how SARA responds thoughtfully
              without breaking conversational flow.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              {activeQA.signals.map((sig) => (
                <span
                  key={sig}
                  className="px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-[12px] text-[#374151]"
                >
                  {sig}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap gap-2">
              {qaSandboxPrompts.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedQA(idx)}
                  className={`text-left px-4 py-2 rounded-full text-[13px] font-medium border transition-colors cursor-pointer ${
                    selectedQA === idx
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-white text-[#555961] border-[#E5E7EB] hover:text-[#111111]"
                  }`}
                >
                  {item.question}
                </button>
              ))}
            </div>

            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-6 min-h-[120px] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[12px] text-[#8B909A] mb-2">
                <span className="font-medium text-[#FF6428]">SARA response preview</span>
                <span>Sample Q&amp;A</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeQA.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-[15px] leading-relaxed text-[#111111]"
                >
                  {activeQA.saraReply}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* Row 2: Calm Split — Qualification Fit & Automated Follow-Up Sequence */}
        <Reveal className="grid lg:grid-cols-12 gap-12 lg:gap-16 pt-12 border-t border-[#E5E7EB]">
          {/* Qualification Rubric */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h3 className="text-[24px] font-medium tracking-[-0.02em] text-[#111111]">
                Transparent lead qualification
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[#555961]">
                Compare buyer fit across call profiles to see how SARA prioritizes ready
                opportunities.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {qualificationProfiles.map((prof, idx) => (
                <button
                  key={prof.id}
                  type="button"
                  onClick={() => setSelectedProfile(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-colors cursor-pointer ${
                    selectedProfile === idx
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-white text-[#555961] border-[#E5E7EB] hover:text-[#111111]"
                  }`}
                >
                  {prof.label}
                </button>
              ))}
            </div>

            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-6 space-y-4">
              <div className="flex items-baseline justify-between pb-3 border-b border-[#F3F4F6]">
                <span className="text-[13.5px] text-[#6B7280]">{activeProfile.label} fit</span>
                <span className="text-[28px] font-medium text-[#111111] tabular-nums leading-none">
                  {activeProfile.score}
                  <span className="text-[13px] text-[#9CA3AF] ml-1">/ 100</span>
                </span>
              </div>

              {[
                { name: "Requirement fit", val: activeProfile.fit },
                { name: "Scope clarity", val: activeProfile.clarity },
                { name: "Timeline readiness", val: activeProfile.urgency },
              ].map((m) => (
                <div key={m.name} className="space-y-1.5">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#555961]">{m.name}</span>
                    <span className="font-medium text-[#111111] tabular-nums">{m.val}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#F3F4F6] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-[#FF6428]"
                      animate={{ width: `${m.val}%` }}
                      transition={{ type: "spring", stiffness: 150, damping: 24 }}
                    />
                  </div>
                </div>
              ))}

              <p className="pt-2 text-[13px] font-medium text-[#111111]">
                Next action: <span className="text-[#FF6428]">{activeProfile.verdict}</span>
              </p>
            </div>
          </div>

          {/* Follow-up & Re-engagement Cadence */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h3 className="text-[24px] font-medium tracking-[-0.02em] text-[#111111]">
                Follow-ups &amp; dormant lead re-engagement
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[#555961]">
                Select any milestone along the outreach loop to inspect how SARA follows up
                automatically without manual rep tracking.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-[#E5E7EB] divide-y divide-[#F3F4F6] overflow-hidden">
              {cadenceSteps.map((step, idx) => {
                const active = idx === selectedCadence;
                return (
                  <button
                    key={step.day}
                    type="button"
                    onClick={() => setSelectedCadence(idx)}
                    className={`w-full text-left p-4 sm:p-5 transition-colors cursor-pointer flex items-start gap-4 ${
                      active ? "bg-[#FAFAFB]" : "hover:bg-[#FAFAFB]"
                    }`}
                  >
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-[12px] font-medium ${
                        active
                          ? "bg-[#FF6428] text-white"
                          : "bg-[#F3F4F6] text-[#555961]"
                      }`}
                    >
                      {step.day}
                    </span>
                    <div>
                      <p className="text-[14.5px] font-medium text-[#111111]">
                        {step.label}
                      </p>
                      <p className="mt-1 text-[13px] text-[#6B7280] leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Row 3: Scheduling & Human Collaboration */}
        <Reveal className="grid lg:grid-cols-12 gap-12 lg:gap-16 pt-12 border-t border-[#E5E7EB]">
          {/* Calendar Slot Selection */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <h3 className="text-[24px] font-medium tracking-[-0.02em] text-[#111111]">
                Instant meeting scheduling
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[#555961]">
                When a buyer is ready, SARA checks available windows and confirms the
                booking immediately.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-5 space-y-4">
              <div className="flex items-center justify-between text-[12px] text-[#6B7280]">
                <span>Select a sample slot</span>
                <Clock size={13} />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {meetingSlots.map((slot, idx) => {
                  const chosen = idx === selectedSlot;
                  return (
                    <button
                      key={`${slot.day}-${slot.time}`}
                      type="button"
                      onClick={() => setSelectedSlot(idx)}
                      className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                        chosen
                          ? "bg-[#111111] text-white border-[#111111]"
                          : "bg-[#F8F9FA] text-[#111111] border-[#E5E7EB] hover:border-[#FF6428]"
                      }`}
                    >
                      <span
                        className={`text-[11.5px] block ${
                          chosen ? "text-white/70" : "text-[#6B7280]"
                        }`}
                      >
                        {slot.day}
                      </span>
                      <span className="text-[14px] font-medium">{slot.time}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[13px] font-medium text-emerald-700">
                Booked: {meetingSlots[selectedSlot].day} at {meetingSlots[selectedSlot].time}
              </p>
            </div>
          </div>

          {/* Human Escalation Transfer */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <h3 className="text-[24px] font-medium tracking-[-0.02em] text-[#111111]">
                Seamless human handoff
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[#555961]">
                High-priority or nuanced buyer conversations transfer directly to your reps
                with transcript notes and qualification score ready to review.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-[#E5E7EB] p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#F3F4F6]">
                <div>
                  <p className="text-[15px] font-medium text-[#111111]">
                    Rohan Deshmukh · Meridian FinServe
                  </p>
                  <p className="text-[13px] text-[#6B7280]">
                    Requested senior rep review for multi-region rollout rules
                  </p>
                </div>
                <span className="text-[13px] font-medium text-[#FF6428]">
                  Score 94 / 100
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-[13.5px]">
                <div>
                  <span className="text-[12px] text-[#6B7280] block">Suggested opener</span>
                  <p className="text-[#111111] mt-1">
                    &ldquo;Hi Rohan — I reviewed SARA&apos;s notes on your regional routing requirements.&rdquo;
                  </p>
                </div>
                <div>
                  <span className="text-[12px] text-[#6B7280] block">Context attached</span>
                  <p className="text-[#555961] mt-1">
                    Full call transcript, captured timeline, and priority classification.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setHandoffAccepted((v) => !v)}
                  className={`h-10 px-5 rounded-full text-[13px] font-medium transition-colors cursor-pointer inline-flex items-center gap-2 ${
                    handoffAccepted
                      ? "bg-emerald-600 text-white"
                      : "bg-[#111111] text-white hover:bg-[#FF6428]"
                  }`}
                >
                  <Check size={14} />
                  <span>
                    {handoffAccepted ? "Handoff Claimed (Demo)" : "Simulate Rep Claim"}
                  </span>
                </button>
                <a
                  href="#dashboard"
                  className="inline-flex items-center gap-1 text-[13px] font-medium text-[#111111] hover:text-[#FF6428] transition-colors"
                >
                  Inspect inside Workspace
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
