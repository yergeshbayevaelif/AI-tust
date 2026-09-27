import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, Database, ShieldCheck, Car, Award } from 'lucide-react';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose, initialTopic }) => {
  const [selectedSolution, setSelectedSolution] = useState(initialTopic || 'Scale Data Engine');
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [company, setCompany] = useState('');
  const [teamSize, setTeamSize] = useState('100-500');
  const [projectDescription, setProjectDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const solutions = [
    { title: 'AI Trust Data Engine', sub: 'RLHF, Synthetic Data, Model Pre-training', icon: Database },
    { title: 'SEAL Leaderboards & Evaluation', sub: 'Independent Benchmarks, Red Teaming', icon: Award },
    { title: 'AI Trust GenAI Platform', sub: 'Enterprise RAG, Agents & Fine-Tuning', icon: Sparkles },
    { title: 'AI Trust Donovan', sub: 'Defense & National Security Enclaves', icon: ShieldCheck },
    { title: 'AI Trust Automotive', sub: '3D LiDAR & Autonomous Perception', icon: Car },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workEmail.trim()) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#16587B]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#F5EEDD] border border-[#84B3CE] rounded-xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#16587B] hover:bg-[#84B3CE]/20 rounded-full transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="text-xs font-bold text-[#84B3CE] uppercase tracking-wider mb-1 bg-[#16587B] w-fit px-2.5 py-0.5 rounded">
              AI TRUST // ENTERPRISE CONSULTATION
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-[#16587B] tracking-tight mt-2">
              Book a Technical Demo
            </h2>
            <p className="text-xs sm:text-sm text-[#16587B]/80 mt-1 mb-6">
              Connect with an AI Trust solutions architect to tailor data pipelines, RLHF datasets, or evaluation suites for your team.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Solution Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#16587B] mb-2">
                  Select AI Initiative:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {solutions.map((sol) => {
                    const Icon = sol.icon;
                    const isSelected = selectedSolution === sol.title;
                    return (
                      <button
                        type="button"
                        key={sol.title}
                        onClick={() => setSelectedSolution(sol.title)}
                        className={`p-3 rounded border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#16587B] text-[#F5EEDD] border-[#16587B] shadow-sm'
                            : 'bg-[#F5EEDD] text-[#16587B] border-[#84B3CE]/70 hover:bg-[#84B3CE]/20'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#84B3CE]' : 'text-[#16587B]'}`} />
                        <div>
                          <div className="text-xs font-bold leading-tight">{sol.title}</div>
                          <div className={`text-[10px] leading-tight mt-0.5 ${isSelected ? 'text-[#84B3CE]' : 'text-[#16587B]/70'}`}>
                            {sol.sub}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#16587B] uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Chen"
                    className="w-full bg-[#F5EEDD] border border-[#84B3CE] rounded px-3 py-2 text-xs text-[#16587B] placeholder-[#16587B]/40 focus:outline-none focus:border-[#16587B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#16587B] uppercase mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="alex@enterprise.com"
                    className="w-full bg-[#F5EEDD] border border-[#84B3CE] rounded px-3 py-2 text-xs text-[#16587B] placeholder-[#16587B]/40 focus:outline-none focus:border-[#16587B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#16587B] uppercase mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme AI Technologies"
                    className="w-full bg-[#F5EEDD] border border-[#84B3CE] rounded px-3 py-2 text-xs text-[#16587B] placeholder-[#16587B]/40 focus:outline-none focus:border-[#16587B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#16587B] uppercase mb-1">
                    Organization Size
                  </label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full bg-[#F5EEDD] border border-[#84B3CE] rounded px-3 py-2 text-xs text-[#16587B] focus:outline-none focus:border-[#16587B]"
                  >
                    <option value="1-50">1 - 50 Employees</option>
                    <option value="50-250">50 - 250 Employees</option>
                    <option value="250-1000">250 - 1,000 Employees</option>
                    <option value="1000+">1,000+ Enterprise / Fortune 500</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#16587B] uppercase mb-1">
                  Project Details / Target Models (Optional)
                </label>
                <textarea
                  rows={2}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="e.g. Training a 70B parameter reasoning model requiring 50,000 STEM RLHF expert annotations..."
                  className="w-full bg-[#F5EEDD] border border-[#84B3CE] rounded px-3 py-2 text-xs text-[#16587B] placeholder-[#16587B]/40 focus:outline-none focus:border-[#16587B]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-[#16587B] text-[#F5EEDD] hover:bg-[#0D3B53] py-3 rounded font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <span>Submit Demo Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[10px] text-center text-[#16587B]/70 pt-1">
                Zero Data Retention (ZDR) policy. We sign mutual NDAs prior to ingesting proprietary data.
              </p>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-[#16587B] text-[#84B3CE] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-[#16587B]">
              Demo Request Confirmed!
            </h3>

            <p className="text-xs sm:text-sm text-[#16587B]/85 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#16587B]">{fullName || 'there'}</strong>! A dedicated AI Trust solution architect has been assigned to your initiative: <strong className="text-[#16587B]">{selectedSolution}</strong>. We will reach out to <strong className="text-[#16587B]">{workEmail}</strong> within 4 business hours.
            </p>

            <div className="p-4 rounded-lg bg-[#84B3CE]/20 border border-[#84B3CE] text-xs text-left max-w-md mx-auto space-y-1.5">
              <div className="font-bold text-[#16587B] uppercase text-[11px]">Recommended Next Step:</div>
              <div className="text-[#16587B]/90">&bull; Review the SEAL Model Evaluation whitepaper.</div>
              <div className="text-[#16587B]/90">&bull; Review our SOC 2 Type II and FedRAMP security package.</div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="bg-[#16587B] text-[#F5EEDD] hover:bg-[#0D3B53] px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Back to Platform
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
