import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Download,
  Expand,
  Globe,
  Headphones,
  Library,
  Moon,
  Search,
  Sparkles,
  Sun,
  X
} from 'lucide-react';
import { Img, Link, useRouter } from '../lib/router';
import { useLanguage } from '../lib/language';
import { getStorage, setStorage, useLocalStorage } from '../lib/storage';
import { extractScriptureRef, ScriptureModal, ScriptureSelection } from './BibleSourceModal';
import { getChapterAssets, VisualStudy } from './VisualStudy';

interface StudyState {
  completed: string[];
  bookmarks: string[];
  scores: Record<string, number>;
  last: string;
  section: string;
}

const DEFAULT_STUDY: StudyState = {
  completed: [],
  bookmarks: [],
  scores: {},
  last: '',
  section: ''
};

const NAV_STRINGS = {
  en: {
    library: 'The library',
    study: 'My study',
    glossary: 'Glossary',
    sources: 'About & sources',
    start: 'Open the book',
    summary: 'The 60-second summary'
  },
  fil: {
    library: 'Aklatan',
    study: 'Aking pag-aaral',
    glossary: 'Talasalitaan',
    sources: 'Tungkol at sanggunian',
    start: 'Buksan ang aklat',
    summary: 'Buod sa 60 segundo'
  },
  ilo: {
    library: 'Biblioteka',
    study: 'Panagadal ko',
    glossary: 'Talasalitaan',
    sources: 'Panggep ken pagtaudan',
    start: 'Luktan ti libro',
    summary: 'Pakabuklan iti 60 a segundo'
  }
} as const;

export function FoundationShell({ children }: { children: React.ReactNode }) {
  const { locale, loading, error, changeLanguage } = useLanguage();
  const [dark, setDark] = useLocalStorage<{ on: boolean }>('foundation-dark', { on: false });
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    let prevY = window.scrollY;
    let anchorY = prevY;
    let dir = 0;
    let raf = 0;

    const show = () => {
      el.dataset.visibility = 'visible';
      prevY = anchorY = window.scrollY;
      dir = 0;
    };

    const tick = () => {
      raf = 0;
      const curY = Math.max(
        0,
        Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight)
      );
      const delta = curY - prevY;
      prevY = curY;
      const active = document.activeElement;
      if (
        curY < el.offsetHeight + 50 ||
        document.querySelector('dialog[open]') ||
        (active instanceof HTMLElement && el.contains(active) && active.matches(':focus-visible'))
      ) {
        el.dataset.visibility = 'visible';
        anchorY = curY;
        dir = 0;
        return;
      }
      if (Math.abs(delta) < 1) return;
      const nextDir = delta > 0 ? 1 : -1;
      if (nextDir !== dir) {
        dir = nextDir;
        anchorY = curY - delta;
      }
      if (Math.abs(curY - anchorY) >= (nextDir > 0 ? 22 : 10)) {
        el.dataset.visibility = nextDir > 0 ? 'hidden' : 'visible';
        anchorY = curY;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || e.key === 'Escape') show();
    };
    const onFocusIn = (e: FocusEvent) => {
      if (e.target instanceof Node && el.contains(e.target)) show();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    el.addEventListener('focusin', onFocusIn);
    show();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
      el.removeEventListener('focusin', onFocusIn);
    };
  }, []);

  const [selection, setSelection] = useState<ScriptureSelection | null>(null);

  async function handleLanguageChange(nextLocale: string) {
    const visibleSec = Array.from(document.querySelectorAll('[data-foundation-section]')).find(
      sec => {
        const rect = sec.getBoundingClientRect();
        return rect.bottom > 100 && rect.top < window.innerHeight / 2;
      }
    );
    const prevTop = visibleSec?.getBoundingClientRect().top;
    await changeLanguage(nextLocale);
    if (visibleSec && prevTop !== undefined) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          window.scrollBy({
            top: (document.getElementById(visibleSec.id)?.getBoundingClientRect().top ?? prevTop) - prevTop,
            behavior: 'instant'
          })
        )
      );
    }
  }

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  return (
    <div
      className={`fd ${dark.on ? 'fd-dark' : ''}`}
      onClickCapture={e => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const anchor = (e.target as HTMLElement).closest('a[href]');
        if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
        const parsed = extractScriptureRef(
          anchor.href,
          anchor.dataset.scriptureReference ?? anchor.textContent ?? ''
        );
        if (parsed) {
          e.preventDefault();
          setSelection({ reference: parsed, trigger: anchor, scrollY: window.scrollY });
        }
      }}
    >
      <a className="skip-link" href="#foundation-main">
        Skip to content
      </a>
      <header ref={headerRef} className="fd-header" data-visibility="visible">
        <Link href="/foundations" className="fd-brand">
          <Img
            src="/images/church-emblem.webp"
            alt="Blessed Hope Global Mission Church emblem"
            width={52}
            height={52}
            priority
          />
          <span>
            Knowing God
            <small>BLESSED HOPE GLOBAL MISSION CHURCH INC.</small>
          </span>
        </Link>
        <nav aria-label="Foundation navigation">
          <Link href="/foundations">{NAV_STRINGS[locale].library}</Link>
          <Link href="/foundations/study">{NAV_STRINGS[locale].study}</Link>
          <Link href="/foundations/glossary">{NAV_STRINGS[locale].glossary}</Link>
          <Link href="/foundations/sources">{NAV_STRINGS[locale].sources}</Link>
        </nav>
        <div className="fd-header-tools">
          <Globe size={16} />
          <select
            aria-label="Book language"
            value={locale}
            disabled={loading}
            onChange={e => void handleLanguageChange(e.target.value)}
          >
            <option value="en">English</option>
            <option value="fil">Filipino</option>
            <option value="ilo">Ilokano</option>
          </select>
          <button
            aria-label={dark.on ? 'Use light reading mode' : 'Use dark reading mode'}
            onClick={() => setDark({ on: !dark.on })}
          >
            {dark.on ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        </div>
      </header>
      {error && <p role="alert">{error}</p>}
      <main id="foundation-main">{children}</main>
      <footer className="fd-footer">
        <span>
          KNOWING GOD <small>· FOUNDATIONS OF CHRISTIAN THEOLOGY</small>
        </span>
        <span>Educational preview · Human review pending</span>
        <Link href="/">The complete atlas ↗</Link>
      </footer>
      {selection && (
        <ScriptureModal
          key={selection.reference?.canonical || selection.title}
          selection={selection}
          onClose={() => setSelection(null)}
        />
      )}
    </div>
  );
}

