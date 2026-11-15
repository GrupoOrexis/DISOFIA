import { Compass, HeartHandshake, Lightbulb } from 'lucide-react';
import { useDisofiaData } from '../data/disofiaData';
import { useT } from '../i18n/LanguageContext';
import { fmt, DYNA_URL } from '../i18n/translations';

export function PresentationSection() {
  const t = useT();
  const { metadata } = useDisofiaData();

  return (
    <section id="presentacion" className="py-16 sm:py-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8B1E24] mb-2 font-mono">
            <span>{t.presentation.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            {t.presentation.title}
          </h2>
          <div className="w-16 h-1 bg-[#8B1E24] mt-3"></div>
        </div>

        {/* Narrative Prose / Resumen Ejecutivo */}
        <div className="space-y-6 text-stone-700 leading-relaxed text-base sm:text-lg">
          <div className="bg-stone-50 border-l-3 border-[#8B1E24] p-6 rounded-r">
            <span className="text-xs uppercase font-mono font-bold text-[#8B1E24] tracking-wider block mb-1">
              {t.presentation.execLabel}
            </span>
            <p className="text-stone-900 font-serif text-xl sm:text-2xl leading-relaxed italic">
              «{metadata.executiveSummary}»
            </p>
          </div>

          <p className="text-stone-700">
            {t.presentation.para1}
          </p>

          <p className="text-stone-700">
            {fmt(t.presentation.para2, { area: metadata.area })}
          </p>
        </div>

        {/* 3 Core Philosophical Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white border border-stone-200 rounded p-6 shadow-xs hover:border-[#8B1E24]/50 transition-colors">
            <div className="w-10 h-10 rounded bg-red-50 text-[#8B1E24] flex items-center justify-center mb-4">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
              {t.presentation.pillar1Title}
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              {t.presentation.pillar1Text}
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded p-6 shadow-xs hover:border-[#8B1E24]/50 transition-colors">
            <div className="w-10 h-10 rounded bg-amber-50 text-amber-900 flex items-center justify-center mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
              {t.presentation.pillar2Title}
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              {t.presentation.pillar2Text}
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded p-6 shadow-xs hover:border-[#8B1E24]/50 transition-colors">
            <div className="w-10 h-10 rounded bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
              {t.presentation.pillar3Title}
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              {t.presentation.pillar3Text}
            </p>
          </div>

        </div>

        {/* Nota de continuidad con el proyecto anterior DYNA */}
        <p className="mt-10 pt-6 border-t border-stone-200 text-sm text-stone-500 leading-relaxed">
          {t.presentation.continuityPre}
          <a
            href={DYNA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#8B1E24] hover:underline underline-offset-2"
          >
            {t.presentation.continuityDynaLabel}
          </a>
          {t.presentation.continuityPost}
        </p>

      </div>
    </section>
  );
}
