import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  FileText, 
  ShieldCheck, 
  GitMerge, 
  RotateCcw,
  Layers,
  HelpCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { FactCheckerCharacter } from './FactCheckerCharacter';
import { DEMO_PRESETS } from '../data/demoPresets';

interface ScaleHeroProps {
  onStartVerification: (text: string, model: string) => void;
  onOpenDemoPreset: () => void;
  isAnalyzing: boolean;
}

export const ScaleHero: React.FC<ScaleHeroProps> = ({ 
  onStartVerification, 
  onOpenDemoPreset,
  isAnalyzing
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState('ChatGPT');

  const models = ['ChatGPT', 'Claude', 'Gemini', 'Другой ИИ'];

  const handleVerify = () => {
    if (!inputText.trim()) return;
    onStartVerification(inputText, selectedModel);
  };

  const handleClear = () => {
    setInputText('');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-18 bg-[#F5EEDD] scale-grid">
      
      {/* Decorative ambient radial glows in palette #84B3CE and #16587B */}
      <div className="pointer-events-none absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#84B3CE]/20 blur-[120px] -z-10" />
      <div className="pointer-events-none absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#16587B]/10 blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          {/* Eyebrow badge with mini character indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#84B3CE] bg-[#84B3CE]/20 text-[#16587B] text-xs font-bold tracking-wider uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#16587B] animate-pulse" />
            <span>AI TRUST // ПРОВЕРКА ФАКТОВ В ОТВЕТАХ ИИ</span>
          </div>

          {/* Monumental Headline requested by user */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16587B] tracking-tight leading-[1.1] text-balance">
            Можно ли доверять ответу ИИ?
          </h1>

          {/* Subtitle requested by user */}
          <p className="text-base sm:text-xl text-[#16587B]/85 font-normal max-w-2xl mx-auto leading-relaxed text-balance">
            Вставьте ответ ИИ — мы проверим его утверждения, найдём доказательства и объясним результат.
          </p>

          {/* Visual Workflow Diagram: AI Answer ↓ Claims ↓ Evidence ↓ Trust Report */}
          <div className="pt-2 pb-1">
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 bg-white/70 border border-[#84B3CE] rounded-full px-4 py-2 text-xs font-mono font-bold text-[#16587B] shadow-sm">
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-[#16587B]" />
                <span>AI Answer</span>
              </span>
              <span className="text-[#84B3CE]">➔</span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#16587B]" />
                <span>Claims</span>
              </span>
              <span className="text-[#84B3CE]">➔</span>
              <span className="flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-[#16587B]" />
                <span>Evidence</span>
              </span>
              <span className="text-[#84B3CE]">➔</span>
              <span className="flex items-center gap-1 text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Trust Report</span>
              </span>
            </div>
          </div>
        </div>

        {/* Big Input Area & Character Deck (Scale AI design with Friendly UX) */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="rounded-2xl border-2 border-[#16587B] bg-white shadow-2xl overflow-hidden transition-all duration-300">
            
            {/* Top Toolbar: Model Selector & Companion Badge */}
            <div className="bg-[#16587B] text-[#F5EEDD] px-4 sm:px-6 py-3 border-b border-[#84B3CE]/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#84B3CE] animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#F5EEDD]">
                  ИСТОЧНИК ОТВЕТА:
                </span>
                <div className="flex items-center gap-1 ml-1">
                  {models.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedModel(m)}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                        selectedModel === m
                          ? 'bg-[#84B3CE] text-[#16587B]'
                          : 'bg-[#0D3B53] text-[#F5EEDD]/80 hover:bg-[#134966] hover:text-[#F5EEDD]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Friendly Researcher Character Mini-Banner */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#84B3CE]/30 border border-[#84B3CE] flex items-center justify-center overflow-hidden">
                  <FactCheckerCharacter size="sm" action="reading" className="scale-75" />
                </div>
                <span className="text-xs text-[#F5EEDD]/90 font-medium hidden sm:inline">
                  Факт-чекер готов к расследованию
                </span>
              </div>
            </div>

            {/* Main Textarea */}
            <div className="p-4 sm:p-6 bg-[#F5EEDD]/30 space-y-4">
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Вставьте ответ ChatGPT, Gemini, Claude или другого ИИ..."
                  rows={6}
                  className="w-full rounded-xl border-2 border-[#84B3CE]/60 bg-white p-4 sm:p-5 text-sm sm:text-base text-[#16587B] placeholder:text-[#16587B]/45 focus:border-[#16587B] focus:outline-none transition-all resize-y font-sans leading-relaxed shadow-inner"
                />

                {/* Character Counter */}
                <div className="absolute bottom-3 right-3 text-[11px] font-mono font-semibold text-[#16587B]/70 bg-[#F5EEDD] px-2.5 py-0.5 rounded border border-[#84B3CE]/50">
                  {inputText.length} символов • {inputText.split(/[.!?]+/).filter(Boolean).length} предложений
                </div>
              </div>

              {/* Primary Action Buttons: [ Проверить ответ ] & [ Попробовать демо ] */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                
                <div className="text-xs text-[#16587B]/75 flex items-center gap-1.5 font-medium">
                  <Search className="w-4 h-4 text-[#16587B]" />
                  <span>Каждое утверждение будет независимо проверено по надёжным источникам.</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {inputText.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="px-3.5 py-3 rounded-lg border border-[#84B3CE] text-[#16587B] hover:bg-[#84B3CE]/20 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                    >
                      Очистить
                    </button>
                  )}

                  {/* "Попробовать демо" Button */}
                  <button
                    type="button"
                    onClick={onOpenDemoPreset}
                    className="flex-1 sm:flex-none border-2 border-[#16587B] text-[#16587B] bg-white hover:bg-[#84B3CE]/20 px-5 py-3 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 active:scale-98 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-[#16587B]" />
                    <span>Попробовать демо</span>
                  </button>

                  {/* "Проверить ответ" Button */}
                  <button
                    type="button"
                    onClick={handleVerify}
                    disabled={isAnalyzing || !inputText.trim()}
                    className="flex-1 sm:flex-none bg-[#16587B] hover:bg-[#0D3B53] text-[#F5EEDD] disabled:opacity-50 px-6 py-3 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 active:scale-98 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 border border-[#84B3CE]"
                  >
                    {isAnalyzing ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-[#F5EEDD] border-t-transparent animate-spin" />
                        <span>Проверяем...</span>
                      </>
                    ) : (
                      <>
                        <span>Проверить ответ</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>

            {/* Quick Demo Previews Strip */}
            <div className="bg-[#84B3CE]/15 px-4 sm:px-6 py-3 border-t border-[#84B3CE]/40 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-[#16587B] font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#16587B]" />
                <span>ГОТОВЫЙ ПРИМЕР:</span>
              </span>

              <div 
                onClick={onOpenDemoPreset}
                className="cursor-pointer hover:underline text-[#16587B] font-sans truncate max-w-xl flex items-center gap-1"
              >
                <span className="font-bold">«The Earth is ~4.5B years old. Great Wall visible from Moon. Water boils at 100°C...»</span>
                <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 ml-1">
                  Запустить проверку ➔
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
