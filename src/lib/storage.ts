import { useSyncExternalStore } from 'react';

const EVENT_NAME = 'knowing-god-state';

export function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`kg:${key}`, JSON.stringify(value));
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch {}
}

const subscribe = (cb: () => void) => {
  window.addEventListener('storage', cb);
  window.addEventListener(EVENT_NAME, cb);
  return () => {
    window.removeEventListener('storage', cb);
    window.removeEventListener(EVENT_NAME, cb);
  };
};

function isValid(key: string, val: any): boolean {
  if (!val || typeof val !== 'object') return false;
  if (key === 'foundation-study') {
    return (
      Array.isArray(val.completed) &&
      val.completed.every((e: any) => typeof e === 'string') &&
      Array.isArray(val.bookmarks) &&
      val.bookmarks.every((e: any) => typeof e === 'string') &&
      typeof val.last === 'string' &&
      typeof val.section === 'string' &&
      !!val.scores &&
      typeof val.scores === 'object' &&
      Object.values(val.scores).every((e: any) => Number.isInteger(e) && Number(e) >= 0 && Number(e) <= 5)
    );
  }
  if (key === 'foundation-dark') return typeof val.on === 'boolean';
  if (key === 'foundation-size') return Number.isInteger(val.value) && Number(val.value) >= 16 && Number(val.value) <= 26;
  if (key === 'foundation-depth') return ['beginner', 'in-depth', 'advanced'].includes(String(val.value));
  if (key === 'language') return ['en', 'fil', 'ilo'].includes(String(val.code));
  if (key === 'bookmarks') {
    return (
      Array.isArray(val) &&
      val.every((e: any) => e && typeof e.id === 'string' && typeof e.title === 'string' && Number.isInteger(e.page) && e.page >= 0)
    );
  }
  if (key === 'progress') {
    return (
      typeof val.id === 'string' &&
      Number.isInteger(val.page) &&
      val.page >= 0 &&
      Array.isArray(val.completed) &&
      val.completed.every((e: any) => typeof e === 'string')
    );
  }
  if (key === 'preferences') {
    return (
      typeof val.fontSize === 'number' &&
      val.fontSize >= 16 &&
      val.fontSize <= 26 &&
      typeof val.spacing === 'number' &&
      val.spacing >= 1.5 &&
      val.spacing <= 2.2 &&
      ['light', 'dark'].includes(String(val.theme)) &&
      ['serif', 'sans'].includes(String(val.font))
    );
  }
  return true;
}

export function getStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`kg:${key}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (isValid(key, parsed)) return parsed as T;
    }
  } catch {}
  return fallback;
}

export function useLocalStorage<T>(key: string, fallback: T): [T, (val: T) => void] {
  const raw = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(`kg:${key}`);
      } catch {
        return null;
      }
    },
    () => null
  );
  let current = fallback;
  try {
    if (raw) {
      const parsed = JSON.parse(raw);
      if (isValid(key, parsed)) current = parsed as T;
    }
  } catch {}
  return [current, (val: T) => setStorage(key, val)];
}
