import { Project, BlogPost, SkillCategory } from "./types";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    description: "Designing silky-smooth, highly interactive, and pixel-perfect customer interfaces.",
    skills: [
      { name: "React.js / Next.js", level: 95, iconName: "React" },
      { name: "TypeScript", level: 90, iconName: "TypeScript" },
      { name: "Tailwind CSS", level: 98, iconName: "Tailwind" },
      { name: "JavaScript (ES6+)", level: 95, iconName: "JS" },
      { name: "HTML5 & CSS3", level: 95, iconName: "HTML" }
    ]
  },
  {
    title: "Backend & Database",
    description: "Building resilient distributed APIs and data layers optimizing low-latency lookups.",
    skills: [
      { name: "Node.js & Express", level: 90, iconName: "Node" },
      { name: "REST APIs & GraphQL", level: 92, iconName: "API" },
      { name: "MongoDB & Mongoose", level: 88, iconName: "Mongo" },
      { name: "PostgreSQL & Prisma", level: 85, iconName: "SQL" }
    ]
  },
  {
    title: "Security & Auth",
    description: "Securing routes, encrypting claims, and establishing state-of-the-art sign-in boundaries.",
    skills: [
      { name: "BetterAuth Integration", level: 90, iconName: "Lock" },
      { name: "JWT & Cookie Protection", level: 92, iconName: "Shield" },
      { name: "Route & Role Protection", level: 95, iconName: "Key" }
    ]
  },
  {
    title: "AI Workflows & Workmanship",
    description: "Pioneering the hybrid standard, combining classic computer science with LLM copiloting.",
    skills: [
      { name: "AI Coding (Cursor / Bolt / v0)", level: 98, iconName: "Cpu" },
      { name: "Prompt Engineering Recipes", level: 95, iconName: "Terminal" },
      { name: "Automated AI Code Reviewing", level: 90, iconName: "Code" },
      { name: "CI/CD & Deployment (Vercel/Netlify)", level: 88, iconName: "Server" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "mern-health",
    title: "MERN Wellness & Nutrition Hub",
    subtitle: "AI-Informed Health Planner with Micro-Interactions",
    category: "Full-Stack",
    problem: "People struggle with health planning because standard trackers ask for tedious ingredient logging. Typical systems lack automated insight and run on bloated client engines that slow users down on the go.",
    solution: "A high-performance MERN Application leveraging Gemini-driven semantic text scanning to extract meals from conversational prompts. Combined with state-controlled visual calorie rings, modular trackers, and lightweight client state orchestration.",
    techStack: ["React", "Express.js", "MongoDB", "Node.js", "Tailwind CSS", "JWT", "Mongoose"],
    features: [
      "Natural Language Meal Extraction (just type: 'healthy avocado bagel')",
      "Secure JWT HttpOnly cookie rotation for zero-vulnerability auth state",
      "Dynamic wellness tracking utilizing SVG circular motion charts",
      "Robust Mongoose aggregation pathways for daily micro-nutrient trends"
    ],
    gallery: [
      {
        title: "Intelligent Meal Logging Prompt",
        description: "Recruiters can try typing food sentences and witness instantaneous key nutrients parse via AI extraction simulations.",
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Aggregation Summary Panel",
        description: "Interactive layout displaying visual stats on protein splits and macronutrients from MongoDB aggregation pipelines.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      }
    ],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: "saas-dashboard",
    title: "Clarity AI - Financial SaaS Dashboard",
    subtitle: "Predictive Analytics & High-Octane Data Grid",
    category: "SaaS",
    problem: "Enterprise finance administrators are overwhelmed by messy, un-optimized telemetry graphs and can rarely predict cash trends, leading to reactive inventory changes and sluggish cash workflows.",
    solution: "A premium dashboard powered by optimized React state, combining fluid custom D3 vectors, lazy-loaded virtual tables, and an autonomous AI forecasting companion indicating optimal cash windows.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Framer Motion", "lucide-react"],
    features: [
      "Dynamic interactive forecasting curves based on linear regression modules",
      "Virtual grid list supporting render cycles for thousands of ledger details in 60fps",
      "Tailwind-styled Glassmorphism with customizable card order and focus zooms",
      "One-click PDF financial layout builder with standard print previews"
    ],
    gallery: [
      {
        title: "Predictive Curve Analysis View",
        description: "Showing the AI Forecast toggling historical curves versus potential scenarios dynamically.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Virtualized Ledgers",
        description: "Instantly filterable columns managing massive transaction entries under a custom lightweight virtual DOM wrapper.",
        imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b446d2e4?auto=format&fit=crop&w=800&q=80"
      }
    ],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: "landing-page",
    title: "Axion AI - Autonomous Agents",
    subtitle: "Premium High-Conversion Agentic SaaS Landing Page",
    category: "Landing Page",
    problem: "Modern SaaS platforms often fail to convert high-tier enterprise clients because of visual clutter, sluggish load times, and a lack of immediate product-value simulations.",
    solution: "A beautiful, hyper-optimized scroll narrative page styled with Tailwind CSS 4. Focuses on premium typography (Montserrat), absolute grid alignment, seamless scroll-triggered state, and interactive visual flow diagrams.",
    techStack: ["React.js", "Vite", "Tailwind CSS 4", "motion/react", "lucide-react"],
    features: [
      "Staggered entrance and scroll narrative layouts",
      "Interactive agent playground simulating workflow automation in real time",
      "Hard-edged modern Minimalist layout contrasting off-white and deep slate",
      "Optimized assets pre-loading with standard SVG wireframes to achieve high Lighthouse scores"
    ],
    gallery: [
      {
        title: "Agent Playground Emulator",
        description: "Test configuring triggers and actions (e.g. 'When email arrives' -> 'Ask Gemini' -> 'Draft Reply') directly in the UI.",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "System Performance Telemetry",
        description: "Visual grid displaying cost comparisons between human-ops versus Axion automated loops.",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
      }
    ],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: "blog-app",
    title: "DevChronicles - AI Headless Blog",
    subtitle: "Self-Optimizing Knowledge Engine & Editor",
    category: "Blog",
    problem: "Writers are bogged down with boring static markdown text files. They lack on-the-fly metadata checks, precise structural formatting, or readable reading estimations for targeted audiences.",
    solution: "An elegant, responsive CMS & Blog with lightning-fast local full-text search, reading timers, clean category drawer filtering, and integrated interactive sandbox mock editor.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "BetterAuth", "LocalStorage", "lucide-react"],
    features: [
      "In-app rich-markdown editor simulation with live estimated read-time ticking",
      "Seamless client search returning instant, matched-string highlight paragraphs",
      "Dynamic in-memory storage keeping user comments, posts, and session favorites intact",
      "Social share system and fully responsive reading-drawer UI"
    ],
    gallery: [
      {
        title: "Intelligent Reader Mode",
        description: "A gorgeous layout with distraction-free typography (Montserrat body with high-contrast text rendering).",
        imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Live Rich Sandbox Editor",
        description: "An integrated writing suite designed for engineers, showcasing automated readability index calculation on every key stroke.",
        imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
      }
    ],
    githubUrl: "#",
    liveUrl: "#"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Death of Standard Boilerplate: AI Copiloting in 2026",
    slug: "death-of-boilerplate-2026",
    summary: "Why writing simple CRUD boilerplate is dead, and how full-stack engineers in 2026 use prompt-designed pipelines to speed up feature delivery.",
    category: "AI Workflows",
    tags: ["AI Tools", "Dev Velocity", "NextJS"],
    publishedAt: "2026-05-18",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    likes: 142,
    comments: [
      { id: "c1", author: "Recruiter Sarah", content: "Absolutely true. We now assess candidates on their AI workflows as much as core logic. Great writeup!", timestamp: "2026-05-19" },
      { id: "c2", author: "Dev Logan", content: "That workflow grid you outlined saved me hours. Sticking this to my team's standards.", timestamp: "2026-05-20" }
    ],
    content: `In 2026, the delta between a junior developer and a senior AI-Driven Full-Stack Engineer is not how fast they can recall standard express template syntax or write basic schema migrations. It’s their capacity for **intelligent design stewardship**.

### The Shift in Mental Modeling
Instead of wasting time writing manual database mappings, we now model systems by constructing pristine markdown specifications and injecting them into advanced developer contexts. 

### Why Prompt Engineering is Software Engineering
1. **Pristine Constraints**: Clear boundaries are defined up front (e.g., precise database indexes, authentication gates, and zero-re-render triggers).
2. **System Composability**: Instructing the system to keep logical files compact and single-focus prevents massive, single-file failures.
3. **Automated Review Cycles**: We test our outputs against standard rules before deploying.

By mastering tools like Cursor, Bolt, and custom LLM developer prompts, we ship complex full-stack features in hours rather than weeks, shifting our effort toward pixel-perfect design, structural optimization, and top-tier security standards.`
  },
  {
    id: "blog-2",
    title: "BetterAuth + TypeScript: Securing the Modern Client-Server Boundary",
    slug: "betterauth-and-typescript-2026",
    summary: "A practical evaluation of why BetterAuth is replacing legacy JWT libraries, focusing on type-safe sessions, server actions, and route protection.",
    category: "Security",
    tags: ["BetterAuth", "TypeScript", "Node.js"],
    publishedAt: "2026-06-02",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    likes: 89,
    comments: [],
    content: `Security has always been a moving target, but the rise of client-server hyper-hydration required a standard that guarantees type safety from the server to the client.

### Enter BetterAuth
BetterAuth represents an impressive shift. It completely eliminates the disconnect between backend session databases and the client's type states.

### Key Competitive Edge
- **TypeScript Native Autocomplete**: Every custom property on user session models flows cleanly into client context.
- **Robust Out-Of-The-Box Multi-Tenant Isolation**: Features session revoking and cookie-state protection mechanisms right inside normal developer middleware.
- **Flawless Route Protection**: Simple middleware guards can be written with declarative security, making it easier than ever to avoid unprotected API routes.

In this portfolio's Projects, you can see how route protection and claims-based restrictions ensure that private dashboard analytics remain completely private.`
  },
  {
    id: "blog-3",
    title: "AI as a Senior Reviewer: Automating Precision in Code Pipelines",
    slug: "ai-as-senior-reviewer",
    summary: "Setting up lightweight, automated reviewer triggers to verify strict typescript rules, prevent infinite react effect rendering, and optimize design system continuity.",
    category: "Modern Workflows",
    tags: ["AI Workflows", "CI/CD", "Quality Rules"],
    publishedAt: "2026-06-08",
    readTime: "3 min read",
    coverImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80",
    likes: 176,
    comments: [
      { id: "c3", author: "Tech Lead James", content: "Automated linting for custom React closures is a game changer. We need this on our code bases.", timestamp: "2026-06-09" }
    ],
    content: `For years, developers dreaded pull-request cycles. Typo feedback, missed syntax styles, or forgotten dependencies delayed production.

Using targeted review rules, the AI automatically acts as a Senior Reviewer before files are committed:

### What the AI Review Pipeline Inspects
1. **React State Closures**: Flagging nested functions inside \`useEffect\` triggers that lack memoization or stable state primitives.
2. **Type Casting Integrity**: Replaces lazy \`any\` types with appropriate type parameters or unions.
3. **Consistency of Design Accents**: Evaluates classes against the Tailwind standard grid alignment rules.

This automated pre-validation allows engineering leaders to focus their brainpower on high-level architecture rather than grammar verification of variables.`
  }
];
