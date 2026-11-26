export const nav = {
  links: [
    { label: "Live Demo", href: "#product" },
    { label: "Sales Journey", href: "#how-it-works" },
    { label: "Capabilities", href: "#features" },
    { label: "Workspace", href: "#dashboard" },
    { label: "Integrations", href: "#integrations" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Get Started", href: "https://sara.saadhyam.com/" },
};

export const hero = {
  eyebrow: "SARA BY SAADHYAM · AI SALES TEAM MANAGER",
  headlineLine1: "Your AI Sales Team.",
  headlineAccent: "Always Ready.",
  description:
    "SARA engages inbound and outbound prospects, conducts natural voice conversations, answers product questions, qualifies opportunities, and schedules meetings — working continuously alongside your human reps.",
  primaryCTA: { label: "Get Started on Saadhyam", href: "https://sara.saadhyam.com/" },
  secondaryCTA: { label: "Experience Live Call", href: "#product" },
  pillars: [
    {
      index: "01",
      title: "AI-Powered Voice Calling",
      detail: "Natural, context-aware customer conversations that keep prospects engaged.",
    },
    {
      index: "02",
      title: "Question Answering & Discovery",
      detail: "Clarifies requirements and responds thoughtfully to prospect inquiries.",
    },
    {
      index: "03",
      title: "Lead Qualification & Scheduling",
      detail: "Evaluates fit and books next-step meetings directly on your calendar.",
    },
    {
      index: "04",
      title: "Human Team Collaboration",
      detail: "Escalates high-priority conversations with full transcript and context.",
    },
  ],
};

export type CallTurn = {
  id: string;
  speaker: "sara" | "prospect";
  speakerName: string;
  timestamp: string;
  text: string;
  actionTag?: string;
  scoreAfter: number;
  sentiment: "Initial" | "Curious" | "Engaged" | "Positive" | "High Intent";
  capturedItems: string[];
};

export type CallScenario = {
  id: string;
  tabLabel: string;
  badge: string;
  prospect: {
    name: string;
    initials: string;
    role: string;
    company: string;
    channel: string;
    stage: string;
  };
  outcomeTitle: string;
  outcomeDetail: string;
  outcomeType: "meeting" | "reengaged" | "escalated";
  turns: CallTurn[];
};

export const callScenarios: CallScenario[] = [
  {
    id: "inbound-qual",
    tabLabel: "Inbound Qualification",
    badge: "Voice Inbound · Discovery & Booking",
    prospect: {
      name: "Vikram Patel",
      initials: "VP",
      role: "Operations Director",
      company: "TechVista Logistics (Demo)",
      channel: "Inbound Enquiry",
      stage: "Active Qualification",
    },
    outcomeTitle: "Meeting Booked Automatically",
    outcomeDetail: "Walkthrough scheduled for Thursday at 2:00 PM · Summary synced for sales rep",
    outcomeType: "meeting",
    turns: [
      {
        id: "t1",
        speaker: "sara",
        speakerName: "SARA",
        timestamp: "00:08",
        text: "Hi Vikram, this is SARA calling from the sales team regarding the inquiry you just submitted. Is now a good minute to understand what your team is looking for?",
        actionTag: "Initiated Instant Outreach",
        scoreAfter: 34,
        sentiment: "Initial",
        capturedItems: ["Prospect confirmed availability"],
      },
      {
        id: "t2",
        speaker: "prospect",
        speakerName: "Vikram",
        timestamp: "00:26",
        text: "Yes, quick timing actually. We receive plenty of inbound enquiries outside office hours and need a reliable way to answer early questions and qualify serious buyers before assigning reps.",
        scoreAfter: 58,
        sentiment: "Curious",
        capturedItems: [
          "Prospect confirmed availability",
          "Pain point: Missed off-hours inbound inquiries",
        ],
      },
      {
        id: "t3",
        speaker: "sara",
        speakerName: "SARA",
        timestamp: "00:54",
        text: "That makes complete sense. SARA handles around-the-clock outreach, answers product questions naturally, evaluates buyer requirements, and passes full context to your sales reps. Roughly how large is the team handling follow-ups right now?",
        actionTag: "Answered Capability Question",
        scoreAfter: 74,
        sentiment: "Engaged",
        capturedItems: [
          "Prospect confirmed availability",
          "Pain point: Missed off-hours inbound inquiries",
          "Requirement: Continuous coverage + handoff",
        ],
      },
      {
        id: "t4",
        speaker: "prospect",
        speakerName: "Vikram",
        timestamp: "01:28",
        text: "We have 12 sales advisors across two shifts, and we want to launch something within the next few weeks. What does onboarding look like?",
        scoreAfter: 86,
        sentiment: "Positive",
        capturedItems: [
          "Prospect confirmed availability",
          "Pain point: Missed off-hours inbound inquiries",
          "Requirement: Continuous coverage + handoff",
          "Team scope: 12 advisors · Near-term rollout",
        ],
      },
      {
        id: "t5",
        speaker: "sara",
        speakerName: "SARA",
        timestamp: "02:04",
        text: "Our team configures SARA directly around your call script, qualification criteria, and calendar workflow. Would Thursday at 2:00 PM work for a focused 20-minute walkthrough with an account specialist?",
        actionTag: "Proposed Available Calendar Slot",
        scoreAfter: 92,
        sentiment: "High Intent",
        capturedItems: [
          "Prospect confirmed availability",
          "Pain point: Missed off-hours inbound inquiries",
          "Requirement: Continuous coverage + handoff",
          "Team scope: 12 advisors · Near-term rollout",
          "Confirmed slot: Thursday 2:00 PM",
        ],
      },
    ],
  },
  {
    id: "dormant-reengage",
    tabLabel: "Dormant Re-engagement",
    badge: "Outbound Follow-Up · Reactivation",
    prospect: {
      name: "Ananya Verma",
      initials: "AV",
      role: "Head of Growth",
      company: "Kestrel Commerce (Demo)",
      channel: "Follow-up Sequence",
      stage: "Lead Re-engagement",
    },
    outcomeTitle: "Dormant Lead Reactivated",
    outcomeDetail: "Follow-up summary & Friday check-in scheduled · Pipeline stage updated to Active",
    outcomeType: "reengaged",
    turns: [
      {
        id: "r1",
        speaker: "sara",
        speakerName: "SARA",
        timestamp: "00:10",
        text: "Hi Ananya, SARA checking back in from our team. You explored our sales automation workflow last month — are you revisiting customer follow-ups for this quarter?",
        actionTag: "Triggered Scheduled Re-engagement",
        scoreAfter: 28,
        sentiment: "Initial",
        capturedItems: ["Re-engaged inactive pipeline contact"],
      },
      {
        id: "r2",
        speaker: "prospect",
        speakerName: "Ananya",
        timestamp: "00:34",
        text: "Oh hi — yes, timing was busy last month, though we still have a backlog of older inquiries that nobody has called back yet.",
        scoreAfter: 54,
        sentiment: "Curious",
        capturedItems: [
          "Re-engaged inactive pipeline contact",
          "Need identified: Backlog of uncontacted inquiries",
        ],
      },
      {
        id: "r3",
        speaker: "sara",
        speakerName: "SARA",
        timestamp: "01:06",
        text: "SARA specializes in picking up dormant inquiries automatically, asking a few clarifying questions to spot active interest, and scheduling calls only for prospects ready to talk. Should I send a brief overview and lock a quick Friday review?",
        actionTag: "Matched Workflow Solution",
        scoreAfter: 79,
        sentiment: "Positive",
        capturedItems: [
          "Re-engaged inactive pipeline contact",
          "Need identified: Backlog of uncontacted inquiries",
          "Interest confirmed for dormant queue reactivation",
        ],
      },
      {
        id: "r4",
        speaker: "prospect",
        speakerName: "Ananya",
        timestamp: "01:39",
        text: "Friday morning at 11 AM sounds helpful. Let's review how we segment cold versus warm leads.",
        actionTag: "Captured Next Step & Topic",
        scoreAfter: 88,
        sentiment: "High Intent",
        capturedItems: [
          "Re-engaged inactive pipeline contact",
          "Need identified: Backlog of uncontacted inquiries",
          "Interest confirmed for dormant queue reactivation",
          "Follow-up booked: Friday 11:00 AM",
        ],
      },
    ],
  },
  {
    id: "human-escalation",
    tabLabel: "Human Escalation",
    badge: "Live Routing · Context Handoff",
    prospect: {
      name: "Rohan Deshmukh",
      initials: "RD",
      role: "VP Commercial Sales",
      company: "Meridian FinServe (Demo)",
      channel: "Priority Inbound",
      stage: "Escalation Prepared",
    },
    outcomeTitle: "Escalated to Human Rep with Full Context",
    outcomeDetail: "Briefing packet sent to Senior AE · Transcript, requirements & priority score attached",
    outcomeType: "escalated",
    turns: [
      {
        id: "e1",
        speaker: "sara",
        speakerName: "SARA",
        timestamp: "00:09",
        text: "Hello Rohan, thanks for reaching out. I'm SARA — happy to answer initial questions or connect you directly with a senior specialist based on your rollout scope.",
        actionTag: "Greeted Priority Inbound Lead",
        scoreAfter: 45,
        sentiment: "Initial",
        capturedItems: ["Executive inquiry identified"],
      },
      {
        id: "e2",
        speaker: "prospect",
        speakerName: "Rohan",
        timestamp: "00:38",
        text: "We operate regional sales desks across multiple regions and need custom escalation routing rules plus direct coordination with our senior account team before deciding.",
        scoreAfter: 76,
        sentiment: "Engaged",
        capturedItems: [
          "Executive inquiry identified",
          "Multi-region team · Custom escalation routing required",
        ],
      },
      {
        id: "e3",
        speaker: "sara",
        speakerName: "SARA",
        timestamp: "01:12",
        text: "Understood — multi-region routing and custom handoff rules are best scoped directly with our senior team. I've captured your requirements and I'm escalating this conversation to a human lead with full context so you won't have to repeat anything.",
        actionTag: "Executed Seamless Human Escalation",
        scoreAfter: 94,
        sentiment: "Positive",
        capturedItems: [
          "Executive inquiry identified",
          "Multi-region team · Custom escalation routing required",
          "Escalated live to human AE with structured brief",
        ],
      },
    ],
  },
];

export const salesJourneySteps = [
  {
    num: "01",
    shortLabel: "Connect",
    title: "Connect with prospects immediately",
    desc: "Every new inquiry enters your pipeline and gets timely outreach — eliminating delays outside business hours or during peak demand.",
    tag: "Lead Engagement",
    stateTitle: "Incoming Lead Trigger",
    metrics: [
      { label: "Queue Status", value: "Active 24/7" },
      { label: "Outreach Mode", value: "Automated Call" },
    ],
  },
  {
    num: "02",
    shortLabel: "Converse",
    title: "Start natural AI voice conversations",
    desc: "SARA conducts fluid, responsive phone conversations with natural turn-taking and contextual awareness — never stiff scripted trees.",
    tag: "AI-Powered Calling",
    stateTitle: "Live Voice Conversation",
    metrics: [
      { label: "Conversation", value: "Context-Aware" },
      { label: "Voice Flow", value: "Natural Pacing" },
    ],
  },
  {
    num: "03",
    shortLabel: "Understand",
    title: "Answer questions and uncover requirements",
    desc: "Prospects ask real questions about onboarding, workflows, or fit. SARA responds clearly while listening for key business requirements.",
    tag: "Customer Q&A",
    stateTitle: "Q&A & Requirement Extraction",
    metrics: [
      { label: "Inquiry Type", value: "Product & Workflow" },
      { label: "Extraction", value: "Structured Notes" },
    ],
  },
  {
    num: "04",
    shortLabel: "Qualify",
    title: "Qualify and prioritize opportunities",
    desc: "Every call turns into structured qualification signals so human sales reps know which prospects have immediate buying intent.",
    tag: "Lead Qualification",
    stateTitle: "Qualification Scorecard",
    metrics: [
      { label: "Fit Criteria", value: "Scored" },
      { label: "Pipeline Priority", value: "Ranked" },
    ],
  },
  {
    num: "05",
    shortLabel: "Follow Up",
    title: "Schedule meetings and re-engage leads",
    desc: "SARA locks calendar slots for ready prospects and automatically follows up with undecided or dormant leads so nothing falls through.",
    tag: "Scheduling & Follow-ups",
    stateTitle: "Calendar & Re-engagement Loop",
    metrics: [
      { label: "Booking Flow", value: "Direct Slot Match" },
      { label: "Dormant Queue", value: "Auto-Follow-up" },
    ],
  },
  {
    num: "06",
    shortLabel: "Collaborate",
    title: "Support your sales team with clean handoffs",
    desc: "When a conversation requires nuance or commercial closing, SARA escalates immediately with full transcript, score, and next-step context.",
    tag: "Human Handoff",
    stateTitle: "Human Rep Escalation Brief",
    metrics: [
      { label: "Handoff Context", value: "Complete Brief" },
      { label: "Team Role", value: "Ready to Close" },
    ],
  },
];

export const qaSandboxPrompts = [
  {
    id: "q1",
    question: "How does SARA handle complex buyer questions mid-call?",
    saraReply:
      "SARA listens continuously to intent and addresses common product, workflow, and onboarding questions naturally. When a question goes beyond standard guidance, she notes the context and prepares a warm escalation for your sales team.",
    signals: ["Question Answering", "Context Retention", "Fallback Escalation"],
  },
  {
    id: "q2",
    question: "What happens when a prospect isn't ready to book right away?",
    saraReply:
      "Rather than marking the lead lost, SARA schedules thoughtful follow-up intervals and re-engages dormant prospects later with full memory of earlier requirements — keeping your pipeline consistently active.",
    signals: ["Automated Follow-ups", "Dormant Re-engagement", "Pipeline Continuity"],
  },
  {
    id: "q3",
    question: "Does SARA replace our human sales reps?",
    saraReply:
      "No — SARA acts as an AI sales team manager working beside your reps. She handles initial engagement, Q&A, qualification, and scheduling 24/7, then hands off qualified opportunities cleanly so humans focus on closing.",
    signals: ["Human Collaboration", "24/7 Coverage", "Qualified Handoff"],
  },
];

export type WorkspaceLead = {
  id: string;
  name: string;
  company: string;
  role: string;
  channel: string;
  status: "Qualified" | "Meeting Set" | "Escalated" | "Follow-up";
  score: number;
  sentiment: "High Intent" | "Positive" | "Engaged" | "Neutral";
  lastActivity: string;
  duration: string;
  summary: string;
  nextStep: string;
};

export const workspaceLeads: WorkspaceLead[] = [
  {
    id: "LD-1042",
    name: "Vikram Patel",
    company: "TechVista Logistics",
    role: "Operations Director",
    channel: "Inbound Voice",
    status: "Meeting Set",
    score: 92,
    sentiment: "High Intent",
    lastActivity: "4 mins ago",
    duration: "02:34",
    summary: "Needs 24/7 inbound coverage for 12 advisors. Asked about onboarding timeline and CRM workflow alignment.",
    nextStep: "Walkthrough booked · Thu 2:00 PM",
  },
  {
    id: "LD-1041",
    name: "Rohan Deshmukh",
    company: "Meridian FinServe",
    role: "VP Commercial Sales",
    channel: "Priority Inbound",
    status: "Escalated",
    score: 94,
    sentiment: "Positive",
    lastActivity: "14 mins ago",
    duration: "01:52",
    summary: "Evaluating multi-region desk coordination and custom human handoff routing. Requested senior AE alignment.",
    nextStep: "Escalated to Senior AE · Brief Attached",
  },
  {
    id: "LD-1040",
    name: "Ananya Verma",
    company: "Kestrel Commerce",
    role: "Head of Growth",
    channel: "Re-engagement",
    status: "Meeting Set",
    score: 88,
    sentiment: "Positive",
    lastActivity: "29 mins ago",
    duration: "02:05",
    summary: "Reactivated from dormant lead list. Interested in clearing uncontacted inquiry backlog before quarterly push.",
    nextStep: "Review call booked · Fri 11:00 AM",
  },
  {
    id: "LD-1039",
    name: "Kavita Nair",
    company: "HarborCloud Systems",
    role: "Revenue Operations",
    channel: "Outbound Call",
    status: "Qualified",
    score: 81,
    sentiment: "Engaged",
    lastActivity: "52 mins ago",
    duration: "03:11",
    summary: "Confirmed team size and qualification criteria requirements. Reviewing internal calendar windows before booking.",
    nextStep: "Send calendar follow-up in 24h",
  },
  {
    id: "LD-1038",
    name: "Siddharth Mehta",
    company: "Northstar Supply",
    role: "Sales Manager",
    channel: "Follow-up Loop",
    status: "Follow-up",
    score: 67,
    sentiment: "Neutral",
    lastActivity: "1 hr ago",
    duration: "01:28",
    summary: "Requested brief overview of automated calling workflow before scheduling team review next week.",
    nextStep: "Automated check-in scheduled",
  },
];

export const workspaceHourlyData = [
  { day: "Mon", conversations: 32, qualified: 12, meetings: 5 },
  { day: "Tue", conversations: 46, qualified: 19, meetings: 8 },
  { day: "Wed", conversations: 41, qualified: 18, meetings: 7 },
  { day: "Thu", conversations: 58, qualified: 26, meetings: 11 },
  { day: "Fri", conversations: 51, qualified: 22, meetings: 9 },
  { day: "Sat", conversations: 27, qualified: 11, meetings: 4 },
  { day: "Sun", conversations: 21, qualified: 9, meetings: 4 },
];

export const integrationsList = [
  { name: "Salesforce", category: "CRM", note: "Pipeline sync" },
  { name: "HubSpot", category: "CRM", note: "Lead updates" },
  { name: "Google Calendar", category: "Calendar", note: "Slot booking" },
  { name: "Outlook Calendar", category: "Calendar", note: "Meeting invites" },
  { name: "Slack", category: "Team Collaboration", note: "Escalation alerts" },
  { name: "Zoom", category: "Video Meetings", note: "Meeting links" },
  { name: "WhatsApp", category: "Messaging", note: "Follow-up touchpoints" },
  { name: "Zapier", category: "Automation", note: "Workflow hooks" },
];

export const operatingPrinciples = [
  {
    code: "01 / AVAILABILITY",
    title: "Continuous 24/7 engagement",
    desc: "Prospects receive prompt, attentive outreach regardless of time zones, weekends, or peak campaign spikes.",
  },
  {
    code: "02 / COORDINATION",
    title: "Built beside human teams",
    desc: "Handles repetitive qualification and follow-ups while escalating nuanced conversations cleanly to your reps.",
  },
  {
    code: "03 / MEMORY",
    title: "Structured pipeline context",
    desc: "Every call produces concise requirement notes, sentiment readouts, and clear next steps for full team visibility.",
  },
  {
    code: "04 / DEPLOYMENT",
    title: "Configured around your workflow",
    desc: "The Saadhyam team tailors conversation tone, qualification rubric, and handoff rules to match your sales process.",
  },
];

export type FAQItem = {
  q: string;
  a: string;
  category: "Product" | "Workflows" | "Collaboration";
};

export const faqs: FAQItem[] = [
  {
    category: "Product",
    q: "What is SARA?",
    a: "SARA is an AI-powered sales team manager developed by Saadhyam. She engages prospects, conducts natural voice conversations, answers customer questions, qualifies leads, schedules meetings, and supports your human sales team continuously.",
  },
  {
    category: "Product",
    q: "How does SARA conduct customer conversations?",
    a: "SARA communicates through natural, AI-powered calling with contextual awareness. She listens to prospect requirements, handles questions cleanly, and maintains productive, human-like pacing.",
  },
  {
    category: "Workflows",
    q: "Can SARA qualify leads and score opportunities?",
    a: "Yes. Throughout each call, SARA asks clarifying questions to understand buyer needs, timeline, and fit — generating structured qualification signals so your reps prioritize the strongest opportunities.",
  },
  {
    category: "Workflows",
    q: "How does meeting scheduling work?",
    a: "Once a prospect is qualified and ready to speak further, SARA coordinates meeting times and schedules follow-up calls so opportunities keep moving without manual back-and-forth.",
  },
  {
    category: "Workflows",
    q: "Does SARA support automated follow-ups and dormant leads?",
    a: "Yes. SARA follows up consistently at appropriate intervals and re-engages inactive leads so promising inquiries do not slip through the cracks.",
  },
  {
    category: "Collaboration",
    q: "How does SARA collaborate with human sales reps?",
    a: "SARA works alongside your team rather than replacing reps. Routine outreach, discovery, and scheduling happen automatically, while high-priority or nuanced conversations escalate to human reps with full context attached.",
  },
  {
    category: "Collaboration",
    q: "Is SARA active outside normal business hours?",
    a: "Yes. SARA operates 24/7 so prospects across regions and time zones receive timely engagement whenever they reach out.",
  },
  {
    category: "Product",
    q: "How do businesses get started with SARA?",
    a: "Visit sara.saadhyam.com to connect with Saadhyam. Their team helps configure SARA's call workflows, qualification criteria, and team handoff rules around your specific sales motion.",
  },
];

export const footer = {
  cols: [
    {
      title: "Product",
      links: [
        { label: "Live Call Studio", href: "#product" },
        { label: "Sales Journey", href: "#how-it-works" },
        { label: "Capabilities", href: "#features" },
        { label: "Sales Workspace", href: "#dashboard" },
      ],
    },
    {
      title: "Ecosystem",
      links: [
        { label: "Integrations", href: "#integrations" },
        { label: "Operating Principles", href: "#architecture" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "SARA Platform", href: "https://sara.saadhyam.com/", external: true },
        { label: "Saadhyam", href: "https://saadhyam.com/", external: true },
      ],
    },
  ],
};
