"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutGrid,
  Users,
  PhoneCall,
  ArrowUpRight,
  Search,
  AlertCircle,
  CheckCircle2,
  Calendar,
  CalendarClock,
  X,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  workspaceLeads,
  workspaceHourlyData,
  type WorkspaceLead,
} from "@/data/content";
import { Reveal } from "@/components/ui";
import { NumberTicker } from "@/components/ui/NumberTicker";

type WorkspaceTab =
  | "overview"
  | "pipeline"
  | "calls"
  | "schedule"
  | "escalations";

const navItems: { id: WorkspaceTab; label: string; icon: typeof LayoutGrid }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "pipeline", label: "Pipeline & Leads", icon: Users },
  { id: "calls", label: "Calls & Transcripts", icon: PhoneCall },
  { id: "schedule", label: "Meetings & Follow-ups", icon: CalendarClock },
  { id: "escalations", label: "Escalation Queue", icon: AlertCircle },
];

const statusBadgeStyle: Record<WorkspaceLead["status"], string> = {
  "Meeting Set":
    "bg-[#FFF4EF] text-[#FF6428] border-[#FF6428]/25 whitespace-nowrap",
  Qualified:
    "bg-emerald-50 text-emerald-700 border-emerald-200 whitespace-nowrap",
  Escalated: "bg-[#111111] text-white border-[#111111] whitespace-nowrap",
  "Follow-up": "bg-[#F3F4F6] text-[#555961] border-[#E5E7EB] whitespace-nowrap",
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("overview");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<WorkspaceLead | null>(
    workspaceLeads[0]
  );
  const [chartMetric, setChartMetric] = useState<
    "conversations" | "qualified" | "meetings"
  >("conversations");
  const [claimedIds, setClaimedIds] = useState<string[]>([]);

  const filteredLeads = useMemo(() => {
    return workspaceLeads.filter((lead) => {
      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.id.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchQuery]);

  const escalatedLeads = useMemo(
    () =>
      workspaceLeads.filter((l) => l.status === "Escalated" || l.score >= 88),
    []
  );

  const toggleClaim = (id: string) => {
    setClaimedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="dashboard" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <Reveal className="max-w-2xl mb-12">
          <h2 className="text-[clamp(28px,3.8vw,46px)] font-medium leading-[1.08] tracking-[-0.03em] text-[#111111]">
            Manage conversations and pipeline in one workspace.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#555961]">
            Navigate between Overview, filterable Pipeline records, Voice transcripts,
            and Human Escalations inside this interactive workspace preview.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="rounded-[22px] bg-[#F5F6F8] p-2 sm:p-3 border border-[#E6E8EC]">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden">
              <div className="grid md:grid-cols-[232px_1fr] min-h-[560px]">
                {/* Calm Light Application Sidebar */}
                <aside className="hidden md:flex flex-col justify-between bg-[#FAFAFB] p-4 border-r border-[#EFEFF3]">
                  <div>
                    <div className="flex items-center justify-between px-2.5 pb-4 mb-3 border-b border-[#EFEFF3]">
                      <span className="text-[13.5px] font-semibold text-[#111111]">
                        SARA Workspace
                      </span>
                      <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Online
                      </span>
                    </div>

                    <nav className="space-y-1">
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors cursor-pointer ${
                              active
                                ? "bg-white text-[#111111] border border-[#E5E7EB] shadow-2xs"
                                : "text-[#555961] hover:text-[#111111] hover:bg-white/60 border border-transparent"
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <Icon
                                size={15}
                                className={active ? "text-[#FF6428]" : "text-[#8B909A]"}
                              />
                              {item.label}
                            </span>
                            {item.id === "escalations" && (
                              <span className="text-[11px] font-medium text-[#FF6428]">
                                {escalatedLeads.length}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </nav>
                  </div>

                  <div className="pt-4 border-t border-[#EFEFF3] px-2 space-y-2">
                    <p className="text-[12px] leading-snug text-[#6B7280]">
                      Simulated interface preview using sample demo records.
                    </p>
                    <a
                      href="https://sara.saadhyam.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[#111111] hover:text-[#FF6428] transition-colors"
                    >
                      Open live platform
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </aside>

                {/* Main Workspace Area */}
                <div className="flex flex-col min-w-0 bg-white">
                  <div className="px-5 sm:px-6 h-13 border-b border-[#EFEFF3] flex items-center justify-between gap-3">
                    <span className="text-[14px] font-medium text-[#111111]">
                      {navItems.find((n) => n.id === activeTab)?.label}
                    </span>
                    <span className="text-[12px] text-[#8B909A]">
                      Illustrative demo data
                    </span>
                  </div>

                  {/* Mobile View Navigation */}
                  <div className="md:hidden flex items-center gap-1.5 p-2.5 border-b border-[#EFEFF3] overflow-x-auto no-scrollbar">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const active = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveTab(item.id)}
                          className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-medium transition-colors ${
                            active
                              ? "bg-[#111111] text-white"
                              : "bg-[#F5F6F8] text-[#555961]"
                          }`}
                        >
                          <Icon size={13} />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between min-w-0">
                    <AnimatePresence mode="wait">
                      {activeTab === "overview" && (
                        <motion.div
                          key="overview"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-6"
                        >
                          {/* Clean Open Metric Strip */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#EFEFF3] border border-[#EFEFF3] rounded-xl bg-[#FAFAFB]">
                            {[
                              { label: "Sample calls", val: 276, accent: "text-[#111111]" },
                              { label: "Qualified leads", val: 117, accent: "text-emerald-700" },
                              { label: "Meetings booked", val: 48, accent: "text-[#FF6428]" },
                              { label: "Follow-ups sent", val: 142, accent: "text-[#111111]" },
                            ].map((stat) => (
                              <div key={stat.label} className="p-4 sm:p-5">
                                <p className="text-[12px] text-[#6B7280]">{stat.label}</p>
                                <p className={`mt-1.5 text-[28px] font-medium leading-none ${stat.accent}`}>
                                  <NumberTicker value={stat.val} />
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="grid lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-7 border border-[#EFEFF3] rounded-xl p-5 min-w-0">
                              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                <div>
                                  <h3 className="text-[14.5px] font-medium text-[#111111]">
                                    Weekly conversation volume
                                  </h3>
                                  <p className="text-[12px] text-[#8B909A]">
                                    Sample activity over seven days
                                  </p>
                                </div>
                                <div className="flex items-center gap-1 bg-[#F5F6F8] p-1 rounded-full">
                                  {(
                                    [
                                      { k: "conversations", label: "Calls" },
                                      { k: "qualified", label: "Qualified" },
                                      { k: "meetings", label: "Meetings" },
                                    ] as const
                                  ).map((m) => (
                                    <button
                                      key={m.k}
                                      type="button"
                                      onClick={() => setChartMetric(m.k)}
                                      className={`px-3 py-1 rounded-full text-[11.5px] font-medium cursor-pointer transition-colors ${
                                        chartMetric === m.k
                                          ? "bg-white text-[#111111] shadow-2xs"
                                          : "text-[#555961]"
                                      }`}
                                    >
                                      {m.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="h-[230px] w-full min-w-0">
                                <ResponsiveContainer width="100%" height={230}>
                                  <AreaChart data={workspaceHourlyData}>
                                    <defs>
                                      <linearGradient id="saraChartFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#FF6428" stopOpacity={0.18} />
                                        <stop offset="100%" stopColor="#FF6428" stopOpacity={0} />
                                      </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F3F5" vertical={false} />
                                    <XAxis
                                      dataKey="day"
                                      tick={{ fontSize: 11, fill: "#8B909A" }}
                                      axisLine={false}
                                      tickLine={false}
                                    />
                                    <YAxis
                                      tick={{ fontSize: 11, fill: "#8B909A" }}
                                      axisLine={false}
                                      tickLine={false}
                                      width={28}
                                    />
                                    <Tooltip
                                      contentStyle={{
                                        fontSize: 12,
                                        borderRadius: 10,
                                        border: "1px solid #E5E7EB",
                                      }}
                                    />
                                    <Area
                                      type="monotone"
                                      dataKey={chartMetric}
                                      stroke="#FF6428"
                                      fill="url(#saraChartFill)"
                                      strokeWidth={2}
                                    />
                                  </AreaChart>
                                </ResponsiveContainer>
                              </div>
                            </div>

                            <div className="lg:col-span-5 border border-[#EFEFF3] rounded-xl p-5 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <h3 className="text-[14.5px] font-medium text-[#111111]">
                                    Recent leads
                                  </h3>
                                  <button
                                    type="button"
                                    onClick={() => setActiveTab("pipeline")}
                                    className="text-[12.5px] font-medium text-[#FF6428] hover:underline cursor-pointer"
                                  >
                                    View all →
                                  </button>
                                </div>
                                <div className="divide-y divide-[#F3F4F6]">
                                  {workspaceLeads.slice(0, 4).map((lead) => (
                                    <button
                                      key={lead.id}
                                      type="button"
                                      onClick={() => {
                                        setSelectedLead(lead);
                                        setActiveTab("pipeline");
                                      }}
                                      className="w-full py-2.5 flex items-center justify-between gap-2 text-left hover:bg-[#FAFAFB] rounded-lg px-2 -mx-2 transition-colors cursor-pointer"
                                    >
                                      <div className="min-w-0">
                                        <p className="text-[13.5px] font-medium text-[#111111] truncate">
                                          {lead.name}
                                        </p>
                                        <p className="text-[12px] text-[#8B909A] truncate">
                                          {lead.company} · {lead.lastActivity}
                                        </p>
                                      </div>
                                      <span
                                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border shrink-0 ${statusBadgeStyle[lead.status]}`}
                                      >
                                        {lead.status}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <p className="text-[12px] text-[#8B909A] pt-3 border-t border-[#F3F4F6]">
                                Click a prospect to inspect call notes.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "pipeline" && (
                        <motion.div
                          key="pipeline"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="relative flex-1 max-w-xs">
                              <Search
                                size={14}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                              />
                              <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search prospect or company..."
                                className="w-full h-9 pl-9 pr-3 rounded-full border border-[#E5E7EB] text-[13px] text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#111111]"
                              />
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {[
                                "All",
                                "Meeting Set",
                                "Qualified",
                                "Escalated",
                                "Follow-up",
                              ].map((st) => (
                                <button
                                  key={st}
                                  type="button"
                                  onClick={() => setStatusFilter(st)}
                                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-colors cursor-pointer ${
                                    statusFilter === st
                                      ? "bg-[#111111] text-white border-[#111111]"
                                      : "bg-white text-[#555961] border-[#E5E7EB]"
                                  }`}
                                >
                                  {st}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid lg:grid-cols-12 gap-5 items-start">
                            <div className="lg:col-span-7 overflow-x-auto border border-[#EFEFF3] rounded-xl">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-[#FAFAFB] border-b border-[#EFEFF3] text-[11px] font-medium text-[#6B7280]">
                                    <th className="py-2.5 px-4">Prospect</th>
                                    <th className="py-2.5 px-3">Status</th>
                                    <th className="py-2.5 px-4 text-right">Score</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F3F4F6]">
                                  {filteredLeads.map((lead) => {
                                    const selected = selectedLead?.id === lead.id;
                                    return (
                                      <tr
                                        key={lead.id}
                                        onClick={() => setSelectedLead(lead)}
                                        className={`cursor-pointer transition-colors ${
                                          selected ? "bg-[#FAFAFB]" : "hover:bg-[#FAFAFB]"
                                        }`}
                                      >
                                        <td className="py-3 px-4">
                                          <p className="text-[13.5px] font-medium text-[#111111]">
                                            {lead.name}
                                          </p>
                                          <p className="text-[12px] text-[#6B7280]">
                                            {lead.company} · {lead.channel}
                                          </p>
                                        </td>
                                        <td className="py-3 px-3">
                                          <span
                                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${statusBadgeStyle[lead.status]}`}
                                          >
                                            {lead.status}
                                          </span>
                                        </td>
                                        <td className="py-3 px-4 text-right font-medium text-[13.5px] text-[#111111] tabular-nums">
                                          {lead.score}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                              {filteredLeads.length === 0 && (
                                <p className="p-6 text-center text-[13px] text-[#8B909A]">
                                  No matching demo leads.
                                </p>
                              )}
                            </div>

                            <div className="lg:col-span-5 rounded-xl border border-[#EFEFF3] bg-[#FAFAFB] p-5 space-y-4">
                              {selectedLead ? (
                                <>
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <span className="text-[11.5px] text-[#8B909A]">
                                        {selectedLead.id} · {selectedLead.channel}
                                      </span>
                                      <h4 className="text-[16px] font-medium text-[#111111]">
                                        {selectedLead.name}
                                      </h4>
                                      <p className="text-[12.5px] text-[#555961]">
                                        {selectedLead.role} · {selectedLead.company}
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => setSelectedLead(null)}
                                      className="text-[#8B909A] hover:text-[#111111] p-1 cursor-pointer"
                                      aria-label="Clear selected lead"
                                    >
                                      <X size={15} />
                                    </button>
                                  </div>

                                  <div className="pt-3 border-t border-[#EAECEF]">
                                    <p className="text-[11.5px] text-[#6B7280] mb-1">
                                      Conversation summary
                                    </p>
                                    <p className="text-[13.5px] leading-relaxed text-[#111111]">
                                      {selectedLead.summary}
                                    </p>
                                  </div>

                                  <div className="pt-3 border-t border-[#EAECEF] flex items-center justify-between text-[12.5px]">
                                    <span className="flex items-center gap-1.5 text-[#6B7280]">
                                      <Calendar size={13} className="text-[#FF6428]" />
                                      Next step
                                    </span>
                                    <span className="font-medium text-[#111111]">
                                      {selectedLead.nextStep}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <p className="text-[13px] text-[#8B909A] py-8 text-center">
                                  Select a lead row to inspect SARA&apos;s notes.
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "calls" && (
                        <motion.div
                          key="calls"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="divide-y divide-[#EFEFF3] border border-[#EFEFF3] rounded-xl overflow-hidden"
                        >
                          {workspaceLeads.map((call) => (
                            <div
                              key={call.id}
                              className="p-4 sm:px-5 bg-white hover:bg-[#FAFAFB] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-[14px] font-medium text-[#111111]">
                                    {call.name}
                                  </span>
                                  <span className="text-[12.5px] text-[#6B7280]">
                                    {call.company} · {call.duration}
                                  </span>
                                </div>
                                <p className="text-[13px] text-[#555961]">{call.summary}</p>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <span className="text-[12px] text-[#6B7280]">
                                  {call.sentiment}
                                </span>
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${statusBadgeStyle[call.status]}`}
                                >
                                  {call.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}

                      {activeTab === "schedule" && (
                        <motion.div
                          key="schedule"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="grid sm:grid-cols-2 gap-4"
                        >
                          {workspaceLeads.slice(0, 4).map((item) => (
                            <div
                              key={item.id}
                              className="rounded-xl border border-[#EFEFF3] bg-[#FAFAFB] p-4 space-y-2"
                            >
                              <div className="flex items-center justify-between text-[12px]">
                                <span className="text-[#FF6428] font-medium">
                                  {item.nextStep}
                                </span>
                                <span className="text-[#8B909A]">{item.lastActivity}</span>
                              </div>
                              <p className="text-[14.5px] font-medium text-[#111111]">
                                {item.name} · {item.company}
                              </p>
                              <p className="text-[13px] text-[#555961]">{item.summary}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}

                      {activeTab === "escalations" && (
                        <motion.div
                          key="escalations"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-3"
                        >
                          {escalatedLeads.map((item) => {
                            const isClaimed = claimedIds.includes(item.id);
                            return (
                              <div
                                key={item.id}
                                className="rounded-xl border border-[#EFEFF3] bg-[#FAFAFB] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                              >
                                <div className="space-y-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[14.5px] font-medium text-[#111111]">
                                      {item.name} · {item.company}
                                    </span>
                                    <span className="text-[12px] font-medium text-[#FF6428]">
                                      Score {item.score}/100
                                    </span>
                                  </div>
                                  <p className="text-[13px] text-[#555961]">{item.summary}</p>
                                  <p className="text-[12.5px] font-medium text-[#111111]">
                                    {item.nextStep}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => toggleClaim(item.id)}
                                  className={`h-9 px-4 rounded-full text-[12.5px] font-medium shrink-0 inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                                    isClaimed
                                      ? "bg-emerald-600 text-white"
                                      : "bg-[#111111] text-white hover:bg-[#FF6428]"
                                  }`}
                                >
                                  <CheckCircle2 size={14} />
                                  <span>{isClaimed ? "Claimed (Demo)" : "Claim Handoff"}</span>
                                </button>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-6 pt-3.5 border-t border-[#F3F4F6] flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#8B909A]">
                      <span>All workspace data shown is illustrative sample data.</span>
                      <span>SARA by Saadhyam</span>
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
