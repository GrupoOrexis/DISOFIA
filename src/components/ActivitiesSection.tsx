import { useState, type ReactNode } from 'react';
import {
  BookMarked,
  Calendar,
  ChevronDown,
  Globe2,
  Mail,
  MapPin,
  Megaphone,
  Plane,
  Presentation,
} from 'lucide-react';
import { useDisofiaData } from '../data/disofiaData';
import { useT } from '../i18n/LanguageContext';

interface ActivitiesSectionProps {
  onOpenContactModal: () => void;
}

export function ActivitiesSection({ onOpenContactModal }: ActivitiesSectionProps) {
  const t = useT();
  const { workshops, seminarProgram, seminarInfo } = useDisofiaData();
  const [open, setOpen] = useState<string>('seminarios');

  const toggle = (id: string) => setOpen((prev) => (prev === id ? '' : id));

  const row = (
    id: string,
    icon: ReactNode,
    title: string,
    subtitle: string,
    content: ReactNode,
  ) => (
    <div className="border border-stone-200 rounded-lg bg-white shadow-xs overflow-hidden">
      <button
        type="button"
        onClick={() => toggle(id)}
        aria-expanded={open === id}
        className="w-full flex items-center gap-4 px-5 sm:px-6 py-4 text-left hover:bg-stone-50 transition-colors cursor-pointer"
      >
        <span className="w-10 h-10 rounded-md bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center shrink-0">
          {icon}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block font-serif font-bold text-base sm:text-xl text-stone-900 leading-tight">
            {title}
          </span>
          {subtitle && <span className="block text-xs text-stone-500 mt-0.5">{subtitle}</span>}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-stone-400 shrink-0 transition-transform ${open === id ? 'rotate-180' : ''}`}
        />
      </button>
      {open === id && (
        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-stone-100">{content}</div>
      )}
    </div>
  );

  return (
    <section id="actividades" className="py-16 sm:py-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8B1E24] mb-2 font-mono">
            <span>{t.activities.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            {t.activities.title}
          </h2>
          <p className="text-stone-600 mt-2 max-w-3xl text-sm sm:text-base">
            {t.activities.intro}
          </p>
          <div className="w-16 h-1 bg-[#8B1E24] mt-3"></div>
        </div>

        <div className="space-y-4">

          {/* 1. Workshops y congresos internacionales */}
          {row(
            'workshops',
            <Presentation className="w-5 h-5" />,
            t.activities.workshopsTitle,
            t.activities.workshopsSub,
            <div>
              <p className="text-stone-600 text-sm mb-6">
                {t.activities.workshopsIntro}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workshops.map((ws) => (
                  <div
                    key={ws.id}
                    className="bg-stone-50 p-6 rounded border border-stone-200 hover:border-[#8B1E24]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-[#8B1E24] uppercase tracking-wider">
                        {ws.edition}
                      </span>
                      <span className="text-[11px] font-medium bg-white text-stone-700 px-2.5 py-0.5 rounded border border-stone-200">
                        {ws.status}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-lg text-stone-900 mb-2">{ws.title}</h4>
                    <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
                      <strong>{t.activities.topicLabel}</strong> {ws.topic}
                    </p>
                    <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                      <span className="flex items-center gap-1.5 font-medium text-stone-700">
                        <Calendar className="w-3.5 h-3.5 text-[#8B1E24]" />
                        <span>{ws.date}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{ws.location}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>,
          )}

          {/* 2. Seminarios de lectura e investigación (con programa) */}
          {row(
            'seminarios',
            <BookMarked className="w-5 h-5" />,
            t.activities.seminarsTitle,
            `${t.activities.seminarsSubPrefix} · ${seminarInfo.course}`,
            <div>
              <h4 className="font-serif font-bold text-lg text-stone-900 mb-1">
                {t.activities.programTitlePrefix} · {seminarInfo.course}
              </h4>
              <p className="text-stone-600 text-sm mb-4">
                {t.activities.programIntro}
              </p>
              <div className="overflow-x-auto rounded-lg border border-stone-200">
                <table className="w-full text-sm border-collapse bg-white">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wider font-mono text-stone-500 bg-stone-50 border-b border-stone-200">
                      <th className="py-2.5 px-3 w-10">{t.activities.thNum}</th>
                      <th className="py-2.5 px-3">{t.activities.thWork}</th>
                      <th className="py-2.5 px-3">{t.activities.thSpeaker}</th>
                      <th className="py-2.5 px-3 whitespace-nowrap">{t.activities.thDate}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seminarProgram.map((s) => (
                      <tr key={s.n} className="border-b border-stone-100 last:border-0 align-top hover:bg-stone-50/60">
                        <td className="py-3 px-3 font-mono text-[#8B1E24] font-bold">
                          {String(s.n).padStart(2, '0')}
                        </td>
                        <td className="py-3 px-3 text-stone-800 leading-snug">{s.work}</td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="font-semibold text-stone-900">{s.speaker}</span>
                          <span className="block text-xs text-stone-500">{s.affiliation}</span>
                        </td>
                        <td className="py-3 px-3 text-stone-700 whitespace-nowrap">{s.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8B1E24] mt-0.5 shrink-0" />
                  <span>{seminarInfo.location}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#8B1E24] mt-0.5 shrink-0" />
                  <span>{t.activities.moreInfo} {seminarInfo.contacts}</span>
                </div>
              </div>
            </div>,
          )}

          {/* 3. Participación en congresos y cursos nacionales e internacionales */}
          {row(
            'congresos',
            <Globe2 className="w-5 h-5" />,
            t.activities.congressTitle,
            t.activities.congressSub,
            <div>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-5">
                {t.activities.congressIntro}
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8B1E24] shrink-0" />
                  <div>
                    <p className="font-semibold text-stone-900 text-sm sm:text-base">
                      {t.activities.congress1Title}
                    </p>
                    <p className="text-sm text-stone-600">
                      {t.activities.congress1Place}
                    </p>
                    <p className="text-xs font-mono text-[#8B1E24] mt-0.5">{t.activities.congress1Date}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8B1E24] shrink-0" />
                  <div>
                    <p className="font-semibold text-stone-900 text-sm sm:text-base">
                      {t.activities.congress2Title}
                    </p>
                    <p className="text-sm text-stone-600">
                      {t.activities.congress2Place}
                    </p>
                    <p className="text-xs font-mono text-[#8B1E24] mt-0.5">{t.activities.congress2Date}</p>
                  </div>
                </li>
              </ul>
            </div>,
          )}

          {/* 4. Estancias de investigación y redes */}
          {row(
            'estancias',
            <Plane className="w-5 h-5" />,
            t.activities.staysTitle,
            t.activities.staysSub,
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {t.activities.staysText}
            </p>,
          )}

          {/* 5. Divulgación y difusión */}
          {row(
            'divulgacion',
            <Megaphone className="w-5 h-5" />,
            t.activities.outreachTitle,
            t.activities.outreachSub,
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {t.activities.outreachText}
            </p>,
          )}

        </div>
      </div>
    </section>
  );
}
