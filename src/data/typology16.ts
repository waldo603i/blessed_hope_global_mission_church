import { TrilingualText } from '../types/theology';

export interface TypologyEntry {
  id: number;
  otType: TrilingualText;
  otScripture: string;
  ntFulfillment: TrilingualText;
  ntScripture: string;
  explanation: TrilingualText;
}

export const BIBLICAL_TYPOLOGY_16: TypologyEntry[] = [
  {
    id: 1,
    otType: { en: 'Adam (First Man)', tl: 'Adan (Unang Tao)', ilo: 'Adan (Umuna a Tao)' },
    otScripture: 'Genesis 2:7; 3:6',
    ntFulfillment: { en: 'Christ, the Last Adam & Life-Giving Spirit', tl: 'Si Kristo, ang Huling Adan', ilo: 'Ni Kristo, ti Maudi nga Adan' },
    ntScripture: 'Romans 5:12–21; 1 Corinthians 15:45–49',
    explanation: {
      en: 'Through the first Adam sin and death entered the world; through the Last Adam righteousness and resurrection life abound to all who believe.',
      tl: 'Sa pamamagitan ng unang Adan pumasok ang kasalanan at kamatayan; sa pamamagitan ng Huling Adan ay dumating ang katuwiran at buhay na walang hanggan.',
      ilo: 'Babaen ti umuna nga Adan simrek ti basol ken patay; babaen ti Maudi nga Adan dimteng ti kinalinteg ken biag nga agnanayon.',
    },
  },
  {
    id: 2,
    otType: { en: 'Noah’s Ark (Saved from the Flood)', tl: 'Arko ni Noe (Kaligtasan sa Baha)', ilo: 'Daong ni Noe (Pakaisalakanan iti Layus)' },
    otScripture: 'Genesis 6:14–18; 7:1, 16',
    ntFulfillment: { en: 'Salvation & Refuge in Christ', tl: 'Kaligtasan at Kanlungan kay Kristo', ilo: 'Pakaisalakanan ken Kamang kenni Kristo' },
    ntScripture: '1 Peter 3:20–21; Romans 8:1',
    explanation: {
      en: 'Pitched within and without (kaphar, "atonement") with only one door, the Ark bore the storm of judgment so all inside were carried safely into a new world.',
      tl: 'May iisang pinto at tinakpan ng alkitran (kaphar, "pantubos"), dinala ng Arko ang unos ng paghatol upang ang lahat ng nasa loob ay maligtas.',
      ilo: 'Addaan maymaysa a ruangan ken nakalupkopan (kaphar, "pangabbong"), sinango ti Daong ti bagyo ti panangukom tapno maisalakan amin nga adda iti uneg.',
    },
  },
  {
    id: 3,
    otType: { en: 'Melchizedek (King of Salem & Priest)', tl: 'Melquisedec (Hari ng Salem at Saserdote)', ilo: 'Melquisedec (Ari ti Salem ken Padi)' },
    otScripture: 'Genesis 14:18–20; Psalm 110:4',
    ntFulfillment: { en: 'Christ Our Eternal Royal High Priest', tl: 'Si Kristo ang Walang-Hanggang Hari at Saserdote', ilo: 'Ni Kristo ti Agnanaed nga Ari ken Nangato a Padi' },
    ntScripture: 'Hebrews 5:6–10; 7:1–25',
    explanation: {
      en: 'Bringing bread and wine as King of Righteousness and King of Peace, Melchizedek prefigures Christ’s eternal priesthood superior to Aaron.',
      tl: 'Bilang Hari ng Katuwiran at Hari ng Kapayapaan na nagdala ng tinapay at alak, inilalarawan niya ang walang-hanggang pagka-saserdote ni Kristo.',
      ilo: 'Kas Ari ti Kinalinteg ken Ari ti Kappia a nangipaay iti tinapay ken arak, iladawanna ti agnanayon a kinapadi ni Kristo.',
    },
  },
  {
    id: 4,
    otType: { en: 'Isaac (The Beloved Only Son on Moriah)', tl: 'Isaac (Ang Minamahal na Anak sa Moria)', ilo: 'Isaac (Ti Dungdungnguen nga Anak idiay Moria)' },
    otScripture: 'Genesis 22:1–14',
    ntFulfillment: { en: 'Christ’s Sacrificial Pattern & Substitutionary Ram', tl: 'Ang Handog na Hain ni Kristo sa Kalbaryo', ilo: 'Ti Daton a Sakripisio ni Kristo idiay Kalbario' },
    ntScripture: 'John 3:16; Romans 8:32; Hebrews 11:17–19',
    explanation: {
      en: 'Isaac carried the wood up Mount Moriah (the very ridge of Calvary) and was received back "in a figure" from the dead on the third day as Jehovah-Jireh provided a substitute.',
      tl: 'Pinasan ni Isaac ang kahoy paakyat sa Bundok ng Moria at nagkaloob ang Panginoon (Jehovah-Jireh) ng tupang kahalili.',
      ilo: 'Binaklay ni Isaac ti kayo nga agpangato idiay Bantay Moria ket nangipaay ti Apo (Jehovah-Jireh) iti karnero a kasukat.',
    },
  },
  {
    id: 5,
    otType: { en: 'Joseph (Rejected by Brothers, Exalted to Save)', tl: 'Jose (Itinakwil ng mga Kapatid, Itinaas Upang Magligtas)', ilo: 'Jose (Linaksid dagiti Kakabsat, Naitantan-ok Tapno Mangisalakan)' },
    otScripture: 'Genesis 37:28; 45:5–8; 50:20',
    ntFulfillment: { en: 'Christ’s Suffering, Humiliation & Exaltation', tl: 'Ang Pagdurusa at Pagkataas ni Kristo', ilo: 'Ti Panagsagaba ken Pannakaitantan-ok ni Kristo' },
    ntScripture: 'Acts 7:9–14; Philippians 2:8–11',
    explanation: {
      en: 'Envied by his brothers, sold for silver, falsely accused, yet exalted from prison to the right hand of the throne to become Bread-Giver to the Gentiles and Savior of his brethren.',
      tl: 'Ipinagbili sa pilak at nakulong nang walang sala, ngunit itinaas sa kanan ng trono upang magligtas sa mga bansa at sa kanyang mga kapatid.',
      ilo: 'Nailako iti pirak ken naibalud nga awan basolna, ngem naitantan-ok iti makannawan ti trono tapno mangisalakan kadagiti nasion ken kadagiti kakabsatna.',
    },
  },
  {
    id: 6,
    otType: { en: 'Moses (Deliverer, Mediator & Lawgiver)', tl: 'Moises (Tagapagligtas, Tagapamagitan at Propeta)', ilo: 'Moises (Mangisalakan, Mangibabaet ken Mammadto)' },
    otScripture: 'Deuteronomy 18:15–18; Exodus 32:30–32',
    ntFulfillment: { en: 'Christ the Greater Prophet, Deliverer & Mediator', tl: 'Si Kristo ang Dakilang Propeta at Tagapamagitan', ilo: 'Ni Kristo ti Natantan-ok a Mammadto ken Mangibabaet' },
    ntScripture: 'Acts 3:22–23; Hebrews 3:1–6',
    explanation: {
      en: 'Moses was faithful as a servant in God’s house, interceding for Israel; Christ is faithful as a Son over God’s house, mediating a better covenant.',
      tl: 'Si Moises ay naging tapat bilang lingkod sa sambahayan ng Diyos; si Kristo ay tapat bilang Anak na namamahala sa sambahayan ng Diyos.',
      ilo: 'Ni Moises ket matalek kas adipen iti balay ti Dios; ni Kristo ket matalek kas Anak a mangituray iti balay ti Dios.',
    },
  },
  {
    id: 7,
    otType: { en: 'The Passover Lamb (Unblemished Blood Applied)', tl: 'Ang Kordero ng Paskuwa (Dugo sa Haligi ng Pinto)', ilo: 'Ti Kordero ti Paskua (Dara iti Bautista ti Ruangan)' },
    otScripture: 'Exodus 12:3–13, 46',
    ntFulfillment: { en: 'Christ Our Passover Sacrificed for Us', tl: 'Si Kristo na Ating Paskuwa na Inihandog', ilo: 'Ni Kristo a Paskuatayo a Naidaton' },
    ntScripture: 'John 1:29; 19:36; 1 Corinthians 5:7; 1 Peter 1:18–19',
    explanation: {
      en: 'Without spot or blemish, with not a bone broken, its blood applied by faith sheltered every household from the destroyer ("When I see the blood, I will pass over you").',
      tl: 'Walang kapintasan at walang nabaling buto, ang dugo nito na ipinahid sa pamamagitan ng pananampalataya ang nagligtas mula sa kahatulan.',
      ilo: 'Awan pilawna ken awan natukkol a tulangna, ti darana a naipulagid babaen ti pammati ti nangisalakan manipud iti panangukom.',
    },
  },
  {
    id: 8,
    otType: { en: 'The Exodus (Deliverance from Egyptian Bondage)', tl: 'Ang Exodo (Paglaya Mula sa Pagkaalipin sa Ehipto)', ilo: 'Ti Exodo (Pannakawayawaya Manipud Egipto)' },
    otScripture: 'Exodus 12–14',
    ntFulfillment: { en: 'Redemption & Deliverance from Sin’s Bondage in Christ', tl: 'Katubusan at Paglaya Mula sa Kasalanan kay Kristo', ilo: 'Pannakasubbot ken Pannakawayawaya iti Basol kenni Kristo' },
    ntScripture: 'Luke 9:31; 1 Corinthians 10:1–11; Colossians 1:13',
    explanation: {
      en: 'At the Transfiguration, Moses and Elijah spoke of Jesus’ "decease" (Greek exodos, Luke 9:31) which He was about to accomplish at Jerusalem—rescuing us from the domain of darkness.',
      tl: 'Sa Bundok ng Pagbabagong-anyo, pinag-usapan nina Moises at Elias ang "exodos" (paglisan/pagtubos, Lucas 9:31) na isasakatuparan ni Hesus sa Jerusalem.',
      ilo: 'Idiay Bantay ti Panagbaliw-langa, nagsaritaan da Moises ken Elias ti "exodos" (panangsubbot, Lucas 9:31) nga ibanag ni Jesus idiay Jerusalem.',
    },
  },
  {
    id: 9,
    otType: { en: 'Manna (Bread from Heaven in the Wilderness)', tl: 'Manna (Tinapay Mula sa Langit sa Ilang)', ilo: 'Manna (Tinapay Manipud Langit idiay Let-ang)' },
    otScripture: 'Exodus 16:4, 14–15, 31',
    ntFulfillment: { en: 'Christ the True Bread of Life', tl: 'Si Kristo ang Tunay na Tinapay ng Buhay', ilo: 'Ni Kristo ti Pudno a Tinapay ti Biag' },
    ntScripture: 'John 6:31–35, 48–58',
    explanation: {
      en: 'Manna sustained wilderness pilgrims temporarily; Jesus is the living Bread who came down from heaven so that whoever eats of Him shall live forever.',
      tl: 'Ang Manna ay nagbigay ng pansamantalang lakas sa ilang; si Hesus ang Buháy na Tinapay mula sa langit na nagbibigay ng buhay na walang hanggan.',
      ilo: 'Ti Manna ket nangted iti temporario a pigsa idiay let-ang; ni Jesus ti Nabiag a Tinapay manipud langit a mangted iti biag nga agnanayon.',
    },
  },
  {
    id: 10,
    otType: { en: 'The Smitten Rock at Horeb (Water from the Rock)', tl: 'Ang Hinampas na Bato sa Horeb (Tubig Mula sa Bato)', ilo: 'Ti Napang-or a Bato idiay Horeb (Danum Manipud iti Bato)' },
    otScripture: 'Exodus 17:6; Numbers 20:8–11',
    ntFulfillment: { en: 'Christ the Spiritual Rock Struck Once for Living Water', tl: 'Si Kristo ang Espirituwal na Bato na Nagbibigay ng Tubig ng Buhay', ilo: 'Ni Kristo ti Naespirituan a Bato a Mangted Danum ti Biag' },
    ntScripture: '1 Corinthians 10:4; John 4:14; 7:37–39',
    explanation: {
      en: '"And that Rock was Christ" (1 Cor 10:4)! Smitten once by the rod of Moses (Law’s judgment at Calvary), He now yields the Holy Spirit whenever we speak to Him in prayer.',
      tl: '"At ang Batong yaon ay si Kristo" (1 Cor 10:4)! Hinampas nang minsan sa Kalbaryo upang magpadaloy ng tubig ng Banal na Espiritu sa lahat ng nauuhaw.',
      ilo: '"Ket daydi a Bato isu ni Kristo" (1 Cor 10:4)! Napang-or a namimpinsan idiay Kalbario tapno agayus ti danum ti Nasantuan nga Espiritu kadagiti mawaw.',
    },
  },
  {
    id: 11,
    otType: { en: 'The Bronze Serpent (Lifted Up on a Pole)', tl: 'Ang Tansong Ahas (Itinaas sa Tikin)', ilo: 'Ti Gambang nga Uleg (Naipangato iti Kayo)' },
    otScripture: 'Numbers 21:8–9',
    ntFulfillment: { en: 'Christ Lifted Up on the Cross to Heal from Sin’s Venom', tl: 'Si Kristong Itinaas sa Krus Upang Magligtas', ilo: 'Ni Kristo a Naipangato idiay Krus Tapno Mangisalakan' },
    ntScripture: 'John 3:14–16; 2 Corinthians 5:21',
    explanation: {
      en: 'Made in the likeness of the very curse that bit the people, yet harmless in itself—so Christ was made sin for us on the Cross that whoever looks to Him in faith lives!',
      tl: 'Kung paanong itinaas ni Moises ang ahas sa ilang, gayon din naman itinaas ang Anak ng Tao upang ang sinumang sumampalataya sa Kanya ay magkaroon ng buhay na walang hanggan.',
      ilo: 'Kas iti panangipangato ni Moises iti uleg idiay let-ang, kasta met a naipangato ti Anak ti Tao tapno ti tunggal mamati kenkuana ket maaddaan iti biag nga agnanayon.',
    },
  },
  {
    id: 12,
    otType: { en: 'The Tabernacle (God Dwelling Among Israel)', tl: 'Ang Tabernakulo (Pananahan ng Diyos sa Israel)', ilo: 'Ti Tabernakulo (Panagtaeng ti Dios iti Israel)' },
    otScripture: 'Exodus 25:8; 40:34–38',
    ntFulfillment: { en: 'Christ the Incarnate Word Tabernacling Among Us', tl: 'Si Kristo ang Salitang Nagkatawang-Tao na Nanahan sa Gitna Natin', ilo: 'Ni Kristo ti Sao a Naglasag a Nakipagtaeng Kadatayo' },
    ntScripture: 'John 1:14; Hebrews 8:2; 9:11',
    explanation: {
      en: 'Every furnishing—Brazen Altar, Laver, Golden Lampstand, Table of Showbread, Altar of Incense, and Ark of the Covenant—portrays the Person and work of Jesus.',
      tl: 'Ang bawat bahagi ng Tabernakulo—Dambana, Hugasan, Kandelero, Dulang ng Tinapay, Dambana ng Kamanyang, at Kaban ng Tipan—ay larawan ni Hesus.',
      ilo: 'Tunggal paset ti Tabernakulo—Altar, Pagbugguan, Kandelero, Lamisaan ti Tinapay, Altar ti Insienso, ken Lakasa ti Tulag—ket ladawan ni Jesus.',
    },
  },
  {
    id: 13,
    otType: { en: 'The High Priest & Day of Atonement (Yom Kippur & Scapegoat)', tl: 'Ang Dakilang Saserdote at Araw ng Katubusan (Yom Kippur)', ilo: 'Ti Nangato a Padi ken Aldaw ti Pannakaabbong (Yom Kippur)' },
    otScripture: 'Leviticus 16:15–22',
    ntFulfillment: { en: 'Christ Our Great High Priest & Once-for-All Sacrifice', tl: 'Si Kristo ang Ating Dakilang Saserdote at Minsang Handog Magpakailanman', ilo: 'Ni Kristo ti Nangato a Paditayo ken Namimpinsan a Daton' },
    ntScripture: 'Hebrews 4:14–16; 9:11–14, 24–28; 10:10–14',
    explanation: {
      en: 'Unlike Levitical priests who offered animal blood yearly, Christ entered the heavenly sanctuary once for all by His own blood, both propitiating wrath and bearing our sins away.',
      tl: 'Hindi gaya ng mga saserdoteng naghahandog taun-taon, si Kristo ay pumasok nang minsan magpakailanman sa langit sa pamamagitan ng sarili Niyang dugo.',
      ilo: 'Saan a kas kadagiti papadi nga agidaton tinawen, ni Kristo ket simrek a namimpinsan idiay langit babaen ti bukodna a dara.',
    },
  },
  {
    id: 14,
    otType: { en: 'The Tabernacle Veil (Separating the Holy of Holies)', tl: 'Ang Tabing ng Templo (Naghihiwalay sa Kabanal-banalang Dako)', ilo: 'Ti Abbong ti Templo (Mangisina iti Kasantoan a Disso)' },
    otScripture: 'Exodus 26:31–33',
    ntFulfillment: { en: 'Bold Access to God Through Christ’s Torn Flesh', tl: 'Malayang Paglapit sa Diyos sa Pamamagitan ng Katawan ni Kristo', ilo: 'Nawaya nga Idadalan iti Dios Babaen ti Lasag ni Kristo' },
    ntScripture: 'Matthew 27:51; Hebrews 10:19–22',
    explanation: {
      en: 'When Jesus cried "It is finished!", the massive veil was torn from top to bottom by God’s own hand, opening a new and living way into the Father’s presence.',
      tl: 'Nang sumigaw si Hesus ng "Naganap na!", ang makapal na tabing ng templo ay nahapak mula sa itaas hanggang sa ibaba, na nagbukas ng daan patungo sa Ama.',
      ilo: 'Idi impukkaw ni Jesus ti "Nalpasen!", ti napuskol nga abbong ti templo ket napigis manipud ngato agingga iti baba, a nangilukat iti dalan nga agturong iti Ama.',
    },
  },
  {
    id: 15,
    otType: { en: 'Boaz (The Worthy Kinsman-Redeemer of Ruth)', tl: 'Boaz (Ang Karapat-dapat na Manunubos ni Ruth)', ilo: 'Boaz (Ti Maikari a Mannubbot kenni Ruth)' },
    otScripture: 'Ruth 2:1, 20; 3:9; 4:9–10',
    ntFulfillment: { en: 'Christ the Lord of the Harvest & Redeemer of His Bride', tl: 'Si Kristo ang Manunubos ng Kanyang Nobyang Iglesya', ilo: 'Ni Kristo ti Mannubbot iti Nobiana nga Iglesia' },
    ntScripture: 'Ephesians 5:25–27; Revelation 5:9',
    explanation: {
      en: 'Related by blood (Incarnation), wealthy enough to pay the price (divine merit), and willing in love (grace), Boaz redeems the Moabitess stranger as his bride.',
      tl: 'Kadugo natin sa Pagkakatawang-tao, may sapat na kayamanan upang magbayad, at kusang-loob sa pag-ibig, tinubos ni Kristo ang Kanyang Nobya.',
      ilo: 'Kabagiantayo iti Panaglasag, addaan umdas a kinabaknang a mangbayad, ken sibubulos iti ayat, sinubbot ni Kristo ti Nobiana.',
    },
  },
  {
    id: 16,
    otType: { en: 'Jonah (Three Days in the Belly of the Great Fish)', tl: 'Jonas (Tatlong Araw sa Tiyan ng Malaking Isda)', ilo: 'Jonas (Tallo nga Aldaw iti Tian ti Dakkel nga Ikan)' },
    otScripture: 'Jonah 1:17; 2:1–10',
    ntFulfillment: { en: 'Christ’s Death, Burial & Third-Day Resurrection', tl: 'Ang Kamatayan, Pagkalibing at Muling Pagkabuhay ni Kristo sa Ikatlong Araw', ilo: 'Ti Ipapatay, Pannakaiponpon ken Panagungar ni Kristo iti Maikatlo nga Aldaw' },
    ntScripture: 'Matthew 12:39–41; 1 Corinthians 15:3–4',
    explanation: {
      en: 'Jesus Himself declared the Sign of the Prophet Jonah as the supreme authentication of His Messianic claim: three days in the heart of the earth, rising victorious over death.',
      tl: 'Ipinahayag mismo ni Hesus ang Tanda ni Propeta Jonas bilang sukdulang katibayan ng Kanyang pagka-Mesiyas: ang Kanyang muling pagkabuhay sa ikatlong araw.',
      ilo: 'Impaduyakyak mismo ni Jesus ti Pagilasinan ni Mammadto Jonas kas kangrunaan a pammaneknek ti kina-Mesiasna: ti panagungarna iti maikatlo nga aldaw.',
    },
  },
];
