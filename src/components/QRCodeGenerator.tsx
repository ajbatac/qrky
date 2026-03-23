/**
 * @file QRCodeGenerator.tsx
 * @description The core rendering engine for QRky. 
 * This component takes a `QRConfig` and performs a multi-layer draw operation:
 * 1. Background layer (Solid, Gradient, or Image)
 * 2. QR Matrix layer (Patterns like square, rounded, dots)
 * 3. Branding layer (Center logo with occlusion protection)
 * 4. Verification layer (jsQR pass to ensure the resulting image is scannable)
 */

import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { QRConfig } from './QRky';

interface QRCodeGeneratorProps {
  config: QRConfig;
  onGenerate: (scannable: boolean) => void;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ config, onGenerate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      const size = config.size;
      canvas.width = size;
      canvas.height = size;
      context.clearRect(0, 0, size, size);

      const drawQRCode = async () => {
        try {
          // 1. Draw Background
          if (config.backgroundType === 'image' && config.backgroundImage) {
            const bgImg = new Image();
            bgImg.src = config.backgroundImage;
            await new Promise((resolve) => {
              bgImg.onload = () => {
                context.drawImage(bgImg, 0, 0, size, size);
                resolve(null);
              };
              bgImg.onerror = () => resolve(null);
            });
          } else if (config.backgroundType === 'gradient') {
            const gradient = context.createLinearGradient(0, 0, size, size);
            gradient.addColorStop(0, config.gradientStart);
            gradient.addColorStop(1, config.gradientEnd);
            context.fillStyle = gradient;
            context.fillRect(0, 0, size, size);
          } else {
            context.fillStyle = config.backgroundColor;
            context.fillRect(0, 0, size, size);
          }

          // 2. Generate QR Data Matrix
          const qr = QRCode.create(config.data, { errorCorrectionLevel: config.errorCorrectionLevel });
          const modules = qr.modules;
          const matrixSize = modules.size;
          const effectiveSize = size * 0.95; // Leave some space for margin around the QR
          const offset = (size - effectiveSize) / 2;
          const moduleSize = effectiveSize / matrixSize;

          context.fillStyle = config.neonColor || config.foregroundColor;

          for (let row = 0; row < matrixSize; row++) {
            for (let col = 0; col < matrixSize; col++) {
              if (modules.get(row, col)) {
                // Determine if this is a finder pattern (eye)
                // Top-left: (0-6, 0-6)
                // Top-right: (size-7 to size-1, 0-6)
                // Bottom-left: (0-6, size-7 to size-1)
                const isTopLeft = row < 7 && col < 7;
                const isTopRight = row < 7 && col >= matrixSize - 7;
                const isBottomLeft = row >= matrixSize - 7 && col < 7;
                const isEye = isTopLeft || isTopRight || isBottomLeft;

                const x = offset + col * moduleSize;
                const y = offset + row * moduleSize;

                if (isEye) {
                  // For eyes, we can draw them specifically or just use the pattern
                  // Let's implement special eyes based on pattern
                  renderModule(context, x, y, moduleSize, config.pattern, true);
                } else {
                  renderModule(context, x, y, moduleSize, config.pattern, false);
                }
              }
            }
          }

          // 4. Draw Logo
          if (config.logo) {
            const logoImg = new Image();
            logoImg.src = config.logo;
            await new Promise((resolve) => {
              logoImg.onload = () => {
                const logoSize = (size * config.logoSize) / 100;
                const xPos = (size - logoSize) / 2;
                const yPos = (size - logoSize) / 2;
                
                // Draw a small background for the logo to separate it from the QR patterns
                context.fillStyle = config.backgroundColor === 'transparent' ? 'white' : config.backgroundColor;
                context.beginPath();
                context.roundRect(xPos - 4, yPos - 4, logoSize + 8, logoSize + 8, 8);
                context.fill();
                
                context.drawImage(logoImg, xPos, yPos, logoSize, logoSize);
                resolve(null);
              };
              logoImg.onerror = () => resolve(null);
            });
          }

          // 5. Scannability Check (Self-Correction/Verification)
          const imageData = context.getImageData(0, 0, size, size);
          const qrResult = jsQR(imageData.data, size, size);
          const isScannable = qrResult !== null && qrResult.data === config.data;

          onGenerate(isScannable);
        } catch (err) {
          // Silent fail on rendering errors to prevent console clutter in production
          onGenerate(false);
        }
      };

      drawQRCode();
    }
  }, [config, onGenerate]);

  return (
    <canvas 
      ref={canvasRef} 
      className="block w-full h-full"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

// Helper to render individual modules based on pattern
function renderModule(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, pattern: string, isEye: boolean) {
  const margin = size * 0.1;
  const s = size - (isEye ? 0 : margin * 2); 
  const px = x + (isEye ? 0 : margin);
  const py = y + (isEye ? 0 : margin);

  ctx.beginPath();
  if (pattern === 'circle') {
    ctx.arc(x + size / 2, y + size / 2, size / 2.2, 0, Math.PI * 2);
    ctx.fill();
  } else if (pattern === 'dots') {
    ctx.arc(x + size / 2, y + size / 2, size / 3, 0, Math.PI * 2);
    ctx.fill();
  } else if (pattern === 'rounded') {
    const r = isEye ? size / 4 : size / 3;
    ctx.roundRect(px, py, s, s, r);
    ctx.fill();
  } else {
    // Default square
    ctx.fillRect(px, py, s, s);
  }
}

export default QRCodeGenerator;
