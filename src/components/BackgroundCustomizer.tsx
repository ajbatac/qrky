import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QRConfig } from './QRky';

interface BackgroundCustomizerProps {
  config: QRConfig;
  onUpdateConfig: (updates: Partial<QRConfig>) => void;
}

const BackgroundCustomizer: React.FC<BackgroundCustomizerProps> = ({ config, onUpdateConfig }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdateConfig({ backgroundImage: event.target?.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="font-semibold text-base">Background Type</Label>
        <Select
          value={config.backgroundType}
          onValueChange={(value: 'solid' | 'gradient' | 'image') => onUpdateConfig({ backgroundType: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solid">Solid Color</SelectItem>
            <SelectItem value="gradient">Gradient</SelectItem>
            <SelectItem value="image">Image</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {config.backgroundType === 'gradient' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="gradient-start" className="font-semibold text-base">Gradient Start</Label>
            <Input
              id="gradient-start"
              type="color"
              value={config.gradientStart}
              onChange={(e) => onUpdateConfig({ gradientStart: e.target.value })}
              className="w-full h-12 p-2 cursor-pointer"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="gradient-end" className="font-semibold text-base">Gradient End</Label>
            <Input
              id="gradient-end"
              type="color"
              value={config.gradientEnd}
              onChange={(e) => onUpdateConfig({ gradientEnd: e.target.value })}
              className="w-full h-12 p-2 cursor-pointer"
            />
          </div>
        </div>
      )}

      {config.backgroundType === 'image' && (
        <div className="space-y-3">
          <Label htmlFor="background-image" className="font-semibold text-base">Background Image</Label>
          <Input
            id="background-image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default BackgroundCustomizer;
