import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { QRConfig } from './QRky';

interface QRCodeGeneratorProps {
  config: QRConfig;
  onGenerate: () => void;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ config, onGenerate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      // Clear canvas before drawing
      context.clearRect(0, 0, canvas.width, canvas.height);

      const drawQRCode = () => {
        QRCode.toCanvas(canvas, config.data, {
          width: config.size,
          errorCorrectionLevel: config.errorCorrectionLevel,
          color: {
            dark: config.foregroundColor,
            light: config.backgroundType === 'solid' ? config.backgroundColor : '#00000000',
          },
        }, (error) => {
          if (error) console.error(error);
          
          if (config.logo) {
            const logoImg = new Image();
            logoImg.src = config.logo;
            logoImg.onload = () => {
              const logoSize = (config.size * config.logoSize) / 100;
              const x = (config.size - logoSize) / 2;
              const y = (config.size - logoSize) / 2;
              context.drawImage(logoImg, x, y, logoSize, logoSize);
            };
          }
          onGenerate();
        });
      };

      if (config.backgroundType === 'image' && config.backgroundImage) {
        const bgImg = new Image();
        bgImg.src = config.backgroundImage;
        bgImg.onload = () => {
          context.drawImage(bgImg, 0, 0, config.size, config.size);
          drawQRCode();
        };
      } else if (config.backgroundType === 'gradient') {
        const gradient = context.createLinearGradient(0, 0, config.size, config.size);
        gradient.addColorStop(0, config.gradientStart);
        gradient.addColorStop(1, config.gradientEnd);
        context.fillStyle = gradient;
        context.fillRect(0, 0, config.size, config.size);
        drawQRCode();
      } else {
        drawQRCode();
      }
    }
  }, [config, onGenerate]);

  return <canvas id="qr-canvas" ref={canvasRef} />;
};

export default QRCodeGenerator;
