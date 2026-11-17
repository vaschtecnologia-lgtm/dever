import React, { useState } from 'react';
import { CheckCircle2, ExternalLink, MessageCircle } from 'lucide-react';
import {
  BROKER_CITY,
  BROKER_CRECI,
  BROKER_NAME,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  formatPhoneBR,
} from '../data/properties';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Solicitar mais informações sobre um imóvel');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (name.trim().length < 2) {
      setErrorMsg('Informe seu nome para continuar.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Informe um WhatsApp válido com DDD.');
      return;
    }

    const fullMsg = [
      'Olá Déver Resende! Contato pelo site:',
      '',
      `Nome: ${name.trim()}`,
      `WhatsApp: ${phone.trim()}`,
      `Assunto: ${subject}`,
      message.trim() ? `Mensagem: ${message.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
      fullMsg
    )}`;
    setSentUrl(url);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <section
      id="contato"
      className="relative z-10 max-w-[1120px] mx-auto px-4 py-10"
      aria-labelledby="contact-heading"
    >
      <div className="bg-white/95 backdrop-blur-xs border border-[#0B0A63]/15 rounded-xl p-6 sm:p-8 max-w-2xl mx-auto text-center shadow-xs">
        <p className="text-xs font-semibold text-[#E06D22] tracking-wide mb-1">
          Corretor e Perito Avaliador de Imóveis · {BROKER_CRECI}
        </p>
        <h2
          id="contact-heading"
          className="font-display text-2xl sm:text-3xl font-bold text-[#0B0A63] mb-2"
        >
          Solicitar Informações
        </h2>
        <p className="text-sm text-zinc-600 max-w-lg mx-auto mb-6">
          Tire dúvidas sobre financiamento, laudos de avaliação ou agende uma consultoria com{' '}
          {BROKER_NAME} em {BROKER_CITY}. WhatsApp{' '}
          <span className="font-semibold text-[#0B0A63] tabular-nums">{WHATSAPP_DISPLAY}</span>.
        </p>

        {sentUrl ? (
          <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-5 space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="text-sm font-bold text-zinc-900">
              Mensagem pronta para envio pelo WhatsApp
            </p>
            <a
              href={sentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-[38px] px-5 rounded-lg bg-[#E06D22] hover:bg-[#C85A14] text-white text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar mensagem no WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div>
              <button
                type="button"
                onClick={() => setSentUrl(null)}
                className="text-xs font-medium text-[#0B0A63] hover:underline cursor-pointer"
              >
                Enviar outra solicitação
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="info-name" className="block text-xs font-semibold text-[#0B0A63] mb-1">
                  Nome completo
                </label>
                <input
                  id="info-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  required
                  className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 bg-[#F6F9FE] text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-[#E06D22]"
                />
              </div>
              <div>
                <label htmlFor="info-phone" className="block text-xs font-semibold text-[#0B0A63] mb-1">
                  WhatsApp
                </label>
                <input
                  id="info-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneBR(e.target.value))}
                  placeholder="(61) 99999-9999"
                  required
                  className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 bg-[#F6F9FE] text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-[#E06D22] tabular-nums"
                />
              </div>
            </div>

            <div>
              <label htmlFor="info-subject" className="block text-xs font-semibold text-[#0B0A63] mb-1">
                Interesse
              </label>
              <select
                id="info-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 bg-[#F6F9FE] text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-[#E06D22]"
              >
                <option value="Solicitar mais informações sobre um imóvel">
                  Solicitar mais informações sobre um imóvel
                </option>
                <option value="Simulação de financiamento bancário">
                  Simulação de financiamento bancário
                </option>
                <option value="Avaliação e perícia imobiliária">
                  Avaliação e perícia imobiliária
                </option>
                <option value="Consultoria imobiliária personalizada">
                  Consultoria imobiliária personalizada
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="info-message" className="block text-xs font-semibold text-[#0B0A63] mb-1">
                Mensagem
              </label>
              <textarea
                id="info-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Informe o bairro, tipo de imóvel ou dúvida que deseja esclarecer..."
                className="w-full p-3 rounded-lg border border-[#0B0A63]/15 bg-[#F6F9FE] text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-[#E06D22] resize-none"
              />
            </div>

            {errorMsg && (
              <p className="text-xs font-semibold text-red-600 text-center" role="alert">
                {errorMsg}
              </p>
            )}

            <div className="pt-1 flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-auto h-[38px] px-7 rounded-lg bg-[#E06D22] hover:bg-[#C85A14] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar informações pelo WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
