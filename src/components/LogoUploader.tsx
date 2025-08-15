import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QRConfig } from './QRky';

interface LogoUploaderProps {
  config: QRConfig;
  onUpdateConfig: (updates: Partial<QRConfig>) => void;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ config, onUpdateConfig }) => {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdateConfig({ logo: event.target?.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6 mt-8">
      <div className="space-y-3">
        <Label htmlFor="logo-upload" className="font-semibold text-base">Upload Logo</Label>
        <Input
          id="logo-upload"
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="w-full"
        />
      </div>
      {config.logo && (
        <>
          <div className="space-y-3">
            <Label className="font-semibold text-base">Logo Size: {config.logoSize}%</Label>
            <Slider
              value={[config.logoSize]}
              onValueChange={(value: number[]) => onUpdateConfig({ logoSize: value[0] })}
              min={5}
              max={40}
              step={1}
            />
          </div>
          <div className="space-y-3">
            <Label className="font-semibold text-base">Logo Position</Label>
            <Select
              value={config.logoPosition}
              onValueChange={(value: 'center' | 'top' | 'bottom') => onUpdateConfig({ logoPosition: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="top">Top</SelectItem>
                <SelectItem value="bottom">Bottom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
};

export default LogoUploader;
