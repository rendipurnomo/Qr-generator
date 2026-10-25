import React from 'react';
import { QRConfig, ContentType } from '../types/qr';
import { Globe, FileText, Wifi, Contact, MessageSquare, Mail, Share2, Lock, Eye, Building2, User, Phone, MapPin } from 'lucide-react';

interface ContentEditorProps {
  config: QRConfig;
  onChange: (updates: Partial<QRConfig>) => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({ config, onChange }) => {
  const contentTypes: { id: ContentType; label: string; icon: React.ElementType }[] = [
    { id: 'url', label: 'Tautan / URL', icon: Globe },
    { id: 'vcard', label: 'Kartu Nama (vCard)', icon: Contact },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'social', label: 'Media Sosial', icon: Share2 },
    { id: 'text', label: 'Teks Bebas', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Content Type Selector Pills */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
          Pilih Tipe Konten QR
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {contentTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = config.contentType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => onChange({ contentType: type.id })}
                className={`flex items-center gap-2 p-3 rounded-xl border text-left text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? 'border-red-600 bg-red-50/80 dark:bg-red-950/30 text-red-700 dark:text-red-400 font-semibold shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg ${
                    isSelected
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="truncate">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Form based on ContentType */}
      <div className="bg-slate-50/80 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
        {/* URL Form */}
        {config.contentType === 'url' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Alamat Website / Link URL
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  placeholder="https://perusahaananda.co.id atau link landing page"
                  value={config.contentValue}
                  onChange={(e) => onChange({ contentValue: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Contoh: https://perusahaan.com, brosur online, formulir pendaftaran, atau portofolio.
              </p>
            </div>
          </div>
        )}

        {/* vCard / Business Contact */}
        {config.contentType === 'vcard' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Contact className="w-4 h-4 text-red-600" />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Data Kontak Kartu Nama (Tersimpan otomatis ke HP pemindai)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Nama Depan
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={config.vcardData.firstName}
                    onChange={(e) =>
                      onChange({
                        vcardData: { ...config.vcardData, firstName: e.target.value },
                      })
                    }
                    placeholder="Budi"
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Nama Belakang
                </label>
                <input
                  type="text"
                  value={config.vcardData.lastName}
                  onChange={(e) =>
                    onChange({
                      vcardData: { ...config.vcardData, lastName: e.target.value },
                    })
                  }
                  placeholder="Santoso"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Nama Perusahaan
                </label>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={config.vcardData.company}
                    onChange={(e) =>
                      onChange({
                        vcardData: { ...config.vcardData, company: e.target.value },
                      })
                    }
                    placeholder="PT Sukses Mandiri"
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Jabatan / Posisi
                </label>
                <input
                  type="text"
                  value={config.vcardData.jobTitle}
                  onChange={(e) =>
                    onChange({
                      vcardData: { ...config.vcardData, jobTitle: e.target.value },
                    })
                  }
                  placeholder="Managing Director"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Nomor HP / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    value={config.vcardData.phone}
                    onChange={(e) =>
                      onChange({
                        vcardData: { ...config.vcardData, phone: e.target.value },
                      })
                    }
                    placeholder="+62 812 3456 7890"
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Email Kantor / Bisnis
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={config.vcardData.email}
                    onChange={(e) =>
                      onChange({
                        vcardData: { ...config.vcardData, email: e.target.value },
                      })
                    }
                    placeholder="kontak@perusahaan.com"
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Website
                </label>
                <input
                  type="text"
                  value={config.vcardData.website}
                  onChange={(e) =>
                    onChange({
                      vcardData: { ...config.vcardData, website: e.target.value },
                    })
                  }
                  placeholder="https://perusahaan.com"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Alamat Kantor
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={config.vcardData.address}
                    onChange={(e) =>
                      onChange({
                        vcardData: { ...config.vcardData, address: e.target.value },
                      })
                    }
                    placeholder="SCBD Tower lt. 18, Jakarta"
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Direct Chat */}
        {config.contentType === 'whatsapp' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nomor WhatsApp (Gunakan kode negara, contoh: 6281234567890)
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                <input
                  type="tel"
                  value={config.whatsappData.phone}
                  onChange={(e) =>
                    onChange({
                      whatsappData: { ...config.whatsappData, phone: e.target.value },
                    })
                  }
                  placeholder="6281234567890"
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Pesan Pembuka Otomatis (Opsional)
              </label>
              <textarea
                rows={2}
                value={config.whatsappData.message}
                onChange={(e) =>
                  onChange({
                    whatsappData: { ...config.whatsappData, message: e.target.value },
                  })
                }
                placeholder="Halo admin, saya ingin mengetahui informasi promo / produk..."
                className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        )}

        {/* WiFi Auto-Connect */}
        {config.contentType === 'wifi' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nama Jaringan WiFi (SSID)
              </label>
              <div className="relative">
                <Wifi className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={config.wifiData.ssid}
                  onChange={(e) =>
                    onChange({
                      wifiData: { ...config.wifiData, ssid: e.target.value },
                    })
                  }
                  placeholder="Nama_WiFi_Tamu"
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kata Sandi (Password)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={config.wifiData.password}
                    onChange={(e) =>
                      onChange({
                        wifiData: { ...config.wifiData, password: e.target.value },
                      })
                    }
                    placeholder="Kata sandi WiFi"
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Jenis Enkripsi
                </label>
                <select
                  value={config.wifiData.encryption}
                  onChange={(e) =>
                    onChange({
                      wifiData: {
                        ...config.wifiData,
                        encryption: e.target.value as 'WPA' | 'WEP' | 'nopass',
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                >
                  <option value="WPA">WPA / WPA2 / WPA3 (Umum)</option>
                  <option value="WEP">WEP (Lama)</option>
                  <option value="nopass">Tanpa Sandi (Terbuka)</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="hidden-wifi"
                checked={config.wifiData.hidden}
                onChange={(e) =>
                  onChange({
                    wifiData: { ...config.wifiData, hidden: e.target.checked },
                  })
                }
                className="rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <label htmlFor="hidden-wifi" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                Jaringan Tersembunyi (Hidden SSID)
              </label>
            </div>
          </div>
        )}

        {/* Email Direct */}
        {config.contentType === 'email' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Alamat Email Penerima
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={config.emailData.to}
                  onChange={(e) =>
                    onChange({
                      emailData: { ...config.emailData, to: e.target.value },
                    })
                  }
                  placeholder="tujuan@perusahaan.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Subjek Email
              </label>
              <input
                type="text"
                value={config.emailData.subject}
                onChange={(e) =>
                  onChange({
                    emailData: { ...config.emailData, subject: e.target.value },
                  })
                }
                placeholder="Permintaan Proposal Kerja Sama"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Draf Isi Pesan
              </label>
              <textarea
                rows={2}
                value={config.emailData.body}
                onChange={(e) =>
                  onChange({
                    emailData: { ...config.emailData, body: e.target.value },
                  })
                }
                placeholder="Yth. Tim Perusahaan, ..."
                className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        )}

        {/* Social Media */}
        {config.contentType === 'social' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Platform Media Sosial
                </label>
                <select
                  value={config.socialData.platform}
                  onChange={(e) =>
                    onChange({
                      socialData: {
                        ...config.socialData,
                        platform: e.target.value as any,
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                >
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="twitter">X (Twitter)</option>
                  <option value="facebook">Facebook</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Username / ID Akun
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">@</span>
                  <input
                    type="text"
                    value={config.socialData.username}
                    onChange={(e) =>
                      onChange({
                        socialData: { ...config.socialData, username: e.target.value },
                      })
                    }
                    placeholder="namaperusahaan"
                    className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plain Text */}
        {config.contentType === 'text' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Teks Informasi Bebas
              </label>
              <textarea
                rows={4}
                value={config.contentValue}
                onChange={(e) => onChange({ contentValue: e.target.value })}
                placeholder="Masukkan catatan, nomor serial garansi, kode kupon diskon, alamat kantor..."
                className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
