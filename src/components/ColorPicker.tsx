import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { QRConfig } from './QRky';

interface ColorPickerProps {
  config: QRConfig;
  onUpdateConfig: (updates: Partial<QRConfig>) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ config, onUpdateConfig }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="space-y-3">
        <Label htmlFor="foreground-color" className="font-semibold text-base">Foreground Color</Label>
        <div className="relative">
          <Input
            id="foreground-color"
            type="color"
            value={config.foregroundColor}
            onChange={(e) => onUpdateConfig({ foregroundColor: e.target.value })}
            className="w-full h-12 p-2 cursor-pointer"
          />
          <span 
            className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-sm uppercase pointer-events-none"
            style={{ color: config.foregroundColor === '#ffffff' ? '#000' : config.foregroundColor }}
          >
            {config.foregroundColor}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <Label htmlFor="background-color" className="font-semibold text-base">Background Color</Label>
        <div className="relative">
          <Input
            id="background-color"
            type="color"
            value={config.backgroundColor}
            onChange={(e) => onUpdateConfig({ backgroundColor: e.target.value })}
            className="w-full h-12 p-2 cursor-pointer"
          />
          <span 
            className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-sm uppercase pointer-events-none"
            style={{ color: config.backgroundColor === '#ffffff' ? '#000' : config.backgroundColor }}
          >
            {config.backgroundColor}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
