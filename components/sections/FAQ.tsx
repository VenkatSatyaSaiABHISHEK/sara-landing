"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { faqs, type FAQItem } from "@/data/content";
import { Reveal } from "@/components/ui";

const categories: Array<"All" | FAQItem["category"]> = [
  "All",
  "Product",
  "Workflows",
  "Collaboration",
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] =
    useState<"All" | FAQItem["category"]>("All");
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqs[0].q);

  const visibleFaqs = useMemo(() => {
    if (selectedCategory === "All") return faqs;
    return faqs.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white border-t border-[#EFEFF3]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div>
              <h2 className="text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.08] tracking-[-0.03em] text-[#111111]">
                Questions and answers.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#555961]">
                Clear answers about how SARA engages prospects, qualifies leads, and
                collaborates with human sales teams.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      const first =
                        cat === "All"
                          ? faqs[0]
                          : faqs.find((f) => f.category === cat);
                      setOpenQuestion(first ? first.q : null);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium border transition-colors cursor-pointer ${
                      active
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-[#F5F6F8] text-[#555961] border-[#E5E7EB] hover:text-[#111111]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#EFEFF3]">
              <a
                href="https://sara.saadhyam.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[14px] font-medium text-[#111111] hover:text-[#FF6428] transition-colors"
              >
                Talk to Saadhyam
                <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.04} className="lg:col-span-8">
            <div className="border-t border-[#E5E7EB]">
              {visibleFaqs.map((faq) => {
                const open = openQuestion === faq.q;
                return (
                  <div key={faq.q} className="border-b border-[#E5E7EB]">
                    <button
                      type="button"
                      onClick={() => setOpenQuestion(open ? null : faq.q)}
                      aria-expanded={open}
                      className="w-full py-6 flex items-center justify-between gap-4 text-left group cursor-pointer"
                    >
                      <span className="text-[16.5px] font-medium text-[#111111] group-hover:text-[#FF6428] transition-colors">
                        {faq.q}
                      </span>
                      <span
                        className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          open
                            ? "bg-[#111111] border-[#111111] text-white"
                            : "bg-white border-[#E5E7EB] text-[#555961]"
                        }`}
                      >
                        {open ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 text-[15px] leading-relaxed text-[#555961] max-w-2xl">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
