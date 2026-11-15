import { useState } from 'react';
import { Globe, Mail, Menu, X } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

interface NavbarProps {
  onOpenContactModal: () => void;
}

function LangSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useLang();
  return (
    <div
      className={`inline-flex items-center rounded-md border border-stone-700 overflow-hidden ${compact ? '' : 'shrink-0'}`}
      role="group"
      aria-label={t.langSwitch.label}
    >
      <span className="hidden xl:flex items-center pl-2 pr-1 text-stone-400" aria-hidden="true">
        <Globe className="w-3.5 h-3.5" />
      </span>
      <button
        type="button"
        onClick={() => setLang('es')}
        aria-pressed={lang === 'es'}
        title={t.langSwitch.toSpanish}
        className={`px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
          lang === 'es' ? 'bg-[#8B1E24] text-white' : 'text-stone-300 hover:text-white hover:bg-stone-800'
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        title={t.langSwitch.toEnglish}
        className={`px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors cursor-pointer border-l border-stone-700 ${
          lang === 'en' ? 'bg-[#8B1E24] text-white' : 'text-stone-300 hover:text-white hover:bg-stone-800'
        }`}
      >
        EN
      </button>
    </div>
  );
}

export function Navbar(_props: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLang();

  const navLinks = [
    { label: t.nav.overview, href: '#presentacion', external: false },
    { label: t.nav.lines, href: '#lineas', external: false },
    { label: t.nav.team, href: '#equipo', external: false },
    { label: t.nav.network, href: '#colaboradores', external: false },
    { label: t.nav.activities, href: '#actividades', external: false },
    { label: t.nav.officialRecord, href: '#datos', external: false },
    { label: t.nav.orexisGroup, href: 'https://portalcientifico.unav.edu/grupos/62169/detalle', external: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#2B2927] border-b border-stone-700 text-stone-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-18">

          {/* Zone 1: Single text wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 text-stone-100 hover:text-white transition-colors whitespace-nowrap shrink-0 group"
          >
            <span className="font-serif tracking-widest text-xl font-bold text-white group-hover:text-red-200 transition-colors">
              DISOFIA
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-stone-400 pl-2 border-l border-stone-700">
              PID2025-168764NB-I00
            </span>
          </a>

          {/* Zone 2: 4-6 concise text nav links */}
          <nav
            aria-label={t.nav.mainNav}
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-300"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="hover:text-white hover:underline underline-offset-8 decoration-[#8B1E24] decoration-2 transition-all whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Language switch + Contacto CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LangSwitch />
            <a
              href="#contacto"
              className="inline-flex items-center gap-1.5 text-white hover:text-stone-200 text-sm font-semibold uppercase tracking-wide transition-colors whitespace-nowrap hover:underline underline-offset-4 decoration-2"
            >
              <Mail className="w-4 h-4" />
              <span>{t.nav.contact}</span>
            </a>
          </div>

          {/* Mobile cluster: language switch + hamburger */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <LangSwitch compact />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#2B2927] border-b border-stone-700 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-stone-200 hover:bg-slate-800 rounded font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#8B1E24] rounded"
            >
              <Mail className="w-4 h-4" />
              <span>{t.nav.contact}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
