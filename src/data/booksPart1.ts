import { TheologicalBookChapter } from '../types/theology';

export const BOOKS_PART_1: TheologicalBookChapter[] = [
  {
    id: 'book-01-bibliology',
    bookNumber: 1,
    romanNumeral: 'I',
    doctrineCode: 'BIBLIOLOGY & PROLEGOMENA',
    greekEtymology: 'βιβλίον (Biblion, "Scroll/Book") + λόγος (Logos, "Word/Discourse")',
    title: {
      en: 'The Doctrine of the Word of God & Foundations of Faith',
      tl: 'Ang Doktrina ng Salita ng Diyos at Pundasyon ng Pananampalataya',
      ilo: 'Ti Doktrina ti Sao ti Dios ken Pundasion ti Pammati',
    },
    subtitle: {
      en: 'Divine Revelation, Inspiration, Canon, Manuscript Transmission, Hermeneutics & Christ in All 66 Books',
      tl: 'Banal na Kapahayagan, Kinasihan, Kanon, Manuskrito, Hermeneutika at si Kristo sa Lahat ng 66 na Aklat',
      ilo: 'Nailangitan a Pannakaiparangarang, Paltiing, Kanon, Manuskrito, Hermeneutika ken ni Kristo iti Amin a 66 a Libro',
    },
    heroArtUrl: '/images/generated/chapter-01-bibliology.jpg',
    accentColor: 'from-amber-500 via-yellow-500 to-orange-600',
    estimatedMinutes: 35,
    keyVerse: {
      ref: '2 Timothy 3:16–17',
      text: {
        en: '"All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, throughly furnished unto all good works."',
        tl: '"Ang lahat ng mga kasulatan na kinasihan ng Diyos ay mapapakinabangan din naman sa pagtuturo, sa pagsansala, sa pagsaway, sa ikatututo na nasa katuwiran: Upang ang tao ng Diyos ay maging sakdal, tinuruang lubos sa lahat ng mga gawang mabuti."',
        ilo: '"Amin a Surat ket impaltiing ti Dios, ken naimbag a pagisuro, pagtubngar, pagatur, ken pagadalan iti kinalinteg: Tapno ti tao ti Dios ket agbalin nga awan kurangna, nakasagana a naan-anay iti amin a naimbag nga aramid."',
      },
      commentary: {
        en: 'The Greek word theopneustos literally means "God-breathed." Scripture is not merely human religious reflection elevated by God; it is the very expirated breath of the Almighty.',
        tl: 'Ang salitang Griyego na theopneustos ay literal na nangangahulugang "hiningahan ng Diyos." Ang Bibliya ay mismong hininga ng Makapangyarihang Diyos.',
        ilo: 'Ti sao a Griego a theopneustos ket literal a kayatna a sawen "inangesan ti Dios." Ti Biblia ket mismo nga anges ti Mannakabalin-amin a Dios.',
      },
    },
    pastoralPrologue: {
      en: 'Beloved reader, before we ascend the mountain peaks of Systematic Theology, we must first examine the ground beneath our feet. Why do we believe what we believe? As your Chief Editor, Theologian, and Senior Pastor, I invite you to open the Sacred Codex with awe. Christianity does not rest upon shifting philosophical opinions or clerical decrees; it rests upon the infallible, inerrant, God-breathed Word. In this first Book, we survey the eleven foundational pillars of Christian doctrine, marvel at the mathematical and historical architecture of the 66 books, trace the ancient Hebrew, Aramaic, and Greek manuscripts from Qumran to our hands, master the five golden steps of biblical hermeneutics, and behold Jesus Christ shining on every page from Genesis to Revelation.',
      tl: 'Minamahal na mambabasa, bago tayo umakyat sa matataas na taluktok ng Sistematikong Teolohiya, suriin muna natin ang pundasyong ating kinatatayuan. Bakit natin pinaniniwalaan ang ating sinasampalatayanan? Bilang inyong Punong Patnugot, Teologo, at Senior Pastor, inaanyayahan ko kayong buksan ang Banal na Aklat nang may paggalang at pagkamangha. Ang Kristiyanismo ay hindi nakasalalay sa pabagu-bagong opinyon ng tao, kundi sa hindi nagkakamali at hiningahan-ng-Diyos na Kasulatan. Sa Unang Aklat na ito, pag-aaralan natin ang 11 pundasyon ng doktrina, ang kahanga-hangang kaayusan ng 66 na aklat, ang mga sinaunang manuskrito, ang 5 hakbang sa pag-aaral ng Bibliya, at si Hesu-Kristo sa bawat aklat.',
      ilo: 'Dungdungnguen nga agbasbasa, sakbay nga umulitayo kadagiti nangato a bantay ti Sistematiko a Teolohia, sukimatentayo pay ti pundasion a pagtaktakderantayo. Apay a patientayo ti pammatitayo? Kas Pangulo nga Editor, Teologo, ken Senior Pastoryo, awisenkayo a manglukat iti Nasantuan a Libro a siuulimek ken sidadayaw. Ti Kristianismo ket saan a naibatay iti agbaliwbaliw a panunot ti tao, no di ket iti di-agbiddut ken impaltiing-ti-Dios a Surat. Iti daytoy Umuna a Libro, adalentayo dagiti 11 a pundasion ti doktrina, ti nakaskasdaaw a pakabuklan ti 66 a libro, dagiti kadaanan a manuskrito, dagiti 5 nga addang iti panagadal iti Biblia, ken ni Jesu-Kristo iti tunggal libro.',
    },
    sections: [
      {
        id: 'sec-01-11-doctrines',
        sectionNumber: '1.1',
        title: {
          en: 'The 11 Christian Doctrines: Architectural Blueprint of Systematic Theology',
          tl: 'Ang 11 Doktrinang Kristiyano: Ang Balangkas ng Sistematikong Teolohiya',
          ilo: 'Dagiti 11 a Doktrina ti Kristiano: Ti Balabala ti Sistematiko a Teolohia',
        },
        subtitle: {
          en: 'Why sound doctrine (hugiainousa didaskalia) is essential for strong faith and effective ministry (2 Timothy 1:13; Titus 2:1)',
          tl: 'Bakit ang malusog na doktrina ay mahalaga sa matatag na pananampalataya at mabungang ministeryo (2 Timoteo 1:13)',
          ilo: 'Apay a ti nasayaat a doktrina ket nasken para iti natibker a pammati ken nabunga a ministerio (2 Timoteo 1:13)',
        },
        pastoralExposition: {
          en: 'In pastoral ministry, I often hear well-meaning believers say, "Pastor, I don’t need deep theology; I just want to love Jesus." Yet the moment you ask, "Which Jesus do you love? Is He eternal God or a created being? Did His death actually propitiate the Father’s wrath? How does the Holy Spirit sanctify you?"—you are immediately doing theology! The Apostle Paul commanded Timothy: "Hold fast the form of sound words, which thou hast heard of me, in faith and love which is in Christ Jesus" (2 Timothy 1:13). The Greek word for "sound" is hugiaino, from which we derive "hygiene"—meaning healthy, whole, life-giving doctrine.\n\nSystematic Theology organizes the whole counsel of God (Acts 20:27) into eleven interconnected disciplines: (1) Theology Proper (the Doctrine of God), (2) Bibliology (the Doctrine of the Bible), (3) Christology (the Person and Work of Christ), (4) Pneumatology (the Person and Ministry of the Holy Spirit), (5) Angelology (Holy Angels), (6) Anthropology (Humanity in God’s Image), (7) Hamartiology (the Doctrine of Sin), (8) Soteriology (the Doctrine of Salvation), (9) Ecclesiology (the Doctrine of the Church), (10) Eschatology (the Doctrine of Last Things), and (11) Demonology (Spiritual Warfare against Satan and fallen angels). Remove even one pillar, and the entire temple of truth tilts out of alignment.',
          tl: 'Sa aking pagpapastol, madalas kong marinig ang iba na nagsasabi, "Pastor, hindi ko kailangan ng malalim na teolohiya; basta mahal ko si Hesus." Ngunit sa sandaling itanong mo: "Sinong Hesus ang iyong iniibig? Siya ba ay walang-hanggang Diyos o nilalang lamang? Paano tayo iniligtas ng Kanyang dugo?"—ikaw ay gumagawa na ng teolohiya! Iniutos ni Apostol Pablo kay Timoteo: "Ingatan mo ang uliran ng mga magagaling na salita na narinig mo sa akin, sa pananampalataya at pag-ibig na nasa kay Kristo Hesus" (2 Timoteo 1:13).\n\nInaayos ng Sistematikong Teolohiya ang buong kalooban ng Diyos (Gawa 20:27) sa labing-isang magkakaugnay na sangay: (1) Doktrina ng Diyos (Theology Proper), (2) Bibliology (Bibliya), (3) Christology (Kristo), (4) Pneumatology (Banal na Espiritu), (5) Angelology (Mga Anghel), (6) Anthropology (Tao), (7) Hamartiology (Kasalanan), (8) Soteriology (Kaligtasan), (9) Ecclesiology (Iglesya), (10) Eschatology (Huling Bagay), at (11) Demonology (Pakikibakang Espirituwal). Kapag inalis mo ang kahit isang haligi, manghihina ang kabuuan ng pananampalataya.',
          ilo: 'Iti panagpastorko, masansan a mangngegko ti dadduma nga agkuna, "Pastor, saanko a kasapulan ti nauneg a teolohia; basta ay-ayatek ni Jesus." Ngem apaman a saludsodem: "Siasino a Jesus ti ay-ayatem? Isu kadi ket agnanayon a Dios wenno naparsua laeng? Kasano nga insalakannatayo ti darana?"—agar-aramidkan iti teolohia! Imbilin ni Apostol Pablo kenni Timoteo: "Salimetmetam ti pagwadan dagiti nasayaat a sasao a nangngegmo kaniak, iti pammati ken ayat nga adda kenni Kristo Jesus" (2 Timoteo 1:13).\n\nUrnosen ti Sistematiko a Teolohia ti intero a pagayatan ti Dios (Aramid 20:27) iti sangapulo ket maysa nga agkakanaig a sanga: (1) Doktrina ti Dios (Theology Proper), (2) Bibliology (Biblia), (3) Christology (Kristo), (4) Pneumatology (Nasantuan nga Espiritu), (5) Angelology (Dagiti Anghel), (6) Anthropology (Tao), (7) Hamartiology (Basol), (8) Soteriology (Pakaisalakanan), (9) Ecclesiology (Iglesia), (10) Eschatology (Maudi a Banbanag), ken (11) Demonology (Naespirituan a Gubat). No ikkatem ti uray maysa laeng nga adigi, agkapuy ti pakabuklan ti pammati.',
        },
        theologicalBreakdown: [
          {
            heading: {
              en: 'Theology Proper, Bibliology, Christology & Pneumatology',
              tl: 'Doktrina ng Diyos, Bibliya, Kristo at Banal na Espiritu',
              ilo: 'Doktrina ti Dios, Biblia, Kristo ken Nasantuan nga Espiritu',
            },
            greekOrHebrewTerm: 'Θεολογία (Theologia) • Χριστολογία (Christologia) • Πνευματολογία (Pneumatologia)',
            meaning: {
              en: 'The Triune Godhead & His Self-Revelation',
              tl: 'Ang Tatlong-Personang Diyos at ang Kanyang Kapahayagan',
              ilo: 'Ti Тallo-Persona a Dios ken ti Pannakaiparangarangna',
            },
            explanation: {
              en: 'Grounds all reality in the Eternal Creator (Gen 1:1), revealed through His inspired Word (2 Tim 3:16), mediated through the God-Man Jesus Christ (1 Tim 2:5), and applied by the Holy Spirit (Acts 1:8).',
              tl: 'Nag-uugat ng lahat ng katotohanan sa Walang-Hanggang Manlilikha (Gen 1:1), na inihayag sa Kanyang Salita (2 Tim 3:16), sa pamamagitan ni Hesu-Kristo (1 Tim 2:5), at sa kapangyarihan ng Banal na Espiritu (Gawa 1:8).',
              ilo: 'Mangiramut iti amin a kinapudno iti Agnanaed a Namarsua (Gen 1:1), a naiparangarang iti Saona (2 Tim 3:16), babaen kenni Jesu-Kristo (1 Tim 2:5), ken iti pannakabalin ti Nasantuan nga Espiritu (Aramid 1:8).',
            },
            scripture: 'Genesis 1:1; 2 Timothy 3:16; 1 Timothy 2:5; Acts 1:8',
          },
          {
            heading: {
              en: 'Anthropology, Hamartiology & Soteriology',
              tl: 'Doktrina ng Tao, Kasalanan at Kaligtasan',
              ilo: 'Doktrina ti Tao, Basol ken Pakaisalakanan',
            },
            greekOrHebrewTerm: 'Ἄνθρωπος (Anthropos) • Ἁμαρτία (Hamartia) • Σωτηρία (Soteria)',
            meaning: {
              en: 'Human Dignity, Fallen Depravity & Sovereign Grace',
              tl: 'Dangal ng Tao, Pagkahulog sa Kasalanan, at Biyaya ng Kaligtasan',
              ilo: 'Dayaw ti Tao, Pannakatnag iti Basol, ken Parabur ti Pakaisalakanan',
            },
            explanation: {
              en: 'Explains why humanity is simultaneously noble (created in God’s image) and broken (fallen in sin, Rom 3:23; 6:23), and how God rescues us by grace alone through faith alone in Christ alone (Eph 2:8–9).',
              tl: 'Nagpapaliwanag kung bakit ang tao ay mahalaga (nilalang sa wangis ng Diyos) ngunit wasak dahil sa kasalanan (Roma 3:23; 6:23), at kung paano tayo iniligtas sa biyaya sa pamamagitan ng pananampalataya (Efeso 2:8–9).',
              ilo: 'Mangilawlawag no apay a ti tao ket napateg (naparsua iti ladawan ti Dios) ngem nadadael gapu iti basol (Roma 3:23; 6:23), ken no kasano nga insalakannatayo babaen ti parabur ken pammati (Efeso 2:8–9).',
            },
            scripture: 'Romans 3:23; Romans 6:23; Ephesians 2:8–9',
          },
          {
            heading: {
              en: 'Angelology, Demonology, Ecclesiology & Eschatology',
              tl: 'Mga Anghel, Masasamang Espiritu, Iglesya at Huling Kaganapan',
              ilo: 'Dagiti Anghel, Dakes nga Espiritu, Iglesia ken Maudi a Panawen',
            },
            greekOrHebrewTerm: 'Ἐκκλησία (Ekklesia, "Called-Out Assembly") • Ἔσχατος (Eschatos, "Last")',
            meaning: {
              en: 'The Cosmic Conflict, the Body of Christ & the Blessed Hope',
              tl: 'Ang Espirituwal na Labanan, ang Katawan ni Kristo, at ang Mapalad na Pag-asa',
              ilo: 'Ti Naespirituan a Gubat, ti Bagi ni Kristo, ken ti Nagasat a Namnama',
            },
            explanation: {
              en: 'Equips the Church (1 Cor 12:27) to discern angelic ministry (Heb 1:14), resist demonic schemes (Jas 4:7), and labor in hope until we are forever with the Lord (1 Thess 4:17).',
              tl: 'Naghahanda sa Iglesya (1 Cor 12:27) upang kilalanin ang paglilingkod ng mga anghel (Heb 1:14), labanan ang diyablo (San 4:7), at maghintay sa pagbabalik ng Panginoon (1 Tes 4:17).',
              ilo: 'Mangisagana iti Iglesia (1 Cor 12:27) tapno maawatan ti panagserbi dagiti anghel (Heb 1:14), labanan ti diablo (San 4:7), ken aguray iti panagsubli ti Apo (1 Tes 4:17).',
            },
            scripture: 'Hebrews 1:14; 1 Corinthians 12:27; 1 Thessalonians 4:17; James 4:7',
          },
        ],
        scriptureAnchors: [
          {
            ref: '2 Timothy 1:13',
            text: {
              en: '"Hold fast the form of sound words, which thou hast heard of me, in faith and love which is in Christ Jesus."',
              tl: '"Ingatan mo ang uliran ng mga magagaling na salita na narinig mo sa akin, sa pananampalataya at pag-ibig na nasa kay Cristo Jesus."',
              ilo: '"Salimetmetam ti pagwadan dagiti nasayaat a sasao a nangngegmo kaniak, iti pammati ken ayat nga adda kenni Cristo Jesus."',
            },
          },
          {
            ref: 'Jude 1:3',
            text: {
              en: '"Beloved, while I was very diligent to write to you concerning our common salvation, I found it necessary to write to you exhorting you to contend earnestly for the faith which was once for all delivered to the saints."',
              tl: '"Mga minamahal, samantalang ako’y buong sikap na nagsusumakit na sumulat sa inyo tungkol sa kaligtasang atingပိုင်, ay napilitan akong sumulat sa inyo na iniaaral na kayo’y makipaglabang masikap dahil sa pananampalataya na ibinigay na minsan at magpakailanman sa mga banal."',
              ilo: '"Dungdungnguen, idi agkalkalikagumak unay nga agsurat kadakayo maipapan iti pakaisalakanantayo amin, nariknak a masapul nga agsuratak a mangallukoy kadakayo a makidangadang a sipapasnek maipaay iti pammati a naited a namimpinsan kadagiti sasanto."',
            },
          },
        ],
        linkedPlateIds: ['plate-01'],
        interactiveWidget: 'doctrines-11',
        pastoralApplication: {
          en: 'Examine your spiritual diet this week: are you feeding on fragments of inspirational quotes, or are you building your life on all eleven pillars of biblical doctrine? Commit to studying every Book of this Codex prayerfully.',
          tl: 'Suriin ang iyong espirituwal na pagkain ngayong linggo: ikaw ba ay nabubuhay lamang sa maiikling kasabihan, o itinatayo mo ang iyong buhay sa lahat ng 11 haligi ng doktrina ng Bibliya?',
          ilo: 'Sukimatem ti naespirituan a taraonmo ita a lawas: agbibiagka kadi laeng kadagiti ababa a pagsasao, wenno ibangbangonmo ti biagmo kadagiti amin nga 11 nga adigi ti doktrina ti Biblia?',
        },
      },
      {
        id: 'sec-01-manuscripts-stats',
        sectionNumber: '1.2',
        title: {
          en: 'The Sacred Architecture, Languages & Manuscript Transmission of the Bible',
          tl: 'Ang Banal na Kayarian, mga Wika, at Pagsasalin ng mga Manuskrito ng Bibliya',
          ilo: 'Ti Nasantuan a Pakabuklan, dagiti Lengguahe, ken Pannakaiyallatiw dagiti Manuskrito ti Biblia',
        },
        subtitle: {
          en: 'From Biblical Hebrew & Imperial Aramaic through Qumran’s Dead Sea Scrolls and Koine Greek to over 1,200+ World Languages',
          tl: 'Mula sa Hebreo at Aramaiko hanggang sa Dead Sea Scrolls ng Qumran, Griyegong Koine, at mga Salin sa Buong Daigdig',
          ilo: 'Manipud Hebreo ken Aramaiko agingga kadagiti Dead Sea Scrolls ti Qumran, Koine a Griego, ken dagiti Patarus iti Sangalubongan',
        },
        pastoralExposition: {
          en: 'Skeptics often ask: "Pastor, hasn’t the Bible been copied and translated so many times across millennia that the original message was lost?" The historical and archaeological evidence answers with a resounding NO! Across 66 books (39 Old Testament, 27 New Testament), 1,189 chapters, and 31,101 verses, God superintended both the original inspiration (autographs) and the providential preservation of His Word.\n\nConsider the eight historical milestones of biblical transmission: (1) Biblical Hebrew (Miqra), the covenant language of Israel; (2) Imperial Aramaic, used in portions of Daniel and Ezra and spoken colloquially by Jesus; (3) The Pentateuchal Torah scroll tradition; (4) The Septuagint (LXX), the 3rd–2nd century BC Greek translation of the Hebrew Scriptures quoted frequently by the Apostles; (5) The Dead Sea Scrolls discovered at Qumran (1947), which yielded the Great Isaiah Scroll—1,000 years older than previously known Masoretic manuscripts, proving word-for-word textual fidelity; (6) The Aramaic Targums used in synagogue instruction; (7) Koine Greek, the universal lingua franca of the Mediterranean world in which the New Testament was penned; and (8) Jerome’s Latin Vulgate and the global Reformation translations into English, Filipino (Ang Biblia / Ang Dating Biblia), Ilocano (Ti Nasantuan a Biblia), and thousands of tongues!',
          tl: 'Madalas itanong ng mga nag-aalinlangan: "Pastor, hindi ba’t napakaraming beses nang kinopya at isinalin ang Bibliya kaya’t nabago na ang orihinal na mensahe?" Ang ebidensya ng kasaysayan at arkeolohiya ay sumasagot ng matatag na HINDI! Sa loob ng 66 na aklat (39 sa Lumang Tipan, 27 sa Bagong Tipan), 1,189 na kabanata, at 31,101 na talata, binantayan ng Diyos ang Kanyang Salita.\n\nMasdan ang 8 makasaysayang yugto ng pagpapanatili ng Bibliya: (1) Hebreo (Miqra), ang wika ng Lumang Tipan; (2) Aramaiko, na ginamit sa Daniel at Ezra at sinalita ng Panginoong Hesus; (3) Ang Pentateuch (Torah); (4) Ang Septuagint (LXX), ang salin ng Lumang Tipan sa Griyego noong ika-3 hanggang ika-2 siglo BC; (5) Ang Dead Sea Scrolls na natuklasan sa Qumran (1947), kung saan napatunayang ang balumbon ni Isaias na mahigit 1,000 taon na mas matanda ay tugmang-tugma sa ating Bibliya ngayon; (6) Ang mga Targum; (7) Ang Griyegong Koine ng Bagong Tipan; at (8) Ang Latin Vulgate at ang pagsasalin ng Bibliya sa English, Filipino, Ilocano, at libu-libong wika sa buong mundo!',
          ilo: 'Masansan a saludsoden dagiti agduadua: "Pastor, saan kadi a namin-adu a nakopia ken naipatarus ti Biblia isu a nagbaliwen ti orihinal a mensahena?" Ti ebidensia ti pakasaritaan ken arkeolohia ket sumungbat iti natibker a SAAN! Iti uneg ti 66 a libro (39 iti Daan a Tulag, 27 iti Baro a Tulag), 1,189 a kapitulo, ken 31,101 a bersikulo, sinalimetmetan ti Dios ti Saona.\n\nKitaenyo dagiti 8 a naipakasaritaan nga addang ti pannakataginayon ti Biblia: (1) Hebreo (Miqra), ti lengguahe ti Daan a Tulag; (2) Aramaiko, a naaramat iti Daniel ken Esdras ken insao ni Apo Jesus; (3) Ti Pentateuko (Torah); (4) Ti Septuagint (LXX), ti patarus ti Daan a Tulag iti Griego; (5) Dagiti Dead Sea Scrolls a nasarakan idiay Qumran (1947), a nangpaneknek a ti lukot ni Isaias a nasurok 1,000 a tawen a nadadaan ket agpada unay iti Bibliatayo ita; (6) Dagiti Targum; (7) Ti Koine a Griego ti Baro a Tulag; ken (8) Ti Latin Vulgate ken ti pannakaipatarus ti Biblia iti English, Filipino, Ilocano, ken rinibu a pagsasao iti sangalubongan!',
        },
        theologicalBreakdown: [
          {
            heading: {
              en: 'Verbal Plenary Inspiration & Inerrancy',
              tl: 'Kinasihan sa Bawat Salita at Kawalan ng Pagkakamali (Inerrancy)',
              ilo: 'Naipaltiing iti Tunggal Sao ken Kinaawan-Biddut (Inerrancy)',
            },
            greekOrHebrewTerm: 'θεόπνευστος (Theopneustos) • φερόμενοι (Pheromenoi, 2 Pet 1:21)',
            meaning: {
              en: 'God-Breathed & Borne Along by the Holy Spirit',
              tl: 'Hiningahan ng Diyos at Dinala ng Banal na Espiritu',
              ilo: 'Inangesan ti Dios ken Indalan ti Nasantuan nga Espiritu',
            },
            explanation: {
              en: 'Human authors were not robotic stenographers; rather, as a sailboat is carried by the wind (pheromenoi), the Holy Spirit superintended their vocabulary and personality so every word of the original manuscripts is God’s exact truth.',
              tl: 'Ang mga manunulat ay "dinala ng Banal na Espiritu" (2 Pedro 1:21) gaya ng layag na tinatangay ng hangin, kaya’t bawat salita sa orihinal na manuskrito ay eksaktong katotohanan ng Diyos.',
              ilo: 'Dagiti mannurat ket "indalan ti Nasantuan nga Espiritu" (2 Pedro 1:21) a kas iti layag nga iduron ti angin, isut’ gapuna a tunggal sao kadagiti orihinal a manuskrito ket pudno a Sao ti Dios.',
            },
            scripture: '2 Peter 1:20–21; Matthew 5:18; John 10:35',
          },
          {
            heading: {
              en: 'Textual Criticism & The Qumran Confirmation',
              tl: 'Pagsusuring Tekstuwal at ang Katibayan ng Dead Sea Scrolls',
              ilo: 'Panangsukimat kadagiti Manuskrito ken Pammaneknek ti Qumran',
            },
            greekOrHebrewTerm: 'מִקְרָא (Miqra) • Κοινή (Koine)',
            meaning: {
              en: 'Over 5,800+ Greek NT Manuscripts & 24,000+ Ancient Witnesses',
              tl: 'Mahigit 5,800 Griyegong Manuskrito ng Bagong Tipan at 24,000 Sinaunang Sipi',
              ilo: 'Nasurok 5,800 a Griego a Manuskrito ti Baro a Tulag ken 24,000 a Kadaanan a Kopia',
            },
            explanation: {
              en: 'No other work of antiquity comes close to the manuscript wealth of the Bible. Textual variants never affect a single foundational Christian doctrine.',
              tl: 'Walang anumang sinaunang aklat sa kasaysayan ang makapapantay sa dami at katumpakan ng mga manuskrito ng Bibliya.',
              ilo: 'Awan ti aniaman a kadaanan a libro iti pakasaritaan a makapada iti kaadu ken kinaumiso dagiti manuskrito ti Biblia.',
            },
            scripture: 'Isaiah 40:8; Psalm 119:89; 1 Peter 1:24–25',
          },
        ],
        scriptureAnchors: [
          {
            ref: '2 Peter 1:20–21',
            text: {
              en: '"Knowing this first, that no prophecy of the scripture is of any private interpretation. For the prophecy came not in old time by the will of man: but holy men of God spake as they were moved by the Holy Ghost."',
              tl: '"Na maalaman muna ito, na alin mang hula ng kasulatan ay hindi nagbuhat sa sariling pagpapaliwanag. Sapagka’t hindi sa kalooban ng tao dumating ang hula kailanman: kundi ang mga banal na tao ng Diyos ay nagsalita, na nangaudyukan ng Espiritu Santo."',
              ilo: '"Nga umuna nga ammuenyo daytoy, nga awan ti padto ti Surat a naggapu iti bukod a panangipatarus ti tao. Ta ti padto ket saan a dimteng idi ugma babaen ti pagayatan ti tao: no di ket dagiti nasantuan a tattao ti Dios nagsaoda bayat nga indalan ida ti Nasantuan nga Espiritu."',
            },
          },
          {
            ref: 'Psalm 118:8',
            text: {
              en: '"It is better to trust in the LORD than to put confidence in man."',
              tl: '"Lalong mabuti ang manganganlong sa Panginoon kay sa maglagak ng tiwala sa tao."',
              ilo: '"Nasaysayaat ti agkamang iti APO ngem ti agtalek iti tao."',
            },
          },
        ],
        linkedPlateIds: ['plate-02', 'plate-03'],
        interactiveWidget: 'bible-stats',
        pastoralApplication: {
          en: 'When you hold your Bible in English, Filipino, or Ilocano, remember the martyrs and scribes who preserved it across centuries. Read it daily not as a dead textbook, but as a living letter from your Heavenly Father.',
          tl: 'Sa tuwing hahawakan mo ang iyong Bibliya sa English, Filipino, o Ilocano, alalahanin ang katapatan ng Diyos na nag-ingat nito sa loob ng libu-libong taon. Basahin ito araw-araw nang may pananampalataya!',
          ilo: 'Tunggal iggemam ti Bibliam iti English, Filipino, wenno Ilocano, lagipem ti kinamatalek ti Dios a nangsalimetmet kadaytoy iti rinibu a tawen. Basaem daytoy inaldaw a sipapammati!',
        },
      },
      {
        id: 'sec-01-hermeneutics-christ66',
        sectionNumber: '1.3',
        title: {
          en: 'Biblical Hermeneutics: Rightly Dividing the Word & Finding Christ in All 66 Books',
          tl: 'Biblikal na Hermeneutika: Tamang Pagbubukod ng Salita at si Kristo sa 66 na Aklat',
          ilo: 'Biblikal a Hermeneutika: Umiso a Panangbingay iti Sao ken ni Kristo iti 66 a Libro',
        },
        subtitle: {
          en: 'The 5 Steps of Bible Study (Search, Situate, Separate, Study, Submit) & The 66-Book Christological Panorama',
          tl: 'Ang 5 Hakbang sa Pag-aaral ng Bibliya at ang Kristolohikal na Tanawin Mula Genesis Hanggang Pahayag',
          ilo: 'Dagiti 5 nga Addang iti Panagadal iti Biblia ken ti Kristolohikal a Buya Manipud Genesis Agingga iti Apocalipsis',
        },
        pastoralExposition: {
          en: 'Why do so many cults and false doctrines claim to quote the Bible? Because a text wrenched out of its context becomes a pretext for error! Paul charges every pastor and believer in 2 Timothy 2:15: "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth." The Greek participle orthotomounta ("rightly dividing") literally means "cutting a straight furrow" like a plowman, or cutting stone squarely like a master mason.\n\nTo cut a straight path through Scripture, practice the Five Pillars of Biblical Hermeneutics: (1) SEARCH the Scriptures daily like the noble Bereans (Acts 17:11), testing every human teacher by the written text; (2) SITUATE the historical, grammatical, and literary context (Nehemiah 8:8)—asking Who is speaking, To whom, What is happening, and When; (3) SEPARATE and distinguish God’s covenantal programs (2 Timothy 2:15)—recognizing the progression from the Law of Moses and the earthly Kingdom proclaimed to Israel (Matthew 4:17; 10:5–6) to the Mystery of the One Body and the Gospel of the Grace of God revealed through the risen Christ to Paul (1 Corinthians 15:1–4; Ephesians 2:8–9; 3:1–6); (4) STUDY the New Covenant epistles to understand our standing in Christ; and (5) SUBMIT your life in humble obedience (Romans 12:2). Above all, never miss the golden thread of all 66 books: JESUS CHRIST Himself (Luke 24:27; John 5:39)!',
          tl: 'Bakit maraming maling aral ang gumagamit din ng mga talata sa Bibliya? Sapagkat ang talatang hinugot mula sa konteksto ay nagagamit sa kamalian! Kaya’t mahigpit ang tagubilin ni Apostol Pablo sa 2 Timoteo 2:15: "Pagsikapan mong humarap na subok sa Diyos, manggagawang walang anomang ikahihiya, na gumagamit nang matuwid ng salita ng katotohanan." Ang salitang Griyego na orthotomounta ay nangangahulugang "maghiwa o magbukod nang tuwid."\n\nIsabuhay natin ang 5 Hakbang sa Pag-aaral ng Bibliya: (1) SALIKSIKIN (Search) ang Kasulatan araw-araw gaya ng mga taga-Berea (Gawa 17:11); (2) UNAWAIN ANG KONTEKSTO (Situate, Nehemias 8:8)—itanong kung sino ang nagsasalita, para kanino, at kailan; (3) PAGBUKURIN NANG TAMA (Separate, 2 Timoteo 2:15)—kilalanin ang kaibahan ng Kautusan at Biyaya, at unawain ang progresibong kapahayagan mula sa Ebanghelyo ng Kaharian sa Israel tungo sa Ebanghelyo ng Biyaya ng Diyos (1 Corinto 15:1–4; Efeso 3:1–6); (4) PAG-ARALAN (Study) ang ating posisyon kay Kristo; at (5) MAGPASAKOP (Submit) nang may pagsunod (Roma 12:2). Higit sa lahat, hanapin si HESU-KRISTO sa bawat isa sa 66 na aklat ng Bibliya (Lucas 24:27; Juan 5:39)!',
          ilo: 'Apay nga adu dagiti biddut a sursuro nga agaramat met kadagiti bersikulo ti Biblia? Gapu ta ti bersikulo a naala iti ruar ti kontekstona ket agbalin a pakaallilawan! Isut’ gapuna a nabileg ti bilin ni Apostol Pablo iti 2 Timoteo 2:15: "Ikagumaam ti agparang a napnek iti sangoanan ti Dios, maysa a mangmangged nga awan pakaibabainanna, a mangbingay a siuumiso iti sao ti kinapudno." Ti sao a Griego nga orthotomounta ket kayatna a sawen "mangputed wenno mangbingay a nalinteg."\n\nAramatentayo dagiti 5 nga Addang iti Panagadal iti Biblia: (1) SUKIMATEN (Search) ti Surat inaldaw kas kadagiti taga-Berea (Aramid 17:11); (2) TARUSAN TI KONTEKSTO (Situate, Nehemias 8:8)—saludsoden no siasino ti agsasao, para iti siasino, ken kaano; (3) BINGAYEN A SIUUMISO (Separate, 2 Timoteo 2:15)—ilasin ti nagdumaan ti Linteg ken Parabur, ken tarusan ti pannakaiparangarang manipud Ebanghelio ti Pagarian iti Israel agingga iti Ebanghelio ti Parabur ti Dios (1 Corinto 15:1–4; Efeso 3:1–6); (4) ADALEN (Study) ti saadtayo kenni Kristo; ken (5) AGPASAKUP (Submit) a situtulnog (Roma 12:2). Kangrunaan iti amin, biroken ni JESU-KRISTO iti tunggal maysa kadagiti 66 a libro ti Biblia (Lucas 24:27; Juan 5:39)!',
        },
        theologicalBreakdown: [
          {
            heading: {
              en: 'Orthotomounta: Rightly Dividing the Word of Truth',
              tl: 'Orthotomounta: Matuwid na Pagbubukod ng Salita ng Katotohanan',
              ilo: 'Orthotomounta: Umiso a Panangbingay iti Sao ti Kinapudno',
            },
            greekOrHebrewTerm: 'ὀρθοτομοῦντα (Orthotomounta, 2 Tim 2:15)',
            meaning: {
              en: 'Cutting Straight / Distinguishing Covenantal Administrations',
              tl: 'Pagputol nang Tuwid / Pagkilala sa Kaayusan ng mga Tipan',
              ilo: 'Panangputed a Nalinteg / Panangilasin kadagiti Tulag',
            },
            explanation: {
              en: 'Recognizes that while all Scripture is for us, we must distinguish Israel under the Mosaic Law from the Church (the Body of Christ) under the Dispensation of Grace (Ephesians 3:1–6).',
              tl: 'Kinikilala na bagama’t lahat ng Kasulatan ay para sa ating ikatututo, dapat nating makita ang kaibahan ng lumang tipan ng Kautusan at ng bagong tipan ng Biyaya kay Kristo (Efeso 3:1–6).',
              ilo: 'Bigbigenna a nupay amin a Surat ket para iti pannakasursurotayo, masapul nga ilasintayo ti nagdumaan ti daan a tulag ti Linteg ken ti baro a tulag ti Parabur kenni Kristo (Efeso 3:1–6).',
            },
            scripture: '2 Timothy 2:15; Ephesians 2:8–9; 3:1–6; 1 Corinthians 15:1–4',
          },
          {
            heading: {
              en: 'Christological Hermeneutics (The Road to Emmaus Principle)',
              tl: 'Kristolohikal na Pag-unawa (Ang Prinsipyo sa Daan Patungong Emmaus)',
              ilo: 'Kristolohikal a Panangtarus (Ti Prinsipio iti Dalan nga Agturong idiay Emaus)',
            },
            greekOrHebrewTerm: 'Χριστός (Christos, "The Anointed Messiah")',
            meaning: {
              en: 'Jesus Christ as the Centerpiece of All 66 Books',
              tl: 'Si Hesu-Kristo Bilang Sentro ng Lahat ng 66 na Aklat',
              ilo: 'Ni Jesu-Kristo Kas Sentro ti Amin a 66 a Libro',
            },
            explanation: {
              en: 'In the Old Testament Christ is predicted in Law, History, Poetry, and Prophets; in the Gospels He is present; in Acts He is proclaimed; in the Epistles He is possessed; in Revelation He is predominant!',
              tl: 'Sa Lumang Tipan si Kristo ay hinulaan; sa mga Ebanghelyo Siya ay nahayag; sa Gawa Siya ay ipinangaral; sa mga Sulat Siya ay nananahan sa atin; at sa Pahayag Siya ay naghahari!',
              ilo: 'Iti Daan a Tulag ni Kristo ket naipadto; kadagiti Ebanghelio Isu ket naiparangarang; iti Aramid Isu ket naikasaba; kadagiti Sursurat Isu ket agtaeng kadatayo; ken iti Apocalipsis Isu ket agturay!',
            },
            scripture: 'Luke 24:27, 44; John 5:39; Hebrews 10:7',
          },
        ],
        scriptureAnchors: [
          {
            ref: '2 Timothy 2:15',
            text: {
              en: '"Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth."',
              tl: '"Pagsikapan mong humarap na subok sa Diyos, manggagawang walang anomang ikahihiya, na gumagamit na matuwid ng salita ng katotohanan."',
              ilo: '"Ikagumaam ti agparang a napnek iti sangoanan ti Dios, maysa a mangmangged nga awan pakaibabainanna, a mangbingay a siuumiso iti sao ti kinapudno."',
            },
          },
          {
            ref: 'Luke 24:27',
            text: {
              en: '"And beginning at Moses and all the prophets, he expounded unto them in all the scriptures the things concerning himself."',
              tl: '"At magmula kay Moises at sa lahat ng mga propeta, ay ipinaliwanag niya sa kanila sa lahat ng mga kasulatan ang mga bagay tungkol sa kaniyang sarili."',
              ilo: '"Ket manipud kenni Moises ken kadagiti amin a mammadto, inlawlawagna kadakuada kadagiti amin a surat dagiti banbanag maipapan kenkuana."',
            },
          },
        ],
        linkedPlateIds: ['plate-04', 'plate-05', 'plate-06'],
        interactiveWidget: 'jesus-66-books',
        pastoralApplication: {
          en: 'Use the interactive 66-Book Christological Explorer below! Whenever you read any chapter of the Old or New Testament, ask two questions: (1) What is the historical context? and (2) How does this passage point me to the person and grace of Jesus Christ?',
          tl: 'Gamitin ang interactive na 66-Book Christological Explorer sa ibaba! Sa tuwing magbabasa ka ng anumang kabanata sa Bibliya, itanong: (1) Ano ang konteksto nito? at (2) Paano nito itinuturo sa akin si Hesu-Kristo?',
          ilo: 'Aramatem ti interactive a 66-Book Christological Explorer iti baba! Tunggal agbasaka iti aniaman a kapitulo ti Biblia, saludsodem: (1) Ania ti kontekstona? ken (2) Kasano nga iturongnak daytoy kenni Jesu-Kristo?',
        },
      },
    ],
    pastoralPrayer: {
      en: 'Heavenly Father, we thank You for Your living, inerrant, God-breathed Word. Forgive us for the times we have left our Bibles closed while starving in our souls. Open our eyes, by Your Holy Spirit, that we may behold wondrous things out of Your Law and see Jesus Christ shining on every page. Make us faithful Berean workmen who rightly divide the Word of truth and walk in humble obedience. In Jesus’ mighty Name, Amen.',
      tl: 'Ama naming nasa langit, nagpapasalamat kami sa Iyong buháy, di-nagkakamali, at hiningahan-ng-Diyos na Salita. Buksan Mo po ang aming mga mata sa pamamagitan ng Banal na Espiritu upang makita namin ang mga kahanga-hangang katotohanan sa Iyong Kasulatan at masilayan si Hesu-Kristo sa bawat pahina. Gawin Mo kaming tapat na manggagawa na gumagamit nang matuwid sa Salita ng katotohanan. Sa Pangalan ni Hesus, Amen.',
      ilo: 'Nailangitan nga Amami, agyamankami iti sibibiag, di-agbiddut, ken impaltiing-ti-Dios a Saom. Luktam dagiti matami babaen ti Nasantuan nga Espiritum tapno makitami dagiti nakaskasdaaw a kinapudno iti Suratmo ken maimatanganmi ni Jesu-Kristo iti tunggal panid. Pagbalinennakami a matalek a mangmangged a mangbingay a siuumiso iti Sao ti kinapudno. Iti Nagan ni Jesus, Amen.',
    },
    quiz: [
      {
        id: 'q-b1-1',
        question: {
          en: 'What does the Greek word "theopneustos" in 2 Timothy 3:16 literally mean?',
          tl: 'Ano ang literal na kahulugan ng salitang Griyego na "theopneustos" sa 2 Timoteo 3:16?',
          ilo: 'Ania ti literal a kaipapanan ti sao a Griego a "theopneustos" iti 2 Timoteo 3:16?',
        },
        options: [
          { en: 'God-breathed', tl: 'Hiningahan ng Diyos', ilo: 'Inangesan ti Dios' },
          { en: 'Humanly poetic', tl: 'Makatang likha ng tao', ilo: 'Daniw ti tao' },
          { en: 'Secretly hidden', tl: 'Lihim na nakatago', ilo: 'Nalimed a nailemmeng' },
          { en: 'Written by angels', tl: 'Isinulat ng mga anghel', ilo: 'Insurat dagiti anghel' },
        ],
        correctIndex: 0,
        explanation: {
          en: 'Theopneustos (Theos = God + pneo = to breathe) means "God-breathed," affirming that Scripture originates from the very breath of God.',
          tl: 'Ang Theopneustos (Theos = Diyos + pneo = huminga) ay nangangahulugang "hiningahan ng Diyos."',
          ilo: 'Ti Theopneustos (Theos = Dios + pneo = umanges) ket kayatna a sawen "inangesan ti Dios."',
        },
        scriptureProof: '2 Timothy 3:16',
      },
      {
        id: 'q-b1-2',
        question: {
          en: 'How many books, chapters, and verses are in the standard Protestant Bible canon?',
          tl: 'Ilang aklat, kabanata, at talata ang bumubuo sa kanon ng Bibliya?',
          ilo: 'Mano a libro, kapitulo, ken bersikulo ti mangbukel iti kanon ti Biblia?',
        },
        options: [
          { en: '66 Books, 1,189 Chapters, 31,101 Verses', tl: '66 Aklat, 1,189 Kabanata, 31,101 Talata', ilo: '66 a Libro, 1,189 a Kapitulo, 31,101 a Bersikulo' },
          { en: '73 Books, 950 Chapters, 20,000 Verses', tl: '73 Aklat, 950 Kabanata, 20,000 Talata', ilo: '73 a Libro, 950 a Kapitulo, 20,000 a Bersikulo' },
          { en: '50 Books, 1,000 Chapters, 15,000 Verses', tl: '50 Aklat, 1,000 Kabanata, 15,000 Talata', ilo: '50 a Libro, 1,000 a Kapitulo, 15,000 a Bersikulo' },
          { en: '40 Books, 500 Chapters, 10,101 Verses', tl: '40 Aklat, 500 Kabanata, 10,101 Talata', ilo: '40 a Libro, 500 a Kapitulo, 10,101 a Bersikulo' },
        ],
        correctIndex: 0,
        explanation: {
          en: 'The Bible consists of 66 books (39 Old Testament + 27 New Testament), 1,189 chapters, and 31,101 verses.',
          tl: 'Ang Bibliya ay binubuo ng 66 na aklat (39 sa Lumang Tipan + 27 sa Bagong Tipan), 1,189 kabanata, at 31,101 talata.',
          ilo: 'Ti Biblia ket buklen ti 66 a libro (39 iti Daan a Tulag + 27 iti Baro a Tulag), 1,189 a kapitulo, ken 31,101 a bersikulo.',
        },
        scriptureProof: 'Psalm 117; Psalm 118:8; Psalm 119',
      },
      {
        id: 'q-b1-3',
        question: {
          en: 'What are the 5 Steps of Bible Study taught in our Hermeneutics framework?',
          tl: 'Ano ang 5 Hakbang sa Pag-aaral ng Bibliya sa ating Hermeneutics framework?',
          ilo: 'Ania dagiti 5 nga Addang iti Panagadal iti Biblia iti Hermeneutics framework-tayo?',
        },
        options: [
          {
            en: 'Search, Situate, Separate, Study, Submit',
            tl: 'Search (Saliksikin), Situate (Konteksto), Separate (Pagbukurin), Study (Pag-aralan), Submit (Magpasakop)',
            ilo: 'Search (Sukimaten), Situate (Konteksto), Separate (Bingayen), Study (Adalen), Submit (Agpasakup)',
          },
          {
            en: 'Skim, Guess, Debate, Memorize, Forget',
            tl: 'Pasadahan, Hulaan, Makipagtalo, Sauluhin, Kalimutan',
            ilo: 'Labsan, Pugtuan, Makisupiat, Kabisaduen, Lipaten',
          },
          {
            en: 'Tradition, Emotion, Opinion, Vision, Philosophy',
            tl: 'Tradisyon, Damdamin, Opinyon, Pangitain, Pilosopiya',
            ilo: 'Tradision, Rikna, Opinion, Sirmata, Pilosopia',
          },
          {
            en: 'Translate, Edit, Rewrite, Publish, Sell',
            tl: 'Isalin, Baguhin, Isulat Muli, Ilathala, Ibenta',
            ilo: 'Ipatarus, Baliwan, Isurat Manen, Iablaak, Ilako',
          },
        ],
        correctIndex: 0,
        explanation: {
          en: 'Search (Acts 17:11), Situate context (Nehemiah 8:8), Separate/Rightly Divide (2 Timothy 2:15), Study doctrine (Ephesians 3:1–6), and Submit in obedience (Romans 12:2).',
          tl: 'Saliksikin (Gawa 17:11), Unawain ang konteksto (Nehemias 8:8), Pagbukurin nang matuwid (2 Timoteo 2:15), Pag-aralan (Efeso 3:1–6), at Magpasakop (Roma 12:2).',
          ilo: 'Sukimaten (Aramid 17:11), Tarusan ti konteksto (Nehemias 8:8), Bingayen a siuumiso (2 Timoteo 2:15), Adalen (Efeso 3:1–6), ken Agpasakup (Roma 12:2).',
        },
        scriptureProof: '2 Timothy 2:15; Acts 17:11; Romans 12:2',
      },
    ],
  },
  {
    id: 'book-02-theology-proper',
    bookNumber: 2,
    romanNumeral: 'II',
    doctrineCode: 'THEOLOGY PROPER & TRINITARIANISM',
    greekEtymology: 'Θεός (Theos, "God") + λόγος (Logos, "Doctrine/Word") • Τριάς (Trias, "Trinity")',
    title: {
      en: 'The Doctrine of God: Attributes, Hebrew Names & The Holy Trinity',
      tl: 'Ang Doktrina ng Diyos: Mga Katangian, Pangalang Hebreo at Ang Banal na Trinidad',
      ilo: 'Ti Doktrina ti Dios: Dagiti Kababalin, Nagan a Hebreo ken Ti Nasantuan a Trinidad',
    },
    subtitle: {
      en: 'Incommunicable & Moral Attributes, 25 Covenant Names of YHWH & El, The Shield of the Trinity (Ephesians 2:18) & Trinitarian Work in Salvation',
      tl: 'Natatangi at Moral na Katangian, 25 Pangalan ng Diyos, Kalasag ng Trinidad (Efeso 2:18) at Gawa ng Tatlong Persona sa Kaligtasan',
      ilo: 'Naisangsangayan ken Moral a Kababalin, 25 a Nagan ti Dios, Kalasag ti Trinidad (Efeso 2:18) ken Aramid ti Тallo a Persona iti Pakaisalakanan',
    },
    heroArtUrl: '/images/generated/chapter-02-trinity.jpg',
    accentColor: 'from-blue-500 via-indigo-500 to-cyan-500',
    estimatedMinutes: 40,
    keyVerse: {
      ref: 'Ephesians 2:18; Exodus 34:6',
      text: {
        en: '"For through him [the Son] we both have access by one Spirit unto the Father." (Ephesians 2:18) • "The LORD, The LORD God, merciful and gracious, longsuffering, and abundant in goodness and truth." (Exodus 34:6)',
        tl: '"Sapagka’t sa pamamagitan niya [ng Anak] tayo’y may pagpasok sa isang Espiritu sa Ama." (Efeso 2:18) • "Ang Panginoon, ang Panginoong Diyos na puspos ng kahabagan at mapagkaloob, banayad sa pagkagalit, at sagana sa kagandahang-loob at katotohanan." (Exodo 34:6)',
        ilo: '"Ta babaen kenkuana [ti Anak] addaantayo agpada iti idadalan iti maymaysa nga Espiritu nga agturong iti Ama." (Efeso 2:18) • "Ti APO, ti APO a Dios a manangngaasi ken managparabur, nainayad nga agpungtot, ken nawadwad iti kinaimbag ken kinapudno." (Exodo 34:6)',
      },
      commentary: {
        en: 'Ephesians 2:18 encapsulates the entire mystery of Trinitarian communion in a single verse: our access is UNTO the Father, THROUGH the Son, BY the one Spirit!',
        tl: 'ipinapahayag ng Efeso 2:18 ang buong hiwaga ng Trinidad sa iisang talata: lumalapit tayo SA Ama, SA PAMAMAGITAN ng Anak, at SA iisang Espiritu!',
        ilo: 'Iparangarang ti Efeso 2:18 ti intero a palimed ti Trinidad iti maymaysa a bersikulo: umasidegtayo ITI Ama, BABAEN ti Anak, ken ITI maymaysa nga Espiritu!',
      },
    },
    pastoralPrologue: {
      en: 'A.W. Tozer famously observed that what comes into our minds when we think about God is the most important thing about us. No church or believer can rise higher than their concept of God! When our view of God is small, our anxieties grow gigantic and our worship becomes shallow entertainment. But when we behold God as He reveals Himself in Scripture—Infinite, Self-Existent, Thrice-Holy, Sovereign, yet abounding in covenant love (hesed)—our hearts bow in adoring wonder. In Book II, we explore who God is across every human calling, examine His 21 Unique and Moral Attributes, unlock His 25 Hebrew Covenant Names (YHWH and El), and contemplate the glorious mystery of the Holy Trinity.',
      tl: 'Ang pinakamahalagang bagay tungkol sa isang tao ay kung ano ang pumapasok sa kanyang isipan kapag iniisip niya ang Diyos. Kapag maliit ang ating pagkakilala sa Diyos, nagiging dambuhala ang ating mga pangamba at nagiging mababaw ang ating pagsamba. Ngunit kapag nakita natin ang Diyos ayon sa Kanyang kapahayagan sa Kasulatan—Walang-Hanggan, Umiiral sa Sarili, Banal na Banal, Soberano, ngunit sagana sa tapat na pag-ibig (hesed)—ang ating puso ay napupuno ng pagsamba at kapayapaan. Sa Ikalawang Aklat na ito, susuriin natin ang 21 Katangian ng Diyos, ang 25 Pangalang Hebreo (YHWH at El), at ang hiwaga ng Banal na Trinidad.',
      ilo: 'Ti kapatgan a banag maipapan iti maysa a tao ket no ania ti sumrek iti panunotna no panunotenna ti Dios. No bassit ti panangammotayo iti Dios, agbalin a dadakkel dagiti danagtayo ken agbalin nga ababaw ti panagdayawtayo. Ngem no makitatayo ti Dios sigun iti pannakaiparangarangna iti Surat—Awan-Patinggana, Agbibiag iti Bagina, Kasantoan, Soberano, ngem nawadwad iti matalek nga ayat (hesed)—ti pusotayo ket mapno iti panagdayaw ken talna. Iti daytoy Maikadua a Libro, adalentayo dagiti 21 a Kababalin ti Dios, dagiti 25 a Nagan a Hebreo (YHWH ken El), ken ti palimed ti Nasantuan a Trinidad.',
    },
    sections: [
      {
        id: 'sec-02-attributes-names',
        sectionNumber: '2.1',
        title: {
          en: 'The Attributes of God & The 25 Covenant Names of YHWH and El',
          tl: 'Ang mga Katangian ng Diyos at ang 25 Pangalan ng Pakikipagtipan (YHWH at El)',
          ilo: 'Dagiti Kababalin ti Dios ken dagiti 25 a Nagan ti Tulag (YHWH ken El)',
        },
        subtitle: {
          en: 'Incommunicable Majesty Meets Communicable Grace: Why "Those Who Know Your Name Put Their Trust in You" (Psalm 9:10)',
          tl: 'Natatanging Kadakilaan at Moral na Kabutihan: Bakit "Ang Nakakakilala ng Iyong Pangalan ay Nagtitiwala sa Iyo" (Awit 9:10)',
          ilo: 'Naisangsangayan a Kinatan-ok ken Moral a Kinaimbag: Apay a "Dagiti Makaammo iti Naganmo Agtalekda Kenka" (Salmo 9:10)',
        },
        pastoralExposition: {
          en: 'How can finite creatures know the infinite Creator? Only because God has graciously stooped down to reveal His attributes and His Names! Systematic theologians distinguish between God’s Incommunicable (Unique) Attributes—those ontological perfections that belong to God alone and cannot be shared by creatures—and His Communicable (Moral) Attributes—those glorious facets of His character that He stamps upon His image-bearers through sanctification.\n\nLook first at His Unique Attributes: He is Eternal (Psalm 90:2, dwelling outside the succession of time), Omnipotent (Genesis 17:1, possessing all power), Omniscient (Psalm 139:1–6, knowing all actual and possible things effortlessly), Omnipresent (Psalm 139:7–12, present in His whole being at every point in space), Immutable (Malachi 3:6; James 1:17, unchanging in His essence and promises), Self-Existent and Self-Sufficient (Exodus 3:14; Acts 17:24–25, possessing Aseity—needing nothing outside Himself), Infinite and Transcendent (1 Kings 8:27; Isaiah 55:8–9), Sovereign (Daniel 4:35), and Thrice-Holy (Isaiah 6:3). Now marvel that this same transcendent Monarch is simultaneously Love (1 John 4:8), Merciful, Gracious, Longsuffering, Truthful, Just, and Faithful (Exodus 34:6)—and reveals Himself personally as Jehovah-Jireh (Provider), Jehovah-Rapha (Healer), Jehovah-Shalom (Peace), Jehovah-Rohi (Shepherd), Jehovah-Tsidkenu (Righteousness), and Jehovah-Shammah (Ever-Present)!',
          tl: 'Paano makikilala ng may-hangganang nilalang ang walang-hanggang Manlilikha? Tanging dahil sa biyaya ng Diyos na naghayag ng Kanyang mga katangian at mga Pangalan! Hinahati ng mga teologo ang mga katangian ng Diyos sa Kanyang Natatanging Katangian (Incommunicable Attributes) na sa Diyos lamang matatagpuan, at sa Kanyang Moral na Katangian (Communicable Attributes) na ibinabahagi Niya sa Kanyang mga anak.\n\nMasdan ang Kanyang Natatanging Katangian: Siya ay Walang-Hanggan (Awit 90:2), Makapangyarihan sa Lahat (Genesis 17:1), Nakaaalam ng Lahat (Awit 139:1–6), Nasa Lahat ng Dako (Awit 139:7–12), Di-Nagbabago (Malakias 3:6), Umiiral at Sapat sa Sarili (Exodo 3:14; Gawa 17:24–25), Soberano (Daniel 4:35), at Banal na Banal (Isaias 6:3). At ang dakilang Diyos na ito ay Siya ring Pag-ibig (1 Juan 4:8), Mahabagin, Mapagbiyaya, Matiyaga, Tapat, at Matuwid (Exodo 34:6)—na nagpakilala bilang Jehovah-Jireh (Tagapagkaloob), Jehovah-Rapha (Tagapagpagaling), Jehovah-Shalom (Kapayapaan), Jehovah-Rohi (Pastol), Jehovah-Tsidkenu (Katuwiran), at Jehovah-Shammah (Laging Kasama)!',
          ilo: 'Kasano a maam-ammo ti addaan-patingga a parsua ti awan-patinggana a Namarsua? Babaen laeng iti parabur ti Dios a nangiparangarang kadagiti kababalin ken Naganna! Bingayen dagiti teologo dagiti kababalin ti Dios kadagiti Naisangsangayan a Kababalinna (Incommunicable Attributes) a kukua ti Dios laeng, ken kadagiti Moral a Kababalinna (Communicable Attributes) nga ibingayna kadagiti annakna.\n\nKitaenyo dagiti Naisangsangayan a Kababalinna: Isu ket Agnanayon (Salmo 90:2), Mannakabalin-amin (Genesis 17:1), Ammo-amin (Salmo 139:1–6), Adda iti Amin a Disso (Salmo 139:7–12), Di-Agbaliw (Malaquias 3:6), Agbibiag ken Umdas iti Bagina (Exodo 3:14; Aramid 17:24–25), Soberano (Daniel 4:35), ken Kasantoan (Isaias 6:3). Ket daytoy a natan-ok a Dios ket Isu met laeng ti Ayat (1 Juan 4:8), Manangngaasi, Managparabur, Naanus, Matalek, ken Nalinteg (Exodo 34:6)—a nangipakaammo iti bagina kas Jehovah-Jireh (Mangipaay), Jehovah-Rapha (Mangpaimbag), Jehovah-Shalom (Kappia), Jehovah-Rohi (Pastor), Jehovah-Tsidkenu (Kinalinteg), ken Jehovah-Shammah (Kankanayon nga Adda)!',
        },
        theologicalBreakdown: [
          {
            heading: {
              en: 'Divine Aseity & Immutability (Exodus 3:14; Malachi 3:6)',
              tl: 'Pag-iral sa Sarili (Aseity) at Di-Pagbabago ng Diyos',
              ilo: 'Panagbiag iti Bagi (Aseity) ken Kina-di-agbaliw ti Dios',
            },
            greekOrHebrewTerm: 'אֶהְיֶה אֲשֶׁר אֶהְיֶה (Ehyeh Asher Ehyeh, Exod 3:14)',
            meaning: {
              en: 'I AM THAT I AM — Uncaused, Independent, Unchanging',
              tl: 'AKO NGA — Walang Pinagmulan, Di-Nakadepende, Di-Nagbabago',
              ilo: 'SIAK TI SIAK — Awan Nagtaudanna, Di-Agpannuray, Di-Agbaliw',
            },
            explanation: {
              en: 'Because God does not change ("I the LORD do not change; therefore you, O sons of Jacob, are not consumed," Malachi 3:6), our salvation is anchored in bedrock, not shifting sand.',
              tl: 'Dahil ang Diyos ay hindi nagbabago ("Sapagka’t akong Panginoon ay hindi nababago, kaya’t kayo... ay hindi natupok," Malakias 3:6), ang ating kaligtasan ay matibay at tiyak.',
              ilo: 'Gapu ta ti Dios ket saan nga agbaliw ("Ta siak ti APO saanak nga agbaliw; gapuna dakayo... saankayo a naibus," Malaquias 3:6), ti pannakaisalakantayo ket natibker ken sigurado.',
            },
            scripture: 'Exodus 3:14; Malachi 3:6; James 1:17',
          },
          {
            heading: {
              en: 'The Harmony of Holiness, Justice, Love & Mercy at the Cross',
              tl: 'Ang Pagkakaisa ng Kabanalan, Katarungan, Pag-ibig at Habag sa Krus',
              ilo: 'Ti Panagmaymaysa ti Kinasanto, Kinahustisia, Ayat ken Asi idiay Krus',
            },
            greekOrHebrewTerm: 'חֶסֶד וֶאֱמֶת (Hesed we-Emet, Psalm 85:10)',
            meaning: {
              en: 'Mercy and Truth Have Met Together; Righteousness and Peace Have Kissed',
              tl: 'Ang Kaawaan at Katotohanan ay Nagsalubong; Ang Katuwiran at Kapayapaan ay Naghalikan',
              ilo: 'Ti Asi ken Kinapudno Nagtiponda; Ti Kinalinteg ken Kappia Naginnagekda',
            },
            explanation: {
              en: 'God’s attributes never conflict: His holiness and justice demanded sin’s penalty, and His love and mercy provided His own Son to pay it (Romans 3:26: "that He might be just and the justifier").',
              tl: 'Hindi kailanman nagkakasalungat ang mga katangian ng Diyos: hiningi ng Kanyang katarungan ang kabayaran ng kasalanan, at ibinigay ng Kanyang pag-ibig ang sarili Niyang Anak sa Kalbaryo (Roma 3:26).',
              ilo: 'Saan a pulos nga agsusupiat dagiti kababalin ti Dios: kinalikaguman ti kinahustisiana ti bayad ti basol, ket impaay ti ayatna ti bukodna nga Anak idiay Kalbario (Roma 3:26).',
            },
            scripture: 'Psalm 85:10; Exodus 34:6–7; Romans 3:25–26',
          },
        ],
        scriptureAnchors: [
          {
            ref: 'Psalm 9:10',
            text: {
              en: '"And they that know thy name will put their trust in thee: for thou, LORD, hast not forsaken them that seek thee."',
              tl: '"At silang nangakakaalam ng iyong pangalan ay maglalagak ng kanilang tiwala sa iyo; sapagka’t ikaw, Panginoon, ay hindi mo pinabayaan sila na nagsisihanap sa iyo."',
              ilo: '"Ket dagiti makaammo iti naganmo agtalekdanto kenka: ta sika, O APO, dika binaybay-an dagiti agsapul kenka."',
            },
          },
        ],
        linkedPlateIds: ['plate-07', 'plate-08', 'plate-09', 'plate-10', 'plate-11'],
        interactiveWidget: 'attributes-god',
        pastoralApplication: {
          en: 'Whatever valley you are walking through today, pray God’s covenant Hebrew Name directly into that situation: if you face financial or spiritual lack, call upon Yahweh-Jireh; in sickness or heartbreak, call upon Yahweh-Rapha; in anxiety, rest in Yahweh-Shalom.',
          tl: 'Anumang pagsubok ang iyong dinaranas ngayon, ipanalangin ang Pangalan ng Diyos na tumutugon dito: sa kakulangan, tumawag kay Yahweh-Jireh; sa karamdaman, kay Yahweh-Rapha; sa kabalisahan, magpahinga kay Yahweh-Shalom.',
          ilo: 'Aniaman a suot ti padasem ita, ikararagmo ti Nagan ti Dios a mangsungbat kadaytoy: iti kinakurang, umawagka kenni Yahweh-Jireh; iti sakit, kenni Yahweh-Rapha; iti danag, aginanaka kenni Yahweh-Shalom.',
        },
      },
      {
        id: 'sec-02-trinity-shield-salvation',
        sectionNumber: '2.2',
        title: {
          en: 'The Holy Trinity: Unity of Essence, Distinction of Persons & Work in Salvation',
          tl: 'Ang Banal na Trinidad: Iisang Diwa, Tatlong Persona, at ang Gawa sa Kaligtasan',
          ilo: 'Ti Nasantuan a Trinidad: Maymaysa a Nakaisigudan, Тallo a Persona, ken ti Aramid iti Pakaisalakanan',
        },
        subtitle: {
          en: 'Expositing the Shield of the Trinity (Ephesians 2:11–22) & The Economic Trinity in Redemption (Ephesians 3:10–11)',
          tl: 'Pagpapaliwanag sa Kalasag ng Trinidad (Efeso 2:11–22) at ang Gawa ng Ama, Anak, at Espiritu Santo sa Pagtubos (Efeso 3:10–11)',
          ilo: 'Panangilawlawag iti Kalasag ti Trinidad (Efeso 2:11–22) ken ti Aramid ti Ama, Anak, ken Nasantuan nga Espiritu iti Pannakasubbot (Efeso 3:10–11)',
        },
        pastoralExposition: {
          en: 'The Doctrine of the Holy Trinity is the supreme distinguishing mark of historic biblical Christianity. We do not believe in three Gods (Tritheism), nor do we believe in one Person who merely wears three sequential masks (Modalism/Sabellianism), nor do we believe that the Son is a lesser created deity (Arianism). Rather, Scripture reveals three eternal, foundational truths summarized in the Shield of the Trinity:\n\n1. There is strictly ONE God—one indivisible divine Essence or Nature (Deuteronomy 6:4: "Hear, O Israel: The LORD our God, the LORD is one!"; Isaiah 45:5).\n2. This one God exists eternally as THREE distinct Persons—the Father, the Son, and the Holy Spirit—who love, commune with, and glorify one another (Matthew 3:16–17 at Jesus’ baptism; Matthew 28:19 in the Great Commission; 2 Corinthians 13:14 in the Apostolic Benediction).\n3. Each Person possesses the whole divine Essence: The Father IS God (1 Corinthians 8:6), the Son IS God (John 1:1; 20:28; Titus 2:13; Hebrews 1:8), and the Holy Spirit IS God (Acts 5:3–4; 2 Corinthians 3:17). And in our salvation (Ephesians 1:3–14; 2:18; 3:10–11), the Father PLANNED and purposed redemption before time began, the Son FULFILLED and purchased it on the Cross, and the Holy Spirit REVEALED and applies it within our hearts!',
          tl: 'Ang Doktrina ng Banal na Trinidad ang pangunahing tatak ng Biblikal na Kristiyanismo. Hindi tayo naniniwala sa tatlong magkakahiwalay na Diyos (Triteismo), at hindi rin tayo naniniwala na iisang Persona lamang na nagpapalit-palit ng maskara (Modalismo), o na ang Anak ay nilalang lamang (Arianismo). Sa halip, inihahayag ng Kasulatan ang tatlong walang-hanggang katotohanan na makikita sa Kalasag ng Trinidad:\n\n1. Mayroon lamang IISANG Diyos—iisang di-nahahating kalikasan o diwa (Deuteronomio 6:4; Isaias 45:5).\n2. Ang iisang Diyos na ito ay walang-hanggang umiiral sa TATLONG magkaibang Persona—ang Ama, ang Anak, at ang Espiritu Santo (Mateo 3:16–17 sa bautismo ni Hesus; Mateo 28:19; 2 Corinto 13:14).\n3. Ang bawat Persona ay ganap na Diyos: Ang Ama ay Diyos (1 Corinto 8:6), ang Anak ay Diyos (Juan 1:1; 20:28; Tito 2:13), at ang Espiritu Santo ay Diyos (Gawa 5:3–4). At sa ating kaligtasan (Efeso 1:3–14; 2:18; 3:10–11): BINALANGKAS ito ng Ama bago pa ang panahon, TINUPAD ito ng Anak sa Krus, at INIHAYAG at inilapat ito ng Banal na Espiritu sa ating mga puso!',
          ilo: 'Ti Doktrina ti Nasantuan a Trinidad ti kangrunaan a pagilasinan ti Biblikal a Kristianismo. Saantayo a mamati iti tallo a nagsisina a Dios (Triteismo), ken saantayo met a mamati a maymaysa laeng a Persona nga agsukat-sukat iti maskara (Modalismo), wenno ti Anak ket naparsua laeng (Arianismo). No di ket, iparangarang ti Surat ti tallo nga agnanayon a kinapudno a makita iti Kalasag ti Trinidad:\n\n1. Adda laeng MAYMAYSA a Dios—maymaysa a di-mabingay a nakaisigudan (Deuteronomio 6:4; Isaias 45:5).\n2. Daytoy a maymaysa a Dios ket agnanayon nga agbibiag iti TALLO a nagduma a Persona—ti Ama, ti Anak, ken ti Nasantuan nga Espiritu (Mateo 3:16–17 iti panagbautisar ni Jesus; Mateo 28:19; 2 Corinto 13:14).\n3. Tunggal Persona ket naan-anay a Dios: Ti Ama ket Dios (1 Corinto 8:6), ti Anak ket Dios (Juan 1:1; 20:28; Tito 2:13), ken ti Nasantuan nga Espiritu ket Dios (Aramid 5:3–4). Ket iti pannakaisalakantayo (Efeso 1:3–14; 2:18; 3:10–11): IMPLANO daytoy ti Ama sakbay pay ti panawen, TINUNGPAL daytoy ti Anak idiay Krus, ken IMPARANGARANG ken impakat daytoy ti Nasantuan nga Espiritu kadagiti pusotayo!',
        },
        theologicalBreakdown: [
          {
            heading: {
              en: 'Ontological Trinity (Who God Is in Himself)',
              tl: 'Ontolohikal na Trinidad (Sino ang Diyos sa Kanyang Sarili)',
              ilo: 'Ontolohikal a Trinidad (Siasino ti Dios iti Bagina)',
            },
            greekOrHebrewTerm: 'Μία Οὐσία, Τρεῖς Ὑποστάσεις (Mia Ousia, Treis Hypostaseis)',
            meaning: {
              en: 'One Essence / Substance, Three Distinct Persons',
              tl: 'Iisang Diwa o Kalikasan, Tatlong Magkaibang Persona',
              ilo: 'Maymaysa a Nakaisigudan, Тallo a Nagduma a Persona',
            },
            explanation: {
              en: 'Father, Son, and Holy Spirit are co-equal, co-eternal, and consubstantial (homoousios), sharing the exact same divine glory and majesty.',
              tl: 'Ang Ama, Anak, at Espiritu Santo ay magkakapantay, kapwa walang-hanggan, at nagtataglay ng iisang kaluwalhatian ng pagka-Diyos.',
              ilo: 'Ti Ama, Anak, ken Nasantuan nga Espiritu ket agpapada, agnanayon, ken agikut iti maymaysa a dayag ti kina-Dios.',
            },
            scripture: 'Matthew 28:19; John 10:30; 14:9; 2 Corinthians 13:14',
          },
          {
            heading: {
              en: 'Economic Trinity (How Father, Son & Spirit Work in Redemption)',
              tl: 'Ekonomikong Trinidad (Ang Gawa ng Ama, Anak at Espiritu sa Pagtubos)',
              ilo: 'Ekonomiko a Trinidad (Ti Aramid ti Ama, Anak ken Espiritu iti Pannakasubbot)',
            },
            greekOrHebrewTerm: 'Οἰκονομία (Oikonomia, Eph 1:10; 3:9)',
            meaning: {
              en: 'The Father Planned • The Son Fulfilled • The Spirit Revealed',
              tl: 'Binalangkas ng Ama • Tinupad ng Anak • Inihayag ng Espiritu',
              ilo: 'Implano ti Ama • Tinungpal ti Anak • Imparangarang ti Espiritu',
            },
            explanation: {
              en: 'In Ephesians 1:3–14, verses 3–6 praise the Father who chose us; verses 7–12 praise the Son who redeemed us by His blood; verses 13–14 praise the Holy Spirit who sealed us as our earnest of inheritance.',
              tl: 'Sa Efeso 1:3–14, ang talata 3–6 ay papuri sa Ama na pumili at nagplano; ang talata 7–12 ay papuri sa Anak na tumubos sa pamamagitan ng Kanyang dugo; ang talata 13–14 ay papuri sa Banal na Espiritu na nagtatak sa atin.',
              ilo: 'Iti Efeso 1:3–14, dagiti bersikulo 3–6 ket panagdayaw iti Ama a nangpili ken nangplano; dagiti bersikulo 7–12 ket panagdayaw iti Anak a nangsubbot babaen ti darana; dagiti bersikulo 13–14 ket panagdayaw iti Nasantuan nga Espiritu a nangselio kadatayo.',
            },
            scripture: 'Ephesians 1:3–14; 2:18; 3:10–11; 1 Peter 1:2',
          },
        ],
        scriptureAnchors: [
          {
            ref: 'Matthew 28:19',
            text: {
              en: '"Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost."',
              tl: '"Dahil dito magsiyaon nga kayo, at gawin ninyong mga alagad ang lahat ng mga bansa, na sila’y inyong bautismuhan sa pangalan ng Ama at ng Anak at ng Espiritu Santo."',
              ilo: '"Inkay ngarud, ket pagbalinenyo nga adalan dagiti amin a nasion, a bautisaranyo ida iti nagan ti Ama ken ti Anak ken ti Nasantuan nga Espiritu."',
            },
          },
          {
            ref: '2 Corinthians 13:14',
            text: {
              en: '"The grace of the Lord Jesus Christ, and the love of God, and the communion of the Holy Ghost, be with you all. Amen."',
              tl: '"Ang biyaya ng Panginoong Jesucristo, at ang pag-ibig ng Diyos, at ang pakikipagkaisa ng Espiritu Santo ay sumainyo nawang lahat."',
              ilo: '"Ti parabur ni Apo Jesu-Cristo, ken ti ayat ti Dios, ken ti pannakikadua ti Nasantuan nga Espiritu adda koma kadakayo amin. Amen."',
            },
          },
        ],
        linkedPlateIds: ['plate-12', 'plate-13'],
        interactiveWidget: 'trinity-shield',
        pastoralApplication: {
          en: 'Interact with the Shield of the Trinity visualizer below! Notice how every prayer you pray is a Trinitarian miracle: you pray TO the Father, IN the Name and blood of the Son, BY the prompting and groaning of the Holy Spirit.',
          tl: 'Gamitin ang interactive na Kalasag ng Trinidad sa ibaba! Pansinin kung paanong ang bawat panalangin mo ay isang Trinitaryanong himala: nananalangin ka SA Ama, SA Pangalan ng Anak, at SA kapangyarihan ng Banal na Espiritu.',
          ilo: 'Aramatem ti interactive a Kalasag ti Trinidad iti baba! Imutektekam no kasano a ti tunggal kararagmo ket maysa a Trinitariano a milagro: agkararagka ITI Ama, ITI Nagan ti Anak, ken ITI pannakabalin ti Nasantuan nga Espiritu.',
        },
      },
    ],
    pastoralPrayer: {
      en: 'Holy, Holy, Holy LORD God Almighty, Father, Son, and Holy Spirit—we bow before Your infinite majesty! You are El Shaddai, our All-Sufficient Almighty; Yahweh-Jireh, our Provider; Yahweh-Rapha, our Healer; and Yahweh-Shalom, our Peace. Thank You, Father, for planning our salvation; thank You, Lord Jesus, for fulfilling it on the Cross; thank You, Holy Spirit, for revealing and sealing it in our hearts. To the Triune God be glory forever and ever, Amen.',
      tl: 'Banal, Banal, Banal na Panginoong Diyos na Makapangyarihan sa Lahat—Ama, Anak, at Espiritu Santo—kami ay lumuluhod sa Iyong walang-hanggang kadakilaan! Ikaw ang El Shaddai, Yahweh-Jireh, Yahweh-Rapha, at Yahweh-Shalom. Salamat, Ama, sa pagbabalangkas ng aming kaligtasan; salamat, Panginoong Hesus, sa pagtupad nito sa Krus; salamat, Banal na Espiritu, sa paghahayag at pagtatatak nito sa aming puso. Amen.',
      ilo: 'Nasantuan, Nasantuan, Nasantuan nga APO a Dios a Mannakabalin-amin—Ama, Anak, ken Nasantuan nga Espiritu—agparintumengkami iti sangoanan ti awan-patinggana a kinatan-okmo! Sika ti El Shaddai, Yahweh-Jireh, Yahweh-Rapha, ken Yahweh-Shalom. Agyamankami, Ama, iti panangplanom iti pannakaisalakanmi; agyamankami, Apo Jesus, iti panangtungpalmo kadaytoy idiay Krus; agyamankami, Nasantuan nga Espiritu, iti panangiparangarang ken panangseliom kadaytoy kadagiti pusomi. Amen.',
    },
    quiz: [
      {
        id: 'q-b2-1',
        question: {
          en: 'According to the Shield of the Trinity and Ephesians 2:18, which statement is biblically accurate?',
          tl: 'Ayon sa Kalasag ng Trinidad at Efeso 2:18, alin sa mga sumusunod ang biblikal at tama?',
          ilo: 'Sigun iti Kalasag ti Trinidad ken Efeso 2:18, ania kadagitoy ti biblikal ken umiso?',
        },
        options: [
          {
            en: 'The Father is God, the Son is God, and the Holy Spirit is God—One Essence, Three Distinct Persons',
            tl: 'Ang Ama ay Diyos, ang Anak ay Diyos, at ang Espiritu Santo ay Diyos—Iisang Diwa, Tatlong Magkaibang Persona',
            ilo: 'Ti Ama ket Dios, ti Anak ket Dios, ken ti Nasantuan nga Espiritu ket Dios—Maymaysa a Nakaisigudan, Тallo a Nagduma a Persona',
          },
          {
            en: 'There are three separate Gods with three different natures',
            tl: 'May tatlong magkakahiwalay na Diyos na may iba’t ibang kalikasan',
            ilo: 'Adda tallo a nagsisina a Dios nga addaan nagduduma a nakaisigudan',
          },
          {
            en: 'The Father, Son, and Spirit are just three temporary masks worn by one person',
            tl: 'Ang Ama, Anak, at Espiritu ay tatlong pansamantalang maskara lamang ng iisang persona',
            ilo: 'Ti Ama, Anak, ken Espiritu ket tallo laeng a temporario a maskara ti maymaysa a persona',
          },
          {
            en: 'Only the Father is truly God while the Son is a created angel',
            tl: 'Tanging ang Ama lamang ang tunay na Diyos at ang Anak ay nilikhang anghel',
            ilo: 'Ti laeng Ama ti pudno a Dios ket ti Anak ket naparsua nga anghel',
          },
        ],
        correctIndex: 0,
        explanation: {
          en: 'Orthodox Trinitarianism affirms One Divine Essence (Homoousios) shared eternally by Three Distinct Persons: Father, Son, and Holy Spirit.',
          tl: 'Pinaninindigan ng Biblikal na Trinitaryanismo ang Iisang Diwa ng Pagka-Diyos sa Tatlong Magkaibang Persona: Ama, Anak, at Espiritu Santo.',
          ilo: 'Pasingkedan ti Biblikal a Trinitarianismo ti Maymaysa a Nakaisigudan ti Kina-Dios iti Тallo a Nagduma a Persona: Ama, Anak, ken Nasantuan nga Espiritu.',
        },
        scriptureProof: 'Ephesians 2:18; Matthew 28:19; 2 Corinthians 13:14',
      },
      {
        id: 'q-b2-2',
        question: {
          en: 'Which Hebrew covenant name of God means "The LORD Our Righteousness" (Jeremiah 23:6)?',
          tl: 'Aling pangalang Hebreo ng Diyos ang nangangahulugang "Ang Panginoon na Ating Katuwiran" (Jeremias 23:6)?',
          ilo: 'Ania a Hebreo a nagan ti Dios ti kayatna a sawen "Ti APO a Kinalintegtayo" (Jeremias 23:6)?',
        },
        options: [
          { en: 'Jehovah-Tsidkenu (Yahweh-Tsidkenu)', tl: 'Jehovah-Tsidkenu (Yahweh-Tsidkenu)', ilo: 'Jehovah-Tsidkenu (Yahweh-Tsidkenu)' },
          { en: 'Jehovah-Rapha', tl: 'Jehovah-Rapha', ilo: 'Jehovah-Rapha' },
          { en: 'Jehovah-Nissi', tl: 'Jehovah-Nissi', ilo: 'Jehovah-Nissi' },
          { en: 'El Roi', tl: 'El Roi', ilo: 'El Roi' },
        ],
        correctIndex: 0,
        explanation: {
          en: 'Tzedek means righteousness in Hebrew; Jeremiah 23:6 prophesies the Messiah as YHWH-Tsidkenu, "The LORD Our Righteousness."',
          tl: 'Ang Tzedek sa Hebreo ay katuwiran; ipinahayag ng Jeremias 23:6 ang Mesiyas bilang YHWH-Tsidkenu, "Ang Panginoon na Ating Katuwiran."',
          ilo: 'Ti Tzedek iti Hebreo ket kinalinteg; impadto ti Jeremias 23:6 ti Mesias kas YHWH-Tsidkenu, "Ti APO a Kinalintegtayo."',
        },
        scriptureProof: 'Jeremiah 23:6; 2 Corinthians 5:21',
      },
    ],
  },
  {
    id: 'book-03-christology',
    bookNumber: 3,
    romanNumeral: 'III',
    doctrineCode: 'CHRISTOLOGY & TYPOLOGY',
    greekEtymology: 'Χριστός (Christos, "Anointed One") + λόγος (Logos) • Τύπος (Typos, "Shadow/Pattern")',
    title: {
      en: 'Christology: The Person, Typology, Earthly Life & 85 Titles of Jesus Christ',
      tl: 'Kristolohiya: Ang Persona, Tipolohiya, Buhay sa Lupa at 85 Titulo ni Hesu-Kristo',
      ilo: 'Kristolohia: Ti Persona, Tipolohia, Biag ditoy Daga ken 85 a Titulo ni Jesu-Kristo',
    },
    subtitle: {
      en: 'The Hypostatic Union, 16 Old Testament Shadows Fulfilled in Christ, Chronology of Jesus’ Life (Ages 0–33) & The 85-Title Concordance',
      tl: 'Ang Hypostatic Union, 16 na Anino sa Lumang Tipan, Kronolohiya ng Buhay ni Hesus (Edad 0–33), at 85 Biblikal na Titulo',
      ilo: 'Ti Hypostatic Union, 16 nga Anniniwan iti Daan a Tulag, Kronolohia ti Biag ni Jesus (Edad 0–33), ken 85 a Biblikal a Titulo',
    },
    heroArtUrl: '/images/generated/chapter-03-christology.jpg',
    accentColor: 'from-amber-400 via-red-500 to-rose-600',
    estimatedMinutes: 45,
    keyVerse: {
      ref: 'Colossians 2:9, 17; Hebrews 1:3; 13:8',
      text: {
        en: '"For in him dwelleth all the fulness of the Godhead bodily... Which are a shadow of things to come; but the body [substance] is of Christ." (Colossians 2:9, 17) • "Jesus Christ the same yesterday, and to day, and for ever." (Hebrews 13:8)',
        tl: '"Sapagka’t sa kaniya’y nananahan ang buong kapuspusan ng pagka-Diyos sa kahayagan ayon sa laman... Na ang mga ito’y isang anino ng mga bagay na magsisidating: nguni’t ang katawan ay kay Cristo." (Colosas 2:9, 17) • "Si Jesucristo ay siya ring kahapon at ngayon, oo at magpakailan man." (Hebreo 13:8)',
        ilo: '"Ta kenkuana agtaeng ti amin a kinapunno ti Kinadios a silalasag... A dagitoy ket anniniwan dagiti banbanag nga umay; ngem ti bagi ket kukua ni Cristo." (Colosas 2:9, 17) • "Ni Jesu-Cristo isu met laeng idi kalman ken ita, wen ken iti agnanayon." (Hebreo 13:8)',
      },
      commentary: {
        en: 'Colossians 2:9–17 unites the two grand themes of Christology: the full deity and humanity of the Incarnate Son (verse 9), and His fulfillment of every Old Testament shadow (verse 17).',
        tl: 'Pinag-iisa ng Colosas 2:9–17 ang dalawang dakilang katotohanan ng Kristolohiya: ang ganap na pagka-Diyos at pagka-Tao ni Hesus (talata 9), at ang katuparan sa Kanya ng bawat anino sa Lumang Tipan (talata 17).',
        ilo: 'Pagmaymaysaen ti Colosas 2:9–17 ti dua a nadayag a kinapudno ti Kristolohia: ti naan-anay a kina-Dios ken kina-Tao ni Jesus (bersikulo 9), ken ti kaitungpalan kenkuana ti tunggal anniniwan iti Daan a Tulag (bersikulo 17).',
      },
    },
    pastoralPrologue: {
      en: '"What think ye of Christ? whose son is he?" (Matthew 22:42). That question, posed by Jesus Himself in the Temple courts, remains the supreme watershed of human eternity. Christology is the beating heart of all Christian theology. In Jesus of Nazareth, the eternal Logos who spoke galaxies into existence took upon Himself true human flesh and blood without sin (the Hypostatic Union—100% God and 100% Man in one indivisible Person forever). In Book III, we trace the 16 Old Testament types and shadows that prefigured Him, walk chronologically with Him from Bethlehem’s manger (Age 0) to Calvary’s Cross and Olivet’s Ascension (Age 33), and worship Him through His 85 Scriptural Names and Titles.',
      tl: '"Ano ang akala ninyo tungkol kay Kristo? Kanino Siyang anak?" (Mateo 22:42). Ang tanong na iyan na binigkas mismo ni Hesus sa Templo ang pinakamahalagang tanong sa buong walang-hanggan. Ang Kristolohiya ang tumitibok na puso ng buong teolohiya. Kay Hesus na taga-Nazaret, ang walang-hanggang Salita (Logos) na lumikha ng sansinukob ay nagkatawang-tao nang walang kasalanan (ang Hypostatic Union—100% Diyos at 100% Tao sa iisang Persona). Sa Ikatlong Aklat na ito, susundan natin ang 16 na anino ni Kristo sa Lumang Tipan, ang kronolohiya ng Kanyang buhay mula Edad 0 hanggang 33, at ang Kanyang 85 Biblikal na Titulo.',
      ilo: '"Ania ti panagkunayo maipapan kenni Kristo? Siasino ti amana?" (Mateo 22:42). Dayta a saludsod nga insawang mismo ni Jesus idiay Templo ti kapatgan a saludsod iti intero nga agnanayon. Ti Kristolohia ti agpitpitik a puso ti intero a teolohia. Kenni Jesus a taga-Nazaret, ti agnanayon a Sao (Logos) a namarsua iti law-ang ket naglasag nga awan basolna (ti Hypostatic Union—100% a Dios ken 100% a Tao iti maymaysa a Persona). Iti daytoy Maikatlo a Libro, surotentayo dagiti 16 nga anniniwan ni Kristo iti Daan a Tulag, ti kronolohia ti biagna manipud Edad 0 agingga iti 33, ken dagiti 85 a Biblikal a Titulona.',
    },
    sections: [
      {
        id: 'sec-03-typology-shadows',
        sectionNumber: '3.1',
        title: {
          en: 'Old Testament Typology: 16 Divinely Designed Shadows Fulfilled in Christ',
          tl: 'Tipolohiya sa Lumang Tipan: 16 na Aninong Natupad kay Hesu-Kristo',
          ilo: 'Tipolohia iti Daan a Tulag: 16 nga Anniniwan a Natungpal kenni Jesu-Kristo',
        },
        subtitle: {
          en: 'How Patriarchs, Sacrifices, Wilderness Miracles & Tabernacle Vessels Point to the Redeemer (Colossians 2:17; Hebrews 10:1)',
          tl: 'Paano Itinuturo ng mga Patriyarka, Handog, Himala sa Ilang, at Tabernakulo ang Manunubos (Colosas 2:17; Hebreo 10:1)',
          ilo: 'Kasano nga Itudo dagiti Patriarka, Daton, Milagro idiay Let-ang, ken Tabernakulo ti Mannubbot (Colosas 2:17; Hebreo 10:1)',
        },
        pastoralExposition: {
          en: 'Imagine standing on a hillside at dawn as the rising sun casts the long shadow of a cross-crowned figure toward you. As you walk along the shadow, you finally reach the living Person Himself! That is how the Old Testament relates to the New Testament (Colossians 2:17; Hebrews 10:1). God did not invent the Gospel as an afterthought in the first century; for four thousand years He painted living prophetic portraits (typoi) across history.\n\nLook at the sixteen master types in your Reference plates: (1) Adam, the federal head whose fall is reversed by Christ the Last Adam (1 Cor 15:45); (2) Noah’s Ark, pitched with atonement (kaphar) to carry all inside safely through judgment (1 Pet 3:20–21); (3) Melchizedek, uniting royal crown and eternal priesthood (Heb 7:1–25); (4) Isaac, the beloved son carrying the wood up Mount Moriah where God provided a substitute ram (Gen 22); (5) Joseph, betrayed for silver yet exalted to save his brethren (Gen 50:20); (6) Moses, the prophet-deliverer and intercessor (Deut 18:15); (7) The Passover Lamb without blemish whose blood shields from the destroyer (Exod 12; 1 Cor 5:7); (8) The Exodus from bondage; (9) Manna, the bread from heaven (John 6:35); (10) The Smitten Rock gushing living water ("and that Rock was Christ," 1 Cor 10:4); (11) The Bronze Serpent lifted on a pole to heal the dying (John 3:14–15); (12) The Tabernacle where God’s Shekinah glory dwelt (John 1:14); (13) The High Priest & Scapegoat on Yom Kippur (Lev 16; Heb 9:11–14); (14) The Torn Tabernacle Veil opening the Holy of Holies through His flesh (Heb 10:19–22); (15) Boaz, the Kinsman-Redeemer purchasing his bride (Ruth 3–4); and (16) Jonah, three days in the depths before rising as a sign of resurrection (Matt 12:40)!',
          tl: 'Isipin mong nakatayo ka sa bukang-liwayway habang ang sumisikat na araw ay nagbibigay ng mahabang anino sa lupa. Habang sinusundan mo ang anino, makakarating ka sa mismong Buháy na Persona! Ganyan ang kaugnayan ng Lumang Tipan sa Bagong Tipan (Colosas 2:17; Hebreo 10:1). Sa loob ng apat na libong taon, iginuhit ng Diyos sa kasaysayan ang mga buháy na larawan (typoi) ng darating na Manunubos.\n\nMasdan ang 16 na dakilang huwaran sa iyong Reference plates: (1) Si Adan at si Kristo na Huling Adan (1 Cor 15:45); (2) Ang Arko ni Noe na nagligtas mula sa baha ng kahatulan (1 Ped 3:20–21); (3) Si Melquisedec na Hari at Saserdote (Heb 7); (4) Si Isaac na nagpasan ng kahoy paakyat sa Moria (Gen 22); (5) Si Jose na ipinagkanulo sa pilak ngunit itinaas upang magligtas (Gen 50:20); (6) Si Moises na propeta at tagapamagitan (Deut 18:15); (7) Ang Kordero ng Paskuwa (Exodo 12; 1 Cor 5:7); (8) Ang Exodo mula sa pagkaalipin; (9) Ang Manna mula sa langit (Juan 6:35); (10) Ang Hinampas na Bato sa ilang ("at ang Batong yaon ay si Kristo," 1 Cor 10:4); (11) Ang Tansong Ahas na itinaas sa tikin (Juan 3:14–15); (12) Ang Tabernakulo (Juan 1:14); (13) Ang Dakilang Saserdote at Handog sa Araw ng Katubusan (Lev 16; Heb 9); (14) Ang Nahapak na Tabing ng Templo (Heb 10:19–22); (15) Si Boaz na Kamag-anak na Manunubos (Ruth 3–4); at (16) Si Jonas na tatlong araw sa tiyan ng malaking isda bilang tanda ng muling pagkabuhay (Mateo 12:40)!',
          ilo: 'Panunotem nga agtaktakderka iti parbangon bayat a ti lumgak nga init ket mangipakita iti atiddog nga anniniwan iti daga. Bayat a surotem ti anniniwan, makadanonka iti mismo a Sibibiag a Persona! Kasta ti relasion ti Daan a Tulag iti Baro a Tulag (Colosas 2:17; Hebreo 10:1). Iti las-ud ti uppat a ribu a tawen, impinta ti Dios iti pakasaritaan dagiti nabiag a ladawan (typoi) ti umay a Mannubbot.\n\nKitaenyo dagiti 16 a nadayag a pagwadan kadagiti Reference plates-mo: (1) Ni Adan ken ni Kristo a Maudi nga Adan (1 Cor 15:45); (2) Ti Daong ni Noe a nangisalakan manipud layus ti panangukom (1 Ped 3:20–21); (3) Ni Melquisedec nga Ari ken Padi (Heb 7); (4) Ni Isaac a nagbaklay iti kayo nga agpangato idiay Moria (Gen 22); (5) Ni Jose a nailako iti pirak ngem naitantan-ok tapno mangisalakan (Gen 50:20); (6) Ni Moises a mammadto ken mangibabaet (Deut 18:15); (7) Ti Kordero ti Paskua (Exodo 12; 1 Cor 5:7); (8) Ti Exodo manipud pannakaadipen; (9) Ti Manna manipud langit (Juan 6:35); (10) Ti Napang-or a Bato idiay let-ang ("ket daydi a Bato isu ni Kristo," 1 Cor 10:4); (11) Ti Gambang nga Uleg a naipangato iti kayo (Juan 3:14–15); (12) Ti Tabernakulo (Juan 1:14); (13) Ti Nangato a Padi ken Daton iti Aldaw ti Pannakaabbong (Lev 16; Heb 9); (14) Ti Napigis nga Abbong ti Templo (Heb 10:19–22); (15) Ni Boaz a Kabagian a Mannubbot (Ruth 3–4); ken (16) Ni Jonas a tallo nga aldaw iti tian ti dakkel nga ikan kas pagilasinan ti panagungar (Mateo 12:40)!',
        },
        theologicalBreakdown: [
          {
            heading: {
              en: 'Skia vs. Soma: Shadow vs. Substance (Colossians 2:17; Hebrews 10:1)',
              tl: 'Skia Laban sa Soma: Anino Laban sa Katuparan (Colosas 2:17; Hebreo 10:1)',
              ilo: 'Skia Maibusor iti Soma: Anniniwan Maibusor iti Bagi (Colosas 2:17; Hebreo 10:1)',
            },
            greekOrHebrewTerm: 'σκιὰ (Skia, "Shadow") • σῶμα (Soma, "Body/Substance")',
            meaning: {
              en: 'Prophetic Prefiguration & Escalating Fulfillment in Christ',
              tl: 'Propetikong Anino at Ganap na Katuparan kay Kristo',
              ilo: 'Naipadto nga Anniniwan ken Naan-anay a Kaitungpalan kenni Kristo',
            },
            explanation: {
              en: 'Every biblical type involves both correspondence and escalation ("how much more," Hebrews 9:14): if animal blood purified the flesh ceremonially, how much more shall the blood of Christ purge your conscience!',
              tl: 'Ang bawat huwaran sa Lumang Tipan ay may higit na dakilang katuparan kay Kristo ("gaano pa kaya," Hebreo 9:14): kung ang dugo ng tupa ay nagligtas sa Ehipto, gaano pa kaya ang dugo ni Kristo!',
              ilo: 'Tunggal pagwadan iti Daan a Tulag ket addaan natantan-ok a kaitungpalan kenni Kristo ("gaano pay ngarud," Hebreo 9:14): no ti dara ti karnero ket nangisalakan idiay Egipto, anian a nangnangruna ti dara ni Kristo!',
            },
            scripture: 'Colossians 2:17; Hebrews 9:13–14; 10:1',
          },
        ],
        scriptureAnchors: [
          {
            ref: 'John 3:14–15',
            text: {
              en: '"And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up: That whosoever believeth in him should not perish, but have eternal life."',
              tl: '"At kung paanong itinaas ni Moises sa ilang ang ahas, ay gayon kinakailangang itaas ang Anak ng tao: Upang ang sinomang sumampalataya ay magkaroon sa kaniya ng buhay na walang hanggan."',
              ilo: '"Ket kas iti panangipangato ni Moises iti uleg idiay let-ang, kasta met a masapul a maipangato ti Anak ti tao: Tapno ti siasinoman a mamati kenkuana saan a mapukaw, no di ket maaddaan iti biag nga agnanayon."',
            },
          },
          {
            ref: '1 Corinthians 10:4',
            text: {
              en: '"And did all drink the same spiritual drink: for they drank of that spiritual Rock that followed them: and that Rock was Christ."',
              tl: '"At lahat ay uminom ng gayon ding inuming espirituwal; sapagka’t sila’y umiinom sa batong espirituwal na sumusunod sa kanila: at ang batong yaon ay si Cristo."',
              ilo: '"Ket imminumda amin iti maymaysa a naespirituan nga inumen: ta imminumda iti naespirituan a Bato a simmurot kadakuada: ket daydi a Bato isu ni Cristo."',
            },
          },
        ],
        linkedPlateIds: ['plate-14', 'plate-15'],
        interactiveWidget: 'typology-matrix',
        pastoralApplication: {
          en: 'Never skip Leviticus, Exodus, or Numbers in your Bible reading! Use the interactive 16-Type Typology Matrix below to see how every sacrifice and wilderness miracle whispers the Name of Jesus.',
          tl: 'Huwag laktawan ang Exodo, Levitico, o Bilang sa iyong pagbabasa ng Bibliya! Gamitin ang interactive na Typology Matrix sa ibaba upang makita kung paanong ang bawat handog ay nagtuturo kay Hesus.',
          ilo: 'Dika labsan ti Exodo, Levitico, wenno Numeros iti panagbasam iti Biblia! Aramatem ti interactive a Typology Matrix iti baba tapno makitam no kasano a ti tunggal daton ket mangitudo kenni Jesus.',
        },
      },
      {
        id: 'sec-03-life-and-85-titles',
        sectionNumber: '3.2',
        title: {
          en: 'The Earthly Life of Jesus (Ages 0–33) & The 85 Names and Titles of Christ',
          tl: 'Ang Buhay ni Hesus sa Lupa (Edad 0–33) at ang 85 Pangalan at Titulo ni Kristo',
          ilo: 'Ti Biag ni Jesus ditoy Daga (Edad 0–33) ken dagiti 85 a Nagan ken Titulo ni Kristo',
        },
        subtitle: {
          en: 'Walking Step-by-Step Through the Gospels and Worshiping the Lord Through His 85 Scriptural Titles',
          tl: 'Paglalakad sa Bakas ni Hesus sa mga Ebanghelyo at Pagsamba sa Kanyang 85 Titulo sa Kasulatan',
          ilo: 'Panagna iti Tugot ni Jesus kadagiti Ebanghelio ken Panagdayaw kadagiti 85 a Titulona iti Surat',
        },
        pastoralExposition: {
          en: 'Why did the Son of God live thirty-three years on earth before going to the Cross? Why did He not simply descend from heaven on Good Friday, die for a few hours, and ascend on Easter Sunday? Because in order to be our Merciful and Faithful High Priest (Hebrews 2:17–18; 4:15) and to impute active obedience to our account (Romans 5:19), Jesus had to sanctify every stage of human life!\n\nTrace the twenty-one chronological milestones in Plate 16: at Age 0 He was born of a virgin in Bethlehem (Matthew 2:1); at Age 2 He was a refugee child in Egypt fulfilling Hosea 11:1 (Matthew 2:13–16); at Age 12 He sat in the Jerusalem Temple about His Father’s business (Luke 2:42–49); from Ages 13 to 29 He dignified ordinary manual labor as a carpenter (tekton) in Nazareth (Mark 6:3); at Age 30 He was baptized in the Jordan to fulfill all righteousness, conquered Satan in the wilderness with "It is written," called His disciples, and turned water into wine at Cana; at Ages 31 and 32 He preached the Sermon on the Mount, multiplied loaves and fishes, and walked on the stormy Sea of Galilee; and at Age 33 He was transfigured in glory, rode humbly into Jerusalem on a donkey, agonized in Gethsemane, was betrayed by Judas, died as our atoning Lamb on the Cross, rose bodily on the third day (1 Corinthians 15:3–4), invited doubting Thomas to touch His scars (John 20:24–29), and ascended to the right hand of the Majesty on high (Acts 1:3–11)!',
          tl: 'Bakit namuhay ang Anak ng Diyos nang tatlumpu’t tatlong taon sa lupa bago pumunta sa Krus? Sapagkat upang maging ating Mahabagin at Tapat na Dakilang Saserdote (Hebreo 2:17–18; 4:15) at upang tuparin ang buong katuwiran ng Kautusan para sa atin (Roma 5:19), binanal ni Hesus ang bawat yugto ng buhay ng tao!\n\nSundan natin ang 21 makasaysayang yugto sa Plate 16: sa Edad 0 ay isinilang Siya sa Bethlehem (Mateo 2:1); sa Edad 2 ay dinala sa Ehipto (Mateo 2:13–16); sa Edad 12 ay nagpamalas ng karunungan sa Templo sa Jerusalem (Lucas 2:42–49); mula Edad 13 hanggang 29 ay nagtrabaho nang marangal bilang karpintero sa Nazaret (Marcos 6:3); sa Edad 30 ay binautismuhan sa Ilog Jordan, nagtagumpay sa tukso sa ilang sa pamamagitan ng "Nasusulat," tumawag ng mga alagad, at ginawang alak ang tubig sa Cana; sa Edad 31 at 32 ay ipinangaral ang Sermon sa Bundok, nagpakain ng limang libo, at lumakad sa ibabaw ng tubig; at sa Edad 33 ay nagbagong-anyo sa bundok, pumasok sa Jerusalem, nanalangin sa Getsemani, ipinako sa Krus para sa ating mga kasalanan, nabuhay na mag-uli sa ikatlong araw (1 Corinto 15:3–4), nagpakita kay Tomas, at umakyat sa langit sa kanan ng Ama (Gawa 1:3–11)!',
          ilo: 'Apay a nagbiag ti Anak ti Dios iti tallopulo ket tallo a tawen ditoy daga sakbay a napan idiay Krus? Gapu ta tapno agbalin a Manangngaasi ken Matalek a Nangato a Paditayo (Hebreo 2:17–18; 4:15) ken tapno tungpalenna ti amin a kinalinteg ti Linteg para kadatayo (Roma 5:19), pinasantuan ni Jesus ti tunggal tukad ti biag ti tao!\n\nSurotentayo dagiti 21 a naipakasaritaan nga addang iti Plate 16: iti Edad 0 ket nayanak idiay Betlehem (Mateo 2:1); iti Edad 2 ket naipan idiay Egipto (Mateo 2:13–16); iti Edad 12 ket nagpakita iti sirib idiay Templo ti Jerusalem (Lucas 2:42–49); manipud Edad 13 agingga iti 29 ket nagtrabaho a nadayaw kas allawagi idiay Nazaret (Marcos 6:3); iti Edad 30 ket nabautisaran idiay Karayan Jordan, nagballigi iti sulisog idiay let-ang babaen ti "Adda a naisurat," nangawag kadagiti adalan, ken pinagbalinna nga arak ti danum idiay Cana; iti Edad 31 ken 32 ket inkasabana ti Sermon idiay Bantay, nangpakan iti lima ribu, ken nagna iti rabaw ti danum; ket iti Edad 33 ket nagbaliw ti langana idiay bantay, simrek idiay Jerusalem, nagkararag idiay Getsemani, nailansa idiay Krus gapu kadagiti basoltayo, nagungar iti maikatlo nga aldaw (1 Corinto 15:3–4), nagparang kenni Tomas, ken immuli idiay langit iti makannawan ti Ama (Aramid 1:3–11)!',
        },
        theologicalBreakdown: [
          {
            heading: {
              en: 'The Hypostatic Union & Threefold Office (Munus Triplex)',
              tl: 'Ang Hypostatic Union at Tatlong Tungkulin (Propeta, Saserdote at Hari)',
              ilo: 'Ti Hypostatic Union ken Тallo nga Akem (Mammadto, Padi ken Ari)',
            },
            greekOrHebrewTerm: 'Θεάνθρωπος (Theanthropos, "God-Man")',
            meaning: {
              en: 'Truly God & Truly Man — Prophet, Priest, and King',
              tl: 'Tunay na Diyos at Tunay na Tao — Propeta, Saserdote, at Hari',
              ilo: 'Pudno a Dios ken Pudno a Tao — Mammadto, Padi, ken Ari',
            },
            explanation: {
              en: 'As Prophet He reveals God to us; as Priest He offers Himself and intercedes for us; as King He rules and defends us forever.',
              tl: 'Bilang Propeta ay inihahayag Niya ang Diyos; bilang Saserdote ay inihandog Niya ang Kanyang sarili at namamagitan para sa atin; bilang Hari ay nagpupuno at nagtatanggol Siya sa atin.',
              ilo: 'Kas Mammadto iparangarangna ti Dios; kas Padi indatonna ti bagina ken mangibabaet kadatayo; kas Ari iturayannatayo ken salaknibannatayo iti agnanayon.',
            },
            scripture: 'John 1:14; 1 Timothy 3:16; Hebrews 1:1–3; 4:14–16; Revelation 19:16',
          },
        ],
        scriptureAnchors: [
          {
            ref: 'Hebrews 7:25',
            text: {
              en: '"Wherefore he is able also to save them to the uttermost that come unto God by him, seeing he ever liveth to make intercession for them."',
              tl: '"Dahil dito naman siya’y nakapagliligtas na lubos sa mga nagsisilapit sa Diyos sa pamamagitan niya, palibhasa’y laging nabubuhay siya upang mamagitan sa kanila."',
              ilo: '"Gapuna a makabalin met a mangisalakan a naan-anay kadagiti umasideg iti Dios babaen kenkuana, yantangay sibibiag a kankanayon tapno mangibabaet kadakuada."',
            },
          },
        ],
        linkedPlateIds: ['plate-16', 'plate-17', 'plate-18'],
        interactiveWidget: 'names-christ-85',
        pastoralApplication: {
          en: 'Explore the 85 Titles of Christ and the Chronological Life of Jesus below! Choose three titles of Jesus today that speak directly to your current season and turn them into thanksgiving.',
          tl: 'Saliksikin ang 85 Titulo ni Kristo at ang Kronolohiya ng Buhay ni Hesus sa ibaba! Pumili ng tatlong titulo ni Hesus ngayon at gawin itong papuri sa iyong panalangin.',
          ilo: 'Sukimatem dagiti 85 a Titulo ni Kristo ken ti Kronolohia ti Biag ni Jesus iti baba! Agpilika iti tallo a titulo ni Jesus ita ket aramidem a panagyaman iti kararagmo.',
        },
      },
    ],
    pastoralPrayer: {
      en: 'Lord Jesus Christ, Alpha and Omega, Lamb of God and Lion of the Tribe of Judah, we adore You! You are the substance of every Old Testament shadow—our Passover Lamb, our Smitten Rock, our True Manna, our Great High Priest, and our Kinsman-Redeemer. Thank You for walking thirty-three sinless years on this earth, dying in our place on Calvary, rising victorious on the third day, and interceding for us right now at the Father’s right hand. Amen.',
      tl: 'Panginoong Hesu-Kristo, Alpha at Omega, Kordero ng Diyos at Leon ng Tribo ni Juda, sinasamba Ka namin! Ikaw ang katuparan ng bawat anino sa Lumang Tipan—ang aming Kordero ng Paskuwa, ang aming Bato, ang aming Tinapay ng Buhay, at aming Dakilang Saserdote. Salamat sa Iyong kamatayan sa Krus, muling pagkabuhay sa ikatlong araw, at pamamagitan para sa amin. Amen.',
      ilo: 'Apo Jesu-Kristo, Alpha ken Omega, Kordero ti Dios ken Leon ti Tribu ni Juda, agdaydayawkami Kenka! Sika ti kaitungpalan ti tunggal anniniwan iti Daan a Tulag—ti Kordero ti Paskua, ti Bato, ti Tinapay ti Biag, ken ti Nangato a Padimi. Agyamankami iti ipapataymo idiay Krus, panagungarmo iti maikatlo nga aldaw, ken panangibabaetmo kadakami. Amen.',
    },
    quiz: [
      {
        id: 'q-b3-1',
        question: {
          en: 'In Biblical Typology (1 Corinthians 10:4), what did the Smitten Rock in the wilderness typify?',
          tl: 'Sa Biblikal na Tipolohiya (1 Corinto 10:4), ano ang inilalarawan ng Hinampas na Bato sa ilang?',
          ilo: 'Iti Biblikal a Tipolohia (1 Corinto 10:4), ania ti iladladawan ti Napang-or a Bato idiay let-ang?',
        },
        options: [
          {
            en: 'Christ struck once at Calvary to yield the living water of the Spirit',
            tl: 'Si Kristo na hinampas sa Kalbaryo upang magbigay ng tubig ng buhay',
            ilo: 'Ni Kristo a napang-or idiay Kalbario tapno mangted iti danum ti biag',
          },
          {
            en: 'The military strength of the Roman Empire',
            tl: 'Ang lakas-militar ng Imperyo ng Roma',
            ilo: 'Ti bileg-militar ti Imperio ti Roma',
          },
          {
            en: 'Human philosophy and earthly wisdom',
            tl: 'Ang pilosopiya at karunungan ng tao',
            ilo: 'Ti pilosopia ken sirib ti tao',
          },
          {
            en: 'Mount Sinai’s stone tablets only',
            tl: 'Ang mga tapyas na bato lamang sa Bundok ng Sinai',
            ilo: 'Dagiti tapi a bato laeng idiay Bantay Sinai',
          },
        ],
        correctIndex: 0,
        explanation: {
          en: '1 Corinthians 10:4 explicitly states: "For they drank of that spiritual Rock that followed them: and that Rock was Christ."',
          tl: 'Direktang sinasabi ng 1 Corinto 10:4: "Sapagka’t sila’y umiinom sa batong espirituwal na sumusunod sa kanila: at ang batong yaon ay si Cristo."',
          ilo: 'Direkta a kuna ti 1 Corinto 10:4: "Ta imminumda iti naespirituan a Bato a simmurot kadakuada: ket daydi a Bato isu ni Cristo."',
        },
        scriptureProof: 'Exodus 17:6; 1 Corinthians 10:4',
      },
      {
        id: 'q-b3-2',
        question: {
          en: 'At what age was Jesus baptized in the Jordan River and inaugurated into His public ministry (Luke 3:21–23)?',
          tl: 'Sa anong edad binautismuhan si Hesus sa Ilog Jordan at nagsimula sa Kanyang ministeryo (Lucas 3:21–23)?',
          ilo: 'Iti ania nga edad a nabautisaran ni Jesus idiay Karayan Jordan ken nangrugi iti ministeriona (Lucas 3:21–23)?',
        },
        options: [
          { en: 'About 30 years of age', tl: 'Humigit-kumulang 30 taong gulang', ilo: 'Agarup 30 a tawen ti edadna' },
          { en: '12 years of age', tl: '12 taong gulang', ilo: '12 a tawen ti edadna' },
          { en: '50 years of age', tl: '50 taong gulang', ilo: '50 a tawen ti edadna' },
          { en: '20 years of age', tl: '20 taong gulang', ilo: '20 a tawen ti edadna' },
        ],
        correctIndex: 0,
        explanation: {
          en: 'Luke 3:23 records that Jesus Himself began His ministry at about thirty years of age—the exact Levitical age for priestly service (Numbers 4:3).',
          tl: 'Itinala ng Lucas 3:23 na si Hesus ay humigit-kumulang tatlumpung taong gulang nang simulan Niya ang Kanyang ministeryo—ang edad din ng mga saserdote sa Bilang 4:3.',
          ilo: 'Inlanad ti Lucas 3:23 a ni Jesus ket agarup tallopulo a tawenna idi inrugina ti ministeriona—ti met laeng edad dagiti papadi iti Numeros 4:3.',
        },
        scriptureProof: 'Luke 3:21–23; Numbers 4:3',
      },
    ],
  },
];
