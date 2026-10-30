import React, { useState } from 'react';
import { Img, Link } from '../lib/router';
import { getWebUrl } from '../lib/scripture';
import { useLanguage } from '../lib/language';

const ILLUSTRATED_ENTRY_STRINGS = {
  en: {
    eyebrow: 'AN ILLUSTRATED STUDY',
    title: 'See the teaching. Follow the Scripture.',
    intro: 'Read the passage beside the picture, then explore what it means.',
    all: 'Explore all illustrated chapters',
    triune: 'The Triune God',
    angels: 'Angels in Scripture and tradition',
    judgment: 'The Day of Judgment'
  },
  fil: {
    eyebrow: 'PAG-AARAL NA MAY MGA LARAWAN',
    title: 'Unawain ang aral. Sundan ang Kasulatan.',
    intro: 'Basahin ang talata kasabay ng larawan at pag-aralan ang kahulugan nito.',
    all: 'Tingnan ang lahat ng araling may larawan',
    triune: 'Ang Diyos na Trinidad',
    angels: 'Mga anghel sa Kasulatan at tradisyon',
    judgment: 'Ang Araw ng Paghuhukom'
  },
  ilo: {
    eyebrow: 'PANAGADAL NGA ADDA LADAWAN',
    title: 'Awaten ti sursuro. Suroten ti Kasuratan.',
    intro: 'Basaen ti teksto iti abay ti ladawan ken adalen ti kaipapananna.',
    all: 'Kitaen amin nga adal nga adda ladawan',
    triune: 'Ti Dios a Trinidad',
    angels: 'Dagiti anghel iti Kasulatan ken tradision',
    judgment: 'Ti Aldaw ti Panangukom'
  }
} as const;

export function IllustratedEntry() {
  const { locale } = useLanguage();
  const s = ILLUSTRATED_ENTRY_STRINGS[locale];
  const cards: [string, string, string][] = [
    ['the-triune-god', 'trinity-study', s.triune],
    ['angelology', 'gabriel-study', s.angels],
    ['the-day-of-judgment', 'judgment-study', s.judgment]
  ];
  return (
    <section className="illustrated-entry" lang={locale}>
      <p className="eyebrow">{s.eyebrow}</p>
      <h2>{s.title}</h2>
      <p>{s.intro}</p>
      <div>
        {cards.map(([slug, img, label]) => (
          <Link key={slug} href={`/foundations/${slug}`}>
            <Img
              src={`/illustrations/${img}.webp`}
              width={480}
              height={320}
              sizes="(max-width: 700px) 90vw, 28vw"
              alt=""
            />
            <strong>
              {label} <span aria-hidden="true">→</span>
            </strong>
          </Link>
        ))}
      </div>
      <Link className="text-button" href="/foundations">
        {s.all} →
      </Link>
      <small>
        {locale === 'en'
          ? 'Educational drafts · Art and translations await review'
          : locale === 'fil'
          ? 'Mga burador para sa pag-aaral · Kailangan pang suriin'
          : 'Dagiti burador para iti panagadal · Masapul pay ti panangrepaso'}
      </small>
    </section>
  );
}

