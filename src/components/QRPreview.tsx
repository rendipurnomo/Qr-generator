import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling, {
  DotType,
  CornerSquareType,
  CornerDotType,
  Options,
} from 'qr-code-styling';
import { QRConfig } from '../types/qr';
import { getQRDataString, getContrastRatio } from '../utils/qrGenerator';
import { processLogoForQR } from '../utils/logoProcessor';
import { renderFramedQR } from '../utils/frameRenderer';
import { Download, Copy, Check, AlertTriangle, ShieldCheck, RefreshCw, ZoomIn, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QRPreviewProps {
  config: QRConfig;
  onUpdateConfig?: (updates: Partial<QRConfig>) => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ config, onUpdateConfig }) => {
  const qrRawContainerRef = useRef<HTMLDivElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg'>('png');
  const [selectedResolution, setSelectedResolution] = useState<number>(1024);
  const [showScanTester, setShowScanTester] = useState(false);

  // Compute contrast score
  const contrastRatio = getContrastRatio(config.dotsColor, config.isTransparentBg ? '#ffffff' : config.bgColor);
  const isContrastGood = contrastRatio >= 4.0;

  // Processed logo URL (with background shape)
  const [processedLogo, setProcessedLogo] = useState<string | null>(config.logoUrl);

  useEffect(() => {
    let isCancelled = false;
    if (config.logoUrl) {
      processLogoForQR(config.logoUrl, config.logoBgShape, config.logoBgColor, config.logoMargin)
        .then((processed) => {
          if (!isCancelled) setProcessedLogo(processed);
        })
        .catch(() => {
          if (!isCancelled) setProcessedLogo(config.logoUrl);
        });
    } else {
      setProcessedLogo(null);
    }
    return () => {
      isCancelled = true;
    };
  }, [config.logoUrl, config.logoBgShape, config.logoBgColor, config.logoMargin]);

  // Initialize or update QRCodeStyling
  useEffect(() => {
    let isCancelled = false;
    setIsGenerating(true);

    const dataString = getQRDataString(config);
    const size = 600; // high internal rendering resolution for crispness

    const qrOptions: Options = {
      width: size,
      height: size,
      type: 'canvas',
      data: dataString,
      image: processedLogo || undefined,
      margin: 16,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: config.errorCorrectionLevel,
      },
      imageOptions: {
        hideBackgroundDots: config.hideBackgroundDots,
        imageSize: config.logoSize,
        margin: config.logoBgShape === 'none' ? config.logoMargin : 4,
        crossOrigin: 'anonymous',
      },
      dotsOptions: {
        type: config.dotPattern as DotType,
        color: config.colorType === 'single' ? config.dotsColor : undefined,
        gradient:
          config.colorType === 'gradient'
            ? {
                type: config.gradientType,
                rotation: (config.gradientRotation * Math.PI) / 180,
                colorStops: [
                  { offset: 0, color: config.dotsColor },
                  { offset: 1, color: config.gradientColor2 },
                ],
              }
            : undefined,
      },
      cornersSquareOptions: {
        type: config.cornerSquarePattern as CornerSquareType,
        color: config.customCorners
          ? config.cornerSquareColor
          : config.colorType === 'single'
          ? config.dotsColor
          : undefined,
        gradient:
          !config.customCorners && config.colorType === 'gradient'
            ? {
                type: config.gradientType,
                rotation: (config.gradientRotation * Math.PI) / 180,
                colorStops: [
                  { offset: 0, color: config.dotsColor },
                  { offset: 1, color: config.gradientColor2 },
                ],
              }
            : undefined,
      },
      cornersDotOptions: {
        type: config.cornerDotPattern as CornerDotType,
        color: config.customCorners
          ? config.cornerDotColor
          : config.colorType === 'single'
          ? config.dotsColor
          : undefined,
      },
      backgroundOptions: {
        color: config.isTransparentBg ? 'transparent' : config.bgColor,
      },
    };

    if (!qrInstanceRef.current) {
      qrInstanceRef.current = new QRCodeStyling(qrOptions);
      if (qrRawContainerRef.current) {
        qrRawContainerRef.current.innerHTML = '';
        qrInstanceRef.current.append(qrRawContainerRef.current);
      }
    } else {
      qrInstanceRef.current.update(qrOptions);
    }

    // Wait brief tick for canvas to render in DOM, then composite onto preview canvas with frame
    const timer = setTimeout(async () => {
      if (isCancelled) return;
      try {
        const rawCanvas = qrRawContainerRef.current?.querySelector('canvas');
        if (rawCanvas && previewCanvasRef.current) {
          const framedCanvas = await renderFramedQR(rawCanvas, config, 600);
          const pCtx = previewCanvasRef.current.getContext('2d');
          if (pCtx) {
            previewCanvasRef.current.width = framedCanvas.width;
            previewCanvasRef.current.height = framedCanvas.height;
            pCtx.clearRect(0, 0, framedCanvas.width, framedCanvas.height);
            pCtx.drawImage(framedCanvas, 0, 0);
          }
        }
      } catch (err) {
        console.error('Frame rendering error:', err);
      } finally {
        setIsGenerating(false);
      }
    }, 120);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [
    config,
    processedLogo,
    config.contentType,
    config.contentValue,
    config.wifiData,
    config.vcardData,
    config.whatsappData,
    config.emailData,
    config.socialData,
    config.dotPattern,
    config.cornerSquarePattern,
    config.cornerDotPattern,
    config.dotsColor,
    config.gradientColor2,
    config.gradientType,
    config.gradientRotation,
    config.bgColor,
    config.isTransparentBg,
    config.customCorners,
    config.cornerSquareColor,
    config.cornerDotColor,
    config.logoSize,
    config.logoMargin,
    config.hideBackgroundDots,
    config.errorCorrectionLevel,
    config.frameStyle,
    config.frameText,
    config.frameColor,
    config.frameTextColor,
  ]);

  // Handle Download
  const handleDownload = async () => {
    try {
      const rawCanvas = qrRawContainerRef.current?.querySelector('canvas');
      if (!rawCanvas) return;

      const finalCanvas = await renderFramedQR(rawCanvas, config, selectedResolution);

      if (downloadFormat === 'png') {
        const link = document.createElement('a');
        link.download = `qrcode-${Date.now()}.png`;
        link.href = finalCanvas.toDataURL('image/png');
        link.click();
      } else if (downloadFormat === 'svg') {
        // SVG export
        if (qrInstanceRef.current && config.frameStyle === 'none') {
          await qrInstanceRef.current.download({
            name: `qrcode-${Date.now()}`,
            extension: 'svg',
          });
        } else {
          // Framed as high-res PNG fallback if vector framed
          const link = document.createElement('a');
          link.download = `qrcode-${Date.now()}.png`;
          link.href = finalCanvas.toDataURL('image/png');
          link.click();
        }
      }

      // Celebrate
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
      });
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  // Handle Copy Image to Clipboard
  const handleCopyToClipboard = async () => {
    try {
      const rawCanvas = qrRawContainerRef.current?.querySelector('canvas');
      if (!rawCanvas) return;

      const finalCanvas = await renderFramedQR(rawCanvas, config, 1024);
      finalCanvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        } catch {
          // Fallback if clipboard item permissions restricted
          const link = document.createElement('a');
          link.download = `qrcode-${Date.now()}.png`;
          link.href = finalCanvas.toDataURL('image/png');
          link.click();
        }
      }, 'image/png');
    } catch (e) {
      console.error(e);
    }
  };

  const qrDataSummary = getQRDataString(config);

  return (
    <div className="flex flex-col items-center">
      {/* Hidden raw container for qr-code-styling library */}
      <div ref={qrRawContainerRef} className="hidden" />

      {/* Main Preview Card */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-800 flex flex-col items-center relative overflow-hidden">
        {/* Glow Accent */}
        <div 
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: config.dotsColor }}
        />

        {/* Top Badges */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Pratinjau Langsung
            </span>
            {config.logoUrl && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border border-red-200/60">
                + Logo Aktif
              </span>
            )}
          </div>

          <button
            onClick={() => setShowScanTester(!showScanTester)}
            className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Lihat isi data & uji keterbacaan"
          >
            <Eye className="w-3.5 h-3.5" />
            {showScanTester ? 'Tutup Info' : 'Cek Isi Scan'}
          </button>
        </div>

        {/* Canvas Display Area */}
        <div className="relative group my-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-center transition-all duration-300">
          <canvas
            ref={previewCanvasRef}
            className="max-w-[280px] sm:max-w-[320px] max-h-[380px] w-auto h-auto object-contain rounded-lg shadow-sm"
          />

          {isGenerating && (
            <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xs flex items-center justify-center rounded-2xl">
              <RefreshCw className="w-8 h-8 text-red-600 animate-spin" />
            </div>
          )}
        </div>

        {/* Data readout popup / drawer */}
        {showScanTester && (
          <div className="w-full mt-3 p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Isi Data Hasil Pindai Kamera:
            </div>
            <pre className="p-2 bg-white dark:bg-slate-900 rounded-lg text-slate-700 dark:text-slate-300 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap break-all max-h-24">
              {qrDataSummary}
            </pre>
            <p className="text-[10px] text-slate-500">
              Error Correction Level: <strong className="text-slate-700 dark:text-slate-200">{config.errorCorrectionLevel} (30% pemulihan data)</strong>. Aman untuk dicetak & ditimpa logo.
            </p>
          </div>
        )}

        {/* Contrast Warning or Success */}
        <div className="w-full mt-3">
          {!isContrastGood ? (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>
                <strong>Peringatan Kontras:</strong> Warna titik dan latar belakang agak mirip. Kamera ponsel mungkin sulit membaca. Gunakan warna titik yang lebih kontras.
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <Check className="w-3.5 h-3.5" /> Kontras Sangat Baik (Mudah Dipindai)
              </span>
              <span>Rasio: {contrastRatio.toFixed(1)}:1</span>
            </div>
          )}
        </div>

        {/* Quick Resolution & Format Selector */}
        <div className="w-full mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Resolusi Cetak:
            </span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
              {[
                { label: '512px', val: 512, sub: 'Web' },
                { label: '1024px', val: 1024, sub: 'HD' },
                { label: '2048px', val: 2048, sub: 'Cetak' },
              ].map((res) => (
                <button
                  key={res.val}
                  onClick={() => setSelectedResolution(res.val)}
                  className={`px-2.5 py-1 rounded-md font-medium transition ${
                    selectedResolution === res.val
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {res.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Format Berkas:
            </span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
              <button
                onClick={() => setDownloadFormat('png')}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  downloadFormat === 'png'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                PNG (Raster HD)
              </button>
              <button
                onClick={() => setDownloadFormat('svg')}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  downloadFormat === 'svg'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                SVG (Vektor)
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleDownload}
              className="col-span-1 flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-md shadow-red-500/20 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Unduh {downloadFormat.toUpperCase()}
            </button>

            <button
              onClick={handleCopyToClipboard}
              className="col-span-1 flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm rounded-xl transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  Tersalin!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  Salin Gambar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
