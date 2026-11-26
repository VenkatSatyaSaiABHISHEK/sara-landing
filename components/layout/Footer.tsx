import Link from "next/link";
import { footer } from "@/data/content";
import { SaraLogo } from "@/components/layout/Navbar";

export default function Footer() {
  return (
    <footer className="bg-[#0B0C0E] text-white border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-14 lg:py-16">
        <div className="grid md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-5 space-y-4">
            <Link href="/" aria-label="SARA Home">
              <SaraLogo dark />
            </Link>
            <p className="text-[13.5px] leading-relaxed text-white/55 max-w-xs">
              SARA is an AI-powered sales team manager by Saadhyam — built to engage leads,
              hold natural voice conversations, qualify opportunities, and support your sales team.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footer.cols.map((col) => (
              <div key={col.title}>
                <h4 className="text-[12px] font-medium text-white/45 mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {"external" in l && l.external ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13.5px] text-white/75 hover:text-white transition-colors"
                        >
                          {l.label} ↗
                        </a>
                      ) : (
                        <a
                          href={l.href}
                          className="text-[13.5px] text-white/75 hover:text-white transition-colors"
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-3 text-[12.5px] text-white/45">
          <p>© 2026 Saadhyam. All rights reserved.</p>
          <p>SARA by Saadhyam</p>
        </div>
      </div>
    </footer>
  );
}
