"use client";

import {
  Cloud,
  Database,
  Calendar,
  Hash,
  Video,
  MessageSquare,
  Workflow,
  Mail,
} from "lucide-react";
import { Reveal } from "@/components/ui";
import { integrationsList } from "@/data/content";

function IntegrationLogo({ name }: { name: string }) {
  switch (name) {
    case "Salesforce":
      return <Cloud size={18} className="text-sky-600" />;
    case "HubSpot":
      return <Database size={18} className="text-[#FF6428]" />;
    case "Google Calendar":
      return <Calendar size={18} className="text-blue-600" />;
    case "Outlook Calendar":
      return <Mail size={18} className="text-indigo-600" />;
    case "Slack":
      return <Hash size={18} className="text-emerald-700" />;
    case "Zoom":
      return <Video size={18} className="text-blue-500" />;
    case "WhatsApp":
      return <MessageSquare size={18} className="text-emerald-600" />;
    default:
      return <Workflow size={18} className="text-[#FF6428]" />;
  }
}

const integrationDescriptions: Record<string, string> = {
  Salesforce: "Update prospect records and sync call outcomes cleanly.",
  HubSpot: "Keep contacts, lifecycle stages, and summaries aligned.",
  "Google Calendar": "Offer live time slots and dispatch walkthrough invites.",
  "Outlook Calendar": "Coordinate team availability across sales calendars.",
  Slack: "Notify reps immediately when high-intent leads escalate.",
  Zoom: "Attach meeting links automatically to confirmed bookings.",
  WhatsApp: "Reinforce booked calls and timely follow-up touchpoints.",
  Zapier: "Connect custom workflow triggers around your existing tools.",
};

export default function Integrations() {
  return (
    <section
      id="integrations"
      className="py-24 lg:py-32 bg-[#F8F9FA] border-y border-[#EAECEF]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl mb-14">
          <h2 className="text-[clamp(28px,3.8vw,46px)] font-medium leading-[1.08] tracking-[-0.03em] text-[#111111]">
            One layer across your sales tools.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#555961]">
            SARA fits beside CRM, calendar, communication, and meeting workflows. Specific
            integrations are configured during onboarding with Saadhyam.
          </p>
        </Reveal>

        <Reveal delay={0.04}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {integrationsList.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl bg-white border border-[#E5E7EB] p-6 flex flex-col justify-between gap-4 hover:border-[#D1D5DB] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] border border-[#EFEFF3] flex items-center justify-center">
                    <IntegrationLogo name={item.name} />
                  </div>
                  <span className="text-[11.5px] text-[#6B7280] bg-[#F5F6F8] px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-[16px] font-medium text-[#111111]">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#6B7280]">
                    {integrationDescriptions[item.name] || item.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[13px] text-[#6B7280]">
            Connector availability may vary by setup — contact{" "}
            <a
              href="https://sara.saadhyam.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#111111] font-medium hover:text-[#FF6428] underline"
            >
              Saadhyam
            </a>{" "}
            to verify supported integrations for your workflow.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
