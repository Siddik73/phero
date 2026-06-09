import React, { useState } from "react";
import { ContactMessage } from "../types";
import { Send, CheckCircle2, User, Mail, HelpCircle, Terminal, Eye, Clock, Trash2 } from "lucide-react";

export default function ContactConsole() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Full-Stack Development",
    message: ""
  });

  const [messageLogs, setMessageLogs] = useState<ContactMessage[]>([
    {
      id: "msg_init",
      name: "Interstellar Tech Corp (Mock)",
      email: "talent@interstellar.io",
      service: "AI Workflows Consulting",
      message: "Hey Alex! Loved your AI-driven workspace copilot simulation. Let us coordinate an engineering alignment call next Tuesday.",
      timestamp: "15:55:12"
    }
  ]);

  const [isSending, setIsSending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const services = [
    "Full-Stack Development",
    "AI Workflows Consulting",
    "SaaS Architecture",
    "API Security Audits"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (svc: string) => {
    setFormData(prev => ({ ...prev, service: svc }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSending(true);

    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: `msg_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        service: formData.service,
        message: formData.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };

      setMessageLogs(prev => [newMessage, ...prev]);
      setIsSending(false);
      setShowAlert(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        service: formData.service,
        message: ""
      });

      setTimeout(() => setShowAlert(false), 4000);
    }, 800);
  };

  const handleClearLogs = () => {
    setMessageLogs([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
      {/* Righthand: Validated Entry Form */}
      <div className="bg-[#121212] border border-[#333] rounded-none p-6 sm:p-8 flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5 border-b border-[#333] pb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F27D26] font-bold">
              Secure SMTP Proxy Sim
            </span>
            <h4 className="text-lg font-bold text-white uppercase tracking-tight">
              Initialize Direct Connection
            </h4>
            <p className="text-xs text-[#AAAAAA]">
              I am currently available for high-tier engineering partnerships. Form validations operate live in real-time.
            </p>
          </div>

          {/* Success Alerts */}
          {showAlert && (
            <div className="p-4 bg-green-500/10 border border-green-500/35 rounded-none flex items-start gap-2.5 animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-white">Transmission finalized!</h5>
                <p className="text-[10px] text-gray-300 mt-1">
                  Your payload parsed securely onto client state. View your live submission log added in the log console on the right!
                </p>
              </div>
            </div>
          )}

          {/* Input Fields Container */}
          <div className="space-y-4">
            {/* Field: Full Name */}
            <div>
              <label className="block text-[9px] font-mono text-[#666] uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4.5 h-4.5 text-[#666]" />
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Recruiters Sarah"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#050505] border border-[#333] rounded-none pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#F27D26] font-semibold font-mono"
                />
              </div>
            </div>

            {/* Field: Email */}
            <div>
              <label className="block text-[9px] font-mono text-[#666] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4.5 h-4.5 text-[#666]" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@organization.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#050505] border border-[#333] rounded-none pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#F27D26] font-semibold font-mono"
                />
              </div>
            </div>

            {/* Field: Target Alliance category */}
            <div>
              <label className="block text-[9px] font-mono text-[#666] uppercase tracking-wider mb-2">
                Subject Partnership Model
              </label>
              <div className="grid grid-cols-2 gap-2">
                {services.map(svc => (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => handleServiceSelect(svc)}
                    className={`text-left text-[10px] sm:text-xs p-2.5 border font-mono font-bold uppercase tracking-wider transition-all truncate rounded-none ${
                      formData.service === svc
                        ? "bg-[#F27D26]/10 border-[#F27D26] text-white"
                        : "bg-[#050505] border-[#333] text-[#AAAAAA] hover:text-white"
                    }`}
                  >
                    {svc}
                  </button>
                ))}
              </div>
            </div>

            {/* Field: Message Box */}
            <div>
              <label className="block text-[9px] font-mono text-[#666] uppercase tracking-wider mb-1.5">
                Message Body
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Draft detail blueprints, workspace specifications, or custom consultation parameters..."
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full bg-[#050505] border border-[#333] rounded-none p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#F27D26] transition-colors resize-none font-medium font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="flex items-center justify-center gap-2 w-full p-3 bg-[#F27D26] hover:bg-[#ff9647] disabled:bg-[#333] rounded-none text-[10px] font-mono uppercase tracking-widest font-bold text-black transition-all shadow-md active:scale-[99%]"
          >
            <Send className="w-3.5 h-3.5" />
            {isSending ? "Compressing Payload..." : "Transmit Encrypt Signal"}
          </button>
        </form>
      </div>

      {/* Lefthand: Recruiter Console Sandbox message log */}
      <div className="bg-[#0A0A0A] border border-[#333] rounded-none p-5 flex flex-col justify-between overflow-hidden h-[540px]">
        <div>
          <div className="flex items-center justify-between border-b border-[#333] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#F27D26]" />
              <h5 className="font-bold text-xs text-white uppercase tracking-wide font-mono">
                Session Message Logs (Local State Sandbox)
              </h5>
            </div>
            
            {messageLogs.length > 0 && (
              <button
                onClick={handleClearLogs}
                className="flex items-center gap-1.5 text-[10px] font-mono text-red-500/80 hover:text-red-500 transition-colors"
                title="Wipe current log traces"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          <p className="text-[11px] text-[#AAAAAA] mb-4 leading-relaxed font-mono">
            Witness how custom client state variables propagate instantly list schemas. All secure inquiries successfully log with live timezone indices below!
          </p>

          {/* Messages list loops */}
          <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
            {messageLogs.length === 0 ? (
              <div className="p-8 text-center bg-[#121212] rounded-none border border-[#333] border-dashed">
                <HelpCircle className="w-8 h-8 text-[#666] mx-auto mb-2" />
                <p className="text-xs text-[#AAAAAA] italic">Inbound log registry is empty. Type a test message on the left to see schemas populate live!</p>
              </div>
            ) : (
              messageLogs.map((msg, i) => (
                <div 
                  key={msg.id} 
                  className={`border rounded-none p-3.5 space-y-2 transition-all ${
                    i === 0 
                      ? "bg-[#121212] border-[#F27D26]/60 shadow-sm shadow-[#F27D26]/5 animate-in zoom-in-95" 
                      : "bg-[#121212]/50 border-[#333]"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h6 className="font-semibold text-xs text-white leading-tight">
                        {msg.name}
                      </h6>
                      <p className="text-[10px] font-mono text-[#F27D26] mt-0.5">
                        {msg.email}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-[9px] font-mono text-[#666]">
                      <Clock className="w-2.5 h-2.5" />
                      {msg.timestamp}
                    </span>
                   </div>

                  <p className="text-xs text-[#AAAAAA] leading-relaxed break-words font-normal">
                    {msg.message}
                  </p>

                  <div className="pt-2 border-t border-[#333] flex justify-between items-center text-[9px] font-mono text-[#666]">
                    <span>Inbound route: SVM</span>
                    <span className="text-[#F27D26] font-bold font-mono">[{msg.service}]</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="text-[9px] font-mono text-green-500 uppercase tracking-widest border-t border-[#333] pt-2 flex justify-between">
          <span>Local Simulation Active</span>
          <span>SMTP Pipeline Static Sim</span>
        </div>
      </div>
    </div>
  );
}
export { ContactConsole };
