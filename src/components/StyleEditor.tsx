import React from 'react';
import { QRConfig, DotPattern, CornerPattern, CornerDotPattern } from '../types/qr';
import { COLOR_PRESETS, ColorPreset } from '../data/presets';
import { Palette, Eye, RotateCw, Sparkles } from 'lucide-react';

interface StyleEditorProps {
  config: QRConfig;
  onChange: (updates: Partial<QRConfig>) => void;
}

export const StyleEditor: React.FC<StyleEditorProps> = ({ config, onChange }) => {
  const dotPatterns: { id: DotPattern; label: string; desc: string }[] = [
    { id: 'rounded', label: 'Rounded', desc: 'Membulat lembut' },
    { id: 'dots', label: 'Dots', desc: 'Titik bulat modern' },
    { id: 'classy', label: 'Classy', desc: 'Gaya berlian elegan' },
    { id: 'classy-rounded', label: 'Classy Rounded', desc: 'Klasik membulat' },
    { id: 'extra-rounded', label: 'Extra Rounded', desc: 'Sangat halus' },
    { id: 'square', label: 'Square', desc: 'Klasik kotak' },
  ];

  const cornerSquares: { id: CornerPattern; label: string }[] = [
    { id: 'extra-rounded', label: 'Membulat' },
    { id: 'dot', label: 'Lingkaran' },
    { id: 'square', label: 'Kotak' },
  ];

  const cornerDots: { id: CornerDotPattern; label: string }[] = [
    { id: 'dot', label: 'Titik Lingkaran' },
    { id: 'square', label: 'Kotak' },
  ];

  const applyPreset = (preset: ColorPreset) => {
    onChange({
      colorType: preset.colorType,
      dotsColor: preset.dotsColor,
      gradientColor2: preset.gradientColor2 || preset.dotsColor,
      gradientType: preset.gradientType || 'linear',
      gradientRotation: preset.gradientRotation || 45,
      bgColor: preset.bgColor,
      isTransparentBg: false,
      cornerSquareColor: preset.cornerSquareColor || preset.dotsColor,
      cornerDotColor: preset.cornerDotColor || preset.dotsColor,
      customCorners: Boolean(preset.cornerSquareColor && preset.cornerSquareColor !== preset.dotsColor),
      frameColor: preset.frameColor,
      frameTextColor: preset.frameTextColor,
    });
  };

  return (
    <div className="space-y-6">
      {/* 1-Click Color Themes */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Tema Warna Siap Pakai
          </label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {COLOR_PRESETS.map((preset) => {
            const isSelected =
              config.dotsColor.toLowerCase() === preset.dotsColor.toLowerCase();
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition cursor-pointer ${
                  isSelected
                    ? 'border-red-600 bg-red-50/70 dark:bg-red-950/30 ring-1 ring-red-600'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div
                  className="w-6 h-6 rounded-lg border border-black/10 shrink-0 shadow-2xs"
                  style={{
                    background:
                      preset.colorType === 'gradient'
                        ? `linear-gradient(135deg, ${preset.dotsColor}, ${preset.gradientColor2})`
                        : preset.dotsColor,
                  }}
                />
                <div className="truncate">
                  <div className="text-xs font-medium text-slate-900 dark:text-white truncate">
                    {preset.name}
                  </div>
                  <div className="text-[10px] text-slate-500">{preset.category}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Color Settings Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-5">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <Palette className="w-4 h-4 text-red-600" />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Kustomisasi Warna QR
          </span>
        </div>

        {/* Color Type Tabs (Single vs Gradient) */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
            Tipe Pewarnaan Titik:
          </label>
          <div className="grid grid-cols-2 gap-2 bg-slate-200/60 dark:bg-slate-800/80 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => onChange({ colorType: 'single' })}
              className={`py-2 text-xs font-medium rounded-lg transition cursor-pointer ${
                config.colorType === 'single'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Warna Tunggal (Solid)
            </button>
            <button
              type="button"
              onClick={() => onChange({ colorType: 'gradient' })}
              className={`py-2 text-xs font-medium rounded-lg transition cursor-pointer ${
                config.colorType === 'gradient'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Gradasi Modern
            </button>
          </div>
        </div>

        {/* Color Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Main Color 1 */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {config.colorType === 'gradient' ? 'Warna Gradasi 1:' : 'Warna Utama QR:'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.dotsColor}
                onChange={(e) => onChange({ dotsColor: e.target.value })}
                className="w-10 h-10 rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5 bg-white dark:bg-slate-900"
              />
              <input
                type="text"
                value={config.dotsColor}
                onChange={(e) => onChange({ dotsColor: e.target.value })}
                className="flex-1 px-3 py-2 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Color 2 for gradient */}
          {config.colorType === 'gradient' ? (
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Warna Gradasi 2:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.gradientColor2}
                  onChange={(e) => onChange({ gradientColor2: e.target.value })}
                  className="w-10 h-10 rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5 bg-white dark:bg-slate-900"
                />
                <input
                  type="text"
                  value={config.gradientColor2}
                  onChange={(e) => onChange({ gradientColor2: e.target.value })}
                  className="flex-1 px-3 py-2 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Warna Latar Belakang:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.bgColor}
                  disabled={config.isTransparentBg}
                  onChange={(e) => onChange({ bgColor: e.target.value })}
                  className="w-10 h-10 rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5 bg-white dark:bg-slate-900 disabled:opacity-40"
                />
                <input
                  type="text"
                  value={config.bgColor}
                  disabled={config.isTransparentBg}
                  onChange={(e) => onChange({ bgColor: e.target.value })}
                  className="flex-1 px-3 py-2 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 disabled:opacity-40"
                />
              </div>
            </div>
          )}
        </div>

        {/* Gradient Settings (If Gradient active) */}
        {config.colorType === 'gradient' && (
          <div className="space-y-3 pt-1 border-t border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Tipe Gradasi:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onChange({ gradientType: 'linear' })}
                    className={`py-1.5 px-3 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      config.gradientType === 'linear'
                        ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    Linear (Garis)
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ gradientType: 'radial' })}
                    className={`py-1.5 px-3 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      config.gradientType === 'radial'
                        ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    Radial (Pusat)
                  </button>
                </div>
              </div>

              {config.gradientType === 'linear' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <RotateCw className="w-3 h-3" /> Sudut Gradasi:
                    </label>
                    <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                      {config.gradientRotation}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="5"
                    value={config.gradientRotation}
                    onChange={(e) =>
                      onChange({ gradientRotation: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-red-600 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Background picker when in gradient mode */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Warna Latar Belakang:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.bgColor}
                  disabled={config.isTransparentBg}
                  onChange={(e) => onChange({ bgColor: e.target.value })}
                  className="w-10 h-10 rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5 bg-white dark:bg-slate-900 disabled:opacity-40"
                />
                <input
                  type="text"
                  value={config.bgColor}
                  disabled={config.isTransparentBg}
                  onChange={(e) => onChange({ bgColor: e.target.value })}
                  className="w-32 px-3 py-2 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 disabled:opacity-40"
                />
              </div>
            </div>
          </div>
        )}

        {/* Transparent Background Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-medium text-slate-800 dark:text-slate-200">
              Latar Belakang Transparan (PNG)
            </div>
            <p className="text-[11px] text-slate-500">
              Bagus untuk ditempelkan di atas banner, kartu nama, atau flyer berwarna
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange({ isTransparentBg: !config.isTransparentBg })}
            className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ${
              config.isTransparentBg ? 'bg-red-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
            }`}
          >
            <div className="w-4 h-4 bg-white rounded-full shadow-md" />
          </button>
        </div>
      </div>

      {/* Pattern Shapes */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
          Gaya Bentuk Titik QR (Pattern)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {dotPatterns.map((pat) => {
            const isSelected = config.dotPattern === pat.id;
            return (
              <button
                key={pat.id}
                type="button"
                onClick={() => onChange({ dotPattern: pat.id })}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  isSelected
                    ? 'border-red-600 bg-red-50/80 dark:bg-red-950/30 ring-1 ring-red-600'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-semibold text-slate-900 dark:text-white">
                  {pat.label}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">{pat.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Eyes & Corners Customization */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <Eye className="w-4 h-4 text-red-600" />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Bentuk & Warna Sudut Mata QR (Corners)
          </span>
        </div>

        {/* Corner Shape */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Bentuk Bingkai Sudut:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {cornerSquares.map((sq) => (
                <button
                  key={sq.id}
                  type="button"
                  onClick={() => onChange({ cornerSquarePattern: sq.id })}
                  className={`py-2 px-1 text-[11px] font-medium rounded-lg border text-center transition cursor-pointer ${
                    config.cornerSquarePattern === sq.id
                      ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 font-semibold'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  {sq.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Bentuk Titik Tengah Sudut:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {cornerDots.map((cd) => (
                <button
                  key={cd.id}
                  type="button"
                  onClick={() => onChange({ cornerDotPattern: cd.id })}
                  className={`py-2 px-1 text-[11px] font-medium rounded-lg border text-center transition cursor-pointer ${
                    config.cornerDotPattern === cd.id
                      ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 font-semibold'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  {cd.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Eye Colors Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-medium text-slate-800 dark:text-slate-200">
              Kustomisasi Warna Sudut Khusus
            </div>
            <p className="text-[11px] text-slate-500">
              Beri warna berbeda pada 3 kotak sudut untuk tampilan branding khas
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange({ customCorners: !config.customCorners })}
            className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ${
              config.customCorners ? 'bg-red-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
            }`}
          >
            <div className="w-4 h-4 bg-white rounded-full shadow-md" />
          </button>
        </div>

        {/* Eye Color Pickers (if enabled) */}
        {config.customCorners && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Warna Bingkai Sudut:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.cornerSquareColor}
                  onChange={(e) => onChange({ cornerSquareColor: e.target.value })}
                  className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={config.cornerSquareColor}
                  onChange={(e) => onChange({ cornerSquareColor: e.target.value })}
                  className="flex-1 px-3 py-1.5 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Warna Titik Tengah Sudut:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.cornerDotColor}
                  onChange={(e) => onChange({ cornerDotColor: e.target.value })}
                  className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={config.cornerDotColor}
                  onChange={(e) => onChange({ cornerDotColor: e.target.value })}
                  className="flex-1 px-3 py-1.5 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