const VISUAL_STUDY_META: Record<string, [string, string]> = {
  introduction: [
    'An open book and a journey',
    'The landscape stands for a learning journey. Begin with a passage’s setting, follow its argument, and distinguish its words from our explanation.'
  ],
  'theology-proper': [
    'Creation and its Creator',
    'The scene evokes creation’s dependence on God. Its light is an artistic choice, not a representation of God’s appearance. Read the named attributes in their own biblical settings.'
  ],
  bibliology: [
    'A library carried across generations',
    'Scrolls and books help us remember that Scripture has languages, literary forms, and a transmission history. No pictured manuscript certifies a particular reading; compare the textual evidence.'
  ],
  christology: [
    'The identity and work of Jesus',
    'An ancient setting helps us attend to the incarnation. The face and setting are imaginative; Christ’s identity is taught through the Gospel accounts, not established by an artist’s likeness.'
  ],
  pneumatology: [
    'The Spirit and a life of witness',
    'Light and movement symbolize divine action. The Spirit is not physical energy. Read the teaching about witness, truth, and spiritual fruit alongside the image.'
  ],
  angelology: [
    'Messengers who point beyond themselves',
    'Use the profiles below to distinguish named messengers, visionary beings, and later traditions. The images illustrate texts; they do not add descriptions to them.'
  ],
  anthropology: [
    'Human dignity in ordinary life',
    'The human figures help connect the image of God with neighbors we can see and serve. Age, ability, social position, and artistic appearance do not determine a person’s worth.'
  ],
  hamartiology: [
    'The fracture of trust',
    'A divided path is a visual metaphor for sin’s disruption of relationship. Explain the passage’s account of responsibility and grace before making an application to another person.'
  ],
  soteriology: [
    'Gift, renewal, and hope',
    'The cross evokes Christ’s saving work. Read grace, faith, and good works together. The illustration does not divide salvation into three independently purchased stages.'
  ],
  ecclesiology: [
    'Many members, one body',
    'The gathering represents shared life, service, and responsibility. A church is more than its building, while unity does not require every member to have the same gift.'
  ],
  eschatology: [
    'Hope beyond the horizon',
    'Dawn symbolizes hope, not a timetable. Read resurrection, Christ’s return, and judgment in context; follow the dedicated judgment study for a fuller explanation.'
  ],
  demonology: [
    'Discernment without fascination',
    'Shadow is a visual metaphor. It does not diagnose an illness or distress as demonic. Study the actual passages about resistance, truth, and Christ’s authority.'
  ],
  'manuscripts-and-transmission': [
    'A text with a history',
    'Scrolls and codices represent different stages of transmission. They are not photographs of the original manuscripts. Compare languages, textual witnesses, and translations without confusing them.'
  ],
  'christ-in-the-old-testament': [
    'Pattern and fulfillment',
    'The image recalls the setting of an earlier biblical narrative. Follow the explicit New Testament connection; distinguish it from a later devotional resemblance.'
  ],
  'jesus-life-and-chronology': [
    'Events before exact ages',
    'Ancient settings help place events, but a painting cannot establish a date. Distinguish what the Gospels narrate from reconstructed ages or a harmonized sequence.'
  ],
  'christian-hope-and-timelines': [
    'Hope and the limits of a chart',
    'An unfolding horizon can suggest expectation. It cannot demonstrate the timing of the rapture, tribulation, or millennium. Identify the interpretive framework before drawing a timeline.'
  ],
  'faithfulness-and-restoration': [
    'A path of return',
    'The path evokes repentance and restoration. Read the warnings with their promises, and respond to a struggling person with truth, patience, and practical care.'
  ],
  'spirit-filled-ministry': [
    'Gifts for the common good',
    'Service and shared work point to the purpose of spiritual gifts. Giftedness is not a license to dominate; character, love, and accountability remain essential.'
  ],
  'the-triune-god': [
    'One God: relationships, not parts',
    'The artwork depicts a study book, not God. Use the relationship diagram below to distinguish the persons without dividing the divine being.'
  ],
  'the-day-of-judgment': [
    'Justice, accountability, and hope',
    'The throne and open book evoke Revelation’s vision. The throne is intentionally unoccupied in the artwork. Read each claim through its own passage; the scene is not a map of heaven.'
  ]
};

const LESSON_TO_VISUAL: Record<string, [string, string]> = {
  'interpreting-scripture': ['introduction', 'book-cover'],
  scripture: ['bibliology', 'bibliology'],
  'yhwh-yireh': ['theology-proper', 'theology-proper'],
  omniscience: ['theology-proper', 'theology-proper'],
  trinity: ['the-triune-god', 'trinity-study'],
  'creation-covenant': ['theology-proper', 'theology-proper'],
  'image-of-god': ['anthropology', 'anthropology'],
  'sin-and-grace': ['hamartiology', 'hamartiology'],
  'bread-of-life': ['christology', 'christology'],
  'holy-spirit': ['pneumatology', 'pneumatology'],
  salvation: ['soteriology', 'soteriology'],
  angels: ['angelology', 'gabriel-study'],
  church: ['ecclesiology', 'ecclesiology'],
  'resurrection-hope': ['eschatology', 'judgment-study'],
  discipleship: ['faithfulness-and-restoration', 'faithfulness-and-restoration'],
  creeds: ['bibliology', 'bibliology']
};

export function AtlasTeachingFigure({ id, reference }: { id: string; reference: string }) {
  const mapping = LESSON_TO_VISUAL[id];
  if (!mapping) return null;
  const [chapterId, imgName] = mapping;
  const [heading, caption] = VISUAL_STUDY_META[chapterId];
  return (
    <figure className="atlas-teaching" lang="en">
      <Img
        src={`/illustrations/${imgName}.webp`}
        width={1536}
        height={1024}
        sizes="(max-width: 900px) 90vw, 740px"
        alt={`Imaginative teaching illustration: ${heading}.`}
      />
      <figcaption>
        <small>PICTURE &amp; PASSAGE · ENGLISH VISUAL STUDY</small>
        <strong>{heading}</strong>
        <p>{caption}</p>
        <span>
          Read alongside: {reference}. Art is imaginative and awaiting human review.
        </span>
      </figcaption>
    </figure>
  );
}

