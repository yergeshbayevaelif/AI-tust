import React from 'react';
import { X, CheckCircle2, AlertTriangle, XCircle, ShieldAlert, ExternalLink, Info, Check } from 'lucide-react';
import { Claim } from '../types/trust';

interface WhyModalProps {
  claim: Claim | null;
  onClose: () => void;
}

export const WhyModal: React.FC<WhyModalProps> = ({ claim, onClose }) => {
  if (!claim) return null;

  const isVerified = claim.status === 'verified';
  const isNeedsReview = claim.status === 'needs_review';
  const isRefuted = claim.status === 'refuted';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#16587B]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl border border-[#84B3CE] bg-[#F5EEDD] text-[#16587B] shadow-2xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#84B3CE]/40 px-5 py-4 bg-[#16587B] text-[#F5EEDD]">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-[#84B3CE]">
              CLAIM 0{claim.order} // ПОДРОБНЫЙ АНАЛИЗ ДОСТОВЕРНОСТИ
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded text-[#84B3CE] hover:text-white hover:bg-[#0D3B53] transition cursor-pointer"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* Claim Statement & Status Banner */}
          <div className="rounded-lg border border-[#84B3CE]/60 bg-white/80 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#16587B]/70 uppercase tracking-wider font-mono">
                Проверяемый тезис ИИ:
              </span>
              {isVerified && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 font-mono">
                  <CheckCircle2 className="h-4 w-4" />
                  ПОДТВЕРЖДЕНО НАУКОЙ
                </span>
              )}
              {isNeedsReview && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 font-mono">
                  <AlertTriangle className="h-4 w-4" />
                  ТРЕБУЕТ ПРОВЕРКИ
                </span>
              )}
              {isRefuted && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 font-mono">
                  <XCircle className="h-4 w-4" />
                  ОПРОВЕРГНУТО
                </span>
              )}
            </div>
            <p className="text-sm sm:text-base font-bold text-[#16587B] leading-relaxed">
              «{claim.statement}»
            </p>
          </div>

          {/* Hallucination Alert (if present) */}
          {claim.hallucinationMarker?.detected && (
            <div className="rounded-lg border border-rose-300 bg-rose-50 p-4">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs font-mono">
                <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0" />
                <span>ОБНАРУЖЕНА ГАЛЛЮЦИНАЦИЯ: {claim.hallucinationMarker.label}</span>
              </div>
              <p className="mt-1.5 text-xs text-rose-800 leading-relaxed">
                {claim.hallucinationMarker.details}
              </p>
            </div>
          )}

          {/* Logical Chain Breakdown */}
          {claim.detailedExplanation?.logicalChain && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#16587B]/70">
                ПОШАГОВАЯ ЛОГИЧЕСКАЯ ЦЕПОЧКА ПРОВЕРКИ:
              </span>
              <div className="rounded-lg border border-[#84B3CE]/50 bg-white/70 p-4 space-y-2.5">
                {claim.detailedExplanation.logicalChain.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-[#16587B]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#16587B] font-mono text-[10px] font-bold text-[#F5EEDD]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed pt-0.5">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scientific Evidence Sources */}
          {claim.evidenceList.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#16587B]/70">
                НАЙДЕННЫЕ ДОКАЗАТЕЛЬСТВА В БАЗАХ ДАННЫХ ({claim.evidenceList.length}):
              </span>
              <div className="space-y-2">
                {claim.evidenceList.map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-lg border border-[#84B3CE]/50 bg-white/80 p-3.5 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-[#16587B]">
                      <span>{ev.sourceName}</span>
                      <span className="text-[10px] font-mono text-[#16587B]/70 bg-[#84B3CE]/20 px-2 py-0.5 rounded">
                        {ev.sourceType}
                      </span>
                    </div>
                    <p className="text-xs text-[#16587B]/85 italic leading-relaxed">
                      «{ev.snippet}»
                    </p>
                    {ev.url && (
                      <div className="pt-1">
                        <a
                          href={ev.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#16587B] hover:underline"
                        >
                          <span>ОТКРЫТЬ DOI / ПУБЛИКАЦИЮ</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conclusion */}
          {claim.detailedExplanation?.conclusion && (
            <div className="rounded-lg border border-[#84B3CE]/60 bg-[#16587B] p-4 text-xs text-[#F5EEDD] space-y-1">
              <div className="font-bold text-[#84B3CE] uppercase tracking-wider font-mono text-[10px]">
                ИТОГОВОЕ ЗАКЛЮЧЕНИЕ ЭКСПЕРТИЗЫ:
              </div>
              <p className="leading-relaxed">{claim.detailedExplanation.conclusion}</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-[#84B3CE]/40 bg-white/60 p-4">
          <button
            onClick={onClose}
            className="bg-[#16587B] text-[#F5EEDD] hover:bg-[#0D3B53] px-5 py-2 rounded text-xs font-bold font-mono uppercase tracking-wider transition cursor-pointer"
          >
            ЗАКРЫТЬ
          </button>
        </div>

      </div>
    </div>
  );
};
