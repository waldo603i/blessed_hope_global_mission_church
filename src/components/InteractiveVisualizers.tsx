import React, { useState } from 'react';
import { Language, ReferencePlateItem } from '../types/theology';
import { JESUS_IN_66_BOOKS } from '../data/bible66Books';
import { BIBLICAL_TYPOLOGY_16 } from '../data/typology16';
import { HEBREW_NAMES_OF_GOD_25, WHO_HE_IS_85_TITLES } from '../data/namesOfGod85';
import {
  BookOpen,
  Shield,
  Sparkles,
  Flame,
  Swords,
  HeartPulse,
  Scale,
  Compass,
  Clock,
  CheckCircle2,
  Search,
  ChevronRight,
  Cross,
  Crown,
  Eye,
  AlertTriangle,
} from 'lucide-react';

interface VisualizerProps {
  type: NonNullable<ReferencePlateItem['interactiveVisualizerType']>;
  lang: Language;
}

const DOCTRINES_11_LIST = [
  {
    num: 1,
    code: 'Theology Proper',
    greek: 'Θεός + λόγος',
    title: { en: 'Doctrine of God', tl: 'Doktrina ng Diyos', ilo: 'Doktrina ti Dios' },
    desc: {
      en: 'God’s existence, Triune nature, 21 attributes, and 25 covenant Hebrew names.',
      tl: 'Ang pag-iral ng Diyos, Trinidad, 21 katangian, at 25 pangalang Hebreo.',
      ilo: 'Ti kaadda ti Dios, Trinidad, 21 a kababalin, ken 25 a nagan a Hebreo.',
    },
    verse: 'Deuteronomy 6:4; Exodus 3:14',
  },
  {
    num: 2,
    code: 'Bibliology',
    greek: 'βιβλίον + λόγος',
    title: { en: 'Doctrine of the Bible', tl: 'Doktrina ng Bibliya', ilo: 'Doktrina ti Biblia' },
    desc: {
      en: 'Divine revelation, plenary verbal inspiration, inerrancy, canon, and preservation.',
      tl: 'Banal na kapahayagan, pagkakasulat sa kinasihan ng Diyos, at pag-iingat.',
      ilo: 'Nadiosan a pakaammo, pannakaisurat babaen ti paltiing ti Dios, ken pannakasaluad.',
    },
    verse: '2 Timothy 3:16–17; 2 Peter 1:20–21',
  },
  {
    num: 3,
    code: 'Christology',
    greek: 'Χριστός + λόγος',
    title: { en: 'Doctrine of Jesus Christ', tl: 'Doktrina ni Hesu-Kristo', ilo: 'Doktrina ni Jesu-Cristo' },
    desc: {
      en: 'Deity, Virgin Birth, sinless life, atoning death, bodily resurrection, and priesthood.',
      tl: 'Pagka-Diyos, kapanganakan sa birhen, kamatayan sa Krus, at pagkabuhay na mag-uli.',
      ilo: 'Kina-Dios, pannakayanak iti birhen, ipapatay idiay Krus, ken panagungar.',
    },
    verse: 'John 1:1, 14; Colossians 1:15–20',
  },
  {
    num: 4,
    code: 'Pneumatology',
    greek: 'πνεῦμα + λόγος',
    title: { en: 'Doctrine of the Holy Spirit', tl: 'Doktrina ng Banal na Espiritu', ilo: 'Doktrina ti Nasantuan nga Espiritu' },
    desc: {
      en: 'Personhood, deity, regeneration, indwelling, sealing, filling, fruit, and gifts.',
      tl: 'Persona, pagka-Diyos, pananahanan, pagkapuspos, bunga, at mga kaloob.',
      ilo: 'Persona, kina-Dios, panagtaeng, pannakapno, bunga, ken dagiti sagut.',
    },
    verse: 'John 14:16–17; Ephesians 5:18',
  },
  {
    num: 5,
    code: 'Angelology',
    greek: 'ἄγγελος + λόγος',
    title: { en: 'Doctrine of Angels', tl: 'Doktrina ng mga Anghel', ilo: 'Doktrina dagiti Anghel' },
    desc: {
      en: 'Created ministering spirits, cherubim, seraphim, and canonical archangels Michael & Gabriel.',
      tl: 'Mga nilikhang espiritung naglilingkod at sina Miguel at Gabriel.',
      ilo: 'Dagiti naparsua nga espiritu nga agserserbi ken da Miguel ken Gabriel.',
    },
    verse: 'Hebrews 1:14; Jude 1:9',
  },
  {
    num: 6,
    code: 'Demonology / Satanology',
    greek: 'δαίμων + λόγος',
    title: { en: 'Doctrine of Satan & Fallen Spirits', tl: 'Doktrina ni Satanas at mga Demonyo', ilo: 'Doktrina ni Satanas ken dagiti Sairo' },
    desc: {
      en: 'Origin of Lucifer, demonic strategies, spiritual warfare, and deliverance in Christ.',
      tl: 'Pinagmulan ni Lucifer, taktika ng kaaway, at tagumpay kay Kristo.',
      ilo: 'Nagtaudan ni Lucifer, taktika ti kabusor, ken balligi ken Cristo.',
    },
    verse: 'Ephesians 6:11–12; James 4:7',
  },
  {
    num: 7,
    code: 'Anthropology',
    greek: 'ἄνθρωπος + λόγος',
    title: { en: 'Doctrine of Man', tl: 'Doktrina ng Tao', ilo: 'Doktrina ti Tao' },
    desc: {
      en: 'Created in God’s image (Imago Dei) as spirit, soul, and body for God’s glory.',
      tl: 'Nilikha sa wangis ng Diyos bilang espiritu, kaluluwa, at katawan.',
      ilo: 'Naparsua iti ladawan ti Dios a kas espiritu, kararua, ken bagi.',
    },
    verse: 'Genesis 1:26–27; 1 Thessalonians 5:23',
  },
  {
    num: 8,
    code: 'Hamartiology',
    greek: 'ἁμαρτία + λόγος',
    title: { en: 'Doctrine of Sin', tl: 'Doktrina ng Kasalanan', ilo: 'Doktrina ti Basol' },
    desc: {
      en: 'The Fall, original and personal sin, missing God’s mark, and cure for backsliding.',
      tl: 'Ang pagbagsak ng tao, kasalanan, at lunas sa panlalamig o pagtalikod.',
      ilo: 'Ti pannakatnag ti tao, basol, ken agas ti panagsiasi.',
    },
    verse: 'Romans 3:23; Romans 5:12',
  },
  {
    num: 9,
    code: 'Soteriology',
    greek: 'σωτηρία + λόγος',
    title: { en: 'Doctrine of Salvation', tl: 'Doktrina ng Kaligtasan', ilo: 'Doktrina ti Pannakaisalakan' },
    desc: {
      en: 'Grace through faith: Justification (past), Sanctification (present), Glorification (future).',
      tl: 'Biyaya sa pamamagitan ng pananampalataya: Pagpaparinggan, Pagpapabanal, at Pagluwalhati.',
      ilo: 'Parabur babaen ti pammati: Pannakapalinteg, Pannakapasanto, ken Pannakapadayag.',
    },
    verse: 'Ephesians 2:8–9; Titus 2:11–13',
  },
  {
    num: 10,
    code: 'Ecclesiology',
    greek: 'ἐκκλησία + λόγος',
    title: { en: 'Doctrine of the Church', tl: 'Doktrina ng Iglesia', ilo: 'Doktrina ti Iglesia' },
    desc: {
      en: 'The Body and Bride of Christ, distinct from Israel, ordinances, and pastoral character.',
      tl: 'Ang Katawan at Nobya ni Kristo, mga ordenansa, at karakter ng lingkod.',
      ilo: 'Ti Bagi ken Nobia ni Cristo, dagiti ordenansa, ken kababalin ti adipen.',
    },
    verse: 'Matthew 16:18; Ephesians 1:22–23',
  },
  {
    num: 11,
    code: 'Eschatology',
    greek: 'ἔσχατος + λόγος',
    title: { en: 'Doctrine of Last Things', tl: 'Doktrina ng Huling Panahon', ilo: 'Doktrina ti Maudi a Panawen' },
    desc: {
      en: 'Rapture, Tribulation, Second Coming, 1,000-Year Millennium, Final Judgment & New Creation.',
      tl: 'Rapture, Kapighatian, Ikalawang Pagparito, Milenyo, Paghuhukom at Bagong Langit.',
      ilo: 'Rapture, Rigat, Maikadua nga Yaay, Milenio, Panangukom ken Baro a Langit.',
    },
    verse: '1 Thessalonians 4:16–17; Revelation 20–22',
  },
];