export function VisualStudy({ chapter }: { chapter: any }) {
  const [activeTab, setActiveTab] = useState(0);
  const [heading, caption] = VISUAL_STUDY_META[chapter.id] ?? [chapter.title, chapter.summary];
  const beginnerSecs = chapter.sections
    .filter((s: any) => s.depth === 'beginner')
    .slice(0, 3);
  const currentSec = beginnerSecs[activeTab] || chapter.sections[0];

  return (
    <section
      className="fd-visual-study"
      id="visual-study"
      data-foundation-section={true}
      lang="en"
    >
      <p className="fd-eyebrow">PICTURE &amp; PASSAGE · ENGLISH STUDY</p>
      <h2>{heading}</h2>
      <figure>
        <Img
          src={
            chapter.id === 'angelology'
              ? '/illustrations/enoch-guides-study.webp'
              : chapter.illustrations.hero
          }
          width={1536}
          height={1024}
          sizes="(max-width: 900px) 95vw, 850px"
          alt={chapter.illustrations.alt}
        />
        <figcaption>
          {caption}
          <small>Imaginative illustration · Human art review pending</small>
        </figcaption>
      </figure>
      <div className="fd-visual-tabs" role="group" aria-label="Explore the pictured teaching">
        {beginnerSecs.map((sec: any, idx: number) => (
          <button
            key={sec.id}
            aria-pressed={activeTab === idx}
            onClick={() => setActiveTab(idx)}
          >
            {idx + 1}. {sec.title}
          </button>
        ))}
      </div>
      <div className="fd-visual-explanation" aria-live="polite">
        <h3>{currentSec.title}</h3>
        <p>{currentSec.paragraphs[0]}</p>
        <a href={`#${currentSec.id}`}>Continue this explanation below ↓</a>
      </div>
      {chapter.id === 'the-triune-god' || chapter.id === 'theology-proper' ? (
        <TrinityDiagram />
      ) : null}
      {chapter.id === 'angelology' && <AngelAtlas />}
      {(chapter.id === 'eschatology' || chapter.id === 'christian-hope-and-timelines') && (
        <p>
          <Link href="/foundations/the-day-of-judgment">
            Read the complete Day of Judgment study →
          </Link>
        </p>
      )}
      {chapter.id === 'the-day-of-judgment' && <JudgmentMap />}
    </section>
  );
}

function TrinityDiagram() {
  const [selected, setSelected] = useState(0);
  const persons = ['Father', 'Son', 'Holy Spirit'];
  const descriptions = [
    'The Father is God. The Father is not the Son or the Spirit. In Ephesians 2:18, reconciled people come to the Father through the Son in one Spirit.',
    'The Son is God. The Son is not the Father or the Spirit. John 1:1–14 distinguishes the Word’s relation to God and affirms the incarnation.',
    'The Holy Spirit is God. The Spirit is not the Father or the Son. Acts 5:3–4 and John 14:26 contribute to the confession of the Spirit’s deity and personal work.'
  ];
  return (
    <figure className="fd-trinity">
      <figcaption>
        <p className="fd-eyebrow">RELATIONSHIP DIAGRAM · NICENE CHRISTIAN TEACHING</p>
        <h3>One divine being. Three distinct persons.</h3>
      </figcaption>
      <div className="fd-trinity-map">
        <div className="fd-one-god">
          <strong>ONE GOD</strong>
          <span>One undivided divine essence</span>
        </div>
        <div className="fd-persons">
          {persons.map((person, idx) => (
            <button
              key={person}
              aria-pressed={selected === idx}
              onClick={() => setSelected(idx)}
            >
              <span aria-hidden="true">│</span>
              <small>is God</small>
              <strong>{person}</strong>
              <span>fully divine</span>
            </button>
          ))}
        </div>
        <p>Father ≠ Son · Son ≠ Spirit · Spirit ≠ Father</p>
      </div>
      <p aria-live="polite">{descriptions[selected]}</p>
      <a href={getWebUrl('Ephesians 2:18')} data-scripture-reference="Ephesians 2:18">
        Through the Son · in one Spirit · to the Father ↗
      </a>
      <small>
        The lines express theological statements. They are not parts of God, spatial locations, or
        an image of the divine nature.
      </small>
      <Link href="/foundations/the-triune-god">Read the full Triune God study →</Link>
    </figure>
  );
}

