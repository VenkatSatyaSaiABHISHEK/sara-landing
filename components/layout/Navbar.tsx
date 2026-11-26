"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav } from "@/data/content";

export function SaraLogo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg
        width="26"
        height="26"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="28" height="28" rx="7" fill={dark ? "#FFFFFF" : "#111111"} />
        <path
          d="M9.5 17.5C10.5 18.7 12.1 19.3 14 19.3C16.4 19.3 18.1 18.1 18.1 16.2C18.1 14.3 16.5 13.5 13.8 13C11.4 12.6 10.1 11.9 10.1 10.4C10.1 8.9 11.6 7.8 13.8 7.8C15.6 7.8 16.9 8.4 17.7 9.4"
          stroke={dark ? "#111111" : "#FFFFFF"}
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <circle cx="19.5" cy="9" r="2.2" fill="#FF6428" />
      </svg>
      <span
        className={`text-[18px] font-semibold tracking-[-0.03em] ${
          dark ? "text-white" : "text-[#111111]"
        }`}
      >
        SARA
      </span>
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/92 backdrop-blur-xl border-b border-[#EAECEF]"
          : "bg-white/85 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto h-[68px] px-5 sm:px-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="relative z-10 shrink-0" aria-label="SARA Home">
            <SaraLogo />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14px] font-normal text-[#4B5563] hover:text-[#111111] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <a
            href="#dashboard"
            className="h-[38px] px-5 inline-flex items-center rounded-full bg-[#F3F4F6] text-[#111111] text-[13.5px] font-medium hover:bg-[#E5E7EB] transition-colors"
          >
            Workspace
          </a>
          <a
            href={nav.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-[38px] px-5 inline-flex items-center rounded-full bg-[#111111] text-white text-[13.5px] font-medium hover:bg-[#FF6428] transition-colors"
          >
            {nav.cta.label}
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden relative z-10 w-10 h-10 inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#111111]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-[68px] bottom-0 bg-white z-40 px-6 pt-4 pb-10 flex flex-col justify-between overflow-y-auto lg:hidden border-t border-[#EAECEF]"
          >
            <div className="divide-y divide-[#F3F4F6]">
              {nav.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-[16px] font-medium text-[#111111]"
                >
                  <span>{l.label}</span>
                  <span className="text-[#9CA3AF]">→</span>
                </a>
              ))}
            </div>
            <div className="pt-6 space-y-2.5">
              <a
                href="#dashboard"
                onClick={() => setOpen(false)}
                className="h-11 w-full flex items-center justify-center rounded-full bg-[#F3F4F6] text-[#111111] font-medium text-[15px]"
              >
                Workspace
              </a>
              <a
                href={nav.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="h-12 w-full flex items-center justify-center rounded-full bg-[#111111] text-white font-medium text-[15px]"
              >
                {nav.cta.label}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
