import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Church,
  Clock,
  Compass,
  Download,
  ExternalLink,
  Flame,
  Globe,
  Heart,
  Info,
  Layers3,
  Leaf,
  Library,
  List,
  MapPin,
  Menu,
  Moon,
  Printer,
  Quote,
  ScrollText,
  Search,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Users,
  WifiOff,
  X
} from 'lucide-react';
import { Img, Link, navigateTo } from '../lib/router';
import { getWebUrl } from '../lib/scripture';
import { LANGUAGES, useLanguage } from '../lib/language';
import { getStorage, setStorage, useLocalStorage } from '../lib/storage';
import { AtlasTeachingFigure, IllustratedEntry } from './VisualStudy';
import { LESSONS_MAP, REFERENCES_DATA } from '../data/catalogData';

const DIVINE_NAMES = [
  {
    id: 'yhwh',
    name: 'YHWH',
    hebrew: 'יהוה',
    meaning: 'The divine name, rendered LORD in this WEB edition',
    reference: 'Exodus 3:15',
    context:
      'God commissions Moses to bring Israel out of Egypt and identifies himself with the God of Abraham, Isaac and Jacob.',
    note: 'YHWH represents four Hebrew consonants. Yahweh is a common scholarly vocalization; LORD is the chosen translation\'s convention. Exodus 3:14 and 3:15 are related in context, but an English phrase is not a complete etymology of the name.',
    sourceUrl: 'https://ebible.org/engwebp/EXO03.htm',
    kind: 'divine-name',
    evidenceStatus: 'text-occurrence-checked'
  },
  {
    id: 'elohim',
    name: 'Elohim',
    hebrew: 'אלהים',
    meaning: 'God; context determines the referent',
    reference: 'Genesis 1:1',
    context: 'The opening creation account identifies God as creator of heaven and earth.',
    note: 'A Hebrew noun used for Israel\'s God and, in other contexts, gods. Its plural form alone does not prove the Trinity; read syntax and context rather than deriving doctrine from the ending.',
    sourceUrl: 'https://ebible.org/engwebp/GEN01.htm',
    kind: 'title',
    evidenceStatus: 'text-occurrence-checked'
  },
  {
    id: 'adonai',
    name: 'Adonai',
    hebrew: 'אדני',
    meaning: 'Lord, in address to God',
    reference: 'Genesis 18:27',
    context: 'Abraham addresses the Lord while interceding concerning Sodom.',
    note: 'A title of address, not the four-letter divine name. Unpointed Hebrew can conceal distinctions between similar forms; this entry concerns the pointed form in Genesis 18:27, not every occurrence of these consonants.',
    sourceUrl: 'https://ebible.org/engwebp/GEN18.htm',
    kind: 'title',
    evidenceStatus: 'text-occurrence-checked'
  },
  {
    id: 'el-elyon',
    name: 'El Elyon',
    hebrew: 'אל עליון',
    meaning: 'God Most High',
    reference: 'Genesis 14:18-22',
    context:
      'Melchizedek blesses Abram as priest of God Most High; Abram identifies the LORD with God Most High.',
    note: 'A biblical title in the narrative. The entry explains its use in this passage without making a claim about every ancient Near Eastern use of El or Elyon.',
    sourceUrl: 'https://ebible.org/engwebp/GEN14.htm',
    kind: 'title',
    evidenceStatus: 'text-occurrence-checked'
  },
  {
    id: 'el-shaddai',
    name: 'El Shaddai',
    hebrew: 'אל שדי',
    meaning: 'God Almighty — traditional translation',
    reference: 'Genesis 17:1',
    context:
      'God addresses Abram before the covenant promises and the change of his name to Abraham.',
    note: 'God Almighty is the WEB rendering. The historical derivation of Shaddai is disputed; do not present popular word breakdowns such as a precise derivation from breasts or mountains as established fact.',
    sourceUrl: 'https://ebible.org/engwebp/GEN17.htm',
    kind: 'title',
    evidenceStatus: 'text-occurrence-checked'
  },
  {
    id: 'el-roi',
    name: 'El Roi',
    hebrew: 'אל ראי',
    meaning: 'God who sees — traditional contextual gloss',
    reference: 'Genesis 16:13',
    context:
      'Hagar names the LORD after the encounter in the wilderness that follows Sarai\'s harsh treatment of her.',
    note: 'The WEB translates the address as a God who sees. The Hebrew verse\'s full explanation is difficult and translations vary. This narrative must not be used to direct an abused person to remain in danger.',
    sourceUrl: 'https://ebible.org/engwebp/GEN16.htm',
    kind: 'title',
    evidenceStatus: 'text-occurrence-checked'
  },
  {
    id: 'el-olam',
    name: 'El Olam',
    hebrew: 'אל עולם',
    meaning: 'Everlasting God',
    reference: 'Genesis 21:33',
    context:
      'After the treaty at Beersheba, Abraham plants a tamarisk and calls on the LORD, the Everlasting God.',
    note: 'This is a divine title in its narrative setting. Do not reduce every use of olam to one English time concept without reading context.',
    sourceUrl: 'https://ebible.org/engwebp/GEN21.htm',
    kind: 'title',
    evidenceStatus: 'text-occurrence-checked'
  },
  {
    id: 'yhwh-yireh',
    name: 'YHWH-Yireh',
    hebrew: 'יהוה יראה',
    meaning: 'The LORD will provide',
    reference: 'Genesis 22:14',
    context:
      'Abraham names the place after God stops the sacrifice of Isaac and Abraham offers a ram in his son\'s place.',
    note: 'Yireh/Jireh is a familiar transliteration of the expression. The Hebrew involves seeing; the WEB\'s note gives LORD Seeing as an alternative. In the narrative it is the place\'s name, later used devotionally as a title. This is not an unconditional promise of material wealth.',
    sourceUrl: 'https://ebible.org/engwebp/GEN22.htm',
    kind: 'place-name',
    evidenceStatus: 'text-occurrence-checked'
  },
  {
    id: 'yhwh-rapha',
    name: 'YHWH-Rapha',
    hebrew: 'יהוה רפאך',
    meaning: 'The LORD who heals you',
    reference: 'Exodus 15:26',
    context:
      'At Marah, after the bitter water episode, Israel receives a conditional covenant admonition and God\'s healing declaration.',
    note: 'Rapha is a common devotional label. The actual clause includes rofekha, who heals you/your healer, rather than a newly assigned proper name YHWH-Rapha. Do not turn this covenant context into a guarantee that every illness will be immediately healed.',
    sourceUrl: 'https://ebible.org/engwebp/EXO15.htm',
    kind: 'description',
    evidenceStatus: 'text-occurrence-checked'
  },
  {
    id: 'yhwh-nissi',
    name: 'YHWH-Nissi',
    hebrew: 'יהוה נסי',
    meaning: 'The LORD is my banner',
    reference: 'Exodus 17:15',
    context: 'Moses builds and names an altar after the conflict with Amalek at Rephidim.',
    note: 'The Hebrew suffix is first-person singular, my banner. This WEB edition renders the altar name The LORD our Banner and supplies LORD Nissi in a note. The explanatory gloss is not passed off as a verbatim WEB quotation. It is an altar name in context.',
    sourceUrl: 'https://ebible.org/engwebp/EXO17.htm',
    kind: 'altar-name',
    evidenceStatus: 'text-occurrence-checked'
  },
  {
    id: 'yhwh-shalom',
    name: 'YHWH-Shalom',
    hebrew: 'יהוה שלום',
    meaning: 'The LORD is peace',
    reference: 'Judges 6:24',
    context:
      'After the LORD reassures Gideon that he will not die, Gideon names an altar at Ophrah.',
    note: 'An altar name in the narrative, not a claim that Gideon\'s circumstances become free of conflict. Shalom is explained here through the passage\'s reassurance; an exhaustive lexical study would require further sources.',
    sourceUrl: 'https://ebible.org/engwebp/JDG06.htm',
    kind: 'altar-name',
    evidenceStatus: 'text-occurrence-checked'
  },
  {
    id: 'yhwh-tsidkenu',
    name: 'YHWH-Tsidkenu',
    hebrew: 'יהוה צדקנו',
    meaning: 'The LORD our righteousness',
    reference: 'Jeremiah 23:6',
    context:
      'Jeremiah contrasts failed shepherds with a promised righteous Branch from David who will reign wisely.',
    note: 'The passage gives this name to the anticipated king. Christian application to Jesus is a theological reading, distinct from transcribing the Hebrew expression. Compare Jeremiah 33:16, where similar naming is associated with Jerusalem.',
    sourceUrl: 'https://ebible.org/engwebp/JER23.htm',
    kind: 'title',
    evidenceStatus: 'text-occurrence-checked'
  },
  {
    id: 'yhwh-shammah',
    name: 'YHWH-Shammah',
    hebrew: 'יהוה שמה',
    meaning: 'The LORD is there',
    reference: 'Ezekiel 48:35',
    context:
      'The final verse of Ezekiel\'s temple-and-land vision gives the city a name marking the LORD\'s presence.',
    note: 'This is the city\'s name in the vision, later used devotionally for God. Hebrew occurrence was checked in OSHB Ezekiel 48:35; direct WEB chapter retrieval failed in the initial browser audit. Do not label the vision as a verified modern map.',
    sourceUrl: 'https://raw.githubusercontent.com/openscriptures/morphhb/master/wlc/Ezek.xml',
    kind: 'place-name',
    evidenceStatus: 'text-occurrence-checked'
  },
  {
    id: 'yhwh-sabaoth',
    name: 'YHWH-Sabaoth',
    hebrew: 'יהוה צבאות',
    meaning: 'The LORD of hosts / armies',
    reference: '1 Samuel 1:3',
    context:
      'Elkanah goes to worship at Shiloh; Hannah also uses the title in her prayer in verse 11.',
    note: 'Sabaoth/Tsevaot represents the Hebrew word rendered armies or hosts; it is not the word Sabbath. Do not infer the identity of every host from a transliteration alone.',
    sourceUrl: 'https://ebible.org/engwebp/1SA01.htm',
    kind: 'title',
    evidenceStatus: 'text-occurrence-checked'
  },
  {
    id: 'yahweh-selah',
    name: 'Yahweh-Selah?',
    hebrew: 'סלה',
    meaning: 'Unsubstantiated as a biblical divine name',
    reference: 'Psalms 46:7',
    context:
      'Psalm 46 uses LORD of Armies and has Selah as a separate textual marker. This does not establish a compound name Yahweh-Selah.',
    note: 'Only the Hebrew word Selah is shown, not an invented Hebrew compound. Its precise ancient function is uncertain. A social-media label needs an exact textual witness and scholarly examination before inclusion as a name; no such evidence was established in this review.',
    sourceUrl: 'https://ebible.org/engwebp/PSA046.htm',
    kind: 'unsubstantiated-label',
    evidenceStatus: 'not-established-as-a-name'
  }
];

const NICENE_URL =
  'https://www.oca.org/orthodoxy/the-orthodox-faith/doctrine-scripture/the-symbol-of-faith/nicene-creed';

const EXTRA_GLOSSARY_EVIDENCE: Record<
  string,
  { category: string; url: string; locator: string }[]
> = {
  Canon: [
    {
      category: 'A',
      url: 'https://ebible.org/engwebp/copyright.htm',
      locator: 'Edition footer: updated WEB 66-book protocanon'
    },
    {
      category: 'E',
      url: 'https://www.vatican.va/archive/ENG0015/__PR.HTM',
      locator: 'Catechism of the Catholic Church 120: canon list'
    },
    {
      category: 'E',
      url: 'https://www.opc.org/wcf.html',
      locator: 'Westminster Confession I.2–3: canon list and Apocrypha'
    }
  ],
  Providence: [
    {
      category: 'A',
      url: getWebUrl('Romans 8:35–39'),
      locator: 'Romans 8:35–39: suffering and God’s love'
    }
  ],
  Trinity: [
    {
      category: 'D',
      url: NICENE_URL,
      locator: 'Nicene Creed: one God, Son and Holy Spirit; OCA presentation'
    }
  ],
  Incarnation: [
    {
      category: 'D',
      url: NICENE_URL,
      locator: 'Nicene Creed: Son’s divinity and incarnation; OCA presentation'
    }
  ],
  Creed: [
    {
      category: 'D',
      url: NICENE_URL,
      locator: 'The Symbol of Faith: account of historical confession'
    }
  ]
};

