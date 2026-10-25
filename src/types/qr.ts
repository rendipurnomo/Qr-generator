export type ContentType = 
  | 'url' 
  | 'text' 
  | 'wifi' 
  | 'vcard' 
  | 'whatsapp' 
  | 'email' 
  | 'social';

export type DotPattern = 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded';
export type CornerPattern = 'square' | 'dot' | 'extra-rounded';
export type CornerDotPattern = 'square' | 'dot';

export type FrameStyle = 'none' | 'bottom-bar' | 'top-bar' | 'badge' | 'card' | 'speech-bubble';

export interface QRConfig {
  // Content
  contentType: ContentType;
  contentValue: string;
  
  // Specific content details
  wifiData: {
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
    hidden: boolean;
  };
  vcardData: {
    firstName: string;
    lastName: string;
    company: string;
    jobTitle: string;
    phone: string;
    email: string;
    website: string;
    address: string;
  };
  whatsappData: {
    phone: string;
    message: string;
  };
  emailData: {
    to: string;
    subject: string;
    body: string;
  };
  socialData: {
    platform: 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'twitter' | 'facebook';
    username: string;
  };

  // Colors & Style
  colorType: 'single' | 'gradient';
  dotsColor: string;
  gradientColor2: string;
  gradientType: 'linear' | 'radial';
  gradientRotation: number;
  bgColor: string;
  isTransparentBg: boolean;

  // Eye / Corner customization
  customCorners: boolean;
  cornerSquareColor: string;
  cornerDotColor: string;

  // Shapes
  dotPattern: DotPattern;
  cornerSquarePattern: CornerPattern;
  cornerDotPattern: CornerDotPattern;

  // Logo
  logoUrl: string | null;
  logoSize: number; // 0.15 to 0.35
  logoMargin: number; // in pixels
  hideBackgroundDots: boolean;
  logoBgShape: 'circle' | 'square' | 'rounded' | 'none';
  logoBgColor: string;

  // QR Options
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';

  // Frame / CTA
  frameStyle: FrameStyle;
  frameText: string;
  frameColor: string;
  frameTextColor: string;

  // Export
  exportSize: number; // 512, 1024, 2048
}

export const DEFAULT_CONFIG: QRConfig = {
  contentType: 'url',
  contentValue: 'https://example.com',
  wifiData: {
    ssid: 'WiFi-Kantor',
    password: 'password123',
    encryption: 'WPA',
    hidden: false,
  },
  vcardData: {
    firstName: 'Budi',
    lastName: 'Santoso',
    company: 'PT Sukses Mandiri',
    jobTitle: 'Direktur Utama',
    phone: '+6281234567890',
    email: 'budi@suksesmandiri.co.id',
    website: 'https://suksesmandiri.co.id',
    address: 'Jakarta, Indonesia',
  },
  whatsappData: {
    phone: '6281234567890',
    message: 'Halo, saya tertarik dengan layanan perusahaan Anda.',
  },
  emailData: {
    to: 'kontak@perusahaan.com',
    subject: 'Pertanyaan Layanan Bisnis',
    body: 'Halo tim, saya ingin berdiskusi terkait kerja sama.',
  },
  socialData: {
    platform: 'instagram',
    username: 'perusahaan_id',
  },
  colorType: 'single',
  dotsColor: '#d60000', // matches the red uploaded logo!
  gradientColor2: '#990000',
  gradientType: 'linear',
  gradientRotation: 45,
  bgColor: '#ffffff',
  isTransparentBg: false,
  customCorners: false,
  cornerSquareColor: '#d60000',
  cornerDotColor: '#d60000',
  dotPattern: 'rounded',
  cornerSquarePattern: 'extra-rounded',
  cornerDotPattern: 'dot',
  logoUrl: '/assets/aistudio/images__1__448e857c.jpeg', // The user's uploaded logo as pre-loaded!
  logoSize: 0.26,
  logoMargin: 6,
  hideBackgroundDots: true,
  logoBgShape: 'circle',
  logoBgColor: '#ffffff',
  errorCorrectionLevel: 'H',
  frameStyle: 'bottom-bar',
  frameText: 'PINDAI SAYA',
  frameColor: '#d60000',
  frameTextColor: '#ffffff',
  exportSize: 1024,
};
