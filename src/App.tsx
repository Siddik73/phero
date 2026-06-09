import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ResumeModal from "./components/ResumeModal";
import ProjectCard from "./components/ProjectCard";
import AICopilotSimulator from "./components/AICopilotSimulator";
import BlogSection from "./components/BlogSection";
import ContactConsole from "./components/ContactConsole";
import ParticleBackground from "./components/ParticleBackground";
import { PROJECTS, SKILL_CATEGORIES } from "./data";
import { 
  Sparkles, 
  Terminal, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Download, 
  Briefcase, 
  Cpu, 
  Lock, 
  ArrowDownCircle, 
  Github, 
  Linkedin, 
  Mail, 
  Code,
  ShieldAlert,
  ServerCrash
} from "lucide-react";

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Track active scroll section to light up correct nav highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "copilot", "blog", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#F5F5F5] relative selection:bg-[#F27D26] selection:text-black hud-grid neon-dusk-glow active-engine-glow overflow-x-hidden">
      
      {/* Particle background constellation */}
      <ParticleBackground />

      {/* Background ambient glowing spheres for high visual craftsmanship */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-[#F27D26]/3 blur-[120px] pointer-events-none animate-pulse-slow z-0" />
      <div className="absolute top-2/3 right-1/10 w-[450px] h-[450px] rounded-full bg-[#AAAAAA]/2 blur-[140px] pointer-events-none animate-pulse-slow z-0" />

      {/* Header Sticky Glass Navigation */}
      <Navbar onOpenResume={() => setResumeOpen(true)} activeSection={activeSection} />

      {/* 1. HERO SECTION */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden border-b border-[#333]"
      >
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          
          {/* Tagline Overline with visual sparks */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-[#F27D26]/10 border border-[#F27D26]/30 text-[#F27D26] shadow-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] leading-none">
              YEAR 2026 // AI-ASSISTED FULL-STACK WORKFLOWS
            </span>
          </div>

          {/* Huge typography pairs */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase text-white leading-[0.9]">
              AI-DRIVEN<br />ENGINEER
            </h1>
            <p className="text-sm sm:text-base font-mono tracking-widest uppercase text-[#AAAAAA] max-w-3xl mx-auto leading-relaxed">
              Alex Rivera // Orchestrating code at 3.5x velocity
            </p>
          </div>

          {/* Editorial concise summary */}
          <p className="text-xs sm:text-sm text-[#AAAAAA] font-light leading-relaxed max-w-xl mx-auto pb-4 uppercase tracking-wider">
            I bridge the gap between human creativity and machine intelligence, crafting high-performance full-stack architectures using AI-assisted workflows.
          </p>

          {/* Interactive CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleScrollToSection("projects")}
              className="w-full sm:w-auto px-6 py-4 rounded-none bg-[#F27D26] hover:bg-[#ff9647] text-[10px] uppercase tracking-widest font-bold text-black transition-all active:scale-[98%]"
            >
              Explore Portfolio Sandboxes
            </button>
            <button
              onClick={() => setResumeOpen(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-none border border-[#333] bg-[#121212] text-[10px] uppercase tracking-widest font-bold text-[#F5F5F5] hover:text-[#F27D26] hover:bg-[#1E1E1E] transition-all hover:border-[#F27D26]/40 flex items-center justify-center gap-2 active:scale-[98%]"
            >
              <Download className="w-4 h-4 text-[#F27D26]" />
              Resume [PDF]
            </button>
          </div>

          {/* Dynamic bottom arrow */}
          <div className="pt-12 text-[#666] animate-bounce cursor-pointer flex justify-center">
            <ArrowDownCircle 
              className="w-7 h-7 hover:text-[#F27D26] transition-colors" 
              onClick={() => handleScrollToSection("about")}
            />
          </div>

        </div>
      </section>

      {/* 2. ABOUT ME */}
      <section 
        id="about" 
        className="py-16 md:py-28 px-6 bg-[#0A0A0A]/40 backdrop-blur-md border-b border-[#333] relative z-10"
      >
        <div className="max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left: Professional Circular Profile Frame */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-none p-2 bg-[#333] shadow-2xl flex items-center justify-center group border border-[#444]">
                <div className="absolute inset-0 bg-[#F27D26] opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="w-full h-full rounded-none overflow-hidden bg-[#0A0A0A] border border-[#333] relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                    alt="Alex Rivera Portrait"
                    className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Right: AI mindsets editorial copy */}
            <div className="md:col-span-8 space-y-6 text-left">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#F27D26] font-bold uppercase block">
                THE AI SHIFT // NEW COGNITIVE PROCESS
              </span>
              <h3 className="text-3xl font-bold uppercase text-white leading-none tracking-tight">
                Engineering at 3.5x Velocity.
              </h3>
              
              <div className="text-xs text-[#AAAAAA] space-y-4 font-light leading-relaxed">
                <p>
                  I am a full-stack engineer, but not in the traditional mechanical sense. In 2026, coding is no longer about staring at syntax lines for hours. It is about high-level system architectural model framing; designing clean schema rules; protecting sessions from token tampering; and driving LLM tooling.
                </p>
                <p>
                  By standardizing prompt-driven architectures, custom CI/CD pipelines, and surgical modular updates, I solve production features in a single day that used to clog up sprints for weeks. This allows me to focus purely on top-tier layout ratios, micro-nutrient data flows, and unbreakable cookie protection.
                </p>
              </div>

              {/* Stats highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#333] text-center">
                <div className="bg-[#121212]/50 backdrop-blur-md rounded-none p-3 border border-[#333]">
                  <div className="text-lg font-black text-white text-glow">4+ Yrs</div>
                  <div className="text-[8px] uppercase font-mono tracking-wider mt-1 text-[#666]">Real Experience</div>
                </div>
                <div className="bg-[#121212]/50 backdrop-blur-md rounded-none p-3 border border-[#333]">
                  <div className="text-lg font-black text-[#F27D26] text-glow">3.5x</div>
                  <div className="text-[8px] uppercase font-mono tracking-wider mt-1 text-[#666]">Branch Velocity</div>
                </div>
                <div className="bg-[#121212]/50 backdrop-blur-md rounded-none p-3 border border-[#333]">
                  <div className="text-lg font-black text-white text-glow">99.8%</div>
                  <div className="text-[8px] uppercase font-mono tracking-wider mt-1 text-[#666]">Bug Stability</div>
                </div>
                <div className="bg-[#121212]/50 backdrop-blur-md rounded-none p-3 border border-[#333]">
                  <div className="text-lg font-black text-[#AAAAAA] text-glow">100%</div>
                  <div className="text-[8px] uppercase font-mono tracking-wider mt-1 text-[#666]">Type Safe</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE EXPERTISE & SKILLS */}
      <section 
        id="skills" 
        className="py-16 md:py-24 px-6 bg-[#0A0A0A]/30 backdrop-blur-md border-b border-[#333] relative z-10"
      >
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#F27D26] font-bold uppercase block">
              Core Capabilities Matrix
            </span>
            <h3 className="text-3xl font-extrabold uppercase text-white">
              The 2026 Executive Toolkit
            </h3>
            <p className="text-xs text-[#AAAAAA] max-w-xl mx-auto">
              Dynamic sliders indicate verified levels of competence, illustrating a comprehensive architecture from client views to security endpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div 
                key={idx}
                className="bg-[#121212]/50 backdrop-blur-md border border-[#333] rounded-none p-5 sm:p-6 text-left space-y-4 hover:border-[#F27D26]/25 transition-all"
              >
                <div>
                  <h4 className="font-bold text-[#F5F5F5] uppercase tracking-wider text-sm">
                    {cat.title}
                  </h4>
                  <p className="text-[11px] text-[#666] leading-relaxed mt-1 font-normal">
                    {cat.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#333]">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-[10px] font-mono mb-1.5 font-medium">
                        <span className="text-white uppercase tracking-wider">{skill.name}</span>
                        <span className="text-[#F27D26] font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-1 w-full bg-[#020202] rounded-none overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#F27D26] to-[#ec751c] rounded-none transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SELECTED WORKS (PROJECTS GALLERY) */}
      <section 
        id="projects" 
        className="py-16 md:py-24 px-6 bg-[#0A0A0A]/40 backdrop-blur-md border-b border-[#333] relative z-10"
      >
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#F27D26] font-bold uppercase block">
              Functional Proof Galleries
            </span>
            <h3 className="text-3xl font-extrabold uppercase text-white">
              Selected Works & Sandboxes
            </h3>
            <p className="text-xs text-[#AAAAAA] max-w-xl mx-auto">
              Play with live interactive simulators matching each code structure to witness instant calculation cycles and state logic!
            </p>
          </div>

          {/* Dynamic Mapping of all 4 project codes */}
          <div className="space-y-10">
            {PROJECTS.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>

        </div>
      </section>

      {/* 5. WORKSPACE TERMINAL (AI SANDBOX) */}
      <section 
        id="copilot" 
        className="py-16 md:py-24 px-6 bg-[#0A0A0A]/30 backdrop-blur-md border-b border-[#333] relative z-10"
      >
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#F27D26] font-bold uppercase block">
              Tooling Automation Console
            </span>
            <h3 className="text-3xl font-extrabold uppercase text-white">
              Surgical Workspace Terminal
            </h3>
            <p className="text-xs text-[#AAAAAA] max-w-xl mx-auto font-normal">
              Click template scripts below to run compile checks, inspect mongoose indices, or evaluate prompt design velocities within our secure sandbox.
            </p>
          </div>

          {/* Render Terminal simulator */}
          <div className="max-w-4xl mx-auto">
            <AICopilotSimulator />
          </div>

        </div>
      </section>

      {/* 6. TECHNICAL BLOG */}
      <section 
        id="blog" 
        className="py-16 md:py-24 px-6 bg-[#0A0A0A]/40 backdrop-blur-md border-b border-[#333] relative z-10"
      >
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#F27D26] font-bold uppercase block">
              2026 Developer Musings
            </span>
            <h3 className="text-3xl font-extrabold uppercase text-white">
              The AI Developer Journal
            </h3>
            <p className="text-xs text-[#AAAAAA] max-w-xl mx-auto">
              Read editorial insights regarding compilation velocities, BetterAuth standards, and automated pull-request tests. Leave comments, like, or search posts.
            </p>
          </div>

          {/* Blog Sections renderer */}
          <BlogSection />

        </div>
      </section>

      {/* 7. SECURE DIRECT SMTP CONTACT FORM & CONSOLE REGISTRY */}
      <section 
        id="contact" 
        className="py-16 md:py-24 px-6 bg-[#0A0A0A]/30 backdrop-blur-md border-b border-[#333] relative z-10"
      >
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#F27D26] font-bold uppercase block">
              Secure Communications Bridge
            </span>
            <h3 className="text-3xl font-extrabold uppercase text-white">
              Partner & Connect
            </h3>
            <p className="text-xs text-[#AAAAAA] max-w-xl mx-auto">
              Draft partnership blueprints. Once sent, witness your messages append live inside the recruiter dashboard tray on the right!
            </p>
          </div>

          {/* Contacts layout renderer */}
          <ContactConsole />

        </div>
      </section>

      {/* Printable Footer */}
      <footer className="py-10 px-6 bg-[#020202] text-[#666] text-[10px] font-mono border-t border-[#333]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-white font-extrabold tracking-widest uppercase">ALEX RIVERA</span>
            <span>|</span>
            <span className="uppercase">AI Full-Stack Developer © 2026</span>
          </div>

          <div className="flex gap-4 uppercase tracking-widest font-semibold">
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection("hero"); }}
              className="hover:text-white transition-colors"
            >
              Root
            </a>
            <span>•</span>
            <a 
              href="#projects" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection("projects"); }}
              className="hover:text-white transition-colors"
            >
              Projects
            </a>
            <span>•</span>
            <a 
              href="#blog" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection("blog"); }}
              className="hover:text-white transition-colors"
            >
              Blogging
            </a>
            <span>•</span>
            <button 
              onClick={() => setResumeOpen(true)}
              className="hover:text-white transition-all text-[10px] text-[#F27D26]"
            >
              Print CV
            </button>
          </div>
        </div>
      </footer>

      {/* Career Resume Builder Modal Drawer */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

    </div>
  );
}
export { App };
