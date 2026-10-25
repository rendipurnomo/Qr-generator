export interface ColorPreset {
  id: string;
  name: string;
  category: string;
  colorType: 'single' | 'gradient';
  dotsColor: string;
  gradientColor2?: string;
  gradientType?: 'linear' | 'radial';
  gradientRotation?: number;
  bgColor: string;
  cornerSquareColor?: string;
  cornerDotColor?: string;
  frameColor: string;
  frameTextColor: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'corporate-red',
    name: 'Merah Perusahaan (Sesuai Logo)',
    category: 'Bisnis',
    colorType: 'single',
    dotsColor: '#d60000',
    bgColor: '#ffffff',
    cornerSquareColor: '#d60000',
    cornerDotColor: '#b00000',
    frameColor: '#d60000',
    frameTextColor: '#ffffff',
  },
  {
    id: 'navy-executive',
    name: 'Navy Eksekutif',
    category: 'Korporat',
    colorType: 'gradient',
    dotsColor: '#0f172a',
    gradientColor2: '#2563eb',
    gradientType: 'linear',
    gradientRotation: 45,
    bgColor: '#ffffff',
    cornerSquareColor: '#0f172a',
    cornerDotColor: '#2563eb',
    frameColor: '#0f172a',
    frameTextColor: '#ffffff',
  },
  {
    id: 'emerald-luxury',
    name: 'Emerald & Mint',
    category: 'Bisnis',
    colorType: 'gradient',
    dotsColor: '#064e3b',
    gradientColor2: '#059669',
    gradientType: 'linear',
    gradientRotation: 135,
    bgColor: '#ffffff',
    cornerSquareColor: '#064e3b',
    cornerDotColor: '#10b981',
    frameColor: '#064e3b',
    frameTextColor: '#ffffff',
  },
  {
    id: 'royal-purple',
    name: 'Ungu Kreatif',
    category: 'Modern',
    colorType: 'gradient',
    dotsColor: '#4c1d95',
    gradientColor2: '#9333ea',
    gradientType: 'linear',
    gradientRotation: 45,
    bgColor: '#ffffff',
    cornerSquareColor: '#4c1d95',
    cornerDotColor: '#c026d3',
    frameColor: '#581c87',
    frameTextColor: '#ffffff',
  },
  {
    id: 'sunset-amber',
    name: 'Sunset Orange',
    category: 'Vibrant',
    colorType: 'gradient',
    dotsColor: '#c2410c',
    gradientColor2: '#ea580c',
    gradientType: 'linear',
    gradientRotation: 90,
    bgColor: '#ffffff',
    cornerSquareColor: '#c2410c',
    cornerDotColor: '#f97316',
    frameColor: '#ea580c',
    frameTextColor: '#ffffff',
  },
  {
    id: 'cyber-dark',
    name: 'Cyber Dark Mode',
    category: 'Dark',
    colorType: 'gradient',
    dotsColor: '#38bdf8',
    gradientColor2: '#818cf8',
    gradientType: 'linear',
    gradientRotation: 45,
    bgColor: '#090d16',
    cornerSquareColor: '#38bdf8',
    cornerDotColor: '#818cf8',
    frameColor: '#1e293b',
    frameTextColor: '#38bdf8',
  },
  {
    id: 'classic-black',
    name: 'Monokrom Klasik',
    category: 'Klasik',
    colorType: 'single',
    dotsColor: '#000000',
    bgColor: '#ffffff',
    cornerSquareColor: '#000000',
    cornerDotColor: '#000000',
    frameColor: '#000000',
    frameTextColor: '#ffffff',
  },
];

export interface PresetLogo {
  id: string;
  name: string;
  url: string;
  isUserLogo?: boolean;
}

export const PRESET_LOGOS: PresetLogo[] = [
  {
    id: 'user-logo',
    name: 'Logo Anda (Merah)',
    url: '/assets/aistudio/images__1__448e857c.jpeg',
    isUserLogo: true,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%2325D366' d='M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z'/%3E%3C/svg%3E",
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cdefs%3E%3ClinearGradient id='ig' x1='0%25' y1='100%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23fdf497'/%3E%3Cstop offset='5%25' stop-color='%23fdf497'/%3E%3Cstop offset='45%25' stop-color='%23fd5949'/%3E%3Cstop offset='60%25' stop-color='%23d6249f'/%3E%3Cstop offset='90%25' stop-color='%23285AEB'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23ig)' d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z'/%3E%3C/svg%3E",
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%230077b5' d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z'/%3E%3C/svg%3E",
  },
  {
    id: 'wifi',
    name: 'Simbol WiFi',
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 20h.01'/%3E%3Cpath d='M2 8.82a15 15 0 0 1 20 0'/%3E%3Cpath d='M5 12.859a10 10 0 0 1 14 0'/%3E%3Cpath d='M8.5 16.429a5 5 0 0 1 7 0'/%3E%3C/svg%3E",
  },
  {
    id: 'globe',
    name: 'Website / Globe',
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23059669' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='2' y1='12' x2='22' y2='12'/%3E%3Cpath d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'/%3E%3C/svg%3E",
  },
];
