import React, { useState } from 'react';
import { 
  ChevronDown, 
  ArrowRight, 
  Menu, 
  X, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  FileText, 
  Clock, 
  GitCompare, 
  BookOpen,
  Sun,
  Moon,
  Search
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ScaleNavbarProps {
  activeView: 'main' | 'compare' | 'history' | 'how-it-works';
  onNavigate: (view: 'main' | 'compare' | 'history' | 'how-it-works') => void;
  onOpenDemoPreset: () => void;
}

export const ScaleNavbar: React.FC<ScaleNavbarProps> = ({ 
  activeView, 
  onNavigate,
  onOpenDemoPreset
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F5EEDD]/95 backdrop-blur-md border-b border-[#84B3CE]/50 transition-colors">
      
      {/* Top Banner Ribbon */}
      <div className="bg-[#16587B] text-[#F5EEDD] px-4 py-1.5 text-xs font-mono font-medium text-center flex items-center justify-center gap-2 border-b border-[#84B3CE]/30">
        <span className="bg-[#84B3CE]/30 text-[#F5EEDD] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
          AI TRUST // FACT-CHECKER
        </span>
        <span className="hidden sm:inline">
          Не просто верьте ответам нейросетей — проверяйте факты и доказательства.
        </span>
        <button 
          onClick={onOpenDemoPreset}
          className="underline font-bold hover:text-[#84B3CE] inline-flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>Запустить демо-пример</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo: AI Trust */}
        <div className="flex items-center gap-8">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate('main'); }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            {/* Geometric badge in #16587B with #84B3CE border */}
            <div className="w-8 h-8 rounded-lg bg-[#16587B] border border-[#84B3CE] flex items-center justify-center text-[#F5EEDD] font-mono font-black text-sm tracking-tighter group-hover:bg-[#0D3B53] transition-colors shadow-sm">
              AI
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-[#16587B] group-hover:text-[#0D3B53] transition-colors font-sans">
                AI Trust
              </span>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#16587B]/70 font-semibold -mt-1">
                FACTS & EVIDENCE
              </span>
            </div>
          </a>

          {/* Navigation Links: Main Check, How It Works, Compare AI, History */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#16587B]">
            <button
              onClick={() => onNavigate('main')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeView === 'main'
                  ? 'bg-[#16587B] text-[#F5EEDD] font-bold shadow-xs'
                  : 'hover:bg-[#84B3CE]/20'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Проверить ответ</span>
            </button>

            <button
              onClick={() => onNavigate('how-it-works')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeView === 'how-it-works'
                  ? 'bg-[#16587B] text-[#F5EEDD] font-bold shadow-xs'
                  : 'hover:bg-[#84B3CE]/20'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Как это работает</span>
            </button>

            <button
              onClick={() => onNavigate('compare')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeView === 'compare'
                  ? 'bg-[#16587B] text-[#F5EEDD] font-bold shadow-xs'
                  : 'hover:bg-[#84B3CE]/20'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              <span>Сравнить ИИ</span>
            </button>

            <button
              onClick={() => onNavigate('history')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeView === 'history'
                  ? 'bg-[#16587B] text-[#F5EEDD] font-bold shadow-xs'
                  : 'hover:bg-[#84B3CE]/20'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>История</span>
            </button>
          </nav>
        </div>

        {/* Right CTA Area: Theme Switcher & Actions */}
        <div className="flex items-center gap-3">
          
          {/* Light / Dark Mode Toggle (User Requirement 14) */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#84B3CE] bg-white hover:bg-[#84B3CE]/20 text-xs font-mono font-bold text-[#16587B] transition cursor-pointer shadow-xs"
            title="Переключить тему"
          >
            {theme === 'dark' ? (
              <>
                <Moon className="w-3.5 h-3.5 text-[#16587B]" />
                <span className="hidden sm:inline">🌙 Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">☀ Light</span>
              </>
            )}
          </button>

          {/* Quick Demo CTA */}
          <button
            onClick={onOpenDemoPreset}
            className="hidden sm:inline-flex items-center gap-1.5 border border-[#16587B] bg-white hover:bg-[#84B3CE]/20 text-[#16587B] px-3.5 py-2 rounded-lg text-xs font-bold font-mono transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#16587B]" />
            <span>Демо</span>
          </button>

          {/* Main Action Button */}
          <button
            onClick={() => onNavigate('main')}
            className="bg-[#16587B] text-[#F5EEDD] hover:bg-[#0D3B53] px-4.5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider font-mono transition-all duration-200 active:scale-98 shadow-sm cursor-pointer flex items-center gap-1.5 border border-[#84B3CE]"
          >
            <span>Проверить</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#84B3CE]" />
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#16587B] hover:bg-[#84B3CE]/20 md:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#84B3CE] bg-[#F5EEDD] px-4 pt-2 pb-6 space-y-2 animate-in fade-in duration-200">
          <button
            onClick={() => { onNavigate('main'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 font-bold rounded-lg text-sm flex items-center justify-between ${
              activeView === 'main' ? 'bg-[#16587B] text-[#F5EEDD]' : 'text-[#16587B] hover:bg-[#84B3CE]/20'
            }`}
          >
            <span>Проверить ответ ИИ</span>
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => { onNavigate('how-it-works'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 font-bold rounded-lg text-sm flex items-center justify-between ${
              activeView === 'how-it-works' ? 'bg-[#16587B] text-[#F5EEDD]' : 'text-[#16587B] hover:bg-[#84B3CE]/20'
            }`}
          >
            <span>Как это работает</span>
            <BookOpen className="w-4 h-4" />
          </button>

          <button
            onClick={() => { onNavigate('compare'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 font-bold rounded-lg text-sm flex items-center justify-between ${
              activeView === 'compare' ? 'bg-[#16587B] text-[#F5EEDD]' : 'text-[#16587B] hover:bg-[#84B3CE]/20'
            }`}
          >
            <span>Сравнить ответы разных ИИ</span>
            <GitCompare className="w-4 h-4" />
          </button>

          <button
            onClick={() => { onNavigate('history'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 font-bold rounded-lg text-sm flex items-center justify-between ${
              activeView === 'history' ? 'bg-[#16587B] text-[#F5EEDD]' : 'text-[#16587B] hover:bg-[#84B3CE]/20'
            }`}
          >
            <span>История проверок</span>
            <Clock className="w-4 h-4" />
          </button>

          <div className="pt-2 border-t border-[#84B3CE]/40">
            <button
              onClick={() => { onOpenDemoPreset(); setMobileMenuOpen(false); }}
              className="w-full bg-[#16587B] text-[#F5EEDD] py-3 rounded-lg font-mono font-bold text-xs uppercase tracking-wider text-center block"
            >
              Запустить готовый демо-пример
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
