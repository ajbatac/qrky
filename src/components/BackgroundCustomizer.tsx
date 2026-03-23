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
    <div className="space-y-[14px]">
      <div className="flex items-center gap-[14px] mb-2">
        <span className="material-symbols-outlined text-blue-400 text-sm">grid_view</span>
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">Background</h4>
      </div>

      <div className="space-y-[14px]">
        <Label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)] px-1">Background Type</Label>
        <Select
          value={config.backgroundType}
          onValueChange={(value: 'solid' | 'gradient' | 'image') => {
            onUpdateConfig({ backgroundType: value });
          }}
        >
          <SelectTrigger className="bg-[var(--text-color)]/5 border-[var(--text-color)]/10 h-10 rounded-xl text-xs font-black uppercase tracking-widest focus:ring-blue-400/50 text-[var(--text-color)]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--bg-color)] border-[var(--text-color)]/10 text-[var(--text-color)] z-[200]">
            <SelectItem value="solid">Solid Color</SelectItem>
            <SelectItem value="gradient">Gradient</SelectItem>
            <SelectItem value="image">Image</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {config.backgroundType === 'solid' && (
        <div className="flex justify-between items-center py-1 animate-in fade-in slide-in-from-top-1 duration-300">
          <Label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)] px-1">Backdrop Color</Label>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--text-color)]/10 bg-[var(--text-color)]/5">
            <input
              type="color"
              value={config.backgroundColor}
              onChange={(e) => onUpdateConfig({ backgroundColor: e.target.value })}
              className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
            />
          </div>
        </div>
      )}

      {config.backgroundType === 'gradient' && (
        <div className="grid grid-cols-2 gap-[14px] animate-in fade-in slide-in-from-top-1 duration-300">
          <div className="space-y-[14px]">
            <Label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)] px-1 text-center block">Start</Label>
            <div className="w-full h-8 rounded-xl overflow-hidden border border-[var(--text-color)]/10 bg-[var(--text-color)]/5 flex items-center justify-center">
              <input
                type="color"
                value={config.gradientStart}
                onChange={(e) => onUpdateConfig({ gradientStart: e.target.value })}
                className="w-[150%] h-[150%] cursor-pointer bg-transparent border-none"
              />
            </div>
          </div>
          <div className="space-y-2">
             <Label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)] px-1 text-center block">End</Label>
             <div className="w-full h-8 rounded-xl overflow-hidden border border-[var(--text-color)]/10 bg-[var(--text-color)]/5 flex items-center justify-center">
              <input
                type="color"
                value={config.gradientEnd}
                onChange={(e) => onUpdateConfig({ gradientEnd: e.target.value })}
                className="w-[150%] h-[150%] cursor-pointer bg-transparent border-none"
              />
            </div>
          </div>
        </div>
      )}

      {config.backgroundType === 'image' && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-300">
           <Input
            id="background-image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Label 
            htmlFor="background-image" 
            className="flex flex-col items-center justify-center p-4 border border-[var(--text-color)]/10 rounded-xl bg-[var(--text-color)]/5 hover:bg-[var(--text-color)]/10 hover:border-blue-400/50 transition-all cursor-pointer group"
          >
            {config.backgroundImage ? (
              <img src={config.backgroundImage} alt="Background Preview" className="w-full h-12 object-cover rounded-md border border-[var(--text-color)]/10" />
            ) : (
                 <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Upload Image</span>
            )}
          </Label>
        </div>
      )}
    </div>
  );
};

export default BackgroundCustomizer;