const SPIRITS_19_VS_18 = {
  godly: [
    { name: { en: '1. Spirit of God', tl: '1. Espiritu ng Diyos', ilo: '1. Espiritu ti Dios' }, ref: 'Genesis 1:2; 1 Cor 3:16' },
    { name: { en: '2. Spirit of the LORD', tl: '2. Espiritu ng Panginoon', ilo: '2. Espiritu ti Apo' }, ref: 'Isaiah 11:2; 2 Cor 3:17' },
    { name: { en: '3. Holy Spirit / Holy Ghost', tl: '3. Banal na Espiritu', ilo: '3. Nasantuan nga Espiritu' }, ref: 'Luke 11:13; Acts 1:8' },
    { name: { en: '4. Spirit of Truth', tl: '4. Espiritu ng Katotohanan', ilo: '4. Espiritu ti Kinapudno' }, ref: 'John 14:17; 16:13' },
    { name: { en: '5. Spirit of Holiness', tl: '5. Espiritu ng Kabanalan', ilo: '5. Espiritu ti Kinasanto' }, ref: 'Romans 1:4' },
    { name: { en: '6. Spirit of Life', tl: '6. Espiritu ng Buhay', ilo: '6. Espiritu ti Biag' }, ref: 'Romans 8:2' },
    { name: { en: '7. Spirit of Adoption', tl: '7. Espiritu ng Pagkukupkop', ilo: '7. Espiritu ti Pannakaampon' }, ref: 'Romans 8:15' },
    { name: { en: '8. Spirit of Christ', tl: '8. Espiritu ni Kristo', ilo: '8. Espiritu ni Cristo' }, ref: 'Romans 8:9; 1 Pet 1:11' },
    { name: { en: '9. Spirit of Wisdom', tl: '9. Espiritu ng Karunungan', ilo: '9. Espiritu ti Kinasirib' }, ref: 'Isaiah 11:2; Eph 1:17' },
    { name: { en: '10. Spirit of Understanding', tl: '10. Espiritu ng Kaunawaan', ilo: '10. Espiritu ti Pannakaawat' }, ref: 'Isaiah 11:2' },
    { name: { en: '11. Spirit of Counsel', tl: '11. Espiritu ng Payo', ilo: '11. Espiritu ti Patigmaan' }, ref: 'Isaiah 11:2' },
    { name: { en: '12. Spirit of Might / Power', tl: '12. Espiritu ng Kapangyarihan', ilo: '12. Espiritu ti Pannakabalin' }, ref: 'Isaiah 11:2; 2 Tim 1:7' },
    { name: { en: '13. Spirit of Knowledge', tl: '13. Espiritu ng Kaalaman', ilo: '13. Espiritu ti Pannakaammo' }, ref: 'Isaiah 11:2' },
    { name: { en: '14. Spirit of the Fear of the LORD', tl: '14. Espiritu ng Pagkatakot sa Panginoon', ilo: '14. Espiritu ti Panagbuteng iti Apo' }, ref: 'Isaiah 11:2' },
    { name: { en: '15. Spirit of Grace & Supplications', tl: '15. Espiritu ng Biyaya at Daing', ilo: '15. Espiritu ti Parabur kenAraraw' }, ref: 'Zechariah 12:10; Heb 10:29' },
    { name: { en: '16. Spirit of Glory', tl: '16. Espiritu ng Kaluwalhatian', ilo: '16. Espiritu ti Dayag' }, ref: '1 Peter 4:14' },
    { name: { en: '17. Eternal Spirit', tl: '17. Walang Hanggang Espiritu', ilo: '17. Agnanayon nga Espiritu' }, ref: 'Hebrews 9:14' },
    { name: { en: '18. Spirit of Love & Sound Mind', tl: '18. Espiritu ng Pag-ibig at Kahinahunan', ilo: '18. Espiritu ti Ayat ken Nasimbeng a Panunot' }, ref: '2 Timothy 1:7' },
    { name: { en: '19. Spirit of Prophecy', tl: '19. Espiritu ng Propesiya', ilo: '19. Espiritu ti Padto' }, ref: 'Revelation 19:10' },
  ],
  demonic: [
    { name: { en: '1. Spirit of Fear', tl: '1. Espiritu ng Katakutan', ilo: '1. Espiritu ti Buteng' }, ref: '2 Timothy 1:7' },
    { name: { en: '2. Spirit of Bondage', tl: '2. Espiritu ng Pagkaalipin', ilo: '2. Espiritu ti Pannakaadipen' }, ref: 'Romans 8:15' },
    { name: { en: '3. Spirit of Error', tl: '3. Espiritu ng Kamalian', ilo: '3. Espiritu ti Biddut' }, ref: '1 John 4:6' },
    { name: { en: '4. Spirit of Antichrist', tl: '4. Espiritu ng Anticristo', ilo: '4. Espiritu ti Anticristo' }, ref: '1 John 4:3' },
    { name: { en: '5. Spirit of Divination (Python)', tl: '5. Espiritu ng Panghuhula', ilo: '5. Espiritu ti Panagbuyon' }, ref: 'Acts 16:16' },
    { name: { en: '6. Spirit of Jealousy', tl: '6. Espiritu ng Panibugho', ilo: '6. Espiritu ti Imon' }, ref: 'Numbers 5:14' },
    { name: { en: '7. Spirit of Whoredoms', tl: '7. Espiritu ng Pakikiapid', ilo: '7. Espiritu ti Kinabalangkantis' }, ref: 'Hosea 4:12; 5:4' },
    { name: { en: '8. Spirit of Heaviness', tl: '8. Espiritu ng Kabigatan / Lungkot', ilo: '8. Espiritu ti Dagsen ti Nakem' }, ref: 'Isaiah 61:3' },
    { name: { en: '9. Spirit of Infirmity', tl: '9. Espiritu ng Kahinaan / Sakit', ilo: '9. Espiritu ti Kinakapuy' }, ref: 'Luke 13:11' },
    { name: { en: '10. Dumb & Deaf Spirit', tl: '10. Espiritung Pipi at Bingi', ilo: '10. Umel ken Tuleng nga Espiritu' }, ref: 'Mark 9:17, 25' },
    { name: { en: '11. Lying Spirit', tl: '11. Espiritung Sinungaling', ilo: '11. Ulbod nga Espiritu' }, ref: '1 Kings 22:22' },
    { name: { en: '12. Perverse Spirit', tl: '12. Masamang Espiritu ng Pagkalito', ilo: '12. Nakillo nga Espiritu' }, ref: 'Isaiah 19:14' },
    { name: { en: '13. Familiar Spirit (Necromancy)', tl: '13. Espiritu ng Mangkukulam', ilo: '13. Espiritu ti Mannamay' }, ref: 'Leviticus 20:27; Isa 8:19' },
    { name: { en: '14. Haughty Spirit (Pride)', tl: '14. Mapagmataas na Espiritu', ilo: '14. Natangsit nga Espiritu' }, ref: 'Proverbs 16:18' },
    { name: { en: '15. Spirit of Deep Sleep / Slumber', tl: '15. Espiritu ng Mahimbing na Pagkakatulog', ilo: '15. Espiritu ti Nargaan a Turog' }, ref: 'Isaiah 29:10; Rom 11:8' },
    { name: { en: '16. Seducing Spirits', tl: '16. MgaMapanghikayat na Espiritu', ilo: '16. Manangallilaw nga Espiritu' }, ref: '1 Timothy 4:1' },
    { name: { en: '17. Unclean / Foul Spirit', tl: '17. Karumal-dumal na Espiritu', ilo: '17. Narugit nga Espiritu' }, ref: 'Matthew 12:43; Mark 1:23' },
    { name: { en: '18. Spirit of the World', tl: '18. Espiritu ng Sanlibutan', ilo: '18. Espiritu ti Lubong' }, ref: '1 Corinthians 2:12' },
  ],
};

