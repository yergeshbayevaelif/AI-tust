import React from 'react';
import {
  FileText,
  Search,
  GitMerge,
  HelpCircle,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Layers,
  AlertTriangle
} from 'lucide-react';
import { FactCheckerCharacter } from './FactCheckerCharacter';

export const HowItWorksView: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'ANALYZE',
      label: 'Разбиваем ответ ИИ на отдельные проверяемые утверждения',
      desc: 'Языковые модели маскируют ошибки среди верных фактов. AI Trust декомпозирует связанный текст на атомарные утверждения (Claims): даты, числовые показатели, цитаты и научные тезисы.',
      icon: FileText,
      characterAction: 'reading' as const,
    },
    {
      num: '02',
      title: 'FIND EVIDENCE',
      label: 'Ищем релевантные и надёжные источники',
      desc: 'Для каждого утверждения система находит первичные документы: научные статьи в PubMed, реестры CrossRef/DOI, государственные архивы и стандарты (NASA, NIST, IUPAC).',
      icon: Search,
      characterAction: 'searching' as const,
    },
    {
      num: '03',
      title: 'CROSS-CHECK',
      label: 'Сравниваем утверждение с найденными доказательствами',
      desc: 'Проводится перекрестная сверка фактов. Мы не считаем большинство мнений правильным: факт подтверждается только независимыми доказательствами.',
      icon: GitMerge,
      characterAction: 'comparing_sources' as const,
    },
    {
      num: '04',
      title: 'EXPLAIN',
      label: 'Объясняем пользователю, почему результат именно такой',
      desc: 'Формируется Trust Report с картой доказательств (Evidence Map). В карточке каждого тезиса есть кнопка «Почему?», раскрывающая конкретные причины и найденные цитаты.',
      icon: HelpCircle,
      characterAction: 'completed' as const,
    },
  ];

  const hallucinations = [
    { title: 'Выдуманные факты', desc: 'Утверждения о несуществующих событиях или физических процессах.' },
    { title: 'Несуществующие исследования', desc: 'Ссылки на фиктивных авторов или сфабрикованные статьи в Nature.' },
    { title: 'Фейковые цитаты', desc: 'Приписывание известных реплик историческим личностям (Эйнштейн, Фрейд).' },
    { title: 'Неправильные даты', desc: 'Хронологические сдвиги и анахронизмы в исторических событиях.' },
    { title: 'Искаженная статистика', desc: 'Преувеличенные проценты, фальсифицированные дозировки и цифры.' },
    { title: 'Несуществующие источники', desc: 'Генерация фиктивных DOI-ссылок, которых нет в официальных реестрах.' },
    { title: 'Утверждения без доказательств', desc: 'Категоричные заявления без проверяемой эмпирической базы.' },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-10 animate-in fade-in duration-300 font-sans">
      
      {/* Hero header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 border border-[#84B3CE] bg-[#84B3CE]/20 px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-[#16587B] uppercase rounded-full">
          <BookOpen className="h-3.5 w-3.5" />
          <span>КАК ЭТО РАБОТАЕТ // МЕТОДОЛОГИЯ AI TRUST</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#16587B] tracking-tight">
          Как AI Trust проверяет факты
        </h1>
        <p className="text-sm sm:text-base text-[#16587B]/85 font-normal max-w-2xl mx-auto">
          Не просто вердикт «верно / неверно», а прозрачный путь от ответа ИИ до каждого доказательства.
        </p>
      </div>

      {/* Visual Pipeline Diagram (User Requirement 12) */}
      <div className="rounded-2xl border-2 border-[#16587B] bg-white p-6 sm:p-8 shadow-lg space-y-3">
        <div className="text-center text-xs font-mono font-bold text-[#16587B] uppercase tracking-wider mb-2">
          ЦЕПОЧКА ВЕРИФИКАЦИИ В ОДНОЙ СХЕМЕ:
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono font-extrabold text-[#16587B]">
          <div className="bg-[#16587B] text-[#F5EEDD] px-3.5 py-2 rounded-lg shadow-sm flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#84B3CE]" />
            <span>AI ANSWER</span>
          </div>

          <ChevronRight className="w-5 h-5 text-[#84B3CE] shrink-0" />

          <div className="bg-white border-2 border-[#16587B] text-[#16587B] px-3.5 py-2 rounded-lg shadow-sm flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#16587B]" />
            <span>CLAIMS</span>
          </div>

          <ChevronRight className="w-5 h-5 text-[#84B3CE] shrink-0" />

          <div className="bg-[#84B3CE]/25 border border-[#84B3CE] text-[#16587B] px-3.5 py-2 rounded-lg shadow-sm flex items-center gap-1.5">
            <Search className="w-4 h-4 text-[#16587B]" />
            <span>EVIDENCE</span>
          </div>

          <ChevronRight className="w-5 h-5 text-[#84B3CE] shrink-0" />

          <div className="bg-amber-100 border border-amber-300 text-amber-950 px-3.5 py-2 rounded-lg shadow-sm flex items-center gap-1.5">
            <GitMerge className="w-4 h-4 text-amber-800" />
            <span>CROSS-CHECK</span>
          </div>

          <ChevronRight className="w-5 h-5 text-[#84B3CE] shrink-0" />

          <div className="bg-emerald-100 border border-emerald-400 text-emerald-950 px-3.5 py-2 rounded-lg shadow-sm flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span>EXPLANATION</span>
          </div>
        </div>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="rounded-2xl border border-[#84B3CE] bg-white p-6 shadow-sm space-y-4 hover:border-[#16587B] transition-colors"
            >
              <div className="flex items-center justify-between border-b border-[#84B3CE]/30 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-white bg-[#16587B] px-2.5 py-1 rounded">
                    {step.num}
                  </span>
                  <span className="font-mono text-xs font-extrabold text-[#16587B]">
                    {step.title}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#84B3CE]/20 flex items-center justify-center text-[#16587B]">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#16587B]">
                  {step.label}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#16587B]/85 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-[#F5EEDD] border border-[#84B3CE] flex items-center justify-center overflow-hidden shrink-0">
                  <FactCheckerCharacter size="sm" action={step.characterAction} className="scale-75" />
                </div>
                <span className="text-[11px] font-mono text-[#16587B]/70 italic">
                  Исследователь выполняет этап {step.num}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hallucination Types Section */}
      <div className="rounded-2xl border border-[#84B3CE] bg-[#F5EEDD] p-6 sm:p-8 space-y-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-rose-800 uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>ДИАГНОСТИКА ОШИБОК И ВЫМЫСЛА</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#16587B]">
            Какие типы галлюцинаций выявляет AI Trust
          </h2>
          <p className="text-xs text-[#16587B]/80 font-sans mt-0.5">
            Система распознает 7 основных видов неточностей, сгенерированных языковыми моделями.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {hallucinations.map((h, i) => (
            <div
              key={i}
              className="bg-white border border-[#84B3CE]/60 rounded-xl p-3.5 space-y-1 text-xs"
            >
              <div className="font-bold text-[#16587B] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
                <span>{h.title}</span>
              </div>
              <p className="text-[#16587B]/75 leading-relaxed text-[11px]">
                {h.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
