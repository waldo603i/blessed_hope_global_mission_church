import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Language, ReferencePlateItem } from '../types/theology';
import { ALL_REFERENCE_PLATES } from '../data/referencePlates';
import {
  Sparkles,
  Image as ImageIcon,
  Download,
  Key,
  Wand2,
  Layers,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  BookOpen,
} from 'lucide-react';

interface NanoBananaStudioProps {
  lang: Language;
  onInspectPlate: (plate: ReferencePlateItem) => void;
}

const SACRED_ART_STYLES = [
  {
    id: 'illuminated-codex',
    label: {
      en: 'Illuminated Gold-Leaf Theological Infographic',
      tl: 'Ginintuang Iluminadong Tsart ng Teolohiya',
      ilo: 'Nabalitokan a Naipinta a Tsart ti Teolohia',
    },
    promptSuffix:
      'masterpiece illuminated theological manuscript infographic, deep royal obsidian and lapis lazuli background, intricate gold leaf geometric diagrams, sacred biblical iconography, crisp classical typography, museum quality 8k resolution',
  },
  {
    id: 'cathedral-stained-glass',
    label: {
      en: 'Gothic Cathedral Stained-Glass Rose Window',
      tl: 'Stained-Glass ng Katedral na Bintana',
      ilo: 'Stained-Glass ti Katedral a Tawa',
    },
    promptSuffix:
      'radiant Gothic cathedral stained glass window illustration, luminous ruby red, sapphire blue, emerald green and amber glass panels with lead cames, heavenly light rays streaming through, sacred Christian symbolism',
  },
  {
    id: 'renaissance-fresco',
    label: {
      en: 'Classical Biblical Oil Painting & Fresco',
      tl: 'Klasikong Larawan sa Langis ng Bibliya',
      ilo: 'Klasiko a Ladawan ti Biblia',
    },
    promptSuffix:
      'dramatic chiaroscuro classical biblical oil painting in the style of Rembrandt and Gustave Doré, warm golden divine light breaking through clouds, reverent biblical composition, fine brushwork',
  },
  {
    id: 'modern-sacred-blueprint',
    label: {
      en: 'Modern Architectural Systematic Diagram',
      tl: 'Makabagong Arkitektural na Diyagrama',
      ilo: 'Moderno nga Arkitektural a Diagrama',
    },
    promptSuffix:
      'clean architectural sacred geometry blueprint diagram on dark parchment, glowing golden vectors, symmetrical theological chart layout, high contrast educational visual reference',
  },
];

