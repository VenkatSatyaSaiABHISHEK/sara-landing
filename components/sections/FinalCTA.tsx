"use client";

import { ArrowUpRight, ArrowUp } from "lucide-react";
import { Reveal } from "@/components/ui";

export default function FinalCTA() {
  return (
    <section className="bg-[#111111] text-white">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-24 lg:py-32">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(32px,4.6vw,56px)] font-medium leading-[1.06] tracking-[-0.03em] text-white">
            Give your sales pipeline an always-ready teammate.
          </h2>

          <p className="mt-5 text-[16px] leading-relaxed text-white/65 max-w-xl mx-auto">
            Connect with Saadhyam to configure SARA around your customer conversations,
            qualification workflow, and human escalation path.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="https://sara.saadhyam.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6428] text-white text-[14px] font-medium hover:bg-[#E55219] transition-colors"
            >
              Get Started on Saadhyam
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#product"
              className="h-12 px-7 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white/85 text-[14px] font-medium hover:bg-white/5 transition-colors"
            >
              Replay Live Call Demo
              <ArrowUp size={15} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
