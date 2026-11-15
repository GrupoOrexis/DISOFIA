import { useState } from 'react';
import { Check, Copy, FileText, Info } from 'lucide-react';
import { useDisofiaData } from '../data/disofiaData';
import { useT } from '../i18n/LanguageContext';
import { fmt } from '../i18n/translations';
import { formatProjectCitation } from '../utils/helpers';

export function OfficialDataSection() {
  const t = useT();
  const { metadata, principalInvestigators } = useDisofiaData();
  const [copiedType, setCopiedType] = useState<'apa' | 'bibtex' | null>(null);

  const copyCitation = (type: 'apa' | 'bibtex') => {
    const text = formatProjectCitation(type);
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 3000);
  };

  return (
    <section id="datos" className="py-16 sm:py-20 bg-stone-50/80 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8B1E24] mb-2 font-mono">
            <span>{t.officialData.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            {t.officialData.title}
          </h2>
          <p className="text-stone-600 mt-2 max-w-2xl text-sm sm:text-base">
            {t.officialData.intro}
          </p>
          <div className="w-16 h-1 bg-[#8B1E24] mt-3"></div>
        </div>

        {/* Technical Data Sheet Grid */}
        <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 shadow-xs mb-8">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 text-sm">

            <div>
              <dt className="text-xs uppercase tracking-wider font-semibold text-stone-500 font-mono">
                {t.officialData.fieldTitle}
              </dt>
              <dd className="mt-1 font-serif font-bold text-stone-900 text-base sm:text-lg leading-snug">
                {metadata.title}
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-wider font-semibold text-stone-500 font-mono">
                {t.officialData.fieldAcronym}
              </dt>
              <dd className="mt-1 font-mono font-bold text-[#8B1E24] text-xl">
                {metadata.acronym}
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-wider font-semibold text-stone-500 font-mono">
                {t.officialData.fieldReference}
              </dt>
              <dd className="mt-1 font-mono font-bold text-stone-900 text-lg">
                {metadata.reference}
              </dd>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <dt className="text-xs uppercase tracking-wider font-semibold text-stone-500 font-mono">
                {t.officialData.fieldModality}
              </dt>
              <dd className="mt-1 text-stone-800 font-medium">
                {metadata.modality}
              </dd>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <dt className="text-xs uppercase tracking-wider font-semibold text-stone-500 font-mono">
                {t.officialData.fieldArea}
              </dt>
              <dd className="mt-1 text-stone-800 font-medium">
                {metadata.area}
              </dd>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <dt className="text-xs uppercase tracking-wider font-semibold text-stone-500 font-mono">
                {t.officialData.fieldDuration}
              </dt>
              <dd className="mt-1 text-stone-800 font-medium">
                {metadata.period} ({metadata.startDate} – {metadata.endDate})
              </dd>
            </div>

            <div className="pt-4 border-t border-stone-100 sm:col-span-2 lg:col-span-1">
              <dt className="text-xs uppercase tracking-wider font-semibold text-stone-500 font-mono">
                {t.officialData.fieldApplicant}
              </dt>
              <dd className="mt-1 text-stone-800 font-medium">
                <strong>{metadata.executingEntity}</strong>
                <span className="block text-xs text-stone-600 mt-0.5">
                  {metadata.faculty}, {metadata.department}
                </span>
              </dd>
            </div>

            <div className="pt-4 border-t border-stone-100 sm:col-span-2">
              <dt className="text-xs uppercase tracking-wider font-semibold text-stone-500 font-mono">
                {t.officialData.fieldFunder}
              </dt>
              <dd className="mt-1 text-stone-800 font-medium">
                {metadata.fundingEntity} &middot; <span className="font-mono text-xs">{metadata.fundingCode}</span>
                <span className="block text-xs text-stone-500 mt-0.5">
                  {metadata.coFinancing}
                </span>
              </dd>
            </div>

          </dl>

          {/* Investigadores Principales Acreditados */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 font-mono mb-3">
              {t.officialData.ipsLabel}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {principalInvestigators.map((ip) => (
                <div key={ip.name} className="p-3.5 bg-stone-50 rounded border border-stone-200/80">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="font-serif font-bold text-stone-900 text-base">
                      {ip.name}
                    </strong>
                    <span className="text-[10px] font-mono text-[#8B1E24] font-semibold bg-red-50 px-2 py-0.5 rounded">
                      {ip.role}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mb-2">
                    {ip.title} &middot; {ip.academicPosition}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-stone-600">
                    <a
                      href={ip.orcidUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-stone-700 hover:text-green-700 flex items-center gap-1"
                    >
                      <span className="text-green-600 font-bold">iD</span> {ip.orcid}
                    </a>
                    <a href={`mailto:${ip.email}`} className="text-[#8B1E24] underline">
                      {ip.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores Oficiales */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 font-mono mb-3">
              {t.officialData.indicatorsLabel}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-stone-50 rounded border border-stone-200/60">
                <span className="font-semibold text-stone-800 block mb-0.5">
                  {t.officialData.indWorkTeam}
                </span>
                <span className="text-stone-600">
                  {fmt(t.officialData.indWorkTeamText, {
                    men: metadata.indicators.men,
                    women: metadata.indicators.women,
                    total: metadata.indicators.workTeamTotal,
                  })}
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200/60">
                <span className="font-semibold text-stone-800 block mb-0.5">
                  {t.officialData.indTraining}
                </span>
                <span className="text-stone-600">
                  {fmt(t.officialData.indTrainingText, { phd: metadata.indicators.phdTheses })}
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200/60">
                <span className="font-semibold text-stone-800 block mb-0.5">
                  {t.officialData.indOutput}
                </span>
                <span className="text-stone-600">
                  {fmt(t.officialData.indOutputText, { pub: metadata.indicators.indexedPublications })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Citation Box & Acknowledgment Formula */}
        <div className="bg-stone-100 border border-stone-200 rounded p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 font-mono">
            <Info className="w-4 h-4 text-[#8B1E24]" />
            <span>{t.officialData.ackLabel}</span>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 bg-white p-3.5 rounded border border-stone-200 font-serif italic mb-4 leading-relaxed">
            {t.officialData.ackText}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => copyCitation('apa')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 transition-colors shadow-xs cursor-pointer"
            >
              {copiedType === 'apa' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
              <span>{copiedType === 'apa' ? t.officialData.copiedApa : t.officialData.copyApa}</span>
            </button>

            <button
              type="button"
              onClick={() => copyCitation('bibtex')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 transition-colors shadow-xs cursor-pointer"
            >
              {copiedType === 'bibtex' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <FileText className="w-3.5 h-3.5 text-stone-500" />}
              <span>{copiedType === 'bibtex' ? t.officialData.copiedBibtex : t.officialData.copyBibtex}</span>
            </button>

            <span className="text-xs text-stone-500 ml-auto font-mono">
              MCIN/AEI/10.13039/501100011033
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