const ANGEL_PROFILES = [
  {
    name: 'Michael',
    image: 'michael-study',
    basis: 'Named in the shared 66-book collection',
    role: 'Prince and archangel',
    description:
      'Associated with Daniel’s people, called the archangel in Jude, and shown leading angels against the dragon in Revelation. He serves under the Lord’s authority.',
    reference: 'Daniel 10:13; 12:1 · Jude 1:9 · Revelation 12:7–9',
    url: getWebUrl('Jude 1:9'),
    limit:
      'Scripture does not describe his face or armor. The battle image is symbolic artistic interpretation.',
    section: 'michael-named'
  },
  {
    name: 'Gabriel',
    image: 'gabriel-study',
    basis: 'Named in the shared 66-book collection',
    role: 'Messenger and interpreter',
    description:
      'Explains visions to Daniel and is sent to Zechariah and Mary. His message directs attention to God’s saving purpose and the coming of Jesus.',
    reference: 'Daniel 8:16; 9:21 · Luke 1:19, 26–38',
    url: getWebUrl('Luke 1:26–38'),
    limit: 'These passages do not explicitly call him an archangel or describe his wings.',
    section: 'gabriel-named'
  },
  {
    name: 'Raphael',
    image: 'raphael-study',
    basis: 'Tobit · deuterocanonical / canon varies',
    role: 'Companion and healing messenger in Tobit',
    description:
      'Identifies himself among seven angels before God. The narrative connects his mission with healing and directs thanksgiving to God.',
    reference: 'Tobit 12:12–20',
    url: 'https://www.newadvent.org/bible/tob012.htm',
    limit:
      'Tobit is outside this app’s 66-book Bible edition. The fish and journey are narrative symbols; the likeness is imagined.',
    section: 'raphael-and-canon'
  },
  {
    name: 'Uriel',
    image: 'uriel-study',
    basis: '2 Esdras and 1 Enoch · canon varies',
    role: 'A guide answering questions',
    description:
      'In 2 Esdras 4:1, Uriel answers Ezra and confronts the limits of human understanding. The name also appears in the Enochic list.',
    reference: '2 Esdras 4:1–11 · 1 Enoch 20',
    url: 'https://ebible.org/eng-web/2ES04.htm',
    limit:
      'Not named in this app’s 66-book collection. A flame symbol would be a later artistic convention.',
    section: 'other-four-names'
  },
  {
    name: 'Raguel',
    image: 'raguel-study',
    basis: '1 Enoch · outside the app’s canon',
    role: 'A figure in the Enochic angel list',
    description:
      'The consulted chapter 20 list associates Raguel with judgment involving the heavenly lights. This is literary angelology, not a Gospel biography.',
    reference: '1 Enoch 20:4 in the consulted Charles numbering',
    url: 'https://sacred-texts.com/book/the-book-of-enoch/chapter-xx',
    limit:
      'The screenshot’s 20:6 citation and “divine justice” title need correction and specialist review. No physical appearance is supplied.',
    section: 'other-four-names'
  },
  {
    name: 'Saraqael / Sariel',
    image: 'saraqael-study',
    basis: '1 Enoch and later lists · identification needs review',
    role: 'A name whose forms must be distinguished',
    description:
      'Saraqael occurs in the consulted chapter 20 list in relation to spirits who sin. Some later lists associate the name with Sariel; the equivalence is not assumed here.',
    reference: '1 Enoch 20:6 in the consulted Charles numbering',
    url: 'https://sacred-texts.com/book/the-book-of-enoch/chapter-xx',
    limit:
      '“Prince of God” and the screenshot’s verse number are not established by the consulted list. Spelling and identity need specialist review.',
    section: 'other-four-names'
  },
  {
    name: 'Remiel',
    image: 'remiel-study',
    basis: '1 Enoch · outside the app’s canon',
    role: 'Associated with those who rise',
    description:
      'The consulted list describes Remiel in relation to those who rise. “Angel of hope” is a devotional summary, not a title quoted from that sentence.',
    reference: '1 Enoch 20:8 in the consulted Charles numbering',
    url: 'https://sacred-texts.com/book/the-book-of-enoch/chapter-xx',
    limit:
      'The screenshot’s 20:7 locator differs. The dawn is an artistic metaphor; no appearance or complete biography is supplied.',
    section: 'other-four-names'
  },
  {
    name: 'Seraphim',
    image: 'seraphim-study',
    basis: 'Isaiah’s vision · shared 66-book collection',
    role: 'Six-winged worshipers in the vision',
    description:
      'Two wings cover the face, two the feet, and two are used for flight. Their proclamation emphasizes holiness; one brings a coal to Isaiah.',
    reference: 'Isaiah 6:1–7',
    url: getWebUrl('Isaiah 6:1–7'),
    limit:
      'This is an illustration of one visionary description, not the body plan of every angel.',
    section: 'seraphim-and-cherubim'
  },
  {
    name: 'Cherubim',
    image: 'cherubim-study',
    basis: 'Genesis and Ezekiel · shared 66-book collection',
    role: 'Guardians and throne-associated living beings',
    description:
      'Genesis associates cherubim with the guarded way to life. Ezekiel’s vision gives four faces and four wings, human hands, and accompanying wheels.',
    reference: 'Genesis 3:24 · Ezekiel 10:9–22',
    url: getWebUrl('Ezekiel 10:9–22'),
    limit:
      'The composite image is a visionary artistic construction. Cherubim in these texts are not the winged infants of decorative art.',
    section: 'seraphim-and-cherubim'
  }
];

