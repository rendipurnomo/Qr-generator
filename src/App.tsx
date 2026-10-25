import React, { useState, useEffect } from 'react';
import { QRConfig, DEFAULT_CONFIG } from './types/qr';
import { QRPreview } from './components/QRPreview';
import { ContentEditor } from './components/ContentEditor';
import { LogoEditor } from './components/LogoEditor';
import { StyleEditor } from './components/StyleEditor';
import { FrameEditor } from './components/FrameEditor';
import { SavedDesignsModal } from './components/SavedDesignsModal';
import {
  QrCode,
  Globe,
  Image as ImageIcon,
  Palette,
  LayoutTemplate,
  Sliders,
  RotateCcw,
  Bookmark,
  Sun,
  Moon,
  ShieldCheck,
  Sparkles,
  Info,
} from 'lucide-react';

type ActiveTab = 'content' | 'logo' | 'style' | 'frame' | 'advanced';

export default function App() {
  const [config, setConfig] = useState<QRConfig>(() => {
    try {
      const saved = localStorage.getItem('qr_current_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_CONFIG;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('content');
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist current config in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('qr_current_config', JSON.stringify(config));
    } catch (e) {
      console.error(e);
    }
  }, [config]);

  const updateConfig = (updates: Partial<QRConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const handleReset = () => {
    if (window.confirm('Kembalikan semua pengaturan QR code ke default?')) {
      setConfig(DEFAULT_CONFIG);
    }
  };

  const navTabs: { id: ActiveTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'content', label: 'Konten', icon: Globe },
    {
      id: 'logo',
      label: 'Logo Perusahaan',
      icon: ImageIcon,
      badge: config.logoUrl ? 'Aktif' : undefined,
    },
    { id: 'style', label: 'Warna & Gaya', icon: Palette },
    { id: 'frame', label: 'Bingkai & Label', icon: LayoutTemplate },
    { id: 'advanced', label: 'Tingkat Koreksi', icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white shadow-md shadow-red-500/20">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  QR Studio Pro
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 rounded-full border border-red-200/50">
                  Logo & Warna
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Generator QR Code Kustom & Branding Perusahaan
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSavedModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 text-red-600" />
              <span className="hidden sm:inline">Desain Tersimpan</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Kembalikan ke Default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Ganti Mode Gelap / Terang"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Editor Controls & Tabs */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-5">
            {/* Tab Navigation */}
            <div className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-x-auto no-scrollbar">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isActive
                            ? 'bg-white text-red-600'
                            : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Tab Content Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              {activeTab === 'content' && (
                <ContentEditor config={config} onChange={updateConfig} />
              )}
              {activeTab === 'logo' && (
                <LogoEditor config={config} onChange={updateConfig} />
              )}
              {activeTab === 'style' && (
                <StyleEditor config={config} onChange={updateConfig} />
              )}
              {activeTab === 'frame' && (
                <FrameEditor config={config} onChange={updateConfig} />
              )}
              {activeTab === 'advanced' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Tingkat Koreksi Kesalahan (Error Correction Level)
                    </label>
                    <p className="text-xs text-slate-500 mb-4">
                      Tingkat koreksi menentukan seberapa banyak bagian QR yang dapat rusak atau tertutup logo tanpa kehilangan kemampuan untuk dibaca kamera.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          lvl: 'L',
                          percent: '7%',
                          title: 'Level L (Rendah)',
                          desc: 'Titik QR paling sedikit dan renggang. Cocok jika tidak memakai logo.',
                        },
                        {
                          lvl: 'M',
                          percent: '15%',
                          title: 'Level M (Standar)',
                          desc: 'Pilihan default umum untuk kode QR standar.',
                        },
                        {
                          lvl: 'Q',
                          percent: '25%',
                          title: 'Level Q (Tinggi)',
                          desc: 'Ketahanan bagus, cocok untuk logo kecil.',
                        },
                        {
                          lvl: 'H',
                          percent: '30%',
                          title: 'Level H (Maksimal - Direkomendasikan)',
                          desc: 'Mampu dipindai meski 30% area tertutup logo perusahaan di tengah.',
                        },
                      ].map((item) => (
                        <button
                          key={item.lvl}
                          type="button"
                          onClick={() => updateConfig({ errorCorrectionLevel: item.lvl as any })}
                          className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                            config.errorCorrectionLevel === item.lvl
                              ? 'border-red-600 bg-red-50/70 dark:bg-red-950/30 ring-1 ring-red-600'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {item.title}
                            </span>
                            <span className="text-xs font-mono font-semibold text-red-600 bg-red-100 dark:bg-red-950/60 px-2 py-0.5 rounded-md">
                              {item.percent}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {item.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
                    <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                    <div>
                      <strong>Tips Cetak Profesional:</strong> Untuk spanduk, banner, atau cetak kemasan ukuran besar, gunakan format unduhan <strong>SVG (Vektor)</strong> atau resolusi <strong>2048px (HD Cetak)</strong> agar hasil cetak sangat tajam dan tidak pecah.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Live Preview & Actions */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-4">
            <QRPreview config={config} onUpdateConfig={updateConfig} />

            {/* Quick Helper Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs space-y-2 text-slate-600 dark:text-slate-400">
              <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                Siap Dipindai Semua Perangkat
              </div>
              <p className="text-[11px]">
                Kompatibel dengan kamera iPhone (iOS Camera), Google Lens, Samsung Camera, dan seluruh aplikasi pemindai QR standar tanpa aplikasi khusus tambahan.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Saved Designs Modal */}
      <SavedDesignsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        currentConfig={config}
        onLoadConfig={(loaded) => setConfig(loaded)}
      />
    </div>
  );
}
