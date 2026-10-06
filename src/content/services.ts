export type Service = {
  slug: string;
  title: string;
  summary: string;
  outcomes: string[];
  deliverables: string[];
  tech: string[];
};

export const services: Service[] = [
  {
    slug: "full-stack",
    title: "Full-stack solutions",
    summary:
      "Product engineering end to end — web apps, APIs, data models and the cloud they run on. One team from schema to ship.",
    outcomes: [
      "Replace fragile internal tooling with a system your team can extend",
      "Take a validated prototype to a production-grade platform",
      "Cut page loads and job runtimes that are costing you customers",
    ],
    deliverables: [
      "Architecture and data model you own",
      "Typed APIs with contract tests",
      "CI/CD, infrastructure as code, observability",
      "Runbooks and handover documentation",
    ],
    tech: ["TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL", "AWS", "Terraform"],
  },
  {
    slug: "salesforce",
    title: "Salesforce solutions",
    summary:
      "Implementation, custom development and rescue work across Sales, Service and Experience Cloud — built to survive the next admin.",
    outcomes: [
      "Untangle an org that has grown past its original design",
      "Connect Salesforce to the rest of your stack without nightly CSVs",
      "Replace manual ops with governed, tested automation",
    ],
    deliverables: [
      "Org assessment with a prioritised remediation plan",
      "Apex and Lightning Web Components under test coverage",
      "Integration layer to your product, ERP and warehouse",
      "Deployment pipeline with sandbox-to-prod promotion",
    ],
    tech: ["Apex", "LWC", "Flow", "SOQL", "MuleSoft", "Salesforce DX"],
  },
  {
    slug: "ai-integrations",
    title: "AI integrations",
    summary:
      "LLM features wired into real systems — retrieval over your own data, agents with guardrails, and evaluation so you can trust the output.",
    outcomes: [
      "Answer internal questions from your documents instead of tribal knowledge",
      "Automate review and classification work that scales with headcount today",
      "Ship an assistant your compliance team will actually sign off on",
    ],
    deliverables: [
      "Retrieval pipeline over your sources with access control preserved",
      "Evaluation harness and regression suite for prompts and tools",
      "Cost, latency and fallback budgets per feature",
      "Human-in-the-loop review paths and audit logging",
    ],
    tech: ["Claude", "LangGraph", "pgvector", "Python", "TypeScript", "Snowflake"],
  },
  {
    slug: "data-ml",
    title: "Data & ML pipelines",
    summary:
      "ETL that runs on time and fails loudly, a warehouse people trust, and models that get retrained rather than quietly rotting.",
    outcomes: [
      "Replace brittle overnight scripts nobody wants to touch",
      "Give analysts one number for revenue instead of four",
      "Get a model out of a notebook and into something on-call can support",
    ],
    deliverables: [
      "Orchestrated pipelines with retries, backfills and alerting",
      "Modelled warehouse with tested transformations and lineage",
      "Training and inference pipelines with versioned data and models",
      "Monitoring for drift, freshness and cost",
    ],
    tech: ["Airflow", "dbt", "Spark", "Kafka", "Snowflake", "BigQuery", "MLflow", "Python"],
  },
  {
    slug: "staff-augmentation",
    title: "Staff augmentation",
    summary:
      "Engineers who join your team, not a black-box vendor. Same standups, same board, same definition of done.",
    outcomes: [
      "Add senior capacity without a six-month hiring cycle",
      "Bring in Salesforce or AI specialists for one phase of the roadmap",
      "Keep delivery moving through parental leave, attrition or a crunch",
    ],
    deliverables: [
      "Shortlist of vetted engineers within a week",
      "Two-week ramp-up with a named delivery lead",
      "Your tooling, your process, your code review",
      "Monthly rolling terms — scale up or down",
    ],
    tech: ["Frontend", "Backend", "Salesforce", "Data", "DevOps", "AI/ML"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
