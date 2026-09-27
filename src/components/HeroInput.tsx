import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Info, 
  Terminal, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Activity, 
  Radio, 
  Layers,
  ChevronRight,
  Gauge,
  RotateCcw,
  Zap,
  Globe,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { DEMO_PRESETS } from '../data/demoPresets';
import { FactCheckerCharacter } from './FactCheckerCharacter';

interface HeroInputProps {
  onStartVerification: (text: string, model: string) => void;
  onLoadDemo: (presetKey: string) => void;
}

export const HeroInput: React.FC<HeroInputProps> = ({ onStartVerification, onLoadDemo }) => {
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState('ChatGPT-4o');
  const [activeDemoTab, setActiveDemoTab] = useState<string>('neuroscience');
  const [selectedHallucination, setSelectedHallucination] = useState<number | null>(null);

  const models = [
    { name: 'ChatGPT-4o', engine: 'OpenAI GPT-4o' },
    { name: 'Claude 3.5 Sonnet', engine: 'Anthropic Claude' },
    { name: 'Gemini 2.5', engine: 'Google DeepMind' },
    { name: 'DeepSeek-R1', engine: 'DeepSeek AI' },
    { name: 'Custom AI', engine: 'Generic Model' }
  ];

  // Live fact-check feed simulator items (clickable!)
  const liveFactCheckFeeds = [
    {
      model: 'ChatGPT-4o',
      claim: 'Телескоп James Webb обнаружил галактику JADES-GS-z14-0 на красном смещении z=14.32.',
      status: 'verified',
      statusText: '🟢 ПОДТВЕРЖДЕНО',
      source: 'Nature / NASA JWST Data'
    },
    {
      model: 'Claude 3.5',
      claim: 'Шпинат содержит рекордное количество железа из-за опечатки доктора фон Вольфа в 1870 г.',
      status: 'refuted',
      statusText: '🔴 ОПРОВЕРГНУТО',
      source: 'Hamblin (2010) / BMJ Archives'
    },
    {
      model: 'Gemini 2.5',
      claim: 'Экипаж лунной миссии Artemis II состоит из 4 астронавтов (Вайзман, Гловер, Кох, Хансен).',
      status: 'verified',
      statusText: '🟢 ПОДТВЕРЖДЕНО',
      source: 'NASA Artemis Press Release'
    },
    {
      model: 'DeepSeek-R1',
      claim: 'Альберт Эйнштейн проваливал школьные экзамены по математике в детстве.',
      status: 'refuted',
      statusText: '🔴 ОПРОВЕРГНУТО',
      source: 'Princeton Einstein Archives'
    }
  ];

  // 7 Types of Hallucinations
  const hallucinationTypes = [
    {
      id: 1,
      title: 'Вымышленные цитаты и DOI',
      code: 'HAL-01 // FABRICATED CITATION',
      desc: 'ИИ генерирует правдоподобно звучащие названия статей и несуществующие DOI-ссылки.',
      example: '«Smith et al., 2021, Nature Neuroscience 14:22» — статья никогда не публиковалась.'
    },
    {
      id: 2,
      title: 'Фантомные эксперты',
      code: 'HAL-02 // PHANTOM EXPERT',
      desc: 'Приписывание реальных или выдуманных реплик известным историческим личностям.',
      example: 'Стив Джобс никогда не произносил фразу: «Интерфейс Xerox принадлежал всему человечеству».'
    },
    {
      id: 3,
      title: 'Хронологический сдвиг',
      code: 'HAL-03 // ANACRONISM ERROR',
      desc: 'Смешивание дат, последовательности исторических открытий или событий.',
      example: 'Утверждение, что ARPANET использовал протокол TCP/IP в 1969 году (TCP/IP принят 1 января 1983).'
    },
    {
      id: 4,
      title: 'Искажение количеств и чисел',
      code: 'HAL-04 // STATISTICAL MUTATION',
      desc: 'Изменение процентов, дозировок, расстояний или астрономических величин.',
      example: 'Перепутанное расстояние до Проксимы Центавра: 4.24 световых года указаны как 42.4.'
    },
    {
      id: 5,
      title: 'Эхо большинства (Majority Bias)',
      code: 'HAL-05 // MAJORITY BIAS ECHO',
      desc: 'ИИ повторяет популярные городские легенды интернета, игнорируя первоисточники.',
      example: 'Утверждение, что нервные клетки не восстанавливаются (нейрогенез у взрослых доказан).'
    },
    {
      id: 6,
      title: 'Ложный консенсус',
      code: 'HAL-06 // FALSE CONSENSUS',
      desc: 'Представление спорной гипотезы как общепринятого научного факта.',
      example: 'Однозначное утверждение гипотезы мультивселенной без указания отсутствия эмпирических доказательств.'
    },
    {
      id: 7,
      title: 'Логический разрыв (Non Sequitur)',
      code: 'HAL-07 // SYLLOGISTIC LEAP',
      desc: 'Правильные начальные предпосылки с ошибочным или противоречивым выводом.',
      example: '«Поскольку вода проводит ток, чистая дистиллированная вода опасна для удара молнии» (дистиллят — диэлектрик).'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim().length === 0) return;
    onStartVerification(inputText.trim(), selectedModel);
  };

  const handlePickDemo = (key: string) => {
    setActiveDemoTab(key);
    const demo = DEMO_PRESETS[key];
    if (demo) {
      setInputText(demo.report.originalText);
      setSelectedModel(demo.model);
    }
  };

  const handleLoadFeedItem = (claimText: string, model: string) => {
    setInputText(claimText);
    setSelectedModel(model);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 space-y-10">
      
      {/* ========================================================================= */}
      {/* 1. HERO TOP BANNER WITH METRICS & MISSION CONTROL AESTHETIC               */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden border border-slate-300 dark:border-white/15 bg-white/80 dark:bg-[#0a1020]/80 backdrop-blur-xl p-6 sm:p-10 shadow-2xl transition-all">
        
        {/* Subtle grid background inside hero box */}
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-80" />
        
        {/* Corner HUD crosshairs (SpaceX telemetry design) */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-sky-700 dark:text-cyan-400 font-bold select-none tracking-widest">+ TR-01 // CAPE CANAVERAL</div>
        <div className="absolute top-2 right-2 text-[10px] font-mono text-sky-700 dark:text-cyan-400 font-bold select-none tracking-widest">LAT 28.5721° N +</div>
        <div className="absolute bottom-2 left-2 text-[10px] font-mono text-sky-700 dark:text-cyan-400 font-bold select-none tracking-widest">+ CROSS_REF: ACTIVE</div>
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-sky-700 dark:text-cyan-400 font-bold select-none tracking-widest">TRUTH_COEF: 1.00 +</div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Main Title & Mission Brief */}
          <div className="flex-1 text-center lg:text-left space-y-4">
            
            {/* NASA Mission Patch Badge */}
            <div className="inline-flex items-center gap-2 border border-sky-600 dark:border-cyan-400/50 bg-sky-100/90 dark:bg-cyan-950/50 px-3 py-1 text-xs font-mono tracking-widest text-sky-900 dark:text-cyan-300 uppercase shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-600 dark:bg-cyan-400 animate-pulse" />
              <span>FORENSIC VERIFICATION MISSION // AI TRUST</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl uppercase font-mono leading-none">
              МОЖНО ЛИ ДОВЕРЯТЬ <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-sky-400 dark:to-blue-400">
                ОТВЕТУ ИИ?
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed font-sans font-medium">
              Проверяй не уверенность искусственного интеллекта, а реальные доказательства за каждым его утверждением.
            </p>

            {/* Anti-AI detector reminder (Mission warning badge) */}
            <div className="inline-flex items-center gap-2.5 border-l-2 border-sky-600 dark:border-cyan-400 bg-sky-50/80 dark:bg-white/5 px-3.5 py-2 text-xs font-mono text-slate-700 dark:text-slate-300">
              <Info className="h-4 w-4 text-sky-600 dark:text-cyan-400 shrink-0" />
              <span>Это <strong>не</strong> детектор авторства ИИ. Мы проверяем факты, первоисточники и выявляем галлюцинации.</span>
            </div>
          </div>

          {/* Interactive Character Spotlight Display */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative border border-slate-300 dark:border-white/15 bg-gradient-to-b from-sky-100/80 via-white to-sky-50 dark:from-slate-900 dark:via-[#0c1427] dark:to-slate-950 p-4 shadow-xl">
              
              {/* Telemetry frame top header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2 mb-2 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 font-bold text-sky-700 dark:text-cyan-400">
                  <Terminal className="h-3 w-3" />
                  AGENT: INSPECTOR TRUST
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">● STANDBY</span>
              </div>

              {/* Character Illustration */}
              <FactCheckerCharacter action="searching" size="hero" />

              {/* Action caption badge */}
              <div className="mt-2 border-t border-slate-200 dark:border-white/10 pt-2 text-center">
                <div className="text-[11px] font-mono font-bold tracking-widest text-slate-900 dark:text-white uppercase">
                  READY TO INVESTIGATE
                </div>
                <div className="text-[9px] font-mono text-sky-700 dark:text-cyan-400">
                  ENGINES: CROSSREF · PUBMED · ARCHIVES
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Live Aerospace Metric Strip */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="border-l-2 border-sky-600 dark:border-cyan-400 pl-3">
            <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">ПРОВЕРЕНО ТЕЗИСОВ</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">14,820+</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400">CROSS-CHECKED</div>
          </div>
          <div className="border-l-2 border-amber-500 pl-3">
            <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">НАЙДЕНО ГАЛЛЮЦИНАЦИЙ</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">3,490</div>
            <div className="text-[10px] text-amber-600 dark:text-amber-400">7 ПАТТЕРНОВ ОШИБОК</div>
          </div>
          <div className="border-l-2 border-blue-600 dark:border-blue-400 pl-3">
            <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">РЕЦЕНЗИРУЕМЫЕ ИСТОЧНИКИ</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">100% DOI</div>
            <div className="text-[10px] text-sky-700 dark:text-cyan-400">ПРЯМЫЕ ЦИТАТЫ</div>
          </div>
          <div className="border-l-2 border-purple-600 dark:border-purple-400 pl-3">
            <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">ФИЛЬТР БОЛЬШИНСТВА</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">АКТИВЕН</div>
            <div className="text-[10px] text-purple-600 dark:text-purple-400">БЕЗ ЭФФЕКТА ТОЛПЫ</div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN SPACEX / NASA INPUT TERMINAL CONSOLE                               */}
      {/* ========================================================================= */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border border-slate-300 dark:border-white/15 bg-white/90 dark:bg-[#0c1220]/90 backdrop-blur-xl shadow-2xl transition-all">
          
          {/* Console Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-white/10 px-4 py-3 bg-slate-100/80 dark:bg-black/40 gap-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-slate-800 dark:text-slate-200 uppercase">
              <Radio className="h-4 w-4 text-sky-600 dark:text-cyan-400 animate-pulse" />
              <span>SOURCE TELEMETRY // ВЫБЕРИТЕ МОДЕЛЬ ИИ:</span>
            </div>

            {/* Model Buttons - SpaceX style sharp rectangular buttons */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              {models.map((m) => (
                <button
                  type="button"
                  key={m.name}
                  onClick={() => setSelectedModel(m.name)}
                  className={`px-3 py-1 font-bold tracking-wider uppercase transition-all duration-150 cursor-pointer ${
                    selectedModel === m.name
                      ? 'bg-slate-950 text-white dark:bg-cyan-400 dark:text-slate-950 border border-slate-950 dark:border-cyan-400 shadow-[0_0_12px_rgba(14,165,233,0.3)]'
                      : 'border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5'
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Text Input Terminal Area */}
          <div className="relative p-5 sm:p-6 bg-slate-50/50 dark:bg-[#070b14]/50">
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
              <span>// PASTE AI RESPONSE BELOW FOR CLAIM DISSECTION</span>
              <span className="text-sky-700 dark:text-cyan-400 font-bold">{selectedModel} INGESTION BUFFER</span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Вставьте ответ ChatGPT, Claude, Gemini или другого ИИ, который хотите проверить..."
              rows={7}
              className="w-full resize-y bg-transparent text-sm leading-relaxed text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 font-sans focus:outline-none"
            />
          </div>

          {/* SpaceX Launch Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-white/10 px-5 py-4 bg-slate-100/70 dark:bg-black/50">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="font-bold text-sky-700 dark:text-cyan-400 tabular-nums">{inputText.length}</span>
              <span>CHARACTERS</span>
              <span>·</span>
              <span className="hidden sm:inline">PIPELINE: 5 STAGES</span>
            </div>

            <div className="flex w-full sm:w-auto items-center justify-end gap-3 font-mono">
              
              {/* Clear button if has text */}
              {inputText.length > 0 && (
                <button
                  type="button"
                  onClick={() => setInputText('')}
                  className="flex items-center gap-1.5 border border-slate-300 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase transition cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>CLEAR</span>
                </button>
              )}

              {/* NASA style Secondary Demo Button */}
              <button
                type="button"
                onClick={() => {
                  handlePickDemo('neuroscience');
                  onLoadDemo('neuroscience');
                }}
                className="flex items-center gap-2 border border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 px-4 py-2.5 text-xs font-bold tracking-widest text-slate-800 dark:text-slate-200 uppercase transition-all duration-150 cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>LOAD DEMO</span>
              </button>

              {/* SpaceX Launch Button */}
              <button
                type="submit"
                disabled={inputText.trim().length === 0}
                className="flex items-center justify-center gap-2 border border-slate-900 dark:border-cyan-400 bg-slate-900 text-white hover:bg-sky-600 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300 px-6 py-2.5 text-xs font-black tracking-widest uppercase transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(14,165,233,0.3)] active:scale-95 cursor-pointer"
              >
                <span>VERIFY RESPONSE</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* ========================================================================= */}
      {/* 3. LIVE RADAR FEED: RECENT VERIFIED CLAIMS (INTERACTIVE STREAM)           */}
      {/* ========================================================================= */}
      <div className="border border-slate-300 dark:border-white/15 bg-white/70 dark:bg-[#0c1220]/70 backdrop-blur-md p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-slate-900 dark:text-white uppercase">
            <Activity className="h-4 w-4 text-emerald-500 animate-pulse" />
            <span>ЖИВАЯ ЛЕНТА ПРОВЕРКИ ФАКТОВ // НАЖМИТЕ ДЛЯ ЗАГРУЗКИ В СКАНЕР:</span>
          </div>
          <span className="text-[10px] font-mono text-sky-700 dark:text-cyan-400 uppercase tracking-widest hidden sm:inline">
            ● LIVE TELEMETRY STREAM
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
          {liveFactCheckFeeds.map((feed, idx) => (
            <div
              key={idx}
              onClick={() => handleLoadFeedItem(feed.claim, feed.model)}
              className="group p-3.5 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-black/30 hover:border-sky-500 dark:hover:border-cyan-400 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="font-bold text-slate-700 dark:text-slate-300">[{feed.model}]</span>
                  <span className="font-bold">{feed.statusText}</span>
                </div>
                <p className="text-xs font-sans text-slate-800 dark:text-slate-200 leading-snug group-hover:text-sky-700 dark:group-hover:text-cyan-300 transition-colors">
                  «{feed.claim}»
                </p>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                <span>ИСТОЧНИК: {feed.source}</span>
                <span className="text-sky-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
                  ПРОВЕРИТЬ →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. PRE-FLIGHT DEMO TEST CASES (MISSION CARDS)                             */}
      {/* ========================================================================= */}
      <div className="border border-slate-300 dark:border-white/15 bg-white/70 dark:bg-[#0c1220]/70 backdrop-blur-md p-6">
        <div className="mb-4 flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-slate-900 dark:text-white uppercase">
            <Gauge className="h-4 w-4 text-sky-600 dark:text-cyan-400" />
            <span>ГОТОВЫЕ ДЕМОНСТРАЦИОННЫЕ КЕЙСЫ (ПРАВИЛЬНЫЕ, СПОРНЫЕ И ОШИБОЧНЫЕ ФАКТЫ):</span>
          </div>
          <span className="text-[11px] font-mono text-sky-700 dark:text-cyan-400 hidden sm:inline">[CLICK TO INGEST]</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Object.entries(DEMO_PRESETS).map(([key, demo]) => {
            const isSelected = activeDemoTab === key && inputText === demo.report.originalText;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  handlePickDemo(key);
                  onLoadDemo(key);
                }}
                className={`relative flex flex-col p-4 text-left font-mono transition-all duration-150 border cursor-pointer ${
                  isSelected
                    ? 'border-sky-600 dark:border-cyan-400 bg-sky-50 dark:bg-cyan-950/40 shadow-[0_0_15px_rgba(14,165,233,0.2)]'
                    : 'border-slate-200 dark:border-white/10 bg-white/80 dark:bg-black/30 hover:border-sky-400 dark:hover:border-white/30 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                {/* Mission Header */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span>{demo.label}</span>
                </div>
                <p className="mt-2 text-xs font-sans text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {demo.report.topic}
                </p>

                {/* Status Badges */}
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">🟢 {demo.report.stats.verified}</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">🟡 {demo.report.stats.needsReview}</span>
                    <span className="text-rose-600 dark:text-rose-400 font-bold">🔴 {demo.report.stats.refuted}</span>
                  </div>
                  {demo.report.stats.hallucinationsCount > 0 && (
                    <span className="text-rose-600 dark:text-rose-400 font-bold text-[10px]">
                      {demo.report.stats.hallucinationsCount} ГАЛЛЮЦ.
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE HALLUCINATION MATRIX (7 TYPES EXPLORER)                    */}
      {/* ========================================================================= */}
      <div className="border border-slate-300 dark:border-white/15 bg-white/80 dark:bg-[#0c1220]/80 backdrop-blur-md p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-slate-900 dark:text-white uppercase">
            <ShieldCheck className="h-4 w-4 text-sky-600 dark:text-cyan-400" />
            <span>АНАТОМИЯ ГАЛЛЮЦИНАЦИЙ ИИ // 7 ТИПОВ ОШИБОК, КОТОРЫЕ МЫ ВЫЯВЛЯЕМ:</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest hidden sm:inline">
            CLICK TO REVEAL SPEC
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono">
          {hallucinationTypes.map((ht) => {
            const isOpened = selectedHallucination === ht.id;
            return (
              <div
                key={ht.id}
                onClick={() => setSelectedHallucination(isOpened ? null : ht.id)}
                className={`p-3.5 border transition-all cursor-pointer ${
                  isOpened
                    ? 'border-sky-600 dark:border-cyan-400 bg-sky-50 dark:bg-cyan-950/30'
                    : 'border-slate-200 dark:border-white/10 bg-white/70 dark:bg-black/30 hover:border-slate-400 dark:hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                  <span>{ht.code}</span>
                  <span className="text-sky-700 dark:text-cyan-400 font-bold">{isOpened ? '▲' : '▼'}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase mb-1">
                  {ht.title}
                </div>
                <p className="text-xs font-sans text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ht.desc}
                </p>

                {isOpened && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-white/10 text-xs font-mono bg-slate-100/70 dark:bg-black/50 p-2.5">
                    <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold mb-1">
                      ПРИМЕР В ОТВЕТЕ ИИ:
                    </div>
                    <div className="text-slate-800 dark:text-slate-200 font-sans text-[11px] italic">
                      {ht.example}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. 3-PHASE VERIFICATION ARCHITECTURE HIGHLIGHTS                           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 font-mono">
        <div className="border border-slate-300 dark:border-white/15 bg-white/70 dark:bg-black/40 p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-cyan-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>PHASE 01 // DISSECTION</span>
          </div>
          <p className="text-xs font-sans text-slate-600 dark:text-slate-400 leading-relaxed">
            Разбиваем сложный многослойный ответ на атомарные проверяемые кванты фактов (Claims).
          </p>
        </div>

        <div className="border border-slate-300 dark:border-white/15 bg-white/70 dark:bg-black/40 p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Search className="h-4 w-4" />
            <span>PHASE 02 // EVIDENCE INGEST</span>
          </div>
          <p className="text-xs font-sans text-slate-600 dark:text-slate-400 leading-relaxed">
            Прямой поиск в PubMed, CrossRef, Scopus, NASA, ESA и подтвержденных архивных монографиях.
          </p>
        </div>

        <div className="border border-slate-300 dark:border-white/15 bg-white/70 dark:bg-black/40 p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
            <AlertTriangle className="h-4 w-4" />
            <span>PHASE 03 // HALLUCINATION SCAN</span>
          </div>
          <p className="text-xs font-sans text-slate-600 dark:text-slate-400 leading-relaxed">
            Выявляем выдуманных ученых, фальшивые цитаты, ложные даты и неподтвержденные источники.
          </p>
        </div>
      </div>

    </div>
  );
};