const MAN_OF_GOD_23_TRAITS = [
  { id: 1, ref: 'Matt 22:37', text: { en: 'Loves God supremely with all heart, soul, and mind', tl: 'Iniibig ang Diyos nang buong puso, kaluluwa, at isip', ilo: 'Ay-ayatenna ti Dios iti amin a puso, kararua, ken panunot' } },
  { id: 2, ref: 'Psalm 1:2', text: { en: 'Delights and meditates in Scripture day and night', tl: 'Nagbubulay sa Salita ng Diyos araw at gabi', ilo: 'Agmennamenna iti Sao ti Dios iti aldaw ken rabii' } },
  { id: 3, ref: '1 Thess 5:17', text: { en: 'Maintains a fervent secret prayer life', tl: 'May maningas at tapat na buhay-panalangin', ilo: 'Addaan napasnek ken matalek a kararag' } },
  { id: 4, ref: 'Micah 6:8', text: { en: 'Walks in genuine humility before God and men', tl: 'Lumalakad sa tunay na kapakumbabaan', ilo: 'Magna iti pudno a kinapakumbaba' } },
  { id: 5, ref: '2 Tim 2:22', text: { en: 'Flees youthful lusts and guards moral purity', tl: 'Tumatalikod sa kahalayan at nag-iingat ng kadalisayan', ilo: 'Adaywanna ti kinaderrep ken saluadanna ti kinadalus' } },
  { id: 6, ref: 'Prov 4:23', text: { en: 'Guards his heart, eyes, and tongue in private', tl: 'Iniingatan ang puso, mata, at dila kahit walang nakakakita', ilo: 'Saluadanna ti puso, mata, ken dilana uray iti nalimed' } },
  { id: 7, ref: 'Eph 5:25', text: { en: 'Loves his wife sacrificially as Christ loved the Church', tl: 'Iniibig ang asawa gaya ng pag-ibig ni Kristo sa Iglesia', ilo: 'Ay-ayatenna ti asawana a kas iti panagayat ni Cristo iti Iglesia' } },
  { id: 8, ref: 'Eph 6:4', text: { en: 'Shepherds his children in the nurture of the Lord', tl: 'Tinuturuan ang mga anak sa saway at aral ng Panginoon', ilo: 'Isurona dagiti annakna iti disiplina ken aral ti Apo' } },
  { id: 9, ref: '1 Tim 5:8', text: { en: 'Provides diligently and faithfully for his household', tl: 'Masipag na naglalaan para sa kanyang sambahayan', ilo: 'Nagaget a mangipaay iti kasapulan ti sangakabbalayanna' } },
  { id: 10, ref: '1 Tim 3:3', text: { en: 'Free from the love of money and covetousness', tl: 'Malaya sa pag-ibig sa salapi at kasakiman', ilo: ' nawaya manipud iti panagayat iti pirak ken kinaagum' } },
  { id: 11, ref: 'Titus 1:8', text: { en: 'Sober-minded, temperate, and self-controlled', tl: 'Mahinahon at may pagpipigil sa sarili', ilo: 'Nasimbeng ken addaan panagteppel' } },
  { id: 12, ref: '1 Tim 3:2', text: { en: 'Hospitable and generous to the needy', tl: 'Mapagpatuloy at bukas-palad sa nangangailangan', ilo: 'Managpadagus ken naparabur kadagiti agkasapulan' } },
  { id: 13, ref: '2 Tim 2:15', text: { en: 'Apt to teach and rightly divides the Word of Truth', tl: 'Bihasa sa pagtuturo at matuwid na nagbabahagi ng Salita', ilo: 'Nalaing a mangisuro ken umiso a mangbingay iti Sao' } },
  { id: 14, ref: 'Jude 1:3', text: { en: 'Contends earnestly for the faith without strife', tl: 'Nakikipaglaban para sa pananampalataya nang may kaamuan', ilo: 'Makidangadang para iti pammati a sikaamo' } },
  { id: 15, ref: 'Eph 4:32', text: { en: 'Quick to forgive and free from bitterness', tl: 'Madaling magpatawad at walang hinanakit', ilo: 'Nalaka a mamakawan ken awanan sakit ti nakem' } },
  { id: 16, ref: 'Eph 4:15', text: { en: 'Speaks the truth in love without flattery', tl: 'Nagsasalita ng katotohanan sa pag-ibig', ilo: 'Agsao iti kinapudno babaen iti ayat' } },
  { id: 17, ref: 'Prov 27:17', text: { en: 'Walks in godly accountability and receives correction', tl: 'Tumatanggap ng payo at nagpapasakop sa pananagutan', ilo: 'Umawat iti balakad ken agpasakup iti sungsungbatan' } },
  { id: 18, ref: '2 Tim 2:3', text: { en: 'Endures hardship as a good soldier of Jesus Christ', tl: 'Nagtitiis ng kahirapan bilang mabuting kawal ni Kristo', ilo: 'Agibtur iti rigat a kas naimbag a soldado ni Cristo' } },
  { id: 19, ref: 'Prov 11:30', text: { en: 'Passionate soul-winner who shares the Gospel', tl: 'Masigasig sa pagbabahagi ng Ebanghelyo sa mga kaluluwa', ilo: 'Naregta a mangiburay iti Ebanghelio kadagiti kararua' } },
  { id: 20, ref: 'Gal 1:10', text: { en: 'Fears God rather than seeking the applause of men', tl: 'Natatakot sa Diyos kaysa naghahangad ng papuri ng tao', ilo: 'Agbuteng iti Dios ngem iti pammadayaw ti tao' } },
  { id: 21, ref: 'Gal 5:22–23', text: { en: 'Manifests the 9-fold Fruit of the Holy Spirit', tl: 'Nagpapakita ng 9 na Bunga ng Banal na Espiritu', ilo: 'Mangipakita iti 9 a Bunga ti Nasantuan nga Espiritu' } },
  { id: 22, ref: '1 Tim 3:7', text: { en: 'Maintains a blameless testimony among outsiders', tl: 'May malinis na patotoo sa harap ng mga taga-labas', ilo: 'Addaan nadalus a pammaneknek kadagiti taga-ruar' } },
  { id: 23, ref: '2 Tim 4:7', text: { en: 'Finishes his course with joy and unswerving fidelity', tl: 'Tinatapos ang takbuhin nang tapat hanggang wakas', ilo: 'Leppasenna ti tarayna a simamatalek agingga iti panungpalan' } },
];

