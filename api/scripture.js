const BOOKS = [
  { name: 'Genesis', code: 'GEN', chapters: 50 },
  { name: 'Exodus', code: 'EXO', chapters: 40 },
  { name: 'Leviticus', code: 'LEV', chapters: 27 },
  { name: 'Numbers', code: 'NUM', chapters: 36 },
  { name: 'Deuteronomy', code: 'DEU', chapters: 34 },
  { name: 'Joshua', code: 'JOS', chapters: 24 },
  { name: 'Judges', code: 'JDG', chapters: 21 },
  { name: 'Ruth', code: 'RUT', chapters: 4 },
  { name: '1 Samuel', code: '1SA', chapters: 31 },
  { name: '2 Samuel', code: '2SA', chapters: 24 },
  { name: '1 Kings', code: '1KI', chapters: 22 },
  { name: '2 Kings', code: '2KI', chapters: 25 },
  { name: '1 Chronicles', code: '1CH', chapters: 29 },
  { name: '2 Chronicles', code: '2CH', chapters: 36 },
  { name: 'Ezra', code: 'EZR', chapters: 10 },
  { name: 'Nehemiah', code: 'NEH', chapters: 13 },
  { name: 'Esther', code: 'EST', chapters: 10 },
  { name: 'Job', code: 'JOB', chapters: 42 },
  { name: 'Psalms', code: 'PSA', chapters: 150 },
  { name: 'Proverbs', code: 'PRO', chapters: 31 },
  { name: 'Ecclesiastes', code: 'ECC', chapters: 12 },
  { name: 'Song of Solomon', code: 'SNG', chapters: 8 },
  { name: 'Isaiah', code: 'ISA', chapters: 66 },
  { name: 'Jeremiah', code: 'JER', chapters: 52 },
  { name: 'Lamentations', code: 'LAM', chapters: 5 },
  { name: 'Ezekiel', code: 'EZK', chapters: 48 },
  { name: 'Daniel', code: 'DAN', chapters: 12 },
  { name: 'Hosea', code: 'HOS', chapters: 14 },
  { name: 'Joel', code: 'JOL', chapters: 3 },
  { name: 'Amos', code: 'AMO', chapters: 9 },
  { name: 'Obadiah', code: 'OBA', chapters: 1 },
  { name: 'Jonah', code: 'JON', chapters: 4 },
  { name: 'Micah', code: 'MIC', chapters: 7 },
  { name: 'Nahum', code: 'NAM', chapters: 3 },
  { name: 'Habakkuk', code: 'HAB', chapters: 3 },
  { name: 'Zephaniah', code: 'ZEP', chapters: 3 },
  { name: 'Haggai', code: 'HAG', chapters: 2 },
  { name: 'Zechariah', code: 'ZEC', chapters: 14 },
  { name: 'Malachi', code: 'MAL', chapters: 4 },
  { name: 'Matthew', code: 'MAT', chapters: 28 },
  { name: 'Mark', code: 'MRK', chapters: 16 },
  { name: 'Luke', code: 'LUK', chapters: 24 },
  { name: 'John', code: 'JHN', chapters: 21 },
  { name: 'Acts', code: 'ACT', chapters: 28 },
  { name: 'Romans', code: 'ROM', chapters: 16 },
  { name: '1 Corinthians', code: '1CO', chapters: 16 },
  { name: '2 Corinthians', code: '2CO', chapters: 13 },
  { name: 'Galatians', code: 'GAL', chapters: 6 },
  { name: 'Ephesians', code: 'EPH', chapters: 6 },
  { name: 'Philippians', code: 'PHP', chapters: 4 },
  { name: 'Colossians', code: 'COL', chapters: 4 },
  { name: '1 Thessalonians', code: '1TH', chapters: 5 },
  { name: '2 Thessalonians', code: '2TH', chapters: 3 },
  { name: '1 Timothy', code: '1TI', chapters: 6 },
  { name: '2 Timothy', code: '2TI', chapters: 4 },
  { name: 'Titus', code: 'TIT', chapters: 3 },
  { name: 'Philemon', code: 'PHM', chapters: 1 },
  { name: 'Hebrews', code: 'HEB', chapters: 13 },
  { name: 'James', code: 'JAS', chapters: 5 },
  { name: '1 Peter', code: '1PE', chapters: 5 },
  { name: '2 Peter', code: '2PE', chapters: 3 },
  { name: '1 John', code: '1JN', chapters: 5 },
  { name: '2 John', code: '2JN', chapters: 1 },
  { name: '3 John', code: '3JN', chapters: 1 },
  { name: 'Jude', code: 'JUD', chapters: 1 },
  { name: 'Revelation', code: 'REV', chapters: 22 }
];

