"use client";

import { Reveal } from "@/components/ui";
import { ShieldCheck, Eye, Clock, Wrench } from "lucide-react";

const trustPillars = [
  {
    icon: Eye,
    title: "Human oversight at every step",
    desc: "Monitor live transcripts, adjust qualification logic, and step into escalated conversations anytime with full buyer context.",
  },
  {
    icon: ShieldCheck,
    title: "Structured, disciplined records",
    desc: "Conversations distill cleanly into buyer requirements, fit signals, and next steps so sales teams review what matters.",
  },
  {
    icon: Clock,
    title: "Continuous 24/7 reliability",
    desc: "Handles inbound off-hours outreach and multi-timezone follow-ups consistently without dropping active inquiries.",
  },
  {
    icon: Wrench,
    title: "Guided workflow deployment",
    desc: "Saadhyam configures SARA's conversation flow, scoring criteria, and rep escalation paths directly around your team.",
  },
];

export default function OperatingPrinciples() {
  return (
    <section id="architecture" className="py-24 lg:py-28 bg-white">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl mb-12">
          <h2 className="text-[clamp(26px,3.4vw,42px)] font-medium leading-[1.1] tracking-[-0.03em] text-[#111111]">
            Built for accountability and reliable team support.
          </h2>
        </Reveal>

        <Reveal delay={0.04}>
          <div className="border-y border-[#E5E7EB] grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB]">
            {trustPillars.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="py-8 sm:px-6 lg:px-7 lg:first:pl-0 lg:last:pr-0">
                  <Icon size={18} className="text-[#FF6428] mb-4" />
                  <h3 className="text-[16px] font-medium tracking-[-0.015em] text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#555961]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
