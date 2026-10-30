import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { setStorage, useLocalStorage } from './storage';

export const LANGUAGES = [
  { code: 'en', name: 'English', short: 'EN' },
  { code: 'fil', name: 'Filipino / Tagalog', short: 'FIL' },
  { code: 'ilo', name: 'Ilokano (Ilocano)', short: 'ILO' }
] as const;

export type LocaleCode = 'en' | 'fil' | 'ilo';

interface TranslationBundle {
  locale: LocaleCode;
  sourceHash: string;
  reviewStatus: string;
  provider: string;
  messages: Record<string, string>;
}

const DEFAULT_BUNDLE: TranslationBundle = {
  locale: 'en',
  sourceHash: 'original',
  reviewStatus: 'translation-review-pending',
  provider: 'Original English',
  messages: {}
};

const CACHE = new Map<string, TranslationBundle>([['en', DEFAULT_BUNDLE]]);

const SKIP_KEYS = new Set([
  'id',
  'bookId',
  'chapterId',
  'lessonId',
  'lesson',
  'partId',
  'claimId',
  'claimIds',
  'sourceIds',
  'url',
  'sourceUrl',
  'coordinateSourceUrl',
  'coordinateLicenseUrl',
  'status',
  'verification',
  'kind',
  'evidenceStatus',
  'category',
  'accent',
  'type',
  'src',
  'hebrew',
  'license',
  'licenseUrl',
  'attribution'
]);

interface LanguageContextValue {
  locale: LocaleCode;
  loading: boolean;
  error: string;
  changeLanguage: (code: string) => Promise<void>;
  t: (text: string, vars?: Record<string, any>) => string;
  localize: <T>(data: T) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [stored] = useLocalStorage<{ code: LocaleCode }>('language', { code: 'en' });
  const [bundle, setBundle] = useState<TranslationBundle>(DEFAULT_BUNDLE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const reqId = useRef(0);

  const changeLanguage = useCallback(
    async (code: string) => {
      if (!LANGUAGES.some(l => l.code === code)) return;
      const currentReq = ++reqId.current;
      if (code === bundle.locale) {
        setStorage('language', { code });
        setLoading(false);
        setError('');
        return;
      }
      setLoading(true);
      setError('');
      try {
        let target = CACHE.get(code);
        if (!target) {
          const res = await fetch(`/translations/${code}.json`);
          if (!res.ok) throw new Error();
          const json = await res.json();
          if (
            json.locale !== code ||
            !json.messages ||
            typeof json.messages !== 'object'
          ) {
            throw new Error();
          }
          target = json as TranslationBundle;
          CACHE.set(code, target);
        }
        if (currentReq !== reqId.current) return;
        setBundle(target);
        setStorage('language', { code });
        setLoading(false);
      } catch {
        if (currentReq === reqId.current) {
          setLoading(false);
          setError('The translation could not load. Reconnect and try again.');
        }
      }
    },
    [bundle.locale]
  );

  useEffect(() => {
    let active = true;
    if (stored.code !== bundle.locale) {
      queueMicrotask(() => {
        if (active) changeLanguage(stored.code);
      });
    }
    return () => {
      active = false;
    };
  }, [stored.code, bundle.locale, changeLanguage]);

  useEffect(() => {
    document.documentElement.lang = bundle.locale;
  }, [bundle.locale]);

  const t = useCallback(
    (text: string, vars?: Record<string, any>) => {
      const translated = bundle.messages[text] ?? text;
      return vars
        ? translated.replace(/\{(\w+)\}/g, (match, k) => String(vars[k] ?? match))
        : translated;
    },
    [bundle]
  );

  const localize = useCallback(
    <T,>(input: T): T => {
      function walk(val: any, key = '', path = ''): any {
        if (
          SKIP_KEYS.has(key) ||
          ((path.includes('.sources') || path.includes('.bibliography')) && (key === 'title' || key === 'locator'))
        ) {
          return val;
        }
        if (typeof val === 'string') return bundle.messages[val] ?? val;
        if (Array.isArray(val)) return val.map(item => walk(item, '', path));
        if (val && typeof val === 'object') {
          return Object.fromEntries(
            Object.entries(val).map(([k, v]) => [k, walk(v, k, `${path}.${k}`)])
          );
        }
        return val;
      }
      return walk(input);
    },
    [bundle]
  );

  const value = useMemo(
    () => ({
      locale: bundle.locale,
      loading,
      error,
      changeLanguage,
      t,
      localize
    }),
    [bundle.locale, loading, error, changeLanguage, t, localize]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('LanguageProvider is required');
  return ctx;
}
