import React, { useRef } from 'react';
import {
  Language,
  ReaderProgressState,
  TheologicalBookChapter,
  ReferencePlateItem,
} from '../types/theology';
import { UI_STRINGS } from '../data/uiTranslations';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Flame,
  Image as ImageIcon,
  Bookmark,
  FileText,
  Trophy,
  Download,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';

interface ReaderDashboardProps {
  lang: Language;
  progress: ReaderProgressState;
  books: TheologicalBookChapter[];
  plates: ReferencePlateItem[];
  onSelectBook: (bookId: string) => void;
  onInspectPlate: (plate: ReferencePlateItem) => void;
  onUpdateReaderName: (name: string) => void;
  onResetProgress: () => void;
}

export const ReaderDashboard: React.FC<ReaderDashboardProps> = ({
  lang,
  progress,
  books,
  plates,
  onSelectBook,
  onInspectPlate,
  onUpdateReaderName,
  onResetProgress,
}) => {
  const ui = UI_STRINGS[lang];
  const certCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const totalSections = books.reduce((acc, b) => acc + b.sections.length, 0);
  const completedSectionsCount = progress.completedSections.length;
  const studiedPlatesCount = progress.studiedPlates.length;
  const quizzesPassedCount = Object.keys(progress.quizScores).length;

  const overallPercent = Math.min(
    100,
    Math.round(
      ((completedSectionsCount / Math.max(1, totalSections)) * 0.45 +
        (studiedPlatesCount / plates.length) * 0.35 +
        (quizzesPassedCount / books.length) * 0.2) *
        100
    )
  );

  const scholarRank =
    overallPercent >= 85
      ? ui.scholarRankDoctor
      : overallPercent >= 55
      ? ui.scholarRankSteward
      : overallPercent >= 25
      ? ui.scholarRankDisciple
      : ui.scholarRankNovice;

  const handleDownloadCertificate = () => {
    const canvas = certCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1400;
    const H = 960;
    canvas.width = W;
    canvas.height = H;

    // Parchment & Royal Obsidian Background
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#090d16');
    grad.addColorStop(0.5, '#111827');
    grad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Ornate Gold Borders
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    ctx.strokeRect(36, 36, W - 72, H - 72);
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 2;
    ctx.strokeRect(52, 52, W - 104, H - 104);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 22px Georgia, serif';
    ctx.fillText('THEOLOGIA SACRA • SEMINARY CODEX OF SYSTEMATIC & BIBLICAL THEOLOGY', W / 2, 130);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px Georgia, serif';
    ctx.fillText('DIPLOMA OF THEOLOGICAL STUDY', W / 2, 205);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 24px Georgia, serif';
    ctx.fillText('This Sacred Codex Certificate is prayerfully presented to', W / 2, 275);

    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 48px Georgia, serif';
    ctx.fillText(progress.readerName || 'Faithful Berean Scholar', W / 2, 345);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '22px Georgia, serif';
    ctx.fillText(
      `Having achieved ${overallPercent}% Overall Codex Completion (${completedSectionsCount}/${totalSections} Doctrinal Sections,`,
      W / 2,
      420
    );
    ctx.fillText(
      `${studiedPlatesCount}/40 Visual Reference Plates, and ${quizzesPassedCount}/${books.length} Doctrinal Examinations)`,
      W / 2,
      455
    );

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 26px Georgia, serif';
    ctx.fillText(`Conferred Rank: ${scholarRank}`, W / 2, 525);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'italic 20px Georgia, serif';
    ctx.fillText(
      '“Study to shew thyself approved unto God, a workman that needeth not to be ashamed,',
      W / 2,
      610
    );
    ctx.fillText('rightly dividing the word of truth.” — 2 Timothy 2:15 (KJV / ADB / ILO)', W / 2, 640);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 18px Georgia, serif';
    ctx.fillText('Office of the Chief Editor, Senior Pastor & Systematic Theologian', W / 2, 770);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px Consolas, monospace';
    ctx.fillText(`Issued on ${new Date().toLocaleDateString()} • English • Filipino • Ilocano`, W / 2, 815);

    const link = document.createElement('a');
    link.download = `Theologia-Sacra-Certificate-${(progress.readerName || 'Scholar').replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Radial SVG ring calculations
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallPercent / 100) * circumference;

  return (
    <div className="space-y-8">
      {/* Top Hero Progress Overview */}
      <div className="grid gap-6 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/25 p-6 shadow-2xl lg:grid-cols-12 lg:p-8">
        {/* Radial Gauge */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-amber-500/20 bg-slate-950/70 p-6 lg:col-span-4">
          <div className="relative flex items-center justify-center">
            <svg className="h-44 w-44 -rotate-90 transform">
              <circle
                cx="88"
                cy="88"
                r={radius}
                stroke="rgba(251, 191, 36, 0.15)"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="88"
                cy="88"
                r={radius}
                stroke="#f59e0b"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center text-center">
              <span className="font-serif text-4xl font-extrabold text-white">
                {overallPercent}%
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                {ui.overallMastery}
              </span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/15 px-3.5 py-1 text-xs font-bold text-amber-300">
              <Award className="h-3.5 w-3.5" />
              {scholarRank}
            </span>
          </div>
        </div>

        {/* 4 Metric Cards & Scholar Certificate Control */}
        <div className="flex flex-col justify-between space-y-5 lg:col-span-8">
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <BookOpen className="h-5 w-5 text-amber-400" />
              <div className="mt-2 font-serif text-2xl font-bold text-white">
                {completedSectionsCount} / {totalSections}
              </div>
              <div className="text-xs text-slate-400">{ui.sectionsMastered}</div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <ImageIcon className="h-5 w-5 text-sky-400" />
              <div className="mt-2 font-serif text-2xl font-bold text-white">
                {studiedPlatesCount} / {plates.length}
              </div>
              <div className="text-xs text-slate-400">{ui.platesInspected}</div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <Trophy className="h-5 w-5 text-emerald-400" />
              <div className="mt-2 font-serif text-2xl font-bold text-white">
                {quizzesPassedCount} / {books.length}
              </div>
              <div className="text-xs text-slate-400">{ui.quizzesPassed}</div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <Flame className="h-5 w-5 text-rose-400" />
              <div className="mt-2 font-serif text-2xl font-bold text-white">
                {progress.streakDays} {lang === 'en' ? 'Days' : lang === 'tl' ? 'Araw' : 'Aldaw'}
              </div>
              <div className="text-xs text-slate-400">
                {progress.studyMinutes} mins Berean Study
              </div>
            </div>
          </div>

          {/* Scholar Name & Certificate Box */}
          <div className="rounded-2xl border border-amber-500/30 bg-slate-950/80 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300">
                  {lang === 'en'
                    ? 'Scholar Name for Seminary Certificate'
                    : lang === 'tl'
                    ? 'Pangalan ng Mag-aaral para sa Sertipiko'
                    : 'Nagan ti Agad-adal para iti Sertipiko'}
                </label>
                <input
                  type="text"
                  value={progress.readerName}
                  onChange={(e) => onUpdateReaderName(e.target.value)}
                  placeholder="Enter your full name (e.g., Ptr. Juan Dela Cruz)..."
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2 pt-4">
                <button
                  onClick={handleDownloadCertificate}
                  className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg transition hover:bg-amber-400"
                >
                  <Download className="h-4 w-4" />
                  Download Certificate
                </button>
                <button
                  onClick={onResetProgress}
                  title="Reset Progress"
                  className="rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-slate-400 hover:border-rose-500/50 hover:text-rose-300"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
            <canvas ref={certCanvasRef} className="hidden" />
          </div>
        </div>
      </div>

      {/* Book-by-Book Completion Breakdown (Books I to IX) */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
        <h3 className="mb-4 font-serif text-xl font-bold text-white">
          {lang === 'en'
            ? 'Book-by-Book Systematic Theology Progress (Books I–IX)'
            : lang === 'tl'
            ? 'Progreso sa Bawat Aklat ng Teolohiya (Unang Aklat hanggang Ikasiyam)'
            : 'Progreso iti Tunggal Libro ti Teolohia (Umuna agingga Maikasiam a Libro)'}
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {books.map((book) => {
            const bookSecDone = book.sections.filter((s) =>
              progress.completedSections.includes(s.id)
            ).length;
            const bookPlates = plates.filter((p) => p.bookId === book.id);
            const bookPlatesDone = bookPlates.filter((p) =>
              progress.studiedPlates.includes(p.id)
            ).length;
            const quizInfo = progress.quizScores[book.id];
            const bookPct = Math.round(
              ((bookSecDone / Math.max(1, book.sections.length)) * 0.6 +
                (bookPlatesDone / Math.max(1, bookPlates.length)) * 0.4) *
                100
            );

            return (
              <div
                key={book.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-amber-500/40"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-400">
                      BOOK {book.romanNumeral} • {book.doctrineCode}
                    </span>
                    <span className="font-mono font-bold text-white">{bookPct}%</span>
                  </div>
                  <h4 className="mt-1 font-serif text-base font-bold text-white">
                    {book.title[lang]}
                  </h4>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${bookPct}%` }}
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-300">
                    <span className="rounded bg-slate-800 px-2 py-0.5">
                      Sections: {bookSecDone}/{book.sections.length}
                    </span>
                    <span className="rounded bg-slate-800 px-2 py-0.5">
                      Plates: {bookPlatesDone}/{bookPlates.length}
                    </span>
                    <span className="rounded bg-slate-800 px-2 py-0.5">
                      Quiz: {quizInfo ? `${quizInfo.score}/${quizInfo.total} ✓` : 'Pending'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectBook(book.id)}
                  className="mt-4 flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-300 transition hover:bg-amber-500/20"
                >
                  <span>{bookPct === 100 ? 'Review Book' : 'Continue Reading'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 40 Visual Reference Plates Mastery Matrix */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-serif text-xl font-bold text-white">
            {lang === 'en'
              ? '40 Visual Reference Plates Mastery Checklist'
              : lang === 'tl'
              ? 'Listahan ng 40 Biswal na Sanggunian sa Bibliya'
              : 'Listaan ti 40 a Biswal a Reperensia iti Biblia'}
          </h3>
          <span className="text-xs font-semibold text-amber-300">
            Click any plate to open full exegesis & mark as studied
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8">
          {plates.map((plate) => {
            const isStudied = progress.studiedPlates.includes(plate.id);
            return (
              <button
                key={plate.id}
                onClick={() => onInspectPlate(plate)}
                className={`group relative overflow-hidden rounded-xl border p-2 text-left transition ${
                  isStudied
                    ? 'border-emerald-500/60 bg-emerald-950/30'
                    : 'border-slate-800 bg-slate-900/70 hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-amber-400">#{plate.plateNumber}</span>
                  {isStudied && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                </div>
                <p className="mt-1 line-clamp-2 text-[11px] font-medium text-white">
                  {plate.title[lang]}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bookmarks & Personal Study Journal */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5">
          <div className="mb-3 flex items-center gap-2 text-amber-300">
            <Bookmark className="h-5 w-5" />
            <h4 className="font-serif text-lg font-bold">
              Saved Bookmarks ({progress.bookmarks.length})
            </h4>
          </div>
          {progress.bookmarks.length === 0 ? (
            <p className="text-xs text-slate-400">
              No sections bookmarked yet. Click “Bookmark Section” while studying any chapter.
            </p>
          ) : (
            <div className="space-y-2">
              {books.flatMap((b) =>
                b.sections
                  .filter((s) => progress.bookmarks.includes(s.id))
                  .map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onSelectBook(b.id)}
                      className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-3 text-left text-xs hover:border-amber-400"
                    >
                      <div>
                        <span className="font-bold text-amber-400">{s.sectionNumber}</span> —{' '}
                        <span className="font-semibold text-white">{s.title[lang]}</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
                    </button>
                  ))
              )}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5">
          <div className="mb-3 flex items-center gap-2 text-sky-300">
            <FileText className="h-5 w-5" />
            <h4 className="font-serif text-lg font-bold">
              Personal Berean Study Notes ({Object.keys(progress.notes).length})
            </h4>
          </div>
          {Object.keys(progress.notes).length === 0 ? (
            <p className="text-xs text-slate-400">
              Your study notes written inside each chapter will automatically appear here.
            </p>
          ) : (
            <div className="max-h-60 space-y-2.5 overflow-y-auto pr-1">
              {Object.entries(progress.notes)
                .filter(([, text]) => text.trim().length > 0)
                .map(([secId, noteText]) => (
                  <div
                    key={secId}
                    className="rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-xs"
                  >
                    <div className="font-mono text-[10px] font-bold text-sky-400">{secId}</div>
                    <p className="mt-1 whitespace-pre-wrap text-slate-200">{noteText}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
