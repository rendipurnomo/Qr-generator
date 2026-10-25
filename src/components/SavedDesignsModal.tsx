import React, { useState, useEffect } from 'react';
import { QRConfig } from '../types/qr';
import { Bookmark, Trash2, ArrowUpRight, X, Clock } from 'lucide-react';

interface SavedItem {
  id: string;
  name: string;
  savedAt: string;
  config: QRConfig;
}

interface SavedDesignsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: QRConfig;
  onLoadConfig: (config: QRConfig) => void;
}

export const SavedDesignsModal: React.FC<SavedDesignsModalProps> = ({
  isOpen,
  onClose,
  currentConfig,
  onLoadConfig,
}) => {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    try {
      const data = localStorage.getItem('qr_saved_designs');
      if (data) {
        setItems(JSON.parse(data));
      }
    } catch (e) {
      console.error(e);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveCurrent = () => {
    const name = newName.trim() || `Desain ${new Date().toLocaleDateString('id-ID')}`;
    const newItem: SavedItem = {
      id: Date.now().toString(),
      name,
      savedAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
      config: currentConfig,
    };
    const updated = [newItem, ...items];
    setItems(updated);
    localStorage.setItem('qr_saved_designs', JSON.stringify(updated));
    setNewName('');
  };

  const handleDelete = (id: string) => {
    const updated = items.filter((it) => it.id !== id);
    setItems(updated);
    localStorage.setItem('qr_saved_designs', JSON.stringify(updated));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-red-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Desain QR Tersimpan
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Save Current Design Box */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Beri nama template (misal: Brosur Kantor)"
            className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={handleSaveCurrent}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shrink-0 transition shadow-xs cursor-pointer"
          >
            Simpan Desain Ini
          </button>
        </div>

        {/* List of saved designs */}
        <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
          {items.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              Belum ada desain tersimpan. Klik tombol di atas untuk menyimpan tampilan QR saat ini.
            </div>
          ) : (
            items.map((it) => (
              <div
                key={it.id}
                className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition"
              >
                <div className="min-w-0 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg shrink-0 border border-slate-200 dark:border-slate-700"
                    style={{ backgroundColor: it.config.dotsColor }}
                  />
                  <div className="truncate">
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {it.name}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {it.savedAt} &bull; Tipe: {it.config.contentType}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onLoadConfig(it.config);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300 transition cursor-pointer"
                  >
                    Buka <ArrowUpRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(it.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition cursor-pointer"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
