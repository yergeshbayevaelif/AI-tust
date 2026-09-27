import React from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon, Radio, Shield, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { FactCheckerCharacter } from './FactCheckerCharacter';

interface NavbarProps {
  currentTab: 'verify' | 'compare' | 'history' | 'how-it-works';
  onSelectTab: (tab: 'verify' | 'compare' | 'history' | 'how-it-works') => void;
  onNewVerification: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onNewVerification }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  const navItems: { id: 'verify' | 'compare' | 'history' | 'how-it-works'; label: string; code: string }[] = [
    { id: 'verify', label: 'VERIFY', code: '01' },
    { id: 'compare', label: 'COMPARE AI', code: '02' },
    { id: 'history', label: 'FLIGHT LOGS', code: '03' },
    { id: 'how-it-works', label: 'MISSION DOCS', code: '04' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-sky-900/10 dark:border-white/10 bg-white/90 dark:bg-[#060a14]/90 backdrop-blur-xl transition-colors duration-200">
      
      {/* SpaceX / NASA inspired micro top status ribbon */}
      <div className="hidden lg:flex items-center justify-between border-b border-sky-200/50 dark:border-white/5 px-6 py-1 text-[10px] font-mono tracking-widest text-slate-600 dark:text-slate-400 uppercase bg-sky-50/70 dark:bg-black/40">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            SYSTEM: ONLINE
          </span>
          <span>·</span>
          <span className="text-slate-500 dark:text-slate-400">GROUND TRUTH PROTOCOL: CLAIM → EVIDENCE → EXPLANATION</span>
          <span>·</span>
          <span className="text-sky-700 dark:text-cyan-400">RADAR: ACTIVE (PUBMED / CROSSREF / ARXIV)</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-500 dark:text-slate-400">TELEMETRY: T-0</span>
          <span>·</span>
          <span>
            ACTIVE MODE:{' '}
            <strong className="text-sky-700 dark:text-cyan-400 font-bold">
              {theme.toUpperCase()}
            </strong>
          </span>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Wordmark (Aerospace typography) */}
        <button
          onClick={() => onSelectTab('verify')}
          className="flex items-center gap-3 text-left transition hover:opacity-90 group cursor-pointer"
        >
          {/* Aerospace Badge */}
          <div className="relative flex h-10 w-10 items-center justify-center border border-sky-600 dark:border-cyan-400 bg-sky-500/10 dark:bg-cyan-500/10 shadow-[0_0_15px_rgba(14,165,233,0.3)] p-0.5 overflow-hidden group-hover:border-sky-500 group-hover:bg-sky-500/20 transition-all">
            <FactCheckerCharacter action="idle" size="sm" className="w-10 h-10 -mt-0.5 group-hover:scale-110 transition-transform" />
            <div className="absolute top-0 right-0 w-1 h-1 bg-sky-600 dark:bg-cyan-400" />
            <div className="absolute bottom-0 left-0 w-1 h-1 bg-sky-600 dark:bg-cyan-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-base sm:text-lg font-black tracking-widest text-slate-900 dark:text-white uppercase leading-none">
                AI TRUST
              </span>
              <span className="bg-sky-100 dark:bg-cyan-950/90 px-1.5 py-0.5 text-[9px] font-mono font-bold text-sky-800 dark:text-cyan-400 border border-sky-300 dark:border-cyan-500/40 tracking-wider">
                ORBITAL
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 tracking-widest uppercase">
              FACT-CHECKING RADAR
            </span>
          </div>
        </button>

        {/* Navigation Links - NASA / SpaceX style sharp tracking */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`relative px-4 py-2 text-xs font-mono tracking-widest transition-all duration-150 uppercase cursor-pointer ${
                  isActive
                    ? 'text-sky-800 dark:text-cyan-400 font-bold bg-sky-100/60 dark:bg-white/5'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] ${isActive ? 'text-sky-700 dark:text-cyan-400 font-bold' : 'text-slate-400 dark:text-slate-600'}`}>
                    {item.code}
                  </span>
                  <span>{item.label}</span>
                </div>
                {/* Active Indicator Underline (SpaceX minimalist laser line) */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-sky-600 dark:bg-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Theme Toggle & NASA-style Action Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* THEME TOGGLE: Segmented cockpit rocker switch (NASA / SpaceX Style) */}
          <div 
            onClick={toggleTheme}
            className="flex items-center border border-slate-300 dark:border-white/20 bg-slate-100/90 dark:bg-black/60 p-0.5 cursor-pointer shadow-sm hover:border-sky-500 dark:hover:border-cyan-400 transition-all select-none"
            title="Переключить тему оформления (Светлая / Темная)"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
              }
            }}
          >
            {/* Light Segment */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono tracking-wider transition-all ${
                !isDark
                  ? 'bg-white text-slate-950 font-bold shadow-sm border border-slate-300'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Sun className={`h-3 w-3 ${!isDark ? 'text-amber-500' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">DAY</span>
            </div>

            {/* Dark Segment */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono tracking-wider transition-all ${
                isDark
                  ? 'bg-cyan-400 text-slate-950 font-black shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Moon className={`h-3 w-3 ${isDark ? 'text-slate-950' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">NIGHT</span>
            </div>
          </div>

          {/* NASA/SpaceX Style Mission Launch Button */}
          <button
            onClick={onNewVerification}
            className="inline-flex items-center gap-2 border border-slate-900 dark:border-cyan-400 bg-slate-900 text-white hover:bg-sky-700 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300 dark:hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] px-3.5 sm:px-4 py-2 text-xs font-mono tracking-widest font-black uppercase transition-all duration-150 active:scale-95 shadow-md cursor-pointer"
          >
            <span>NEW VERIFY</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white md:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#070b14] px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2.5 text-xs font-mono tracking-wider text-left uppercase ${
                  currentTab === item.id
                    ? 'bg-sky-50 text-sky-800 dark:bg-white/10 dark:text-cyan-400 font-bold border-l-2 border-sky-600 dark:border-cyan-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5'
                }`}
              >
                <span>{item.code} // {item.label}</span>
              </button>
            ))}
            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="flex-1 border border-slate-300 dark:border-white/20 py-2.5 text-center text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-white/5"
              >
                ТЕМА: {isDark ? 'ТЕМНАЯ (NIGHT)' : 'СВЕТЛАЯ (DAY)'}
              </button>
              <button
                onClick={() => {
                  onNewVerification();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 bg-slate-900 text-white dark:bg-cyan-400 dark:text-slate-950 py-2.5 text-center text-xs font-mono font-bold uppercase tracking-wider"
              >
                ПРОВЕРИТЬ
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
