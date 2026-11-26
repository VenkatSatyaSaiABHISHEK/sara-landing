"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  CheckCircle2,
  CalendarCheck,
  UserPlus,
  RefreshCcw,
  Phone,
  MessageSquarePlus,
} from "lucide-react";
import { callScenarios, type CallScenario, type CallTurn } from "@/data/content";
import { Reveal } from "@/components/ui";
import { VoiceWaveform } from "@/components/ui/VoiceWaveform";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { TextEffect } from "@/components/ui/TextEffect";

interface MidCallBranch {
  id: string;
  chipLabel: string;
  prospectText: string;
  saraResponse: string;
  capturedNote: string;
  scoreBoost: number;
}

const midCallBranches: MidCallBranch[] = [
  {
    id: "branch-onboarding",
    chipLabel: "Ask: Onboarding effort",
    prospectText: "How much internal setup does our team need before launching SARA?",
    saraResponse:
      "Saadhyam configures your call script, qualification rubric, and handoff rules with your team directly during onboarding.",
    capturedNote: "Addressed guided onboarding setup",
    scoreBoost: 4,
  },
  {
    id: "branch-handoff",
    chipLabel: "Ask: Human escalation",
    prospectText: "Can a human rep step in if a buyer has custom commercial terms?",
    saraResponse:
      "Yes — I summarize everything covered so far and escalate the conversation directly to your human rep with the full transcript attached.",
    capturedNote: "Confirmed human rep handoff rule",
    scoreBoost: 5,
  },
  {
    id: "branch-followup",
    chipLabel: "Test: Busy right now",
    prospectText: "I'm stepping into a meeting now — can we pick this up later?",
    saraResponse:
      "Absolutely. I have logged your requirements and scheduled an automated follow-up so you never need to repeat earlier details.",
    capturedNote: "Queued follow-up cadence cleanly",
    scoreBoost: 2,
  },
];

