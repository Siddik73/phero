import React, { useState } from "react";
import { Download, Printer, X, Check, Edit2, Sparkles, Building, Briefcase, Award } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const [companyName, setCompanyName] = useState("");
  const [selectedRoleType, setSelectedRoleType] = useState<"general" | "frontend" | "backend" | "fullstack">("fullstack");
  const [includeAIWorkflows, setIncludeAIWorkflows] = useState(true);
  const [tempCustomCompany, setTempCustomCompany] = useState("");

  const handleDownloadTxt = () => {
    let resumeText = `ALEX RIVERA - AI-Driven Full-Stack Web Engineer in 2026
Email: kaoshik124@gmail.com | Portfolio URL: 2026-portfolio-rivera.app
--------------------------------------------------

EXECUTIVE SUMMARY:
Adaptive, AI-augmented Senior Full-Stack Engineer merging core computer science (TypeScript, React, Node.js) with 2026 state-of-the-art LLM prompt-engineering architectures. ${
      companyName 
        ? `Specially customized overview prepared for leaders at ${companyName}.` 
        : "Specialized in lowering engineering friction, delivering feature branches in hours, and maintaining zero-bug production thresholds."
    }

TECHNICAL EXPERTISE:
* Frontend: HTML5, CSS3, Tailwind CSS, TypeScript, React.js, Next.js, Framer Motion
* Backend & Databases: Node.js, Express.js, REST APIs, GraphQL, MongoDB, Mongoose, PostgreSQL
* Authentication & Security: BetterAuth, JWT, Cookie-based state, Protected Routing
* AI Workflows: AI Copilots (Cursor, Bolt, v0), Prompt Recipes, Automated LLM Code Reviews
* Deployment & Tools: Git, GitHub Actions, Vercel, Netlify, Docker, CI/CD

SELECTED PROJECTS:
1. MERN Health & Wellness Platform
   - Backend in MongoDB/Express, client in React/Tailwind. Integrates Gemini text meal-parsing extraction simulation.
2. Clarity AI Financial SaaS Dashboard
   - Client-server ledger reporting displaying 10,000+ transaction points virtualized at 60fps utilizing custom Recharts models.
3. Axion AI Agents Landing Page
   - Scroll-narrative high conversion portal with custom trigger-action workspace automations playground.
4. DevChronicles Headless CMS & Blog
   - Real-time client full-text search with dynamic read-time calculator and local comments engine.

WORK EXPERIENCE:
* Senior AI Full-Stack Developer - CloudCraft Labs (2024 - Present)
  - Boosted development output 3.5x by launching AI-assisted coding standards, utilizing custom Prompt Engineering pipelines, and automating CI/CD unit testing.
  - Engineered fully-protected internal dashboards incorporating BetterAuth and custom JWT route safety.
* Web Developer II - VectorMedia Software (2022 - 2024)
  - Designed responsive React/NextJS frontends and RESTful API integrations in Node.js, improving load-time averages by 40% using Tailwind grid optimizations.

EDUCATION:
* Bachelor of Science in Computer Science - Tech Institute of Engineering (Graduated 2022)
* Certification: Advanced Prompt Engineering & Modern LLM Tooling Architectures (2025)
`;

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Alex_Rivera_Resume_2026${companyName ? `_for_${companyName.replace(/\s+/g, "_")}` : ""}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0f10]/85 backdrop-blur-md p-4 overflow-y-auto">
      {/* Modal Card */}
      <div className="relative bg-[#191c1e] border border-[#272a2c] w-full max-w-5xl rounded-xl shadow-2xl flex flex-col lg:flex-row max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Style block for printing Resume strictly as a gorgeous single page, hiding controls */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body * {
              visibility: hidden !important;
            }
            #printable-resume-area, #printable-resume-area * {
              visibility: visible !important;
            }
            #printable-resume-area {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              height: auto !important;
              background: white !important;
              color: black !important;
              padding: 0 !important;
              margin: 0 !important;
              box-shadow: none !important;
              border: none !important;
            }
            #printable-resume-area .print-text-dark {
              color: #111 !important;
            }
            #printable-resume-area .print-text-muted {
              color: #444 !important;
            }
            #printable-resume-area .print-border {
              border-color: #333 !important;
            }
            #printable-resume-area .print-bg-gray {
              background-color: #eee !important;
              color: #111 !important;
            }
            /* auto scale to target screen */
            @page {
              size: letter;
              margin: 0.5in;
            }
          }
        `}} />

        {/* Sidebar Controls - Lefthand Column */}
        <div className="w-full lg:w-80 bg-[#0A0A0A] border-r border-[#333] p-6 lg:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F27D26]" />
                <h4 className="font-bold text-sm text-white tracking-wide uppercase">
                  Resume Customizer
                </h4>
              </div>
              <button 
                onClick={onClose}
                className="lg:hidden p-1 rounded-none hover:bg-[#333] text-[#AAAAAA] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#AAAAAA] mb-6 leading-relaxed">
              Dynamically calibrate properties of my resume depending on your open role requirements. See updates reflect live!
            </p>

            {/* Field: Hiring Company */}
            <div className="mb-6">
              <label className="block text-[10px] font-mono text-[#666] tracking-widest uppercase mb-2">
                Your Company Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 w-4 h-4 text-[#666]" />
                <input
                  type="text"
                  placeholder="e.g. Google, Vercel"
                  value={tempCustomCompany}
                  onChange={(e) => {
                    setTempCustomCompany(e.target.value);
                    setCompanyName(e.target.value);
                  }}
                  className="w-full bg-[#121212] text-xs font-semibold rounded-none pl-9 pr-3 py-2 border border-[#333] text-white focus:outline-none focus:border-[#F27D26] transition-colors font-mono"
                />
              </div>
            </div>

            {/* Field: Targeted Role Profile */}
            <div className="mb-6">
              <label className="block text-[10px] font-mono text-[#909097] tracking-widest uppercase mb-2">
                Target Role Alignment
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { id: "fullstack", label: "Full-Stack Engineer (AI Expert)" },
                  { id: "frontend", label: "Frontend-Leaning Web Dev" },
                  { id: "backend", label: "Backend Core Architect" },
                  { id: "general", label: "General SWE Portfolio" },
                ].map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRoleType(role.id as any)}
                    className={`text-left text-xs px-3 py-2 border transition-all flex items-center justify-between rounded-none ${
                      selectedRoleType === role.id
                        ? "bg-[#F27D26]/10 border-[#F27D26] text-white font-semibold"
                        : "bg-[#121212] border-[#333] text-[#AAAAAA] hover:text-white"
                    }`}
                  >
                    <span>{role.label}</span>
                    {selectedRoleType === role.id && <Check className="w-3.5 h-3.5 text-[#F27D26]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle: AI Copiloted Workflows */}
            <div className="mb-6">
              <label className="block text-[9px] font-mono text-[#666] tracking-widest uppercase mb-2">
                Workmanship Section
              </label>
              <button
                onClick={() => setIncludeAIWorkflows(!includeAIWorkflows)}
                className={`w-full flex items-center justify-between px-3 py-2 border text-xs transition-all rounded-none ${
                  includeAIWorkflows
                    ? "bg-[#F27D26]/10 border-[#F27D26] text-white"
                    : "bg-[#121212] border-[#333] text-[#AAAAAA]"
                }`}
              >
                <span>Include AI Co-driving Details</span>
                <span className={`w-8 h-4 p-0.5 transition-colors rounded-none ${includeAIWorkflows ? "bg-[#F27D26]" : "bg-[#333]"}`}>
                  <span className={`block w-3 h-3 bg-white transition-transform ${includeAIWorkflows ? "translate-x-4" : "translate-x-0"}`} />
                </span>
              </button>
            </div>
          </div>

          {/* Core Action Buttons */}
          <div className="flex flex-col gap-2 pt-6 border-t border-[#333]">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 w-full p-2.5 bg-[#F27D26] hover:bg-[#ff9647] text-[10px] uppercase tracking-widest font-bold text-black transition-all active:scale-[98%] rounded-none"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF Resume
            </button>
            <button
              onClick={handleDownloadTxt}
              className="flex items-center justify-center gap-2 w-full p-2.5 bg-[#121212] hover:bg-[#1A1A1A] text-[10px] uppercase tracking-widest font-bold text-white border border-[#333] hover:text-[#F27D26] transition-all active:scale-[98%] rounded-none"
            >
              <Download className="w-4 h-4" />
              Download Plain-Text (.txt)
            </button>
          </div>
        </div>

        {/* Live Resume Sheet View - Righthand Column */}
        <div className="flex-1 bg-[#0F0F0F] flex flex-col overflow-hidden">
          {/* Top Modal Header bar containing actions */}
          <div className="bg-[#121212] border-b border-[#333] px-6 py-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono text-[#F27D26] bg-[#F27D26]/10 px-2.5 py-1 rounded-none border border-[#F27D26]/20 font-bold">
                Live Document Engine
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="hidden lg:flex items-center justify-center p-1.5 bg-[#050505] border border-[#333] rounded-none text-[#AAAAAA] hover:text-white hover:border-[#F27D26]/40 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Box */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-[#0A0A0A]/50">
            {/* White paper layout wrapper mimicking physical page ratios */}
            <div 
              id="printable-resume-area" 
              className="mx-auto max-w-[800px] bg-white text-[#1e293b] p-6 sm:p-10 rounded-none shadow-xl font-sans relative text-left leading-relaxed text-xs border border-gray-200"
            >
              {/* Profile Watermark or Indicator strictly styled for visual beauty */}
              <div className="absolute right-10 top-10 pointer-events-none opacity-5 flex flex-col items-end">
                <Award className="w-16 h-16 text-black" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider">AI Architect</span>
              </div>

              {/* Document Header */}
              <div className="border-b print-border border-gray-300 pb-5 mb-5">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight uppercase tracking-tight print-text-dark">
                  Alex Rivera
                </h1>
                <p className="text-sm font-semibold text-[#F27D26] print-text-dark uppercase tracking-wider mt-1">
                  {selectedRoleType === "fullstack" && "AI-Driven Full-Stack Web Engineer"}
                  {selectedRoleType === "frontend" && "Senior Front-End Specialist & Brand Designer"}
                  {selectedRoleType === "backend" && "High-Performance Backend & REST Architect"}
                  {selectedRoleType === "general" && "Full-Stack Software Development Engineer"}
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-[10px] text-gray-500 font-mono print-text-muted">
                  <div>📍 San Francisco, CA</div>
                  <div>✉️ kaoshik124@gmail.com</div>
                  <div>🔗 kaoshik-rivera.dev</div>
                  <div>🐱 github.com/kaoshik124</div>
                </div>
              </div>

              {/* Section: Executive Summary */}
              <div className="mb-5 text-gray-700 font-normal leading-relaxed print-text-dark">
                <h4 className="text-[11px] font-bold text-gray-950 uppercase tracking-widest border-b print-border border-gray-200 pb-1.5 mb-2">
                  Executive Alignment
                </h4>
                <p className="text-xs">
                  Proactive Software Engineer pioneering multi-channel product builds, combining core computer science architectures (HTML5, CSS3, ES6+, TS, React, and Next) with optimized 2026 workflows (AI copilot setups, Cursor templates, and code evaluations). 
                  {companyName ? (
                    <span className="font-semibold text-gray-900 bg-purple-50 px-1 py-0.5 rounded border border-purple-100 ml-1 print-text-dark print-bg-gray">
                       Specifically aligned to assist with upcoming full-stack development grids at {companyName}.
                    </span>
                  ) : (
                    " Proven at eliminating administrative engineering debt, completing modular REST branches in hours instead of physical sprints while upholding high code durability thresholds."
                  )}
                </p>
              </div>

              {/* Section: Key Strengths Matrix */}
              <div className="mb-5 text-gray-700 print-text-dark">
                <h4 className="text-[11px] font-bold text-gray-950 uppercase tracking-widest border-b print-border border-gray-200 pb-1.5 mb-2">
                  Expertise Matrix
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <span className="font-bold text-gray-900">Frontend Technology:</span> React.js, NextJS, TypeScript, Tailwind CSS, HTML5/CSS3, Framer Motion
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">Backend & Server:</span> Node.js, Express.js, REST APIs, Mongoose structures, PostgreSQL queries
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">Security & Sign-In:</span> BetterAuth standards, JWT claims tokens, Session cookies, Protected parameters
                  </div>
                  {includeAIWorkflows ? (
                    <div>
                      <span className="font-bold text-[#F27D26] print-text-dark">Workmanship (2026 Standard):</span> Prompt Orchestrating, AI review flows, Cursor & Bolt compilation, CI/CD pipelines
                    </div>
                  ) : (
                    <div>
                      <span className="font-bold text-gray-900">Infrastructure Tools:</span> Git, GitHub Actions, Vercel, Netlify deployments, Docker orchestration
                    </div>
                  )}
                </div>
              </div>

              {/* Section: Professional Direct Work Experience */}
              <div className="mb-5 text-gray-700 print-text-dark">
                <h4 className="text-[11px] font-bold text-gray-950 uppercase tracking-widest border-b print-border border-gray-200 pb-1.5 mb-3">
                  Professional Experience
                </h4>
                
                {/* Job 1 */}
                <div className="mb-4">
                  <div className="flex justify-between items-start font-medium text-gray-900 print-text-dark">
                    <div>
                      <span className="font-bold text-gray-950">Senior AI-Augmented Developer</span> | CloudCraft Labs
                    </div>
                    <div className="text-[10px] font-mono text-gray-500 text-right print-text-muted">2024 - PRESENT</div>
                  </div>
                  <ul className="list-disc list-inside mt-1.5 space-y-1 text-gray-600 print-text-muted pl-1">
                    <li>Multiplied module completion rate 3x through prompt engineering design specs and strict Cursor copiloted workflows.</li>
                    <li>Designed fully secure, cookie-protected user portal modules incorporating BetterAuth verification loops.</li>
                    <li>Implemented high-performance SVG graphics matrices yielding dynamic, non-blocking visual feedback cycles.</li>
                  </ul>
                </div>

                {/* Job 2 */}
                <div>
                  <div className="flex justify-between items-start font-medium text-gray-900 print-text-dark">
                    <div>
                      <span className="font-bold text-gray-950">Full-Stack Software Developer</span> | VectorMedia Software
                    </div>
                    <div className="text-[10px] font-mono text-gray-500 text-right print-text-muted">2022 - 2024</div>
                  </div>
                  <ul className="list-disc list-inside mt-1.5 space-y-1 text-gray-600 print-text-muted pl-1">
                    <li>Pioneered rapid responsive landing page templates using Tailwind CSS, lowering bounce rates by 22%.</li>
                    <li>Orchestrated heavy MongoDB document pipelines inside Express routes to aggregate user behavioral logs.</li>
                    <li>Developed responsive interface modals allowing single-session in-memory mock inputs to simulate server endpoints.</li>
                  </ul>
                </div>
              </div>

              {/* Section: Academic Degrees & Extra Training */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t print-border border-gray-200 pt-3 text-gray-700 print-text-dark">
                <div>
                  <h5 className="text-[11px] font-bold text-gray-950 uppercase tracking-wider mb-1.5">
                    Academic Background
                  </h5>
                  <p className="font-semibold text-gray-900 print-text-dark text-xs">
                    Tech Institute of Engineering
                  </p>
                  <p className="text-gray-500 print-text-muted text-[11px] font-mono">
                    B.S. in Computer Science | Graduated 2022
                  </p>
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-gray-950 uppercase tracking-wider mb-1.5">
                    Continuing Education
                  </h5>
                  <p className="font-semibold text-gray-900 print-text-dark text-xs">
                    Credential: AI Web Architect in 2026
                  </p>
                  <p className="text-gray-500 print-text-muted text-[11px] font-mono">
                    Validation: Prompt Recipes & Code Guardrails
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
export { ResumeModal };