const ATLAS_GLOSSARY = [
  {
    term: 'Theology',
    definition:
      'In this textbook, disciplined reflection on God and the life of faith, accountable to Scripture and attentive to Christian tradition. This is an editorial study definition.',
    reference: 'Romans 11:33–36',
    lesson: 'interpreting-scripture'
  },
  {
    term: 'Revelation',
    definition:
      'God’s self-disclosure. Hebrews opens by describing God speaking through the prophets and, climactically, through his Son.',
    reference: 'Hebrews 1:1–3',
    lesson: 'scripture'
  },
  {
    term: 'Canon',
    definition:
      'The collection of books a Christian community receives as Holy Scripture. This preview selects 66 books; 2 Timothy does not itself supply that list. For example, Catholic canon lists differ from the Protestant collection used here.',
    reference: '2 Timothy 3:14–17',
    lesson: 'scripture'
  },
  {
    term: 'Inspiration',
    definition:
      'Scripture’s relation to God, expressed in 2 Timothy by the wording God-breathed. This does not make every reader’s interpretation infallible.',
    reference: '2 Timothy 3:16',
    lesson: 'scripture'
  },
  {
    term: 'YHWH',
    definition:
      'The four Hebrew consonants of the divine name. This WEB edition conventionally renders it as LORD. Yahweh is a common transliteration; this entry does not establish its exact ancient pronunciation.',
    reference: 'Exodus 3:14–15',
    lesson: 'yhwh-yireh'
  },
  {
    term: 'Providence',
    definition:
      'God’s sustaining care for creation. Colossians speaks of all things being held together in Christ. This study definition does not promise that believers will avoid every loss or trial.',
    reference: 'Colossians 1:16–17',
    lesson: 'creation-covenant'
  },
  {
    term: 'Omniscience',
    definition:
      'A theological term for God’s complete knowledge. Psalm 139 celebrates God’s intimate knowledge of the speaker; the term summarizes a doctrine rather than quoting a biblical word.',
    reference: 'Psalm 139:1–6',
    lesson: 'omniscience'
  },
  {
    term: 'Trinity',
    definition:
      'The Nicene Christian confession of one God, Father, Son, and Holy Spirit. The theological formulation must be distinguished from the exact wording of Matthew’s baptismal command.',
    reference: 'Matthew 28:19',
    lesson: 'trinity'
  },
  {
    term: 'Covenant',
    definition:
      'A solemn relationship expressed through promises and commitments. Genesis 17 explicitly joins God’s covenant promise to Abraham with instructions for Abraham’s household. Each covenant needs its own context.',
    reference: 'Genesis 17:1–14',
    lesson: 'creation-covenant'
  },
  {
    term: 'Image of God',
    definition:
      'Genesis describes humanity as made in God’s image, male and female, and connects this with humanity’s vocation within creation. This is the starting passage for the textbook’s discussion of dignity and responsibility.',
    reference: 'Genesis 1:26–28',
    lesson: 'image-of-god'
  },
  {
    term: 'Sin',
    definition:
      'Wrongdoing and rebellion against God. Romans describes sinful deeds and speech, and states that all have sinned. This brief definition does not settle disputed accounts of inherited sin.',
    reference: 'Romans 3:9–23',
    lesson: 'sin-and-grace'
  },
  {
    term: 'Incarnation',
    definition:
      'The Word’s becoming flesh in Jesus Christ. John 1 is the primary reading; Nicene confession identifies the Son as divine and truly incarnate. Doctrinal explanation remains distinct from the verse itself.',
    reference: 'John 1:1–14',
    lesson: 'bread-of-life'
  },
  {
    term: 'Grace',
    definition:
      'God’s freely given favor and saving action. Ephesians describes salvation as God’s gift and places good works within the life created in Christ.',
    reference: 'Ephesians 2:8–10',
    lesson: 'salvation'
  },
  {
    term: 'Justification',
    definition:
      'A theological term concerning being put right with God. Romans 3 discusses justification, grace, faith, and redemption in Christ. The salvation lesson distinguishes textual statements from tradition-specific explanations.',
    reference: 'Romans 3:21–26',
    lesson: 'salvation'
  },
  {
    term: 'Sanctification',
    definition:
      'Being set apart for holiness and formed in holy living. In 1 Thessalonians 4, the term appears in instructions concerning conduct, avoiding wrongdoing, and God’s gift of the Holy Spirit.',
    reference: '1 Thessalonians 4:3–8',
    lesson: 'holy-spirit'
  },
  {
    term: 'Ecclesiology',
    definition:
      'The study of the church. Acts 2 provides one starting narrative about teaching, fellowship, prayer, shared meals, and generosity; it is not by itself an exhaustive account of church order.',
    reference: 'Acts 2:42–47',
    lesson: 'church'
  },
  {
    term: 'Eschatology',
    definition:
      'The study of Christian hope and last things. This entry begins with Paul’s account of resurrection, Christ’s coming, and the defeat of death; a complete account requires more than one passage.',
    reference: '1 Corinthians 15:20–28',
    lesson: 'resurrection-hope'
  },
  {
    term: 'Creed',
    definition:
      'A communal statement of belief. The Nicene Creed is a historical church confession. Paul’s received summary in 1 Corinthians provides a biblical point of comparison, not a claim that the later creed is a biblical book.',
    reference: '1 Corinthians 15:3–5',
    lesson: 'creeds'
  }
].map(e => ({
  ...e,
  claimId: `GLOSSARY:${e.term.toLowerCase().replaceAll(' ', '-')}`,
  sourceUrl: getWebUrl(e.reference),
  evidence: [
    { category: 'A', url: getWebUrl(e.reference), locator: e.reference },
    ...(EXTRA_GLOSSARY_EVIDENCE[e.term] ?? [])
  ],
  verification: 'references-checked',
  uncertainty:
    'Editorial study definition; sources checked for the stated scope, not an exhaustive lexicon entry. Pastoral review pending.'
}));

const CHRIST_TITLES = [
  {
    title: 'Bread of Life',
    reference: 'John 6:35',
    meaning:
      'Jesus connects coming to him and believing in him with the promise of not hungering or thirsting. Read this within the whole Bread of Life discourse.',
    lesson: 'bread-of-life'
  },
  {
    title: 'Good Shepherd',
    reference: 'John 10:11',
    meaning:
      'Jesus calls himself the good shepherd and speaks of laying down his life for the sheep.',
    lesson: 'bread-of-life'
  },
  {
    title: 'Word',
    reference: 'John 1:1–14',
    meaning: 'John introduces the Word who was with God, was God, and became flesh.',
    lesson: 'bread-of-life'
  },
  {
    title: 'Lamb of God',
    reference: 'John 1:29',
    meaning:
      'John the Baptist identifies Jesus as the Lamb of God who takes away the world’s sin. The title’s wider sacrificial background needs further interpretation.',
    lesson: 'salvation'
  },
  {
    title: 'Light of the World',
    reference: 'John 8:12',
    meaning:
      'Jesus associates following him with not walking in darkness and having the light of life.',
    lesson: 'discipleship'
  },
  {
    title: 'Resurrection and Life',
    reference: 'John 11:25',
    meaning:
      'Jesus identifies himself as the resurrection and the life while speaking to Martha after Lazarus’s death.',
    lesson: 'resurrection-hope'
  }
].map(e => ({
  ...e,
  claimId: `CHRIST-TITLE:${e.title.toLowerCase().replaceAll(' ', '-')}`,
  sourceUrl: getWebUrl(e.reference),
  category: 'A',
  locator: e.reference,
  verification: 'references-checked',
  uncertainty:
    'Contextual summary, not a full doctrine or an exact quotation. Pastoral review pending.'
}));

const BIBLICAL_PLACES = [
  {
    name: 'Jerusalem',
    lat: 31.776667,
    lon: 35.234167,
    reference: 'Acts 2:1–47',
    note: 'Acts 2 places the Pentecost gathering and early community in Jerusalem. The marker is a point in the modern Old City, not the identified house of Acts 2.',
    coordinateSourceUrl: 'https://www.openbible.info/geo/modern/m66c5b8/jerusalem',
    precision: 'Point in modern settlement; not an event location.'
  },
  {
    name: 'Bethlehem',
    lat: 31.704306,
    lon: 35.207639,
    reference: 'Matthew 2:1',
    note: 'Matthew names Bethlehem of Judea as Jesus’s birthplace. The marker follows the source’s archaeological-site point within Bethlehem; it does not verify an exact birthplace.',
    coordinateSourceUrl: 'https://www.openbible.info/geo/modern/m9b8daa/bethlehem',
    precision: 'Archaeological site in modern settlement; exact event location not established.'
  },
  {
    name: 'Nazareth',
    lat: 32.70214,
    lon: 35.29769,
    reference: 'Luke 4:16–17',
    note: 'Luke places Jesus’s reading from Isaiah in Nazareth, where he had been brought up. The marker is a traditional site in the modern settlement, not a verified first-century synagogue coordinate.',
    coordinateSourceUrl: 'https://www.openbible.info/geo/modern/mb3f688/nazareth',
    precision: 'Traditional site in modern settlement.'
  },
  {
    name: 'Capernaum',
    lat: 32.881111,
    lon: 35.575,
    reference: 'John 6:59',
    note: 'John locates this teaching in a synagogue in Capernaum. The marker follows the identification at Tell Hum; it does not certify the exact building used in John 6.',
    coordinateSourceUrl: 'https://www.openbible.info/geo/modern/m66efd0/tell-hum',
    precision: 'Point in visible remains; source rates identification with Capernaum high confidence.'
  },
  {
    name: 'Jericho',
    lat: 31.851872,
    lon: 35.436238,
    reference: 'Luke 19:1–10',
    note: 'Luke names Jericho in the encounter with Zacchaeus. This marker follows Tell el-Alayiq, the source’s Jericho 2 identification, rather than earlier Tell es-Sultan. It does not locate Zacchaeus’s tree or house.',
    coordinateSourceUrl: 'https://www.openbible.info/geo/modern/mdf4652/tell-el-alayiq',
    precision: 'Point in visible remains; broad settlement association only.'
  },
  {
    name: 'Hebron',
    lat: 31.525087,
    lon: 35.10222,
    reference: 'Genesis 23:19',
    note: 'Genesis associates Sarah’s burial at Machpelah with Hebron. The marker follows Tel Rumeida’s settlement identification; it does not pinpoint Sarah’s grave or validate a later shrine identification.',
    coordinateSourceUrl: 'https://www.openbible.info/geo/modern/m86f941/tel-rumeida',
    precision: 'Point on tel; settlement marker, not a grave coordinate.'
  }
].map(e => ({
  ...e,
  claimId: `PLACE:${e.name.toLowerCase()}`,
  sourceUrl: getWebUrl(e.reference),
  coordinateAttribution: 'OpenBible.info, modern-identification geocoding records (CC BY 4.0).',
  coordinateLicenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  verification: 'references-checked',
  uncertainty:
    'Modern coordinates identify a source-selected point in a settlement or site. They do not establish ancient boundaries, routes, or exact event locations.'
}));

function getLessonSync(id: string): any {
  return LESSONS_MAP[id] || null;
}

