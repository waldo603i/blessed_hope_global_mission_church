import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, X } from 'lucide-react';
import { BOOKS, ParsedScripture, parseScriptureReference } from '../lib/scripture';

const VERSION_NAMES: Record<string, string> = {
  WEB: 'World English Bible',
  NKJV: 'New King James Version',
  NIV: 'New International Version (2011)',
  SOURCE: 'eBible source edition'
};

export function isEbibleUrl(urlStr: string): boolean {
  try {
    const u = new URL(urlStr);
    return (
      u.protocol === 'https:' &&
      u.hostname === 'ebible.org' &&
      /^\/[a-zA-Z0-9_-]+\/[A-Z0-9]{3}\d{2,3}\.htm$/.test(u.pathname)
    );
  } catch {
    return false;
  }
}

export function extractScriptureRef(urlStr: string, labelText: string): ParsedScripture | null {
  let u: URL;
  try {
    u = new URL(urlStr);
  } catch {
    return null;
  }
  if (u.protocol !== 'https:' || u.hostname !== 'ebible.org') return null;
  const m = /^\/engwebp\/([A-Z0-9]{3})(\d{2,3})\.htm$/.exec(u.pathname);
  if (!m) return null;
  const book = BOOKS.find(b => b.code === m[1]);
  if (!book) return null;
  const parsed = parseScriptureReference(labelText.trim());
  if (parsed?.bookCode === book.code && parsed.chapter === Number(m[2])) return parsed;
  const hashMatch = /^#V(\d+)$/.exec(u.hash);
  return parseScriptureReference(
    `${book.name} ${Number(m[2])}${hashMatch ? `:${hashMatch[1]}` : ''}`
  );
}

export interface ScriptureSelection {
  reference: ParsedScripture | null;
  trigger: HTMLElement;
  scrollY: number;
  sourceUrl?: string;
  title?: string;
}

