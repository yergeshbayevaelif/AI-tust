import React, { useState } from 'react';
import { Database, FileSearch, ShieldCheck, GitMerge, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';

interface ScaleDataEngineSectionProps {
  onOpenDemo: (topic: string) => void;
}

export const ScaleDataEngineSection: React.FC<ScaleDataEngineSectionProps> = ({ onOpenDemo }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Dissection & Sentence Parsing',
      kicker: 'SYNTACTIC ATOMIZATION',
      icon: Database,
      desc: 'AI Trust parses unstructured generative AI output into atomic, testable claims, distinguishing subjective style from falsifiable empirical assertions.',
      details: [
        'Automated dependency parse trees and sentence segmentation',
        'Separation of factual assertions from epistemic framing (e.g., "we hypothesize")',
        'Identification of cited DOIs, URLs, authors, and year stamps'
      ],
      metric: '100% Assertion Coverage'
    },
    {
      num: '02',
      title: 'Semantic Claim Extraction',
      kicker: 'ENTITY & RELATION TRIANGULATION',
      icon: FileSearch,
      desc: 'Each isolated proposition is translated into formal knowledge triples (Subject, Predicate, Object) alongside confidence intervals.',
      details: [
        'Extraction of quantitative metrics and mathematical relations',
        'Cross-lingual normalization into standardized entity identifiers',
        'Detection of vague hedges and pseudo-authoritative rhetoric'
      ],
      metric: '50ms Latency per Sentence'
    },
    {
      num: '03',
      title: 'Multi-Source Ground Truth Reconciliation',
      kicker: 'CROSS-REGISTRY VERIFICATION',
      icon: ShieldCheck,
      desc: 'Propositions are checked in real-time against PubMed, ArXiv, CrossRef registry, SEC EDGAR filings, and peer-reviewed journals.',
      details: [
        'Cryptographic validation of DOI existence and publication metadata',
        'Historical consensus verification to flag debunked legacy myths',
        'Direct quote verification preventing out-of-context distortion'
      ],
      metric: '150M+ Verified Papers'
    },
    {
      num: '04',
      title: 'Evidence Graph & Trust Scoring',
      kicker: 'PROBABILISTIC RESOLUTION',
      icon: GitMerge,
      desc: 'Synthesizes corroborated evidence into a defensible Trust Score (0-100), visual citation graph, and pinpoint hallucination alerts.',
      details: [
        'Bayesian evidence weight calculation based on source authority',
        'Color-coded sentence highlights directly in the user interface',
        'Actionable "Why?" explanations with counter-evidence citations'
      ],
      metric: '99.4% Factual Precision'
    }
  ];

  return (
    <section id="data-engine" className="py-16 lg:py-24 bg-[#F5EEDD] border-t border-[#84B3CE]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#84B3CE] bg-[#84B3CE]/15 text-[#16587B] text-xs font-bold tracking-widest uppercase mb-3 font-mono">
            <span>THE 4-STAGE VERIFICATION PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#16587B] tracking-tight">
            How AI Trust Enforces Ground Truth
          </h2>
          <p className="text-base sm:text-lg text-[#16587B]/80 mt-3 font-normal">
            Moving beyond simple keyword checks: a multi-layered forensic architecture engineered to catch subtle AI confabulations.
          </p>
        </div>

        {/* 4-Step Interactive Pipeline Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Step Selector Column */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'border-[#16587B] bg-white shadow-md ring-2 ring-[#16587B]/10'
                      : 'border-[#84B3CE]/60 bg-[#F5EEDD]/40 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#84B3CE]">
                      STAGE {step.num}
                    </span>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-[#84B3CE]/20 text-[#16587B]">
                      {step.metric}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-[#16587B] text-[#F5EEDD]' : 'bg-[#84B3CE]/20 text-[#16587B]'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#16587B]">{step.title}</h3>
                      <p className="text-[11px] font-mono font-semibold text-[#16587B]/60 uppercase tracking-wider">{step.kicker}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Pane */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#84B3CE] p-6 sm:p-8 shadow-md">
            <div className="flex items-center justify-between border-b border-[#84B3CE]/30 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-[#16587B] text-[#F5EEDD]">
                  STAGE {steps[activeStep].num} // ARCHITECTURE
                </span>
                <span className="text-xs font-mono font-bold text-[#84B3CE]">
                  {steps[activeStep].kicker}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-2xl font-bold text-[#16587B]">
                {steps[activeStep].title}
              </h3>
              
              <p className="text-sm text-[#16587B]/85 leading-relaxed font-sans">
                {steps[activeStep].desc}
              </p>

              <div className="pt-4 border-t border-[#84B3CE]/30">
                <h4 className="text-xs font-mono font-bold text-[#16587B] uppercase tracking-wider mb-3">
                  SYSTEM CAPABILITIES:
                </h4>
                <ul className="space-y-2.5">
                  {steps[activeStep].details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#16587B] font-sans">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 flex items-center justify-between">
                <div className="text-xs font-mono text-[#16587B]/70">
                  Reliability Benchmark: <strong className="text-[#16587B]">{steps[activeStep].metric}</strong>
                </div>

                <button
                  onClick={() => onOpenDemo(`Pipeline Stage: ${steps[activeStep].title}`)}
                  className="bg-[#16587B] hover:bg-[#0D3B53] text-[#F5EEDD] px-4 py-2 rounded text-xs font-mono font-bold uppercase transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Integrate Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