export function FoundationLibrary({ catalog }: { catalog: any[] }) {
  const { locale } = useLanguage();
  const [study] = useLocalStorage<StudyState>('foundation-study', DEFAULT_STUDY);
  const [query, setQuery] = useState('');
  const filtered = catalog.filter(c =>
    `${c.title} ${c.doctrine} ${c.summary}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <FoundationShell>
      <div className="fd-library" lang="en">
        <div className="fd-library-heading">
          <p className="fd-eyebrow">THEOLOGY, ONE THOUGHTFUL CHAPTER AT A TIME</p>
          <span>
            VOLUME I <i /> THE FOUNDATIONS
          </span>
        </div>
        <section className="fd-cover-stage">
          <div className="fd-cover-copy">
            <span className="fd-eyebrow fd-gold">AN ILLUSTRATED STUDY COMPANION</span>
            <h1>
              Rooted in Scripture.
              <br />
              <em>Growing in faith.</em>
            </h1>
            <p>
              A quiet place to explore the great questions of Christian belief. Read deeply, follow
              the sources, and bring understanding into everyday life.
            </p>
            <Link
              className="fd-primary"
              href={`/foundations/${study.last || 'introduction'}?resume=1`}
            >
              {study.last ? 'Continue reading' : NAV_STRINGS[locale].start}
              <ArrowRight size={17} />
            </Link>
            <p className="fd-edition-meta">
              11 doctrines <i /> Three languages <i /> A lifetime of learning
            </p>
          </div>
          <Link
            className="fd-book-object"
            href="/foundations/introduction"
            aria-label="Open Knowing God book"
          >
            <div className="fd-book-spine" />
            <div className="fd-book-face">
              <Img
                src="/illustrations/book-cover.webp"
                alt="An imagined ancient codex and dawn beyond a stone arch"
                width={620}
                height={930}
                priority
              />
              <div className="fd-book-type">
                <small>A VISUAL JOURNEY THROUGH FAITH</small>
                <BookOpen size={30} strokeWidth={1} />
                <strong>
                  KNOWING
                  <br />
                  GOD
                </strong>
                <span>
                  Foundations of
                  <br />
                  Christian Theology
                </span>
                <small>THE FOUNDATIONS COLLECTION</small>
              </div>
            </div>
          </Link>
          <span className="fd-cover-caption">
            Original artwork · an imaginative interpretation
          </span>
        </section>
        <div className="fd-trust">
          <span>
            <BookOpen size={16} /> Context before conclusions
          </span>
          <span>
            <Globe size={16} /> English · Filipino · Ilokano
          </span>
          <span>
            <Sparkles size={17} /> Learn at your own depth
          </span>
        </div>
        <section>
          <div className="fd-section-heading">
            <div>
              <p className="fd-eyebrow">EXPLORE THE COLLECTION</p>
              <h2>Eleven doctrines. Further paths to explore.</h2>
            </div>
            <label className="fd-search">
              <Search size={17} />
              <input
                aria-label="Search foundation chapters"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Find a doctrine…"
              />
            </label>
          </div>
          <div className="fd-catalog">
            {filtered.map(ch => (
              <Link
                key={ch.id}
                href={`/foundations/${ch.slug}`}
                className={`fd-chapter-card ${ch.order === 0 ? 'fd-intro-card' : ''}`}
              >
                <div className="fd-card-image">
                  <Img
                    src={ch.illustrations.thumbnail}
                    alt={ch.illustrations.alt}
                    width={500}
                    height={360}
                    loading="lazy"
                  />
                  <span>
                    {ch.order === 0
                      ? 'PROLOGUE'
                      : ch.order > 11
                      ? `STUDY ${String(ch.order - 11).padStart(2, '0')}`
                      : String(ch.order).padStart(2, '0')}
                  </span>
                </div>
                <div className="fd-card-copy">
                  <p className="fd-eyebrow">{ch.doctrine}</p>
                  <h3>{ch.title}</h3>
                  <p>{ch.summary}</p>
                  <div className="fd-card-meta">
                    <span>
                      {ch.id === 'theology-proper' ? 'Benchmark manuscript' : 'Study draft'} ·
                      Review pending
                    </span>
                    {study.completed.includes(ch.id) ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <ArrowRight size={18} />
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {!filtered.length && (
            <p role="status">No chapters found. Try “God,” “salvation,” or “Bible.”</p>
          )}
        </section>
        <aside className="fd-reading-note">
          <BookOpen strokeWidth={1} />
          <div>
            <h2>Study with an open book and an open mind.</h2>
            <p>
              Follow a passage back to its context. Distinguish Scripture, interpretation, and
              tradition. Every chapter keeps its sources close at hand.
            </p>
          </div>
          <Link href="/foundations/sources">
            Our approach <ArrowRight size={17} />
          </Link>
        </aside>
      </div>
    </FoundationShell>
  );
}

function FoundationQuiz({ chapter }: { chapter: any }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [study, setStudy] = useLocalStorage<StudyState>('foundation-study', DEFAULT_STUDY);
  const score = chapter.quiz.filter((q: any, idx: number) => answers[idx] === q.answer).length;

  return (
    <section className="fd-quiz" id="quiz" lang="en">
      <p className="fd-eyebrow">CHECK YOUR UNDERSTANDING · ENGLISH</p>
      <h2>Pause. Think. Respond.</h2>
      {chapter.quiz.map((q: any, idx: number) => (
        <fieldset key={idx}>
          <legend>
            {idx + 1}. {q.question}
          </legend>
          {q.options.map((opt: string, optIdx: number) => (
            <label
              key={opt}
              className={submitted && optIdx === q.answer ? 'fd-correct' : ''}
            >
              <input
                type="radio"
                name={`q-${idx}`}
                checked={answers[idx] === optIdx}
                disabled={submitted}
                onChange={() => setAnswers({ ...answers, [idx]: optIdx })}
              />
              {opt}
            </label>
          ))}
          {submitted && (
            <p className="fd-answer">
              <strong>
                {answers[idx] === q.answer ? 'Correct.' : 'Review this answer.'}
              </strong>{' '}
              {q.explanation}
            </p>
          )}
        </fieldset>
      ))}
      <button
        className="fd-primary"
        disabled={Object.keys(answers).length !== 5}
        onClick={() => {
          if (submitted) {
            setSubmitted(false);
            setAnswers({});
            return;
          }
          setSubmitted(true);
          setStudy({
            ...study,
            scores: { ...study.scores, [chapter.id]: score }
          });
        }}
      >
        {submitted ? 'Try again' : 'Check my answers'}
        <Check size={16} />
      </button>
      {submitted && <p role="status">Your score: {score} / 5. Saved in this browser.</p>}
    </section>
  );
}

function FoundationDiagram({ chapter }: { chapter: any }) {
  const [stepIdx, setStepIdx] = useState(0);
  const stepText = chapter.diagram.steps[stepIdx];
  const section = chapter.sections[Math.min(stepIdx, chapter.sections.length - 1)];
  const matchedRef =
    chapter.scriptureReferences.find((r: any) =>
      stepText.includes(r.reference.split(':')[0])
    ) ??
    chapter.scriptureReferences.find((r: any) =>
      chapter.sources.some(
        (s: any) => section.sourceIds.includes(s.id) && s.url === r.url
      )
    );

  return (
    <figure className="fd-diagram" lang="en">
      <figcaption>
        <span className="fd-eyebrow">EXPLORE THE CONNECTIONS</span>
        <h3>{chapter.diagram.title}</h3>
      </figcaption>
      <div className="fd-diagram-steps" role="group" aria-label="Diagram concepts">
        {chapter.diagram.steps.map((s: string, idx: number) => (
          <button
            key={s}
            aria-pressed={stepIdx === idx}
            onClick={() => setStepIdx(idx)}
          >
            <span>{String(idx + 1).padStart(2, '0')}</span>
            {s.split(' · ')[0]}
          </button>
        ))}
      </div>
      <div className="fd-diagram-detail" aria-live="polite">
        <strong>{stepText}</strong>
        <p>{section.paragraphs[0]}</p>
        {matchedRef && (
          <a
            href={matchedRef.url}
            data-scripture-reference={matchedRef.reference}
            target="_blank"
            rel="noreferrer"
          >
            Read {matchedRef.reference} ↗
          </a>
        )}
      </div>
      <small>
        Editorial learning diagram · This organizes ideas; it does not depict God’s being.
      </small>
    </figure>
  );
}

export function FoundationReader({
  chapter,
  translations,
  catalog
}: {
  chapter: any;
  translations: Record<string, any>;
  catalog: any[];
}) {
  const router = useRouter();
  const { locale } = useLanguage();
  const [study, setStudy] = useLocalStorage<StudyState>('foundation-study', DEFAULT_STUDY);
  const [depthObj, setDepthObj] = useLocalStorage<{ value: string }>('foundation-depth', {
    value: 'beginner'
  });

  // Check if URL hash points to an in-depth or advanced section (e.g., #study-practice)
  const rawHash = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
  const hashTargetSec = chapter.sections.find((s: any) => s.id === rawHash);
  const effectiveDepth =
    hashTargetSec?.depth === 'advanced'
      ? 'advanced'
      : hashTargetSec?.depth === 'in-depth' && depthObj.value === 'beginner'
      ? 'in-depth'
      : depthObj.value;

  const setDepth = (val: string) => setDepthObj({ value: val });
  const [fontSize, setFontSize] = useLocalStorage<{ value: number }>('foundation-size', {
    value: 19
  });
  const [speaking, setSpeaking] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const manuscriptRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const trans = locale === 'en' ? null : translations?.[locale];
  const idx = catalog.findIndex(c => c.id === chapter.id);
  const prevChapter = catalog[idx - 1];
  const nextChapter = catalog[idx + 1];

  const visibleSections = chapter.sections.filter(
    (s: any) =>
      effectiveDepth === 'advanced' ||
      s.depth === 'beginner' ||
      (effectiveDepth === 'in-depth' && s.depth === 'in-depth')
  );

  // Sync depth state if hashTargetSec promoted it, and scroll to hash target
  useEffect(() => {
    if (hashTargetSec && effectiveDepth !== depthObj.value) {
      setDepthObj({ value: effectiveDepth });
    }
    if (rawHash) {
      const raf = requestAnimationFrame(() => {
        document.getElementById(rawHash)?.scrollIntoView({ block: 'start', behavior: 'instant' });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [chapter.id, rawHash]);

  useEffect(() => {
    let timer: any;
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    const observer = new IntersectionObserver(
      entries => {
        const hit = entries.find(e => e.isIntersecting);
        if (hit) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            const raw = localStorage.getItem('kg:foundation-study');
            let cur = DEFAULT_STUDY;
            try {
              cur = raw ? JSON.parse(raw) : DEFAULT_STUDY;
            } catch {}
            setStorage('foundation-study', {
              ...cur,
              last: chapter.id,
              section: hit.target.id
            });
          }, 250);
        }
      },
      { rootMargin: '-15% 0px -60% 0px' }
    );
    manuscriptRef.current
      ?.querySelectorAll('[data-foundation-section]')
      .forEach(el => observer.observe(el));

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        document.querySelector('dialog[open]') ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON', 'A', 'SUMMARY'].includes(target.tagName)
      ) {
        return;
      }
      if (e.key === 'ArrowRight' && nextChapter) {
        router.push(`/foundations/${nextChapter.slug}`);
      }
      if (e.key === 'ArrowLeft' && prevChapter) {
        router.push(`/foundations/${prevChapter.slug}`);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('keydown', onKeyDown);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [chapter.id, nextChapter, prevChapter, router, effectiveDepth]);

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has('resume')) return;
    const saved = getStorage('foundation-study', DEFAULT_STUDY);
    if (saved.last !== chapter.id || !saved.section) return;
    const raf = requestAnimationFrame(() =>
      document.getElementById(saved.section)?.scrollIntoView({ block: 'start', behavior: 'instant' })
    );
    return () => cancelAnimationFrame(raf);
  }, [chapter.id, effectiveDepth]);

  const isBookmarked = study.bookmarks.includes(chapter.id);

  async function downloadOffline() {
    try {
      if (!('caches' in window)) {
        setStatusMsg('Offline storage is unavailable in this browser.');
        return;
      }
      const est = await navigator.storage?.estimate();
      if (est?.quota && est.usage && est.quota - est.usage < 8e6) {
        setStatusMsg('Not enough offline storage. Free some browser storage and retry.');
        return;
      }
      const cache = await caches.open('knowing-god-foundations-v1');
      const urls = [
        window.location.pathname,
        '/foundations',
        chapter.illustrations.hero,
        chapter.illustrations.thumbnail,
        ...getChapterAssets(chapter)
      ];
      await Promise.all(
        [...new Set(urls)].map(async u => {
          const res = await fetch(u);
          if (!res.ok) throw new Error(u);
          await cache.put(u, res);
        })
      );
      setStatusMsg(
        'This chapter and its artwork are saved for offline reading. External source pages require a connection.'
      );
    } catch {
      setStatusMsg('The download did not finish. Reconnect and retry.');
    }
  }

  return (
    <FoundationShell>
      <div className="fd-reader-bar">
        <Link href="/foundations">
          <ArrowLeft size={16} /> Library
        </Link>
        <span>
          {chapter.order === 0
            ? 'PROLOGUE'
            : chapter.order > 11
            ? `STUDY GUIDE ${chapter.order - 11}`
            : `CHAPTER ${String(chapter.order).padStart(2, '0')}`}{' '}
          <i /> {chapter.doctrine}
        </span>
        <div>
          <button
            aria-label={isBookmarked ? 'Remove chapter bookmark' : 'Bookmark chapter'}
            aria-pressed={isBookmarked}
            onClick={() =>
              setStudy({
                ...study,
                bookmarks: isBookmarked
                  ? study.bookmarks.filter(id => id !== chapter.id)
                  : [...study.bookmarks, chapter.id]
              })
            }
          >
            <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
          <button
            aria-label="Download chapter for offline reading"
            onClick={() => void downloadOffline()}
          >
            <Download size={18} />
          </button>
          <button
            aria-label={speaking ? 'Stop reading aloud' : 'Read chapter aloud'}
            onClick={() => {
              if (!('speechSynthesis' in window)) {
                setStatusMsg('Read aloud is unavailable in this browser.');
                return;
              }
              window.speechSynthesis.cancel();
              if (speaking) {
                setSpeaking(false);
                return;
              }
              const utterance = new SpeechSynthesisUtterance(
                [
                  trans?.title ?? chapter.title,
                  trans?.summary ?? chapter.summary,
                  ...visibleSections.flatMap(
                    (s: any) => trans?.sections?.[s.id]?.paragraphs ?? s.paragraphs
                  )
                ].join('\n')
              );
              utterance.lang =
                locale === 'fil' ? 'fil-PH' : locale === 'ilo' ? 'ilo-PH' : 'en-US';
              utterance.onend = () => setSpeaking(false);
              utterance.onerror = () => setSpeaking(false);
              window.speechSynthesis.speak(utterance);
              setSpeaking(true);
            }}
          >
            <Headphones size={18} />
          </button>
          <button
            aria-label="Toggle full screen"
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                document.documentElement
                  .requestFullscreen()
                  .catch(() => setStatusMsg('Full screen is unavailable.'));
              }
            }}
          >
            <Expand size={18} />
          </button>
        </div>
      </div>

      <section className="fd-chapter-hero">
        <Img
          src={chapter.illustrations.hero}
          alt={chapter.illustrations.alt}
          width={1536}
          height={1024}
          priority
        />
        <div>
          <p className="fd-eyebrow fd-gold">{chapter.doctrine} · A FOUNDATIONAL STUDY</p>
          <h1>{trans?.title ?? chapter.title}</h1>
          <p>{trans?.question ?? chapter.question}</p>
        </div>
        <small>Imaginative artwork · Human art review pending</small>
      </section>

      <div className="fd-reading-controls" lang="en">
        <div>
          <label>
            Reading depth <ChevronDown size={14} />
            <select
              aria-label="Reading depth"
              value={effectiveDepth}
              onChange={e => setDepth(e.target.value)}
            >
              <option value="beginner">Beginner</option>
              <option value="in-depth">In-depth</option>
              <option value="advanced">Advanced Study</option>
            </select>
          </label>
        </div>
        <span>Make room for understanding.</span>
        <div className="fd-font-control">
          <button
            aria-label="Decrease text size"
            disabled={fontSize.value <= 16}
            onClick={() => setFontSize({ value: fontSize.value - 1 })}
          >
            A−
          </button>
          <button
            aria-label="Increase text size"
            disabled={fontSize.value >= 26}
            onClick={() => setFontSize({ value: fontSize.value + 1 })}
          >
            A+
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="fd-status" role="status">
          {statusMsg}
          <button aria-label="Dismiss message" onClick={() => setStatusMsg('')}>
            <X size={16} />
          </button>
        </div>
      )}

      <div className="fd-reader-grid">
        <aside className="fd-margin">
          <p className="fd-eyebrow">IN THIS CHAPTER</p>
          <a href="#summary">The short version</a>
          <a href="#visual-study">Picture &amp; passage</a>
          {visibleSections.map((s: any) => (
            <a key={s.id} href={`#${s.id}`}>
              {trans?.sections?.[s.id]?.title ?? s.title}
            </a>
          ))}
          <a href="#practice">Reflect &amp; apply</a>
          <a href="#quiz">Knowledge check</a>
          <a href="#sources">Sources</a>
          <div className="fd-margin-note">
            {trans
              ? 'Translation draft · Needs review'
              : 'English manuscript · Needs review'}
            <br />
            <small>
              {trans
                ? `${Object.keys(trans.sections || {}).length} / ${
                    chapter.sections.length
                  } sections drafted. Remaining sections are labeled English.`
                : chapter.coverage}
            </small>
          </div>
        </aside>

        <article
          ref={manuscriptRef}
          className="fd-manuscript"
          style={{ fontSize: fontSize.value }}
          onTouchStart={e => {
            if (!(e.target as HTMLElement).closest('a,button,input,select,summary')) {
              touchStartRef.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
              };
            }
          }}
          onTouchEnd={e => {
            if (!touchStartRef.current) return;
            const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
            const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
            touchStartRef.current = null;
            if (Math.abs(dx) > 120 && Math.abs(dx) > 2 * Math.abs(dy)) {
              if (dx < 0 && nextChapter) router.push(`/foundations/${nextChapter.slug}`);
              if (dx > 0 && prevChapter) router.push(`/foundations/${prevChapter.slug}`);
            }
          }}
        >
          <section
            className="fd-summary"
            id="summary"
            data-foundation-section={true}
            lang={locale}
          >
            <p className="fd-eyebrow">{NAV_STRINGS[locale].summary}</p>
            <p>{trans?.summary ?? chapter.summary}</p>
            {trans && (
              <small>
                AI-assisted study explanation · Needs human review · Not Scripture
              </small>
            )}
          </section>

          <VisualStudy chapter={chapter} />

          <section lang="en">
            <p className="fd-eyebrow">LEARNING OBJECTIVES · ENGLISH</p>
            <ul>
              {chapter.learningObjectives.map((obj: string) => (
                <li key={obj}>{obj}</li>
              ))}
            </ul>
          </section>

          <section className="fd-passages" lang="en">
            <h2>Keep the Scriptures open.</h2>
            {chapter.scriptureReferences.map((ref: any) => (
              <details key={ref.reference}>
                <summary>
                  <BookOpen size={17} />
                  {ref.reference}
                </summary>
                <p>{ref.context}</p>
                <a
                  href={ref.url}
                  data-scripture-reference={ref.reference}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read in the World English Bible ↗
                </a>
                <small>
                  English reading source opens in a same-page window. Use an appropriately
                  licensed local-language Bible alongside this study.
                </small>
              </details>
            ))}
          </section>

          {visibleSections.map((sec: any) => {
            const locSec = trans?.sections?.[sec.id];
            return (
              <section
                key={sec.id}
                id={sec.id}
                data-foundation-section={true}
                lang={locSec ? locale : 'en'}
                className="fd-reading-section"
              >
                <p className="fd-eyebrow">
                  {sec.depth}{' '}
                  {trans && !locSec && '· ENGLISH ORIGINAL · TRANSLATION NOT YET DRAFTED'}
                </p>
                <h2>{locSec?.title ?? sec.title}</h2>
                {(locSec?.paragraphs ?? sec.paragraphs).map((p: string, idx: number) => (
                  <p key={idx}>{p}</p>
                ))}
                {locSec?.scope === 'abridged' && (
                  <details className="fd-full-original">
                    <summary>
                      Read the full English explanation · translated text above is an abridged
                      study draft
                    </summary>
                    <div lang="en">
                      {sec.paragraphs.map((p: string, idx: number) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </details>
                )}
                <div className="fd-evidence">
                  <span>
                    {sec.category} ·{' '}
                    {sec.category === 'A'
                      ? 'Biblical observation'
                      : sec.category === 'B'
                      ? 'Christian interpretation'
                      : sec.category === 'C'
                      ? 'Tradition-specific position'
                      : 'Study exercise / open question'}
                  </span>
                  {[...new Set(sec.sourceIds as string[])].map(srcId => {
                    const src = chapter.sources.find((s: any) => s.id === srcId);
                    return src ? (
                      <a
                        key={srcId}
                        href={src.url}
                        data-scripture-reference={src.section}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {src.section} ↗
                      </a>
                    ) : null;
                  })}
                </div>
              </section>
            );
          })}

          {effectiveDepth !== 'advanced' && (
            <div className="fd-deeper">
              <BookOpen size={21} />
              <p>
                {chapter.sections.length - visibleSections.length} further sections are
                available. Choose In-depth or Advanced Study above to continue.
              </p>
              <button
                onClick={() =>
                  setDepth(effectiveDepth === 'beginner' ? 'in-depth' : 'advanced')
                }
              >
                Read more deeply <ArrowRight size={16} />
              </button>
            </div>
          )}

          <FoundationDiagram chapter={chapter} />

          <section id="practice" data-foundation-section={true} lang="en">
            <p className="fd-eyebrow">REFLECT &amp; APPLY · ENGLISH</p>
            <h2>Let understanding shape life.</h2>
            <ul>
              {chapter.application.map((a: string) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <h3>Questions for reflection</h3>
            <ol>
              {chapter.reflection.map((r: string) => (
                <li key={r}>{r}</li>
              ))}
            </ol>
            <h3>Common misunderstandings</h3>
            <ul>
              {chapter.misunderstandings.map((m: string) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <details>
              <summary>Where Christians differ</summary>
              <p>{chapter.differences}</p>
            </details>
            <h3>A growing vocabulary</h3>
            {chapter.glossaryEntries.map((g: any) => (
              <details key={g.en}>
                <summary>
                  {g.en}{' '}
                  <span>
                    · {g.fil} · {g.ilo}
                  </span>
                </summary>
                <p>{g.definition}</p>
                <small>
                  {g.reference} · {g.note}
                </small>
              </details>
            ))}
          </section>

          <FoundationQuiz chapter={chapter} />

          <section className="fd-summary" lang={locale}>
            <p className="fd-eyebrow">
              {locale === 'en' ? 'CHAPTER SUMMARY' : NAV_STRINGS[locale].summary}
            </p>
            <p>{trans?.summary ?? chapter.summary}</p>
          </section>

          <section
            id="sources"
            data-foundation-section={true}
            className="fd-reader-sources"
            lang="en"
          >
            <p className="fd-eyebrow">RETURN TO THE SOURCES</p>
            <h2>References &amp; further reading</h2>
            <p>
              Educational manuscript · Version {chapter.version} · Theological review pending.
              Original explanations are editorial prose, not Scripture quotations.
            </p>
            {chapter.sources.map((src: any) => (
              <details key={src.id}>
                <summary>{src.title}</summary>
                <p>
                  {src.institution} · {src.section} · Recorded {src.accessed}
                  <br />
                  {src.notes}
                </p>
                <a
                  href={src.url}
                  data-scripture-reference={src.section}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read source ↗
                </a>
              </details>
            ))}
          </section>

          <div className="fd-completion">
            <button
              className="fd-primary"
              onClick={() =>
                setStudy({
                  ...study,
                  completed: study.completed.includes(chapter.id)
                    ? study.completed.filter(id => id !== chapter.id)
                    : [...study.completed, chapter.id]
                })
              }
            >
              <CheckCircle2 size={18} />
              {study.completed.includes(chapter.id)
                ? 'Chapter completed'
                : 'Mark chapter complete'}
            </button>
            <span>Progress is private to this browser.</span>
          </div>

          <nav className="fd-page-turn" aria-label="Chapter navigation">
            {prevChapter ? (
              <Link href={`/foundations/${prevChapter.slug}`}>
                <ArrowLeft size={18} />
                <span>
                  <small>PREVIOUS CHAPTER</small>
                  {prevChapter.title}
                </span>
              </Link>
            ) : (
              <Link href="/foundations">
                <Library size={18} />
                Library
              </Link>
            )}
            {nextChapter && (
              <Link href={`/foundations/${nextChapter.slug}`}>
                <span>
                  <small>NEXT CHAPTER</small>
                  {nextChapter.title}
                </span>
                <ArrowRight size={18} />
              </Link>
            )}
          </nav>
        </article>
      </div>
    </FoundationShell>
  );
}

export function FoundationDashboard({ catalog }: { catalog: any[] }) {
  const [study] = useLocalStorage<StudyState>('foundation-study', DEFAULT_STUDY);
  return (
    <FoundationShell>
      <div className="fd-content">
        <p className="fd-eyebrow">YOUR PERSONAL STUDY</p>
        <h1>A little deeper, every day.</h1>
        <div className="fd-study-stats">
          <div>
            <strong>
              {study.completed.length}
              <small> / {catalog.length}</small>
            </strong>
            <span>Chapters completed</span>
          </div>
          <div>
            <strong>{study.bookmarks.length}</strong>
            <span>Saved chapters</span>
          </div>
          <div>
            <strong>{Object.keys(study.scores).length}</strong>
            <span>Quizzes attempted</span>
          </div>
        </div>
        {study.last && (
          <Link
            className="fd-primary"
            href={`/foundations/${study.last}?resume=1#${study.section}`}
          >
            Continue reading <ArrowRight size={16} />
          </Link>
        )}
        <h2>Your reading journey</h2>
        <div className="fd-study-list">
          {catalog.map(ch => (
            <Link key={ch.id} href={`/foundations/${ch.slug}`}>
              <span>{String(ch.order).padStart(2, '0')}</span>
              <strong>{ch.title}</strong>
              <small>
                {study.bookmarks.includes(ch.id) && 'Bookmarked · '}
                {study.scores[ch.id] !== undefined && `${study.scores[ch.id]}/5 · `}
                {study.completed.includes(ch.id) ? 'Complete' : 'Ready to read'}
              </small>
              <ArrowRight size={17} />
            </Link>
          ))}
        </div>
        <p>
          Your progress, bookmarks, and scores stay in this browser. Clearing browser storage
          removes them.
        </p>
      </div>
    </FoundationShell>
  );
}

export function FoundationGlossary({ entries }: { entries: any[] }) {
  const [query, setQuery] = useState('');
  return (
    <FoundationShell>
      <div className="fd-content fd-prose">
        <p className="fd-eyebrow">WORDS THAT OPEN UNDERSTANDING</p>
        <h1>A growing vocabulary.</h1>
        <p>
          English · Filipino · Ilokano. These are original study definitions, not Bible
          quotations. All translated terminology needs qualified review.
        </p>
        <label className="fd-search">
          <Search size={18} />
          <input
            aria-label="Search theological glossary"
            placeholder="Search a theological term…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </label>
        {entries
          .filter(e =>
            `${e.en} ${e.fil} ${e.ilo} ${e.definition}`
              .toLowerCase()
              .includes(query.toLowerCase())
          )
          .map((e, idx) => (
            <details key={`${e.en}-${idx}`}>
              <summary>{e.en}</summary>
              <p>
                <span lang="fil">{e.fil}</span>
                <br />
                <span lang="ilo">{e.ilo}</span>
              </p>
              <p lang="en">{e.definition}</p>
              <small>
                {e.reference} · {e.note}
              </small>
            </details>
          ))}
        <Link href="/">The atlas reference desk contains further sourced definitions →</Link>
      </div>
    </FoundationShell>
  );
}

export function FoundationSources({ sources }: { sources: any[] }) {
  return (
    <FoundationShell>
      <div className="fd-content fd-prose">
        <p className="fd-eyebrow">ABOUT THIS EDITION</p>
        <h1>Faith seeking understanding.</h1>
        <p>
          This library is an educational preview rooted in a broadly Nicene Christian foundation.
          It has not received independent theological, language, or church approval. English is
          the canonical editorial manuscript.
        </p>
        <h2>Read with discernment</h2>
        <p>
          Source notes distinguish A · direct biblical statements, B · historical Christian
          interpretation, C · denomination-specific positions, and D · interpretive questions or
          original study exercises. These categories belong to the foundation path; the preserved
          atlas uses its own documented evidence key.
        </p>
        <p>
          Artwork is AI-generated imaginative interpretation. It does not establish historical
          appearances, geography, or a likeness of God. Filipino and Ilokano manuscripts are
          AI-assisted drafts marked needs review. Incomplete sections remain explicitly labeled
          English.
        </p>
        <h2>Scripture and licensing</h2>
        <p>
          Foundation chapters provide contextual references and links to the updated World English
          Bible, 66-book protocanon. They do not invent or reproduce official Filipino or Ilokano
          Bible quotations. Christian traditions differ in their canons; the choice of a reading
          corpus does not settle that disagreement.
        </p>
        <a
          href="https://ebible.org/engwebp/copyright.htm"
          target="_blank"
          rel="noreferrer"
        >
          World English Bible public-domain and trademark notice ↗
        </a>
        <h2>Sources and further reading</h2>
        <p>
          Source metadata records the locator, institution, retrieval notes, and date. A source
          link is evidence to inspect, not a claim of endorsement.
        </p>
        {sources.map((src, idx) => (
          <details key={`${src.id}-${idx}`}>
            <summary>{src.title}</summary>
            <p>
              {src.institution} · {src.section}
              <br />
              Recorded {src.accessed}. {src.notes}
            </p>
            <a
              href={src.url}
              data-scripture-reference={src.section}
              target="_blank"
              rel="noreferrer"
            >
              Open source ↗
            </a>
          </details>
        ))}
      </div>
    </FoundationShell>
  );
}