export default function ProductDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });

  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);
  const [userPaused, setUserPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 2>(1);
  const [mobilePane, setMobilePane] = useState<"call" | "intelligence">("call");
  const [injectedBranches, setInjectedBranches] = useState<MidCallBranch[]>([]);

  const scenario: CallScenario = callScenarios[scenarioIdx];
  const baseTurns = scenario.turns.slice(0, visibleCount);

  const injectedTurns: CallTurn[] = injectedBranches.flatMap((b, i) => {
    const baseScore = baseTurns[baseTurns.length - 1]?.scoreAfter ?? 75;
    return [
      {
        id: `${b.id}-p-${i}`,
        speaker: "prospect" as const,
        speakerName: scenario.prospect.name.split(" ")[0],
        timestamp: "Live",
        text: b.prospectText,
        scoreAfter: Math.min(98, baseScore + 1),
        sentiment: "Engaged" as const,
        capturedItems: [b.capturedNote],
      },
      {
        id: `${b.id}-s-${i}`,
        speaker: "sara" as const,
        speakerName: "SARA",
        timestamp: "Live",
        text: b.saraResponse,
        actionTag: "Handled Query",
        scoreAfter: Math.min(99, baseScore + b.scoreBoost),
        sentiment: "High Intent" as const,
        capturedItems: [b.capturedNote],
      },
    ];
  });

  const allShownTurns = [...baseTurns, ...injectedTurns];
  const activeTurn = allShownTurns[allShownTurns.length - 1] ?? scenario.turns[0];
  const mergedCaptured = Array.from(
    new Set([
      ...(baseTurns[baseTurns.length - 1]?.capturedItems ?? []),
      ...injectedBranches.map((b) => b.capturedNote),
    ])
  );

  const isComplete = visibleCount >= scenario.turns.length;
  const isPlaying = inView && !userPaused && !isComplete;

  useEffect(() => {
    if (!isPlaying) return;
    const delay = speedMultiplier === 2 ? 1600 : 3100;
    const timer = window.setTimeout(() => {
      setVisibleCount((c) => Math.min(scenario.turns.length, c + 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [isPlaying, visibleCount, scenario.turns.length, speedMultiplier]);

  const handleSelectScenario = (idx: number) => {
    setScenarioIdx(idx);
    setVisibleCount(2);
    setInjectedBranches([]);
    setUserPaused(false);
  };

  const handleRestart = () => {
    setVisibleCount(1);
    setInjectedBranches([]);
    setUserPaused(false);
  };

  const handleNextTurn = () => {
    if (isComplete) handleRestart();
    else setVisibleCount((c) => Math.min(scenario.turns.length, c + 1));
  };

  const handleInjectBranch = (branch: MidCallBranch) => {
    if (injectedBranches.some((b) => b.id === branch.id)) return;
    setInjectedBranches((prev) => [...prev, branch]);
    setUserPaused(true);
  };

  const OutcomeIcon =
    scenario.outcomeType === "meeting"
      ? CalendarCheck
      : scenario.outcomeType === "reengaged"
      ? RefreshCcw
      : UserPlus;

  return (
    <section
      ref={sectionRef}
      id="product"
      className="py-24 lg:py-32 bg-[#F8F9FA] border-y border-[#EAECEF]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Clean Editorial Heading */}
        <Reveal className="max-w-2xl mb-12">
          <h2 className="text-[clamp(28px,3.8vw,46px)] font-medium leading-[1.08] tracking-[-0.03em] text-[#111111]">
            Listen to SARA guide a live conversation.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#555961]">
            Switch between scripted demo calls or ask a mid-call question below to watch
            how SARA handles inquiries, qualifies fit, and sets next steps.
          </p>
        </Reveal>

        {/* Scenario Selector + Playback Bar */}
        <Reveal delay={0.04}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div className="inline-flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-[#E5E7EB] max-w-full overflow-x-auto no-scrollbar self-start">
              {callScenarios.map((sc, idx) => {
                const active = idx === scenarioIdx;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => handleSelectScenario(idx)}
                    className={`relative shrink-0 whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
                      active ? "text-white" : "text-[#555961] hover:text-[#111111]"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="call-scenario-tab"
                        className="absolute inset-0 rounded-full bg-[#111111]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{sc.tabLabel}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (isComplete) handleRestart();
                  else setUserPaused((p) => !p);
                }}
                className="h-9 px-4 inline-flex items-center gap-2 rounded-full bg-[#FF6428] text-white text-[13px] font-medium hover:bg-[#E55219] transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                <span>
                  {isComplete ? "Replay Call" : isPlaying ? "Pause" : "Resume"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleNextTurn}
                className="h-9 px-3.5 inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E5E7EB] text-[#111111] text-[13px] font-medium hover:bg-[#F3F4F6] transition-colors cursor-pointer"
              >
                <SkipForward size={13} />
                <span>Next Turn</span>
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white border border-[#E5E7EB] text-[#555961] hover:text-[#111111] transition-colors cursor-pointer"
                aria-label="Restart call simulation"
              >
                <RotateCcw size={13} />
              </button>

              <button
                type="button"
                onClick={() => setSpeedMultiplier((s) => (s === 1 ? 2 : 1))}
                className="h-9 px-3 rounded-full bg-white border border-[#E5E7EB] text-[12px] font-medium text-[#555961] hover:text-[#111111] cursor-pointer"
              >
                {speedMultiplier}x
              </button>
            </div>
          </div>
        </Reveal>

        {/* Mobile View Toggle */}
        <div className="lg:hidden grid grid-cols-2 gap-1.5 p-1 bg-white rounded-full border border-[#E5E7EB] mb-4">
          <button
            type="button"
            onClick={() => setMobilePane("call")}
            className={`h-9 rounded-full text-[13px] font-medium transition-colors ${
              mobilePane === "call" ? "bg-[#111111] text-white" : "text-[#555961]"
            }`}
          >
            Conversation
          </button>
          <button
            type="button"
            onClick={() => setMobilePane("intelligence")}
            className={`h-9 rounded-full text-[13px] font-medium transition-colors ${
              mobilePane === "intelligence"
                ? "bg-[#111111] text-white"
                : "text-[#555961]"
            }`}
          >
            Intelligence ({activeTurn.scoreAfter})
          </button>
        </div>

        {/* Clean Spacious Console Surface */}
        <Reveal delay={0.08}>
          <div className="rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden shadow-[0_8px_32px_-12px_rgba(17,17,17,0.06)]">
            <div className="px-6 h-12 border-b border-[#EFEFF3] flex items-center justify-between gap-4">
              <span className="text-[13px] font-medium text-[#111111] truncate">
                {scenario.badge}
              </span>
              <span className="text-[12px] text-[#8B909A] shrink-0">
                Simulated demo · Turn {visibleCount} of {scenario.turns.length}
              </span>
            </div>

            <div className="grid lg:grid-cols-12">
              {/* Left 7 Cols: Conversation */}
              <div
                className={`lg:col-span-7 p-6 sm:p-8 lg:border-r border-[#EFEFF3] flex flex-col justify-between gap-6 ${
                  mobilePane === "call" ? "flex" : "hidden lg:flex"
                }`}
              >
                <div className="space-y-6">
                  {/* Prospect Row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#F3F4F6]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-[#F3F4F6] text-[#111111] flex items-center justify-center text-[13px] font-semibold">
                        {scenario.prospect.initials}
                      </div>
                      <div>
                        <p className="text-[15px] font-medium text-[#111111]">
                          {scenario.prospect.name}
                        </p>
                        <p className="text-[13px] text-[#6B7280]">
                          {scenario.prospect.role} · {scenario.prospect.company}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[12px] font-medium text-emerald-700">
                      <Phone size={12} />
                      Connected · {activeTurn.timestamp}
                    </span>
                  </div>

                  {/* Clean Light Waveform Bar */}
                  <div className="rounded-xl bg-[#F8F9FA] px-5 py-4 border border-[#EFEFF3]">
                    <div className="flex items-center justify-between mb-2 text-[12px]">
                      <span className="font-medium text-[#111111]">
                        {isComplete && injectedBranches.length === 0
                          ? "Call completed"
                          : activeTurn.speaker === "sara"
                          ? "SARA speaking"
                          : `${scenario.prospect.name} speaking`}
                      </span>
                      <span className="text-[#8B909A] tabular-nums">
                        {activeTurn.timestamp}
                      </span>
                    </div>
                    <VoiceWaveform
                      active={isPlaying || injectedBranches.length > 0}
                      speaker={activeTurn.speaker}
                      height={50}
                      bars={48}
                      dark={false}
                    />
                  </div>

                  {/* Calm Open Transcript */}
                  <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
                    <AnimatePresence initial={false}>
                      {allShownTurns.map((turn, idx) => {
                        const isSara = turn.speaker === "sara";
                        const isLatest = idx === allShownTurns.length - 1;
                        return (
                          <motion.div
                            key={`${scenario.id}-${turn.id}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22 }}
                            className={`pl-4 border-l-2 py-1 ${
                              isSara ? "border-[#FF6428]" : "border-[#D1D5DB]"
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                              <span
                                className={`text-[12px] font-medium ${
                                  isSara ? "text-[#FF6428]" : "text-[#111111]"
                                }`}
                              >
                                {turn.speakerName}
                              </span>
                              <div className="flex items-center gap-2 text-[11.5px] text-[#8B909A]">
                                {turn.actionTag && (
                                  <span className="text-[#555961] bg-[#F5F6F8] px-2 py-0.5 rounded-full">
                                    {turn.actionTag}
                                  </span>
                                )}
                                <span className="tabular-nums">{turn.timestamp}</span>
                              </div>
                            </div>
                            {isLatest ? (
                              <TextEffect
                                per="word"
                                preset="fade"
                                speedReveal={2.4}
                                className="text-[14.5px] leading-relaxed text-[#1F2937]"
                              >
                                {turn.text}
                              </TextEffect>
                            ) : (
                              <p className="text-[14.5px] leading-relaxed text-[#374151]">
                                {turn.text}
                              </p>
                            )}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Interactive Branch Injector */}
                <div className="pt-5 border-t border-[#F3F4F6] space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-[#6B7280] mr-1">
                      <MessageSquarePlus size={13} className="text-[#FF6428]" />
                      Try a mid-call question:
                    </span>
                    {midCallBranches.map((b) => {
                      const used = injectedBranches.some((x) => x.id === b.id);
                      return (
                        <button
                          key={b.id}
                          type="button"
                          disabled={used}
                          onClick={() => handleInjectBranch(b)}
                          className={`px-3 py-1 rounded-full text-[12px] font-medium border transition-colors ${
                            used
                              ? "bg-[#F5F6F8] text-[#9CA3AF] border-[#E5E7EB] cursor-default"
                              : "bg-white text-[#111111] border-[#E5E7EB] hover:border-[#FF6428] hover:text-[#FF6428] cursor-pointer"
                          }`}
                        >
                          {used ? `Asked` : b.chipLabel}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      {scenario.turns.map((t, i) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setVisibleCount(i + 1);
                            setUserPaused(true);
                          }}
                          aria-label={`Jump to turn ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            i < visibleCount
                              ? "w-7 bg-[#FF6428]"
                              : "w-3 bg-[#E5E7EB] hover:bg-[#D1D5DB]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[12px] text-[#8B909A]">
                      Select progress dots to jump turns
                    </span>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Clean Flat Hairline Intelligence Sidebar */}
              <div
                className={`lg:col-span-5 p-6 sm:p-8 bg-[#FAFAFB] flex flex-col justify-between divide-y divide-[#EAECEF] ${
                  mobilePane === "intelligence" ? "flex" : "hidden lg:flex"
                }`}
              >
                <div className="space-y-6 pb-6">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[13px] text-[#6B7280]">
                        Qualification score
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11.5px] font-medium bg-white border border-[#E5E7EB] text-[#111111]">
                        {activeTurn.scoreAfter >= 80 ? "High Fit" : "Evaluating"}
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-[40px] font-medium tracking-tight text-[#111111] leading-none">
                        <NumberTicker value={activeTurn.scoreAfter} startValue={30} />
                      </span>
                      <span className="text-[15px] text-[#8B909A]">/ 100</span>
                    </div>
                    <div className="mt-4 h-1.5 w-full rounded-full bg-[#E5E7EB] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-[#FF6428]"
                        initial={false}
                        animate={{ width: `${activeTurn.scoreAfter}%` }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <span className="text-[12px] text-[#6B7280] block">Sentiment</span>
                      <span className="text-[15px] font-medium text-[#111111] mt-0.5 block">
                        {activeTurn.sentiment}
                      </span>
                    </div>
                    <div>
                      <span className="text-[12px] text-[#6B7280] block">Duration</span>
                      <span className="text-[15px] font-medium text-[#111111] tabular-nums mt-0.5 block">
                        {activeTurn.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="py-6 space-y-3">
                  <p className="text-[13px] font-medium text-[#111111]">
                    Captured requirements &amp; notes
                  </p>
                  <ul className="space-y-2.5">
                    {mergedCaptured.map((item) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-start gap-2.5 text-[13.5px] text-[#374151]"
                      >
                        <CheckCircle2
                          size={15}
                          className="text-[#FF6428] shrink-0 mt-0.5"
                        />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isComplete
                          ? "bg-emerald-600 text-white"
                          : "bg-white border border-[#E5E7EB] text-[#555961]"
                      }`}
                    >
                      <OutcomeIcon size={15} />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#111111]">
                        {isComplete ? scenario.outcomeTitle : "Next step recommendation"}
                      </p>
                      <p className="text-[13px] text-[#6B7280] mt-0.5 leading-snug">
                        {isComplete
                          ? scenario.outcomeDetail
                          : "Evaluating conversation intent to book a slot or escalate to a human rep."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
