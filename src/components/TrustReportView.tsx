import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  Share2,
  Download,
  ArrowLeft,
  Layers,
  FileText,
  Info,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';
import { TrustReport, Claim } from '../types/trust';
import { EvidenceMap } from './EvidenceMap';
import { FactCheckerCharacter } from './FactCheckerCharacter';

interface TrustReportViewProps {
  report: TrustReport;
  onOpenWhy: (claim: Claim) => void;
  onReset: () => void;
}

export const TrustReportView: React.FC<TrustReportViewProps> = ({
  report,
  onOpenWhy,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<'cards' | 'evidence-map'>('cards');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'needs_review' | 'refuted' | 'opinion'>('all');
  const [expandedWhyIds, setExpandedWhyIds] = useState<{ [id: string]: boolean }>({
    [report.claims[0]?.id || '']: true, // first card expanded by default to teach UX
  });
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleWhy = (claimId: string) => {
    setExpandedWhyIds((prev) => ({
      ...prev,
      [claimId]: !prev[claimId],
    }));
  };

  const filteredClaims = report.claims.filter((c) => {
    if (statusFilter === 'all') return true;
    return c.status === statusFilter;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `AI-Trust-Report-${report.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const opinionCount = report.claims.filter((c) => c.status === 'opinion').length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300 font-sans">
      
      {/* Top Navigation & Action Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#16587B] hover:text-[#0D3B53] transition group border border-[#84B3CE] px-4 py-2 bg-white rounded-lg cursor-pointer shadow-sm"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>ПРОВЕРИТЬ ДРУГОЙ ОТВЕТ</span>
        </button>

        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex items-center border border-[#84B3CE] bg-white p-0.5 rounded-lg shadow-sm">
            <button
              onClick={() => setActiveTab('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all cursor-pointer rounded-md ${
                activeTab === 'cards'
                  ? 'bg-[#16587B] text-[#F5EEDD] shadow-sm'
                  : 'text-[#16587B] hover:bg-[#84B3CE]/20'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>КАРТОЧКИ ТЕЗИСОВ</span>
            </button>
            <button
              onClick={() => setActiveTab('evidence-map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all cursor-pointer rounded-md ${
                activeTab === 'evidence-map'
                  ? 'bg-[#16587B] text-[#F5EEDD] shadow-sm'
                  : 'text-[#16587B] hover:bg-[#84B3CE]/20'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>EVIDENCE MAP</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 border border-[#84B3CE] bg-white px-3 py-2 text-xs font-bold text-[#16587B] hover:bg-[#84B3CE]/20 transition rounded-lg cursor-pointer"
            title="Поделиться отчетом"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? 'СКОПИРОВАНО' : 'ПОДЕЛИТЬСЯ'}</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-1.5 border border-[#84B3CE] bg-white px-3 py-2 text-xs font-bold text-[#16587B] hover:bg-[#84B3CE]/20 transition rounded-lg cursor-pointer"
            title="Скачать JSON"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">JSON</span>
          </button>
        </div>
      </div>

      {/* Main Executive Summary Panel: AI TRUST REPORT */}
      <div className="relative overflow-hidden border-2 border-[#16587B] bg-[#16587B] text-[#F5EEDD] rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 scale-grid opacity-15" />
        
        <div className="relative z-10 space-y-6">
          
          {/* Header Metadata & Brand Character */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#84B3CE]/30 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#84B3CE] uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ОТЧЕТ ПРОВЕРКИ ДОСТОВЕРНОСТИ</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
                AI TRUST REPORT
              </h1>
              <p className="text-xs text-[#84B3CE] mt-0.5 font-mono">
                ИСТОЧНИК: {report.modelSource} &bull; ДАТА: {new Date(report.timestamp).toLocaleDateString('ru-RU')}
              </p>
            </div>

            {/* Investigator Character Banner */}
            <div className="flex items-center gap-3 bg-[#0D3B53] border border-[#84B3CE]/40 px-3.5 py-2.5 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                <FactCheckerCharacter 
                  size="md" 
                  action={report.stats.refuted > 0 ? 'comparing_cards' : 'completed'} 
                  className="scale-90"
                />
              </div>
              <div className="text-xs font-mono">
                <span className="text-[#84B3CE] font-bold block">ВЕРДИКТ АНАЛИТИКА:</span>
                <span className="text-white font-extrabold text-sm">
                  {report.stats.refuted > 0 ? 'Найдены ошибки' : 'Доказательства найдены'}
                </span>
              </div>
            </div>
          </div>

          {/* User's requested summary structure: NOT just a %, but counts:
              3 Подтверждено, 1 Требует проверки, 1 Опровергнуто */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {report.summaryHeadline}
            </h2>
            <p className="text-sm text-[#F5EEDD]/90 leading-relaxed font-normal max-w-3xl">
              {report.summaryEvaluation}
            </p>
          </div>

          {/* Status Breakdown Cards (User Requirement 4) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 font-mono">
            {/* 1. Verified */}
            <div className="border border-emerald-400/40 bg-emerald-950/40 p-4 rounded-xl">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>ПОДТВЕРЖДЕНО</span>
              </div>
              <div className="text-3xl font-black text-emerald-300">{report.stats.verified}</div>
              <div className="text-[11px] text-emerald-400/80 mt-1">Надёжные источники ✓</div>
            </div>

            {/* 2. Needs Review */}
            <div className="border border-amber-400/40 bg-amber-950/40 p-4 rounded-xl">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>СПОРНО / ТРЕБУЕТ ПРОВЕРКИ</span>
              </div>
              <div className="text-3xl font-black text-amber-300">{report.stats.needsReview}</div>
              <div className="text-[11px] text-amber-400/80 mt-1">Нет консенсуса</div>
            </div>

            {/* 3. Refuted */}
            <div className="border border-rose-400/40 bg-rose-950/40 p-4 rounded-xl">
              <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold mb-1">
                <XCircle className="w-4 h-4" />
                <span>ОПРОВЕРГНУТО</span>
              </div>
              <div className="text-3xl font-black text-rose-300">{report.stats.refuted}</div>
              <div className="text-[11px] text-rose-400/80 mt-1">Миф или выдумка ✕</div>
            </div>

            {/* 4. Opinion / Total */}
            <div className="border border-[#84B3CE]/40 bg-[#0D3B53] p-4 rounded-xl">
              <div className="flex items-center gap-1.5 text-xs text-[#84B3CE] font-bold mb-1">
                <Info className="w-4 h-4" />
                <span>{opinionCount > 0 ? 'МНЕНИЕ / ПРОГНОЗ' : 'ВСЕГО ТЕЗИСОВ'}</span>
              </div>
              <div className="text-3xl font-black text-white">
                {opinionCount > 0 ? opinionCount : report.stats.totalClaims}
              </div>
              <div className="text-[11px] text-[#84B3CE] mt-1">
                {opinionCount > 0 ? 'Субъективное суждение' : 'Проанализировано'}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Dissected Original Text Accordion */}
      <div className="border border-[#84B3CE]/70 bg-white rounded-xl p-5 sm:p-6 space-y-3 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#84B3CE]/30 pb-2 text-xs font-mono">
          <span className="font-bold text-[#16587B] uppercase flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#16587B]" />
            <span>ИСХОДНЫЙ ОТВЕТ ИИ:</span>
          </span>
          <span className="text-[#16587B]/60">{report.claims.length} отдельных утверждений</span>
        </div>
        <p className="text-sm leading-relaxed text-[#16587B] font-serif italic bg-[#F5EEDD]/40 p-4 rounded-lg border border-[#84B3CE]/30">
          «{report.originalText}»
        </p>
      </div>

      {/* Evidence Map Tab */}
      {activeTab === 'evidence-map' && (
        <EvidenceMap report={report} onOpenWhy={onOpenWhy} />
      )}

      {/* Claims Cards Tab (User Requirements 5 & 6: CLAIM-BY-CLAIM ANALYSIS & WHY?) */}
      {activeTab === 'cards' && (
        <div className="space-y-6">
          
          {/* Status Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#84B3CE]/40 pb-3 font-mono">
            <div className="text-xs font-bold text-[#16587B] uppercase tracking-wider flex items-center gap-2">
              <span>АНАЛИЗ КАЖДОГО УТВЕРЖДЕНИЯ ({filteredClaims.length} ИЗ {report.claims.length}):</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded font-bold transition cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-[#16587B] text-[#F5EEDD]'
                    : 'border border-[#84B3CE] text-[#16587B] hover:bg-[#84B3CE]/20 bg-white'
                }`}
              >
                ВСЕ ({report.claims.length})
              </button>
              <button
                onClick={() => setStatusFilter('verified')}
                className={`px-3 py-1 rounded font-bold transition cursor-pointer ${
                  statusFilter === 'verified'
                    ? 'bg-emerald-700 text-white'
                    : 'border border-[#84B3CE] text-emerald-800 hover:bg-emerald-50 bg-white'
                }`}
              >
                ПОДТВЕРЖДЕНО ({report.stats.verified})
              </button>
              <button
                onClick={() => setStatusFilter('needs_review')}
                className={`px-3 py-1 rounded font-bold transition cursor-pointer ${
                  statusFilter === 'needs_review'
                    ? 'bg-amber-600 text-white'
                    : 'border border-[#84B3CE] text-amber-800 hover:bg-amber-50 bg-white'
                }`}
              >
                СПОРНО ({report.stats.needsReview})
              </button>
              <button
                onClick={() => setStatusFilter('refuted')}
                className={`px-3 py-1 rounded font-bold transition cursor-pointer ${
                  statusFilter === 'refuted'
                    ? 'bg-rose-700 text-white'
                    : 'border border-[#84B3CE] text-rose-800 hover:bg-rose-50 bg-white'
                }`}
              >
                ОПРОВЕРГНУТО ({report.stats.refuted})
              </button>
            </div>
          </div>

          {/* List of Individual Claim Cards */}
          <div className="space-y-5">
            {filteredClaims.map((claim) => {
              const isVerified = claim.status === 'verified';
              const isRefuted = claim.status === 'refuted';
              const isNeedsReview = claim.status === 'needs_review';
              const isOpinion = claim.status === 'opinion';
              const isWhyExpanded = !!expandedWhyIds[claim.id];

              return (
                <div
                  key={claim.id}
                  className={`border-2 rounded-xl p-5 sm:p-7 transition-all shadow-sm ${
                    isRefuted
                      ? 'border-rose-400 bg-rose-50/40'
                      : isNeedsReview
                      ? 'border-amber-400 bg-amber-50/40'
                      : isOpinion
                      ? 'border-slate-300 bg-slate-50/60'
                      : 'border-[#84B3CE] bg-white'
                  }`}
                >
                  {/* Claim Card Top: CLAIM 01 & Status Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#84B3CE]/30 pb-3">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-extrabold text-xs text-[#16587B] bg-[#84B3CE]/20 px-2.5 py-1 rounded-md border border-[#84B3CE]/50">
                        CLAIM 0{claim.order}
                      </span>

                      {/* Hallucination Tag if detected */}
                      {claim.hallucinationMarker?.detected && (
                        <span className="bg-rose-700 text-white px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide">
                          🔴 {claim.hallucinationMarker.label}
                        </span>
                      )}
                    </div>

                    {/* Status Pill */}
                    <div>
                      {isVerified && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          <span>🟢 ПОДТВЕРЖДЕНО</span>
                        </span>
                      )}
                      {isNeedsReview && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                          <span>🟡 ТРЕБУЕТ ПРОВЕРКИ</span>
                        </span>
                      )}
                      {isRefuted && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-rose-800 bg-rose-100 border border-rose-300 px-3 py-1 rounded-full">
                          <XCircle className="h-4 w-4 text-rose-600" />
                          <span>🔴 ОПРОВЕРГНУТО</span>
                        </span>
                      )}
                      {isOpinion && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-slate-700 bg-slate-100 border border-slate-300 px-3 py-1 rounded-full">
                          <Info className="h-4 w-4 text-slate-500" />
                          <span>⚪ СУБЪЕКТИВНОЕ МНЕНИЕ</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Statement itself */}
                  <h3 className="mt-3.5 text-lg sm:text-xl font-bold text-[#16587B] leading-snug">
                    «{claim.statement}»
                  </h3>

                  {/* Brief summary explanation */}
                  <p className="mt-2 text-sm text-[#16587B]/85 leading-relaxed font-sans">
                    {claim.summaryReason}
                  </p>

                  {/* Hallucination warning callout */}
                  {claim.hallucinationMarker?.detected && (
                    <div className="mt-3.5 p-3 rounded-lg border border-rose-300 bg-rose-100 text-xs text-rose-900 space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <ShieldAlert className="h-4 w-4 text-rose-700" />
                        <span>ПОТЕНЦИАЛЬНАЯ ГАЛЛЮЦИНАЦИЯ ИИ:</span>
                      </div>
                      <p className="leading-relaxed font-sans">{claim.hallucinationMarker.details}</p>
                    </div>
                  )}

                  {/* EVIDENCE List (User Requirement 5 & 9: Source Cards) */}
                  {claim.evidenceList.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-[#84B3CE]/30 space-y-2.5">
                      <div className="text-[11px] font-mono font-bold text-[#16587B]/70 uppercase tracking-wider flex items-center gap-1.5">
                        <Search className="w-3.5 h-3.5 text-[#16587B]" />
                        <span>НАЙДЕННЫЕ ДОКАЗАТЕЛЬСТВА ({claim.evidenceList.length}):</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {claim.evidenceList.map((ev) => (
                          <div
                            key={ev.id}
                            className={`p-3 rounded-lg border text-xs space-y-1.5 transition-colors ${
                              ev.supports
                                ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                                : 'bg-rose-50/60 border-rose-300 text-rose-950'
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold">
                              <span className="truncate">{ev.sourceName}</span>
                              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                                ev.supports ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'
                              }`}>
                                {ev.supports ? '✓ Подтверждает' : '✕ Опровергает'}
                              </span>
                            </div>

                            <div className="text-[10px] font-mono text-[#16587B]/70">
                              Тип: {ev.sourceType}
                            </div>

                            <p className="text-[11px] italic leading-relaxed text-[#16587B]/90 font-serif">
                              «{ev.snippet}»
                            </p>

                            {ev.url && (
                              <a
                                href={ev.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#16587B] hover:underline pt-0.5"
                              >
                                <span>Открыть первоисточник</span>
                                <ExternalLink className="h-2.5 w-2.5" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* USER REQUIREMENT 6: THE «ПОЧЕМУ?» (WHY?) EXPANDER */}
                  <div className="mt-4 pt-3 border-t border-[#84B3CE]/30">
                    <button
                      onClick={() => toggleWhy(claim.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        isWhyExpanded
                          ? 'bg-[#16587B] text-[#F5EEDD]'
                          : 'bg-[#84B3CE]/20 text-[#16587B] hover:bg-[#84B3CE]/35 border border-[#84B3CE]'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>ПОЧЕМУ ТАКОЙ РЕЗУЛЬТАТ?</span>
                      {isWhyExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {/* Expandable Why Content */}
                    {isWhyExpanded && (
                      <div className="mt-3 p-4 sm:p-5 rounded-xl border border-[#84B3CE] bg-[#F5EEDD]/50 text-xs text-[#16587B] space-y-3 font-sans animate-in fade-in slide-in-from-top-1 duration-200">
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] pb-3 border-b border-[#84B3CE]/40">
                          <div className="bg-white/70 p-2 rounded border border-[#84B3CE]/40">
                            <span className="text-[#16587B]/70 block">НАЙДЕНО ИСТОЧНИКОВ:</span>
                            <span className="font-bold text-sm">{claim.detailedExplanation.foundSourcesCount || claim.evidenceList.length}</span>
                          </div>
                          <div className="bg-white/70 p-2 rounded border border-[#84B3CE]/40">
                            <span className="text-emerald-700 block">ПОДТВЕРЖДАЮТ:</span>
                            <span className="font-bold text-sm text-emerald-800">
                              {claim.detailedExplanation.supportingSources.length || claim.evidenceList.filter(e => e.supports).length}
                            </span>
                          </div>
                          <div className="bg-white/70 p-2 rounded border border-[#84B3CE]/40">
                            <span className="text-rose-700 block">ПРОТИВОРЕЧАТ:</span>
                            <span className="font-bold text-sm text-rose-800">
                              {claim.detailedExplanation.contradictingSources.length || claim.evidenceList.filter(e => !e.supports).length}
                            </span>
                          </div>
                          <div className="bg-white/70 p-2 rounded border border-[#84B3CE]/40">
                            <span className="text-[#16587B]/70 block">КАЧЕСТВО ИСТОЧНИКОВ:</span>
                            <span className="font-bold text-sm text-[#16587B]">Высокое (High)</span>
                          </div>
                        </div>

                        {/* Concrete Reason & Explanation */}
                        <div>
                          <span className="font-mono font-bold text-xs uppercase text-[#16587B] block mb-1">
                            ПОДРОБНОЕ ОБЪЯСНЕНИЕ ПРИЧИНЫ:
                          </span>
                          <p className="text-sm font-medium leading-relaxed bg-white/80 p-3 rounded-lg border border-[#84B3CE]/40">
                            {claim.detailedExplanation.conclusion}
                          </p>
                        </div>

                        {/* Logical Step Chain */}
                        {claim.detailedExplanation.logicalChain?.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            <span className="font-mono font-bold text-[11px] uppercase text-[#16587B]/80 block">
                              ЛОГИКА РАССЛЕДОВАНИЯ:
                            </span>
                            <ul className="space-y-1">
                              {claim.detailedExplanation.logicalChain.map((step, sIdx) => (
                                <li key={sIdx} className="flex items-start gap-2 text-xs">
                                  <span className="font-mono text-[#84B3CE] font-bold">0{sIdx + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => onOpenWhy(claim)}
                            className="text-xs font-mono font-bold text-[#16587B] hover:underline flex items-center gap-1"
                          >
                            <span>Открыть карточку в модальном окне</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>

                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
