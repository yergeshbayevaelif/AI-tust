import React from 'react';
import { TrustReport } from '../types/trust';
import { Clock, Trash2, ArrowRight, ShieldCheck, FileText, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { FactCheckerCharacter } from './FactCheckerCharacter';

interface HistoryViewProps {
  history: TrustReport[];
  onSelectReport: (report: TrustReport) => void;
  onClearHistory: () => void;
  onNewCheck: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectReport,
  onClearHistory,
  onNewCheck,
}) => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-300 font-sans">
      
      {/* Header with Mascot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#84B3CE]/40 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#16587B] mb-1 uppercase tracking-wider">
            <Clock className="h-4 w-4" />
            <span>ИСТОРИЯ ПРОВЕРОК // PREVIOUS CHECKS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#16587B]">
            Журнал проверенных ответов
          </h1>
          <p className="mt-1 text-xs text-[#16587B]/75 font-sans">
            Сохраненные отчеты верификации в текущей сессии браузера
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 border border-rose-300 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition rounded-lg uppercase font-mono cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Очистить журнал</span>
          </button>
        )}
      </div>

      {/* History Items List */}
      {history.length === 0 ? (
        <div className="border-2 border-[#84B3CE] rounded-2xl bg-white p-12 text-center space-y-4 shadow-sm">
          <FactCheckerCharacter action="idle" size="md" className="mx-auto" />
          <h3 className="text-base font-bold text-[#16587B] uppercase tracking-wider">
            Журнал проверок пуст
          </h3>
          <p className="text-xs text-[#16587B]/75 max-w-sm mx-auto leading-relaxed">
            Здесь будут сохраняться проверенные ответы нейросетей, чтобы вы могли вернуться к доказательствам в любой момент.
          </p>
          <div className="pt-2">
            <button
              onClick={onNewCheck}
              className="border-2 border-[#16587B] bg-[#16587B] text-[#F5EEDD] hover:bg-[#0D3B53] px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition rounded-lg cursor-pointer shadow-md"
            >
              Выполнить первую проверку
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3.5">
          {history.map((report) => (
            <div
              key={report.id}
              onClick={() => onSelectReport(report)}
              className="group cursor-pointer border-2 border-[#84B3CE]/60 rounded-xl bg-white p-5 transition hover:border-[#16587B] hover:shadow-md"
            >
              {/* Top metadata line: Topic | Date | Model */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#84B3CE]/30 pb-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#16587B] bg-[#84B3CE]/20 px-2 py-0.5 rounded">
                    {report.modelSource}
                  </span>
                  <span className="text-[#84B3CE]">&bull;</span>
                  <span className="text-[#16587B]/70 font-sans font-bold">
                    {report.topic || 'Проверка утверждений ИИ'}
                  </span>
                  <span className="text-[#84B3CE]">&bull;</span>
                  <span className="text-[#16587B]/60">
                    {new Date(report.timestamp).toLocaleString('ru-RU')}
                  </span>
                </div>

                {/* Status counts: Supported | Uncertain | Contradicted */}
                <div className="flex items-center gap-3 font-mono font-bold text-xs">
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    🟢 {report.stats.verified} Подтверждено
                  </span>
                  <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    🟡 {report.stats.needsReview} Требует проверки
                  </span>
                  <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    🔴 {report.stats.refuted} Опровергнуто
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#84B3CE] group-hover:text-[#16587B] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Headline & Snippet */}
              <div className="mt-3 space-y-1">
                <h4 className="text-sm font-bold text-[#16587B] group-hover:text-[#0D3B53] transition-colors">
                  {report.summaryHeadline}
                </h4>
                <p className="text-xs text-[#16587B]/75 line-clamp-2 italic font-serif">
                  «{report.originalText}»
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