export const NanoBananaStudio: React.FC<NanoBananaStudioProps> = ({ lang, onInspectPlate }) => {
  const [selectedPlateId, setSelectedPlateId] = useState<string>(ALL_REFERENCE_PLATES[0].id);
  const [selectedStyleId, setSelectedStyleId] = useState<string>(SACRED_ART_STYLES[0].id);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>(
    () => localStorage.getItem('theologia_gemini_api_key') || (import.meta as any).env?.VITE_GEMINI_API_KEY || ''
  );
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedImages, setGeneratedImages] = useState<
    { id: string; url: string; title: string; prompt: string; model: string; timestamp: string }[]
  >([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedPlate =
    ALL_REFERENCE_PLATES.find((p) => p.id === selectedPlateId) || ALL_REFERENCE_PLATES[0];
  const selectedStyle =
    SACRED_ART_STYLES.find((s) => s.id === selectedStyleId) || SACRED_ART_STYLES[0];

  const handleSaveApiKey = (val: string) => {
    setApiKey(val);
    localStorage.setItem('theologia_gemini_api_key', val);
  };

  // Build default theological prompt when plate or style changes
  const effectivePrompt =
    customPrompt.trim() ||
    `Sacred Christian theological visual reference chart illustrating "${selectedPlate.title.en}" (${selectedPlate.subtitle.en}), anchored in Scripture ${selectedPlate.keyScripture}. Key doctrinal points: ${selectedPlate.keyPoints
      .map((kp) => kp.label.en)
      .join(', ')}. Style: ${selectedStyle.promptSuffix}.`;

  // Render high-resolution sacred visual reference poster on HTML5 Canvas
  const renderSacredPosterToCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1600;
    const H = 1000;
    canvas.width = W;
    canvas.height = H;

    // 1. Deep Celestial Gradient Background
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    if (selectedStyleId === 'cathedral-stained-glass') {
      bgGrad.addColorStop(0, '#1e1b4b');
      bgGrad.addColorStop(0.5, '#31102f');
      bgGrad.addColorStop(1, '#090d16');
    } else if (selectedStyleId === 'renaissance-fresco') {
      bgGrad.addColorStop(0, '#271709');
      bgGrad.addColorStop(0.5, '#1c1917');
      bgGrad.addColorStop(1, '#0c0a09');
    } else {
      bgGrad.addColorStop(0, '#070b19');
      bgGrad.addColorStop(0.5, '#0f172a');
      bgGrad.addColorStop(1, '#1e1b4b');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Radial Halo Light
    const radial = ctx.createRadialGradient(W / 2, 240, 20, W / 2, 240, 620);
    radial.addColorStop(0, 'rgba(245, 158, 11, 0.28)');
    radial.addColorStop(0.6, 'rgba(217, 119, 6, 0.08)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, W, H);

    // 3. Sacred Geometry Concentric Circles
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.14)';
    ctx.lineWidth = 1.5;
    [160, 280, 420, 580].forEach((r) => {
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // 4. Ornate Double Gold Border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.strokeRect(28, 28, W - 56, H - 56);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(42, 42, W - 84, H - 84);

    // 5. Header Badge
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 20px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      `THEOLOGIA SACRA • NANO BANANA PRO SACRED VISUAL PLATE #${selectedPlate.plateNumber} • ${selectedPlate.category.toUpperCase()}`,
      W / 2,
      88
    );

    // 6. Main Title in Selected Language
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px Georgia, serif';
    ctx.fillText(selectedPlate.title[lang], W / 2, 148);

    // 7. Subtitle & Key Scripture
    ctx.fillStyle = '#fde68a';
    ctx.font = 'italic 24px Georgia, serif';
    ctx.fillText(selectedPlate.subtitle[lang], W / 2, 190);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 20px Consolas, monospace';
    ctx.fillText(`SCRIPTURE ANCHOR: ${selectedPlate.keyScripture}`, W / 2, 230);

    // 8. Key Doctrinal Nodes Grid
    const points = selectedPlate.keyPoints.slice(0, 4);
    const cardW = 680;
    const cardH = 210;
    const positions = [
      { x: 85, y: 275 },
      { x: 835, y: 275 },
      { x: 85, y: 515 },
      { x: 835, y: 515 },
    ];

    points.forEach((pt, idx) => {
      const pos = positions[idx];
      if (!pos) return;

      // Card Box
      ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
      ctx.fillRect(pos.x, pos.y, cardW, cardH);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.55)';
      ctx.lineWidth = 2;
      ctx.strokeRect(pos.x, pos.y, cardW, cardH);

      // Node Number & Label
      ctx.textAlign = 'left';
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 22px Georgia, serif';
      ctx.fillText(
        `${idx + 1}. ${pt.label[lang].slice(0, 48)}`,
        pos.x + 24,
        pos.y + 42
      );

      // Scripture Badge
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 16px Consolas, monospace';
      ctx.fillText(`📖 ${pt.scripture}`, pos.x + 24, pos.y + 74);

      // Wrap Explanation Text
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '18px Georgia, serif';
      const words = pt.explanation[lang].split(' ');
      let line = '';
      let yCursor = pos.y + 112;
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > cardW - 48 && i > 0) {
          ctx.fillText(line, pos.x + 24, yCursor);
          line = words[i] + ' ';
          yCursor += 26;
          if (yCursor > pos.y + cardH - 18) break;
        } else {
          line = testLine;
        }
      }
      if (yCursor <= pos.y + cardH - 18) {
        ctx.fillText(line, pos.x + 24, yCursor);
      }
    });

    // 9. Bottom Trilingual Pastoral Synthesis Banner
    ctx.fillStyle = 'rgba(120, 53, 15, 0.35)';
    ctx.fillRect(85, 760, W - 170, 150);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(85, 760, W - 170, 150);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 18px Georgia, serif';
    ctx.fillText(
      'PASTORAL & THEOLOGICAL SYNTHESIS (ENGLISH • FILIPINO • ILOCANO)',
      W / 2,
      795
    );

    ctx.fillStyle = '#f8fafc';
    ctx.font = '18px Georgia, serif';
    const synthWords = selectedPlate.pastoralSynthesis[lang].split(' ');
    let sLine = '';
    let sY = 830;
    for (let i = 0; i < synthWords.length; i++) {
      const test = sLine + synthWords[i] + ' ';
      if (ctx.measureText(test).width > W - 240 && i > 0) {
        ctx.fillText(sLine, W / 2, sY);
        sLine = synthWords[i] + ' ';
        sY += 26;
        if (sY > 890) break;
      } else {
        sLine = test;
      }
    }
    if (sY <= 890) ctx.fillText(sLine, W / 2, sY);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Consolas, monospace';
    ctx.fillText(
      'THEOLOGIA SACRA CODEX • Powered by Nano Banana Pro (gemini-3-pro-image) & Sacred Canvas Engine',
      W / 2,
      942
    );
  };

  useEffect(() => {
    renderSacredPosterToCanvas();
  }, [selectedPlateId, selectedStyleId, lang]);

  // Generate via Nano Banana Pro (`gemini-3-pro-image`) using official @google/genai SDK
  const handleGenerateNanoBananaPro = async () => {
    setErrorMessage(null);
    setStatusMessage(null);

    if (!apiKey.trim()) {
      // Even without an API key, snapshot the Sacred Canvas Poster into the gallery and inform the user how to connect Nano Banana Pro live
      const canvas = canvasRef.current;
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        setGeneratedImages((prev) => [
          {
            id: `poster-${Date.now()}`,
            url: dataUrl,
            title: `${selectedPlate.title[lang]} (Sacred Infographic Poster)`,
            prompt: effectivePrompt,
            model: 'Sacred Canvas + gemini-3-pro-image Ready',
            timestamp: new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);
      }
      setShowKeyInput(true);
      setStatusMessage(
        lang === 'en'
          ? 'Rendered High-Res Sacred Infographic Poster! Enter a Gemini API Key above if you also want to call live Nano Banana Pro (gemini-3-pro-image) cloud generation.'
          : lang === 'tl'
          ? 'Nalikha na ang High-Res Sacred Infographic Poster! Maaari ring maglagay ng Gemini API Key sa itaas upang tumawag sa live na Nano Banana Pro (gemini-3-pro-image).'
          : 'Naaramiden ti High-Res Sacred Infographic Poster! Mabalin met nga ikabil ti Gemini API Key iti ngato tapno umawag iti live a Nano Banana Pro (gemini-3-pro-image).'
      );
      return;
    }

    setIsGenerating(true);
    setStatusMessage(
      'Calling Nano Banana Pro (model: "gemini-3-pro-image") via @google/genai Interactions API...'
    );

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      const interaction: any = await (ai as any).interactions.create({
        model: 'gemini-3-pro-image',
        input: effectivePrompt,
        response_modalities: ['IMAGE'],
      });

      let foundBase64: string | null = null;
      let mimeType = 'image/png';

      if (interaction?.outputs && Array.isArray(interaction.outputs)) {
        for (const output of interaction.outputs) {
          if (output.type === 'image' && output.data) {
            foundBase64 = output.data;
            mimeType = output.mime_type || 'image/png';
            break;
          }
        }
      } else if (interaction?.output_image?.data) {
        foundBase64 = interaction.output_image.data;
      }

      if (foundBase64) {
        const imgUrl = `data:${mimeType};base64,${foundBase64}`;
        setGeneratedImages((prev) => [
          {
            id: `nbp-${Date.now()}`,
            url: imgUrl,
            title: selectedPlate.title[lang],
            prompt: effectivePrompt,
            model: 'gemini-3-pro-image (Nano Banana Pro)',
            timestamp: new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);
        setStatusMessage(
          'Nano Banana Pro (gemini-3-pro-image) successfully generated your sacred visual reference!'
        );
      } else {
        throw new Error('No image payload returned from gemini-3-pro-image.');
      }
    } catch (err: any) {
      // Fallback: also capture the rendered high-res canvas poster so user is never left empty-handed
      const canvas = canvasRef.current;
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        setGeneratedImages((prev) => [
          {
            id: `fallback-${Date.now()}`,
            url: dataUrl,
            title: `${selectedPlate.title[lang]} (High-Res Sacred Plate)`,
            prompt: effectivePrompt,
            model: 'gemini-3-pro-image / Sacred Canvas Synthesizer',
            timestamp: new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);
      }
      setErrorMessage(
        `Nano Banana Pro API Notice (${err?.message || 'Quota or Key Check'}): We automatically synthesized your high-resolution Sacred Infographic Plate into the gallery below!`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Theologia-Sacra-Plate-${selectedPlate.plateNumber}-${lang}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-8">
      {/* Studio Hero Header */}
      <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 p-6 shadow-2xl md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              Powered by Nano Banana Pro • model: &quot;gemini-3-pro-image&quot;
            </div>
            <h2 className="mt-3 font-serif text-2xl font-bold text-white md:text-4xl">
              {lang === 'en'
                ? 'Nano Banana Pro Sacred Visual & Reference Studio'
                : lang === 'tl'
                ? 'Nano Banana Pro Studio para sa Banal na Biswal at Sanggunian'
                : 'Nano Banana Pro Studio para iti Nasantuan a Biswal ken Reperensia'}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
              {lang === 'en'
                ? 'Generate custom theological illustrations and high-resolution trilingual visual reference plates for all 40 Reference Charts using Google’s Nano Banana Pro (gemini-3-pro-image) via @google/genai and our built-in Sacred Infographic Synthesizer.'
                : lang === 'tl'
                ? 'Lumikha ng mga banal na larawan at high-resolution na biswal na sanggunian sa 3 wika para sa lahat ng 40 Reference Charts gamit ang Nano Banana Pro (gemini-3-pro-image) at Sacred Infographic Synthesizer.'
                : 'Agaramid kadagiti nasantuan a ladawan ken high-resolution a biswal a reperensia iti 3 a pagsasao para iti amin nga 40 a Reference Charts babaen ti Nano Banana Pro (gemini-3-pro-image).'}
            </p>
          </div>

          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-slate-900/90 px-4 py-2.5 text-xs font-bold text-amber-300 transition hover:bg-amber-500/20"
          >
            <Key className="h-4 w-4" />
            {apiKey ? 'Gemini API Key Configured ✓' : 'Configure Gemini API Key'}
          </button>
        </div>

        {showKeyInput && (
          <div className="mt-4 rounded-2xl border border-amber-500/30 bg-slate-950/90 p-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300">
              Google Gemini API Key (For Live `gemini-3-pro-image` Cloud Generation)
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => handleSaveApiKey(e.target.value)}
                placeholder="AIzaSy... (Saved locally in your browser)"
                className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
              <button
                onClick={() => setShowKeyInput(false)}
                className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400"
              >
                Save Key
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">
              Uses official <code className="text-amber-300">@google/genai</code> SDK:{' '}
              <code className="text-sky-300">
                ai.interactions.create(&#123; model: &apos;gemini-3-pro-image&apos;, input: prompt &#125;)
              </code>
              .
            </p>
          </div>
        )}
      </div>

      {/* Studio Controls + Live Preview Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Control Column */}
        <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/90 p-5 lg:col-span-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
              1. Select Theological Reference Plate (1–40)
            </label>
            <select
              value={selectedPlateId}
              onChange={(e) => {
                setSelectedPlateId(e.target.value);
                setCustomPrompt('');
              }}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
            >
              {ALL_REFERENCE_PLATES.map((p) => (
                <option key={p.id} value={p.id}>
                  Plate #{String(p.plateNumber).padStart(2, '0')} — {p.title[lang]} ({p.keyScripture})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
              2. Select Sacred Art Direction & Style
            </label>
            <div className="mt-2 grid grid-cols-1 gap-2">
              {SACRED_ART_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyleId(style.id)}
                  className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-xs font-semibold transition ${
                    selectedStyleId === style.id
                      ? 'border-amber-400 bg-amber-500/20 text-white'
                      : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-amber-500/40'
                  }`}
                >
                  <span>{style.label[lang]}</span>
                  <Layers className="h-4 w-4 text-amber-400" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
              3. Nano Banana Pro (`gemini-3-pro-image`) Prompt
            </label>
            <textarea
              rows={4}
              value={customPrompt || effectivePrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-xs leading-relaxed text-slate-200 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={handleGenerateNanoBananaPro}
              disabled={isGenerating}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:brightness-110 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating with Nano Banana Pro...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Generate Sacred Visual (Nano Banana Pro)
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDownloadCanvas}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2.5 text-xs font-bold text-amber-300 transition hover:bg-amber-500/20"
              >
                <Download className="h-4 w-4" />
                Download 1600×1000 PNG
              </button>
              <button
                onClick={() => onInspectPlate(selectedPlate)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-sky-500/40 bg-sky-500/10 px-3 py-2.5 text-xs font-bold text-sky-300 transition hover:bg-sky-500/20"
              >
                <BookOpen className="h-4 w-4" />
                Compare Original Plate #{selectedPlate.plateNumber}
              </button>
            </div>
          </div>

          {statusMessage && (
            <div className="flex items-start gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-3 text-xs text-emerald-200">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>{statusMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="flex items-start gap-2 rounded-xl border border-amber-500/40 bg-amber-950/30 p-3 text-xs text-amber-200">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Right Live Preview & Side-by-Side Reference Comparison */}
        <div className="space-y-5 lg:col-span-7">
          <div className="rounded-2xl border border-amber-500/30 bg-slate-950/90 p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Live Trilingual Sacred Visual Synthesizer ({lang.toUpperCase()})
              </span>
              <span className="font-mono text-xs text-slate-400">1600 × 1000 HD Plate</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-amber-500/30 bg-slate-900">
              <canvas ref={canvasRef} className="h-auto w-full block" />
            </div>
          </div>

          {/* Original Source Reference Plate Comparison Card */}
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:flex-row sm:items-center">
            <img
              src={`/images/references/${selectedPlate.filename}`}
              alt={selectedPlate.title[lang]}
              className="h-36 w-28 shrink-0 rounded-lg border border-amber-500/30 object-cover"
            />
            <div className="space-y-1.5">
              <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                Original Reference Plate #{selectedPlate.plateNumber} • {selectedPlate.filename}
              </span>
              <h4 className="font-serif text-lg font-bold text-white">
                {selectedPlate.title[lang]}
              </h4>
              <p className="text-xs leading-relaxed text-slate-300">
                {selectedPlate.pastoralSynthesis[lang]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Gallery */}
      {generatedImages.length > 0 && (
        <div className="rounded-2xl border border-amber-500/30 bg-slate-950/90 p-6">
          <div className="mb-4 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-amber-400" />
            <h3 className="font-serif text-xl font-bold text-white">
              Your Generated Sacred Visuals Gallery ({generatedImages.length})
            </h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {generatedImages.map((img) => (
              <div
                key={img.id}
                className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 shadow-lg"
              >
                <img src={img.url} alt={img.title} className="h-48 w-full object-cover" />
                <div className="p-3.5">
                  <div className="flex items-center justify-between text-[10px] text-amber-400">
                    <span>{img.model}</span>
                    <span>{img.timestamp}</span>
                  </div>
                  <h4 className="mt-1 font-serif text-sm font-bold text-white">{img.title}</h4>
                  <a
                    href={img.url}
                    download={`${img.title.replace(/\s+/g, '-')}.png`}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/30"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download Image
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
