/**
 * Processes a logo image to add background badge shape (circle, rounded square, square, or none)
 * and optional border, returning a high-res Data URL.
 */
export async function processLogoForQR(
  imageSource: string,
  shape: 'circle' | 'square' | 'rounded' | 'none',
  bgColor: string,
  padding: number = 8
): Promise<string> {
  if (shape === 'none') {
    return imageSource;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 400; // high res
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(imageSource);
        return;
      }

      ctx.clearRect(0, 0, size, size);

      // Draw background shape
      ctx.fillStyle = bgColor || '#ffffff';
      
      if (shape === 'circle') {
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (shape === 'rounded') {
        const radius = size * 0.22;
        ctx.beginPath();
        ctx.roundRect(0, 0, size, size, radius);
        ctx.fill();
      } else if (shape === 'square') {
        ctx.fillRect(0, 0, size, size);
      }

      // Draw image inside with padding
      const pad = (padding / 100) * size + 16;
      const innerSize = size - pad * 2;
      
      // Maintain aspect ratio
      const aspect = img.width / img.height;
      let drawW = innerSize;
      let drawH = innerSize;
      if (aspect > 1) {
        drawH = innerSize / aspect;
      } else {
        drawW = innerSize * aspect;
      }
      const drawX = (size - drawW) / 2;
      const drawY = (size - drawH) / 2;

      ctx.save();
      // Clip if circular or rounded so square images don't bleed
      if (shape === 'circle') {
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
        ctx.clip();
      } else if (shape === 'rounded') {
        ctx.beginPath();
        ctx.roundRect(2, 2, size - 4, size - 4, size * 0.20);
        ctx.clip();
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();

      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      resolve(imageSource);
    };
    img.src = imageSource;
  });
}
