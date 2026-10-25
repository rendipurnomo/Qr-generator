import { QRConfig } from '../types/qr';

export async function renderFramedQR(
  qrCanvas: HTMLCanvasElement,
  config: QRConfig,
  finalSize: number = 1024
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  if (config.frameStyle === 'none') {
    canvas.width = finalSize;
    canvas.height = finalSize;
    ctx.clearRect(0, 0, finalSize, finalSize);
    if (!config.isTransparentBg) {
      ctx.fillStyle = config.bgColor || '#ffffff';
      ctx.fillRect(0, 0, finalSize, finalSize);
    }
    ctx.drawImage(qrCanvas, 0, 0, finalSize, finalSize);
    return canvas;
  }

  // Frame styles with banners / cards
  const padding = Math.round(finalSize * 0.08);
  const text = config.frameText || 'PINDAI SAYA';
  const qrAreaSize = finalSize - padding * 2;

  let totalWidth = finalSize;
  let totalHeight = finalSize;

  if (config.frameStyle === 'bottom-bar' || config.frameStyle === 'badge') {
    totalHeight = finalSize + Math.round(finalSize * 0.16);
  } else if (config.frameStyle === 'top-bar') {
    totalHeight = finalSize + Math.round(finalSize * 0.16);
  } else if (config.frameStyle === 'card') {
    totalHeight = finalSize + Math.round(finalSize * 0.22);
  }

  canvas.width = totalWidth;
  canvas.height = totalHeight;

  // Background of overall frame
  ctx.fillStyle = config.isTransparentBg ? 'rgba(255,255,255,0)' : (config.bgColor || '#ffffff');
  if (!config.isTransparentBg) {
    ctx.fillRect(0, 0, totalWidth, totalHeight);
  }

  if (config.frameStyle === 'bottom-bar') {
    // Outer border container
    const radius = Math.round(finalSize * 0.05);
    const framePad = Math.round(finalSize * 0.04);
    const boxW = totalWidth - framePad * 2;
    const boxH = totalHeight - framePad * 2;

    // Draw border
    ctx.strokeStyle = config.frameColor || '#d60000';
    ctx.lineWidth = Math.round(finalSize * 0.015);
    ctx.beginPath();
    ctx.roundRect(framePad, framePad, boxW, boxH, radius);
    ctx.stroke();

    // Draw QR in top section
    const qrDrawSize = boxW - Math.round(finalSize * 0.06);
    const qrX = (totalWidth - qrDrawSize) / 2;
    const qrY = framePad + Math.round(finalSize * 0.03);
    ctx.drawImage(qrCanvas, qrX, qrY, qrDrawSize, qrDrawSize);

    // Bottom solid bar
    const barHeight = Math.round(finalSize * 0.14);
    const barY = totalHeight - framePad - barHeight;
    ctx.fillStyle = config.frameColor || '#d60000';
    
    ctx.beginPath();
    ctx.roundRect(framePad, barY, boxW, barHeight, [0, 0, radius, radius]);
    ctx.fill();

    // Text in bottom bar
    ctx.fillStyle = config.frameTextColor || '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(barHeight * 0.42)}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
    ctx.fillText(text.toUpperCase(), totalWidth / 2, barY + barHeight / 2);
  } else if (config.frameStyle === 'top-bar') {
    const radius = Math.round(finalSize * 0.05);
    const framePad = Math.round(finalSize * 0.04);
    const boxW = totalWidth - framePad * 2;
    const boxH = totalHeight - framePad * 2;

    ctx.strokeStyle = config.frameColor || '#d60000';
    ctx.lineWidth = Math.round(finalSize * 0.015);
    ctx.beginPath();
    ctx.roundRect(framePad, framePad, boxW, boxH, radius);
    ctx.stroke();

    // Top solid bar
    const barHeight = Math.round(finalSize * 0.14);
    ctx.fillStyle = config.frameColor || '#d60000';
    ctx.beginPath();
    ctx.roundRect(framePad, framePad, boxW, barHeight, [radius, radius, 0, 0]);
    ctx.fill();

    // Top text
    ctx.fillStyle = config.frameTextColor || '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(barHeight * 0.42)}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
    ctx.fillText(text.toUpperCase(), totalWidth / 2, framePad + barHeight / 2);

    // QR below bar
    const qrDrawSize = boxW - Math.round(finalSize * 0.06);
    const qrX = (totalWidth - qrDrawSize) / 2;
    const qrY = framePad + barHeight + Math.round(finalSize * 0.03);
    ctx.drawImage(qrCanvas, qrX, qrY, qrDrawSize, qrDrawSize);
  } else if (config.frameStyle === 'badge') {
    // QR code with floating rounded pill badge below
    const qrDrawSize = totalWidth - padding * 2;
    const qrX = padding;
    const qrY = padding / 2;
    ctx.drawImage(qrCanvas, qrX, qrY, qrDrawSize, qrDrawSize);

    const badgeW = Math.min(totalWidth * 0.72, Math.max(text.length * 28 + 60, totalWidth * 0.45));
    const badgeH = Math.round(finalSize * 0.11);
    const badgeX = (totalWidth - badgeW) / 2;
    const badgeY = qrY + qrDrawSize + Math.round(finalSize * 0.02);

    ctx.fillStyle = config.frameColor || '#d60000';
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, badgeH / 2);
    ctx.fill();

    ctx.fillStyle = config.frameTextColor || '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(badgeH * 0.44)}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
    ctx.fillText(text.toUpperCase(), totalWidth / 2, badgeY + badgeH / 2);
  } else if (config.frameStyle === 'card') {
    // Card with header, QR in center, footer info
    const framePad = Math.round(finalSize * 0.03);
    const boxW = totalWidth - framePad * 2;
    const boxH = totalHeight - framePad * 2;
    const radius = Math.round(finalSize * 0.04);

    // Card shadow & background
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(framePad, framePad, boxW, boxH, radius);
    ctx.fill();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = Math.round(finalSize * 0.005);
    ctx.stroke();

    // Top Header text
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(finalSize * 0.045)}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
    ctx.fillText('PINDAI KODE QR', totalWidth / 2, framePad + Math.round(finalSize * 0.07));

    // QR in center
    const qrDrawSize = boxW - Math.round(finalSize * 0.12);
    const qrX = (totalWidth - qrDrawSize) / 2;
    const qrY = framePad + Math.round(finalSize * 0.12);
    ctx.drawImage(qrCanvas, qrX, qrY, qrDrawSize, qrDrawSize);

    // Bottom badge
    const badgeW = boxW - Math.round(finalSize * 0.12);
    const badgeH = Math.round(finalSize * 0.09);
    const badgeX = (totalWidth - badgeW) / 2;
    const badgeY = qrY + qrDrawSize + Math.round(finalSize * 0.03);

    ctx.fillStyle = config.frameColor || '#d60000';
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, Math.round(badgeH * 0.25));
    ctx.fill();

    ctx.fillStyle = config.frameTextColor || '#ffffff';
    ctx.font = `bold ${Math.round(badgeH * 0.45)}px 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`;
    ctx.fillText(text.toUpperCase(), totalWidth / 2, badgeY + badgeH / 2);
  }

  return canvas;
}
