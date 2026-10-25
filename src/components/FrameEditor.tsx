import React from 'react';
import { QRConfig, FrameStyle } from '../types/qr';
import { LayoutTemplate, Type, Tag } from 'lucide-react';

interface FrameEditorProps {
  config: QRConfig;
  onChange: (updates: Partial<QRConfig>) => void;
}

export const FrameEditor: React.FC<FrameEditorProps> = ({ config, onChange }) => {
  const frameStyles: { id: FrameStyle; label: string; desc: string }[] = [
    { id: 'none', label: 'Tanpa Bingkai', desc: 'Hanya kode QR bersih' },
    { id: 'bottom-bar', label: 'Pita Bawah (Populer)', desc: 'Kotak dengan pita teks di bawah' },
    { id: 'top-bar', label: 'Pita Atas', desc: 'Pita judul di bagian atas' },
    { id: 'badge', label: 'Kapsul Badge', desc: 'Tombol pill melayang di bawah' },
    { id: 'card', label: 'Kartu Bisnis', desc: 'Format kartu vertikal dengan judul & tombol' },
  ];

  const quickTexts = [
    'PINDAI SAYA',
    'SCAN ME',
    'KUNJUNGI WEBSITE',
    'SCAN UNTUK MENU',
    'HUBUNGI KAMI',
    'KONEK WIFI',
    'IKUTI KAMI',
  ];

  return (
    <div className="space-y-6">
      {/* Frame Style Picker */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
          Pilih Bentuk Bingkai / Card
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {frameStyles.map((style) => {
            const isSelected = config.frameStyle === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => onChange({ frameStyle: style.id })}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  isSelected
                    ? 'border-red-600 bg-red-50/80 dark:bg-red-950/30 ring-1 ring-red-600'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-semibold text-slate-900 dark:text-white">
                  {style.label}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">{style.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Frame Details (If frame is active) */}
      {config.frameStyle !== 'none' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <LayoutTemplate className="w-4 h-4 text-red-600" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Pengaturan Teks Ajakan (Call to Action)
            </span>
          </div>

          {/* CTA Text Input */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-slate-500" />
              Teks Ajakan / Label:
            </label>
            <input
              type="text"
              value={config.frameText}
              onChange={(e) => onChange({ frameText: e.target.value })}
              placeholder="PINDAI SAYA"
              maxLength={28}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold tracking-wide uppercase text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Quick suggestions */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1.5 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Rekomendasi Teks Cepat:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {quickTexts.map((txt) => (
                <button
                  key={txt}
                  type="button"
                  onClick={() => onChange({ frameText: txt })}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-red-400 hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
                >
                  {txt}
                </button>
              ))}
            </div>
          </div>

          {/* Frame Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Warna Bingkai & Pita:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.frameColor}
                  onChange={(e) => onChange({ frameColor: e.target.value })}
                  className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5 bg-white dark:bg-slate-900"
                />
                <input
                  type="text"
                  value={config.frameColor}
                  onChange={(e) => onChange({ frameColor: e.target.value })}
                  className="flex-1 px-3 py-1.5 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Warna Tulisan Teks:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.frameTextColor}
                  onChange={(e) => onChange({ frameTextColor: e.target.value })}
                  className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5 bg-white dark:bg-slate-900"
                />
                <input
                  type="text"
                  value={config.frameTextColor}
                  onChange={(e) => onChange({ frameTextColor: e.target.value })}
                  className="flex-1 px-3 py-1.5 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
