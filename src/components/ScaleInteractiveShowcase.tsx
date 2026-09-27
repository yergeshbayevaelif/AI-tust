import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  GitCompare, 
  AlertTriangle, 
  Terminal, 
  Search, 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Clock, 
  ExternalLink, 
  Layers, 
  Check, 
  HelpCircle,
  FileText,
  Activity,
  ChevronRight,
  Database
} from 'lucide-react';
import { SEAL_HALLUCINATION_MODELS, HALLUCINATION_TAXONOMY } from '../data/scaleData';
import { COMPARISON_SCENARIOS, DEMO_PRESETS } from '../data/demoPresets';

interface ScaleInteractiveShowcaseProps {
  onStartVerification: (text: string, model: string) => void;
  onOpenDemo: (topic: string) => void;
}

export const ScaleInteractiveShowcase: React.FC<ScaleInteractiveShowcaseProps> = ({
  onStartVerification,
  onOpenDemo
}) => {
  const [activeTab, setActiveTab] = useState<'console' | 'seal' | 'comparison' | 'archetypes' | 'audit'>('seal');

  // Tab 1: Live Verification Console State
  const [consoleInput, setConsoleInput] = useState(
    'По данным статьи доктора Р. Ченга (2023) в Nature Neuroscience (DOI: 10.1038/s41593-023-01499-x), медитации увеличивают гиппокамп на 42% за 14 дней.'
  );
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [rigorLevel, setRigorLevel] = useState<'Standard' | 'Clinical' | 'Academic'>('Academic');

  // Tab 2: SEAL Leaderboard State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'factualPrecision' | 'hallucinationRate' | 'fabricatedDoiRate' | 'overallScore'>('factualPrecision');
  const [selectedModelForModal, setSelectedModelForModal] = useState<typeof SEAL_HALLUCINATION_MODELS[0] | null>(null);

  // Tab 3: Comparison State
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const activeScenario = COMPARISON_SCENARIOS[selectedScenarioIndex] || COMPARISON_SCENARIOS[0];

  // Tab 4: Archetypes State
  const [activeArchetypeId, setActiveArchetypeId] = useState<string>('fake-doi');

  // Tab 5: Sample audit history
  const [auditLogs] = useState([
    {
      id: 'AUD-8910',
      time: '12 minutes ago',
      model: 'ChatGPT-4o',
      domain: 'Neuroscience & Medicine',
      claimsCount: 4,
      score: 48,
      status: 'CRITICAL_HALLUCINATION',
      summary: 'Fabricated DOI and fictitious lead author detected in academic response.'
    },
    {
      id: 'AUD-8909',
      time: '34 minutes ago',
      model: 'Claude 3.5 Sonnet',
      domain: 'Nutritional History',
      claimsCount: 3,
      score: 74,
      status: 'MYTH_PROPAGATION',
      summary: 'Repeated debunked 1870 math typo myth regarding spinach iron contents.'
    },
    {
      id: 'AUD-8908',
      time: '1 hour ago',
      model: 'Gemini 2.0 Flash',
      domain: 'Astrophysics & Space',
      claimsCount: 5,
      score: 96,
      status: 'VERIFIED_FACTS',
      summary: 'Confirmed JWST redshift records against Nature and NASA mission data.'
    },
    {
      id: 'AUD-8907',
      time: '2 hours ago',
      model: 'DeepSeek-R1',
      domain: 'Corporate Finance (10-K)',
      claimsCount: 6,
      score: 61,
      status: 'NUMERIC_DISTORTION',
      summary: 'GAAP operating margin overstated by 12.8% compared to SEC EDGAR filing.'
    }
  ]);

  // Filtered SEAL models
  const filteredModels = SEAL_HALLUCINATION_MODELS.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.creator.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (sortField === 'hallucinationRate' || sortField === 'fabricatedDoiRate') {
      return a[sortField] - b[sortField]; // lower is better
    }
    return b[sortField] - a[sortField]; // higher is better
  });

  return (
    <section id="interactive-showcase" className="py-16 lg:py-24 bg-[#F5EEDD] border-t border-[#84B3CE]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#84B3CE] bg-[#84B3CE]/15 text-[#16587B] text-xs font-bold tracking-widest uppercase mb-3 font-mono">
            <span>AI TRUST LAB // INTERACTIVE VERIFICATION SUITE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#16587B] tracking-tight">
            The Trust & Hallucination Platform
          </h2>
          <p className="text-base sm:text-lg text-[#16587B]/80 mt-3 font-normal">
            Explore live factual evaluation, benchmark leaderboards, cross-model claim dissection, and forensic taxonomy.
          </p>
        </div>

        {/* Scale-Style Segmented Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 border-b border-[#84B3CE]/60">
          {[
            { id: 'seal', label: 'SEAL Hallucination Benchmark', icon: Award, tag: 'v2.4 Live' },
            { id: 'console', label: 'Live Verification Console', icon: ShieldCheck, tag: 'Engine' },
            { id: 'comparison', label: 'Cross-Model A/B Battle', icon: GitCompare, tag: 'Forensics' },
            { id: 'archetypes', label: '7 Hallucination Patterns', icon: AlertTriangle, tag: 'Taxonomy' },
            { id: 'audit', label: 'Verification Audit Logs', icon: Terminal, tag: 'Enterprise' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 rounded-t-lg font-mono text-xs font-bold transition-all duration-150 flex items-center gap-2 whitespace-nowrap border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-[#16587B] text-[#16587B] bg-[#84B3CE]/20 shadow-sm'
                    : 'border-transparent text-[#16587B]/70 hover:text-[#16587B] hover:bg-[#84B3CE]/10'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${isActive ? 'text-[#16587B]' : 'text-[#84B3CE]'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                  isActive ? 'bg-[#16587B] text-[#F5EEDD]' : 'bg-[#84B3CE]/30 text-[#16587B]'
                }`}>
                  {tab.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div className="mt-8">
          
          {/* TAB 1: SEAL HALLUCINATION LEADERBOARD */}
          {activeTab === 'seal' && (
            <div id="seal-leaderboard" className="rounded-xl border border-[#84B3CE] bg-white/80 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#84B3CE]/40">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#16587B] font-bold">
                    <Award className="w-4 h-4 text-[#16587B]" />
                    <span>SEAL HALLUCINATION & FACTUALITY INDEX (2026 Q1)</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#16587B] mt-1">
                    Frontier Model Hallucination Rankings
                  </h3>
                  <p className="text-xs text-[#16587B]/75 mt-1 font-sans">
                    Rigorous uncontaminated test set of 25,000 queries requiring verified DOIs, precise dates, and factual numbers.
                  </p>
                </div>

                {/* Filter and Search */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#16587B]/50" />
                    <input
                      type="text"
                      placeholder="Search model or lab..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-3 py-1.5 rounded-md border border-[#84B3CE] bg-[#F5EEDD]/50 text-xs font-mono text-[#16587B] focus:outline-none focus:border-[#16587B]"
                    />
                  </div>

                  <div className="flex items-center gap-1 text-xs font-mono">
                    <span className="text-[#16587B]/70 font-bold">SORT BY:</span>
                    <select
                      value={sortField}
                      onChange={(e) => setSortField(e.target.value as any)}
                      className="border border-[#84B3CE] bg-[#F5EEDD]/50 text-xs rounded px-2 py-1 text-[#16587B] font-mono focus:outline-none cursor-pointer"
                    >
                      <option value="factualPrecision">Factual Precision (High)</option>
                      <option value="hallucinationRate">Hallucination Rate (Low)</option>
                      <option value="fabricatedDoiRate">Fabricated DOI % (Low)</option>
                      <option value="overallScore">Overall Score</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Leaderboard Table in Scale style */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#16587B] text-[#16587B] bg-[#84B3CE]/15">
                      <th className="py-3 px-4 font-bold">RANK</th>
                      <th className="py-3 px-4 font-bold">MODEL & CREATOR</th>
                      <th className="py-3 px-4 font-bold text-right">FACTUAL PRECISION</th>
                      <th className="py-3 px-4 font-bold text-right">HALLUCINATION RATE</th>
                      <th className="py-3 px-4 font-bold text-right">FABRICATED DOI %</th>
                      <th className="py-3 px-4 font-bold text-right">MAJORITY RESISTANCE</th>
                      <th className="py-3 px-4 font-bold text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#84B3CE]/30">
                    {filteredModels.map((model, idx) => {
                      return (
                        <tr key={model.id} className="hover:bg-[#84B3CE]/10 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-[#16587B]">
                            #{idx + 1}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#16587B] text-sm font-sans">{model.name}</div>
                            <div className="text-[11px] text-[#16587B]/60 font-mono">{model.creator} • Context: {model.contextWindow}</div>
                          </td>
                          <td className="py-3.5 px-4 text-right font-bold text-[#16587B]">
                            <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                              {model.factualPrecision}%
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right font-bold">
                            <span className={`inline-block px-2 py-0.5 rounded ${
                              model.hallucinationRate < 6 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                : model.hallucinationRate < 10 
                                ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                                : 'bg-rose-50 text-rose-800 border border-rose-200'
                            }`}>
                              {model.hallucinationRate}%
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right font-bold">
                            <span className={`inline-block px-2 py-0.5 rounded ${
                              model.fabricatedDoiRate < 1.5 
                                ? 'bg-emerald-50 text-emerald-700' 
                                : 'bg-rose-50 text-rose-700 font-bold'
                            }`}>
                              {model.fabricatedDoiRate}%
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right text-[#16587B]">
                            {model.majorityBiasResistance}%
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => {
                                onStartVerification(
                                  `Проверить ответы модели ${model.name} на предмет вымышленных цитат и академических DOI.`,
                                  model.name
                                );
                              }}
                              className="px-3 py-1 bg-[#16587B] text-[#F5EEDD] hover:bg-[#0D3B53] rounded text-[11px] font-bold font-mono transition cursor-pointer"
                            >
                              Verify Claims
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Methodology Explainer Footer */}
              <div className="mt-6 pt-4 border-t border-[#84B3CE]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#16587B]/70 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Verified independently via automated multi-agent DOI & CrossRef reconciliation.</span>
                </div>
                <button
                  onClick={() => onOpenDemo('SEAL Enterprise Benchmark Access')}
                  className="font-bold underline hover:text-[#16587B] flex items-center gap-1"
                >
                  <span>Download Full SEAL Benchmark Whitepaper</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE VERIFICATION CONSOLE */}
          {activeTab === 'console' && (
            <div className="rounded-xl border border-[#84B3CE] bg-white/80 backdrop-blur-sm p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#84B3CE]/40">
                <div>
                  <h3 className="text-xl font-bold text-[#16587B]">
                    Interactive Truth Extraction Console
                  </h3>
                  <p className="text-xs text-[#16587B]/70 font-sans mt-0.5">
                    Deconstructs text into discrete factual claims and checks them against ground truth knowledge graphs.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#16587B]">RIGOR PROTOCOL:</span>
                  {(['Standard', 'Clinical', 'Academic'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setRigorLevel(lvl)}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                        rigorLevel === lvl
                          ? 'bg-[#16587B] text-[#F5EEDD]'
                          : 'bg-[#84B3CE]/20 text-[#16587B] hover:bg-[#84B3CE]/35'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Console Input & Parameters */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-3">
                  <label className="block text-xs font-mono font-bold text-[#16587B]">
                    AI TEXT BUFFER FOR PARSING:
                  </label>
                  <textarea
                    value={consoleInput}
                    onChange={(e) => setConsoleInput(e.target.value)}
                    rows={6}
                    className="w-full p-3.5 rounded-lg border border-[#84B3CE] bg-[#F5EEDD]/40 text-xs sm:text-sm font-sans text-[#16587B] focus:outline-none focus:border-[#16587B]"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#16587B]/60">
                      Rigor: {rigorLevel} • Minimum Confidence: {confidenceThreshold}%
                    </span>
                    <button
                      onClick={() => onStartVerification(consoleInput, 'ChatGPT-4o')}
                      className="px-5 py-2.5 bg-[#16587B] text-[#F5EEDD] hover:bg-[#0D3B53] font-mono font-bold text-xs uppercase rounded transition cursor-pointer flex items-center gap-2 shadow-sm"
                    >
                      <span>Execute Forensic Verification</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Live Heuristics Settings & Output Preview */}
                <div className="rounded-lg border border-[#84B3CE] bg-[#84B3CE]/10 p-4 space-y-4 font-mono text-xs text-[#16587B]">
                  <div className="font-bold flex items-center gap-1.5 border-b border-[#84B3CE]/40 pb-2">
                    <Sliders className="w-3.5 h-3.5 text-[#16587B]" />
                    <span>FORENSIC ENGINE SETTINGS</span>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>DOI CrossRef Validation:</span>
                      <span className="font-bold text-emerald-700">ACTIVE</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>PubMed Metadata Check:</span>
                      <span className="font-bold text-emerald-700">ACTIVE</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Temporal Chrono-Shift:</span>
                      <span className="font-bold text-emerald-700">ENABLED</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Numeric Tolerance:</span>
                      <span className="font-bold">±0.5% (Strict)</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#84B3CE]/40">
                    <label className="block text-[11px] font-bold mb-1">
                      CONFIDENCE THRESHOLD: {confidenceThreshold}%
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={99}
                      value={confidenceThreshold}
                      onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                      className="w-full accent-[#16587B] cursor-pointer"
                    />
                  </div>

                  <div className="bg-white/70 p-2.5 rounded border border-[#84B3CE]/40 text-[11px] leading-relaxed">
                    <span className="font-bold block mb-0.5">HEURISTIC NOTE:</span>
                    Claims containing unregistered DOI patterns like <code className="bg-[#84B3CE]/20 px-1 py-0.5 rounded">10.1038/...</code> are flagged with 99.8% confidence penalty.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CROSS-MODEL A/B BATTLE */}
          {activeTab === 'comparison' && (
            <div id="cross-model-comparison" className="rounded-xl border border-[#84B3CE] bg-white/80 backdrop-blur-sm p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#84B3CE]/40">
                <div>
                  <h3 className="text-xl font-bold text-[#16587B]">
                    Cross-Model Truth Discrepancy Battle
                  </h3>
                  <p className="text-xs text-[#16587B]/70 font-sans mt-0.5">
                    Compare how foundation models handle the same claim: who hallucinates and who enforces ground truth?
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {COMPARISON_SCENARIOS.map((scen, idx) => (
                    <button
                      key={scen.id}
                      onClick={() => setSelectedScenarioIndex(idx)}
                      className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition cursor-pointer ${
                        selectedScenarioIndex === idx
                          ? 'bg-[#16587B] text-[#F5EEDD]'
                          : 'bg-[#84B3CE]/20 text-[#16587B] hover:bg-[#84B3CE]/35'
                      }`}
                    >
                      {scen.topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scenario Context Banner */}
              <div className="p-3.5 bg-[#84B3CE]/15 rounded-lg border border-[#84B3CE] font-mono text-xs text-[#16587B]">
                <span className="font-bold">PROMPT INQUIRY: </span>
                <span className="font-sans italic">«{activeScenario.question}»</span>
              </div>

              {/* 3-Column Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* ChatGPT Column */}
                <div className="border border-[#84B3CE] rounded-lg p-4 bg-[#F5EEDD]/30 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#84B3CE]/40">
                    <span className="font-mono font-bold text-xs text-[#16587B]">ChatGPT-4o</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#84B3CE]/30 text-[#16587B] font-bold">
                      OpenAI
                    </span>
                  </div>
                  <p className="text-xs text-[#16587B] leading-relaxed font-sans">
                    {activeScenario.chatGptText}
                  </p>
                </div>

                {/* Gemini Column */}
                <div className="border border-[#84B3CE] rounded-lg p-4 bg-[#F5EEDD]/30 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#84B3CE]/40">
                    <span className="font-mono font-bold text-xs text-[#16587B]">Gemini 2.0</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#84B3CE]/30 text-[#16587B] font-bold">
                      Google DeepMind
                    </span>
                  </div>
                  <p className="text-xs text-[#16587B] leading-relaxed font-sans">
                    {activeScenario.geminiText}
                  </p>
                </div>

                {/* Claude Column */}
                <div className="border border-[#84B3CE] rounded-lg p-4 bg-[#F5EEDD]/30 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#84B3CE]/40">
                    <span className="font-mono font-bold text-xs text-[#16587B]">Claude 3.5 Sonnet</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#84B3CE]/30 text-[#16587B] font-bold">
                      Anthropic
                    </span>
                  </div>
                  <p className="text-xs text-[#16587B] leading-relaxed font-sans">
                    {activeScenario.claudeText}
                  </p>
                </div>

              </div>

              {/* Factual Analysis Verdict */}
              <div className="p-4 rounded-lg bg-[#16587B] text-[#F5EEDD] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#84B3CE]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>AI TRUST FORENSIC RESOLUTION</span>
                </div>
                <p className="text-xs font-sans leading-relaxed text-[#F5EEDD]/90">
                  {activeScenario.summary}
                </p>
                <div className="text-[11px] font-mono text-[#84B3CE] pt-1">
                  Majority Bias Note: {activeScenario.majorityInsight}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: 7 HALLUCINATION ARCHETYPES */}
          {activeTab === 'archetypes' && (
            <div id="hallucination-matrix" className="rounded-xl border border-[#84B3CE] bg-white/80 backdrop-blur-sm p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#16587B]">
                  Taxonomy of AI Hallucinations: 7 Core Patterns
                </h3>
                <p className="text-xs text-[#16587B]/70 font-sans mt-0.5">
                  AI Trust classifies confabulations into rigorous failure modes recognized by academic literature.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {HALLUCINATION_TAXONOMY.map((item) => {
                  const isSelected = activeArchetypeId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveArchetypeId(item.id)}
                      className={`p-4 rounded-lg border transition-all cursor-pointer space-y-2.5 ${
                        isSelected
                          ? 'border-[#16587B] bg-[#84B3CE]/20 shadow-md ring-1 ring-[#16587B]'
                          : 'border-[#84B3CE] bg-[#F5EEDD]/40 hover:bg-[#84B3CE]/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#16587B] text-[#F5EEDD]">
                          {item.severity}
                        </span>
                        <span className="text-[11px] font-mono text-[#16587B]/70 font-semibold">
                          Freq: {item.frequency}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#16587B] font-sans">
                        {item.name}
                      </h4>

                      <p className="text-xs text-[#16587B]/80 font-sans leading-relaxed">
                        {item.description}
                      </p>

                      <div className="pt-2 border-t border-[#84B3CE]/40 text-[11px] font-mono">
                        <span className="text-[#16587B]/60 block">EXAMPLE FLAW:</span>
                        <span className="text-rose-700 font-medium font-sans">«{item.example}»</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: AUDIT TRAIL LOGS */}
          {activeTab === 'audit' && (
            <div className="rounded-xl border border-[#84B3CE] bg-white/80 backdrop-blur-sm p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#84B3CE]/40">
                <div>
                  <h3 className="text-xl font-bold text-[#16587B]">
                    Enterprise Verification Flight Logs
                  </h3>
                  <p className="text-xs text-[#16587B]/70 font-sans mt-0.5">
                    Immutable verification records of all AI generations analyzed within the current environment.
                  </p>
                </div>

                <div className="text-xs font-mono font-bold text-[#16587B] bg-[#84B3CE]/20 px-3 py-1.5 rounded border border-[#84B3CE]">
                  AUDIT LOG RETENTION: IN-MEMORY ZERO-DATA STORAGE
                </div>
              </div>

              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 rounded-lg border border-[#84B3CE] bg-[#F5EEDD]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs hover:border-[#16587B] transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#16587B]">{log.id}</span>
                        <span className="text-[#16587B]/60 font-sans">{log.time}</span>
                        <span className="px-2 py-0.5 rounded bg-[#16587B] text-[#F5EEDD] font-bold text-[10px]">
                          {log.model}
                        </span>
                        <span className="text-[11px] text-[#16587B]/80 font-sans font-semibold">
                          Domain: {log.domain}
                        </span>
                      </div>
                      <p className="text-xs font-sans text-[#16587B] leading-relaxed">
                        {log.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-[10px] text-[#16587B]/70 font-bold">TRUST SCORE</div>
                        <div className={`text-base font-black ${
                          log.score > 80 ? 'text-emerald-700' : log.score > 60 ? 'text-amber-700' : 'text-rose-700'
                        }`}>
                          {log.score}/100
                        </div>
                      </div>

                      <button
                        onClick={() => onStartVerification(log.summary, log.model)}
                        className="px-3 py-1.5 rounded bg-[#16587B] text-[#F5EEDD] hover:bg-[#0D3B53] font-bold transition cursor-pointer"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