const ALIASES = {
  gen: 'GEN', ge: 'GEN', ex: 'EXO', exod: 'EXO', lev: 'LEV', lv: 'LEV', num: 'NUM', nu: 'NUM',
  deut: 'DEU', dt: 'DEU', josh: 'JOS', judg: 'JDG', ruth: 'RUT', '1sam': '1SA', '2sam': '2SA',
  '1kgs': '1KI', '2kgs': '2KI', '1chron': '1CH', '2chron': '2CH', '1chr': '1CH', '2chr': '2CH',
  neh: 'NEH', esth: 'EST', ps: 'PSA', psalm: 'PSA', prov: 'PRO', eccl: 'ECC', eccles: 'ECC',
  song: 'SNG', sos: 'SNG', songofsongs: 'SNG', canticles: 'SNG', is: 'ISA', jer: 'JER', lam: 'LAM',
  ezek: 'EZK', dan: 'DAN', hos: 'HOS', joel: 'JOL', obad: 'OBA', jonah: 'JON', nah: 'NAM',
  zeph: 'ZEP', zech: 'ZEC', matt: 'MAT', mt: 'MAT', mk: 'MRK', mark: 'MRK', lk: 'LUK', luke: 'LUK',
  jn: 'JHN', john: 'JHN', acts: 'ACT', rom: 'ROM', '1cor': '1CO', '2cor': '2CO', gal: 'GAL',
  eph: 'EPH', phil: 'PHP', col: 'COL', '1thess': '1TH', '2thess': '2TH', '1tim': '1TI',
  '2tim': '2TI', philem: 'PHM', heb: 'HEB', jam: 'JAS', james: 'JAS', '1pet': '1PE', '2pet': '2PE',
  '1john': '1JN', '2john': '2JN', '3john': '3JN', jude: 'JUD', rev: 'REV', apocalypse: 'REV'
};

function normalizeBook(raw) {
  return raw
    .toLowerCase()
    .replace(/^iii\s+/, '3 ')
    .replace(/^ii\s+/, '2 ')
    .replace(/^i\s+/, '1 ')
    .replace(/[.\s]/g, '');
}

function decodeEntities(str) {
  return str
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&ldquo;|&#8220;/g, '“')
    .replace(/&rdquo;|&#8221;/g, '”')
    .replace(/&lsquo;|&#8216;/g, '‘')
    .replace(/&rsquo;|&#8217;/g, '’')
    .replace(/&mdash;|&#8212;/g, '—')
    .replace(/&ndash;|&#8211;/g, '–')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function fetchAndParseEbible(referenceInput) {
  const cleaned = String(referenceInput || '')
    .trim()
    .replace(/[–—]/g, '-')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*-\s*/g, '-');
  const m = /^(.+?)\s+(\d+)(?::(\d+))?(?:-(?:(\d+):)?(\d+))?$/.exec(cleaned);
  if (!m) {
    return { status: 400, body: { error: 'Invalid Scripture reference.' } };
  }
  const norm = normalizeBook(m[1]);
  const book = BOOKS.find(
    b => normalizeBook(b.name) === norm || b.code.toLowerCase() === norm || ALIASES[norm] === b.code
  );
  const chapter = Number(m[2]);
  if (!book || !Number.isInteger(chapter) || chapter < 1 || chapter > book.chapters) {
    return { status: 400, body: { error: 'Unsupported book or chapter.' } };
  }

  const padChap = String(chapter).padStart(book.code === 'PSA' ? 3 : 2, '0');
  const sourceUrl = `https://ebible.org/engwebp/${book.code}${padChap}.htm`;

  const res = await fetch(sourceUrl);
  if (!res.ok) {
    return { status: 502, body: { error: 'Could not retrieve chapter from eBible.org.' } };
  }
  const html = await res.text();

  // Strip footnotes, navigation, copyright
  let mainHtml = html;
  const mainStart = mainHtml.indexOf('<div class="main">');
  if (mainStart !== -1) mainHtml = mainHtml.slice(mainStart);
  const fnStart = mainHtml.indexOf('<div class="footnote">');
  if (fnStart !== -1) mainHtml = mainHtml.slice(0, fnStart);
  const copyStart = mainHtml.indexOf('<div class="copyright">');
  if (copyStart !== -1) mainHtml = mainHtml.slice(0, copyStart);

  // Remove footnote popup links: <a href="#FN..." class="notemark">...</a>
  mainHtml = mainHtml
    .replace(/<a[^>]*class="notemark"[^>]*>[\s\S]*?<\/a>/gi, '')
    .replace(/<ul[^>]*class="tnav"[^>]*>[\s\S]*?<\/ul>/gi, '')
    .replace(/<div[^>]*class="(?:mt\d*|c|s\d*|r|d|ms\d*)"[^>]*>[\s\S]*?<\/div>/gi, '');

  const verseRegex = /<span\s+class="verse"\s+id="V(\d+)">\d+(?:&nbsp;|\s)*<\/span>/gi;
  const matches = [...mainHtml.matchAll(verseRegex)];
  const verses = [];

  for (let i = 0; i < matches.length; i++) {
    const num = Number(matches[i][1]);
    const startIdx = matches[i].index + matches[i][0].length;
    const endIdx = i + 1 < matches.length ? matches[i + 1].index : mainHtml.length;
    const rawSegment = mainHtml.slice(startIdx, endIdx);
    const stripped = decodeEntities(rawSegment.replace(/<[^>]+>/g, ' '));
    if (stripped) {
      verses.push({ number: num, text: stripped });
    }
  }

  return {
    status: 200,
    body: {
      reference: `${book.name} ${chapter}`,
      translation: 'World English Bible (Updated)',
      language: 'English',
      license: 'Public domain (World English Bible)',
      sourceUrl,
      verses
    }
  };
}

export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const ref = url.searchParams.get('reference') || '';
    const result = await fetchAndParseEbible(ref);
    res.statusCode = result.status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.end(JSON.stringify(result.body));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Failed to load Scripture passage.' }));
  }
}
