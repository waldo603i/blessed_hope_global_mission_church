import React, { useCallback, useEffect, useState } from 'react';

const NAV_EVENT = 'knowing-god-nav';

export function navigateTo(href: string) {
  const url = new URL(href, window.location.origin);
  const samePathAndSearch =
    url.pathname === window.location.pathname && url.search === window.location.search;
  window.history.pushState({}, '', url.pathname + url.search + url.hash);
  window.dispatchEvent(new Event(NAV_EVENT));
  if (url.hash) {
    const id = url.hash.slice(1);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' });
      });
    });
  } else if (!samePathAndSearch) {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

export function useRouter() {
  const push = useCallback((href: string) => {
    navigateTo(href);
  }, []);
  return { push };
}

export function usePathnameState() {
  const [loc, setLoc] = useState(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash
  }));

  useEffect(() => {
    const update = () => {
      setLoc({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      });
    };
    window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);
    window.addEventListener(NAV_EVENT, update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('hashchange', update);
      window.removeEventListener(NAV_EVENT, update);
    };
  }, []);

  return loc;
}

export function Link({
  href,
  onClick,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      href={href}
      onClick={e => {
        onClick?.(e);
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          rest.target === '_blank'
        ) {
          return;
        }
        if (href.startsWith('/') || href.startsWith('#')) {
          e.preventDefault();
          navigateTo(href);
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Img({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  sizes,
  style,
  loading,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
}) {
  const computedStyle: React.CSSProperties = fill
    ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        ...style
      }
    : style || {};

  return (
    <img
      src={src}
      alt={alt || ''}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      loading={priority ? 'eager' : loading || 'lazy'}
      decoding="async"
      style={computedStyle}
      {...rest}
    />
  );
}