export function ScriptureModal({
  selection,
  onClose
}: {
  selection: ScriptureSelection;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<{
    chapter?: {
      reference: string;
      translation: string;
      verses: { number: number; text: string }[];
    };
    error?: string;
  } | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [version, setVersion] = useState<string>(selection.reference ? 'WEB' : 'SOURCE');
  const [scope, setScope] = useState<'passage' | 'chapter'>('passage');
  const [iframeKey, setIframeKey] = useState(0);

  const ref = selection.reference;
  const chapterLabel = ref ? `${ref.book} ${ref.chapter}` : selection.title || 'Bible source';
  const headingLabel = ref?.canonical ?? selection.title ?? 'Bible source';

  const hostedUrl =
    version === 'NKJV' || version === 'NIV'
      ? `https://biblia.com/api/plugins/embeddedbible?${new URLSearchParams({
          layout: 'normal',
          resourceName: version === 'NIV' ? 'NIV2011' : 'NKJV',
          startingReference: scope === 'chapter' ? chapterLabel : headingLabel
        })}`
      : selection.sourceUrl || '';

  const isDark = !!selection.trigger.closest('.theme-dark,.fd-dark');

  function switchScope(nextScope: 'passage' | 'chapter') {
    setScope(nextScope);
    setIframeKey(k => k + 1);
  }

  function scrollToVerse(vNum: number) {
    const container = bodyRef.current;
    const el = container?.querySelector(`[data-verse="${vNum}"]`);
    if (container && el) {
      container.scrollTo({
        top:
          container.scrollTop +
          el.getBoundingClientRect().top -
          container.getBoundingClientRect().top -
          18,
        behavior: 'instant'
      });
    }
  }

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const prevOverflow = document.body.style.overflow;
    const prevPadRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${
        parseFloat(getComputedStyle(document.body).paddingRight) + scrollbarWidth
      }px`;
    }
    document.body.style.overflow = 'hidden';
    dlg.showModal();
    return () => {
      dlg.close();
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadRight;
      selection.trigger.focus({ preventScroll: true });
      window.scrollTo({ top: selection.scrollY, behavior: 'instant' });
    };
  }, [selection]);

  useEffect(() => {
    if (!ref || version !== 'WEB') return;
    const ctrl = new AbortController();
    let active = true;
    fetch(`/api/scripture?reference=${encodeURIComponent(chapterLabel)}`, {
      signal: ctrl.signal
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? 'The chapter could not load.');
        if (
          data.reference !== chapterLabel ||
          !Array.isArray(data.verses) ||
          !data.verses.length
        ) {
          throw new Error('The chapter could not be read. Please try again.');
        }
        if (active) setState({ chapter: data });
      })
      .catch(err => {
        if (active && err.name !== 'AbortError') {
          setState({ error: err.message || 'Reconnect and try again.' });
        }
      });
    return () => {
      active = false;
      ctrl.abort();
    };
  }, [chapterLabel, retryCount, ref, version]);

  useEffect(() => {
    if (version === 'WEB' && state?.chapter && ref?.verse) {
      scrollToVerse(ref.verse);
    }
  }, [state, ref?.verse, version]);

  return (
    <dialog
      ref={dialogRef}
      className={`fd-scripture-popup ${isDark ? 'bible-dark' : 'bible-light'}`}
      aria-labelledby="fd-scripture-title"
      onCancel={e => {
        e.preventDefault();
        onClose();
      }}
      onClick={e => {
        if (e.target === dialogRef.current && dialogRef.current) {
          const rect = dialogRef.current.getBoundingClientRect();
          if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
          ) {
            onClose();
          }
        }
      }}
    >
      <header>
        <div>
          <p className="fd-eyebrow">
            <BookOpen size={15} /> SCRIPTURE READING
          </p>
          <h2 id="fd-scripture-title">{headingLabel}</h2>
          <p>
            English · {VERSION_NAMES[version]}
            {version === 'WEB'
              ? ' · Public domain'
              : version !== 'SOURCE'
              ? ' · Hosted by Biblia / Logos'
              : ''}
          </p>
        </div>
        <button
          autoFocus
          className="fd-popup-close"
          aria-label="Close Bible reading"
          onClick={onClose}
        >
          <X size={22} />
        </button>
      </header>
      <div className="fd-popup-version">
        <label>
          Bible version{' '}
          <select
            aria-label="Bible version"
            value={version}
            onChange={e => {
              setVersion(e.target.value);
              setScope('passage');
            }}
          >
            {ref ? (
              <>
                <option value="WEB">WEB · World English Bible</option>
                <option value="NKJV">NKJV · New King James Version</option>
                <option value="NIV">NIV · New International Version</option>
              </>
            ) : (
              <option value="SOURCE">Original eBible edition</option>
            )}
          </select>
        </label>
        <span>
          {version === 'WEB'
            ? 'Full chapter with the cited verses highlighted.'
            : 'Read and scroll in the hosted Bible reader below.'}
        </span>
      </div>
      {ref && (
        <div className="fd-popup-toolbar">
          <span>Scroll within this window to read the full chapter.</span>
          <div>
            <button
              onClick={() =>
                version === 'WEB'
                  ? bodyRef.current?.scrollTo({ top: 0, behavior: 'instant' })
                  : switchScope('chapter')
              }
            >
              Chapter start
            </button>
            {ref.verse && (
              <button
                onClick={() =>
                  version === 'WEB' ? scrollToVerse(ref.verse!) : switchScope('passage')
                }
              >
                Cited passage
              </button>
            )}
          </div>
        </div>
      )}
      {version === 'WEB' ? (
        <div
          ref={bodyRef}
          className="fd-popup-body"
          role="region"
          aria-label="Scrollable Bible chapter"
          tabIndex={0}
          lang="en"
          aria-busy={!state}
        >
          {!state && <p role="status">Loading {chapterLabel}…</p>}
          {state?.error && (
            <div role="alert">
              <p>{state.error}</p>
              <button
                className="fd-primary"
                onClick={() => {
                  setState(null);
                  setRetryCount( retryCount + 1 );
                }}
              >
                Try again
              </button>
            </div>
          )}
          {state?.chapter && (
            <>
              <h3>{state.chapter.reference}</h3>
              {state.chapter.verses.map(v => {
                const vNum = Number(v.number);
                const isCited =
                  ref?.verse &&
                  vNum >= ref.verse &&
                  (ref.endChapter > ref.chapter || vNum <= (ref.endVerse ?? ref.verse));
                return (
                  <p
                    key={v.number}
                    data-verse={v.number}
                    className={isCited ? 'fd-cited-verse' : ''}
                  >
                    <sup>{v.number}</sup>
                    {v.text}
                  </p>
                );
              })}
              <p className="fd-popup-attribution">
                {state.chapter.translation}. Unmodified English Scripture from eBible.org. This
                text is public domain; World English Bible identifies the original translation.
              </p>
            </>
          )}
        </div>
      ) : (
        <HostedBibleReader
          key={`${hostedUrl}:${iframeKey}`}
          url={hostedUrl}
          title={`${VERSION_NAMES[version]} — ${headingLabel}`}
        />
      )}
      <footer>
        <span>Your place in the book stays saved.</span>
        <button className="fd-primary" onClick={onClose}>
          Close &amp; return to book
        </button>
      </footer>
    </dialog>
  );
}

function HostedBibleReader({ url, title }: { url: string; title: string }) {
  const [status, setStatus] = useState<'loading' | 'slow' | 'ready' | 'error'>('loading');
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setStatus(s => (s === 'loading' ? 'slow' : s)), 15000);
    return () => clearTimeout(t);
  }, [reloadCount]);

  return (
    <div className="fd-hosted-bible">
      <div className="fd-hosted-status">
        {status === 'loading' ? (
          <span role="status">Loading the Bible reader…</span>
        ) : status === 'slow' || status === 'error' ? (
          <span role="alert">
            The hosted reader is taking longer to load. Check your connection, retry, or choose
            WEB.
          </span>
        ) : (
          <span>
            Translation text and attribution are supplied by the hosted reader. An internet
            connection is required.
          </span>
        )}
        <button
          onClick={() => {
            setStatus('loading');
            setReloadCount(reloadCount + 1);
          }}
        >
          Reload reader
        </button>
      </div>
      <iframe
        key={reloadCount}
        src={url}
        title={title}
        sandbox="allow-scripts allow-same-origin allow-forms"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setStatus('ready')}
        onError={() => setStatus('error')}
      />
    </div>
  );
}

export function BibleSourceProvider({ children }: { children: React.ReactNode }) {
  const [selection, setSelection] = useState<ScriptureSelection | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const anchor = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (!anchor || !(anchor instanceof HTMLAnchorElement) || !isEbibleUrl(anchor.href)) return;
      e.preventDefault();
      const ref = extractScriptureRef(
        anchor.href,
        anchor.dataset.scriptureReference ?? anchor.textContent ?? ''
      );
      const base = { trigger: anchor, scrollY: window.scrollY };
      setSelection(
        ref
          ? { ...base, reference: ref }
          : {
              ...base,
              reference: null,
              sourceUrl: anchor.href,
              title:
                anchor.dataset.scriptureReference ??
                anchor.textContent?.trim() ??
                'Bible source'
            }
      );
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {children}
      {selection && (
        <ScriptureModal selection={selection} onClose={() => setSelection(null)} />
      )}
    </>
  );
}
