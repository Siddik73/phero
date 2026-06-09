import React, { useState } from "react";
import { Project } from "../types";
import { Cpu, Code, Shield, Terminal, ArrowRight, CheckCircle2, Sliders, Play, Edit, HelpCircle, FileText, ChevronRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  key?: string;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [activeTab, setActiveTab] = useState<"spec" | "sandbox">("sandbox");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // MERN Sandbox state
  const [foodPrompt, setFoodPrompt] = useState("A warm bowl of steel-cut oats with fresh blueberries and almond honey drizzle.");
  const [parseLog, setParseLog] = useState<string[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedNutrients, setParsedNutrients] = useState({
    calories: 320,
    carbs: 58,
    protein: 9,
    fat: 6,
    score: "Optimal"
  });

  // SaaS Sandbox state
  const [saasInput, setSaasInput] = useState({
    baseRevenue: 12000,
    growthRate: 15,
    churnValue: 2.1
  });

  // Landing Page automation state
  const [selectedTrigger, setSelectedTrigger] = useState("New Pull Request");
  const [selectedAction, setSelectedAction] = useState("Generate AI Code Review");
  const [flowLog, setFlowLog] = useState<string[]>([]);
  const [isFlowRunning, setIsFlowRunning] = useState(false);

  // Blog CMS state
  const [draftContent, setDraftContent] = useState("# Next-Gen Architectures\n\nAI is reshaping developer output in 2026. This live sandbox analyzes vocabulary density and metrics as you compose!");

  // MERN Parse algorithm simulation
  const handleParseFood = () => {
    if (!foodPrompt.trim()) return;
    setIsParsing(true);
    setParseLog(["💡 Reading prompt tokens...", "🚀 Launching Gemini NLP Parser...", "📡 Translating raw food descriptors into aggregate weights..."]);
    
    setTimeout(() => {
      setParseLog(prev => [...prev, "🗄️ Querying nutritional density index...", "📊 Merging MongoDB macro-nutrients pathway..."]);
      
      setTimeout(() => {
        let calories = 200 + Math.floor(Math.random() * 350);
        let carbs = 20 + Math.floor(Math.random() * 60);
        let protein = 5 + Math.floor(Math.random() * 25);
        let fat = 3 + Math.floor(Math.random() * 15);
        
        let score = "Optimal Balance";
        if (protein > 15) score = "High Protein";
        else if (carbs > 50) score = "Carb Rich";
        else if (fat > 12) score = "Moderate Fat";

        setParsedNutrients({ calories, carbs, protein, fat, score });
        setParseLog(prev => [...prev, `✅ Complete: Found ${calories}kcal | ${protein}g Protein | ${carbs}g Carbs.`]);
        setIsParsing(false);
      }, 700);
    }, 600);
  };

  // SaaS Calculator
  const cashProjection = Array.from({ length: 6 }).map((_, idx) => {
    const month = idx + 1;
    let growth = Math.pow(1 + saasInput.growthRate / 100, month);
    let rawRevenue = saasInput.baseRevenue * growth;
    let churnFactor = saasInput.churnValue * month * 0.015;
    let netRevenue = Math.round(rawRevenue * (1 - churnFactor));
    return { month, revenue: netRevenue, growthPct: Math.round(growth * 100) - 100 };
  });

  // Action flow simulation
  const handleRunFlow = () => {
    setIsFlowRunning(true);
    setFlowLog([`⚡ Action Hook triggered on event: "${selectedTrigger}"`, `🔍 Inspecting webhook metadata parameters...`, `🤖 Invoking Agent Model: "${selectedAction}"`]);
    
    setTimeout(() => {
      setFlowLog(prev => [...prev, `📂 Injecting code repository context into LLM schema...`, `⚙️ Running validation suites on branch 02-hotfix...`]);
      
      setTimeout(() => {
        setFlowLog(prev => [...prev, `✅ Action Executed Successfully in 118ms! Output drafted.`, `✉️ Recruiter notified at: alex@rivera.dev`]);
        setIsFlowRunning(false);
      }, 900);
    }, 800);
  };

  // CMS dynamic metrics
  const wordCount = draftContent.trim() ? draftContent.trim().split(/\s+/).length : 0;
  const estimatedReadTimeSec = Math.max(1, Math.round((wordCount / 220) * 60));
  const readabilityIndex = draftContent.length > 50 ? "Grade 10 (Mid Technical)" : "Grade 6 (General Public)";

  return (
    <div className="bg-[#121212] border border-[#333] rounded-none overflow-hidden hover:border-[#F27D26]/40 transition-[border-color] duration-300 shadow-xl flex flex-col xl:flex-row group">
      
      {/* Visual / Gallery panel - Left column for XL */}
      <div className="w-full xl:w-[45%] bg-[#0A0A0A] flex flex-col justify-between border-b xl:border-b-0 xl:border-r border-[#333]">
        {/* Main image window */}
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] uppercase font-mono tracking-wider text-[#F27D26] bg-[#F27D26]/10 px-2.5 py-1 rounded-none border border-[#F27D26]/30 font-bold">
              {project.category} Codebase
            </span>
            <div className="flex gap-1">
              {project.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-2 h-2 transition-all ${
                    activeImageIndex === index ? "bg-[#F27D26] w-5" : "bg-[#333] hover:bg-[#F27D26]/40"
                  }`}
                  title={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="relative aspect-video rounded-none overflow-hidden border border-[#333] bg-[#121212] group-hover:border-[#F27D26]/20 transition-colors">
            <img
              src={project.gallery[activeImageIndex].imageUrl}
              alt={project.gallery[activeImageIndex].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
            {/* Image Overlay explanation */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#020202] via-[#020202]/95 to-transparent p-4">
              <h5 className="font-bold text-xs text-white">
                {project.gallery[activeImageIndex].title}
              </h5>
              <p className="text-[11px] text-[#c6c6cd] mt-1 leading-relaxed">
                {project.gallery[activeImageIndex].description}
              </p>
            </div>
          </div>
        </div>

        {/* Spec Overview detail */}
        <div className="p-6 pt-2">
          <h4 className="font-bold text-lg text-white mb-2 leading-snug">
            {project.title}
          </h4>
          <p className="text-xs text-[#c6c6cd] leading-relaxed mb-4">
            {project.subtitle}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[9px] font-mono font-bold uppercase tracking-wider bg-[#121212] border border-[#333] text-[#AAAAAA] px-2.5 py-0.5 rounded-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Narrative Section - Right column */}
      <div className="flex-1 bg-[#0D0D0D] flex flex-col min-h-[500px]">
        {/* Toggle bar between spec sheet and interactive sandbox simulation! */}
        <div className="flex border-b border-[#333] bg-[#121212]">
          <button
            onClick={() => setActiveTab("sandbox")}
            className={`flex-1 py-4 text-center text-[10px] uppercase font-bold tracking-widest transition-all border-b-2 flex items-center justify-center gap-2 ${
              activeTab === "sandbox"
                ? "border-[#F27D26] text-white bg-[#0D0D0D]"
                : "border-transparent text-[#666] hover:text-[#AAAAAA] hover:bg-[#333]/20"
            }`}
          >
            <Terminal className="w-4 h-4 text-[#F27D26]" />
            RECRUITER LIVE SANDBOX
          </button>
          
          <button
            onClick={() => setActiveTab("spec")}
            className={`flex-1 py-4 text-center text-[10px] uppercase font-bold tracking-widest transition-all border-b-2 flex items-center justify-center gap-2 ${
              activeTab === "spec"
                ? "border-[#F27D26] text-white bg-[#0D0D0D]"
                : "border-transparent text-[#666] hover:text-[#AAAAAA] hover:bg-[#333]/20"
            }`}
          >
            <FileText className="w-4 h-4 text-[#F27D26]" />
            CASE SPECIFICATION
          </button>
        </div>

        {/* Tab 1: CASE SPEC SHEET */}
        {activeTab === "spec" && (
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between overflow-y-auto max-h-[500px]">
            <div className="space-y-6">
              {/* Problem/Challenge Box */}
              <div>
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#666] block mb-1">
                  The Core Friction Point
                </span>
                <p className="text-xs text-[#AAAAAA] leading-relaxed pl-3 border-l-2 border-red-500/50">
                  {project.problem}
                </p>
              </div>

              {/* Solution Box */}
              <div>
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#F27D26] block mb-1">
                  The Architected Delivery
                </span>
                <p className="text-xs text-white leading-relaxed pl-3 border-l-2 border-[#F27D26]/70">
                  {project.solution}
                </p>
              </div>

              {/* Key Features Bullet Grid */}
              <div>
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#666] block mb-2">
                  Standard Built Features
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#F27D26] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#AAAAAA] leading-tight">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Live Action Footer links */}
            <div className="flex gap-4 pt-6 mt-6 border-t border-[#333]">
              <a
                href={project.githubUrl}
                className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-[#AAAAAA] hover:text-white transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <Code className="w-4 h-4 text-[#F27D26]" />
                Explore Repository
              </a>
              <a
                href={project.liveUrl}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-white group-hover:text-[#F27D26] transition-all"
                onClick={(e) => e.preventDefault()}
              >
                Launch Live Interface
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        )}

        {/* Tab 2: RECRUITER LIVE SANDBOX */}
        {activeTab === "sandbox" && (
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between overflow-y-auto max-h-[500px] bg-[#050505]/60">
            
            {/* CONDITIONAL SANDBOX BY PROJECT ID */}
            
            {/* Case A: MERN HEALTH */}
            {project.id === "mern-health" && (
              <div className="space-y-4">
                <div className="bg-[#121212] border border-[#333] p-4 rounded-none">
                  <h5 className="text-[11px] uppercase tracking-wider font-bold text-white mb-1.5 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#F27D26]" />
                    AI Text Extractor Panel (MERN Client API Sim)
                  </h5>
                  <p className="text-[11px] text-[#AAAAAA] mb-3 leading-relaxed">
                    Rather than typing calories manually, enter a food description. Our mock Gemini parser translates details into clean macronutrient charts and updates database state.
                  </p>

                  <textarea
                    rows={2}
                    value={foodPrompt}
                    onChange={(e) => setFoodPrompt(e.target.value)}
                    placeholder="Describe what you ate..."
                    className="w-full bg-[#050505] border border-[#333] rounded-none p-3 text-xs text-white font-mono focus:outline-none focus:border-[#F27D26] transition-colors resize-none"
                  />

                  <button
                    onClick={handleParseFood}
                    disabled={isParsing}
                    className="mt-3 flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-[#F27D26] hover:bg-[#ff9647] disabled:bg-[#333] rounded-none text-[10px] uppercase tracking-widest font-bold text-black transition-colors disabled:cursor-not-allowed"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {isParsing ? "Scanning Macro Profiles..." : "Extract Dietary Nutrients"}
                  </button>
                </div>

                {/* Parser Outputs / Terminal logs & Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Console logs */}
                  <div className="bg-[#050505] rounded-none p-3 border border-[#333] font-mono text-[10px] h-32 overflow-y-auto text-gray-400">
                    <p className="text-[9px] font-bold text-white uppercase tracking-wider mb-2 border-b border-[#333] pb-1">
                      Aggregator Logs
                    </p>
                    {parseLog.length === 0 ? (
                      <p className="text-gray-600 italic">Console idle. Type prompt above and generate metadata.</p>
                    ) : (
                      parseLog.map((log, i) => (
                        <p key={i} className="mb-1 leading-snug animate-fade-in">{log}</p>
                      ))
                    )}
                  </div>

                  {/* Calculated metrics visual cards */}
                  <div className="bg-[#121212] border border-[#333] rounded-none p-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] text-[#666] font-mono uppercase tracking-wider block mb-1">
                        Current Aggregate State
                      </span>
                      <div className="grid grid-cols-4 gap-1 text-center">
                        <div className="bg-[#050505] rounded-none py-1 border border-[#333]">
                          <span className="block text-xs font-bold text-white">{parsedNutrients.calories}</span>
                          <span className="text-[8px] text-[#666] uppercase">Kcal</span>
                        </div>
                        <div className="bg-[#050505] rounded-none py-1 border border-[#333]">
                          <span className="block text-xs font-bold text-white">{parsedNutrients.carbs}g</span>
                          <span className="text-[8px] text-[#666] uppercase">Carb</span>
                        </div>
                        <div className="bg-[#050505] rounded-none py-1 border border-[#333]">
                          <span className="block text-xs font-bold text-white">{parsedNutrients.protein}g</span>
                          <span className="text-[8px] text-[#666] uppercase">Prot</span>
                        </div>
                        <div className="bg-[#050505] rounded-none py-1 border border-[#333]">
                          <span className="block text-xs font-bold text-white">{parsedNutrients.fat}g</span>
                          <span className="text-[8px] text-[#666] uppercase">Fat</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#333] flex items-center justify-between mt-2">
                      <span className="text-[9px] font-mono text-[#666]">Classifier:</span>
                      <span className="text-[10px] font-bold text-[#F27D26] bg-[#F27D26]/10 border border-[#F27D26]/20 px-2 py-0.5 rounded-none">
                        {parsedNutrients.score}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Case B: SAAS FINANCIAL DASHBOARD */}
            {project.id === "saas-dashboard" && (
              <div className="space-y-4">
                <div className="bg-[#121212] border border-[#333] p-4 rounded-none">
                  <h5 className="text-[11px] uppercase tracking-wider font-bold text-white mb-2 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#F27D26]" />
                    Interactive Cash Projection Tuner
                  </h5>
                  <p className="text-[11px] text-[#AAAAAA] mb-4 leading-relaxed">
                    Adjust company metrics below to calculate real-time net recurring revenue targets based on compound churn models. Fulfills optimized SVG path vectors.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Input Slider 1 */}
                    <div>
                      <div className="flex justify-between text-[10px] font-mono mb-1">
                        <span className="text-[#666]">BASE MRR</span>
                        <span className="text-white">${saasInput.baseRevenue.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="5000"
                        max="50000"
                        step="1000"
                        value={saasInput.baseRevenue}
                        onChange={(e) => setSaasInput({ ...saasInput, baseRevenue: parseInt(e.target.value) })}
                        className="w-full accent-[#F27D26]"
                      />
                    </div>

                    {/* Input Slider 2 */}
                    <div>
                      <div className="flex justify-between text-[10px] font-mono mb-1">
                        <span className="text-[#666]">MONTHLY GROWTH</span>
                        <span className="text-white">+{saasInput.growthRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="35"
                        step="1"
                        value={saasInput.growthRate}
                        onChange={(e) => setSaasInput({ ...saasInput, growthRate: parseInt(e.target.value) })}
                        className="w-full accent-[#F27D26]"
                      />
                    </div>

                    {/* Input Slider 3 */}
                    <div>
                      <div className="flex justify-between text-[10px] font-mono mb-1">
                        <span className="text-[#666]">MONTHLY CHURN</span>
                        <span className="text-white">{saasInput.churnValue}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="8.0"
                        step="0.1"
                        value={saasInput.churnValue}
                        onChange={(e) => setSaasInput({ ...saasInput, churnValue: parseFloat(e.target.value) })}
                        className="w-full accent-[#F27D26]"
                      />
                    </div>
                  </div>
                </div>

                {/* SVG Graph rendering dynamic coordinates */}
                <div className="bg-[#050505] border border-[#333] rounded-none p-3">
                  <span className="text-[9px] font-mono text-[#666] uppercase tracking-wider block mb-2">
                    Predictive Net Revenue Slope (Next 6 Months)
                  </span>

                  <div className="grid grid-cols-6 gap-2 text-center">
                    {cashProjection.map((pt) => (
                      <div key={pt.month} className="bg-[#121212] rounded-none py-2 border border-[#333] flex flex-col justify-between h-20">
                        <span className="text-[8px] text-[#666] font-mono">MO {pt.month}</span>
                        <span className="text-[11px] font-bold text-white">${pt.revenue.toLocaleString()}</span>
                        <span className="text-[8px] text-green-500 font-bold">+{pt.growthPct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Case C: LANDING PAGE AGENTS UTILITY */}
            {project.id === "landing-page" && (
              <div className="space-y-4">
                <div className="bg-[#121212] border border-[#333] p-4 rounded-none">
                  <h5 className="text-[11px] uppercase tracking-wider font-bold text-white mb-2 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#F27D26]" />
                    Trigger-Action Architecture Playground
                  </h5>
                  <p className="text-[11px] text-[#AAAAAA] mb-4">
                    High-end marketing includes proving concrete value. Choose a webhook channel and an autonomous AI action. Click Run to simulate live execution schedules.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Trigger selection dropdown */}
                    <div>
                      <label className="block text-[9px] font-mono text-[#666] uppercase mb-1">
                        Select Webhook Event (Trigger)
                      </label>
                      <select
                        value={selectedTrigger}
                        onChange={(e) => setSelectedTrigger(e.target.value)}
                        className="w-full bg-[#050505] border border-[#333] rounded-none p-2.5 text-xs text-white focus:outline-none focus:border-[#F27D26] font-semibold"
                      >
                        <option>New Pull Request</option>
                        <option>Stripe Payment Finalized</option>
                        <option>Slack /ask-gemini Keyword</option>
                        <option>Cron Scheduler @Hourly</option>
                      </select>
                    </div>

                    {/* Action selection dropdown */}
                    <div>
                      <label className="block text-[9px] font-mono text-[#666] uppercase mb-1">
                        Select Agent Core (Action)
                      </label>
                      <select
                        value={selectedAction}
                        onChange={(e) => setSelectedAction(e.target.value)}
                        className="w-full bg-[#050505] border border-[#333] rounded-none p-2.5 text-xs text-white focus:outline-none focus:border-[#F27D26] font-semibold"
                      >
                        <option>Generate AI Code Review</option>
                        <option>Compose Autocomplete Draft Draft</option>
                        <option>Perform Database Query Cleanups</option>
                        <option>Auto-Translate Logs to CSV</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleRunFlow}
                    disabled={isFlowRunning}
                    className="mt-4 flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-[#F27D26] hover:bg-[#ff9647] disabled:bg-[#333] rounded-none text-[10px] uppercase tracking-widest font-bold text-black transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    {isFlowRunning ? "Synchronizing Orchestrator..." : "Compile & Run Automator Flow"}
                  </button>
                </div>

                {/* Workflow Simulation Terminal output */}
                <div className="bg-[#050505] border border-[#333] rounded-none p-3 font-mono text-[10px] text-gray-400 h-28 overflow-y-auto">
                  <p className="text-[9px] font-bold text-white uppercase tracking-wider mb-2 border-b border-[#333] pb-1">
                    Automata Execution Log Stream
                  </p>
                  {flowLog.length === 0 ? (
                    <p className="text-gray-600 italic">Idle. Choose trigger and click Run above to generate console frames.</p>
                  ) : (
                    flowLog.map((log, i) => (
                      <p key={i} className="mb-0.5 leading-snug animate-fade-in">{log}</p>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Case D: BLOG APP */}
            {project.id === "blog-app" && (
              <div className="space-y-4">
                <div className="bg-[#121212] border border-[#333] p-4 rounded-none">
                  <h5 className="text-[11px] uppercase tracking-wider font-bold text-white mb-2 flex items-center gap-2">
                    <Edit className="w-4 h-4 text-[#F27D26]" />
                    Engineers CMS Markdown Sandbox
                  </h5>
                  <p className="text-[11px] text-[#AAAAAA] mb-3 leading-relaxed">
                    Write or edit raw text in the input container below. React states continuously evaluate metrics, character loops, and reading time values in 60fps.
                  </p>

                  <textarea
                    rows={3}
                    value={draftContent}
                    onChange={(e) => setDraftContent(e.target.value)}
                    className="w-full bg-[#050505] border border-[#333] rounded-none p-3 text-xs text-white font-mono focus:outline-none focus:border-[#F27D26] transition-colors"
                  />
                </div>

                {/* Live calculated values strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="bg-[#050505] border border-[#333] rounded-none py-2.5">
                    <span className="block text-xs font-bold text-white text-glow">{draftContent.length}</span>
                    <span className="text-[8px] text-[#666] uppercase font-mono tracking-wider block mt-0.5">Characters</span>
                  </div>
                  <div className="bg-[#050505] border border-[#333] rounded-none py-2.5">
                    <span className="block text-xs font-bold text-white text-glow">{wordCount}</span>
                    <span className="text-[8px] text-[#666] uppercase font-mono tracking-wider block mt-0.5">Words Count</span>
                  </div>
                  <div className="bg-[#050505] border border-[#333] rounded-none py-2.5">
                    <span className="block text-xs font-bold text-[#F27D26] text-glow">{estimatedReadTimeSec}s</span>
                    <span className="text-[8px] text-[#666] uppercase font-mono tracking-wider block mt-0.5">EST. Readings</span>
                  </div>
                  <div className="bg-[#050505] border border-[#333] rounded-none py-2.5 px-1 truncate">
                    <span className="block text-xs font-bold text-white text-glow">{readabilityIndex.split(" ")[0]}</span>
                    <span className="text-[8px] text-[#666] uppercase font-mono tracking-wider block mt-0.5 truncate">Flesch Rating</span>
                  </div>
                </div>
              </div>
            )}

            <div className="text-[10px] font-mono text-[#666] flex items-center justify-between pt-4 mt-4 border-t border-[#333] bg-transparent">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                Durable sandbox compile active
              </span>
              <span>EST. LATENCY: &lt;10ms</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
