"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import {
  PhoneIncoming,
  AudioLines,
  MessageSquareText,
  SlidersHorizontal,
  CalendarClock,
  ArrowRightLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { salesJourneySteps } from "@/data/content";
import { Reveal } from "@/components/ui";
import { VoiceWaveform } from "@/components/ui/VoiceWaveform";

function JourneyStageVisual({
  activeIdx,
  onPrev,
  onNext,
}: {
  activeIdx: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const step = salesJourneySteps[activeIdx];

  return (
    <div className="rounded-[22px] bg-[#F5F6F8] p-2 sm:p-2.5 border border-[#E6E8EC]">
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
        <div className="px-6 h-12 bg-[#FAFAFB] border-b border-[#EFEFF3] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-[12px] font-medium text-[#FF6428] shrink-0">
              Step {step.num} of 06
            </span>
            <span className="text-[#D1D5DB]">·</span>
            <span className="text-[13.5px] font-medium text-[#111111] truncate">
              {step.stateTitle}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={onPrev}
              disabled={activeIdx === 0}
              aria-label="Previous stage"
              className="w-7 h-7 rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F5F6F8] disabled:opacity-35 inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={activeIdx === salesJourneySteps.length - 1}
              aria-label="Next stage"
              className="w-7 h-7 rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F5F6F8] disabled:opacity-35 inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 min-h-[360px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="space-y-5"
            >
              {activeIdx === 0 && (
                <>
                  <div className="flex items-center justify-between pb-4 border-b border-[#F3F4F6]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#FFF4EF] text-[#FF6428] flex items-center justify-center">
                        <PhoneIncoming size={16} />
                      </div>
                      <div>
                        <p className="text-[14.5px] font-medium text-[#111111]">
                          New Lead Detected · Vikram Patel
                        </p>
                        <p className="text-[13px] text-[#6B7280]">
                          Assigned immediately to SARA outreach queue
                        </p>
                      </div>
                    </div>
                    <span className="text-[12px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                      Dialing
                    </span>
                  </div>
                  <div className="divide-y divide-[#F3F4F6]">
                    {[
                      { name: "Vikram Patel · TechVista Logistics", mode: "Inbound Call" },
                      { name: "Ananya Verma · Kestrel Commerce", mode: "Dormant Follow-Up" },
                      { name: "Kavita Nair · HarborCloud Systems", mode: "Outbound Qualification" },
                    ].map((row) => (
                      <div key={row.name} className="py-3 flex items-center justify-between text-[13.5px]">
                        <span className="font-medium text-[#111111]">{row.name}</span>
                        <span className="text-[#6B7280]">{row.mode}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeIdx === 1 && (
                <div className="space-y-5">
                  <div className="rounded-xl bg-[#F8F9FA] p-5 border border-[#EFEFF3]">
                    <div className="flex items-center justify-between mb-2 text-[12px] text-[#6B7280]">
                      <span className="inline-flex items-center gap-1.5 font-medium text-[#111111]">
                        <AudioLines size={14} className="text-[#FF6428]" />
                        Natural Voice Turn-Taking
                      </span>
                      <span>Live Call Audio</span>
                    </div>
                    <VoiceWaveform active speaker="sara" height={52} bars={42} dark={false} />
                  </div>
                  <div className="pl-4 border-l-2 border-[#FF6428] space-y-1">
                    <span className="text-[12px] font-medium text-[#FF6428]">SARA</span>
                    <p className="text-[14.5px] text-[#1F2937] leading-relaxed">
                      &ldquo;Hi Vikram — thanks for sharing your inquiry. Is now a quick minute to
                      understand what your sales team is looking to automate?&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {activeIdx === 2 && (
                <div className="space-y-5">
                  <div className="pl-4 border-l-2 border-[#D1D5DB]">
                    <span className="text-[12px] font-medium text-[#6B7280] inline-flex items-center gap-1.5">
                      <MessageSquareText size={13} />
                      Prospect Question
                    </span>
                    <p className="mt-1 text-[14.5px] font-medium text-[#111111]">
                      &ldquo;How does SARA share conversation details and requirements with our human sales team?&rdquo;
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-[#F3F4F6]">
                    {[
                      { k: "Primary Need", v: "Off-hours lead coverage" },
                      { k: "Team Size", v: "12 sales advisors" },
                      { k: "Workflow Goal", v: "Qualify & route to reps" },
                      { k: "Rollout Window", v: "Next few weeks" },
                    ].map((ent) => (
                      <div key={ent.k}>
                        <p className="text-[12px] text-[#6B7280]">{ent.k}</p>
                        <p className="text-[14px] font-medium text-[#111111] mt-0.5">{ent.v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeIdx === 3 && (
                <div className="space-y-5">
                  <div className="flex items-baseline justify-between pb-4 border-b border-[#F3F4F6]">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal size={15} className="text-[#FF6428]" />
                      <span className="text-[14.5px] font-medium text-[#111111]">
                        Structured Qualification Rubric
                      </span>
                    </div>
                    <span className="text-[24px] font-medium text-[#111111] tabular-nums">
                      88 <span className="text-[13px] text-[#9CA3AF]">/ 100</span>
                    </span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Requirement clarity", pct: 92 },
                      { label: "Workflow fit", pct: 86 },
                      { label: "Engagement timing", pct: 85 },
                    ].map((bar) => (
                      <div key={bar.label} className="space-y-1.5">
                        <div className="flex justify-between text-[13px]">
                          <span className="text-[#555961]">{bar.label}</span>
                          <span className="font-medium text-[#111111] tabular-nums">
                            {bar.pct}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[#EFEFF3] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#FF6428]"
                            style={{ width: `${bar.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeIdx === 4 && (
                <div className="space-y-5">
                  <div className="flex items-start gap-3.5 pb-4 border-b border-[#F3F4F6]">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <CalendarClock size={17} />
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-[#111111]">
                        Walkthrough Booked · Thursday 2:00 PM
                      </p>
                      <p className="text-[13px] text-[#6B7280]">
                        Calendar invite sent automatically · Reminder queued
                      </p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6 text-[13.5px]">
                    <div>
                      <p className="font-medium text-[#111111]">Ready Prospects</p>
                      <p className="text-[#6B7280] mt-1">
                        Confirmed meeting times directly during the voice conversation.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-[#111111]">Follow-Up Loop</p>
                      <p className="text-[#6B7280] mt-1">
                        Undecided and dormant inquiries receive scheduled check-ins automatically.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeIdx === 5 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
                    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-[#FF6428]">
                      <ArrowRightLeft size={14} />
                      Clean Human Rep Escalation
                    </span>
                    <span className="text-[12px] text-[#6B7280]">Context Attached</span>
                  </div>
                  <p className="text-[15px] font-medium text-[#111111]">
                    Vikram Patel · TechVista Logistics — Ready for Senior AE Walkthrough
                  </p>
                  <p className="text-[13.5px] text-[#555961] leading-relaxed">
                    Full transcript, discovered team size, off-hours inquiry need, and
                    booked Thursday slot delivered cleanly to the assigned sales rep.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2 text-[13px] text-[#111111]">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-[#FF6428]" />
                      Transcript synced
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-[#FF6428]" />
                      Score &amp; next step included
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 pt-4 border-t border-[#F3F4F6] flex flex-wrap items-center justify-between gap-3 text-[12px] text-[#8B909A]">
            <div className="flex items-center gap-6">
              {step.metrics.map((m) => (
                <span key={m.label}>
                  {m.label}: <strong className="font-medium text-[#111111]">{m.value}</strong>
                </span>
              ))}
            </div>
            <span>Illustrative workflow view</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(
      salesJourneySteps.length - 1,
      Math.max(0, Math.floor(latest * salesJourneySteps.length))
    );
    setActiveIdx(idx);
  });

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl mb-14 lg:mb-16">
          <h2 className="text-[clamp(28px,3.8vw,46px)] font-medium leading-[1.08] tracking-[-0.03em] text-[#111111]">
            One connected sales workflow, from first ring to handoff.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#555961]">
            Follow how SARA progresses every prospect through six connected stages while
            your workspace updates at each milestone.
          </p>
        </Reveal>

        {/* Mobile Interactive Pill Strip */}
        <div className="lg:hidden space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {salesJourneySteps.map((step, i) => {
              const active = i === activeIdx;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`shrink-0 px-3.5 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                    active
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-white text-[#555961] border-[#E5E7EB]"
                  }`}
                >
                  {step.shortLabel}
                </button>
              );
            })}
          </div>
          <div className="py-2">
            <h3 className="text-[18px] font-medium text-[#111111]">
              {salesJourneySteps[activeIdx].title}
            </h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-[#555961]">
              {salesJourneySteps[activeIdx].desc}
            </p>
          </div>
          <JourneyStageVisual
            activeIdx={activeIdx}
            onPrev={() => setActiveIdx((v) => Math.max(0, v - 1))}
            onNext={() =>
              setActiveIdx((v) => Math.min(salesJourneySteps.length - 1, v + 1))
            }
          />
        </div>

        {/* Desktop Calm Scroll-Linked Narrative + Sticky Stage */}
        <div
          ref={trackRef}
          className="hidden lg:grid lg:grid-cols-12 gap-14 items-start"
        >
          <div className="lg:col-span-5 relative pl-6 border-l border-[#EAECEF]">
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
              className="absolute left-[-1.5px] top-0 bottom-0 w-[2px] bg-[#FF6428] rounded-full"
            />

            <div className="divide-y divide-[#F3F4F6]">
              {salesJourneySteps.map((step, i) => {
                const active = i === activeIdx;
                return (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    onMouseEnter={() => setActiveIdx(i)}
                    className={`w-full text-left py-7 transition-opacity duration-200 cursor-pointer group ${
                      active ? "opacity-100" : "opacity-45 hover:opacity-80"
                    }`}
                  >
                    <h3 className="text-[19px] font-medium tracking-[-0.02em] text-[#111111] group-hover:text-[#FF6428] transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-[#555961]">
                      {step.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <JourneyStageVisual
              activeIdx={activeIdx}
              onPrev={() => setActiveIdx((v) => Math.max(0, v - 1))}
              onNext={() =>
                setActiveIdx((v) => Math.min(salesJourneySteps.length - 1, v + 1))
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
