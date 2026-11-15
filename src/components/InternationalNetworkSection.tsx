import { useState } from 'react';
import {
  Globe2,
  GraduationCap,
  LayoutGrid,
  Search,
  Table as TableIcon,
  Users,
} from 'lucide-react';
import { useDisofiaData } from '../data/disofiaData';
import { useLang } from '../i18n/LanguageContext';
import { REGION_LABELS } from '../i18n/translations';
import { filterWorkTeam } from '../utils/helpers';

export function InternationalNetworkSection() {
  const { lang, t } = useLang();
  const { workTeam } = useDisofiaData();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'international' | 'predoc'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const regionLabel = (r: string) => REGION_LABELS[r]?.[lang] ?? r;

  const filteredMembers = filterWorkTeam(
    workTeam,
    searchQuery,
    selectedRegion,
    selectedCategory === 'all' ? 'all' : selectedCategory === 'international' ? 'international' : 'predoc'
  );

  const predocCount = workTeam.filter((m) => m.category === 'Investigador en Formación / Predoc').length;
  const collabCount = workTeam.filter((m) => m.category === 'Colaborador Internacional').length;

  const internationalList = filteredMembers
    .filter((m) => m.category === 'Colaborador Internacional')
    .sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
  const doctoralList = filteredMembers
    .filter((m) => m.category === 'Investigador en Formación / Predoc')
    .sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));

  return (
    <section id="colaboradores" className="py-16 sm:py-20 bg-stone-50/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8B1E24] mb-2 font-mono">
            <span>{t.network.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            {t.network.titlePrefix} ({workTeam.length} {t.network.members})
          </h2>
          <p className="text-stone-600 mt-2 max-w-3xl text-sm sm:text-base">
            {t.network.intro}
          </p>
          <div className="w-16 h-1 bg-[#8B1E24] mt-3"></div>
        </div>

        {/* Indicators Card Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
          <div className="sm:border-r border-stone-100 pr-3 pb-3 sm:pb-0 border-b sm:border-b-0">
            <span className="text-xs font-mono text-stone-500 uppercase tracking-wider block">
              {t.network.workTeam}
            </span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tabular-nums">
              {workTeam.length}
            </span>
            <span className="text-[11px] text-stone-500 block mt-0.5">
              {t.network.workTeamSub}
            </span>
          </div>

          <div className="sm:border-r border-stone-100 pr-3 pb-3 sm:pb-0 border-b sm:border-b-0">
            <span className="text-xs font-mono text-stone-500 uppercase tracking-wider block">
              {t.network.intlCollaborators}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#8B1E24] tabular-nums">
                {collabCount}
              </span>
              <span className="text-xs font-mono text-stone-500">
                {t.network.specialists}
              </span>
            </div>
            <span className="text-[11px] text-stone-500 block mt-0.5">
              {t.network.intlCollaboratorsSub}
            </span>
          </div>

          <div>
            <span className="text-xs font-mono text-stone-500 uppercase tracking-wider block">
              {t.network.doctoralResearchers}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tabular-nums">
                {predocCount}
              </span>
              <span className="text-xs font-mono text-stone-500">
                {t.network.phdCandidates}
              </span>
            </div>
            <span className="text-[11px] text-stone-500 block mt-0.5">
              {t.network.doctoralResearchersSub}
            </span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white px-4 py-3 rounded-lg border border-stone-200 mb-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#8B1E24] text-white font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200'
                }`}
              >
                {t.network.allMembers} ({workTeam.length})
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('international')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  selectedCategory === 'international'
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200'
                }`}
              >
                {t.network.intlCollaborators} ({collabCount})
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('predoc')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  selectedCategory === 'predoc'
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200'
                }`}
              >
                {t.network.doctoralResearchers} ({predocCount})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-44 sm:w-56">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.network.searchPlaceholder}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B1E24]"
                />
              </div>

              <div className="flex items-center border border-stone-200 rounded p-0.5 bg-stone-50 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    viewMode === 'table' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title={t.network.tableView}
                  aria-label={t.network.tableView}
                >
                  <TableIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    viewMode === 'cards' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title={t.network.cardsView}
                  aria-label={t.network.cardsView}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Presentation */}
        {viewMode === 'table' ? (
          <div className="overflow-x-auto bg-white border border-stone-200 rounded-lg shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-stone-100 font-serif text-sm border-b border-stone-800">
                  <th className="py-3.5 px-4 font-semibold">{t.network.thResearcher}</th>
                  <th className="py-3.5 px-4 font-semibold">{t.network.thInstitution}</th>
                  <th className="py-3.5 px-4 font-semibold">{t.network.thCountryRegion}</th>
                  <th className="py-3.5 px-4 font-semibold">{t.network.thRole}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs sm:text-sm">
                {internationalList.length > 0 && (
                  <>
                    <tr id="expertos-internacionales" className="scroll-mt-24 bg-stone-100/90 border-y border-stone-200 text-xs font-bold text-stone-800">
                      <td colSpan={4} className="py-2.5 px-4 font-serif">
                        <div className="flex items-center gap-2">
                          <Globe2 className="w-4 h-4 text-[#8B1E24]" />
                          <span>{t.network.blockIntl} ({internationalList.length})</span>
                        </div>
                      </td>
                    </tr>
                    {internationalList.map((member, idx) => (
                      <tr
                        key={`intl-${idx}`}
                        className="hover:bg-red-50/20 transition-colors odd:bg-stone-50/40"
                      >
                        <td className="py-3 px-4 font-medium text-stone-900 flex items-center gap-2">
                          <span className="text-base">{member.flag}</span>
                          <div>
                            <span className="font-serif font-bold text-stone-800 sm:text-base block">
                              {member.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-stone-700 font-medium">
                          {member.institution}
                        </td>
                        <td className="py-3 px-4 text-stone-600">
                          <span className="inline-block text-xs font-medium bg-stone-100 px-2 py-0.5 rounded">
                            {member.country} ({regionLabel(member.region)})
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                            <Globe2 className="w-3 h-3 text-slate-500" />
                            <span>{t.network.roleIntl}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </>
                )}

                {doctoralList.length > 0 && (
                  <>
                    <tr id="investigadores-predoctorales" className="scroll-mt-24 bg-stone-100/90 border-y border-stone-200 text-xs font-bold text-stone-800">
                      <td colSpan={4} className="py-2.5 px-4 font-serif">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-[#8B1E24]" />
                          <span>{t.network.blockDoctoral} ({doctoralList.length})</span>
                        </div>
                      </td>
                    </tr>
                    {doctoralList.map((member, idx) => (
                      <tr
                        key={`doc-${idx}`}
                        className="hover:bg-red-50/20 transition-colors odd:bg-stone-50/40"
                      >
                        <td className="py-3 px-4 font-medium text-stone-900 flex items-center gap-2">
                          <span className="text-base">{member.flag}</span>
                          <div>
                            <span className="font-serif font-bold text-stone-800 sm:text-base block">
                              {member.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-stone-700 font-medium">
                          {member.institution}
                        </td>
                        <td className="py-3 px-4 text-stone-600">
                          <span className="inline-block text-xs font-medium bg-stone-100 px-2 py-0.5 rounded">
                            {member.country} ({regionLabel(member.region)})
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#8B1E24] bg-red-50 px-2.5 py-0.5 rounded border border-red-200">
                            <GraduationCap className="w-3 h-3 text-[#8B1E24]" />
                            <span>{t.network.roleDoctoral}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-8">
            {internationalList.length > 0 && (
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-3 flex items-center gap-2 pb-2 border-b border-stone-200">
                  <Globe2 className="w-4 h-4 text-[#8B1E24]" />
                  <span>{t.network.blockIntl} ({internationalList.length})</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {internationalList.map((member, idx) => (
                    <div
                      key={`card-intl-${idx}`}
                      className="bg-white p-5 rounded-lg border border-stone-200 hover:border-[#8B1E24]/50 transition-colors shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl">{member.flag}</span>
                          <span className="text-[11px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                            {regionLabel(member.region)}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base sm:text-lg text-stone-900 mb-1">
                          {member.name}
                        </h4>
                        <p className="text-xs text-stone-600 mb-3 font-medium">
                          {member.institution}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="text-stone-500 text-[11px]">
                          {member.country}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-700">
                          {t.network.roleIntlShort}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {doctoralList.length > 0 && (
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-3 flex items-center gap-2 pb-2 border-b border-stone-200">
                  <GraduationCap className="w-4 h-4 text-[#8B1E24]" />
                  <span>{t.network.blockDoctoral} ({doctoralList.length})</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {doctoralList.map((member, idx) => (
                    <div
                      key={`card-doc-${idx}`}
                      className="bg-white p-5 rounded-lg border border-stone-200 hover:border-[#8B1E24]/50 transition-colors shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl">{member.flag}</span>
                          <span className="text-[11px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                            {regionLabel(member.region)}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base sm:text-lg text-stone-900 mb-1">
                          {member.name}
                        </h4>
                        <p className="text-xs text-stone-600 mb-3 font-medium">
                          {member.institution}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="text-stone-500 text-[11px]">
                          {member.country}
                        </span>
                        <span className="text-[11px] font-semibold text-[#8B1E24]">
                          {t.network.roleDoctoral}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {filteredMembers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-stone-200">
            <Users className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-stone-700 font-medium">{t.network.noResults}</p>
            <button
              type="button"
              onClick={() => {
                setSelectedRegion('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-[#8B1E24] underline cursor-pointer"
            >
              {t.network.resetFilters}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
