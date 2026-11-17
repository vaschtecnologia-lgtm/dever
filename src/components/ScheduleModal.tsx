import React, { useEffect, useRef, useState } from 'react';
import { Calendar, CheckCircle2, ExternalLink, MessageCircle, X } from 'lucide-react';
import {
  DEFAULT_FALLBACK_PHOTO,
  TIME_SLOTS,
  WHATSAPP_NUMBER,
  formatBRL,
  formatDateBR,
  formatPhoneBR,
  getTodayISO,
} from '../data/properties';
import type { Property } from '../types';
import { PropertyImage } from './PropertyImage';

interface ScheduleModalProps {
  propertyId: string | null;
  properties: Property[];
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  propertyId,
  properties,
  onClose,
}) => {
  const property =
    propertyId !== null
      ? properties.find((x) => String(x.id) === String(propertyId)) || null
      : null;

  const todayISO = getTodayISO();
  const [date, setDate] = useState(todayISO);
  const [time, setTime] = useState<string>('10:00');
  const [clientName, setClientName] = useState('');
  const [clientWhatsApp, setClientWhatsApp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (propertyId !== null) {
      setDate(getTodayISO());
      setTime('10:00');
      setErrorMsg('');
      setSubmittedUrl(null);
    }
  }, [propertyId]);

  useEffect(() => {
    if (!property) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [property, onClose]);

  if (!property) return null;

  const handleOpenPicker = () => {
    const input = dateInputRef.current;
    if (!input) return;
    try {
      if (typeof input.showPicker === 'function') {
        input.showPicker();
      }
    } catch {
      // Fallback gracefully when browser restricts showPicker
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!date) {
      setErrorMsg('Selecione uma data para a visita.');
      return;
    }
    if (!time) {
      setErrorMsg('Escolha um horário disponível.');
      return;
    }
    if (clientName.trim().length < 2) {
      setErrorMsg('Informe seu nome completo.');
      return;
    }
    if (clientWhatsApp.replace(/\D/g, '').length < 10) {
      setErrorMsg('Informe um número de WhatsApp válido com DDD.');
      return;
    }

    const formattedDate = formatDateBR(date);
    const localText = `${property.neighborhood}, ${property.city}`;
    const message = [
      'Olá Déver Resende! Gostaria de agendar uma visita:',
      '',
      `Imóvel: ${property.title}`,
      `Preço: ${formatBRL(property.price)}`,
      `Local: ${localText}`,
      `Dia: ${formattedDate}`,
      `Horário: ${time}`,
      `Nome: ${clientName.trim()}`,
      `WhatsApp: ${clientWhatsApp.trim()}`,
      '',
      'Visita somente acompanhada pelo corretor.',
    ].join('\n');

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
      message
    )}`;

    setSubmittedUrl(whatsappUrl);

    const anchor = document.createElement('a');
    anchor.href = whatsappUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#07063D]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#0B0A63]/20 my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header in royal navy */}
        <div className="px-4 py-3 bg-[#0B0A63] text-white flex items-center justify-between gap-3 shrink-0">
          <div>
            <p className="text-[11px] font-medium text-[#FAC7A4]">
              Corretor e Perito Avaliador · CRECI-DF 30584
            </p>
            <h2 id="schedule-modal-title" className="font-display text-lg font-bold text-white">
              Agendar Visita
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela de agendamento"
            className="w-9 h-9 rounded-lg border border-white/20 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 space-y-4">
          {/* Selected property summary fetched by ID */}
          <div className="border border-[#0B0A63]/15 rounded-lg overflow-hidden bg-[#F4F7FC]">
            <PropertyImage
              src={property.photos[0] || DEFAULT_FALLBACK_PHOTO}
              alt={property.title}
              className="h-[150px]"
            />
            <div className="p-3 text-center">
              <h3 className="font-display text-base font-bold text-[#0B0A63]">
                {property.title}
              </h3>
              <p className="text-base font-bold text-[#E06D22] tabular-nums">
                {formatBRL(property.price)}
              </p>
              <p className="text-xs text-zinc-600">
                {property.neighborhood} · {property.city}
              </p>
            </div>
          </div>

          {submittedUrl ? (
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-zinc-900">
                  Agendamento preparado para envio
                </p>
                <p className="text-xs text-zinc-600">
                  Dia {formatDateBR(date)} às {time} · Visita somente acompanhada pelo corretor.
                </p>
              </div>
              <a
                href={submittedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-[38px] px-4 rounded-lg bg-[#E06D22] hover:bg-[#C85A14] text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Abrir WhatsApp de Déver Resende</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setSubmittedUrl(null)}
                className="text-xs font-medium text-[#0B0A63] hover:underline cursor-pointer"
              >
                Alterar data ou horário
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Date input with showPicker */}
              <div>
                <label
                  htmlFor="schedule-date"
                  className="block text-xs font-semibold text-[#0B0A63] mb-1"
                >
                  Data da visita
                </label>
                <div className="relative">
                  <input
                    ref={dateInputRef}
                    id="schedule-date"
                    type="date"
                    min={todayISO}
                    value={date}
                    onClick={handleOpenPicker}
                    onFocus={handleOpenPicker}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 bg-[#F6F9FE] text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-[#E06D22] cursor-pointer tabular-nums"
                  />
                </div>
              </div>

              {/* Time slot chips */}
              <div>
                <span className="block text-xs font-semibold text-[#0B0A63] mb-1.5">
                  Horário disponível
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const selected = time === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`h-[38px] rounded-lg border text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
                          selected
                            ? 'bg-[#E06D22] text-white border-[#E06D22]'
                            : 'bg-[#F6F9FE] text-[#0B0A63] border-[#0B0A63]/15 hover:bg-[#E8EFFB]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Client Name */}
              <div>
                <label
                  htmlFor="schedule-name"
                  className="block text-xs font-semibold text-[#0B0A63] mb-1"
                >
                  Seu nome
                </label>
                <input
                  id="schedule-name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Digite seu nome completo"
                  required
                  className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 bg-[#F6F9FE] text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-[#E06D22]"
                />
              </div>

              {/* Client WhatsApp */}
              <div>
                <label
                  htmlFor="schedule-whatsapp"
                  className="block text-xs font-semibold text-[#0B0A63] mb-1"
                >
                  Seu WhatsApp
                </label>
                <input
                  id="schedule-whatsapp"
                  type="tel"
                  value={clientWhatsApp}
                  onChange={(e) => setClientWhatsApp(formatPhoneBR(e.target.value))}
                  placeholder="(61) 99999-9999"
                  required
                  className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 bg-[#F6F9FE] text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-[#E06D22] tabular-nums"
                />
              </div>

              <p className="text-[11px] text-zinc-500 text-center">
                Visita somente acompanhada pelo corretor · CRECI-DF 30584
              </p>

              {errorMsg && (
                <p className="text-xs font-semibold text-red-600 text-center" role="alert">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full h-[38px] rounded-lg bg-[#E06D22] hover:bg-[#C85A14] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirmar agendamento no WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
