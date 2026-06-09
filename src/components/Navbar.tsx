import React, { useState, useEffect } from "react";
import { Sparkles, FileText, Send, BookOpen, Briefcase, Cpu, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenResume: () => void;
  activeSection: string;
}

export default function Navbar({ onOpenResume, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home", icon: Cpu },
    { id: "about", label: "About", icon: Sparkles },
    { id: "skills", label: "Skills", icon: BookOpen },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "copilot", label: "AI Sandbox", icon: Cpu },
    { id: "blog", label: "Blog", icon: BookOpen },
    { id: "contact", label: "Contact", icon: Send },
  ];

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#333] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded bg-[#F27D26] flex items-center justify-center text-black font-black text-sm tracking-tighter uppercase group-hover:bg-[#f69146] transition-colors duration-200">
            AR
          </div>
          <div>
            <h3 className="font-extrabold text-sm tracking-widest text-[#F5F5F5] group-hover:text-[#F27D26] transition-colors uppercase">
              ALEX RIVERA
            </h3>
            <p className="text-[9px] font-mono text-[#666] tracking-widest uppercase">
              AI ENGINE // EST. 2026
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#121212]/85 px-3 py-1.5 rounded border border-[#333]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${
                  isActive
                    ? "bg-[#F27D26] text-black"
                    : "text-[#AAAAAA] hover:text-white hover:bg-[#1E1E1E]"
                }`}
              >
                <Icon className="w-3 h-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* CTA & Resume Button */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 py-2 rounded border border-[#333] bg-[#121212] text-[10px] font-bold uppercase tracking-widest hover:bg-[#1E1E1E] text-[#AAAAAA] hover:text-white transition-all hover:border-[#F27D26]/40"
          >
            <FileText className="w-3.5 h-3.5 text-[#F27D26]" />
            Resume [PDF]
          </button>
          
          <button
            onClick={() => handleNavClick("contact")}
            className="px-4 py-2 rounded bg-[#F27D26] hover:bg-[#ff9647] text-[10px] font-bold uppercase tracking-widest text-black transition-all duration-200"
          >
            Connect_
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenResume}
            className="p-2 rounded border border-[#333] bg-[#121212] text-xs font-semibold text-[#F5F5F5] hover:text-white transition-all"
            title="Resume Builder"
          >
            <FileText className="w-4 h-4 text-[#F27D26]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded border border-[#333] bg-[#121212] text-[#AAAAAA] hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[73px] left-0 right-0 bg-[#0A0A0A] border-b border-[#333] px-6 py-6 flex flex-col gap-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <p className="text-[9px] font-mono text-[#666] tracking-[0.3em] uppercase border-b border-[#333] pb-1">
            Section Navigation
          </p>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 p-3 rounded text-[10px] uppercase font-bold tracking-widest transition-all ${
                    isActive
                      ? "bg-[#F27D26]/10 border border-[#F27D26]/40 text-white"
                      : "bg-[#121212] border border-[#333] text-[#AAAAAA] hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#F27D26]" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 mt-2 font-mono">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center justify-center gap-2 p-3 bg-[#121212] border border-[#333] rounded text-[10px] font-bold uppercase tracking-widest text-[#AAAAAA] hover:text-white"
            >
              <FileText className="w-4 h-4 text-[#F27D26]" />
              Interactive Resume
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="flex items-center justify-center gap-2 p-3 bg-[#F27D26] rounded text-[10px] font-bold uppercase tracking-widest text-black"
            >
              <Send className="w-4 h-4" />
              Direct Message
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
