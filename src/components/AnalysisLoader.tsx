import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Search, 
  Database, 
  GitMerge, 
  ShieldCheck, 
  FileText, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { FactCheckerCharacter, CharacterAction } from './FactCheckerCharacter';

interface AnalysisLoaderProps {
  onComplete: () => void;
  targetModel: string;
}

interface StepItem {
  id: number;
  number: string;
  title: string;
  desc: string;
  action: CharacterAction;
}

export const AnalysisLoader: React.FC<AnalysisLoaderProps> = ({ onComplete, targetModel }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps: StepItem[] = [
    {
      id: 1,
      number: '01',
      title: 'Анализируем утверждения',
      desc: 'Выделяем отдельные проверяемые факты и гипотезы из ответа ИИ...',
      action: 'reading',
    },
    {
      id: 2,
      number: '02',
      title: 'Ищем доказательства',
      desc: 'Ищем релевантные научные публикации, реестры и первоисточники...',
      action: 'searching',
    },
    {
      id: 3,
      number: '03',
      title: 'Проверяем источники',
      desc: 'Оцениваем авторитетность организаций и валидируем ссылки...',
      action: 'comparing_sources',
    },
    {
      id: 4,
      number: '04',
      title: 'Сравниваем информацию',
      desc: 'Сопоставляем утверждения с найденными доказательствами (Cross-check)...',
      action: 'comparing_cards',
    },
    {
      id: 5,
      number: '05',
      title: 'Формируем Trust Report',
      desc: 'Составляем карту доказательств и обоснования «Почему?»...',
      action: 'completed',
    },
  ];

  const currentStep = steps[activeStep - 1] || steps[0];

  useEffect(() => {
    const stepDuration = 750; // smooth 3.75s investigation experience
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < steps.length) {
          setCompletedSteps((c) => [...c, prev]);
          return prev + 1;
        } else {
          setCompletedSteps((c) => [...c, prev]);
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onComplete, steps.length]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12 animate-in fade-in duration-300 font-sans">
      
      {/* Investigation Dashboard Frame */}
      <div className="rounded-2xl border-2 border-[#16587B] bg-[#F5EEDD] shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
        
        {/* Subtle background radar circles */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#84B3CE]/20 blur-3xl -z-10" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#16587B]/10 blur-3xl -z-10" />

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#84B3CE]/40 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#84B3CE]/30 border border-[#84B3CE] text-[#16587B] text-[11px] font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#16587B] animate-ping" />
              <span>РАССЛЕДОВАНИЕ ДОСТОВЕРНОСТИ // AI TRUST</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16587B] tracking-tight">
              Проверяем ответ {targetModel}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[11px] font-mono font-bold text-[#16587B]/70 block">ЭТАП ПРОВЕРКИ</span>
              <span className="text-sm font-mono font-extrabold text-[#16587B]">
                {currentStep.number} ИЗ 05
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#16587B] text-[#F5EEDD] flex items-center justify-center font-mono font-extrabold text-base shadow-sm border border-[#84B3CE]">
              {Math.round((activeStep / 5) * 100)}%
            </div>
          </div>
        </div>

        {/* Central Character & Interactive Investigation Stage */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-4">
          
          {/* Fact-Checking Investigator Character with Floating Evidence Badges */}
          <div className="relative flex flex-col items-center">
            
            {/* Floating Claim Card (Animated) */}
            <div className={`absolute -top-4 -left-8 sm:-left-16 z-20 transition-all duration-500 transform ${
              activeStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}>
              <div className="bg-white/95 border border-[#84B3CE] shadow-lg px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-[#16587B] flex items-center gap-1.5 animate-pulse">
                <FileText className="w-3.5 h-3.5 text-[#16587B]" />
                <span>Claim #0{activeStep}</span>
              </div>
            </div>

            {/* Floating Source Card (Animated) */}
            <div className={`absolute -bottom-2 -right-6 sm:-right-12 z-20 transition-all duration-500 transform ${
              activeStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="bg-[#16587B] border border-[#84B3CE] shadow-lg px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-[#F5EEDD] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#84B3CE]" />
                <span>Source Verified ✓</span>
              </div>
            </div>

            {/* Floating Radar Icon (Animated) */}
            <div className={`absolute top-1/2 -right-12 z-20 transition-all duration-500 ${
              activeStep === 3 || activeStep === 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}>
              <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-700 flex items-center justify-center shadow-md animate-spin" style={{ animationDuration: '6s' }}>
                <GitMerge className="w-4 h-4" />
              </div>
            </div>

            {/* Character Instance */}
            <div className="p-4 rounded-2xl bg-white/70 border border-[#84B3CE]/60 shadow-inner">
              <FactCheckerCharacter
                action={currentStep.action}
                size="hero"
              />
            </div>

            {/* Character State Status Line */}
            <div className="mt-3 text-center">
              <span className="font-mono text-xs font-bold text-[#16587B] bg-[#84B3CE]/20 px-3 py-1 rounded-full border border-[#84B3CE]">
                {activeStep === 1 && 'Аналитик: «Разбиваю ответ на атомарные утверждения...»'}
                {activeStep === 2 && 'Аналитик: «Ищу доказательства в проверенных базах знаний...»'}
                {activeStep === 3 && 'Аналитик: «Оцениваю достоверность и независимость источников...»'}
                {activeStep === 4 && 'Аналитик: «Сверяю факты: подтверждено или миф?..»'}
                {activeStep === 5 && 'Аналитик: «Отчет сформирован! Открываю Trust Report...»'}
              </span>
            </div>
          </div>

          {/* Steps Progress List */}
          <div className="flex-1 w-full max-w-md space-y-2.5">
            {steps.map((st) => {
              const isPast = completedSteps.includes(st.id);
              const isCurrent = activeStep === st.id;

              return (
                <div
                  key={st.id}
                  className={`p-3 rounded-xl border transition-all duration-300 flex items-center gap-3.5 ${
                    isCurrent
                      ? 'bg-white border-[#16587B] shadow-md ring-2 ring-[#16587B]/10 translate-x-1'
                      : isPast
                      ? 'bg-emerald-50/70 border-emerald-300/80 text-[#16587B]'
                      : 'bg-white/40 border-[#84B3CE]/30 opacity-60'
                  }`}
                >
                  {/* Step status circle */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                    isPast
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-[#16587B] text-[#F5EEDD] animate-pulse'
                      : 'bg-[#84B3CE]/20 text-[#16587B]'
                  }`}>
                    {isPast ? <Check className="w-4 h-4" /> : st.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs sm:text-sm font-bold truncate ${
                        isCurrent ? 'text-[#16587B]' : isPast ? 'text-emerald-950' : 'text-[#16587B]/70'
                      }`}>
                        {st.title}
                      </h4>
                      {isCurrent && (
                        <span className="text-[10px] font-mono font-bold text-[#16587B] bg-[#84B3CE]/30 px-2 py-0.5 rounded animate-pulse">
                          В ПРОЦЕССЕ
                        </span>
                      )}
                      {isPast && (
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          ГОТОВО ✓
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#16587B]/75 truncate mt-0.5">
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Global Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-xs font-mono font-bold text-[#16587B]/80">
            <span>ПРОГРЕСС РАССЛЕДОВАНИЯ:</span>
            <span>{Math.round((activeStep / 5) * 100)}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[#84B3CE]/30 overflow-hidden border border-[#84B3CE]/50">
            <div 
              className="h-full bg-[#16587B] transition-all duration-500 ease-out"
              style={{ width: `${(activeStep / 5) * 100}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};
