export type Project = {
  slug: string;
  client: string;
  title: string;
  industry: string;
  year: string;
  service: string;
  summary: string;
  challenge: string;
  approach: string[];
  results: { label: string; value: string }[];
  tech: string[];
  hue: number;
  cover?: { src: string; width: number; height: number; alt: string };
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "arxiron-blood-donation-network",
    client: "Arxiron",
    title: "A blood donation network that finds the nearest donor in seconds",
    industry: "Healthcare",
    year: "2026",
    service: "Full-stack solutions",
    liveUrl: "https://arxiron.com",
    cover: {
      src: "/work/arxiron.png",
      width: 1100,
      height: 760,
      alt: "The Arxiron sign-up screen, a dark interface with the red Arxiron blood donation branding",
    },
    summary:
      "A PWA that replaces the frantic phone-tree search for a blood donor with a ranked, distance-aware match — and live donor tracking the requester can actually follow.",
    challenge:
      "When somebody needs blood urgently, the search is a relative ringing everyone they know and messages forwarded through group chats until they reach someone who might help. It works, eventually. Eventually is the problem. The replacement had to reach compatible donors in seconds, respect medical eligibility rules, and never expose a donor's location beyond the person they chose to help.",
    approach: [
      "Split the system into two services that never call each other — identity owns accounts and sessions, platform owns donors, requests and matching — joined only by a shared JWT secret and a one-way Redis event stream",
      "Built matching on blood compatibility rather than type equality, filtered by availability, the 56-day donation cooldown, the search radius and each donor's own maximum travel distance, ranked nearest-first then most reliable",
      "Escalated unanswered requests automatically: a Celery beat job doubles the radius through 10, 20 and 40 km, capped at 50, notifying the donors earlier waves missed",
      "Kept access tokens out of the browser entirely — a BFF proxy attaches them from an httpOnly cookie, so a script injection has nothing to steal",
      "Shipped live donor location that is visible only to the requester, only while the donation is open, and never automatically",
      "Covered the two failure modes unit tests structurally cannot reach — a token crossing services, and an event crossing Redis — with 31 smoke checks against running containers",
    ],
    results: [
      { label: "Time to reach donors", value: "Phone tree to seconds" },
      { label: "Matching", value: "Compatibility, distance and eligibility aware" },
      { label: "Location privacy", value: "Requester-only, donation-scoped" },
    ],
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "Serwist PWA",
      "Leaflet",
      "FastAPI",
      "Python 3.12",
      "PostGIS",
      "Redis",
      "Celery",
      "Web Push",
    ],
    hue: 18,
  },
  {
    slug: "freight-visibility-platform",
    client: "Nordic freight marketplace",
    title: "A shipment visibility platform rebuilt for scale",
    industry: "Logistics",
    year: "2025",
    service: "Full-stack solutions",
    summary:
      "Replaced a batch-driven tracking tool with an event-sourced platform serving live shipment state to shippers and carriers.",
    challenge:
      "Tracking data arrived as overnight CSV drops from a dozen carriers, so the customer portal was always a day behind and support fielded the difference by phone. The existing monolith could not be extended without regressions.",
    approach: [
      "Mapped carrier feeds into a single normalised shipment event schema",
      "Introduced an ingestion service with idempotent replay for late or duplicate events",
      "Rebuilt the customer portal on Next.js with streamed server rendering",
      "Added end-to-end tracing so support could follow one shipment across services",
    ],
    results: [
      { label: "Tracking latency", value: "Overnight to under a minute" },
      { label: "Support contacts", value: "Materially reduced" },
      { label: "Carrier onboarding", value: "Weeks to days" },
    ],
    tech: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "AWS", "Terraform"],
    hue: 262,
  },
  {
    slug: "salesforce-org-remediation",
    client: "B2B medical devices distributor",
    title: "Untangling a decade-old Salesforce org",
    industry: "Healthcare distribution",
    year: "2025",
    service: "Salesforce solutions",
    summary:
      "An org assessment and staged remediation that moved critical automation into tested, deployable code.",
    challenge:
      "Years of overlapping workflow rules, process builders and triggers meant a single opportunity update could fire a dozen automations in an unpredictable order. Releases were manual and routinely broke quoting.",
    approach: [
      "Audited every automation and documented its real trigger order and owner",
      "Consolidated duplicated logic into a single Apex trigger framework",
      "Rebuilt quoting screens as Lightning Web Components with test coverage",
      "Introduced Salesforce DX with sandbox-to-production promotion",
    ],
    results: [
      { label: "Automations", value: "Consolidated and documented" },
      { label: "Apex coverage", value: "Raised above policy threshold" },
      { label: "Releases", value: "Manual to pipeline-driven" },
    ],
    tech: ["Apex", "LWC", "Flow", "Salesforce DX", "SOQL"],
    hue: 205,
  },
  {
    slug: "contract-review-assistant",
    client: "Commercial insurance group",
    title: "A contract review assistant with an audit trail",
    industry: "Insurance",
    year: "2026",
    service: "AI integrations",
    summary:
      "Retrieval over a policy archive, with clause-level citations and a review queue the compliance team controls.",
    challenge:
      "Underwriters answered coverage questions by searching a shared drive of thousands of policy documents. An earlier chatbot pilot was shelved because its answers could not be traced back to a source.",
    approach: [
      "Built a retrieval pipeline that preserves existing document access control",
      "Returned clause-level citations with every generated answer",
      "Shipped an evaluation harness so prompt changes are regression-tested",
      "Routed low-confidence answers into a human review queue with audit logging",
    ],
    results: [
      { label: "Answer provenance", value: "Citation on every response" },
      { label: "Research time", value: "Hours to minutes per query" },
      { label: "Compliance sign-off", value: "Approved for production" },
    ],
    tech: ["Claude", "Python", "pgvector", "LangGraph", "Azure"],
    hue: 158,
  },
  {
    slug: "embedded-platform-team",
    client: "Series B fintech",
    title: "Four embedded engineers through a platform migration",
    industry: "Fintech",
    year: "2025",
    service: "Staff augmentation",
    summary:
      "A squad embedded in the client's own process to carry a payments migration without pausing the product roadmap.",
    challenge:
      "The in-house team needed to move off a legacy payments provider while continuing to ship customer-facing features. Hiring for a nine-month project was not viable.",
    approach: [
      "Placed two backend, one frontend and one DevOps engineer inside existing squads",
      "Worked in the client's repos, board and review process from week one",
      "Ran the migration behind feature flags with dual-write and reconciliation",
      "Documented the new integration and handed it to the in-house team",
    ],
    results: [
      { label: "Ramp-up", value: "Productive inside two weeks" },
      { label: "Roadmap", value: "Feature delivery continued" },
      { label: "Handover", value: "Fully owned in-house at exit" },
    ],
    tech: ["TypeScript", "Node.js", "PostgreSQL", "Kubernetes", "Terraform"],
    hue: 322,
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
