import React from 'react';
import { VERIFICATION_PRODUCTS } from '../data/scaleData';
import { ArrowRight, ShieldCheck, Award, GitCompare, AlertTriangle, Cpu, CheckCircle2 } from 'lucide-react';

interface ScaleProductsBentoProps {
  onOpenDemo: (productName: string) => void;
}

export const ScaleProductsBento: React.FC<ScaleProductsBentoProps> = ({ onOpenDemo }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'engine': return ShieldCheck;
      case 'seal-benchmark': return Award;
      case 'majority-filter': return GitCompare;
      case 'radar': return AlertTriangle;
      case 'enterprise-api': return Cpu;
      default: return ShieldCheck;
    }
  };

  return (
    <section id="products" className="py-16 lg:py-24 bg-[#F5EEDD] border-t border-[#84B3CE]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#84B3CE] bg-[#84B3CE]/15 text-[#16587B] text-xs font-bold tracking-widest uppercase mb-3 font-mono">
            <span>FULL-STACK TRUTH INFRASTRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#16587B] tracking-tight">
            The AI Trust Product Suite
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#16587B]/85">
            Enterprise products designed to detect, quarantine, and eliminate generative AI hallucinations before they reach end users.
          </p>
        </div>

        {/* Bento Grid Layout matching Scale AI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VERIFICATION_PRODUCTS.map((prod, idx) => {
            const Icon = getIcon(prod.id);
            const isLarge = idx === 0 || idx === 1;

            return (
              <div
                key={prod.id}
                className={`rounded-xl border border-[#84B3CE]/70 bg-white/70 hover:bg-white hover:border-[#16587B] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group ${
                  isLarge ? 'lg:col-span-1 md:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#84B3CE]/30 mb-4">
                    <div className="p-2.5 rounded-lg bg-[#16587B] text-[#F5EEDD] group-hover:bg-[#0D3B53] transition-colors shadow-sm">
                      <Icon className="w-5 h-5 text-[#84B3CE]" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#16587B] bg-[#84B3CE]/20 px-2.5 py-0.5 rounded-full border border-[#84B3CE]">
                      {prod.badge}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono font-bold text-[#16587B]/70 uppercase tracking-wider mb-1">
                    {prod.category}
                  </div>

                  <h3 className="text-xl font-bold text-[#16587B] group-hover:text-[#0D3B53] transition-colors">
                    {prod.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#16587B]/90 mt-1 italic font-sans">
                    «{prod.tagline}»
                  </p>

                  <p className="text-xs text-[#16587B]/80 mt-3 leading-relaxed font-sans">
                    {prod.description}
                  </p>

                  {/* Bullet features */}
                  <div className="mt-5 pt-4 border-t border-[#84B3CE]/30 space-y-2">
                    {prod.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-[#16587B] font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#84B3CE]/30">
                  <button
                    onClick={() => onOpenDemo(prod.title)}
                    className="w-full flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-[#16587B] group-hover:text-[#0D3B53] py-2 px-3 rounded hover:bg-[#84B3CE]/20 transition cursor-pointer"
                  >
                    <span>Request Evaluation</span>
                    <ArrowRight className="w-4 h-4 text-[#84B3CE] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
