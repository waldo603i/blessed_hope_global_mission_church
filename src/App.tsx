import React, { useEffect } from 'react';
import { LanguageProvider } from './lib/language';
import { BibleSourceProvider } from './components/BibleSourceModal';
import { usePathnameState } from './lib/router';
import {
  FoundationDashboard,
  FoundationGlossary,
  FoundationLibrary,
  FoundationReader,
  FoundationSources
} from './components/Foundations';
import { BookApp } from './components/BookApp';
import {
  ATLAS_CATALOG,
  ATLAS_PARTS,
  FOUNDATION_ALL_SOURCES,
  FOUNDATION_GLOSSARY_ENTRIES,
  FOUNDATIONS_CATALOG,
  FOUNDATIONS_MAP
} from './data/catalogData';

function RouteSwitch() {
  const { pathname } = usePathnameState();
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  useEffect(() => {
    if (cleanPath.startsWith('/foundations')) {
      const slug = cleanPath.slice('/foundations/'.length);
      const entry = FOUNDATIONS_MAP[slug];
      document.title = entry
        ? `${entry.chapter.title} · Foundations · Knowing God`
        : 'Foundations · Knowing God';
    } else {
      document.title = 'Blessed Hope Global Mission Church';
    }
  }, [cleanPath]);

  if (cleanPath === '/foundations') {
    return <FoundationLibrary catalog={FOUNDATIONS_CATALOG} />;
  }
  if (cleanPath === '/foundations/study') {
    return <FoundationDashboard catalog={FOUNDATIONS_CATALOG} />;
  }
  if (cleanPath === '/foundations/glossary') {
    return <FoundationGlossary entries={FOUNDATION_GLOSSARY_ENTRIES} />;
  }
  if (cleanPath === '/foundations/sources') {
    return <FoundationSources sources={FOUNDATION_ALL_SOURCES} />;
  }
  if (cleanPath.startsWith('/foundations/')) {
    const slug = cleanPath.slice('/foundations/'.length);
    const data = FOUNDATIONS_MAP[slug] ?? FOUNDATIONS_MAP['theology-proper'];
    return (
      <FoundationReader
        key={data.chapter.id}
        chapter={data.chapter}
        translations={data.translations}
        catalog={FOUNDATIONS_CATALOG}
      />
    );
  }
  if (cleanPath.startsWith('/read/')) {
    const lessonId = cleanPath.slice('/read/'.length);
    return (
      <BookApp
        catalog={ATLAS_CATALOG}
        parts={ATLAS_PARTS}
        initialLesson={lessonId}
        showFoundationPreview={true}
      />
    );
  }

  return (
    <BookApp
      catalog={ATLAS_CATALOG}
      parts={ATLAS_PARTS}
      showFoundationPreview={true}
    />
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BibleSourceProvider>
        <RouteSwitch />
      </BibleSourceProvider>
    </LanguageProvider>
  );
}
