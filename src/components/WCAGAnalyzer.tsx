import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { QRConfig } from './QRky';

interface WCAGAnalyzerProps {
  config: QRConfig;
}

const WCAGAnalyzer: React.FC<WCAGAnalyzerProps> = ({ config }) => {
  // Function to parse hex color to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Function to calculate relative luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  // Calculate contrast ratio
  const getContrastRatio = (color1: string, color2: string) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    if (!rgb1 || !rgb2) return 1;

    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  };

  const contrastRatio = getContrastRatio(config.foregroundColor, config.backgroundColor);

  const getStatus = (ratio: number) => {
    if (ratio >= 7) return { level: 'AAA', icon: <CheckCircle className="w-5 h-5 text-green-500" /> };
    if (ratio >= 4.5) return { level: 'AA', icon: <CheckCircle className="w-5 h-5 text-green-500" /> };
    if (ratio >= 3) return { level: 'A', icon: <AlertTriangle className="w-5 h-5 text-yellow-500" /> };
    return { level: 'Fail', icon: <XCircle className="w-5 h-5 text-red-500" /> };
  };

  const status = getStatus(contrastRatio);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-purple-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Accessibility Check
          </span>
          <div className='text-sm text-gray-500'>Can it be read properly by all users?</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Contrast Ratio:</span>
          <Badge variant={status.level === 'Fail' ? 'destructive' : 'secondary'}>
            {contrastRatio.toFixed(2)} : 1
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">WCAG Status:</span>
          <div className="flex items-center gap-2">
            {status.icon}
            <span className="font-bold">{status.level}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WCAGAnalyzer;
