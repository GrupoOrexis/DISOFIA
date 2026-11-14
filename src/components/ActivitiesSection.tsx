import { useState, type ReactNode } from 'react';
import {
  BookMarked,
  Calendar,
  CalendarPlus,
  ChevronDown,
  Clock,
  Globe2,
  Mail,
  MapPin,
  Megaphone,
  Plane,
  Presentation,
  User,
  Users,
} from 'lucide-react';
import {
  INAUGURAL_SESSION,
  SEMINAR_INFO,
  SEMINAR_PROGRAM,
  WORKSHOPS,
} from '../data/disofiaData';
import { generateICS } from '../utils/helpers';

interface ActivitiesSectionProps {
  onOpenContactModal: () => void;
}

export function ActivitiesSection({ onOpenContactModal }: ActivitiesSectionProps) {
  const [open, setOpen] = useState<string>('seminarios');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const toggle = (id: string) => setOpen((prev) => (prev === id ? '' : id));

  const handleDownloadICS = () => {
    const icsContent = generateICS();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Seminario_Inaugural_DISOFIA_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

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
            <span>Agenda y Espacio Dialógico</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            4. Actividades del proyecto
          </h2>
          <p className="text-stone-600 mt-2 max-w-3xl text-sm sm:text-base">
            Las actividades de DISOFIA articulan la discusión científica, la formación y la proyección
            internacional del proyecto. Despliega cada apartado para ver su contenido.
          </p>
          <div className="w-16 h-1 bg-[#8B1E24] mt-3"></div>
        </div>

        <div className="space-y-4">

          {/* 1. Workshops y congresos internacionales */}
          {row(
            'workshops',
            <Presentation className="w-5 h-5" />,
            'Organización de workshops y congresos internacionales',
            'Encuentros científicos propios del proyecto',
            <div>
              <p className="text-stone-600 text-sm mb-6">
                DISOFIA organiza workshops y congresos internacionales como foros de puesta en común de los
                avances del proyecto con la red de colaboradores y los especialistas invitados.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {WORKSHOPS.map((ws) => (
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
                      <strong>Tema:</strong> {ws.topic}
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

          {/* 2. Seminarios de lectura e investigación (con programa desplegable) */}
          {row(
            'seminarios',
            <BookMarked className="w-5 h-5" />,
            'Seminarios de lectura e investigación',
            `Seminario Permanente de Lectura DISOFIA · ${SEMINAR_INFO.course}`,
            <div>
              {/* Programa completo del seminario */}
              <h4 className="font-serif font-bold text-lg text-stone-900 mb-1">
                Programa del Seminario de Lectura {SEMINAR_INFO.course.replace('Curso ', '')}
              </h4>
              <p className="text-stone-600 text-sm mb-4">
                Calendario de sesiones ordinarias del seminario permanente de lectura.
              </p>
              <div className="overflow-x-auto rounded-lg border border-stone-200">
                <table className="w-full text-sm border-collapse bg-white">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wider font-mono text-stone-500 bg-stone-50 border-b border-stone-200">
                      <th className="py-2.5 px-3 w-10">Nº</th>
                      <th className="py-2.5 px-3">Obra y lectura</th>
                      <th className="py-2.5 px-3">Expositor</th>
                      <th className="py-2.5 px-3 whitespace-nowrap">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SEMINAR_PROGRAM.map((s) => (
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
                  <span>{SEMINAR_INFO.location}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#8B1E24] mt-0.5 shrink-0" />
                  <span>Más información: {SEMINAR_INFO.contacts}</span>
                </div>
              </div>
            </div>,
          )}

          {/* 3. Participación en congresos internacionales */}
          {row(
            'congresos',
            <Globe2 className="w-5 h-5" />,
            'Participación en congresos internacionales',
            'Presentación de resultados en foros científicos',
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Los miembros del equipo presentan los avances y resultados del proyecto en congresos, coloquios
              y jornadas nacionales e internacionales de filosofía antigua y de la filosofía como forma de vida,
              reforzando el diálogo con otros grupos y líneas de investigación afines.
            </p>,
          )}

          {/* 4. Estancias de investigación y redes */}
          {row(
            'estancias',
            <Plane className="w-5 h-5" />,
            'Estancias de investigación y creación de redes internacionales de colaboración',
            'Movilidad y vertebración de la red científica',
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              El proyecto contempla estancias de investigación en centros de referencia y la consolidación de
              una red internacional de colaboración con investigadores y grupos que trabajan sobre Sócrates,
              la dialéctica y la filosofía como forma de vida.
            </p>,
          )}

          {/* 5. Divulgación y difusión */}
          {row(
            'divulgacion',
            <Megaphone className="w-5 h-5" />,
            'Divulgación y difusión de los resultados del proyecto',
            'Transferencia a la comunidad científica y al público general',
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Difusión de los resultados a través de publicaciones académicas, actividades de transferencia y
              acciones de divulgación dirigidas tanto a la comunidad científica como al público general,
              para acercar el pensamiento socrático y la filosofía antigua a un público amplio.
            </p>,
          )}

        </div>
      </div>
    </section>
  );
}