async function fetchLesson(id: string): Promise<any> {
  if (LESSONS_MAP[id]) return LESSONS_MAP[id];
  const res = await fetch(`/api/lessons/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error('Chapter unavailable');
  return res.json();
}

const DEFAULT_PREFS = {
  fontSize: 18,
  spacing: 1.85,
  theme: 'light',
  font: 'serif'
};

const DEFAULT_PROGRESS = {
  id: '',
  page: 0,
  completed: [] as string[]
};

const PART_ICONS = [
  Compass,
  ScrollText,
  Sun,
  Layers3,
  Leaf,
  Users,
  Shield,
  BookOpen,
  Flame,
  Heart,
  Globe,
  Church,
  Sun,
  Compass,
  Library
];

const ROMAN = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII',
  'XIII',
  'XIV',
  'XV'
];

function IconWrap({ icon: IconComp, size = 20 }: { icon: any; size?: number }) {
  return <IconComp size={size} strokeWidth={1.65} aria-hidden="true" />;
}

function LanguagePicker() {
  const { locale, loading, error, changeLanguage, t } = useLanguage();
  return (
    <div className="language-picker">
      <p>
        {t(
          'Choose the language for the entire book, including lessons, quizzes, glossary, and study notes.'
        )}
      </p>
      <div className="language-options">
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            className={locale === lang.code ? 'selected' : ''}
            aria-pressed={locale === lang.code}
            disabled={loading}
            onClick={() => void changeLanguage(lang.code)}
          >
            <Globe size={20} />
            <span lang={lang.code}>{lang.name}</span>
            {locale === lang.code && <Check size={18} />}
          </button>
        ))}
      </div>
      {loading && <p role="status">{t('Loading the complete translation…')}</p>}
      {error && <p role="alert">{t(error)}</p>}
      <p className="settings-note">
        {t(
          'Translated editions are study drafts awaiting language and pastoral review. Localized Scripture is a study translation from the public-domain English WEB; the original English text remains available for comparison.'
        )}
      </p>
    </div>
  );
}

function ReferenceIndex({
  mode,
  openLesson
}: {
  mode: 'words' | 'sources';
  openLesson: (id: string) => void;
}) {
  const { t, localize } = useLanguage();
  const localized = useMemo(() => localize(REFERENCES_DATA), [localize]);

  if (mode === 'words') {
    return (
      <>
        <h2 className="reference-section-title">{t('Words in their setting')}</h2>
        <p className="muted">
          {t(
            'A Hebrew, Greek, and English study index. These notes identify textual or conceptual vocabulary without making doctrine depend on isolated word roots.'
          )}
        </p>
        <div className="word-index">
          {localized.words.map((w: any) => (
            <article key={w.lessonId}>
              <div>
                <span className="word-term">{w.term}</span>
                <em>{w.transliteration}</em>
              </div>
              <p>{w.meaning}</p>
              <small>{w.caution}</small>
              <div>
                <a href={w.sourceUrl} target="_blank" rel="noreferrer">
                  {t('Textual source ')}
                  <ExternalLink size={13} />
                </a>
                <button className="text-button" onClick={() => openLesson(w.lessonId)}>
                  {t('Read the chapter ')}
                  <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="reference-section-title">{t('Bibliography & Scripture index')}</h2>
      <p className="muted">
        {t(
          'Sources from all preview lessons, with specific locators. Their inclusion supports review; it does not imply endorsement by their authors or a church.'
        )}
      </p>
      <ol className="bibliography-index">
        {localized.bibliography.map((b: any, idx: number) => (
          <li key={`${b.url}-${b.locator}-${idx}`}>
            <span className="source-category">{b.category}</span>
            <div>
              <a
                href={b.url}
                data-scripture-reference={REFERENCES_DATA?.bibliography[idx]?.locator ?? b.locator}
                target="_blank"
                rel="noreferrer"
              >
                {b.title} <ExternalLink size={13} />
              </a>
              <p>{b.locator}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

export function BookApp({
  catalog,
  parts,
  initialLesson,
  showFoundationPreview = false
}: {
  catalog: any[];
  parts: any[];
  initialLesson?: string | null;
  showFoundationPreview?: boolean;
}) {
  const { t, locale, localize } = useLanguage();
  const locCatalog = useMemo(() => localize(catalog), [localize, catalog]);
  const locParts = useMemo(() => localize(parts), [localize, parts]);
  const locGlossary = useMemo(() => localize(ATLAS_GLOSSARY), [localize]);
  const locNames = useMemo(() => localize(DIVINE_NAMES), [localize]);

  const [langModalOpen, setLangModalOpen] = useState(false);
  const [tab, setTab] = useState<'library' | 'contents' | 'reference' | 'reading'>('library');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(initialLesson ?? null);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [leaving, setLeaving] = useState<'forward' | 'backward' | null>(null);
  const [busy, setBusy] = useState(false);

  const busyRef = useRef(false);
  const navTokenRef = useRef(0);
  const timerRef = useRef<any>(null);

  const cancelTransition = useCallback(() => {
    navTokenRef.current++;
    busyRef.current = false;
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const resetTransition = useCallback(() => {
    cancelTransition();
    setBusy(false);
    setLeaving(null);
  }, [cancelTransition]);

  useEffect(() => {
    setActiveLessonId(initialLesson ?? null);
  }, [initialLesson]);

  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [prefs, setPrefs] = useLocalStorage('preferences', DEFAULT_PREFS);

  const prevThemeRef = useRef(prefs.theme);
  useLayoutEffect(() => {
    const appEl = document.querySelector('.app');
    document.documentElement.dataset.theme = prefs.theme;
    if (prevThemeRef.current === prefs.theme) return;
    prevThemeRef.current = prefs.theme;
    appEl?.classList.add('theme-changing');
    const tId = window.setTimeout(() => appEl?.classList.remove('theme-changing'), 320);
    return () => {
      window.clearTimeout(tId);
      appEl?.classList.remove('theme-changing');
    };
  }, [prefs.theme]);

  const [bookmarks, setBookmarks] = useLocalStorage<
    { id: string; page: number; title: string }[]
  >('bookmarks', []);
  const [progress] = useLocalStorage('progress', DEFAULT_PROGRESS);
  const [toastMsg, setToastMsg] = useState('');
  const [online, setOnline] = useState(true);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [selectedName, setSelectedName] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const mainRef = useRef<HTMLElement>(null);

  const announce = useCallback((msg: string) => setToastMsg(msg), []);

  async function openLesson(id: string, page?: number) {
    if (!locCatalog.some(c => c.id === id)) {
      announce('This lesson is still an outline.');
      return;
    }
    if (busyRef.current) return;
    if (activeLessonId === id) {
      if (page !== undefined) {
        document
          .querySelector(`[data-reading-section="${page}"]`)
          ?.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
      return;
    }
    function commit() {
      if (page !== undefined) {
        setStorage('progress', {
          ...getStorage('progress', DEFAULT_PROGRESS),
          id,
          page
        });
      }
      setActiveLessonId(id);
      setMobileNavOpen(false);
      setSearchOpen(false);
      setLeaving(null);
      setBusy(false);
      busyRef.current = false;
      navigateTo(`/read/${id}`);
    }
    if (!activeLessonId) {
      setDirection('forward');
      commit();
      return;
    }
    busyRef.current = true;
    setBusy(true);
    const token = ++navTokenRef.current;
    try {
      await fetchLesson(id);
      if (token !== navTokenRef.current) return;
      const dir =
        locCatalog.findIndex(c => c.id === id) >
        locCatalog.findIndex(c => c.id === activeLessonId)
          ? 'forward'
          : 'backward';
      setDirection(dir);
      setLeaving(dir);
      const delay = 150 * Number(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      timerRef.current = setTimeout(() => {
        if (token === navTokenRef.current) commit();
      }, delay);
    } catch {
      if (token !== navTokenRef.current) return;
      busyRef.current = false;
      setBusy(false);
      setLeaving(null);
      announce('That chapter is unavailable right now. Your current chapter is still open.');
    }
  }

  function switchTab(nextTab: 'library' | 'contents' | 'reference' | 'reading') {
    resetTransition();
    setTab(nextTab);
    setActiveLessonId(null);
    setMobileNavOpen(false);
    navigateTo('/');
    setTimeout(() => mainRef.current?.focus(), 0);
  }

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    const updateOnline = () => setOnline(navigator.onLine);
    updateOnline();
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);
    const onBeforeInstall = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    const onPopState = () => {
      resetTransition();
      const m = window.location.pathname.match(/^\/read\/([^/]+)/);
      setActiveLessonId(m ? m[1] : null);
    };
    window.addEventListener('popstate', onPopState);
    return () => {
      cancelTransition();
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOnline);
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('popstate', onPopState);
    };
  }, [resetTransition, cancelTransition]);

  useEffect(() => {
    if (!toastMsg) return;
    const tId = setTimeout(() => setToastMsg(''), 5000);
    return () => clearTimeout(tId);
  }, [toastMsg]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (
        document.querySelector('dialog[open]') ||
        e.key !== '/' ||
        /INPUT|TEXTAREA|SELECT/.test(target.tagName)
      ) {
        return;
      }
      e.preventDefault();
      setSearchOpen(true);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const matchingChapters = locCatalog.filter(c =>
    `${c.title} ${c.subtitle} ${c.summary} ${c.scriptureReference} ${
      locParts.find(p => p.number === c.part)?.title
    }`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const matchingTerms = locGlossary.filter(g =>
    `${g.term} ${g.reference} ${g.definition}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const matchingNames = locNames.filter(n =>
    `${n.name} ${n.reference} ${n.meaning}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const resumedLesson = locCatalog.find(c => c.id === progress.id);
  const heroLesson = resumedLesson ?? locCatalog.find(c => c.part === 1) ?? locCatalog[0];
  const heroPart = locParts.find(p => p.number === heroLesson?.part);

  return (
    <div className={`app theme-${prefs.theme}`} lang={locale}>
      <a href="#main-content" className="skip-link">
        {t('Skip to content')}
      </a>
      {!activeLessonId && (
        <>
          <aside className={`sidebar ${mobileNavOpen ? 'mobile-open' : ''}`}>
            <Link
              className="brand church-brand"
              href="/"
              onClick={e => {
                e.preventDefault();
                switchTab('library');
              }}
            >
              <Img
                className="church-emblem"
                src="/images/church-emblem.webp"
                alt={t('Blessed Hope Global Mission Church emblem')}
                width={64}
                height={64}
                priority
              />
              <span>
                Knowing God
                <small>Blessed Hope Global Mission Church, Inc.</small>
              </span>
            </Link>
            <button
              className="icon-button mobile-close"
              onClick={() => setMobileNavOpen(false)}
              aria-label={t('Close navigation')}
            >
              <X />
            </button>
            <div className="sidebar-label">{t('YOUR STUDY')}</div>
            <nav aria-label={t('Main navigation')}>
              {(
                [
                  { id: 'library', label: 'The library', icon: Library },
                  { id: 'contents', label: 'Table of contents', icon: List },
                  { id: 'reference', label: 'Reference desk', icon: Compass },
                  { id: 'reading', label: 'My reading', icon: Bookmark }
                ] as const
              ).map(item => (
                <button
                  key={item.id}
                  className={`nav-item ${tab === item.id ? 'active' : ''}`}
                  aria-current={tab === item.id ? 'page' : undefined}
                  onClick={() => switchTab(item.id)}
                >
                  <IconWrap icon={item.icon} />
                  {t(item.label)}
                  {item.id === 'reading' && bookmarks.length > 0 && (
                    <span className="count">{bookmarks.length}</span>
                  )}
                </button>
              ))}
            </nav>
            <div className="sidebar-divider" />
            <div className="sidebar-label">{t('THIS EDITION')}</div>
            <div className="edition-info">
              <span className="tiny-dot" />
              {t(' Educational preview')}
              <p>
                {t('Rooted in Scripture.')}
                <br />
                {t('Open to thoughtful study.')}
              </p>
            </div>
            <div className="sidebar-bottom">
              <Quote size={23} strokeWidth={1.1} />
              <p>“{t('Be still, and know that I am God.')}”</p>
              <span>
                {locale === 'en'
                  ? t('PSALM 46:10 · WEB')
                  : t('Psalm 46:10 · Study translation from English WEB')}
              </span>
              <button onClick={() => setSettingsOpen(true)}>
                <SlidersHorizontal size={17} />
                {t(' Reading preferences')}
              </button>
            </div>
          </aside>
          {mobileNavOpen && (
            <button
              className="scrim mobile-scrim"
              aria-label={t('Close navigation')}
              onClick={() => setMobileNavOpen(false)}
            />
          )}
        </>
      )}

      <div className={activeLessonId ? 'reader-shell' : 'main-shell'}>
        <header className="topbar">
          <div className="topbar-left">
            {activeLessonId ? (
              <button
                className="text-button"
                onClick={() => {
                  resetTransition();
                  setActiveLessonId(null);
                  navigateTo('/');
                  setTab('library');
                  window.scrollTo(0, 0);
                }}
              >
                <ArrowLeft size={17} />
                {t(' Back to library')}
              </button>
            ) : (
              <>
                <button
                  className="icon-button hamburger"
                  aria-label={t('Open navigation')}
                  onClick={() => setMobileNavOpen(true)}
                >
                  <Menu />
                </button>
                <span className="breadcrumb">
                  {t('Your library ')}
                  <span>/</span>{' '}
                  <strong>
                    {tab === 'library'
                      ? t('Overview')
                      : tab === 'contents'
                      ? t('Contents')
                      : tab === 'reference'
                      ? t('Reference desk')
                      : t('My reading')}
                  </strong>
                </span>
              </>
            )}
          </div>
          <div className="topbar-actions">
            <button
              className="language-trigger"
              aria-label={t('Language')}
              title={t('Language / Wika / Pagsasao')}
              onClick={() => setLangModalOpen(true)}
            >
              <Globe size={18} />
              <span>{t('Language')}</span>
              <small>{LANGUAGES.find(l => l.code === locale)?.short}</small>
            </button>
            <button
              aria-label={t('Search the book')}
              className="search-trigger"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={17} />
              <span>{t('Search the book')}</span>
              <kbd>/</kbd>
            </button>
            <span className="topbar-rule" />
            <button
              className="icon-button"
              aria-label={prefs.theme === 'light' ? t('Use dark theme') : t('Use light theme')}
              onClick={() =>
                setPrefs({ ...prefs, theme: prefs.theme === 'light' ? 'dark' : 'light' })
              }
            >
              {prefs.theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              className="profile church-profile"
              onClick={() => switchTab('reading')}
              aria-label={t('Open my reading')}
            >
              <Img
                src="/images/church-emblem.webp"
                alt={t('Blessed Hope Global Mission Church emblem')}
                width={34}
                height={34}
              />
            </button>
          </div>
        </header>

        {locale !== 'en' && (
          <div className="translation-notice">
            <Globe size={16} />
            <span>
              <strong>
                {t('Translated study edition · Language and pastoral review pending')}
              </strong>
              {t(
                'Study translation from the public-domain English WEB. Original Scripture remains available for comparison.'
              )}
            </span>
          </div>
        )}

        {!online && (
          <div className="offline-banner">
            <WifiOff size={16} />
            {t(' You’re offline. Previously opened or downloaded chapters remain available.')}
          </div>
        )}

        {activeLessonId ? (
          <AtlasReaderView
            key={activeLessonId}
            id={activeLessonId}
            catalog={locCatalog}
            parts={locParts}
            prefs={prefs}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
            openLesson={openLesson}
            onSettings={() => setSettingsOpen(true)}
            announce={announce}
            direction={direction}
            leaving={leaving}
            busy={busy}
          />
        ) : (
          <main id="main-content" tabIndex={-1} ref={mainRef} className="library-main">
            {tab === 'library' && (
              <>
                {showFoundationPreview && (
                  <Link href="/foundations" className="foundation-entry" lang="en">
                    <BookOpen size={24} />
                    <span>
                      <strong>The Foundations Collection</strong>
                      <small>
                        Explore the illustrated introduction and eleven-doctrine study path
                      </small>
                    </span>
                    <ArrowRight size={21} />
                  </Link>
                )}
                <div className="page-intro">
                  <div>
                    <p className="eyebrow">{t('SCRIPTURE. UNDERSTANDING. TRANSFORMATION.')}</p>
                    <h1>
                      {t('A deeper faith begins')}
                      <br className="mobile-break" />
                      {t(' with knowing.')}
                    </h1>
                    <p className="intro-copy">
                      {t('An invitation to explore the richness of Christian theology,')}
                      <br className="desktop-break" />
                      {t(' one thoughtful chapter at a time.')}
                    </p>
                  </div>
                  <div className="edition-stamp">
                    <span>{t('VOLUME')}</span>
                    <strong>01</strong>
                    <span>{t('FOUNDATIONS')}</span>
                  </div>
                </div>

                {heroLesson && (
                  <section
                    className="featured personalized-hero"
                    aria-labelledby="feature-title"
                  >
                    <div className="feature-copy">
                      <span className="eyebrow">
                        <span className="gold-line" />
                        {resumedLesson
                          ? t('PICK UP WHERE YOU LEFT OFF')
                          : t('START AT THE BEGINNING')}
                      </span>
                      <p className="feature-part">
                        {t('PART ')}
                        {ROMAN[heroLesson.part - 1]} · {heroPart?.title}
                      </p>
                      <h2 id="feature-title">{heroLesson.title}</h2>
                      <p>{heroLesson.summary}</p>
                      <button
                        className="primary-button"
                        onClick={() =>
                          openLesson(heroLesson.id, resumedLesson ? progress.page : 0)
                        }
                      >
                        {resumedLesson ? t('Continue reading') : t('Start Part 1')}
                        <ArrowRight size={17} />
                      </button>
                      <span className="feature-meta">
                        <Clock size={14} />
                        {heroLesson.readingMinutes}
                        {t(' min read')}
                        <span>·</span>
                        {heroLesson.scriptureReference}
                      </span>
                    </div>
                    <div className="feature-art">
                      <Img
                        src="/images/moriah.webp"
                        alt={t(
                          'Original engraved landscape of imagined hills, a winding path, olive tree, and distant empty stone altar.'
                        )}
                        fill
                        priority
                        sizes="(max-width: 650px) 100vw, 60vw"
                      />
                      <span className="art-label">
                        {heroLesson.id === 'yhwh-yireh' ? t('MORIAH') : t('IMAGINED LANDSCAPE')}
                        {t(' · AN ARTIST’S INTERPRETATION')}
                      </span>
                      <div className="art-verse">
                        <span>
                          {heroLesson.id === 'yhwh-yireh'
                            ? t('“The LORD Will Provide”')
                            : t('Read. Reflect. Respond.')}
                        </span>
                        <small>
                          {heroLesson.id === 'yhwh-yireh'
                            ? locale === 'en'
                              ? 'PLACE NAME · GENESIS 22:14 · WEB'
                              : t('GENESIS 22:14 · STUDY TRANSLATION')
                            : t('A VISUAL JOURNEY THROUGH SCRIPTURE, DOCTRINE, AND FAITH')}
                        </small>
                      </div>
                    </div>
                  </section>
                )}

                <div className="trust-strip">
                  <span>
                    <BookOpen size={16} /> {locCatalog.length}
                    {t(' complete preview lessons')}
                  </span>
                  <span>
                    <Layers3 size={16} />
                    {t(' 15 foundations of faith')}
                  </span>
                  <span>
                    <ScrollText size={16} />
                    {t(' Scripture & sources alongside')}
                  </span>
                </div>

                {showFoundationPreview && <IllustratedEntry />}

                <div className="section-heading">
                  <div>
                    <p className="eyebrow">{t('A CONNECTED JOURNEY')}</p>
                    <h2>{t('Explore the foundations')}</h2>
                  </div>
                  <button className="text-button" onClick={() => switchTab('contents')}>
                    {t('Full table of contents ')}
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="parts-grid">
                  {locParts.map((part: any) => {
                    const firstLesson = locCatalog.find(c => c.part === part.number);
                    const PartIcon = PART_ICONS[part.number - 1] ?? BookOpen;
                    const previewCount = locCatalog.filter(c => c.part === part.number).length;
                    return (
                      <button
                        key={part.number}
                        className="part-card"
                        onClick={() => firstLesson && openLesson(firstLesson.id)}
                      >
                        <div className="part-card-top">
                          <span className={`doctrine-icon doctrine-${(part.number - 1) % 5}`}>
                            <IconWrap icon={PartIcon} size={23} />
                          </span>
                          <span className="part-label">
                            {t('PART ')}
                            {ROMAN[part.number - 1]}
                          </span>
                          <ArrowRight size={17} className="part-arrow" />
                        </div>
                        <h3>{part.shortTitle || part.title}</h3>
                        <p>{part.description}</p>
                        <span className="part-card-bottom">
                          {part.chapters.length}
                          {t(' chapters ')}
                          <span>·</span> {previewCount}
                          {t(' preview ')}
                          {t(previewCount === 1 ? 'lesson' : 'lessons')}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <section className="book-shelf">
                  <div className="hardcover" aria-label={t('Knowing God book cover')}>
                    <div className="cover-ornament">✦</div>
                    <span>
                      {t('KNOWING')}
                      <br />
                      {t('GOD')}
                    </span>
                    <div className="cover-rule" />
                    <small>
                      {t('FOUNDATIONS OF')}
                      <br />
                      {t('CHRISTIAN THEOLOGY')}
                    </small>
                    <BookOpen size={32} strokeWidth={1} />
                    <div className="cover-ornament bottom">✦</div>
                  </div>
                  <div>
                    <span className="eyebrow">{t('YOUR COMPANION FOR THE JOURNEY')}</span>
                    <h2>
                      {t('Learn with care.')}
                      <br />
                      {t('Grow in community.')}
                    </h2>
                    <p>
                      {t(
                        'A visual journey through Scripture, doctrine, and faith. Read on your own, bring your questions to a small group, and return to the sources.'
                      )}
                    </p>
                    <button
                      className="secondary-button"
                      onClick={() => openLesson('interpreting-scripture')}
                    >
                      {t('Begin with the introduction ')}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </section>
              </>
            )}

            {tab === 'contents' && (
              <>
                <div className="page-intro">
                  <div>
                    <p className="eyebrow">{t('THE WHOLE JOURNEY')}</p>
                    <h1>{t('Table of contents')}</h1>
                    <p className="intro-copy">
                      {t(
                        'Fifteen connected foundations. Full lessons are ready for educational preview; outlines show the work still ahead.'
                      )}
                    </p>
                  </div>
                </div>
                <div className="contents-list">
                  {locParts.map((part: any) => (
                    <section key={part.number} className="content-part">
                      <div className="content-part-heading">
                        <span className="part-numeral">{ROMAN[part.number - 1]}</span>
                        <div>
                          <h2>{part.title}</h2>
                          <p>{part.description}</p>
                          {part.prerequisites.length > 0 && (
                            <small>
                              {t('Builds on ')}
                              {part.prerequisites
                                .map((pr: number) => `${t('Part')} ${ROMAN[pr - 1]}`)
                                .join(', ')}
                            </small>
                          )}
                        </div>
                      </div>
                      {part.chapters.map((ch: any) => {
                        const isReady = locCatalog.some(c => c.id === ch.id);
                        return (
                          <div key={ch.id} className="chapter-row">
                            <span className="chapter-bullet" />
                            {isReady ? (
                              <button onClick={() => openLesson(ch.id)}>
                                {ch.title}
                                <ChevronRight size={16} />
                              </button>
                            ) : (
                              <span>{ch.title}</span>
                            )}
                            <small>
                              {isReady ? t('Preview lesson') : t('Outline · research ahead')}
                            </small>
                          </div>
                        );
                      })}
                    </section>
                  ))}
                </div>
              </>
            )}

            {tab === 'reference' && (
              <ReferenceDesk catalog={locCatalog} parts={locParts} openLesson={openLesson} />
            )}

            {tab === 'reading' && (
              <>
                <div className="page-intro">
                  <div>
                    <p className="eyebrow">{t('A LITTLE AT A TIME')}</p>
                    <h1>{t('My reading')}</h1>
                    <p className="intro-copy">
                      {t(
                        'Your bookmarks and reading position stay in this browser. No account is needed.'
                      )}
                    </p>
                  </div>
                </div>
                <div className="reading-summary">
                  <div>
                    <strong>{progress.completed.length}</strong>
                    <span>{t('chapters completed')}</span>
                  </div>
                  <div>
                    <strong>{bookmarks.length}</strong>
                    <span>{t('saved bookmarks')}</span>
                  </div>
                  <div>
                    <strong>{locCatalog.length}</strong>
                    <span>{t('lessons to explore')}</span>
                  </div>
                </div>
                {progress.id && (
                  <button
                    className="resume-card"
                    onClick={() => openLesson(progress.id, progress.page)}
                  >
                    <BookOpen />
                    <span>
                      <small>{t('CONTINUE READING')}</small>
                      <strong>{locCatalog.find(c => c.id === progress.id)?.title}</strong>
                    </span>
                    <ArrowRight />
                  </button>
                )}
                <div className="section-heading">
                  <h2>{t('Your bookmarks')}</h2>
                </div>
                {bookmarks.length ? (
                  <div className="bookmark-list">
                    {bookmarks.map(bm => (
                      <div key={`${bm.id}-${bm.page}`}>
                        <button onClick={() => openLesson(bm.id, bm.page)}>
                          <Bookmark size={18} />
                          <span>
                            {locCatalog.find(c => c.id === bm.id)?.title ?? t(bm.title)}
                            <small>
                              {t('Section ')}
                              {bm.page + 1}
                            </small>
                          </span>
                          <ArrowRight size={17} />
                        </button>
                        <button
                          className="icon-button"
                          aria-label={t('Remove bookmark for {value0}', {
                            value0: locCatalog.find(c => c.id === bm.id)?.title ?? t(bm.title)
                          })}
                          onClick={() =>
                            setBookmarks(
                              bookmarks.filter(b => b.id !== bm.id || b.page !== bm.page)
                            )
                          }
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <Bookmark size={32} strokeWidth={1} />
                    <h3>{t('A place to return to.')}</h3>
                    <p>{t('Use the bookmark button in a chapter to save a page here.')}</p>
                    <button className="secondary-button" onClick={() => switchTab('library')}>
                      {t('Explore the library ')}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}

            <footer className="site-footer">
              <div className="church-footer-brand">
                <Img
                  src="/images/church-emblem.webp"
                  alt={t('Blessed Hope Global Mission Church emblem')}
                  width={42}
                  height={42}
                />
                <span>
                  KNOWING GOD
                  <small>Blessed Hope Global Mission Church, Inc.</small>
                </span>
              </div>
              <p>
                {t('Educational demonstration · References checked, awaiting pastoral review.')}
                <br />
                {t('Broadly Nicene and interdenominational. ')}
                {locale === 'en'
                  ? t('Scripture: World English Bible, updated 66-book edition.')
                  : t(
                      'Study translation from the public-domain English WEB. Original Scripture remains available for comparison.'
                    )}
              </p>
              <button className="text-button" onClick={() => switchTab('reference')}>
                {t('Sources & editorial notes ')}
                <ArrowRight size={15} />
              </button>
            </footer>
          </main>
        )}
      </div>

      {toastMsg && (
        <div className="toast" role="status">
          <CheckCircle2 size={17} />
          {t(toastMsg)}
        </div>
      )}
      <span className="sr-only" aria-live="polite">
        {online ? t('Online') : t('Offline')}
      </span>

      {langModalOpen && (
        <DialogModal
          title={t('Language / Wika / Pagsasao')}
          onClose={() => setLangModalOpen(false)}
        >
          <LanguagePicker />
        </DialogModal>
      )}

      {searchOpen && (
        <DialogModal title={t('Search the book')} onClose={() => setSearchOpen(false)}>
          <div className="search-box">
            <Search size={20} />
            <input
              autoFocus
              placeholder={t('Try grace, Genesis 22, or Trinity…')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label={t('Search chapters, Scripture, and terms')}
            />
          </div>
          <div className="search-results">
            <p className="eyebrow">
              {t('CHAPTERS · ')}
              {matchingChapters.length}
            </p>
            {matchingChapters.map(ch => (
              <button
                key={ch.id}
                className="search-result"
                onClick={() => openLesson(ch.id)}
              >
                <BookOpen size={18} />
                <span>
                  <strong>{ch.title}</strong>
                  <small>{ch.subtitle}</small>
                </span>
                <ChevronRight size={17} />
              </button>
            ))}
            {searchQuery && (
              <>
                <p className="eyebrow">{t('TERMS & BIBLICAL REFERENCES')}</p>
                {matchingTerms.map(g => (
                  <button
                    key={g.term}
                    className="search-result"
                    onClick={() => openLesson(g.lesson)}
                  >
                    <Compass size={18} />
                    <span>
                      <strong>{g.term}</strong>
                      <small>
                        {g.reference} · {g.definition}
                      </small>
                    </span>
                  </button>
                ))}
                {matchingNames.map(n => (
                  <button
                    key={n.id}
                    className="search-result"
                    onClick={() => {
                      setSearchOpen(false);
                      setSelectedName(n);
                    }}
                  >
                    <ScrollText size={18} />
                    <span>
                      <strong>{n.name}</strong>
                      <small>
                        {n.reference} · {n.meaning}
                      </small>
                    </span>
                  </button>
                ))}
              </>
            )}
            {!matchingChapters.length && !matchingTerms.length && !matchingNames.length && (
              <p className="no-results">
                {t('No results yet. Try a broader term, such as “God” or “grace”.')}
              </p>
            )}
          </div>
        </DialogModal>
      )}

      {selectedName && (
        <DialogModal title={selectedName.name} onClose={() => setSelectedName(null)}>
          <span className="name-hebrew" lang="he" dir="rtl">
            {selectedName.hebrew}
          </span>
          <p className="chapter-abstract">{selectedName.meaning}</p>
          <span className="eyebrow">{selectedName.reference}</span>
          <p>{selectedName.context}</p>
          <div className="editorial-statement">{selectedName.note}</div>
          <a
            className="source-link"
            href={selectedName.sourceUrl}
            data-scripture-reference={
              DIVINE_NAMES.find(n => n.sourceUrl === selectedName.sourceUrl)?.reference ??
              selectedName.reference
            }
            target="_blank"
            rel="noreferrer"
          >
            {t('Textual source ')}
            <ExternalLink size={14} />
          </a>
        </DialogModal>
      )}

      {settingsOpen && (
        <DialogModal title={t('Make room for reading')} onClose={() => setSettingsOpen(false)}>
          <p className="muted">
            {t('Choose what feels comfortable. Your preferences stay on this device.')}
          </p>
          <div className="settings-fields">
            <label>
              {t('Text size ')}
              <output>
                {prefs.fontSize}
                {t('px')}
              </output>
              <input
                aria-label={t('Text size')}
                type="range"
                min="16"
                max="26"
                step="1"
                value={prefs.fontSize}
                onChange={e => setPrefs({ ...prefs, fontSize: Number(e.target.value) })}
              />
            </label>
            <label>
              {t('Line spacing ')}
              <output>{prefs.spacing.toFixed(2)}</output>
              <input
                aria-label={t('Line spacing')}
                type="range"
                min="1.5"
                max="2.2"
                step="0.05"
                value={prefs.spacing}
                onChange={e => setPrefs({ ...prefs, spacing: Number(e.target.value) })}
              />
            </label>
            <label>
              {t('Reading typeface')}
              <select
                value={prefs.font}
                onChange={e => setPrefs({ ...prefs, font: e.target.value })}
              >
                <option value="serif">{t('Classic serif')}</option>
                <option value="sans">{t('Clear sans serif')}</option>
              </select>
            </label>
            <label>
              {t('Appearance')}
              <select
                value={prefs.theme}
                onChange={e => setPrefs({ ...prefs, theme: e.target.value })}
              >
                <option value="light">{t('Warm paper')}</option>
                <option value="dark">{t('Evening navy')}</option>
              </select>
            </label>
          </div>
          {installPrompt && (
            <button
              className="secondary-button"
              onClick={async () => {
                await installPrompt.prompt();
                setInstallPrompt(null);
              }}
            >
              {t('Install the reading app ')}
              <Download size={17} />
            </button>
          )}
          <p className="settings-note">
            {t(
              'Each chapter is one continuous reading page. Chapter transitions follow your device’s reduced-motion preference.'
            )}
          </p>
        </DialogModal>
      )}
    </div>
  );
}

function DialogModal({
  title,
  children,
  onClose
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const dlg = ref.current;
    dlg?.showModal();
    return () => {
      dlg?.close();
      prev?.focus?.();
    };
  }, []);

  return (
    <dialog
      className="modal"
      ref={ref}
      onCancel={e => {
        e.preventDefault();
        onClose();
      }}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="modal-heading"
    >
      <div className="modal-header">
        <h2 id="modal-heading">{title}</h2>
        <button
          autoFocus
          className="icon-button"
          aria-label={t('Close dialog')}
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      {children}
    </dialog>
  );
}

function AtlasReaderView({
  id,
  catalog,
  parts,
  prefs,
  bookmarks,
  setBookmarks,
  openLesson,
  onSettings,
  announce,
  direction,
  leaving,
  busy
}: {
  id: string;
  catalog: any[];
  parts: any[];
  prefs: any;
  bookmarks: { id: string; page: number; title: string }[];
  setBookmarks: (b: { id: string; page: number; title: string }[]) => void;
  openLesson: (id: string, page?: number) => void;
  onSettings: () => void;
  announce: (msg: string) => void;
  direction: 'forward' | 'backward';
  leaving: 'forward' | 'backward' | null;
  busy: boolean;
}) {
  const { t, locale, localize } = useLanguage();
  const [rawLesson, setRawLesson] = useState<any>(() => getLessonSync(id));
  const lesson = useMemo(() => localize(rawLesson), [rawLesson, localize]);
  const locGlossary = useMemo(() => localize(ATLAS_GLOSSARY), [localize]);
  const [errorMsg, setErrorMsg] = useState('');
  const [progress, setProgress] = useLocalStorage('progress', DEFAULT_PROGRESS);
  const [contentsModalOpen, setContentsModalOpen] = useState(false);
  const [savedOffline, setSavedOffline] = useState(false);
  const [scriptureModalOpen, setScriptureModalOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const touchRef = useRef<{ x: number; y: number; target: EventTarget | null } | null>(null);

  const descriptors = lesson
    ? [
        { type: 'opening' as const },
        ...lesson.sections.map((_: any, index: number) => ({
          type: 'section' as const,
          index
        })),
        { type: 'study' as const },
        { type: 'practice' as const },
        { type: 'sources' as const }
      ]
    : [];

  const [currentPage, setCurrentPage] = useState(0);
  const pageRef = useRef(0);

  useLayoutEffect(() => {
    if (!lesson || !stageRef.current || !descriptors.length) return;
    const region = stageRef.current;
    const secs = Array.from(region.querySelectorAll('[data-reading-section]'));
    const savedProg = getStorage('progress', DEFAULT_PROGRESS);
    const startPage =
      savedProg.id === id ? Math.min(savedProg.page, descriptors.length - 1) : 0;
    let ready = false;
    let rafScroll = 0;
    let rafInit1 = 0;
    let rafInit2 = 0;
    let offset = 180;

    function updateOffset() {
      const topbar = document.querySelector('.reader-shell .topbar');
      const hidden =
        (topbar?.closest('.reader-shell') as HTMLElement | null)?.dataset.readerChrome ===
        'hidden';
      offset =
        (topbar?.getBoundingClientRect().height ?? 65) +
        (headingRef.current?.getBoundingClientRect().height ?? 90) +
        24;
      region.style.setProperty('--reading-offset', `${hidden ? 24 : offset}px`);
    }

    function recordPage(p: number) {
      pageRef.current = p;
      setCurrentPage(p);
      setStorage('progress', {
        id,
        page: p,
        completed: getStorage('progress', DEFAULT_PROGRESS).completed
      });
    }

    function checkScroll() {
      rafScroll = 0;
      if (!ready) return;
      let activeIdx = 0;
      for (let i = 0; i < secs.length; i++) {
        if (secs[i].getBoundingClientRect().top <= offset + 12) activeIdx = i;
        else break;
      }
      if (activeIdx !== pageRef.current) recordPage(activeIdx);
    }

    function onScroll() {
      if (ready && !rafScroll) rafScroll = requestAnimationFrame(checkScroll);
    }

    updateOffset();
    const ro = new ResizeObserver(updateOffset);
    if (headingRef.current) ro.observe(headingRef.current);
    const topbar = document.querySelector('.reader-shell .topbar');
    if (topbar) ro.observe(topbar);

    rafInit1 = requestAnimationFrame(() => {
      titleRef.current?.focus({ preventScroll: true });
      updateOffset();
      if (startPage > 0) {
        secs[startPage]?.scrollIntoView({ block: 'start', behavior: 'instant' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      recordPage(startPage);
      rafInit2 = requestAnimationFrame(() => {
        ready = true;
      });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      ready = false;
      cancelAnimationFrame(rafScroll);
      cancelAnimationFrame(rafInit1);
      cancelAnimationFrame(rafInit2);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [id, !!lesson, descriptors.length, locale]);

  useEffect(() => {
    let cancelled = false;
    fetchLesson(id)
      .then(data => {
        if (!cancelled) setRawLesson(data);
      })
      .catch(() => {
        if (!cancelled) {
          setErrorMsg(
            'This chapter isn’t available right now. Connect to the internet and try again, or open a previously saved chapter.'
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const catIdx = catalog.findIndex(c => c.id === id);
  const catEntry = catalog[catIdx];
  const isSectionBookmarked = bookmarks.some(b => b.id === id && b.page === currentPage);

  const stepChapter = useCallback(
    (delta: number) => {
      const target = catalog[catIdx + delta];
      if (!busy && target) openLesson(target.id, 0);
    },
    [busy, catalog, catIdx, openLesson]
  );

  async function saveChapterOffline() {
    try {
      if (!('caches' in window)) throw new Error();
      const cache = await caches.open('knowing-god-preview-v2-languages');
      await Promise.all([
        cache.add(`/read/${id}`),
        ...(locale === 'en' ? [] : [cache.add(`/translations/${locale}.json`)])
      ]);
      setSavedOffline(true);
      announce('Chapter saved for offline reading on this device.');
    } catch {
      announce('Unable to save offline. Check your connection and available device storage.');
    }
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (
        e.repeat ||
        document.querySelector('dialog[open]') ||
        window.getSelection()?.toString() ||
        (target instanceof HTMLElement &&
          (target.isContentEditable ||
            target.closest('button,a,input,textarea,select,summary')))
      ) {
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        stepChapter(1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stepChapter(-1);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [stepChapter]);

  return (
    <main id="main-content" className="reader-main" aria-busy={busy || !lesson}>
      <div ref={headingRef} className="reader-heading">
        <div>
          <span className="eyebrow">
            {t('PART ')}
            {ROMAN[(catEntry?.part ?? 1) - 1]} ·{' '}
            {parts.find(p => p.number === catEntry?.part)?.shortTitle}
          </span>
          <h1 ref={titleRef} tabIndex={-1}>
            {catEntry?.title ?? t('Chapter')}
          </h1>
        </div>
        <div className="reader-tools">
          <button
            className="tool-button"
            aria-label={t('Contents')}
            onClick={() => setContentsModalOpen(true)}
          >
            <List size={18} />
            <span>{t('Contents')}</span>
          </button>
          <button
            className={`tool-button ${isSectionBookmarked ? 'is-saved' : ''}`}
            aria-label={isSectionBookmarked ? t('Remove bookmark') : t('Bookmark')}
            aria-pressed={isSectionBookmarked}
            onClick={() => {
              setBookmarks(
                isSectionBookmarked
                  ? bookmarks.filter(b => b.id !== id || b.page !== currentPage)
                  : [
                      ...bookmarks,
                      { id, page: currentPage, title: getLessonSync(id)?.title ?? id }
                    ]
              );
              announce(
                isSectionBookmarked ? 'Bookmark removed.' : 'Reading section bookmarked.'
              );
            }}
          >
            <Bookmark size={18} fill={isSectionBookmarked ? 'currentColor' : 'none'} />
            <span>{isSectionBookmarked ? t('Saved') : t('Bookmark')}</span>
          </button>
          <button
            className="icon-button"
            onClick={onSettings}
            aria-label={t('Reading preferences')}
          >
            <SlidersHorizontal size={19} />
          </button>
          <button
            className="icon-button"
            onClick={saveChapterOffline}
            aria-label={t('Save chapter offline')}
          >
            {savedOffline ? <Check size={19} /> : <Download size={19} />}
          </button>
          <button
            className="icon-button print-control"
            onClick={() => window.print()}
            aria-label={t('Print chapter')}
          >
            <Printer size={19} />
          </button>
        </div>
      </div>

      <div className="review-ribbon">
        <Info size={15} />
        <span>
          {t(
            'Educational preview · Scripture and source references checked · Awaiting pastoral review'
          )}
        </span>
        <span className="ribbon-translation">
          {locale === 'en'
            ? t('WEB · UPDATED 66-BOOK EDITION')
            : t('STUDY TRANSLATION FROM ENGLISH WEB · UNREVIEWED')}
        </span>
      </div>

      {errorMsg ? (
        <div className="empty-state">
          <WifiOff size={32} />
          <h2>{t('A moment to reconnect.')}</h2>
          <p>{t(errorMsg)}</p>
          <button className="secondary-button" onClick={() => window.location.reload()}>
            {t('Try again')}
          </button>
        </div>
      ) : lesson ? (
        <>
          <div
            ref={stageRef}
            tabIndex={-1}
            className={`book-stage single-chapter chapter-direction-${direction}${
              leaving ? ` chapter-leaving-${leaving}` : ''
            }`}
            style={
              {
                '--reading-size': `${prefs.fontSize}px`,
                '--reading-leading': prefs.spacing,
                '--reading-family':
                  prefs.font === 'serif' ? 'Georgia, serif' : 'Arial, sans-serif'
              } as React.CSSProperties
            }
            onTouchStart={e => {
              touchRef.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                target: e.target
              };
            }}
            onTouchCancel={() => {
              touchRef.current = null;
            }}
            onTouchEnd={e => {
              const start = touchRef.current;
              touchRef.current = null;
              const end = e.changedTouches[0];
              if (
                !start ||
                !end ||
                window.getSelection()?.toString() ||
                (start.target instanceof HTMLElement &&
                  start.target.closest(
                    'button,a,input,select,label,textarea,summary,[contenteditable="true"]'
                  ))
              ) {
                return;
              }
              const dx = end.clientX - start.x;
              const dy = end.clientY - start.y;
              if (Math.abs(dx) > 85 && Math.abs(dx) > 2 * Math.abs(dy)) {
                stepChapter(dx < 0 ? 1 : -1);
              }
            }}
            aria-label={t('{value0}, complete chapter', { value0: lesson.title })}
          >
            <article className="chapter-sheet book-page" aria-label={t('Complete chapter')}>
              <div className="page-running-head">
                <span>KNOWING GOD</span>
                <span>{lesson.title}</span>
              </div>
              {descriptors.map((desc, idx) => (
                <section
                  key={`${desc.type}-${desc.index ?? 0}`}
                  id={`reading-section-${idx}`}
                  data-reading-section={idx}
                  className="chapter-section"
                  aria-label={
                    desc.type === 'opening'
                      ? t('Chapter introduction')
                      : desc.type === 'section'
                      ? lesson.sections[desc.index ?? 0].title
                      : desc.type === 'study'
                      ? t('Words, context and conviction')
                      : desc.type === 'practice'
                      ? t('Reflection, discussion and knowledge check')
                      : t('Evidence and editorial notes')
                  }
                >
                  <AtlasLessonSection
                    lesson={lesson}
                    descriptor={desc}
                    onScripture={() => setScriptureModalOpen(true)}
                    onTerm={setSelectedTerm}
                  />
                </section>
              ))}
              <footer className="chapter-colophon">
                <BookOpen size={17} />
                <span>
                  {t('END OF CHAPTER · PART ')}
                  {ROMAN[lesson.part - 1]}
                </span>
              </footer>
            </article>
          </div>

          <nav className="chapter-navigation" aria-label={t('Chapter navigation')}>
            <button
              className="secondary-button"
              disabled={catIdx <= 0 || busy}
              onClick={() => stepChapter(-1)}
            >
              <ChevronLeft size={18} />
              <span>{t('Previous chapter')}</span>
            </button>
            <div>
              <span>
                {t('Lesson ')}
                {catIdx + 1}
                {t(' of ')}
                {catalog.length}
              </span>
              <small>
                {busy
                  ? t('Opening your next chapter…')
                  : t('One complete chapter · Scroll to read')}
              </small>
            </div>
            <button
              className="primary-button"
              disabled={catIdx >= catalog.length - 1 || busy}
              onClick={() => stepChapter(1)}
            >
              <span>{t('Next chapter')}</span>
              <ChevronRight size={18} />
            </button>
          </nav>

          <div className="chapter-completion">
            <button
              className="primary-button"
              onClick={() => {
                setProgress({
                  id,
                  page: currentPage,
                  completed: [...new Set([...progress.completed, id])]
                });
                announce('Chapter marked complete. Take your questions into conversation.');
              }}
            >
              <CheckCircle2 size={18} />
              {progress.completed.includes(id)
                ? t('Chapter completed')
                : t('Mark chapter complete')}
            </button>
          </div>
        </>
      ) : (
        <div className="reader-loading" role="status">
          <BookOpen className="loading-book" />
          <p>{t('Opening your chapter…')}</p>
        </div>
      )}

      {contentsModalOpen && (
        <DialogModal title={t('Choose a chapter')} onClose={() => setContentsModalOpen(false)}>
          <div className="search-results">
            {catalog.map(c => (
              <button
                key={c.id}
                className={`search-result ${c.id === id ? 'current-chapter' : ''}`}
                onClick={() => {
                  setContentsModalOpen(false);
                  openLesson(c.id);
                }}
              >
                <span className="chapter-index">{String(c.part).padStart(2, '0')}</span>
                <span>
                  <strong>{c.title}</strong>
                  <small>
                    {c.readingMinutes}
                    {t(' min read · Educational preview')}
                  </small>
                </span>
                {c.id === id ? <Check size={17} /> : <ChevronRight size={17} />}
              </button>
            ))}
          </div>
        </DialogModal>
      )}

      {scriptureModalOpen && lesson && (
        <DialogModal
          title={lesson.scripture.reference}
          onClose={() => setScriptureModalOpen(false)}
        >
          <p className="eyebrow">
            {locale === 'en'
              ? t('WORLD ENGLISH BIBLE · UPDATED 66-BOOK EDITION')
              : t('STUDY TRANSLATION FROM ENGLISH WEB · UNREVIEWED')}
          </p>
          <blockquote className="scripture-modal">{lesson.scripture.text}</blockquote>
          {locale !== 'en' && (
            <details className="original-scripture">
              <summary>{t('Read the original English Scripture')}</summary>
              <blockquote lang="en">{getLessonSync(id)?.scripture.text}</blockquote>
            </details>
          )}
          <h3>{t('Read in context')}</h3>
          <p>{lesson.scripture.context}</p>
          <a
            className="source-link"
            href={lesson.scripture.url}
            data-scripture-reference={
              getLessonSync(id)?.scripture.reference ?? lesson.scripture.reference
            }
            target="_blank"
            rel="noreferrer"
          >
            {t('Read the surrounding passage ')}
            <ExternalLink size={15} />
          </a>
          <p className="settings-note">
            {t('Scripture text is public domain. Explanatory notes are editorial interpretation.')}
          </p>
        </DialogModal>
      )}

      {selectedTerm && (
        <DialogModal title={selectedTerm} onClose={() => setSelectedTerm(null)}>
          <p>
            {locGlossary.find(g => g.term === selectedTerm)?.definition ??
              lesson?.languageNote.meaning}
          </p>
          <p className="muted">
            {locGlossary.find(g => g.term === selectedTerm)?.reference ??
              lesson?.languageNote.caution}
          </p>
        </DialogModal>
      )}
    </main>
  );
}

function AtlasLessonSection({
  lesson,
  descriptor,
  onScripture,
  onTerm
}: {
  lesson: any;
  descriptor: { type: 'opening' | 'section' | 'study' | 'practice' | 'sources'; index?: number };
  onScripture: () => void;
  onTerm: (term: string) => void;
}) {
  const { t, locale, localize } = useLanguage();
  const locGlossary = localize(ATLAS_GLOSSARY);

  if (descriptor.type === 'opening') {
    return (
      <div className="lesson-prose">
        <span className="chapter-kicker">
          {t('PART ')}
          {ROMAN[lesson.part - 1]}
          {t(' · A FOUNDATIONAL LESSON')}
        </span>
        <h2 className="chapter-title">{lesson.title}</h2>
        <p className="chapter-subtitle">{lesson.subtitle}</p>
        <div className="gold-divider">✦</div>
        <p className="chapter-abstract">{lesson.summary}</p>
        <h3>{t('In this chapter')}</h3>
        <ul>
          {lesson.objectives.map((obj: string) => (
            <li key={obj}>{obj}</li>
          ))}
        </ul>
        <div className="scripture-card">
          <div>
            <BookOpen size={18} />
            <button onClick={onScripture}>
              {lesson.scripture.reference} <ExternalLink size={13} />
            </button>
          </div>
          <blockquote>{lesson.scripture.text}</blockquote>
          <small>
            {locale === 'en'
              ? t('WORLD ENGLISH BIBLE · SCRIPTURE')
              : t('STUDY TRANSLATION FROM ENGLISH WEB · UNREVIEWED')}
          </small>
          {locale !== 'en' && (
            <details className="original-scripture">
              <summary>{t('Read the original English Scripture')}</summary>
              <blockquote lang="en">{getLessonSync(lesson.id)?.scripture.text}</blockquote>
            </details>
          )}
        </div>
        <h3>{t('Questions to carry with you')}</h3>
        <ul>
          {lesson.essentialQuestions.map((q: string) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (descriptor.type === 'section') {
    const sec = lesson.sections[descriptor.index ?? 0];
    return (
      <div className="lesson-prose">
        <span className="chapter-kicker">{t('READ · UNDERSTAND · REFLECT')}</span>
        <h2>{sec.title}</h2>
        {descriptor.index === 0 && lesson.id === 'yhwh-yireh' && (
          <figure className="chapter-illustration">
            <Img
              src="/images/moriah.webp"
              alt={t(
                'An imagined Moriah landscape with hills and a distant altar, in engraved atlas style.'
              )}
              width={700}
              height={466}
            />
            <figcaption>
              {t(
                'Artist’s interpretation. The precise location of Genesis 22’s mountain is not established here.'
              )}
            </figcaption>
          </figure>
        )}
        {descriptor.index === 0 && (
          <AtlasTeachingFigure id={lesson.id} reference={lesson.scripture.reference} />
        )}
        {sec.paragraphs.map((p: string, idx: number) => (
          <p key={idx} className={idx === 0 ? 'first-paragraph' : ''}>
            {p}
          </p>
        ))}
        {sec.claimIds.length > 0 && (
          <div className="claim-note">
            <ScrollText size={15} />
            <span>
              {t('Evidence: ')}
              {sec.claimIds
                .map(
                  (cId: string) =>
                    lesson.claims.find((c: any) => c.id === cId)?.locator ?? cId
                )
                .join(' · ')}
            </span>
          </div>
        )}
        {descriptor.index === Math.min(1, lesson.sections.length - 1) && (
          <AtlasLearningDiagram diagram={lesson.diagram} />
        )}
      </div>
    );
  }

  if (descriptor.type === 'study') {
    return (
      <div className="lesson-prose">
        <span className="chapter-kicker">{t('A CLOSER LOOK')}</span>
        <h2>{t('Words, context & conviction')}</h2>
        <div className="language-box">
          <span className="eyebrow">{t('LANGUAGE & STUDY NOTE')}</span>
          <button
            className="language-term"
            onClick={() => onTerm(lesson.languageNote.term)}
          >
            {lesson.languageNote.term}
          </button>
          <span className="transliteration">{lesson.languageNote.transliteration}</span>
          <p>{lesson.languageNote.meaning}</p>
          <small>{lesson.languageNote.caution}</small>
          <a href={lesson.languageNote.sourceUrl} target="_blank" rel="noreferrer">
            {t('Textual source ')}
            <ExternalLink size={13} />
          </a>
        </div>
        <h3>{t('Shared conviction')}</h3>
        <p>{lesson.consensus}</p>
        <h3>{t('Where Christians differ')}</h3>
        <p>{lesson.disputed}</p>
        <h3>{t('Read alongside')}</h3>
        <div className="related-passages">
          {lesson.relatedPassages.map((rp: any, idx: number) => (
            <a
              key={rp.reference}
              href={rp.url}
              data-scripture-reference={
                getLessonSync(lesson.id)?.relatedPassages[idx]?.reference ?? rp.reference
              }
              target="_blank"
              rel="noreferrer"
            >
              <BookOpen size={14} />
              {rp.reference}
              <ExternalLink size={13} />
            </a>
          ))}
        </div>
        <h3>{t('A growing vocabulary')}</h3>
        <div className="term-chips">
          {locGlossary
            .filter(g => g.lesson === lesson.id)
            .map(g => (
              <button key={g.term} onClick={() => onTerm(g.term)}>
                {g.term} <Info size={13} />
              </button>
            ))}
        </div>
      </div>
    );
  }

  if (descriptor.type === 'practice') {
    return (
      <div className="lesson-prose">
        <span className="chapter-kicker">{t('FROM UNDERSTANDING TO LIFE')}</span>
        <h2>{t('Pause. Reflect. Respond.')}</h2>
        <h3>{t('Faith in practice')}</h3>
        <ul>
          {lesson.application.map((a: string) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        <h3>{t('For personal reflection')}</h3>
        <ol>
          {lesson.reflection.map((r: string) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
        <h3>{t('Bring to your group')}</h3>
        <ol>
          {lesson.discussion.map((d: string) => (
            <li key={d}>{d}</li>
          ))}
        </ol>
        <AtlasQuiz questions={lesson.quiz} />
      </div>
    );
  }

  return (
    <div className="lesson-prose source-page">
      <span className="chapter-kicker">{t('RETURN TO THE SOURCES')}</span>
      <h2>{t('Evidence & editorial notes')}</h2>
      <p className="editorial-statement">
        {t(
          'References checked for this educational demonstration. This chapter has not received pastoral approval. Biblical text, textual evidence, historical church documents, and editorial interpretation have distinct roles.'
        )}
      </p>
      <h3>{t('Chapter sources')}</h3>
      <ol className="sources-list">
        {lesson.sources.map((src: any) => (
          <li key={src.id}>
            <span className="source-category">{src.category}</span>
            <a
              href={src.url}
              data-scripture-reference={
                getLessonSync(lesson.id)?.sources.find((s: any) => s.id === src.id)?.locator ??
                src.locator
              }
              target="_blank"
              rel="noreferrer"
            >
              {src.title} <ExternalLink size={13} />
            </a>
            <small>{src.locator}</small>
          </li>
        ))}
      </ol>
      <h3>{t('Claim register')}</h3>
      {lesson.claims.map((cl: any) => (
        <details key={cl.id} className="claim-detail">
          <summary>{cl.text}</summary>
          <p>
            {t('Category ')}
            {cl.category} · {t('References checked')}
            <br />
            {cl.locator}
            {cl.uncertainty && (
              <>
                <br />
                <strong>{t('Review note:')}</strong> {cl.uncertainty}
              </>
            )}
          </p>
          <ul>
            {cl.sourceIds.map((sId: string) => {
              const src = lesson.sources.find((s: any) => s.id === sId);
              return (
                <li key={sId}>
                  <a
                    href={src?.url}
                    data-scripture-reference={
                      getLessonSync(lesson.id)?.sources.find((s: any) => s.id === sId)
                        ?.locator ?? src?.locator
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {src?.title ?? sId}
                  </a>
                </li>
              );
            })}
          </ul>
        </details>
      ))}
      <div className="evidence-key">
        <strong>{t('Evidence key')}</strong>
        <p>
          {t('A · Biblical text')}
          <br />
          {t('B · Textual and lexical evidence')}
          <br />
          {t('C · Academic reference')}
          <br />
          {t('D · Historical church document')}
          <br />
          {t('E · Denominational interpretation')}
          <br />
          {t('F · Devotional or artistic interpretation')}
        </p>
      </div>
    </div>
  );
}

function AtlasLearningDiagram({ diagram }: { diagram: any }) {
  const { t } = useLanguage();
  return (
    <figure className={`learning-diagram ${diagram.type}`}>
      <figcaption>{diagram.title}</figcaption>
      <ol>
        {diagram.steps.map((s: string, idx: number) => (
          <li key={s}>
            <span>{String(idx + 1).padStart(2, '0')}</span>
            <p>{s}</p>
            {idx < diagram.steps.length - 1 && <ChevronRight size={16} />}
          </li>
        ))}
      </ol>
      <small>{t('Editorial learning diagram · Read alongside the passage')}</small>
    </figure>
  );
}

function AtlasQuiz({ questions }: { questions: any[] }) {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  return (
    <section className="quiz" aria-label={t('Knowledge check')}>
      <div className="quiz-title">
        <Sparkles size={22} />
        <h3>{t('Check your understanding')}</h3>
      </div>
      {questions.map((q, idx) => (
        <fieldset key={q.question}>
          <legend>
            {idx + 1}. {q.question}
          </legend>
          {q.options.map((opt: string, optIdx: number) => (
            <label
              key={opt}
              className={`quiz-option ${answers[idx] === optIdx ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name={`quiz-${idx}`}
                checked={answers[idx] === optIdx}
                onChange={() => setAnswers({ ...answers, [idx]: optIdx })}
              />
              {opt}
            </label>
          ))}
          {answers[idx] !== undefined && (
            <p
              className={`quiz-feedback ${
                answers[idx] === q.answer ? 'correct' : 'retry'
              }`}
              role="status"
            >
              <strong>
                {answers[idx] === q.answer ? t('That’s right.') : t('Take another look.')}
              </strong>{' '}
              {q.explanation}
            </p>
          )}
        </fieldset>
      ))}
    </section>
  );
}

