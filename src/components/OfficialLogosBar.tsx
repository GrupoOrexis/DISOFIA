import { useT } from '../i18n/LanguageContext';

export function OfficialLogosBar() {
  const t = useT();
  return (
    <section
      aria-label="Entidades Financiadoras e Instituciones Ejecutoras"
      className="border-y border-stone-200 bg-stone-50/90 py-4"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full items-center">

          {/* 1. Gobierno de España / Ministerio */}
          <div className="flex items-center justify-center py-1">
            <div className="flex items-center gap-3 text-left">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-2.5 h-3.5 bg-[#AA151B] inline-block rounded-[1px]"></span>
                  <span className="w-2.5 h-3.5 bg-[#F1BF00] inline-block rounded-[1px]"></span>
                  <span className="w-2.5 h-3.5 bg-[#AA151B] inline-block rounded-[1px]"></span>
                  <span className="uppercase font-bold tracking-wider text-stone-800" style={{ fontSize: '13px' }}>
                    {t.logos.govSpain}
                  </span>
                </div>
                <span className="font-semibold text-stone-900 tracking-tight leading-tight" style={{ fontSize: '14px' }}>
                  {t.logos.ministry1}
                </span>
                <span className="font-medium text-stone-700 leading-tight" style={{ fontSize: '13px' }}>
                  {t.logos.ministry2}
                </span>
              </div>
            </div>
          </div>

          {/* 2. AEI - Agencia Estatal de Investigación */}
          <div className="flex items-center justify-center py-1">
            <img
              src="assets/aistudio/aei_logo.png"
              alt={t.logos.aeiAlt}
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </div>

          {/* 3. Unión Europea */}
          <div className="flex items-center justify-center py-1">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-6 bg-[#003399] rounded-[2px] flex items-center justify-center text-[#FFCC00] text-xs font-bold shadow-xs shrink-0">
                ★ EU
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-stone-900 tracking-tight leading-tight" style={{ fontSize: '14px' }}>
                  {t.logos.euPrefix}
                </span>
                <span className="font-semibold text-[#003399] leading-tight" style={{ fontSize: '14px' }}>
                  {t.logos.euName}
                </span>
                <span className="text-stone-500" style={{ fontSize: '13px' }}>
                  {t.logos.euFund}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Universidad de Navarra */}
          <div className="flex items-center justify-center py-1">
            <div className="flex items-center gap-3 text-left">
              <img
                src="assets/aistudio/unav_seal_red.png"
                alt={t.logos.unavSealAlt}
                className="h-12 sm:h-14 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-bold text-stone-900 tracking-tight leading-tight" style={{ fontSize: '14px' }}>
                  {t.logos.unav}
                </span>
                <span className="text-stone-600 leading-tight" style={{ fontSize: '14px' }}>
                  {t.logos.unavFaculty}
                </span>
                <span className="text-[#8B1E24] font-medium mt-0.5" style={{ fontSize: '13px' }}>
                  {t.logos.unavRole}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
