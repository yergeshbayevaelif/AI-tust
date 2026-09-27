import React, { useState } from 'react';
import { SCALE_CASE_STUDIES } from '../data/scaleData';
import { ArrowRight, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

interface ScaleCaseStudiesProps {
  onOpenDemo: (clientName: string) => void;
}

export const ScaleCaseStudies: React.FC<ScaleCaseStudiesProps> = ({ onOpenDemo }) => {
  const [selectedCase, setSelectedCase] = useState(0);
  const currentCase = SCALE_CASE_STUDIES[selectedCase];

  return (
    <section id="customers" className="py-16 lg:py-24 bg-[#F5EEDD] border-t border-[#84B3CE]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#84B3CE] bg-[#84B3CE]/15 text-[#16587B] text-xs font-bold tracking-widest uppercase mb-3">
            <span>PROVEN AT SCALE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#16587B] tracking-tight">
            Customer Case Studies
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#16587B]/85">
            How the world&apos;s leading AI labs and enterprises scale development with our data engine.
          </p>
        </div>

        {/* Client Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {SCALE_CASE_STUDIES.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setSelectedCase(idx)}
              className={`px-5 py-2.5 rounded font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer ${
                selectedCase === idx
                  ? 'bg-[#16587B] text-[#F5EEDD] shadow-md'
                  : 'bg-[#F5EEDD] border border-[#84B3CE] text-[#16587B] hover:bg-[#84B3CE]/20'
              }`}
            >
              {c.client}
            </button>
          ))}
        </div>

        {/* Selected Case Study Spotlight Card */}
        <div className="bg-[#16587B] text-[#F5EEDD] rounded-xl border border-[#84B3CE]/60 shadow-2xl p-6 sm:p-10 lg:p-12 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3 text-xs font-bold text-[#84B3CE] uppercase tracking-wider">
                <span>{currentCase.client} CASE STUDY</span>
                <span>&bull;</span>
                <span>{currentCase.industry}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-[#F5EEDD] leading-tight">
                {currentCase.tagline}
              </h3>

              <p className="text-sm sm:text-base text-[#F5EEDD]/90 leading-relaxed font-normal">
                {currentCase.description}
              </p>

              {/* Deliverables List */}
              <div className="pt-4 border-t border-[#84B3CE]/30">
                <div className="text-xs font-bold text-[#84B3CE] uppercase tracking-wider mb-2">
                  AI TRUST DELIVERABLES & ARCHITECTURE:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentCase.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-[#F5EEDD] bg-[#0D3B53] px-3 py-2 rounded border border-[#84B3CE]/30 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#84B3CE] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Metric Callout */}
            <div className="lg:col-span-4 bg-[#0D3B53] border border-[#84B3CE]/50 rounded-xl p-6 sm:p-8 text-center flex flex-col justify-center items-center shadow-lg">
              <div className="text-xs font-bold uppercase tracking-widest text-[#84B3CE] mb-2">
                MEASURED IMPACT
              </div>
              <div className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight">
                {currentCase.metric}
              </div>
              <div className="text-xs sm:text-sm text-[#F5EEDD] font-medium mt-2 leading-snug">
                {currentCase.metricLabel}
              </div>

              <button
                onClick={() => onOpenDemo(`Case Study: ${currentCase.client}`)}
                className="mt-6 w-full bg-[#84B3CE] text-[#16587B] hover:bg-[#A7C9DD] py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow flex items-center justify-center gap-2"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