function ReferenceDesk({
  catalog,
  parts,
  openLesson
}: {
  catalog: any[];
  parts: any[];
  openLesson: (id: string) => void;
}) {
  const { t, localize } = useLanguage();
  const locGlossary = localize(ATLAS_GLOSSARY);
  const locNames = localize(DIVINE_NAMES);
  const locTitles = localize(CHRIST_TITLES);
  const locPlaces = localize(BIBLICAL_PLACES);

  const [activeTab, setActiveTab] = useState('names');
  const [filter, setFilter] = useState('');
  const [selectedName, setSelectedName] = useState<any>(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState(BIBLICAL_PLACES[0].claimId);
  const activePlace =
    locPlaces.find(p => p.claimId === selectedPlaceId) ?? locPlaces[0];

  const tabs: [string, string][] = [
    ['names', 'Names of God'],
    ['christ', 'Titles of Christ'],
    ['glossary', 'Glossary'],
    ['words', 'Word index'],
    ['maps', 'Biblical places'],
    ['sources', 'Bibliography'],
    ['plan', 'Reading plan'],
    ['canon', 'Canon & sources']
  ];

  return (
    <>
      <div className="page-intro">
        <div>
          <p className="eyebrow">{t('FOLLOW YOUR QUESTIONS')}</p>
          <h1>{t('The reference desk')}</h1>
          <p className="intro-copy">
            {t(
              'A companion for the words, places, and ideas you encounter. Every entry invites a return to Scripture.'
            )}
          </p>
        </div>
      </div>

      <div className="reference-tabs" role="tablist" aria-label={t('Reference collections')}>
        {tabs.map(([id, label]) => (
          <button
            key={id}
            role="tab"
            tabIndex={activeTab === id ? 0 : -1}
            aria-selected={activeTab === id}
            id={`tab-${id}`}
            aria-controls={`panel-${id}`}
            onClick={() => {
              setActiveTab(id);
              setFilter('');
            }}
          >
            {t(label)}
          </button>
        ))}
      </div>

      <section role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        {['names', 'glossary', 'christ'].includes(activeTab) && (
          <div className="reference-filter">
            <Search size={18} />
            <input
              aria-label={t('Filter reference entries')}
              placeholder={t('Find a name, term, or passage…')}
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>
        )}

        {(activeTab === 'words' || activeTab === 'sources') && (
          <ReferenceIndex mode={activeTab} openLesson={openLesson} />
        )}

        {activeTab === 'names' && (
          <>
            <p className="reference-note">
              <Info size={16} />
              {t(
                ' Biblical names, titles, and traditional compound labels are distinguished in each entry. Hebrew is read right to left.'
              )}
            </p>
            <div className="names-grid">
              {locNames
                .filter(n =>
                  `${n.name} ${n.meaning} ${n.reference}`
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                )
                .map(n => (
                  <button
                    key={n.id}
                    className={`name-card ${
                      n.id.includes('selah') ? 'questioned-name' : ''
                    }`}
                    onClick={() => setSelectedName(n)}
                  >
                    <span className="name-hebrew" lang="he" dir="rtl">
                      {n.hebrew}
                    </span>
                    <h3>{n.name}</h3>
                    <p>{n.meaning}</p>
                    <span>
                      {n.reference}
                      <ArrowRight size={15} />
                    </span>
                  </button>
                ))}
            </div>
          </>
        )}

        {activeTab === 'christ' && (
          <div className="titles-grid">
            {locTitles
              .filter(c =>
                `${c.title} ${c.reference}`.toLowerCase().includes(filter.toLowerCase())
              )
              .map((c, idx) => (
                <article key={c.title}>
                  <span className="christ-number">0{idx + 1}</span>
                  <h2>{c.title}</h2>
                  <span className="eyebrow">{c.reference}</span>
                  <p>{c.meaning}</p>
                  <div className="reference-evidence">
                    <a
                      href={c.sourceUrl}
                      data-scripture-reference={
                        CHRIST_TITLES.find(orig => orig.sourceUrl === c.sourceUrl)?.reference ??
                        c.reference
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t('Scripture in context ')}
                      <ExternalLink size={12} />
                    </a>
                    {t(' · Editorial reading')}
                  </div>
                  <button className="text-button" onClick={() => openLesson(c.lesson)}>
                    {t('Explore the lesson ')}
                    <ArrowRight size={15} />
                  </button>
                </article>
              ))}
          </div>
        )}

        {activeTab === 'glossary' && (
          <div className="glossary-list">
            {locGlossary
              .filter(g =>
                `${g.term} ${g.definition} ${g.reference}`
                  .toLowerCase()
                  .includes(filter.toLowerCase())
              )
              .map(g => (
                <details key={g.term}>
                  <summary>
                    {g.term}
                    <span>{g.reference}</span>
                  </summary>
                  <p>{g.definition}</p>
                  <div className="reference-evidence">
                    {t('Editorial study definition · ')}
                    {g.evidence.map((ev: any, idx: number) => (
                      <span key={ev.url}>
                        <a href={ev.url} target="_blank" rel="noreferrer">
                          {ev.category}: {ev.locator}
                        </a>
                        {idx < g.evidence.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </div>
                  <button className="text-button" onClick={() => openLesson(g.lesson)}>
                    {t('Read in context ')}
                    <ArrowRight size={15} />
                  </button>
                </details>
              ))}
          </div>
        )}

        {activeTab === 'maps' && (
          <>
            <div className="map-layout">
              <div
                className="biblical-map"
                aria-label={t('Schematic map of selected biblical places')}
              >
                <svg viewBox="0 0 400 510" role="img" aria-labelledby="map-title">
                  <title id="map-title">
                    {t(
                      'Selected places in the southern Levant. Schematic, not ancient boundaries.'
                    )}
                  </title>
                  <path
                    d="M122 18 Q150 100 127 171T148 312L128 495H382V18Z"
                    fill="var(--map-land)"
                  />
                  <path
                    d="M257 25Q239 140 272 205T255 428"
                    stroke="#819da6"
                    strokeWidth="3"
                    fill="none"
                  />
                  <ellipse cx="269" cy="105" rx="12" ry="26" fill="#819da6" />
                  <ellipse cx="264" cy="394" rx="16" ry="48" fill="#819da6" />
                  <text x="43" y="280" transform="rotate(-90 43 280)">
                    {t('MEDITERRANEAN SEA')}
                  </text>
                  {locPlaces.map(p => {
                    const cx = 138 + (p.lon - 34.9) * 155;
                    const cy = 60 + (33 - p.lat) * 260;
                    const isBeth =
                      p.claimId ===
                      BIBLICAL_PLACES.find(b => b.name === 'Bethlehem')?.claimId;
                    return (
                      <g key={p.name}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={activePlace.name === p.name ? 7 : 4}
                          fill={activePlace.name === p.name ? '#9a762e' : '#142f41'}
                        />
                        <text
                          x={cx + (isBeth ? -12 : 12)}
                          y={cy + (isBeth ? 18 : 4)}
                          textAnchor={isBeth ? 'end' : 'start'}
                        >
                          {p.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <span>{t('SCHEMATIC · MODERN COORDINATES')}</span>
              </div>
              <div>
                <h2>{t('Places within the story')}</h2>
                <p className="muted">
                  {t('Select a place to connect geography with a biblical passage.')}
                </p>
                <div className="place-buttons">
                  {locPlaces.map(p => (
                    <button
                      key={p.name}
                      aria-pressed={p.name === activePlace.name}
                      onClick={() => setSelectedPlaceId(p.claimId)}
                    >
                      <MapPin size={16} />
                      {p.name}
                    </button>
                  ))}
                </div>
                <div className="place-detail">
                  <h3>{activePlace.name}</h3>
                  <p>{activePlace.note}</p>
                  <span className="eyebrow">{activePlace.reference}</span>
                  <p className="coordinates">
                    {activePlace.lat.toFixed(3)}
                    {t('° N · ')}
                    {activePlace.lon.toFixed(3)}
                    {t('° E')}
                  </p>
                  <div className="place-evidence">
                    <a
                      href={activePlace.sourceUrl}
                      data-scripture-reference={
                        BIBLICAL_PLACES.find(b => b.claimId === activePlace.claimId)
                          ?.reference ?? activePlace.reference
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t('Scripture ')}
                      <ExternalLink size={13} />
                    </a>
                    <a
                      href={activePlace.coordinateSourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t('Coordinate source ')}
                      <ExternalLink size={13} />
                    </a>
                    <small>
                      {activePlace.precision} {activePlace.coordinateAttribution}
                    </small>
                  </div>
                  <a
                    className="source-link"
                    href={`https://www.openstreetmap.org/?mlat=${activePlace.lat}&mlon=${activePlace.lon}#map=12/${activePlace.lat}/${activePlace.lon}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('View modern geography ')}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
            <p className="reference-note">
              {t(
                'Modern settlement/site coordinates: OpenBible.info, CC BY 4.0. OpenStreetMap supplies the external map view. The schematic makes no claim about ancient borders or the precise site of Moriah.'
              )}
            </p>
          </>
        )}

        {activeTab === 'plan' && (
          <>
            <h2 className="reference-section-title">{t('A foundation each week')}</h2>
            <p className="muted">
              {t(
                'A flexible 15-week reading plan. Read the lesson, return to its biblical passage, then discuss one question with your group.'
              )}
            </p>
            <ol className="reading-plan">
              {parts.map(p => {
                const firstLesson = catalog.find(c => c.part === p.number);
                return (
                  <li key={p.number}>
                    <span>
                      {t('WEEK ')}
                      {String(p.number).padStart(2, '0')}
                    </span>
                    <div>
                      <h3>{p.shortTitle}</h3>
                      <p>{p.description}</p>
                    </div>
                    <button
                      className="text-button"
                      onClick={() => firstLesson && openLesson(firstLesson.id)}
                    >
                      {t('Read ')}
                      <ArrowRight size={16} />
                    </button>
                  </li>
                );
              })}
            </ol>
          </>
        )}

        {activeTab === 'canon' && (
          <div className="canon-content">
            <h2>{t('One edition, stated clearly.')}</h2>
            <p>
              {t(
                'This demonstration uses the updated World English Bible (engwebp), with LORD in the Old Testament, and a 66-book Protestant canon. Catholic and Orthodox communities receive different canonical collections. A church must confirm its own profile before publication.'
              )}
            </p>
            <div className="canon-columns">
              <section>
                <h3>{t('Old Testament · 39 books')}</h3>
                <p>
                  {t(
                    'Genesis · Exodus · Leviticus · Numbers · Deuteronomy · Joshua · Judges · Ruth · 1–2 Samuel · 1–2 Kings · 1–2 Chronicles · Ezra · Nehemiah · Esther · Job · Psalms · Proverbs · Ecclesiastes · Song of Solomon · Isaiah · Jeremiah · Lamentations · Ezekiel · Daniel · Hosea · Joel · Amos · Obadiah · Jonah · Micah · Nahum · Habakkuk · Zephaniah · Haggai · Zechariah · Malachi'
                  )}
                </p>
              </section>
              <section>
                <h3>{t('New Testament · 27 books')}</h3>
                <p>
                  {t(
                    'Matthew · Mark · Luke · John · Acts · Romans · 1–2 Corinthians · Galatians · Ephesians · Philippians · Colossians · 1–2 Thessalonians · 1–2 Timothy · Titus · Philemon · Hebrews · James · 1–2 Peter · 1–3 John · Jude · Revelation'
                  )}
                </p>
              </section>
            </div>
            <h3>{t('Translation and evidence')}</h3>
            <p>
              {t(
                'Biblical quotations are distinguished from explanatory notes. Historical creeds express church reception and interpretation. Original-language notes identify their textual sources and avoid deriving doctrine from isolated word roots.'
              )}
            </p>
            <div className="reference-sources">
              <a
                href="https://ebible.org/engwebp/copyright.htm"
                target="_blank"
                rel="noreferrer"
              >
                {t('World English Bible · edition & public-domain notice ')}
                <ExternalLink size={15} />
              </a>
              <a href="https://www.stepbible.org/" target="_blank" rel="noreferrer">
                {t('STEP Bible · original-language study ')}
                <ExternalLink size={15} />
              </a>
              <a
                href="https://www.usccb.org/beliefs-and-teachings/what-we-believe"
                target="_blank"
                rel="noreferrer"
              >
                {t('USCCB · Nicene Creed and Catholic tradition ')}
                <ExternalLink size={15} />
              </a>
            </div>
            <h3>{t('A reviewable textbook')}</h3>
            <p>
              {t(
                'Every full lesson includes its own source list and claim register. Research and editorial policies, the source register, curriculum, and copyright notices are maintained in the repository’s docs directory. No content in this edition is labeled church-approved.'
              )}
            </p>
          </div>
        )}
      </section>

      {selectedName && (
        <DialogModal title={selectedName.name} onClose={() => setSelectedName(null)}>
          <span className="name-hebrew modal-hebrew" lang="he" dir="rtl">
            {selectedName.hebrew}
          </span>
          <p className="chapter-abstract">{selectedName.meaning}</p>
          <span className="eyebrow">{selectedName.reference}</span>
          <p>{selectedName.context}</p>
          <div className="editorial-statement">{selectedName.note}</div>
          <a
            className="source-link"
            href={selectedName.sourceUrl}
            data-scripture-reference={
              DIVINE_NAMES.find(n => n.sourceUrl === selectedName.sourceUrl)?.reference ??
              selectedName.reference
            }
            target="_blank"
            rel="noreferrer"
          >
            {t('Read the textual source ')}
            <ExternalLink size={15} />
          </a>
        </DialogModal>
      )}
    </>
  );
}
