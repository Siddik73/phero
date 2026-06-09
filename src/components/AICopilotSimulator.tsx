import React, { useState, useEffect, useRef } from "react";
import { Terminal, Cpu, Play, Sparkles, Copy, Check, CornerDownLeft, CircleDot } from "lucide-react";

interface PromptTemplate {
  label: string;
  query: string;
  response: string;
}

export default function AICopilotSimulator() {
  const [currentInput, setCurrentInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<{ query: string; response: string; timestamp: string }[]>([
    {
      query: "system-status --verbose",
      response: "🟢 AR-COGNITIVE-AGENT-v2.6 is fully synchronized with environment workspace.\n💎 Active key dependencies active: React 19, TypeScript, Node.js core systems, better-auth v1.2.\n🤖 Ready for recruiter session prompts.",
      timestamp: "15:55:12"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const prompts: PromptTemplate[] = [
    {
      label: "Alex's AI Workflow",
      query: "ask --about-workflow-velocity",
      response: `✨ ALEX RIVERA'S 2026 WORKFLOW PIPELINE:

Alex manages full-stack features utilizing a hybrid coding structure:
1. **Prereq Blueprinting**: Outlines data models and logic contracts in clean markdown.
2. **Context-Stuffed Copilots**: Feeds schema structures into Cursor / Bolt.new, avoiding hallucinated paths.
3. **Surgical Refactoring**: Edits modular React nodes rather than rewriting large files, saving CPU cycles.
4. **Automated AI Audits**: Employs script templates checking for:
   - Floating React hook arrays (re-render safeguards)
   - Missing HTTP boundary parameters
   - Security cookie claims

🚀 VELOCITY: Average feature branches completed in 2-4 hours including standard unit testing!`
    },
    {
      label: "MERN Nutrition Architect",
      query: "schema --show-mern-meal-extractor",
      response: `📂 MERN MEAL EXTRACTOR SYSTEM ARCHITECTURE (REST PIPELINE):

┌──────────────────┐     Type-safe Post     ┌────────────────────┐
│   React Client   │ ─────────────────────> │ Express API Route  │
└──────────────────┘                        └────────────────────┘
         ▲                                             │
         │ JWT-claims Cookie verified                  │ Decodes JWT, validates
         │                                             ▼
┌──────────────────┐     Aggregated Trends  ┌────────────────────┐
│   MongoDB Atlas  │ <───────────────────── │  Gemini NLP Parser │
└──────────────────┘                        └────────────────────┘

📊 MONGOOSE SCHEMATICS EXAMPLE:
\`\`\`typescript
const MealSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  description: { type: String, required: true },
  aggregateValues: {
    calories: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    fat: { type: Number, default: 0 }
  },
  registeredAt: { type: Date, default: Date.now, index: true }
});
// Composite index for high-speed monthly aggregation reporting
MealSchema.index({ userId: 1, registeredAt: -1 });
\`\`\`
`
    },
    {
      label: "Test Express JWT Authenticator",
      query: "generate --auth-middleware-tests",
      response: `🧪 AUTOMATED TS UNIT TESTS FOR JWT AUTHORIZATION HEADER HOOKS:

\`\`\`typescript
import { expect, test, describe, mock } from "bun:test";
import { authenticateClaims } from "./auth.middleware";

describe("JWT Bearer Auth validation Middleware", () => {
  test("Should bypass claims with 401 when Authorization header is absent", async () => {
    const mockReq = { headers: {} } as any;
    const mockRes = {
      status: mock.fn(() => mockRes),
      json: mock.fn()
    } as any;
    const next = mock.fn();

    await authenticateClaims(mockReq, mockRes, next);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Access Denied: Missing Bearer token" });
    expect(next).not.toHaveBeenCalled();
  });

  test("Should trigger next() and append req.user when key claims match", async () => {
    const mockReq = { headers: { authorization: "Bearer VALID_JWT_TOKEN" } } as any;
    const mockRes = {} as any;
    const next = mock.fn();

    await authenticateClaims(mockReq, mockRes, next);

    expect(mockReq.user).toBeDefined();
    expect(mockReq.user.id).toBe("usr_2026_model");
    expect(next).toHaveBeenCalled();
  });
});
\`\`\`
`
    }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalHistory, isTyping]);

  const handleRunCommand = (cmdText: string) => {
    if (isTyping) return;
    setIsTyping(true);
    setCurrentInput(cmdText);

    // Find predefined template
    const match = prompts.find(p => p.query === cmdText || p.label === cmdText);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setTimeout(() => {
      setTerminalHistory(prev => [
        ...prev,
        {
          query: cmdText,
          response: match ? match.response : `❌ Command "${cmdText}" unrecognized.\n💡 Try clicking any of the core script templates above.`,
          timestamp: timeStr
        }
      ]);
      setCurrentInput("");
      setIsTyping(false);
    }, 900);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-[#121212]/30 backdrop-blur-md border border-[#333] rounded-none overflow-hidden shadow-2xl flex flex-col h-[520px]">
      
      {/* Console Top Header */}
      <div className="bg-[#0A0A0A]/50 backdrop-blur-md px-5 py-3.5 border-b border-[#333] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-none bg-red-500/80 block" />
            <span className="w-2.5 h-2.5 rounded-none bg-yellow-500/80 block" />
            <span className="w-2.5 h-2.5 rounded-none bg-green-500/80 block" />
          </div>
          <span className="h-4 w-px bg-[#333] mx-2" />
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#AAAAAA]">
            <Terminal className="w-3.5 h-3.5 text-[#F27D26]" />
            <span>copilot@alexrivera-desktop:~</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CircleDot className="w-2 & h-2 text-[#F27D26] animate-ping" />
          <span className="text-[9px] font-mono text-[#F27D26] font-bold uppercase tracking-widest leading-none">
            Agent Synchronized
          </span>
        </div>
      </div>

      {/* Terminal Display Stream */}
      <div 
        ref={scrollRef}
        className="flex-1 bg-black/40 backdrop-blur-sm p-5 md:p-6 font-mono text-xs overflow-y-auto space-y-4"
      >
        {terminalHistory.map((history, idx) => (
          <div key={idx} className="space-y-2 animate-in fade-in duration-300">
            {/* User Request prompt header line */}
            <div className="flex items-start justify-between text-[#F5F5F5] border-b border-[#121212] pb-1">
              <div className="flex items-center gap-2">
                <span className="text-[#F27D26] font-bold">❯</span>
                <span className="text-[#AAAAAA] font-semibold">{history.query}</span>
              </div>
              <span className="text-[9px] text-[#666]">{history.timestamp}</span>
            </div>

            {/* AI Typed outputs block */}
            <div className="bg-[#050505]/90 rounded-none p-4 border border-[#333] text-[#AAAAAA] leading-relaxed whitespace-pre-wrap relative group/box">
              <button
                onClick={() => handleCopy(history.response, idx)}
                className="absolute right-3 top-3 opacity-0 group-hover/box:opacity-100 p-1.5 bg-[#121212] border border-[#333] rounded text-[#666] hover:text-white transition-all"
                title="Copy output content"
              >
                {copiedIndex === idx ? (
                  <Check className="w-3.5 h-3.5 text-[#F27D26]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
              {history.response}
            </div>
          </div>
        ))}

        {/* Flashing typing state simulation */}
        {isTyping && (
          <div className="flex items-center gap-2 text-gray-500 animate-pulse">
            <span className="text-[#F27D26] font-bold">❯</span>
            <span>Typing core schemas...</span>
            <span className="w-1.5 h-3.5 bg-[#F27D26] animate-pulse block" />
          </div>
        )}
      </div>

      {/* Micro prompt templates sidebar tray */}
      <div className="bg-[#121212]/50 border-t border-[#333] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono">
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-bold text-[#666] uppercase tracking-wide flex items-center gap-1 mt-1 font-mono">
            <Sparkles className="w-3 h-3 text-[#F27D26]" />
            Templates:
          </span>
          {prompts.map((p) => (
            <button
              key={p.query}
              onClick={() => handleRunCommand(p.query)}
              disabled={isTyping}
              className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0A0A0A] hover:bg-[#1E1E1E] border border-[#333] hover:border-[#F27D26]/40 text-[#AAAAAA] hover:text-white px-2.5 py-1 rounded-none transition-all disabled:opacity-50"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Console Command Input bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (currentInput.trim()) {
              handleRunCommand(currentInput);
            }
          }}
          className="flex-1 w-full flex items-center relative border border-[#333] bg-[#0A0A0A] rounded-none px-3 py-1.5 focus-within:border-[#F27D26] transition-colors"
        >
          <span className="text-[#F27D26] font-bold mr-2 font-mono">❯</span>
          <input
            type="text"
            placeholder="Type custom prompt or select templates..."
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            disabled={isTyping}
            className="bg-transparent text-xs text-white focus:outline-none w-full font-mono font-medium disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={isTyping || !currentInput.trim()}
            className="p-1 rounded bg-[#1A1A1A] hover:bg-[#F27D26] hover:text-black text-[#AAAAAA] transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
export { AICopilotSimulator };
