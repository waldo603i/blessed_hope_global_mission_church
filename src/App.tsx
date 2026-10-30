import React, { useState, useEffect, useRef } from 'react';
import {
  Language,
  ReferencePlateItem,
  ReaderProgressState,
  TheologicalBookChapter,
} from './types/theology';
import { THEOLOGY_BOOKS } from './data/theologyBooks';
import { ALL_REFERENCE_PLATES } from './data/referencePlates';
import { LANGUAGE_META, UI_STRINGS } from './data/uiTranslations';
import { InteractiveVisualizer } from './components/InteractiveVisualizers';
import { NanoBananaStudio } from './components/NanoBananaStudio';
import { ReaderDashboard } from './components/ReaderDashboard';
import {
  BookOpen,
  Sparkles,
  LayoutDashboard,
  Grid,
  Compass,
  CheckCircle2,
  Bookmark,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Columns,
  Award,
  Flame,
  GraduationCap,
  Heart,
  ScrollText,
  Sun,
  Moon,
} from 'lucide-react';

type ActiveTab = 'codex' | 'vault' | 'christ66' | 'nanostudio' | 'dashboard';

const STORAGE_KEY = 'theologia_sacra_progress_v1';

const DEFAULT_PROGRESS: ReaderProgressState = {
  completedSections: ['sec-1-1'],
  completedChapters: [],
  studiedPlates: ['plate-01'],
  quizScores: {},
  bookmarks: ['sec-1-1'],
  notes: {},
  chapterScrollProgress: {},
  studyMinutes: 15,
  streakDays: 1,
  lastStudiedDate: new Date().toISOString().slice(0, 10),
  readerName: '',
};

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [polyglotMode, setPolyglotMode] = useState<boolean>(false);
  const [parchmentTheme, setParchmentTheme] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('codex');
  const [activeBookId, setActiveBookId] = useState<string>(THEOLOGY_BOOKS[0].id);
  const [vaultCategory, setVaultCategory] = useState<string>('ALL');
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [lightboxPlate, setLightboxPlate] = useState<ReferencePlateItem | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState<boolean>(false);

  // Quiz state per chapter: Record<questionId, selectedOptionIndex>
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmittedBookId, setQuizSubmittedBookId] = useState<string | null>(null);

  const [progress, setProgress] = useState<ReaderProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_PROGRESS;
  });

  const mainHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const ui = UI_STRINGS[lang];
  const activeBook: TheologicalBookChapter =
    THEOLOGY_BOOKS.find((b) => b.id === activeBookId) || THEOLOGY_BOOKS[0];

  // Persist progress
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Increment study minutes every 60s of active reading
  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((prev) => ({
        ...prev,
        studyMinutes: prev.studyMinutes + 1,
      }));
    }, 60000);
    return () => window.clearInterval(timer);
  }, []);

  // Subtle Floating Gold Dust Particles Canvas
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles = Array.from({ length: 34 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.1,
      alpha: Math.random() * 0.45 + 0.15,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha})`;
        ctx.fill();
      }
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // View Transition wrapper per modern-web-guidance
  const switchViewWithTransition = (callback: () => void) => {
    const docAny = document as any;
    if (typeof docAny.startViewTransition === 'function') {
      const transition = docAny.startViewTransition(() => {
        callback();
      });
      transition.finished.finally(() => {
        mainHeadingRef.current?.focus({ preventScroll: true });
      });
    } else {
      callback();
    }
  };

  const handleSelectBook = (bookId: string) => {
    switchViewWithTransition(() => {
      setActiveBookId(bookId);
      setActiveTab('codex');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const toggleSectionCompleted = (sectionId: string) => {
    setProgress((prev) => {
      const exists = prev.completedSections.includes(sectionId);
      const nextSections = exists
        ? prev.completedSections.filter((id) => id !== sectionId)
        : [...prev.completedSections, sectionId];
      return {
        ...prev,
        completedSections: nextSections,
      };
    });
  };

  const togglePlateStudied = (plateId: string) => {
    setProgress((prev) => {
      const exists = prev.studiedPlates.includes(plateId);
      const nextPlates = exists
        ? prev.studiedPlates.filter((id) => id !== plateId)
        : [...prev.studiedPlates, plateId];
      return {
        ...prev,
        studiedPlates: nextPlates,
      };
    });
  };

  const toggleBookmark = (sectionId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarks.includes(sectionId);
      return {
        ...prev,
        bookmarks: exists
          ? prev.bookmarks.filter((id) => id !== sectionId)
          : [...prev.bookmarks, sectionId],
      };
    });
  };

  const updateNote = (sectionId: string, text: string) => {
    setProgress((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [sectionId]: text,
      },
    }));
  };

  const handleOpenPlateLightbox = (plate: ReferencePlateItem) => {
    setLightboxPlate(plate);
    setLightboxZoom(false);
    if (!progress.studiedPlates.includes(plate.id)) {
      setProgress((prev) => ({
        ...prev,
        studiedPlates: [...prev.studiedPlates, plate.id],
      }));
    }
  };

  const handleGradeBookQuiz = (book: TheologicalBookChapter) => {
    let correct = 0;
    book.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correct += 1;
      }
    });
    setQuizSubmittedBookId(book.id);
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [book.id]: {
          score: correct,
          total: book.quiz.length,
          completedAt: new Date().toLocaleDateString(),
        },
      },
    }));
  };

  // Compute Overall Mastery Percentage for Header Badge
  const totalSections = THEOLOGY_BOOKS.reduce((acc, b) => acc + b.sections.length, 0);
  const overallPercent = Math.min(
    100,
    Math.round(
      ((progress.completedSections.length / Math.max(1, totalSections)) * 0.45 +
        (progress.studiedPlates.length / ALL_REFERENCE_PLATES.length) * 0.35 +
        (Object.keys(progress.quizScores).length / THEOLOGY_BOOKS.length) * 0.2) *
        100
    )
  );

  // Filtered Plates for Vault View
  const filteredVaultPlates = ALL_REFERENCE_PLATES.filter((plate) => {
    const matchCat = vaultCategory === 'ALL' || plate.category === vaultCategory;
    const q = globalSearch.toLowerCase().trim();
    const matchQ =
      !q ||
      plate.title.en.toLowerCase().includes(q) ||
      plate.title.tl.toLowerCase().includes(q) ||
      plate.title.ilo.toLowerCase().includes(q) ||
      plate.keyScripture.toLowerCase().includes(q) ||
      plate.pastoralSynthesis[lang].toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const activeBookIndex = THEOLOGY_BOOKS.findIndex((b) => b.id === activeBook.id);
  const prevBook = activeBookIndex > 0 ? THEOLOGY_BOOKS[activeBookIndex - 1] : null;
  const nextBook =
    activeBookIndex < THEOLOGY_BOOKS.length - 1 ? THEOLOGY_BOOKS[activeBookIndex + 1] : null;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        parchmentTheme
          ? 'bg-[#17120c] text-amber-50'
          : 'bg-[#050811] text-slate-100'
      }`}
    >
      {/* Subtle Floating Celestial Particles */}
      <canvas
        ref={particleCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
      />

      {/* Sticky Illuminated Top Header */}
      <header className="sticky top-0 z-40 border-b border-amber-500/25 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {/* Brand Crest */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => switchViewWithTransition(() => setActiveTab('codex'))}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/50 bg-gradient-to-br from-amber-500/30 to-amber-900/40 shadow-lg shadow-amber-500/10"
            >
              <BookOpen className="h-6 w-6 text-amber-300" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-extrabold tracking-wider text-amber-300 sm:text-xl">
                  {ui.appTitle}
                </span>
                <span className="hidden rounded-full border border-amber-400/40 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-200 md:inline-block">
                  Codex Edition • 40 Plates
                </span>
              </div>
              <p className="line-clamp-1 text-xs text-slate-400">{ui.appSubtitle}</p>
            </div>
          </div>

          {/* Trilingual Language Switcher + Polyglot Mode + Mastery Pill */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 3-Language Pill Selector */}
            <div
              role="group"
              aria-label="Select Language"
              className="flex items-center rounded-xl border border-slate-800 bg-slate-900/90 p-1"
            >
              {(['en', 'tl', 'ilo'] as Language[]).map((lCode) => {
                const meta = LANGUAGE_META[lCode];
                const isSelected = lang === lCode;
                return (
                  <button
                    key={lCode}
                    onClick={() => setLang(lCode)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{meta.flag}</span>
                    <span>{meta.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Parallel Polyglot Trilingual Mode Toggle */}
            <button
              onClick={() => setPolyglotMode(!polyglotMode)}
              title={ui.polyglotToggle}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition ${
                polyglotMode
                  ? 'border-sky-400 bg-sky-500/20 text-sky-200'
                  : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-amber-500/40'
              }`}
            >
              <Columns className="h-4 w-4 text-sky-400" />
              <span className="hidden xl:inline">{ui.polyglotToggle}</span>
            </button>

            {/* Sanctuary Theme Toggle */}
            <button
              onClick={() => setParchmentTheme(!parchmentTheme)}
              title="Toggle Warm Parchment / Celestial Obsidian Atmosphere"
              className="rounded-xl border border-slate-800 bg-slate-900/80 p-2 text-amber-300 hover:border-amber-500/40"
            >
              {parchmentTheme ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Live Completion Dashboard Button */}
            <button
              onClick={() => switchViewWithTransition(() => setActiveTab('dashboard'))}
              className="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/15 px-3.5 py-2 text-xs font-bold text-amber-200 transition hover:bg-amber-500/25"
            >
              <Award className="h-4 w-4 text-amber-400" />
              <span>{overallPercent}% Mastery</span>
            </button>
          </div>
        </div>

        {/* Secondary Navigation Bar */}
        <div className="border-t border-slate-800/80 bg-slate-950/70">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 overflow-x-auto px-4 py-2 sm:px-6">
            <nav className="flex items-center gap-1.5">
              {[
                { id: 'codex', label: ui.navCodex, icon: BookOpen },
                { id: 'vault', label: ui.navVault, icon: Grid },
                { id: 'christ66', label: ui.navChrist66, icon: Compass },
                { id: 'nanostudio', label: ui.navNanoStudio, icon: Sparkles },
                { id: 'dashboard', label: ui.navDashboard, icon: LayoutDashboard },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() =>
                      switchViewWithTransition(() => setActiveTab(tab.id as ActiveTab))
                    }
                    className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-amber-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2 text-[11px] text-slate-400 lg:flex">
              <GraduationCap className="h-4 w-4 text-amber-400" />
              <span>{LANGUAGE_META[lang].bibleVersion}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* ===================================================================
            TAB 1: THE SACRED CODEX (9 BOOKS OF SYSTEMATIC & BIBLICAL THEOLOGY)
           =================================================================== */}
        {activeTab === 'codex' && (
          <div className="space-y-8">
            {/* Grand Codex Editorial Masthead */}
            <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-slate-950 shadow-2xl">
              <div className="grid items-center lg:grid-cols-12">
                <div className="space-y-4 p-6 sm:p-8 lg:col-span-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300">
                    <Flame className="h-3.5 w-3.5" />
                    <span>{ui.editorialByline}</span>
                  </div>
                  <h1
                    ref={mainHeadingRef}
                    tabIndex={-1}
                    className="font-serif text-3xl font-extrabold leading-tight text-white outline-none sm:text-4xl lg:text-5xl"
                  >
                    {ui.appTitle}:{' '}
                    <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200 bg-clip-text text-transparent">
                      {ui.appSubtitle}
                    </span>
                  </h1>
                  <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                    {lang === 'en'
                      ? 'Welcome, Beloved Berean Student! This interactive 9-Volume Seminary Codex expounds all 11 Major Christian Doctrines and all 40 Visual Reference Plates in English, Filipino, and Ilocano—anchored in the inerrant Word of God (2 Timothy 2:15; 3:16–17).'
                      : lang === 'tl'
                      ? 'Maligayang pagdating, Minamahal na Mag-aaral ng Salita! Ang interaktibong 9-Aklat na Codex na ito ay nagpapaliwanag nang malaliman sa lahat ng 11 Pangunahing Doktrina at 40 Biswal na Sanggunian sa Ingles, Filipino, at Ilokano—nakaugat sa Banal na Kasulatan (2 Timoteo 2:15; 3:16–17).'
                      : 'Naragsak nga isasangbay, Dungdungnguek nga Agad-adal iti Sao! Daytoy nga interaktibo a 9-Libro a Codex ket mangilawlawag a nauneg iti amin nga 11 a Kangrunaan a Doktrina ken 40 a Biswal a Reperensia iti Ingles, Filipino, ken Ilokano—nakaramut iti Nasantuan a Kasuratan (2 Timoteo 2:15; 3:16–17).'}
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    <button
                      onClick={() => switchViewWithTransition(() => setActiveTab('vault'))}
                      className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
                    >
                      <Grid className="h-4 w-4" />
                      Explore All 40 Visual Plates
                    </button>
                    <button
                      onClick={() => switchViewWithTransition(() => setActiveTab('nanostudio'))}
                      className="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-300 transition hover:bg-amber-500/20"
                    >
                      <Sparkles className="h-4 w-4" />
                      {ui.generateWithNano}
                    </button>
                  </div>
                </div>

                <div className="relative h-64 w-full lg:col-span-5 lg:h-full">
                  <img
                    src="/images/generated/hero-codex-cover.jpg"
                    alt="Theologia Sacra Codex Cover"
                    className="h-full w-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent lg:bg-gradient-to-r" />
                </div>
              </div>
            </div>

            {/* 9-Book Spine & Active Chapter Layout */}
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Left Sidebar: 9 Systematic Books TOC */}
              <aside className="space-y-3 lg:col-span-3">
                <div className="sticky top-32 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-xl">
                  <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <span className="font-serif text-xs font-bold uppercase tracking-wider text-amber-400">
                      9 Systematic Books
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {progress.completedSections.length}/{totalSections} Secs
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {THEOLOGY_BOOKS.map((book) => {
                      const isCurrent = book.id === activeBook.id;
                      const doneSecs = book.sections.filter((s) =>
                        progress.completedSections.includes(s.id)
                      ).length;
                      const allDone = doneSecs === book.sections.length;

                      return (
                        <button
                          key={book.id}
                          onClick={() => handleSelectBook(book.id)}
                          className={`flex w-full items-start justify-between rounded-xl border p-2.5 text-left transition ${
                            isCurrent
                              ? 'border-amber-400 bg-amber-500/20 text-white shadow-md'
                              : 'border-transparent bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                          }`}
                        >
                          <div className="pr-2">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                              <span>BOOK {book.romanNumeral}</span>
                              <span>•</span>
                              <span className="line-clamp-1">{book.doctrineCode}</span>
                            </div>
                            <div className="mt-0.5 line-clamp-2 font-serif text-xs font-bold">
                              {book.title[lang]}
                            </div>
                          </div>
                          <span
                            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                              allDone
                                ? 'bg-emerald-500 text-slate-950'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {allDone ? '✓' : `${doneSecs}/${book.sections.length}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </aside>

              {/* Right Column: Active Book Exposition, Visual Plates & Quiz */}
              <div className="space-y-8 lg:col-span-9">
                {/* Active Book Hero Banner */}
                <div className="overflow-hidden rounded-3xl border border-amber-500/30 bg-slate-950 shadow-2xl">
                  <div className="relative h-64 w-full sm:h-80">
                    <img
                      src={activeBook.heroArtUrl}
                      alt={activeBook.title[lang]}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-extrabold uppercase text-slate-950">
                          BOOK {activeBook.romanNumeral} • {activeBook.doctrineCode}
                        </span>
                        <span className="rounded-full border border-amber-300/40 bg-slate-950/80 px-3 py-1 font-mono text-xs text-amber-200">
                          {activeBook.greekEtymology}
                        </span>
                        <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs text-slate-300">
                          ⏱ {activeBook.estimatedMinutes} mins study
                        </span>
                      </div>
                      <h2 className="mt-3 font-serif text-2xl font-extrabold text-white sm:text-4xl">
                        {activeBook.title[lang]}
                      </h2>
                      <p className="mt-1 text-sm text-amber-200/90 sm:text-base">
                        {activeBook.subtitle[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Key Anchor Verse & Pastoral Prologue */}
                  <div className="space-y-6 p-6 sm:p-8">
                    {/* Key Scripture Box */}
                    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 p-5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                          📖 KEY DOCTRINAL SCRIPTURE • {activeBook.keyVerse.ref}
                        </span>
                      </div>

                      {polyglotMode ? (
                        <div className="mt-3 grid gap-3 md:grid-cols-3">
                          {(['en', 'tl', 'ilo'] as Language[]).map((l) => (
                            <div
                              key={l}
                              className="rounded-xl border border-slate-800 bg-slate-950/80 p-3"
                            >
                              <div className="mb-1 text-[10px] font-bold uppercase text-amber-400">
                                {LANGUAGE_META[l].nativeName}
                              </div>
                              <p className="font-serif text-sm italic text-white">
                                “{activeBook.keyVerse.text[l]}”
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <blockquote className="mt-2 font-serif text-lg italic leading-relaxed text-white">
                          “{activeBook.keyVerse.text[lang]}”
                        </blockquote>
                      )}

                      {activeBook.keyVerse.commentary && (
                        <p className="mt-3 border-t border-amber-500/20 pt-2.5 text-xs text-amber-200/90">
                          <strong>Exegetical Note:</strong> {activeBook.keyVerse.commentary[lang]}
                        </p>
                      )}
                    </div>

                    {/* Senior Pastor's Prologue */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                      <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-amber-300">
                        <ScrollText className="h-5 w-5" />
                        <span>{ui.pastoralPrologueTitle}</span>
                      </h3>
                      {polyglotMode ? (
                        <div className="mt-3 grid gap-4 md:grid-cols-3">
                          {(['en', 'tl', 'ilo'] as Language[]).map((l) => (
                            <div
                              key={l}
                              className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 text-xs leading-relaxed text-slate-200"
                            >
                              <div className="mb-1.5 font-bold text-amber-400">
                                {LANGUAGE_META[l].name}
                              </div>
                              {activeBook.pastoralPrologue[l]}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-2.5 text-sm leading-relaxed text-slate-200 sm:text-base">
                          {activeBook.pastoralPrologue[lang]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Book Sections (Deep Exposition + Greek/Hebrew + Scripture + Visual Plates) */}
                {activeBook.sections.map((section) => {
                  const isCompleted = progress.completedSections.includes(section.id);
                  const isBookmarked = progress.bookmarks.includes(section.id);
                  const linkedPlates = ALL_REFERENCE_PLATES.filter((p) =>
                    section.linkedPlateIds.includes(p.id)
                  );

                  return (
                    <section
                      key={section.id}
                      id={section.id}
                      className="space-y-6 rounded-3xl border border-slate-800 bg-slate-950/95 p-6 shadow-2xl sm:p-8"
                    >
                      {/* Section Header & Action Buttons */}
                      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-5">
                        <div>
                          <span className="rounded-lg bg-amber-500/20 px-2.5 py-1 font-mono text-xs font-bold text-amber-300">
                            SECTION {section.sectionNumber}
                          </span>
                          <h3 className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">
                            {section.title[lang]}
                          </h3>
                          <p className="mt-1 text-sm text-amber-200/80">
                            {section.subtitle[lang]}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => toggleBookmark(section.id)}
                            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition ${
                              isBookmarked
                                ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                                : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-amber-500/40'
                            }`}
                          >
                            <Bookmark className="h-3.5 w-3.5" />
                            <span>{isBookmarked ? ui.bookmarked : ui.bookmarkSection}</span>
                          </button>

                          <button
                            onClick={() => toggleSectionCompleted(section.id)}
                            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
                              isCompleted
                                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                                : 'border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                            }`}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            <span>
                              {isCompleted ? ui.sectionCompleted : ui.markSectionComplete}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Deep Pastoral & Theological Exposition */}
                      <div>
                        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-amber-400">
                          {ui.pastoralExpositionTitle}
                        </h4>
                        {polyglotMode ? (
                          <div className="grid gap-4 lg:grid-cols-3">
                            {(['en', 'tl', 'ilo'] as Language[]).map((l) => (
                              <div
                                key={l}
                                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
                              >
                                <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-1.5 text-xs font-bold text-amber-300">
                                  <span>
                                    {LANGUAGE_META[l].flag} {LANGUAGE_META[l].nativeName}
                                  </span>
                                </div>
                                <p className="text-xs leading-relaxed text-slate-200 sm:text-sm">
                                  {section.pastoralExposition[l]}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-2xl border border-slate-800/90 bg-slate-900/50 p-5 text-sm leading-relaxed text-slate-200 sm:text-base">
                            {section.pastoralExposition[lang]}
                          </div>
                        )}
                      </div>

                      {/* Original Greek & Hebrew Exegetical Breakdown */}
                      <div>
                        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-sky-400">
                          {ui.greekHebrewTitle}
                        </h4>
                        <div className="grid gap-4 md:grid-cols-3">
                          {section.theologicalBreakdown.map((item, idx) => (
                            <div
                              key={idx}
                              className="sacred-card-3d flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4"
                            >
                              <div>
                                <h5 className="font-serif text-base font-bold text-white">
                                  {item.heading[lang]}
                                </h5>
                                {item.greekOrHebrewTerm && (
                                  <div className="mt-1.5 inline-block rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 font-mono text-xs text-amber-300">
                                    {item.greekOrHebrewTerm}
                                  </div>
                                )}
                                {item.meaning && (
                                  <p className="mt-2 text-xs font-semibold text-sky-300">
                                    {item.meaning[lang]}
                                  </p>
                                )}
                                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                                  {item.explanation[lang]}
                                </p>
                              </div>
                              <div className="mt-3 border-t border-slate-800 pt-2 font-mono text-[11px] font-bold text-amber-400">
                                📖 {item.scripture}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Theological Diagram Widget */}
                      {section.interactiveWidget && (
                        <InteractiveVisualizer type={section.interactiveWidget} lang={lang} />
                      )}

                      {/* Embedded Visual Reference Plates for this Section */}
                      {linkedPlates.length > 0 && (
                        <div>
                          <div className="mb-3 flex items-center justify-between">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                              {ui.visualPlatesTitle} ({linkedPlates.length} Reference Plates)
                            </h4>
                            <span className="text-xs text-slate-400">
                              Click any visual chart to open high-res zoom & point-by-point exegesis
                            </span>
                          </div>
                          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {linkedPlates.map((plate) => {
                              const isPlateStudied = progress.studiedPlates.includes(plate.id);
                              return (
                                <div
                                  key={plate.id}
                                  className="sacred-card-3d group flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-500/30 bg-slate-900/90 shadow-xl"
                                >
                                  <div>
                                    <div
                                      onClick={() => handleOpenPlateLightbox(plate)}
                                      className="relative h-64 w-full cursor-pointer overflow-hidden bg-slate-950"
                                    >
                                      <img
                                        src={`/images/references/${plate.filename}`}
                                        alt={plate.title[lang]}
                                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                                      />
                                      <div className="absolute left-3 top-3 rounded-lg bg-slate-950/90 px-2.5 py-1 font-mono text-xs font-bold text-amber-400">
                                        Plate #{String(plate.plateNumber).padStart(2, '0')}
                                      </div>
                                      {isPlateStudied && (
                                        <div className="absolute right-3 top-3 rounded-lg bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-slate-950">
                                          Studied ✓
                                        </div>
                                      )}
                                    </div>

                                    <div className="p-4">
                                      <div className="font-mono text-[11px] font-bold text-sky-400">
                                        {plate.keyScripture}
                                      </div>
                                      <h5 className="mt-1 font-serif text-base font-bold text-white">
                                        {plate.title[lang]}
                                      </h5>
                                      <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-300">
                                        {plate.pastoralSynthesis[lang]}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 border-t border-slate-800 p-3">
                                    <button
                                      onClick={() => handleOpenPlateLightbox(plate)}
                                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-amber-500/20 px-3 py-2 text-xs font-bold text-amber-300 transition hover:bg-amber-500 hover:text-slate-950"
                                    >
                                      <ZoomIn className="h-3.5 w-3.5" />
                                      <span>{ui.inspectPlateFull}</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Foundational Scripture Anchors */}
                      <div>
                        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-400">
                          {ui.scriptureAnchorsTitle}
                        </h4>
                        <div className="grid gap-3 md:grid-cols-2">
                          {section.scriptureAnchors.map((sc, idx) => (
                            <div
                              key={idx}
                              className="rounded-2xl border border-emerald-500/30 bg-emerald-950/15 p-4"
                            >
                              <div className="font-mono text-xs font-bold text-emerald-400">
                                📖 {sc.ref}
                              </div>
                              <p className="mt-1.5 font-serif text-sm italic leading-relaxed text-white">
                                “{sc.text[lang]}”
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pastoral Heart Application & Personal Study Notes */}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                            <Heart className="h-4 w-4 text-rose-400" />
                            <span>{ui.pastoralApplicationTitle}</span>
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-slate-200 sm:text-sm">
                            {section.pastoralApplication[lang]}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                          <label className="block text-xs font-bold uppercase tracking-wider text-sky-300">
                            ✍ {ui.personalNotesTitle} ({section.sectionNumber})
                          </label>
                          <textarea
                            rows={3}
                            value={progress.notes[section.id] || ''}
                            onChange={(e) => updateNote(section.id, e.target.value)}
                            placeholder={ui.personalNotesPlaceholder}
                            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </section>
                  );
                })}

                {/* Senior Pastor's Closing Prayer */}
                <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 p-6 shadow-xl sm:p-8">
                  <h3 className="font-serif text-xl font-bold text-amber-300">
                    🙏 {ui.pastoralPrayerTitle} — Book {activeBook.romanNumeral}
                  </h3>
                  <p className="mt-3 font-serif text-base italic leading-relaxed text-slate-100 sm:text-lg">
                    “{activeBook.pastoralPrayer[lang]}”
                  </p>
                </div>

                {/* Chapter Doctrinal Mastery Quiz */}
                <div className="rounded-3xl border border-sky-500/30 bg-slate-950/95 p-6 shadow-2xl sm:p-8">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                        BOOK {activeBook.romanNumeral} EXAMINATION
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white">
                        {ui.chapterQuizTitle}
                      </h3>
                    </div>
                    {progress.quizScores[activeBook.id] && (
                      <span className="rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-bold text-emerald-300">
                        Best Score: {progress.quizScores[activeBook.id].score} /{' '}
                        {progress.quizScores[activeBook.id].total} ✓
                      </span>
                    )}
                  </div>

                  <div className="space-y-6">
                    {activeBook.quiz.map((q, qIdx) => {
                      const selectedOpt = quizAnswers[q.id];
                      const isGraded = quizSubmittedBookId === activeBook.id;

                      return (
                        <div
                          key={q.id}
                          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
                        >
                          <p className="font-serif text-base font-bold text-white">
                            {qIdx + 1}. {q.question[lang]}
                          </p>
                          <div className="mt-3 space-y-2">
                            {q.options.map((opt, oIdx) => {
                              const isChosen = selectedOpt === oIdx;
                              const isRight = q.correctIndex === oIdx;
                              let btnStyle =
                                'border-slate-800 bg-slate-950/80 text-slate-300 hover:border-amber-500/40';
                              if (isGraded) {
                                if (isRight) {
                                  btnStyle =
                                    'border-emerald-500 bg-emerald-950/40 text-emerald-200';
                                } else if (isChosen && !isRight) {
                                  btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
                                }
                              } else if (isChosen) {
                                btnStyle = 'border-amber-400 bg-amber-500/20 text-white';
                              }

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() =>
                                    setQuizAnswers((prev) => ({ ...prev, [q.id]: oIdx }))
                                  }
                                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-left text-xs font-medium transition sm:text-sm ${btnStyle}`}
                                >
                                  <span>{opt[lang]}</span>
                                  {isGraded && isRight && (
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {isGraded && (
                            <div className="mt-3 rounded-xl border border-sky-500/30 bg-sky-950/20 p-3 text-xs text-slate-200">
                              <strong className="text-sky-300">
                                Theological Explanation ({q.scriptureProof}):
                              </strong>{' '}
                              {q.explanation[lang]}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handleGradeBookQuiz(activeBook)}
                    className="mt-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-950 shadow-lg transition hover:brightness-110"
                  >
                    Submit & Grade Book {activeBook.romanNumeral} Examination
                  </button>
                </div>

                {/* Previous / Next Book Navigation Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  {prevBook ? (
                    <button
                      onClick={() => handleSelectBook(prevBook.id)}
                      className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-5 py-3 text-xs font-bold text-slate-200 transition hover:border-amber-400"
                    >
                      <ChevronLeft className="h-4 w-4 text-amber-400" />
                      <span>
                        {ui.prevBook}: Book {prevBook.romanNumeral} ({prevBook.doctrineCode})
                      </span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {nextBook && (
                    <button
                      onClick={() => handleSelectBook(nextBook.id)}
                      className="flex items-center gap-2 rounded-2xl bg-amber-500 px-5 py-3 text-xs font-bold text-slate-950 shadow-lg transition hover:bg-amber-400"
                    >
                      <span>
                        {ui.nextBook}: Book {nextBook.romanNumeral} ({nextBook.doctrineCode})
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: THE 40 VISUAL REFERENCE PLATES VAULT
           =================================================================== */}
        {activeTab === 'vault' && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-amber-500/30 bg-slate-950 p-6 shadow-2xl sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    COMPLETE 40-PLATE VISUAL CODEX GALLERY
                  </span>
                  <h2 className="mt-1 font-serif text-2xl font-bold text-white sm:text-4xl">
                    {ui.navVault} ({filteredVaultPlates.length} / 40 Plates)
                  </h2>
                </div>

                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                    placeholder={ui.searchPlaceholder}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-4 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { id: 'ALL', label: 'All 40 Plates' },
                  { id: 'bibliology', label: 'I. Bibliology (1–6)' },
                  { id: 'theology-proper', label: 'II. God & Trinity (7–13)' },
                  { id: 'christology', label: 'III. Christology (14–18)' },
                  { id: 'pneumatology', label: 'IV. Holy Spirit (19–22)' },
                  { id: 'angelology-demonology', label: 'V. Spiritual Warfare (23–26)' },
                  { id: 'anthropology-hamartiology', label: 'VI. Backsliding Cure (27)' },
                  { id: 'soteriology', label: 'VII. Salvation (28–29)' },
                  { id: 'ecclesiology', label: 'VIII. Israel & Man of God (30–31)' },
                  { id: 'eschatology', label: 'IX. Eschatology (32–40)' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setVaultCategory(cat.id)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      vaultCategory === cat.id
                        ? 'bg-amber-500 text-slate-950'
                        : 'border border-slate-800 bg-slate-900 text-slate-300 hover:border-amber-500/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 40 Plates Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredVaultPlates.map((plate) => {
                const isStudied = progress.studiedPlates.includes(plate.id);
                return (
                  <div
                    key={plate.id}
                    className="sacred-card-3d flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/90 shadow-xl"
                  >
                    <div>
                      <div
                        onClick={() => handleOpenPlateLightbox(plate)}
                        className="relative h-64 w-full cursor-pointer overflow-hidden bg-slate-900"
                      >
                        <img
                          src={`/images/references/${plate.filename}`}
                          alt={plate.title[lang]}
                          className="h-full w-full object-contain p-2 transition duration-500 hover:scale-105"
                        />
                        <span className="absolute left-3 top-3 rounded-lg bg-slate-950/90 px-2.5 py-1 font-mono text-xs font-bold text-amber-400">
                          Plate #{String(plate.plateNumber).padStart(2, '0')}
                        </span>
                        {isStudied && (
                          <span className="absolute right-3 top-3 rounded-lg bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-slate-950">
                            Mastered ✓
                          </span>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="font-mono text-[11px] font-bold text-sky-400">
                          📖 {plate.keyScripture}
                        </div>
                        <h3 className="mt-1 font-serif text-base font-bold text-white">
                          {plate.title[lang]}
                        </h3>
                        <p className="mt-1 text-xs text-amber-200/80">{plate.subtitle[lang]}</p>
                        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-300">
                          {plate.pastoralSynthesis[lang]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 border-t border-slate-800 p-3">
                      <button
                        onClick={() => handleOpenPlateLightbox(plate)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-amber-400"
                      >
                        <ZoomIn className="h-3.5 w-3.5" />
                        <span>Exegesis & Zoom</span>
                      </button>
                      <button
                        onClick={() => togglePlateStudied(plate.id)}
                        className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${
                          isStudied
                            ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                            : 'border-slate-700 bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        ✓
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: CHRIST IN ALL 66 BOOKS, TYPOLOGY & NAMES OF GOD EXPLORER
           =================================================================== */}
        {activeTab === 'christ66' && (
          <div className="space-y-8">
            <InteractiveVisualizer type="jesus-66-books" lang={lang} />
            <InteractiveVisualizer type="typology-matrix" lang={lang} />
            <InteractiveVisualizer type="names-christ-85" lang={lang} />
            <InteractiveVisualizer type="names-god" lang={lang} />
          </div>
        )}

        {/* ===================================================================
            TAB 4: NANO BANANA PRO (`gemini-3-pro-image`) VISUAL STUDIO
           =================================================================== */}
        {activeTab === 'nanostudio' && (
          <NanoBananaStudio lang={lang} onInspectPlate={handleOpenPlateLightbox} />
        )}

        {/* ===================================================================
            TAB 5: READER COMPLETION & MASTERY DASHBOARD
           =================================================================== */}
        {activeTab === 'dashboard' && (
          <ReaderDashboard
            lang={lang}
            progress={progress}
            books={THEOLOGY_BOOKS}
            plates={ALL_REFERENCE_PLATES}
            onSelectBook={handleSelectBook}
            onInspectPlate={handleOpenPlateLightbox}
            onUpdateReaderName={(name) =>
              setProgress((prev) => ({ ...prev, readerName: name }))
            }
            onResetProgress={() => setProgress(DEFAULT_PROGRESS)}
          />
        )}
      </main>

      {/* =====================================================================
          FULL-SCREEN HIGH-RES VISUAL PLATE LIGHTBOX & EXEGESIS MODAL
         ===================================================================== */}
      {lightboxPlate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPlate.title[lang]}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6"
        >
          <div className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-amber-500/40 bg-slate-950 shadow-2xl lg:flex-row">
            {/* Left Image Viewer with Zoom Toggle */}
            <div className="relative flex flex-1 items-center justify-center overflow-auto bg-black p-4 lg:w-7/12">
              <img
                src={`/images/references/${lightboxPlate.filename}`}
                alt={lightboxPlate.title[lang]}
                onClick={() => setLightboxZoom(!lightboxZoom)}
                className={`cursor-zoom-in transition-transform duration-300 ${
                  lightboxZoom ? 'scale-150 cursor-zoom-out' : 'max-h-[80vh] w-auto object-contain'
                }`}
              />

              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <button
                  onClick={() => setLightboxZoom(!lightboxZoom)}
                  className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-slate-950/90 px-3 py-1.5 text-xs font-bold text-amber-300"
                >
                  {lightboxZoom ? (
                    <>
                      <ZoomOut className="h-4 w-4" /> Reset Zoom
                    </>
                  ) : (
                    <>
                      <ZoomIn className="h-4 w-4" /> Zoom 150%
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Theological Exegesis Panel */}
            <div className="flex w-full flex-col justify-between overflow-y-auto border-t border-slate-800 p-6 lg:w-5/12 lg:border-l lg:border-t-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-amber-500/20 px-3 py-1 font-mono text-xs font-bold text-amber-300">
                    PLATE #{String(lightboxPlate.plateNumber).padStart(2, '0')} •{' '}
                    {lightboxPlate.category.toUpperCase()}
                  </span>
                  <button
                    onClick={() => setLightboxPlate(null)}
                    className="rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-300 hover:border-rose-500 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <h3 className="font-serif text-2xl font-bold text-white">
                  {lightboxPlate.title[lang]}
                </h3>
                <p className="text-xs font-semibold text-amber-300">
                  {lightboxPlate.subtitle[lang]}
                </p>

                <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 px-3.5 py-2 font-mono text-xs font-bold text-sky-300">
                  📖 Anchor Scripture: {lightboxPlate.keyScripture}
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Senior Pastor’s Synthesis ({LANGUAGE_META[lang].name})
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-200 sm:text-sm">
                    {lightboxPlate.pastoralSynthesis[lang]}
                  </p>
                </div>

                {/* Key Points Breakdown */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Key Doctrinal Breakdown & Scripture Proofs
                  </h4>
                  {lightboxPlate.keyPoints.map((kp, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-800 bg-slate-900/90 p-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-serif text-xs font-bold text-amber-300">
                          {kp.label[lang]}
                        </span>
                        <span className="shrink-0 font-mono text-[10px] font-bold text-sky-400">
                          {kp.scripture}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-300">
                        {kp.explanation[lang]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lightbox Footer Controls */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-4">
                <button
                  onClick={() => togglePlateStudied(lightboxPlate.id)}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
                    progress.studiedPlates.includes(lightboxPlate.id)
                      ? 'bg-emerald-500 text-slate-950'
                      : 'border border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>
                    {progress.studiedPlates.includes(lightboxPlate.id)
                      ? ui.plateStudied
                      : ui.markPlateStudied}
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const prevIdx =
                        (lightboxPlate.plateNumber - 2 + ALL_REFERENCE_PLATES.length) %
                        ALL_REFERENCE_PLATES.length;
                      handleOpenPlateLightbox(ALL_REFERENCE_PLATES[prevIdx]);
                    }}
                    className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200 hover:border-amber-400"
                  >
                    ← Prev Plate
                  </button>
                  <button
                    onClick={() => {
                      const nextIdx = lightboxPlate.plateNumber % ALL_REFERENCE_PLATES.length;
                      handleOpenPlateLightbox(ALL_REFERENCE_PLATES[nextIdx]);
                    }}
                    className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200 hover:border-amber-400"
                  >
                    Next Plate →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sacred Footer */}
      <footer className="relative z-10 mt-16 border-t border-amber-500/20 bg-slate-950 py-8 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4">
          <p className="font-serif text-sm font-bold text-amber-300">
            THEOLOGIA SACRA — The Living Visual Codex of Systematic & Biblical Theology
          </p>
          <p className="mt-1">
            Trilingual Edition: English (KJV) • Filipino / Tagalog (Ang Dating Biblia) • Ilocano (Banal a Biblia)
          </p>
          <p className="mt-1 text-slate-500">
            “Soli Deo Gloria — To God Alone Be the Glory” (Romans 11:36 • 2 Timothy 2:15)
          </p>
        </div>
      </footer>
    </div>
  );
};
export default App;
