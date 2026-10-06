/**
 * Single source of truth for company details, navigation and SEO defaults.
 * Update values here and they propagate to metadata, structured data and the UI.
 */
export const site = {
  name: "Revosit",
  legalName: "Revosit",
  tagline: "Engineering partner for full-stack, Salesforce and AI",
  description:
    "Revosit is a B2B software house building full-stack products, Salesforce solutions and AI integrations — available as a delivery partner or as embedded engineers through staff augmentation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://revosit.com",
  email: "support@revosit.com",
  locale: "en_US",
  // TODO: confirm before launch — surfaced in Organization structured data.
  foundingYear: 2021,
  social: {
    linkedin: "https://www.linkedin.com/company/revosit",
    github: "https://github.com/revosit",
    x: "https://x.com/revosit",
  },
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const engagements = [
  {
    title: "Project delivery",
    description:
      "A sized, outcome-owned build. We scope the work, ship in two-week increments and hand over documented, tested code.",
    bestFor: "New products, replatforms, fixed-scope modules",
    shape: ["Discovery sprint", "Fixed or capped scope", "Dedicated squad"],
  },
  {
    title: "Staff augmentation",
    description:
      "Vetted engineers embedded in your team, your tooling and your standups — scaling up or down as your roadmap moves.",
    bestFor: "Capacity gaps, specialist skills, long roadmaps",
    shape: ["Monthly per engineer", "Your process and tools", "2-week ramp-up"],
  },
  {
    title: "Advisory retainer",
    description:
      "Architecture review, Salesforce governance and AI feasibility work for teams who need senior judgement, not more headcount.",
    bestFor: "Audits, platform decisions, AI roadmaps",
    shape: ["Capped hours", "Written recommendations", "Rolling monthly"],
  },
] as const;

export const phases = [
  {
    step: "01",
    title: "Scope",
    description:
      "A short paid discovery: we map the problem, constraints and integration surface, then write the plan we would build against.",
  },
  {
    step: "02",
    title: "Architect",
    description:
      "Data model, service boundaries and delivery sequence agreed up front — so the estimate reflects the real system, not a guess.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Two-week increments behind feature flags, reviewed code, CI on every branch. You see working software, not status decks.",
  },
  {
    step: "04",
    title: "Operate",
    description:
      "Observability, runbooks and a documented handover. We stay on for support or step back cleanly — your call.",
  },
] as const;

export const differentiators = [
  {
    title: "Senior-weighted teams",
    description:
      "Every engagement is led by an engineer who has shipped and operated the thing they are designing.",
  },
  {
    title: "One accountable team",
    description:
      "Full-stack, Salesforce and AI work sit under the same delivery lead, so integrations stop being someone else's problem.",
  },
  {
    title: "Written over verbal",
    description:
      "Decisions, trade-offs and architecture live in docs you keep — not in a thread you lose access to.",
  },
  {
    title: "Exit-friendly by default",
    description:
      "Your repos, your cloud accounts, your pipelines. No proprietary wrappers you have to buy your way out of.",
  },
] as const;

/** Grouped capability list for the About page. */
export const stackGroups = [
  {
    discipline: "Product engineering",
    items: ["TypeScript", "React", "Next.js", "Node.js", "Python", "Go", "REST & GraphQL"],
  },
  {
    discipline: "Salesforce",
    items: ["Apex", "Lightning Web Components", "Flow", "Sales Cloud", "Service Cloud", "Salesforce DX", "MuleSoft"],
  },
  {
    discipline: "AI & data",
    items: ["Claude", "LangGraph", "pgvector", "RAG pipelines", "Evaluation harnesses", "dbt", "Snowflake"],
  },
  {
    discipline: "Platform",
    items: ["AWS", "Azure", "Terraform", "Kubernetes", "GitHub Actions", "PostgreSQL", "OpenTelemetry"],
  },
] as const;

export const principles = [
  {
    title: "Estimates are commitments, not marketing",
    description:
      "We would rather lose a deal at the proposal stage than win it on a number we know is wrong. If scope moves, we say so the week it moves.",
  },
  {
    title: "The team that scopes it builds it",
    description:
      "No bait-and-switch between the engineer who wrote the proposal and the one who writes the code. The delivery lead is in the first call.",
  },
  {
    title: "Boring technology, deliberately",
    description:
      "We pick the dull, well-documented option unless the problem genuinely needs something sharper — and we write down why when it does.",
  },
  {
    title: "You own everything we touch",
    description:
      "Code in your repos, infrastructure in your accounts, decisions in docs you keep. Our exit should be a non-event.",
  },
] as const;

export const stack = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Salesforce",
  "Apex",
  "LWC",
  "MuleSoft",
  "AWS",
  "Azure",
  "Terraform",
  "Kubernetes",
  "LangGraph",
  "pgvector",
  "Snowflake",
  "dbt",
] as const;
