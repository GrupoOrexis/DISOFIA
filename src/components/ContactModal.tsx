import { useState } from 'react';
import { CheckCircle2, Mail, Send, X } from 'lucide-react';
import { useT } from '../i18n/LanguageContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const t = useT();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [subject, setSubject] = useState(t.contactModal.optSeminar);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg(t.contactModal.errorRequired);
      return;
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setInstitution('');
    setMessage('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
    >
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-[#0F172A] text-white p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#8B1E24] flex items-center justify-center text-white">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 id="contact-modal-title" className="font-serif font-bold text-lg text-white">
                {t.contactModal.title}
              </h3>
              <p className="text-xs text-stone-300">
                {t.contactModal.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-white/10 transition-colors"
            aria-label={t.contactModal.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-serif font-bold text-xl text-stone-900">
              {t.contactModal.successTitle}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
              {t.contactModal.successBodyPrefix} <strong>{name}</strong>{t.contactModal.successBodyMid} <strong>{email}</strong> {t.contactModal.successBodySuffix}
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#8B1E24] hover:bg-[#6C151A] rounded transition-colors"
              >
                {t.contactModal.accept}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                {errorMsg}
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="contact-name" className="block font-medium text-stone-700">
                {t.contactModal.labelName}
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.contactModal.phName}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B1E24]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-email" className="block font-medium text-stone-700">
                {t.contactModal.labelEmail}
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.contactModal.phEmail}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B1E24]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-inst" className="block font-medium text-stone-700">
                {t.contactModal.labelInst}
              </label>
              <input
                id="contact-inst"
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder={t.contactModal.phInst}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B1E24]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-subject" className="block font-medium text-stone-700">
                {t.contactModal.labelReason}
              </label>
              <select
                id="contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B1E24]"
              >
                <option value={t.contactModal.optSeminar}>{t.contactModal.optSeminar}</option>
                <option value={t.contactModal.optCollab}>{t.contactModal.optCollab}</option>
                <option value={t.contactModal.optWorkshops}>{t.contactModal.optWorkshops}</option>
                <option value={t.contactModal.optOther}>{t.contactModal.optOther}</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-message" className="block font-medium text-stone-700">
                {t.contactModal.labelMessage}
              </label>
              <textarea
                id="contact-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.contactModal.phMessage}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B1E24]"
              />
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                {t.contactModal.directContact}
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8B1E24] hover:bg-[#6C151A] text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.contactModal.send}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
