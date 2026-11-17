import React, { useEffect, useState } from 'react';
import { Download, KeyRound, Lock, Plus, RotateCcw, Save, Trash2, X } from 'lucide-react';
import { DEFAULT_FALLBACK_PHOTO, formatBRL } from '../data/properties';
import type { Property, PropertyTier, PropertyType } from '../types';
import { buildStandaloneHtml } from '../utils/exportStandaloneHtml';
import { PropertyImage } from './PropertyImage';

interface AdminModalProps {
  isOpen: boolean;
  properties: Property[];
  adminPassword: string;
  onClose: () => void;
  onSaveProperty: (property: Property) => void;
  onDeleteProperty: (id: string) => void;
  onResetProperties: () => void;
  onChangePassword: (newPassword: string) => void;
}

const EMPTY_FORM: Property = {
  id: '',
  title: '',
  tier: 'Médio',
  type: 'Casa',
  neighborhood: '',
  city: 'Brasília/DF',
  price: 500000,
  bedrooms: 3,
  bathrooms: 2,
  parking: 2,
  areaPrivativa: 100,
  areaTotal: 150,
  description: '',
  photos: ['', '', '', '', '', '', '', ''],
  isNew: true,
};

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  properties,
  adminPassword,
  onClose,
  onSaveProperty,
  onDeleteProperty,
  onResetProperties,
  onChangePassword,
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [newPass, setNewPass] = useState('');
  const [passSavedMsg, setPassSavedMsg] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setPasswordInput('');
      setAuthError('');
      setEditingProperty(null);
      setPassSavedMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Senha incorreta. Tente novamente.');
    }
  };

  const handleStartNew = () => {
    setEditingProperty({
      ...EMPTY_FORM,
      id: String(Date.now()),
      photos: ['', '', '', '', '', '', '', ''],
    });
  };

  const handleStartEdit = (prop: Property) => {
    const paddedPhotos = [...prop.photos];
    while (paddedPhotos.length < 8) paddedPhotos.push('');
    setEditingProperty({
      ...prop,
      photos: paddedPhotos.slice(0, 8),
    });
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;

    const cleanPhotos = editingProperty.photos
      .map((u) => u.trim())
      .filter((u) => u.length > 0)
      .slice(0, 8);

    if (cleanPhotos.length === 0) {
      cleanPhotos.push(DEFAULT_FALLBACK_PHOTO);
    }

    onSaveProperty({
      ...editingProperty,
      photos: cleanPhotos,
    });
    setEditingProperty(null);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.trim().length < 3) return;
    onChangePassword(newPass.trim());
    setNewPass('');
    setPassSavedMsg('Senha alterada com sucesso.');
    setTimeout(() => setPassSavedMsg(''), 3000);
  };

  const handleDownloadStandalone = () => {
    const html = buildStandaloneHtml(properties, adminPassword);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dever-resende-imoveis.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#07063D]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#0B0A63]/20 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header in royal navy */}
        <div className="px-4 py-3 bg-[#0B0A63] text-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#E88B44]" />
            <h2 id="admin-modal-title" className="font-display text-lg font-bold text-white">
              Painel Administrativo — Déver Resende
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar painel admin"
            className="w-9 h-9 rounded-lg border border-white/20 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 sm:p-5">
          {!authenticated ? (
            <form onSubmit={handleLogin} className="max-w-xs mx-auto py-6 text-center space-y-3">
              <KeyRound className="w-8 h-8 text-[#E06D22] mx-auto" />
              <h3 className="text-base font-bold text-[#0B0A63]">Acesso Restrito</h3>
              <p className="text-xs text-zinc-500">
                Informe a senha do corretor para gerenciar imóveis, fotos e áreas.
              </p>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Digite a senha"
                autoFocus
                className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/20 bg-[#F6F9FE] text-sm text-center text-zinc-900 focus:outline-none focus:bg-white focus:border-[#E06D22]"
              />
              {authError && <p className="text-xs font-semibold text-red-600">{authError}</p>}
              <button
                type="submit"
                className="w-full h-[38px] rounded-lg bg-[#E06D22] hover:bg-[#C85A14] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Entrar no painel
              </button>
            </form>
          ) : editingProperty ? (
            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                <h3 className="text-base font-bold text-[#0B0A63]">
                  {properties.some((p) => String(p.id) === String(editingProperty.id))
                    ? `Editar: ${editingProperty.title}`
                    : 'Cadastrar Novo Imóvel'}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="text-xs font-semibold text-[#0B0A63] hover:underline cursor-pointer"
                >
                  Voltar à lista
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0B0A63] mb-1">Título</label>
                  <input
                    type="text"
                    required
                    value={editingProperty.title}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, title: e.target.value })
                    }
                    className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 text-sm focus:border-[#E06D22] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B0A63] mb-1">Padrão</label>
                  <select
                    value={editingProperty.tier}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        tier: e.target.value as PropertyTier,
                      })
                    }
                    className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 text-sm focus:border-[#E06D22] focus:outline-none"
                  >
                    <option value="Alto">Alto</option>
                    <option value="Médio">Médio</option>
                    <option value="Baixo">Baixo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B0A63] mb-1">Tipo</label>
                  <select
                    value={editingProperty.type}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        type: e.target.value as PropertyType,
                      })
                    }
                    className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 text-sm focus:border-[#E06D22] focus:outline-none"
                  >
                    <option value="Casa">Casa</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Kitnet">Kitnet</option>
                    <option value="Cobertura">Cobertura</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B0A63] mb-1">Bairro</label>
                  <input
                    type="text"
                    required
                    value={editingProperty.neighborhood}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, neighborhood: e.target.value })
                    }
                    className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 text-sm focus:border-[#E06D22] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B0A63] mb-1">Cidade</label>
                  <input
                    type="text"
                    required
                    value={editingProperty.city}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, city: e.target.value })
                    }
                    className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 text-sm focus:border-[#E06D22] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B0A63] mb-1">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={editingProperty.price}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        price: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 text-sm tabular-nums focus:border-[#E06D22] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B0A63] mb-1">Quartos</label>
                  <input
                    type="number"
                    min={0}
                    value={editingProperty.bedrooms}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        bedrooms: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 text-sm tabular-nums focus:border-[#E06D22] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B0A63] mb-1">
                    Banheiros
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={editingProperty.bathrooms}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        bathrooms: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 text-sm tabular-nums focus:border-[#E06D22] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B0A63] mb-1">Vagas</label>
                  <input
                    type="number"
                    min={0}
                    value={editingProperty.parking}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        parking: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 text-sm tabular-nums focus:border-[#E06D22] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B0A63] mb-1">
                    Área Privativa (m²)
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={editingProperty.areaPrivativa}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        areaPrivativa: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 text-sm tabular-nums focus:border-[#E06D22] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B0A63] mb-1">
                    Área Total (m²)
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={editingProperty.areaTotal}
                    onChange={(e) =>
                      setEditingProperty({
                        ...editingProperty,
                        areaTotal: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full h-[38px] px-3 rounded-lg border border-[#0B0A63]/15 text-sm tabular-nums focus:border-[#E06D22] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B0A63] mb-1">Descrição</label>
                <textarea
                  rows={2}
                  value={editingProperty.description}
                  onChange={(e) =>
                    setEditingProperty({ ...editingProperty, description: e.target.value })
                  }
                  className="w-full p-2.5 rounded-lg border border-[#0B0A63]/15 text-sm focus:border-[#E06D22] focus:outline-none"
                />
              </div>

              <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B0A63] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={Boolean(editingProperty.isNew)}
                  onChange={(e) =>
                    setEditingProperty({ ...editingProperty, isNew: e.target.checked })
                  }
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
                <span>Destacar card com etiqueta &ldquo;Novo&rdquo;</span>
              </label>

              {/* Up to 8 photos */}
              <div>
                <p className="text-xs font-semibold text-[#0B0A63] mb-2">
                  Fotos do Imóvel (até 8 URLs públicas)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {editingProperty.photos.slice(0, 8).map((photoUrl, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-12 h-9 rounded overflow-hidden shrink-0 border border-[#0B0A63]/15 bg-zinc-100">
                        {photoUrl ? (
                          <PropertyImage src={photoUrl} alt={`Foto ${idx + 1}`} className="h-9" />
                        ) : null}
                      </div>
                      <input
                        type="text"
                        value={photoUrl}
                        placeholder={`URL da foto ${idx + 1}`}
                        onChange={(e) => {
                          const next = [...editingProperty.photos];
                          next[idx] = e.target.value;
                          setEditingProperty({ ...editingProperty, photos: next });
                        }}
                        className="w-full h-[36px] px-2.5 rounded-lg border border-[#0B0A63]/15 text-xs focus:border-[#E06D22] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-blue-100">
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="h-[38px] px-4 rounded-lg border border-[#0B0A63]/20 text-xs font-semibold text-[#0B0A63] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-[38px] px-5 rounded-lg bg-[#E06D22] hover:bg-[#C85A14] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar imóvel</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              {/* Top Admin Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-blue-100">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleStartNew}
                    className="h-[38px] px-4 rounded-lg bg-[#E06D22] hover:bg-[#C85A14] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Novo imóvel</span>
                  </button>
                  <button
                    type="button"
                    onClick={onResetProperties}
                    className="h-[38px] px-3.5 rounded-lg border border-[#0B0A63]/20 hover:bg-[#EEF3FA] text-[#0B0A63] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restaurar 18 originais</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadStandalone}
                    className="h-[38px] px-3.5 rounded-lg border border-[#0B0A63]/20 hover:bg-[#EEF3FA] text-[#0B0A63] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar HTML Único</span>
                  </button>
                </div>

                {/* Change password inline */}
                <form onSubmit={handleUpdatePassword} className="flex items-center gap-1.5">
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Nova senha"
                    className="h-[36px] w-28 px-2.5 rounded-lg border border-[#0B0A63]/20 text-xs focus:border-[#E06D22] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="h-[36px] px-3 rounded-lg bg-[#0B0A63] hover:bg-[#141382] text-white text-xs font-semibold cursor-pointer"
                  >
                    Trocar senha
                  </button>
                </form>
              </div>

              {passSavedMsg && (
                <p className="text-xs font-semibold text-emerald-700 text-center">
                  {passSavedMsg}
                </p>
              )}

              {/* Properties list */}
              <div className="divide-y divide-blue-50 border border-[#0B0A63]/15 rounded-lg overflow-hidden">
                {properties.map((prop) => (
                  <div
                    key={prop.id}
                    className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-[#F6F9FE]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-16 h-12 rounded overflow-hidden shrink-0 bg-zinc-200">
                        <PropertyImage
                          src={prop.photos[0] || DEFAULT_FALLBACK_PHOTO}
                          alt={prop.title}
                          className="h-12"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#0B0A63] truncate">{prop.title}</p>
                        <p className="text-xs text-zinc-500 truncate tabular-nums">
                          {prop.tier} · {prop.neighborhood} · {formatBRL(prop.price)} ·{' '}
                          {prop.areaPrivativa}m²/{prop.areaTotal}m² · {prop.photos.length} fotos
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(prop)}
                        className="h-[34px] px-3 rounded-lg border border-[#0B0A63]/20 bg-white hover:bg-[#0B0A63] text-xs font-semibold text-[#0B0A63] hover:text-white transition-colors cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteProperty(prop.id)}
                        aria-label={`Excluir ${prop.title}`}
                        className="h-[34px] px-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold inline-flex items-center cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
