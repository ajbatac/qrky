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
    <div className="space-y-[14px]">
      <div className="flex items-center gap-[14px] mb-2">
        <span className="material-symbols-outlined text-blue-400 text-sm">image</span>
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">Logo Overlay</h4>
      </div>

      <div className="space-y-[14px]">
        <div className="relative group">
          <Input
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          <Label 
            htmlFor="logo-upload" 
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[var(--text-color)]/10 rounded-[1rem] bg-[var(--text-color)]/5 hover:bg-[var(--text-color)]/10 hover:border-blue-400/50 transition-all cursor-pointer group"
          >
            {config.logo ? (
              <div className="relative">
                <img src={config.logo} alt="Logo Preview" className="w-12 h-12 rounded-lg object-contain" />
                <button 
                  onClick={(e) => { e.preventDefault(); onUpdateConfig({ logo: undefined }); }}
                  className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform"
                >
                  <span className="material-symbols-outlined text-[10px] text-white">close</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-[var(--text-color)]/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                  <span className="material-symbols-outlined text-sm text-blue-400">add</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Attach Logo</span>
              </div>
            )}
          </Label>
        </div>
      </div>

      {config.logo && (
        <div className="space-y-[14px] py-2">
          <div className="grid grid-cols-2 gap-[14px]">
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)]">Scale</Label>
                <span className="text-[10px] text-blue-400 font-mono font-bold">{config.logoSize}%</span>
              </div>
              <Slider
                value={[config.logoSize]}
                onValueChange={(value: number[]) => onUpdateConfig({ logoSize: value[0] })}
                min={5}
                max={40}
                step={1}
                className="py-1"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-black tracking-widest text-white/40 px-1">Anchor</Label>
            <Select
              value={config.logoPosition}
              onValueChange={(value: 'center' | 'top' | 'bottom') => onUpdateConfig({ logoPosition: value })}
            >
              <SelectTrigger className="bg-[var(--text-color)]/5 border-[var(--text-color)]/10 h-10 rounded-xl text-xs font-black uppercase tracking-widest focus:ring-blue-400/50 text-[var(--text-color)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[var(--bg-color)] border-[var(--text-color)]/10 text-[var(--text-color)]">
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="top">Top</SelectItem>
                <SelectItem value="bottom">Bottom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default LogoUploader;
