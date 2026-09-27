import React, { useState } from 'react';
import { ScaleNavbar } from './components/ScaleNavbar';
import { ScaleHero } from './components/ScaleHero';
import { HowItWorksView } from './components/HowItWorksView';
import { CompareAnswersView } from './components/CompareAnswersView';
import { HistoryView } from './components/HistoryView';
import { ScaleFooter } from './components/ScaleFooter';
import { TrustReportView } from './components/TrustReportView';
import { AnalysisLoader } from './components/AnalysisLoader';
import { WhyModal } from './components/WhyModal';
import { TrustReport, Claim } from './types/trust';
import { verifyAiResponse } from './utils/verifier';
import { DEMO_PRESETS } from './data/demoPresets';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { 
  FileText, 
  Layers, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

function MainAppContent() {
  const { theme } = useTheme();
  const [activeView, setActiveView] = useState<'main' | 'compare' | 'history' | 'how-it-works'>('main');

  // Verification states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingModel, setAnalyzingModel] = useState('ChatGPT');
  const [activeReport, setActiveReport] = useState<TrustReport | null>(null);
  const [selectedWhyClaim, setSelectedWhyClaim] = useState<Claim | null>(null);

  // Initialize history with available presets safely
  const [history, setHistory] = useState<TrustReport[]>(() => {
    const list: TrustReport[] = [];
    if (DEMO_PRESETS['flagship']?.report) list.push(DEMO_PRESETS['flagship'].report);
    if (DEMO_PRESETS['neuroscience']?.report) list.push(DEMO_PRESETS['neuroscience'].report);
    if (DEMO_PRESETS['spaceArtemis']?.report) list.push(DEMO_PRESETS['spaceArtemis'].report);
    if (DEMO_PRESETS['techHistory']?.report) list.push(DEMO_PRESETS['techHistory'].report);
    return list;
  });

  const handleStartVerification = async (text: string, model: string) => {
    if (!text.trim()) return;
    setAnalyzingModel(model);
    setIsAnalyzing(true);
    setActiveView('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const report = await verifyAiResponse(text, model);
      // Wait for AnalysisLoader investigation animation to complete
      setTimeout(() => {
        setActiveReport(report);
        setHistory((prev) => [report, ...prev.filter((r) => r.id !== report.id)].slice(0, 20));
        setIsAnalyzing(false);
      }, 3800);
    } catch (err) {
      console.error('Verification error:', err);
      setTimeout(() => {
        const fallback = DEMO_PRESETS['flagship']?.report || Object.values(DEMO_PRESETS)[0]?.report;
        if (fallback) setActiveReport(fallback);
        setIsAnalyzing(false);
      }, 3000);
    }
  };

  const handleOpenDemoPreset = () => {
    const demo = DEMO_PRESETS['flagship'] || Object.values(DEMO_PRESETS)[0];
    if (demo?.report) {
      handleStartVerification(demo.report.originalText, demo.model);
    }
  };

  const handleResetVerification = () => {
    setActiveReport(null);
    setActiveView('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHistoryReport = (report: TrustReport) => {
    setActiveReport(report);
    setActiveView('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col antialiased selection:bg-[#84B3CE]/30 selection:text-[#16587B] ${
      theme === 'dark' ? 'bg-[#0B1A24] text-[#F5EEDD]' : 'bg-[#F5EEDD] text-[#16587B]'
    }`}>
      
      {/* Scale Global Top Navigation with View Switcher & Theme Toggle */}
      <ScaleNavbar
        activeView={activeView}
        onNavigate={(view) => {
          setActiveReport(null);
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDemoPreset={handleOpenDemoPreset}
      />

      {/* Main Container */}
      <main className="flex-1">
        
        {/* State 1: Investigation Loading Screen with Fact-Checking Character */}
        {isAnalyzing ? (
          <div className="py-12 px-4 max-w-4xl mx-auto">
            <AnalysisLoader
              targetModel={analyzingModel}
              onComplete={() => {}}
            />
          </div>
        ) : activeReport ? (
          /* State 2: Active Factual Trust Report Dashboard */
          <div className="py-6 sm:py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
            <TrustReportView
              report={activeReport}
              onOpenWhy={(claim) => setSelectedWhyClaim(claim)}
              onReset={handleResetVerification}
            />
          </div>
        ) : activeView === 'how-it-works' ? (
          /* State 3: How It Works Page */
          <div className="py-8">
            <HowItWorksView />
          </div>
        ) : activeView === 'compare' ? (
          /* State 4: Compare AI Answers View */
          <div className="py-8">
            <CompareAnswersView />
          </div>
        ) : activeView === 'history' ? (
          /* State 5: History Log View */
          <div className="py-8">
            <HistoryView
              history={history}
              onSelectReport={handleSelectHistoryReport}
              onClearHistory={() => setHistory([])}
              onNewCheck={() => {
                setActiveView('main');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        ) : (
          /* State 6: Main Screen (Centered on «Можно ли доверять ответу ИИ?») */
          <>
            {/* Primary Hero Deck: Input, Verify, Demo, Character, Visual Flow */}
            <ScaleHero
              onStartVerification={handleStartVerification}
              onOpenDemoPreset={handleOpenDemoPreset}
              isAnalyzing={isAnalyzing}
            />

            {/* Below-the-fold Quick Value Proposition for Jury (10-second comprehension) */}
            <section className="py-12 border-t border-[#84B3CE]/40 bg-white/60">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* 3 Questions Jury Asks */}
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <div className="text-xs font-mono font-bold text-[#16587B] uppercase tracking-wider">
                    ПРИНЦИП РАБОТЫ AI TRUST
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16587B]">
                    CLAIM ➔ EVIDENCE ➔ CROSS-CHECK ➔ EXPLANATION ➔ RESULT
                  </h2>
                  <p className="text-xs sm:text-sm text-[#16587B]/80 font-normal">
                    Мы не просто оцениваем вероятность ошибки, а проводим прозрачное фактчекинговое расследование каждого тезиса.
                  </p>
                </div>

                {/* 4 Feature Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  <div className="p-4 rounded-xl border border-[#84B3CE]/60 bg-[#F5EEDD]/40 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-[#16587B] text-[#F5EEDD] flex items-center justify-center font-mono font-bold text-xs">
                      01
                    </div>
                    <h3 className="font-bold text-sm text-[#16587B]">Декомпозиция ответа</h3>
                    <p className="text-xs text-[#16587B]/75 leading-relaxed font-sans">
                      Разбиваем длинный текст ИИ на отдельные проверяемые утверждения (Claims).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[#84B3CE]/60 bg-[#F5EEDD]/40 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-[#16587B] text-[#F5EEDD] flex items-center justify-center font-mono font-bold text-xs">
                      02
                    </div>
                    <h3 className="font-bold text-sm text-[#16587B]">Поиск доказательств</h3>
                    <p className="text-xs text-[#16587B]/75 leading-relaxed font-sans">
                      Находим первоисточники: официальные стандарты (NASA, NIST), PubMed, CrossRef и архивы.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[#84B3CE]/60 bg-[#F5EEDD]/40 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-[#16587B] text-[#F5EEDD] flex items-center justify-center font-mono font-bold text-xs">
                      03
                    </div>
                    <h3 className="font-bold text-sm text-[#16587B]">Cross-Check сверка</h3>
                    <p className="text-xs text-[#16587B]/75 leading-relaxed font-sans">
                      Сопоставляем аргументы без слепого доверия большинству мнений в интернете.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[#84B3CE]/60 bg-[#F5EEDD]/40 space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-[#16587B] text-[#F5EEDD] flex items-center justify-center font-mono font-bold text-xs">
                      04
                    </div>
                    <h3 className="font-bold text-sm text-[#16587B]">Обоснование «Почему?»</h3>
                    <p className="text-xs text-[#16587B]/75 leading-relaxed font-sans">
                      Каждое утверждение содержит детальное объяснение, почему ему можно или нельзя доверять.
                    </p>
                  </div>

                </div>

                {/* Quick Interactive Demo Trigger Banner */}
                <div className="p-4 sm:p-5 rounded-2xl border-2 border-[#16587B] bg-[#16587B] text-[#F5EEDD] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                  <div className="space-y-0.5">
                    <span className="font-mono text-xs font-bold text-[#84B3CE] uppercase">
                      ГОТОВОЕ ДЕМО ДЛЯ ЖЮРИ:
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      Убедитесь сами, как AI Trust разделяет правду, мифы и мнения
                    </h4>
                  </div>

                  <button
                    onClick={handleOpenDemoPreset}
                    className="bg-[#84B3CE] text-[#16587B] hover:bg-[#A7C9DD] px-5 py-2.5 rounded-lg font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Запустить проверку</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </section>
          </>
        )}
      </main>

      {/* Scale Footer */}
      <ScaleFooter
        onNavigate={(view) => {
          setActiveReport(null);
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDemoPreset={handleOpenDemoPreset}
      />

      {/* "Why?" Detailed Explanation Modal */}
      <WhyModal
        claim={selectedWhyClaim}
        onClose={() => setSelectedWhyClaim(null)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}