export const InteractiveVisualizer: React.FC<VisualizerProps> = ({ type, lang }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [testamentFilter, setTestamentFilter] = useState<'ALL' | 'OT' | 'NT'>('ALL');
  const [checkedTraits, setCheckedTraits] = useState<number[]>([1, 2, 3, 13, 19]);

  const toggleTrait = (id: number) => {
    setCheckedTraits((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 1. 11 DOCTRINES TEMPLE PILLARS
  if (type === 'doctrines-11') {
    const active = DOCTRINES_11_LIST[selectedIndex] || DOCTRINES_11_LIST[0];
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-slate-950/90 p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-5 w-5 text-amber-400" />
            <h4 className="font-serif text-lg font-bold text-amber-200">
              {lang === 'en'
                ? 'Interactive Temple of the 11 Major Christian Doctrines'
                : lang === 'tl'
                ? 'Interaktibong Templo ng 11 Pangunahing Doktrinang Kristiyano'
                : 'Interaktibo a Templo ti 11 a Kangrunaan a Doktrina Kristiano'}
            </h4>
          </div>
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
            Plate 01 • 2 Tim 3:16
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {DOCTRINES_11_LIST.map((doc, idx) => (
            <button
              key={doc.num}
              onClick={() => setSelectedIndex(idx)}
              className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition-all ${
                selectedIndex === idx
                  ? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-500/10'
                  : 'border-slate-800 bg-slate-900/70 hover:border-amber-500/40'
              }`}
            >
              <span className="text-[11px] font-bold text-amber-400">#{doc.num}</span>
              <span className="line-clamp-1 font-serif text-xs font-bold text-white">
                {doc.code}
              </span>
              <span className="line-clamp-1 text-[11px] text-slate-400">{doc.title[lang]}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Pillar #{active.num} • {active.greek}
              </span>
              <h5 className="font-serif text-xl font-bold text-white">
                {active.code} — {active.title[lang]}
              </h5>
            </div>
            <span className="rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-1 font-mono text-xs text-amber-200">
              {active.verse}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">{active.desc[lang]}</p>
        </div>
      </div>
    );
  }

  // 2. HERMENEUTICS 5 STEPS & KINGDOM VS GRACE
  if (type === 'hermeneutics-5' || type === 'kingdom-vs-grace' || type === 'bible-stats' || type === 'manuscripts-8') {
    const steps = [
      {
        step: '1. Observation',
        q: { en: 'What does the text say?', tl: 'Ano ang sinasabi ng talata?', ilo: 'Ania ti ibagbaga ti teksto?' },
        detail: {
          en: 'Examine words, grammar, speaker, audience, and repeated key phrases carefully.',
          tl: 'Suriing mabuti ang mga salita, balarila, nagsasalita, kausap, at inuulit na salita.',
          ilo: 'Sukimaten a nasayaat dagiti sasao, gramatika, agsasao, kasarsarita, ken maulit-ulit a sasao.',
        },
      },
      {
        step: '2. Context',
        q: { en: 'What is the surrounding context?', tl: 'Ano ang konteksto sa paligid?', ilo: 'Ania ti konteksto iti aglawlawna?' },
        detail: {
          en: 'Never pull a verse out of context; read the chapter, book, and covenant dispensation.',
          tl: 'Huwag kumuha ng talata nang labas sa konteksto; basahin ang buong kabanata at aklat.',
          ilo: 'Saan a mangala iti bersikulo a naisina iti konteksto; basaen ti sibubukel a kapitulo ken libro.',
        },
      },
      {
        step: '3. Interpretation',
        q: { en: 'What does the text mean?', tl: 'Ano ang kahulugan ng talata?', ilo: 'Ania ti kayat a sawen ti teksto?' },
        detail: {
          en: 'Let Scripture interpret Scripture (Analogy of Faith), comparing spiritual things with spiritual.',
          tl: 'Hayaang ang Bibliya ang magpaliwanag sa Bibliya sa tulong ng Banal na Espiritu.',
          ilo: 'Bay-an a ti Biblia ti mangilawlawag iti Biblia babaen ti tulong ti Nasantuan nga Espiritu.',
        },
      },
      {
        step: '4. Correlation',
        q: { en: 'How does it point to Christ?', tl: 'Paano nito itinuturo si Kristo?', ilo: 'Kasano nga itudona ni Cristo?' },
        detail: {
          en: 'Connect Old Testament shadows with New Testament fulfillment in Jesus Christ (Luke 24:27).',
          tl: 'Iugnay ang mga anino sa Lumang Tipan sa katuparan nito kay Hesu-Kristo (Lucas 24:27).',
          ilo: 'Isilpo dagiti anniniwan iti Daan a Tulag iti pannakatungpalna ken Jesu-Cristo (Lucas 24:27).',
        },
      },
      {
        step: '5. Application',
        q: { en: 'How must I obey this today?', tl: 'Paano ko ito isasabuhay ngayon?', ilo: 'Kasano a tungpalek daytoy ita nga aldaw?' },
        detail: {
          en: 'Be doers of the Word and not hearers only (James 1:22): confess sin, claim promises, obey commands.',
          tl: 'Maging tagatupad ng Salita at hindi tagapakinig lamang (Santiago 1:22).',
          ilo: 'Agbalin a managtungpal iti Sao ken saan a managdengngeg laeng (Santiago 1:22).',
        },
      },
    ];
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-slate-950/90 p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-amber-400" />
            <h4 className="font-serif text-lg font-bold text-amber-200">
              {lang === 'en'
                ? '5-Step Biblical Hermeneutics & Rightly Dividing the Word (2 Tim 2:15)'
                : lang === 'tl'
                ? '5-Hakbang sa Pag-aaral ng Bibliya at Matuwid na Pagbabahagi ng Salita'
                : '5-Addang iti Panagadal iti Biblia ken Umiso a Panangbingay iti Sao'}
            </h4>
          </div>
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
            Plates 02–05
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-5">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="rounded-xl border border-amber-500/20 bg-slate-900/80 p-3.5 transition hover:border-amber-400"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                  STEP {i + 1}
                </span>
                <ChevronRight className="h-4 w-4 text-amber-400/60" />
              </div>
              <h5 className="font-serif text-sm font-bold text-white">{s.step}</h5>
              <p className="mt-1 text-xs font-semibold text-amber-300">{s.q[lang]}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{s.detail[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. JESUS IN ALL 66 BOOKS INTERACTIVE EXPLORER
  if (type === 'jesus-66-books') {
    const filtered = JESUS_IN_66_BOOKS.filter((b) => {
      const matchTestament = testamentFilter === 'ALL' || b.testament === testamentFilter;
      const q = searchQuery.toLowerCase();
      const matchQuery =
        !q ||
        b.bookName.en.toLowerCase().includes(q) ||
        b.bookName.tl.toLowerCase().includes(q) ||
        b.bookName.ilo.toLowerCase().includes(q) ||
        b.christTitle.en.toLowerCase().includes(q) ||
        b.christTitle.tl.toLowerCase().includes(q) ||
        b.christTitle.ilo.toLowerCase().includes(q) ||
        b.keyVerse.toLowerCase().includes(q);
      return matchTestament && matchQuery;
    });

    return (
      <div className="rounded-2xl border border-amber-500/30 bg-slate-950/90 p-5 shadow-2xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-400" />
            <h4 className="font-serif text-lg font-bold text-amber-200">
              {lang === 'en'
                ? 'Interactive Christological Explorer: Jesus in All 66 Books (Plate 06)'
                : lang === 'tl'
                ? 'Si Hesu-Kristo sa Lahat ng 66 na Aklat ng Bibliya (Plate 06)'
                : 'Ni Jesu-Cristo iti Amin nga 66 a Libro ti Biblia (Plate 06)'}
            </h4>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(['ALL', 'OT', 'NT'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTestamentFilter(tf)}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                  testamentFilter === tf
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tf === 'ALL' ? 'All 66' : tf === 'OT' ? 'Old Testament (39)' : 'New Testament (27)'}
              </button>
            ))}
            <div className="relative">
              <Search className=" absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter 66 books..."
                className="rounded-lg border border-slate-700 bg-slate-900 py-1 pl-8 pr-3 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid max-h-96 grid-cols-1 gap-2.5 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.bookNumber}
              className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-3 transition hover:border-amber-500/40"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono font-bold text-amber-400">
                    Book #{item.bookNumber} ({item.testament})
                  </span>
                  <span>{item.category}</span>
                </div>
                <h5 className="mt-0.5 font-serif text-sm font-bold text-white">
                  {item.bookName[lang]}
                </h5>
                <p className="mt-1 text-xs font-semibold text-amber-300">
                  “{item.christTitle[lang]}”
                </p>
              </div>
              <span className="mt-2 inline-block self-start rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">
                {item.keyVerse}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4. SHIELD OF THE TRINITY & ECONOMIC TRINITY SALVATION
  if (type === 'trinity-shield' || type === 'trinity-salvation') {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-slate-950/90 p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-400" />
            <h4 className="font-serif text-lg font-bold text-amber-200">
              {lang === 'en'
                ? 'Interactive Shield of the Trinity (Scutum Fidei) & Triune Redemption (Plates 12–13)'
                : lang === 'tl'
                ? 'Kalasag ng Banal na Trinidad at Ang Gawain ng Ama, Anak at Espiritu (Plates 12–13)'
                : 'Kalasag ti Nasantuan a Trinidad ken Ti Aramid ti Ama, Anak ken Espiritu (Plates 12–13)'}
            </h4>
          </div>
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
            Eph 2:18 • 1 Pet 1:2
          </span>
        </div>

        <div className="grid items-center gap-6 lg:grid-cols-2">
          {/* Animated SVG Shield of the Trinity */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-amber-500/20 bg-slate-900/60 p-4">
            <svg viewBox="0 0 400 340" className="h-64 w-full max-w-md">
              <defs>
                <radialGradient id="deusGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="185" r="75" fill="url(#deusGlow)" />
              {/* Outer NON EST triangle lines */}
              <line x1="200" y1="50" x2="75" y2="275" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 4" />
              <line x1="200" y1="50" x2="325" y2="275" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 4" />
              <line x1="75" y1="275" x2="325" y2="275" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 4" />
              {/* Inner EST spokes to DEUS */}
              <line x1="200" y1="50" x2="200" y2="185" stroke="#fbbf24" strokeWidth="4" />
              <line x1="75" y1="275" x2="200" y2="185" stroke="#fbbf24" strokeWidth="4" />
              <line x1="325" y1="275" x2="200" y2="185" stroke="#fbbf24" strokeWidth="4" />

              {/* Labels on spokes */}
              <text x="200" y="122" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold">EST (IS)</text>
              <text x="132" y="225" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold">EST (IS)</text>
              <text x="268" y="225" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold">EST (IS)</text>

              <text x="118" y="155" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">NON EST</text>
              <text x="282" y="155" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">NON EST</text>
              <text x="200" y="295" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">NON EST (IS NOT)</text>

              {/* Center DEUS node */}
              <circle cx="200" cy="185" r="36" fill="#0f172a" stroke="#fbbf24" strokeWidth="3" />
              <text x="200" y="182" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">DEUS</text>
              <text x="200" y="196" textAnchor="middle" fill="#e2e8f0" fontSize="9">ONE GOD</text>

              {/* Top Node: PATER */}
              <circle cx="200" cy="50" r="32" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="200" y="48" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">PATER</text>
              <text x="200" y="61" textAnchor="middle" fill="#cbd5e1" fontSize="9">FATHER</text>

              {/* Bottom Left: FILIUS */}
              <circle cx="75" cy="275" r="32" fill="#1e293b" stroke="#f43f5e" strokeWidth="2.5" />
              <text x="75" y="273" textAnchor="middle" fill="#fb7185" fontSize="11" fontWeight="bold">FILIUS</text>
              <text x="75" y="286" textAnchor="middle" fill="#cbd5e1" fontSize="9">SON</text>

              {/* Bottom Right: SPIRITUS */}
              <circle cx="325" cy="275" r="32" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" />
              <text x="325" y="273" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">SPIRITUS</text>
              <text x="325" y="286" textAnchor="middle" fill="#cbd5e1" fontSize="9">SPIRIT</text>
            </svg>
            <p className="text-center text-xs text-slate-400">
              “For THROUGH Him [Son] we both have access BY one Spirit unto the FATHER.” — Ephesians 2:18
            </p>
          </div>

          {/* Economic Trinity in Salvation */}
          <div className="space-y-3">
            <div className="rounded-xl border border-sky-500/30 bg-sky-950/30 p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-sky-300">
                  1. GOD THE FATHER — The Architect of Salvation
                </span>
                <span className="font-mono text-xs text-sky-200">John 3:16; Eph 1:4</span>
              </div>
              <p className="mt-1 text-xs text-slate-200">
                {lang === 'en'
                  ? 'Loved the world, purposed redemption before the foundation of the world, and sent His Beloved Son.'
                  : lang === 'tl'
                  ? 'Umibig sa sanlibutan, nagplano ng katubusan bago pa itatag ang sanlibutan, at nagsugo sa Kanyang Anak.'
                  : 'Inayatna ti lubong, nagplano iti pannakasubbot sakbay a nabangon ti lubong, ken nangibaon iti Anakna.'}
              </p>
            </div>

            <div className="rounded-xl border border-rose-500/30 bg-rose-950/30 p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-rose-300">
                  2. GOD THE SON — The Accomplisher of Salvation
                </span>
                <span className="font-mono text-xs text-rose-200">John 19:30; Eph 1:7</span>
              </div>
              <p className="mt-1 text-xs text-slate-200">
                {lang === 'en'
                  ? 'Took on flesh, lived a sinless life, shed His blood on Calvary, rose bodily, and intercedes as High Priest.'
                  : lang === 'tl'
                  ? 'Nagkatawang-tao, nagbuhos ng Kanyang dugo sa Kalbaryo, nabuhay na mag-uli, at namamagitan bilang Dakilang Saserdote.'
                  : 'Naglasag, nangibukbok iti darana idiay Kalbario, nagungar, ken mangibabaet a kas Nangato a Padi.'}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-emerald-300">
                  3. GOD THE HOLY SPIRIT — The Applicator of Salvation
                </span>
                <span className="font-mono text-xs text-emerald-200">John 3:5; Eph 1:13</span>
              </div>
              <p className="mt-1 text-xs text-slate-200">
                {lang === 'en'
                  ? 'Convicts of sin, regenerates the dead spirit, baptizes into Christ’s Body, and seals unto the Day of Redemption.'
                  : lang === 'tl'
                  ? 'Sumusumbat sa kasalanan, nagbibigay-buhay na espirituwal, at nagtatatak sa atin hanggang sa Araw ng Katubusan.'
                  : 'Mangkombinsir iti basol, mangpabiag iti espiritu, ken mangselio kadatayo agingga iti Aldaw ti Pannakasubbot.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. 25 HEBREW NAMES OF GOD EXPLORER
  if (type === 'names-god' || type === 'attributes-god') {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-slate-950/90 p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <h4 className="font-serif text-lg font-bold text-amber-200">
              {lang === 'en'
                ? 'Interactive Sanctuary of the 25 Covenant Hebrew Names of God (Plates 10–11)'
                : lang === 'tl'
                ? 'Ang 25 Makapangyarihang Pangalang Hebreo ng Diyos (Plates 10–11)'
                : 'Ti 25 a Nabileg a Nagan a Hebreo ti Dios (Plates 10–11)'}
            </h4>
          </div>
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
            Proverbs 18:10
          </span>
        </div>

        <div className="grid max-h-96 grid-cols-1 gap-2.5 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
          {HEBREW_NAMES_OF_GOD_25.map((n) => (
            <div
              key={n.id}
              className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 transition hover:border-amber-400/50"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-amber-300">
                  #{n.id} {n.hebrewTranslit}
                </span>
                <span className="font-mono text-xs text-amber-200/80">{n.scripture}</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-white">{n.meaning[lang]}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
                {n.pastoralNote[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 6. 16 BIBLICAL TYPOLOGIES MATRIX
  if (type === 'typology-matrix') {
    const activeType = BIBLICAL_TYPOLOGY_16[selectedIndex] || BIBLICAL_TYPOLOGY_16[0];
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-slate-950/90 p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Cross className="h-5 w-5 text-amber-400" />
            <h4 className="font-serif text-lg font-bold text-amber-200">
              {lang === 'en'
                ? '16 Biblical Typologies: Old Testament Shadows → New Testament Christ Fulfillment'
                : lang === 'tl'
                ? '16 na Tipolohiya sa Bibliya: Anino sa Lumang Tipan → Katuparan kay Kristo'
                : '16 a Tipolohia iti Biblia: Anniniwan iti Daan a Tulag → Pannakatungpal ken Cristo'}
            </h4>
          </div>
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
            Plates 14–15 • Col 2:17
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {BIBLICAL_TYPOLOGY_16.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setSelectedIndex(idx)}
              className={`rounded-xl border p-2.5 text-left text-xs transition ${
                selectedIndex === idx
                  ? 'border-amber-400 bg-amber-500/20 text-white'
                  : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-amber-500/40'
              }`}
            >
              <span className="font-bold text-amber-400">#{t.id} </span>
              <span className="line-clamp-1 font-semibold">{t.otType[lang]}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-4 rounded-xl border border-amber-500/30 bg-slate-900/90 p-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-700 bg-slate-950/80 p-3.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              OLD TESTAMENT SHADOW (Τύπος) • {activeType.otScripture}
            </span>
            <h5 className="mt-1 font-serif text-base font-bold text-amber-200">
              {activeType.otType[lang]}
            </h5>
          </div>
          <div className="rounded-lg border border-amber-500/40 bg-amber-950/30 p-3.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              NEW TESTAMENT SUBSTANCE IN CHRIST (Ἀντίτυπος) • {activeType.ntScripture}
            </span>
            <h5 className="mt-1 font-serif text-base font-bold text-white">
              {activeType.ntFulfillment[lang]}
            </h5>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm leading-relaxed text-slate-200">
              {activeType.explanation[lang]}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 7. 85 TITLES OF CHRIST & LIFE TIMELINE
  if (type === 'names-christ-85' || type === 'jesus-life-timeline') {
    const filtered85 = WHO_HE_IS_85_TITLES.filter(
      (item) =>
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.titleTl.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.titleIlo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.scripture.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-slate-950/90 p-5 shadow-2xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-400" />
            <h4 className="font-serif text-lg font-bold text-amber-200">
              {lang === 'en'
                ? '“Who He Is” — All 85 Scriptural Names & Titles of Jesus Christ (Plates 17–18)'
                : lang === 'tl'
                ? '“Kung Sino Siya” — Lahat ng 85 Pangalan at Titulo ni Hesu-Kristo (Plates 17–18)'
                : '“No Asino Isuna” — Amin nga 85 a Nagan ken Titulo ni Jesu-Cristo (Plates 17–18)'}
            </h4>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 85 titles of Christ..."
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-white focus:border-amber-400 focus:outline-none"
          />
        </div>
        <div className="grid max-h-80 grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 md:grid-cols-3">
          {filtered85.map((item) => {
            const localizedTitle =
              lang === 'en' ? item.title : lang === 'tl' ? item.titleTl : item.titleIlo;
            return (
              <div
                key={item.num}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs hover:border-amber-500/40"
              >
                <div>
                  <span className="mr-1.5 font-mono text-[10px] text-amber-400">#{item.num}</span>
                  <span className="font-semibold text-white">{localizedTitle}</span>
                </div>
                <span className="ml-2 shrink-0 font-mono text-[10px] text-amber-300">
                  {item.scripture}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 8. HOLY SPIRIT FILLING & 19 VS 18 SPIRITS DISCERNMENT
  if (type === 'holy-spirit-filling' || type === 'spirit-ministry-5' || type === 'spirits-discernment') {
    return (
      <div className="rounded-2xl border border-sky-500/30 bg-slate-950/90 p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-sky-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-sky-400" />
            <h4 className="font-serif text-lg font-bold text-sky-200">
              {lang === 'en'
                ? 'Biblical Discernment Matrix: 19 Spirits of God vs. 18 Spirits of Devils (Plate 22 • 1 John 4:1)'
                : lang === 'tl'
                ? 'Pagkilala sa Espiritu: 19 na Espiritu ng Diyos Laban sa 18 Espiritu ng Demonyo (Plate 22)'
                : 'Panangilasin kadagiti Espiritu: 19 nga Espiritu ti Dios Kontra 18 nga Espiritu ti Sairo (Plate 22)'}
            </h4>
          </div>
          <span className="rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-300">
            1 John 4:1–6
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3.5">
            <h5 className="mb-2.5 font-serif text-sm font-bold text-emerald-300">
              ✓ 19 Biblical Operations & Titles of the Spirit of God
            </h5>
            <div className="max-h-72 space-y-1.5 overflow-y-auto pr-1">
              {SPIRITS_19_VS_18.godly.map((s) => (
                <div
                  key={s.ref + s.name.en}
                  className="flex items-center justify-between rounded-lg bg-slate-900/80 px-2.5 py-1.5 text-xs"
                >
                  <span className="font-medium text-emerald-100">{s.name[lang]}</span>
                  <span className="font-mono text-[10px] text-emerald-400">{s.ref}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-3.5">
            <h5 className="mb-2.5 font-serif text-sm font-bold text-rose-300">
              ✕ 18 Demonic / Fallen Spirits Exposed in Scripture
            </h5>
            <div className="max-h-72 space-y-1.5 overflow-y-auto pr-1">
              {SPIRITS_19_VS_18.demonic.map((s) => (
                <div
                  key={s.ref + s.name.en}
                  className="flex items-center justify-between rounded-lg bg-slate-900/80 px-2.5 py-1.5 text-xs"
                >
                  <span className="font-medium text-rose-100">{s.name[lang]}</span>
                  <span className="font-mono text-[10px] text-rose-400">{s.ref}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 9. ARCHANGELS CANONICAL VS APOCRYPHAL & SPIRITUAL WARFARE
  if (
    type === 'archangels-canonical' ||
    type === 'devil-20-names' ||
    type === 'deliverance-4-steps' ||
    type === 'last-day-deceptions'
  ) {
    const deceptions = [
      {
        lie: { en: 'Lie #1: “I am a good person, so I’ll go to heaven.”', tl: 'Kasinungalingan #1: “Mabait naman ako kaya maliligtas ako.”', ilo: 'Kinaulbod #1: “Nasingpetak met isunga maisalakanak.”' },
        truth: 'IT IS WRITTEN: Romans 3:10, 23 & Ephesians 2:8–9 — Not of works, lest any man should boast!',
      },
      {
        lie: { en: 'Lie #2: “All religions lead to the same God.”', tl: 'Kasinungalingan #2: “Lahat ng relihiyon ay patungo sa iisang Diyos.”', ilo: 'Kinaulbod #2: “Amin a relihion ket agturong iti maymaysa a Dios.”' },
        truth: 'IT IS WRITTEN: John 14:6 & Acts 4:12 — Jesus alone is the Way, the Truth, and the Life!',
      },
      {
        lie: { en: 'Lie #3: “Grace gives me a license to continue in sin.”', tl: 'Kasinungalingan #3: “Ligtas na ako sa biyaya kaya puwede nang magkasala.”', ilo: 'Kinaulbod #3: “Naisalakanakon iti parabur isunga mabalin latta ti agbasol.”' },
        truth: 'IT IS WRITTEN: Romans 6:1–2 & Titus 2:11–12 — God forbid! Grace teaches us to deny ungodliness!',
      },
      {
        lie: { en: 'Lie #4: “Secret sins won’t hurt anyone.”', tl: 'Kasinungalingan #4: “Walang masama sa lihim na kasalanan.”', ilo: 'Kinaulbod #4: “Awan dakesna ti nalimed a basol.”' },
        truth: 'IT IS WRITTEN: Numbers 32:23 & Galatians 6:7 — Be sure your sin will find you out!',
      },
      {
        lie: { en: 'Lie #5: “You have plenty of time to repent tomorrow.”', tl: 'Kasinungalingan #5: “Marami ka pang oras para magsisi bukas.”', ilo: 'Kinaulbod #5: “Adu pay ti panawenmo nga agbabawi inton bigat.”' },
        truth: 'IT IS WRITTEN: 2 Corinthians 6:2 & Hebrews 3:15 — Behold, NOW is the day of salvation!',
      },
      {
        lie: { en: 'Lie #6: “Your sin is too great for God to forgive.”', tl: 'Kasinungalingan #6: “Masyadong malaki ang kasalanan mo para patawarin.”', ilo: 'Kinaulbod #6: “Dadakkel unay ti basolmo tapno mapakawan.”' },
        truth: 'IT IS WRITTEN: Isaiah 1:18 & 1 John 1:7 — The blood of Jesus Christ cleanseth us from ALL sin!',
      },
    ];
    return (
      <div className="rounded-2xl border border-rose-500/30 bg-slate-950/90 p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-rose-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Swords className="h-5 w-5 text-rose-400" />
            <h4 className="font-serif text-lg font-bold text-rose-200">
              {lang === 'en'
                ? 'Spiritual Warfare Armory: Canonical Angels & Countering Deceptions with “IT IS WRITTEN”'
                : lang === 'tl'
                ? 'Sandatahang Espirituwal: Kanonikal na Anghel at Pagsagot ng “NASUSULAT” (Plates 23–26)'
                : 'Naespirituan nga Igam: Kanonikal nga Anghel ken Panangsungbat iti “ADDA A NAISURAT”'}
            </h4>
          </div>
          <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-300">
            Matt 4:4 • Eph 6:17
          </span>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3">
            <span className="text-xs font-bold uppercase text-emerald-400">
              ✓ CANONICAL ARCHANGEL & MESSENGER (66 Books)
            </span>
            <p className="mt-1 text-xs text-slate-200">
              <strong>1. MICHAEL</strong> (“Who is like God?” — Jude 1:9; Dan 10:13; 12:1; Rev 12:7) &{' '}
              <strong>2. GABRIEL</strong> (“God is my strength” — Dan 8:16; 9:21; Luke 1:19, 26).
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3">
            <span className="text-xs font-bold uppercase text-amber-400">
              ⚠ NON-CANONICAL / APOCRYPHAL NAMES (Outside 66 Books)
            </span>
            <p className="mt-1 text-xs text-slate-200">
              Raphael (Tobit 12:15), Uriel, Raguel, Zerachiel, Remiel (1 Enoch 20). Never pray to or worship angels (Col 2:18; Rev 22:8–9)!
            </p>
          </div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {deceptions.map((d, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <p className="text-xs font-semibold text-rose-300">{d.lie[lang]}</p>
              <p className="mt-1.5 font-mono text-xs font-bold text-emerald-300">⚔ {d.truth}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 10. BACKSLIDING CURE OR 3 PHASES OF SALVATION
  if (type === 'backsliding-cure' || type === 'salvation-3-phases') {
    const phases = [
      {
        phase: 'PHASE I: JUSTIFICATION',
        tense: { en: 'PAST TENSE (Positional)', tl: 'NAKARAAN (Posisyonal)', ilo: 'NAPALABAS (Posisional)' },
        deliverance: { en: 'Saved from the PENALTY of Sin', tl: 'Ligtas sa PARUSA ng Kasalanan', ilo: 'Naisalakan iti DUSA ti Basol' },
        aspect: { en: 'In the SPIRIT (Born Again)', tl: 'Sa ESPIRITU (Ipinanganak na Muli)', ilo: 'Iti ESPIRITU (Naipasngay Manen)' },
        scripture: 'Titus 2:11; Romans 5:1; 8:1; Ephesians 2:8–9',
        color: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300',
      },
      {
        phase: 'PHASE II: SANCTIFICATION',
        tense: { en: 'PRESENT TENSE (Progressive)', tl: 'KASALUKUYAN (Progresibo)', ilo: 'AGDAMA (Agtultuloy)' },
        deliverance: { en: 'Saved from the POWER of Sin', tl: 'Ligtas sa KAPANGYARIHAN ng Kasalanan', ilo: 'Naisalakan iti PANNAKABALIN ti Basol' },
        aspect: { en: 'In the SOUL (Mind/Will Renewed)', tl: 'Sa KALULUWA (Binabagong Isip)', ilo: 'Iti KARARUA (Mapabaro a Panunot)' },
        scripture: 'Titus 2:12; Romans 6:14; 12:1–2; 2 Cor 3:18',
        color: 'border-sky-500/40 bg-sky-950/30 text-sky-300',
      },
      {
        phase: 'PHASE III: GLORIFICATION',
        tense: { en: 'FUTURE TENSE (Ultimate)', tl: 'HINAHARAP (Ganap)', ilo: 'MASAKBAYAN (Naan-anay)' },
        deliverance: { en: 'Saved from the PRESENCE of Sin', tl: 'Ligtas sa PRESENSYA ng Kasalanan', ilo: 'Naisalakan iti PRESENSIA ti Basol' },
        aspect: { en: 'In the BODY (Resurrection/Rapture)', tl: 'Sa KATAWAN (Niluwalhating Katawan)', ilo: 'Iti BAGI (Napadayag a Bagi)' },
        scripture: 'Titus 2:13; Romans 8:23, 30; Philippians 3:20–21',
        color: 'border-amber-500/40 bg-amber-950/30 text-amber-300',
      },
    ];
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-slate-950/90 p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-emerald-500/20 pb-3">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-emerald-400" />
            <h4 className="font-serif text-lg font-bold text-emerald-200">
              {lang === 'en'
                ? 'The 3-Phase Soteriological Matrix & Restoration Architecture (Plates 27–29)'
                : lang === 'tl'
                ? 'Ang 3 Yugto ng Kaligtasan: Espiritu, Kaluluwa at Katawan (Plates 27–29)'
                : 'Ti 3 a Tukad ti Pannakaisalakan: Espiritu, Kararua ken Bagi (Plates 27–29)'}
            </h4>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
            Titus 2:11–13 • 1 Thess 5:23
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {phases.map((p) => (
            <div key={p.phase} className={`rounded-xl border p-4 ${p.color}`}>
              <span className="text-xs font-bold uppercase tracking-wider">{p.tense[lang]}</span>
              <h5 className="mt-1 font-serif text-lg font-bold text-white">{p.phase}</h5>
              <p className="mt-2 text-sm font-semibold">{p.deliverance[lang]}</p>
              <p className="mt-1 text-xs text-slate-200">{p.aspect[lang]}</p>
              <p className="mt-3 rounded bg-slate-950/60 px-2.5 py-1 font-mono text-[11px] text-slate-300">
                {p.scripture}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 11. MAN OF GOD 23 TRAITS SELF-EXAMINATION CHECKLIST
  if (type === 'man-of-god-23' || type === 'israel-4000-years') {
    const pct = Math.round((checkedTraits.length / MAN_OF_GOD_23_TRAITS.length) * 100);
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-slate-950/90 p-5 shadow-2xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-amber-400" />
            <h4 className="font-serif text-lg font-bold text-amber-200">
              {lang === 'en'
                ? 'Interactive 23-Trait “Man of God” Consecration Mirror (Plate 31 • 1 Tim 6:11)'
                : lang === 'tl'
                ? '23 Katangian ng Tunay na Lingkod ng Diyos — Pagsusuri sa Sarili (Plate 31)'
                : '23 a Kababalin ti Pudno a Tao ti Dios — Panangsukimat iti Bagi (Plate 31)'}
            </h4>
          </div>
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300">
            {checkedTraits.length} / 23 Active ({pct}%)
          </span>
        </div>

        <div className="grid max-h-80 grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
          {MAN_OF_GOD_23_TRAITS.map((trait) => {
            const isChecked = checkedTraits.includes(trait.id);
            return (
              <button
                key={trait.id}
                onClick={() => toggleTrait(trait.id)}
                className={`flex items-center justify-between rounded-xl border p-2.5 text-left text-xs transition ${
                  isChecked
                    ? 'border-emerald-500/50 bg-emerald-950/30 text-white'
                    : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      isChecked ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isChecked ? '✓' : trait.id}
                  </span>
                  <span>{trait.text[lang]}</span>
                </div>
                <span className="ml-2 shrink-0 font-mono text-[10px] text-amber-300">
                  {trait.ref}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 12. ESCHATOLOGY VISUALIZERS (7,000 YEARS, RAPTURE VS SECOND COMING, JUDGMENT DAY)
  return (
    <div className="rounded-2xl border border-purple-500/30 bg-slate-950/90 p-5 shadow-2xl">
      <div className="mb-4 flex items-center justify-between border-b border-purple-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-purple-400" />
          <h4 className="font-serif text-lg font-bold text-purple-200">
            {lang === 'en'
              ? 'Prophetic Panorama: 7,000-Year Plan, Two-Stage Return & Final Judgment (Plates 32–40)'
              : lang === 'tl'
              ? 'Propetikong Panorama: 7,000-Taong Plano, Rapture at Araw ng Paghuhukom (Plates 32–40)'
              : 'Naimpadtoan a Panorama: 7,000-Tawen a Plano, Rapture ken Aldaw ti Panangukom (Plates 32–40)'}
          </h4>
        </div>
        <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-300">
          2 Pet 3:8 • 1 Thess 4:16 • Rev 20
        </span>
      </div>

      {/* 7,000 Year Bar */}
      <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {[
          { day: 'Day 1–2', yrs: '4000–2000 BC', label: 'Creation to Abraham' },
          { day: 'Day 3–4', yrs: '2000 BC–33 AD', label: 'Abraham to Calvary' },
          { day: 'Day 5–6', yrs: '33 AD–Present', label: 'Church Age of Grace' },
          { day: 'Rapture', yrs: '1 Thess 4:16–17', label: 'Caught Up in the Air' },
          { day: '7 Years', yrs: 'Daniel 9:27', label: 'Great Tribulation' },
          { day: 'Day 7 (1,000 Yrs)', yrs: 'Rev 20:1–6', label: 'Millennial Sabbath Reign' },
          { day: 'Eternity', yrs: 'Rev 21–22', label: 'New Heaven & New Earth' },
        ].map((epoch, i) => (
          <div
            key={epoch.day}
            className={`rounded-xl border p-2.5 text-center ${
              i === 5
                ? 'border-amber-400 bg-amber-500/20'
                : 'border-purple-500/30 bg-slate-900/80'
            }`}
          >
            <div className="text-[11px] font-bold text-purple-300">{epoch.day}</div>
            <div className="mt-0.5 font-serif text-xs font-bold text-white">{epoch.label}</div>
            <div className="mt-1 font-mono text-[10px] text-slate-400">{epoch.yrs}</div>
          </div>
        ))}
      </div>

      {/* Rapture vs Second Coming & Bema vs Great White Throne */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-3.5">
          <div className="flex items-center gap-2 text-sky-300">
            <Eye className="h-4 w-4" />
            <h5 className="font-serif text-sm font-bold">
              STAGE 1: THE RAPTURE & BĒMA SEAT (For the Church)
            </h5>
          </div>
          <ul className="mt-2 space-y-1 text-xs text-slate-200">
            <li>• Christ comes IN THE AIR FOR His Bride (1 Thess 4:16–17)</li>
            <li>• Imminent, signless, before the wrath of Tribulation (1 Thess 5:9; Rev 3:10)</li>
            <li>• Followed by the Judgment Seat of Christ (Bēma) for rewards (2 Cor 5:10)</li>
          </ul>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5">
          <div className="flex items-center gap-2 text-amber-300">
            <Scale className="h-4 w-4" />
            <h5 className="font-serif text-sm font-bold">
              STAGE 2: SECOND COMING & FINAL JUDGMENT
            </h5>
          </div>
          <ul className="mt-2 space-y-1 text-xs text-slate-200">
            <li>• Christ descends TO THE MOUNT OF OLIVES WITH His Saints (Zech 14:4; Rev 19:14)</li>
            <li>• Defeats Antichrist & reigns 1,000 years on David’s throne (Rev 19:20–20:6)</li>
            <li>• Followed by the Great White Throne Judgment of the unsaved (Rev 20:11–15)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
