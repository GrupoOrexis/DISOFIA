import { useState } from 'react';
import { BookOpen, Calendar, Compass, Expand, Eye, Users, X } from 'lucide-react';
import { useDisofiaData } from '../data/disofiaData';
import { useT } from '../i18n/LanguageContext';

interface HeroProps {
  onExploreLines?: () => void;
  onExploreSeminar?: () => void;
  onNavigate?: (id: string) => void;
}

const CANOVA_APOLOGY_URL = 'assets/aistudio/Canova_-_The_apology_of_Socrates_in_front_of_the_judges__1790-1792_ad7bd0e9.jpg';

export function Hero({ onExploreLines, onExploreSeminar, onNavigate }: HeroProps) {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const t = useT();
  const { metadata } = useDisofiaData();

  const scrollToTarget = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // High-clarity gray marble styling for Canova's bas-relief
  const imageFilterStyle = { filter: 'grayscale(92%) contrast(1.28) brightness(0.92) saturate(0.1)' };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F3F0] via-[#ECEBE7] to-[#E3E2DE] text-slate-800">
      {/* Subtle classical texture on background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(51,65,85,0.10) 0, rgba(51,65,85,0.10) 1px, transparent 1px, transparent 10px), repeating-linear-gradient(45deg, rgba(255,255,255,0.85) 5px, rgba(255,255,255,0.85) 6px, transparent 6px, transparent 10px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.85) 5px, rgba(255,255,255,0.85) 6px, transparent 6px, transparent 10px), repeating-linear-gradient(45deg, rgba(139,30,36,0.12) 0, rgba(139,30,36,0.12) 1px, transparent 1px, transparent 30px), repeating-linear-gradient(-45deg, rgba(20,83,45,0.12) 0, rgba(20,83,45,0.12) 1px, transparent 1px, transparent 30px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 sm:pt-10 pb-3 sm:pb-4">

        {/* Classical Frieze of Socrates across the Hero, positioned directly above the Project Title */}
        <figure className="w-full mb-6 sm:mb-8">
          {/* Enlace discreto "Explorar Imagen": texto gris, sin fondo, encima del marco, a la derecha */}
          <div className="flex justify-end mb-1.5">
            <button
              type="button"
              onClick={() => setImageModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-stone-500 hover:text-stone-700 transition-colors cursor-pointer"
              title={t.hero.exploreImage}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t.hero.exploreImage}</span>
            </button>
          </div>
          <div className="relative rounded-lg overflow-hidden bg-stone-950 border border-stone-700/80 shadow-2xl group">
            {/* Top architectural border accent */}
            <div className="h-0.5 bg-gradient-to-r from-stone-800 via-[#8B1E24] to-stone-800" />

            {/* Frieze Viewport */}
            <div className="relative w-full h-24 sm:h-28 md:h-36 lg:h-40 overflow-hidden bg-stone-950 flex items-center justify-center">
              <img
                src={CANOVA_APOLOGY_URL}
                alt="Friso: La apología de Sócrates ante los jueces — Antonio Canova (1790–1792)"
                referrerPolicy="no-referrer"
                style={imageFilterStyle}
                className="w-full h-full object-cover object-[center_34%] transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Subtle architectural lighting vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </figure>

        {/* Project Title and Header Presentation */}
        <div className="w-full mb-4 text-center flex flex-col items-center">
          <div className="w-full flex flex-col items-center">
            <div
              className="tracking-widest uppercase font-semibold my-2 text-center flex items-center justify-center gap-3"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '19px',
                color: '#475569',
                height: '34.5px',
              }}
            >
              <span className="inline-block w-8 sm:w-10 h-[1.5px] bg-[#475569]/60" aria-hidden="true" />
              <span>{t.hero.eyebrow} &middot; {metadata.period}</span>
              <span className="inline-block w-8 sm:w-10 h-[1.5px] bg-[#475569]/60" aria-hidden="true" />
            </div>

            <h1
              className="font-serif font-bold text-[#1E293B] tracking-tight leading-[1.1] w-full text-center"
              style={{ fontSize: '65px' }}
            >
              {metadata.title}
            </h1>
          </div>

          {/* Executive Summary */}
          <p
            className="text-slate-600 font-light leading-relaxed mx-auto text-center mt-4"
            style={{ fontSize: '20px', width: '918px', maxWidth: '100%' }}
          >
            {metadata.executiveSummary}
          </p>

          {/* Identificador del proyecto, centrado bajo el subtítulo */}
          <div
            className="inline-flex items-center justify-center gap-2 bg-white px-3 py-1 rounded-md mt-4"
            style={{ fontSize: '14px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            <span className="uppercase tracking-widest text-[#8B1E24] font-bold">
              {metadata.acronym}
            </span>
            <span className="text-slate-400 font-normal" aria-hidden="true">&middot;</span>
            <span className="text-slate-600 font-normal">
              {metadata.reference}
            </span>
          </div>
        </div>

        {/* Quantitative Project Indicators Strip: clean text with red dividers */}
        <div className="w-full mt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            {/* 1. 3 Años */}
            <div className="relative p-2 sm:p-3 flex flex-col items-center justify-center text-center">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1E293B] tabular-nums text-center">
                3 {t.hero.years}
              </div>
              <div className="text-xs text-slate-600 uppercase tracking-wider mt-1 font-mono text-center">
                {t.hero.yearsSub}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 text-center">
                {t.hero.nonOriented}
              </div>
              {/* Red vertical divider */}
              <div
                aria-hidden="true"
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-[2.5px] h-[38px] bg-[#8B1E24] rounded-full"
              />
            </div>

            {/* 2. 12 Investigadores */}
            <div className="relative p-2 sm:p-3 flex flex-col items-center justify-center text-center">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1E293B] tabular-nums text-center">
                12 {t.hero.researchers}
              </div>
              <div className="text-xs text-slate-600 uppercase tracking-wider mt-1 font-mono text-center">
                {t.hero.researchersSub}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 text-center">
                {t.hero.linkedToProject}
              </div>
              {/* Red vertical divider on desktop */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 w-[2.5px] h-[38px] bg-[#8B1E24] rounded-full"
              />
            </div>

            {/* 3. 17 Expertos */}
            <div className="relative p-2 sm:p-3 flex flex-col items-center justify-center text-center">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1E293B] tabular-nums text-center">
                17 {t.hero.experts}
              </div>
              <div className="text-xs text-slate-600 uppercase tracking-wider mt-1 font-mono text-center">
                {t.hero.international}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 text-center">
                {t.hero.from10Countries}
              </div>
              {/* Red vertical divider */}
              <div
                aria-hidden="true"
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-[2.5px] h-[38px] bg-[#8B1E24] rounded-full"
              />
            </div>

            {/* 4. Presupuesto */}
            <div className="relative p-2 sm:p-3 flex flex-col items-center justify-center text-center">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1E293B] tabular-nums text-center">
                49.000 €
              </div>
              <div className="text-xs text-slate-600 uppercase tracking-wider mt-1 font-mono text-center">
                {t.hero.budget}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 text-center">
                {t.hero.projectFunding}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Franja granate separadora con la navegación integrada (texto e iconos en blanco) */}
      <div className="relative z-10 bg-[#8B1E24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-1 py-1.5">
            <button
              type="button"
              onClick={() => scrollToTarget('presentacion')}
              className="w-full h-9 flex items-center justify-center gap-2 px-3 sm:px-4 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white hover:underline decoration-white decoration-2 underline-offset-4 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-white shrink-0" />
              <span className="truncate">{t.hero.btnOverview}</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToTarget('lineas')}
              className="w-full h-9 flex items-center justify-center gap-2 px-3 sm:px-4 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white hover:underline decoration-white decoration-2 underline-offset-4 transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-white shrink-0" />
              <span className="truncate">{t.hero.btnLines}</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToTarget('equipo')}
              className="w-full h-9 flex items-center justify-center gap-2 px-3 sm:px-4 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white hover:underline decoration-white decoration-2 underline-offset-4 transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4 text-white shrink-0" />
              <span className="truncate">{t.hero.btnTeam}</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToTarget('actividades')}
              className="w-full h-9 flex items-center justify-center gap-2 px-3 sm:px-4 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white hover:underline decoration-white decoration-2 underline-offset-4 transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white shrink-0" />
              <span className="truncate">{t.hero.btnActivities}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Full-Scale Canova Horizontal Bas-Relief */}
      {imageModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-md"
          onClick={() => setImageModalOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full bg-stone-950 border border-stone-800 rounded-xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800 text-xs">
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                  Antonio Canova · «La apología de Sócrates ante los jueces» (1790–1792)
                </h3>
                <p className="text-stone-400 text-xs mt-0.5">
                  {t.hero.modalSubtitle}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setImageModalOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label={t.contactModal.close}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* High-Res Image Container in Native Panoramic Aspect Ratio */}
            <div className="overflow-hidden rounded-lg bg-black/90 flex items-center justify-center p-1 border border-stone-800/80">
              <img
                src={CANOVA_APOLOGY_URL}
                alt="Antonio Canova: La apología de Sócrates ante los jueces (1790-1792)"
                style={imageFilterStyle}
                className="w-full max-h-[65vh] object-contain rounded"
              />
            </div>

            {/* Academic Commentary in Modal: Referencia a la vida examinada */}
            <div className="mt-4 pt-3 border-t border-stone-800 text-xs text-stone-300 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-900/60 p-3.5 rounded-lg border border-stone-800/80">
                <div>
                  <p
                    className="font-serif font-bold text-stone-100 leading-snug"
                    style={{ fontSize: '20px' }}
                  >
                    Ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ
                  </p>
                  <p
                    className="font-serif font-bold text-stone-200 leading-snug mt-1"
                    style={{ fontSize: '23px', fontWeight: 'bold' }}
                  >
                    {t.hero.quoteTranslation}
                  </p>
                </div>
                <div className="shrink-0 sm:text-right">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded bg-stone-800 text-stone-300 border border-stone-700 font-sans font-medium tracking-wide"
                    style={{ fontSize: '14px' }}
                  >
                    {t.hero.quoteSource}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-500 font-mono px-1 pt-0.5">
                <span>{t.hero.modalCaptionLeft}</span>
                <span>DISOFIA &middot; Universidad de Navarra (PID2025-168764NB-I00)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
