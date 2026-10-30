export type Language = 'en' | 'tl' | 'ilo';

export interface TrilingualText {
  en: string;
  tl: string;
  ilo: string;
}

export interface ScriptureReference {
  ref: string; // e.g. "2 Timothy 2:15 (KJV / ADB / ILO)"
  text: TrilingualText;
  commentary?: TrilingualText;
}

export interface ReferencePlateItem {
  id: string;
  filename: string;
  plateNumber: number;
  bookId: string;
  category:
    | 'bibliology'
    | 'theology-proper'
    | 'christology'
    | 'pneumatology'
    | 'angelology-demonology'
    | 'anthropology-hamartiology'
    | 'soteriology'
    | 'ecclesiology'
    | 'eschatology';
  title: TrilingualText;
  subtitle: TrilingualText;
  keyScripture: string;
  pastoralSynthesis: TrilingualText;
  keyPoints: {
    label: TrilingualText;
    scripture: string;
    explanation: TrilingualText;
  }[];
  interactiveVisualizerType?:
    | 'doctrines-11'
    | 'bible-stats'
    | 'manuscripts-8'
    | 'hermeneutics-5'
    | 'kingdom-vs-grace'
    | 'jesus-66-books'
    | 'trinity-shield'
    | 'trinity-salvation'
    | 'attributes-god'
    | 'names-god'
    | 'typology-matrix'
    | 'jesus-life-timeline'
    | 'names-christ-85'
    | 'holy-spirit-filling'
    | 'spirit-ministry-5'
    | 'spirits-discernment'
    | 'archangels-canonical'
    | 'devil-20-names'
    | 'deliverance-4-steps'
    | 'last-day-deceptions'
    | 'backsliding-cure'
    | 'salvation-3-phases'
    | 'israel-4000-years'
    | 'man-of-god-23'
    | 'millennial-7000-days'
    | 'end-times-timeline'
    | 'rapture-vs-second-coming'
    | 'antichrist-15-traits'
    | 'judgment-day-12';
}

export interface TheologicalSection {
  id: string;
  sectionNumber: string;
  title: TrilingualText;
  subtitle: TrilingualText;
  pastoralExposition: TrilingualText; // Deep multi-paragraph exposition
  theologicalBreakdown: {
    heading: TrilingualText;
    greekOrHebrewTerm?: string;
    meaning?: TrilingualText;
    explanation: TrilingualText;
    scripture: string;
  }[];
  scriptureAnchors: ScriptureReference[];
  linkedPlateIds: string[];
  interactiveWidget?: ReferencePlateItem['interactiveVisualizerType'];
  pastoralApplication: TrilingualText;
}

export interface QuizQuestion {
  id: string;
  question: TrilingualText;
  options: TrilingualText[];
  correctIndex: number;
  explanation: TrilingualText;
  scriptureProof: string;
}

export interface TheologicalBookChapter {
  id: string;
  bookNumber: number; // 1 to 10
  romanNumeral: string; // I to X
  doctrineCode: string; // e.g., "BIBLIOLOGY", "THEOLOGY PROPER", etc.
  greekEtymology: string; // e.g. "βιβλίον (Biblion) + λόγος (Logos)"
  title: TrilingualText;
  subtitle: TrilingualText;
  heroArtUrl: string;
  accentColor: string; // Tailwind gradient / hex
  estimatedMinutes: number;
  keyVerse: ScriptureReference;
  pastoralPrologue: TrilingualText;
  sections: TheologicalSection[];
  pastoralPrayer: TrilingualText;
  quiz: QuizQuestion[];
}

export interface ReaderProgressState {
  completedSections: string[]; // section IDs
  completedChapters: string[]; // chapter IDs
  studiedPlates: string[]; // reference plate IDs
  quizScores: Record<string, { score: number; total: number; completedAt: string }>;
  bookmarks: string[]; // section IDs
  notes: Record<string, string>; // section ID or chapter ID -> user note
  chapterScrollProgress: Record<string, number>; // chapter ID -> 0..100
  studyMinutes: number;
  streakDays: number;
  lastStudiedDate: string;
  readerName: string;
}
