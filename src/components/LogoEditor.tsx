import React, { useRef } from 'react';
import { QRConfig } from '../types/qr';
import { PRESET_LOGOS } from '../data/presets';
import { Upload, Trash2, CheckCircle2, Image as ImageIcon, Sparkles, ShieldAlert } from 'lucide-react';

interface LogoEditorProps {
  config: QRConfig;
  onChange: (updates: Partial<QRConfig>) => void;
}

export const LogoEditor: React.FC<LogoEditorProps> = ({ config, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange({
            logoUrl: event.target.result as string,
            errorCorrectionLevel: 'H', // auto boost to H for readability
            hideBackgroundDots: true,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    onChange({ logoUrl: null });
  };

  return (
    <div className="space-y-6">
      {/* Upload Box & Active Logo Banner */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Logo Perusahaan
          </label>
          {config.logoUrl && (
            <button
              onClick={handleRemoveLogo}
              type="button"
              className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 flex items-center gap-1 font-medium hover:underline cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Hapus Logo
            </button>
          )}
        </div>

        {/* Upload Dropzone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-500 rounded-2xl p-5 text-center cursor-pointer bg-slate-50/60 dark:bg-slate-900/40 hover:bg-red-50/20 dark:hover:bg-red-950/10 transition group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleFileUpload}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center text-red-600 group-hover:scale-105 transition">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Klik untuk unggah logo perusahaan kustom
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Mendukung file PNG, JPG, WebP, atau SVG (transparan sangat direkomendasikan)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Logos Including User Uploaded Asset */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
          Pilihan Logo Siap Pakai & Logo Anda
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {PRESET_LOGOS.map((preset) => {
            const isSelected = config.logoUrl === preset.url;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() =>
                  onChange({
                    logoUrl: preset.url,
                    errorCorrectionLevel: 'H',
                    hideBackgroundDots: true,
                  })
                }
                className={`relative flex items-center gap-3 p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  isSelected
                    ? 'border-red-600 bg-red-50/80 dark:bg-red-950/30 ring-1 ring-red-600'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-2xs">
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-slate-900 dark:text-white truncate">
                    {preset.name}
                  </div>
                  {preset.isUserLogo && (
                    <span className="text-[10px] text-red-600 dark:text-red-400 font-semibold flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> Logo Anda
                    </span>
                  )}
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-red-600 absolute right-2.5 top-2.5 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Logo Settings (When a logo is active) */}
      {config.logoUrl && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <ImageIcon className="w-4 h-4 text-red-600" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Penyesuaian Bentuk & Tampilan Logo
            </span>
          </div>

          {/* Logo Size Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Ukuran Logo di Tengah:
              </label>
              <span className="text-xs font-mono font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-md">
                {Math.round(config.logoSize * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.15"
              max="0.34"
              step="0.01"
              value={config.logoSize}
              onChange={(e) => onChange({ logoSize: parseFloat(e.target.value) })}
              className="w-full accent-red-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Kecil (15%)</span>
              <span className="text-slate-600 dark:text-slate-300 font-medium">Rekomendasi (24% - 28%)</span>
              <span>Besar (34%)</span>
            </div>
          </div>

          {/* Background Shape */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
              Bentuk Latar Belakang Logo:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'circle', label: 'Lingkaran' },
                { id: 'rounded', label: 'Membulat' },
                { id: 'square', label: 'Persegi' },
                { id: 'none', label: 'Polos' },
              ].map((shape) => (
                <button
                  key={shape.id}
                  type="button"
                  onClick={() => onChange({ logoBgShape: shape.id as any })}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-medium text-center transition cursor-pointer ${
                    config.logoBgShape === shape.id
                      ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 font-semibold'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  {shape.label}
                </button>
              ))}
            </div>
          </div>

          {/* Background Color & Margin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Warna Latar Logo:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.logoBgColor}
                  onChange={(e) => onChange({ logoBgColor: e.target.value })}
                  className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5 bg-white dark:bg-slate-900"
                />
                <input
                  type="text"
                  value={config.logoBgColor}
                  onChange={(e) => onChange({ logoBgColor: e.target.value })}
                  className="flex-1 px-3 py-1.5 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Jarak Titik QR ke Logo:
                </label>
                <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                  {config.logoMargin}px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="16"
                step="1"
                value={config.logoMargin}
                onChange={(e) => onChange({ logoMargin: parseInt(e.target.value, 10) })}
                className="w-full accent-red-600 cursor-pointer mt-1"
              />
            </div>
          </div>

          {/* Hide background dots toggle */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-xs font-medium text-slate-800 dark:text-slate-200">
                Bersihkan Titik di Belakang Logo
              </div>
              <p className="text-[11px] text-slate-500">
                Mencegah pola QR bertumpuk dan merusak logo perusahaan
              </p>
            </div>
            <button
              type="button"
              onClick={() => onChange({ hideBackgroundDots: !config.hideBackgroundDots })}
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ${
                config.hideBackgroundDots ? 'bg-red-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full shadow-md" />
            </button>
          </div>

          {/* Quality Notice */}
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 text-xs border border-blue-200/60 dark:border-blue-900/40">
            <ShieldAlert className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
            <div>
              <strong>Tingkat Koreksi Error H (30%) Aktif:</strong> QR code tetap dapat dipindai dengan cepat oleh kamera ponsel walaupun logo perusahaan berada di tengah.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
