import { QRConfig } from '../types/qr';

export function getQRDataString(config: QRConfig): string {
  switch (config.contentType) {
    case 'url': {
      let val = (config.contentValue || '').trim();
      if (!val) return 'https://example.com';
      if (!/^https?:\/\//i.test(val)) {
        val = 'https://' + val;
      }
      return val;
    }
    case 'text':
      return config.contentValue || 'Teks kosong';
    
    case 'wifi': {
      const { ssid, password, encryption, hidden } = config.wifiData;
      const safeSsid = (ssid || 'WiFi').replace(/([\\;,:"])/g, '\\$1');
      const safePass = (password || '').replace(/([\\;,:"])/g, '\\$1');
      const enc = encryption === 'nopass' ? 'nopass' : encryption;
      return `WIFI:T:${enc};S:${safeSsid};P:${safePass};H:${hidden ? 'true' : 'false'};;`;
    }

    case 'vcard': {
      const { firstName, lastName, company, jobTitle, phone, email, website, address } = config.vcardData;
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName || ''};${firstName || ''};;;`,
        `FN:${(firstName + ' ' + lastName).trim() || 'Nama Kontak'}`,
        company ? `ORG:${company}` : '',
        jobTitle ? `TITLE:${jobTitle}` : '',
        phone ? `TEL;TYPE=CELL:${phone}` : '',
        email ? `EMAIL:${email}` : '',
        website ? `URL:${website}` : '',
        address ? `ADR;TYPE=WORK:;;${address};;;;` : '',
        'END:VCARD'
      ].filter(Boolean).join('\n');
    }

    case 'whatsapp': {
      const cleanPhone = (config.whatsappData.phone || '').replace(/[^0-9]/g, '');
      const msg = encodeURIComponent(config.whatsappData.message || '');
      return `https://wa.me/${cleanPhone}?text=${msg}`;
    }

    case 'email': {
      const to = encodeURIComponent(config.emailData.to || '');
      const sub = encodeURIComponent(config.emailData.subject || '');
      const body = encodeURIComponent(config.emailData.body || '');
      return `mailto:${to}?subject=${sub}&body=${body}`;
    }

    case 'social': {
      const { platform, username } = config.socialData;
      const cleanUser = (username || '').replace(/^@/, '').trim();
      switch (platform) {
        case 'instagram':
          return `https://instagram.com/${cleanUser}`;
        case 'linkedin':
          return `https://linkedin.com/in/${cleanUser}`;
        case 'youtube':
          return `https://youtube.com/@${cleanUser}`;
        case 'tiktok':
          return `https://tiktok.com/@${cleanUser}`;
        case 'twitter':
          return `https://x.com/${cleanUser}`;
        case 'facebook':
          return `https://facebook.com/${cleanUser}`;
        default:
          return `https://${platform}.com/${cleanUser}`;
      }
    }

    default:
      return config.contentValue || 'https://example.com';
  }
}

// Calculate luminance and contrast ratio between dotsColor and bgColor
export function getContrastRatio(hex1: string, hex2: string): number {
  const getLuminance = (hex: string) => {
    let clean = hex.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    const r = parseInt(clean.substring(0, 2) || '00', 16) / 255;
    const g = parseInt(clean.substring(2, 4) || '00', 16) / 255;
    const b = parseInt(clean.substring(4, 6) || '00', 16) / 255;

    const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  };

  try {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  } catch {
    return 10;
  }
}