export function getChapterAssets(chapter: any): string[] {
  return chapter.id === 'angelology'
    ? [
        '/illustrations/enoch-guides-study.webp',
        ...ANGEL_PROFILES.map(p => `/illustrations/${p.image}.webp`)
      ]
    : [chapter.illustrations.hero];
}

function AngelAtlas() {
  const [filter, setFilter] = useState('all');
  const filtered = ANGEL_PROFILES.filter(
    p =>
      filter === 'all' ||
      (filter === 'shared' ? p.basis.includes('66-book') : !p.basis.includes('66-book'))
  );
  return (
    <div className="fd-angel-atlas">
      <p className="fd-eyebrow">ILLUSTRATED ANGEL GUIDE</p>
      <h3>Who is named, where, and in which collection?</h3>
      <p>
        Choose a source group. Each portrait links to its text and fuller explanation. All
        appearances are imagined; the descriptions identify what the source actually supplies.
      </p>
      <label>
        Show profiles{' '}
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          aria-label="Filter angel profiles"
        >
          <option value="all">All nine profiles</option>
          <option value="shared">Shared 66-book passages</option>
          <option value="tradition">Other collections and traditions</option>
        </select>
      </label>
      <div className="fd-angel-profiles">
        {filtered.map(p => (
          <figure key={p.name} className="fd-angel-profile">
            <Img
              src={`/illustrations/${p.image}.webp`}
              width={1536}
              height={1024}
              sizes="(max-width: 700px) 90vw, 420px"
              alt={`Imaginative illustration for ${p.name}; appearance is not a verified likeness.`}
            />
            <figcaption>
              <small>{p.basis}</small>
              <h4>{p.name}</h4>
              <strong>{p.role}</strong>
              <p>{p.description}</p>
              <a href={p.url}>{p.reference} ↗</a>
              <p className="fd-art-limit">{p.limit}</p>
              <a href={`#${p.section}`}>Read the in-depth explanation ↓</a>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="fd-review-note">
        The Enochic profiles use the consulted Charles translation of chapter 20. Names and
        numbering differ across textual traditions; the source collection is identified for every
        profile. Specialist and pastoral review remain pending.
      </p>
    </div>
  );
}

function JudgmentMap() {
  const [selected, setSelected] = useState(0);
  const steps: [string, string, string][] = [
    [
      'Appointed judge',
      'Acts 17:31',
      'Paul connects righteous judgment with the resurrection of Jesus.'
    ],
    [
      'Resurrection',
      'John 5:28–29',
      'The dead hear the Son’s voice; the passage speaks of life and judgment.'
    ],
    [
      'Accountability',
      'Romans 14:10–12',
      'Begin with our own account to God and stop despising a neighbor.'
    ],
    [
      'Mercy made concrete',
      'Matthew 25:31–46',
      'Food, welcome, clothing, and care are placed before the king.'
    ],
    [
      'New creation',
      'Revelation 21:1–4',
      'The final horizon includes life with God, with death and mourning ended.'
    ]
  ];
  const active = steps[selected];
  return (
    <figure className="fd-judgment-map">
      <figcaption>
        <h3>Follow the teaching, one passage at a time.</h3>
        <p>A study sequence, not a dated end-times timeline.</p>
      </figcaption>
      <div role="group" aria-label="Judgment passages">
        {steps.map((step, idx) => (
          <button
            key={step[0]}
            aria-pressed={selected === idx}
            onClick={() => setSelected(idx)}
          >
            {idx + 1}. {step[0]}
          </button>
        ))}
      </div>
      <p aria-live="polite">{active[2]}</p>
      <a href={getWebUrl(active[1])} data-scripture-reference={active[1]}>
        Read {active[1]} ↗
      </a>
    </figure>
  );
}
