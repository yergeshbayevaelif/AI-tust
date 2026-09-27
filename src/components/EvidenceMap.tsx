import React, { useState } from 'react';
import { Claim, TrustReport, Evidence } from '../types/trust';
import { 
  ArrowDown, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ChevronRight, 
  HelpCircle, 
  Layers, 
  Search,
  ExternalLink,
  ShieldCheck,
  GitMerge,
  Sparkles,
  FileText
} from 'lucide-react';

interface EvidenceMapProps {
  report: TrustReport;
  onOpenWhy: (claim: Claim) => void;
}

export const EvidenceMap: React.FC<EvidenceMapProps> = ({ report, onOpenWhy }) => {
  const [selectedClaimId, setSelectedClaimId] = useState<string>(report.claims[0]?.id || '');
  const [hoveredSourceId, setHoveredSourceId] = useState<string | null>(null);

  const selectedClaim = report.claims.find((c) => c.id === selectedClaimId) || report.claims[0];

  return (
    <div className="rounded-2xl border-2 border-[#16587B] bg-[#F5EEDD] p-6 sm:p-8 text-[#16587B] shadow-xl animate-in fade-in duration-300 font-sans">
      
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#84B3CE]/40 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84B3CE]/30 border border-[#84B3CE] text-xs font-mono font-bold uppercase tracking-wider text-[#16587B]">
            <Layers className="h-3.5 w-3.5" />
            <span>КАРТА ДОКАЗАТЕЛЬСТВ // EVIDENCE GRAPH</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#16587B] mt-2">
            Граф верификации: от текста ИИ к первоисточникам
          </h2>
          <p className="text-xs text-[#16587B]/75 mt-0.5 font-sans">
            Интерактивная цепочка: AI Answer ➔ Claims ➔ Sources ➔ Cross-Check ➔ Result
          </p>
        </div>

        {/* Claim Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {report.claims.map((claim) => {
            const isSelected = claim.id === selectedClaim?.id;
            return (
              <button
                key={claim.id}
                onClick={() => setSelectedClaimId(claim.id)}
                className={`rounded-lg px-3.5 py-2 text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#16587B] text-[#F5EEDD] shadow-md ring-2 ring-[#84B3CE]'
                    : 'bg-white border border-[#84B3CE] text-[#16587B] hover:bg-[#84B3CE]/20'
                }`}
              >
                CLAIM 0{claim.order}
              </button>
            );
          })}
        </div>
      </div>

      {/* TIERED EVIDENCE VISUALIZATION:
          AI ANSWER
              ↓
          CLAIM 01
              ↓
          SOURCE 01  SOURCE 02  SOURCE 03
              ↓
          CROSS-CHECK
              ↓
          RESULT
      */}
      <div className="my-8 max-w-3xl mx-auto flex flex-col items-center space-y-6">
        
        {/* LEVEL 1: AI ANSWER */}
        <div className="w-full max-w-xl text-center">
          <div className="bg-[#16587B] text-[#F5EEDD] border-2 border-[#84B3CE] rounded-xl p-4 shadow-md font-mono">
            <div className="text-[10px] text-[#84B3CE] font-bold uppercase tracking-wider mb-1">
              [ УРОВЕНЬ 1: ИСХОДНЫЙ ОТВЕТ ИИ ({report.modelSource}) ]
            </div>
            <p className="text-xs text-white/90 font-serif italic truncate max-w-lg mx-auto">
              «{report.originalText.slice(0, 120)}...»
            </p>
          </div>
        </div>

        {/* Animated Connector Arrow 1 */}
        <div className="flex flex-col items-center text-[#16587B]">
          <div className="h-6 w-0.5 bg-[#16587B]" />
          <ArrowDown className="w-4 h-4 text-[#16587B] -mt-1 animate-bounce" />
        </div>

        {/* LEVEL 2: ATOMIC CLAIM */}
        {selectedClaim && (
          <div className="w-full max-w-xl text-center">
            <div className="bg-white border-2 border-[#16587B] rounded-xl p-4 sm:p-5 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-extrabold text-[#16587B] bg-[#84B3CE]/20 px-2.5 py-0.5 rounded">
                  УРОВЕНЬ 2: ТЕЗИС 0{selectedClaim.order}
                </span>
                <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                  selectedClaim.status === 'verified'
                    ? 'bg-emerald-100 text-emerald-800'
                    : selectedClaim.status === 'refuted'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {selectedClaim.status === 'verified' ? '🟢 ПОДТВЕРЖДЕНО' : selectedClaim.status === 'refuted' ? '🔴 ОПРОВЕРГНУТО' : '🟡 ТРЕБУЕТ ПРОВЕРКИ'}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-[#16587B] leading-snug">
                «{selectedClaim.statement}»
              </h4>
            </div>
          </div>
        )}

        {/* Animated Connector Arrow 2 */}
        <div className="flex flex-col items-center text-[#16587B]">
          <div className="h-6 w-0.5 bg-[#16587B]" />
          <ArrowDown className="w-4 h-4 text-[#16587B] -mt-1" />
        </div>

        {/* LEVEL 3: SOURCES GRID */}
        {selectedClaim && (
          <div className="w-full">
            <div className="text-center font-mono text-xs font-bold text-[#16587B] mb-2 uppercase">
              [ УРОВЕНЬ 3: НАЙДЕННЫЕ ДОКАЗАТЕЛЬСТВА И РЕЕСТРЫ ({selectedClaim.evidenceList.length}) ]
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl mx-auto">
              {selectedClaim.evidenceList.map((ev, eIdx) => {
                const isHovered = hoveredSourceId === ev.id;
                return (
                  <div
                    key={ev.id}
                    onMouseEnter={() => setHoveredSourceId(ev.id)}
                    onMouseLeave={() => setHoveredSourceId(null)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer shadow-sm ${
                      ev.supports
                        ? 'border-emerald-400 bg-emerald-50/80 text-emerald-950'
                        : 'border-rose-400 bg-rose-50/80 text-rose-950'
                    } ${isHovered ? 'scale-102 shadow-md ring-2 ring-[#16587B]' : ''}`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs">
                      <span>ИСТОЧНИК 0{eIdx + 1}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        ev.supports ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                      }`}>
                        {ev.supports ? '✓ Подтверждает' : '✕ Опровергает'}
                      </span>
                    </div>

                    <h5 className="font-extrabold text-sm text-[#16587B] mt-1.5 truncate">
                      {ev.sourceName}
                    </h5>

                    <p className="text-[10px] font-mono text-[#16587B]/70">
                      {ev.sourceType}
                    </p>

                    <p className="text-xs italic leading-relaxed mt-2 bg-white/70 p-2 rounded border border-current/10 font-serif">
                      «{ev.snippet}»
                    </p>

                    {ev.url && (
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#16587B] hover:underline mt-2"
                      >
                        <span>Проверить ссылку</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Animated Connector Arrow 3 */}
        <div className="flex flex-col items-center text-[#16587B]">
          <div className="h-6 w-0.5 bg-[#16587B]" />
          <ArrowDown className="w-4 h-4 text-[#16587B] -mt-1" />
        </div>

        {/* LEVEL 4: CROSS-CHECK RECONCILIATION */}
        {selectedClaim && (
          <div className="w-full max-w-xl text-center">
            <div className="bg-[#84B3CE]/20 border-2 border-[#84B3CE] rounded-xl p-4 shadow-sm space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-center gap-2 font-bold text-[#16587B]">
                <GitMerge className="w-4 h-4 text-[#16587B] animate-spin" style={{ animationDuration: '8s' }} />
                <span>УРОВЕНЬ 4: CROSS-CHECK РАССЛЕДОВАНИЕ</span>
              </div>
              <p className="text-xs font-sans text-[#16587B] leading-relaxed max-w-md mx-auto">
                Сопоставление независимых доказательств: {selectedClaim.evidenceList.filter(e => e.supports).length} подтверждают, {selectedClaim.evidenceList.filter(e => !e.supports).length} опровергают.
              </p>
            </div>
          </div>
        )}

        {/* Animated Connector Arrow 4 */}
        <div className="flex flex-col items-center text-[#16587B]">
          <div className="h-6 w-0.5 bg-[#16587B]" />
          <ArrowDown className="w-4 h-4 text-[#16587B] -mt-1" />
        </div>

        {/* LEVEL 5: FINAL VERDICT & WHY BUTTON */}
        {selectedClaim && (
          <div className="w-full max-w-xl text-center">
            <div className={`border-2 rounded-xl p-5 shadow-lg space-y-3 ${
              selectedClaim.status === 'verified'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                : selectedClaim.status === 'refuted'
                ? 'bg-rose-50 border-rose-500 text-rose-950'
                : 'bg-amber-50 border-amber-500 text-amber-950'
            }`}>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider">
                УРОВЕНЬ 5: ИТОГОВЫЙ РЕЗУЛЬТАТ
              </div>

              <div className="text-lg font-black font-sans">
                {selectedClaim.detailedExplanation.conclusion}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenWhy(selectedClaim)}
                  className="bg-[#16587B] hover:bg-[#0D3B53] text-[#F5EEDD] px-5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Открыть обоснование «Почему?»</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
