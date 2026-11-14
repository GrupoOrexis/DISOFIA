import { useState } from 'react';
import { AtSign, Mail, Send, User } from 'lucide-react';
import { PRINCIPAL_INVESTIGATORS } from '../data/disofiaData';

export function ContactSection() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const to = PRINCIPAL_INVESTIGATORS.map((ip) => ip.email).join(',');
    const subject = encodeURIComponent(asunto.trim() || 'Contacto · Proyecto DISOFIA');
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nCorreo: ${email}\n\n${mensaje}`,
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contacto" className="py-16 sm:py-20 bg-stone-50/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8B1E24] mb-2 font-mono">
            <span>Contacto</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Ponte en contacto con el proyecto
          </h2>
          <p className="text-stone-600 mt-2 max-w-3xl text-sm sm:text-base">
            Puedes escribir directamente a los Investigadores Principales por correo electrónico, o enviarnos
            un mensaje a través del formulario.
          </p>
          <div className="w-16 h-1 bg-[#8B1E24] mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Columna 1: Correo directo a los IPs */}
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900 mb-4">
              Correo directo a los Investigadores Principales
            </h3>
            <div className="space-y-4">
              {PRINCIPAL_INVESTIGATORS.map((ip) => (
                <a
                  key={ip.email}
                  href={`mailto:${ip.email}`}
                  className="flex items-center gap-4 bg-white border border-stone-200 hover:border-[#8B1E24] rounded-lg p-4 sm:p-5 shadow-xs transition-colors group"
                >
                  <span className="w-11 h-11 rounded-full bg-red-50 text-[#8B1E24] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-mono uppercase tracking-wider text-[#8B1E24] font-bold">
                      {ip.role}
                    </span>
                    <span className="block font-serif font-bold text-lg text-stone-900 leading-tight">
                      {ip.name}
                    </span>
                    <span className="block text-sm text-stone-600 group-hover:text-[#8B1E24] transition-colors truncate">
                      {ip.email}
                    </span>
                  </span>
                </a>
              ))}
            </div>
            <p className="text-xs text-stone-500 mt-4 leading-relaxed">
              Coordinación del proyecto en el Departamento de Filosofía de la Universidad de Navarra
              (Facultad de Filosofía y Letras).
            </p>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              El proyecto se enmarca en el grupo de investigación consolidado{' '}
              <a
                href="https://portalcientifico.unav.edu/grupos/62169/detalle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B1E24] font-medium hover:underline"
              >
                Órexis
              </a>
              .
            </p>
          </div>

          {/* Columna 2: Formulario de mensaje */}
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900 mb-4">
              Envíanos un mensaje
            </h3>
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-stone-200 rounded-lg p-5 sm:p-6 shadow-xs space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="block text-xs font-semibold text-stone-700 mb-1.5">Nombre</span>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B1E24] focus:border-[#8B1E24]"
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="block text-xs font-semibold text-stone-700 mb-1.5">Correo electrónico</span>
                  <div className="relative">
                    <AtSign className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B1E24] focus:border-[#8B1E24]"
                    />
                  </div>
                </label>
              </div>

              <label className="block">
                <span className="block text-xs font-semibold text-stone-700 mb-1.5">Asunto</span>
                <input
                  type="text"
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  placeholder="Asunto del mensaje"
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B1E24] focus:border-[#8B1E24]"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-semibold text-stone-700 mb-1.5">Mensaje</span>
                <textarea
                  required
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Escribe tu mensaje…"
                  rows={5}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded text-stone-800 resize-y focus:outline-none focus:ring-1 focus:ring-[#8B1E24] focus:border-[#8B1E24]"
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B1E24] hover:bg-[#6C151A] text-white text-sm font-semibold rounded shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enviar mensaje</span>
              </button>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Al enviar se abrirá tu programa de correo con el mensaje dirigido a la coordinación del proyecto.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
