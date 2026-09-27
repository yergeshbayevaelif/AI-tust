import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ScaleFooterProps {
  onNavigate: (view: 'main' | 'compare' | 'history' | 'how-it-works') => void;
  onOpenDemoPreset: () => void;
}

export const ScaleFooter: React.FC<ScaleFooterProps> = ({ onNavigate, onOpenDemoPreset }) => {
  return (
    <footer className="bg-[#16587B] text-[#F5EEDD] border-t border-[#84B3CE]/40 pt-14 pb-12 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner Band: Don't just trust AI. Check the evidence. */}
        <div className="pb-10 border-b border-[#84B3CE]/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#84B3CE]">
              AI TRUST // ФАКТ-ЧЕКИНГ ОТВЕТОВ ИИ
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5EEDD]">
              «Don&apos;t just trust AI. Check the evidence.»
            </h3>
            <p className="text-xs text-[#84B3CE] font-sans">
              Проверяйте факты, находите доказательства и выявляйте выдуманные утверждения.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenDemoPreset}
              className="bg-[#84B3CE] text-[#16587B] hover:bg-[#A7C9DD] px-5 py-2.5 rounded-lg font-bold text-xs uppercase font-mono tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-2"
            >
              <span>Попробовать демо</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('main')}
              className="border border-[#84B3CE] text-[#F5EEDD] hover:bg-[#0D3B53] px-5 py-2.5 rounded-lg font-bold text-xs uppercase font-mono tracking-wider transition-colors cursor-pointer"
            >
              Проверить ответ
            </button>
          </div>
        </div>

        {/* Multi-Column Nav Grid */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-sans">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div 
              className="flex items-center gap-2 group cursor-pointer" 
              onClick={() => { onNavigate('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <div className="w-7 h-7 bg-[#F5EEDD] text-[#16587B] flex items-center justify-center rounded font-mono font-black text-xs">
                AI
              </div>
              <span className="text-xl font-black tracking-tight text-[#F5EEDD]">
                AI Trust
              </span>
            </div>
            <p className="text-[#84B3CE] text-xs leading-relaxed">
              Сервис проверки фактов и выявления галлюцинаций в ответах искусственного интеллекта.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-300 font-semibold bg-[#0D3B53] px-2.5 py-1 rounded border border-[#84B3CE]/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>СИСТЕМА АКТИВНА</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <div className="font-mono font-bold uppercase tracking-wider text-[#84B3CE] text-[11px]">
              Навигация
            </div>
            <ul className="space-y-2 text-[#F5EEDD]/80">
              <li><button onClick={() => onNavigate('main')} className="hover:text-white cursor-pointer text-left">Проверить ответ ИИ</button></li>
              <li><button onClick={() => onNavigate('how-it-works')} className="hover:text-white cursor-pointer text-left">Как это работает</button></li>
              <li><button onClick={() => onNavigate('compare')} className="hover:text-white cursor-pointer text-left">Сравнить ответы разных ИИ</button></li>
              <li><button onClick={() => onNavigate('history')} className="hover:text-white cursor-pointer text-left">История проверок</button></li>
            </ul>
          </div>

          {/* Methodology */}
          <div className="space-y-2">
            <div className="font-mono font-bold uppercase tracking-wider text-[#84B3CE] text-[11px]">
              Методология
            </div>
            <ul className="space-y-2 text-[#F5EEDD]/80">
              <li>01. Декомпозиция утверждений (Claims)</li>
              <li>02. Поиск доказательств (Evidence)</li>
              <li>03. Сверка с первоисточниками (DOI)</li>
              <li>04. Обоснование «Почему?»</li>
              <li>05. Карта связей (Evidence Map)</li>
            </ul>
          </div>

          {/* Research & Compliance */}
          <div className="space-y-2">
            <div className="font-mono font-bold uppercase tracking-wider text-[#84B3CE] text-[11px]">
              Безопасность
            </div>
            <ul className="space-y-2 text-[#F5EEDD]/80">
              <li>Zero Data Retention (ZDR)</li>
              <li>Проверка в оперативной памяти</li>
              <li>Независимые первоисточники</li>
              <li>Защита от Majority Bias</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#84B3CE]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#84B3CE]">
          <div>
            &copy; 2026 AI Trust. Hackathon MVP. All rights reserved.
          </div>
          <div>
            CLAIM ➔ EVIDENCE ➔ CROSS-CHECK ➔ EXPLANATION ➔ RESULT
          </div>
        </div>

      </div>
    </footer>
  );
};
