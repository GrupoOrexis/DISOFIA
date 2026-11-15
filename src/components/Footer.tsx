import { ArrowUp } from 'lucide-react';
import { useDisofiaData } from '../data/disofiaData';
import { useT } from '../i18n/LanguageContext';
import { fmt } from '../i18n/translations';

interface FooterProps {
  onOpenGoogleSitesModal: () => void;
  onOpenContactModal: () => void;
}

export function Footer({ onOpenGoogleSitesModal, onOpenContactModal }: FooterProps) {
  const t = useT();
  const { metadata, principalInvestigators } = useDisofiaData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '#presentacion', label: t.footer.link1 },
    { href: '#lineas', label: t.footer.link2 },
    { href: '#equipo', label: t.footer.link3 },
    { href: '#colaboradores', label: t.footer.link4 },
    { href: '#actividades', label: t.footer.link5 },
    { href: '#datos', label: t.footer.link6 },
  ];

  return (
    <footer className="bg-[#0F172A] text-stone-300 pt-16 pb-12 border-t-2 border-[#8B1E24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-stone-800 text-sm">

          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif tracking-widest text-2xl font-bold text-white">
                DISOFIA
              </span>
              <span className="text-xs font-mono text-stone-400 pl-2 border-l border-stone-700">
                {metadata.reference}
              </span>
            </div>

            <p className="font-serif text-stone-300 text-sm sm:text-base italic max-w-md">
              «{metadata.title}»
            </p>

            <p className="text-xs text-stone-400 max-w-md leading-relaxed">
              {fmt(t.footer.blurb, {
                modality: metadata.modality,
                area: metadata.area,
                code: metadata.fundingCode,
              })}
            </p>

            <div className="text-xs text-stone-400 pt-1">
              <strong>{t.footer.applicantLabel}</strong> {metadata.executingEntity} ({metadata.faculty}, {metadata.department})
            </div>
          </div>

          {/* Col 2: Secciones */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-mono font-semibold text-white">
              {t.footer.structureTitle}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Enlaces y Utilidades */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-mono font-semibold text-white">
              {t.footer.ipsContactTitle}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {principalInvestigators.map((ip) => (
                <li key={ip.name}>
                  <a
                    href={`mailto:${ip.email}`}
                    className="hover:text-white transition-colors block"
                  >
                    {ip.name} ({ip.role.slice(0, 3)}): {ip.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            &copy; 2026–2029 DISOFIA ({metadata.reference}) &middot; {metadata.executingEntity} &middot; {t.footer.rights}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-stone-400 hover:text-white transition-colors cursor-pointer"
            aria-label={t.footer.backToTop}
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
