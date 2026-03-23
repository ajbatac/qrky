/**
 * @file QRky.tsx
 * @description The core orchestrator for the QRky Design System.
 * This component manages the configuration state (`QRConfig`), coordinates the
 * real-time generator, and provides the visual interface for deep aesthetic 
 * customization.
 * 
 * Features:
 * - Real-time Preview Engine
 * - Local-First Data Processing (Privacy Guaranteed)
 * - Highly Customizable Design tokens (Borders, Radii, Gradients)
 * - Logo & Branding Integration
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import QRCodeGenerator from './QRCodeGenerator';
import FooterCopyright from './FooterCopyright';
import LogoUploader from './LogoUploader';
import BackgroundCustomizer from './BackgroundCustomizer';
import QRDecoder from './QRDecoder';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface QRConfig {
  data: string;
  size: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  foregroundColor: string;
  backgroundColor: string;
  logo?: string;
  logoSize: number;
  logoPosition: 'center' | 'top' | 'bottom';
  backgroundType: 'solid' | 'gradient' | 'image';
  backgroundImage?: string;
  gradientStart: string;
  gradientEnd: string;
  gradientDirection: string;
  borderStyle: 'none' | 'solid' | 'dashed' | 'dotted' | 'double';
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  pattern: 'square' | 'circle' | 'rounded' | 'dots';
  shadow: boolean;
  shadowColor: string;
  auraIntensity: number;
  neonColor: string;
}

const DEFAULT_CONFIG: QRConfig = {
  data: 'https://qrky.site',
  size: 320,
  errorCorrectionLevel: 'H',
  foregroundColor: '#ffffff',
  backgroundColor: '#00000000',
  logoSize: 15,
  logoPosition: 'center',
  backgroundType: 'solid',
  gradientStart: '#8b5cf6',
  gradientEnd: '#3b82f6',
  gradientDirection: '45deg',
  borderStyle: 'none',
  borderColor: '#ffffff',
  borderWidth: 2,
  borderRadius: 8,
  pattern: 'square',
  shadow: false,
  shadowColor: '#000000',
  auraIntensity: 70,
  neonColor: '#8b5cf6'
};

const DraggableNode: React.FC<{ 
    initialPos: { top: string, left: string }, 
    onClick: () => void,
    children: React.ReactNode 
  }> = ({ initialPos, onClick, children }) => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
  
    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      const startX = e.clientX - pos.x;
      const startY = e.clientY - pos.y;
  
      const onMouseMove = (moveEvent: MouseEvent) => {
        setPos({
          x: moveEvent.clientX - startX,
          y: moveEvent.clientY - startY
        });
      };
  
      const onMouseUp = (upEvent: MouseEvent) => {
        setIsDragging(false);
        // Important: check if it was a drag or a click
        if (Math.abs(upEvent.clientX - (startX + pos.x)) < 5 && 
            Math.abs(upEvent.clientY - (startY + pos.y)) < 5) {
          onClick();
        }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
  
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
  
    return (
      <div 
        className="absolute pointer-events-auto select-none"
        style={{ 
          top: initialPos.top, 
          left: initialPos.left, 
          transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
          cursor: isDragging ? 'grabbing' : 'grab',
          zIndex: isDragging ? 100 : 50
        }}
        onMouseDown={handleMouseDown}
      >
        {children}
      </div>
    );
};

interface AppThemeConfig {
  id: string;
  name: string;
  icon: string;
  mode: 'dark' | 'light' | 'auto';
  variables: Record<string, string>;
}

const APP_THEMES: Record<string, AppThemeConfig> = {
  basic: {
    id: 'basic',
    name: 'Basic',
    icon: 'check_box_outline_blank',
    mode: 'auto',
    variables: {}
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    icon: 'terminal',
    mode: 'dark',
    variables: {
      '--bg-color': '#050705',
      '--text-color': '#00ff41',
      '--text-muted': 'rgba(0, 255, 65, 0.5)',
      '--mesh-1': '#0a1a0a',
      '--mesh-2': '#001100',
      '--mesh-3': '#021002',
      '--glass-bg': 'rgba(0, 20, 0, 0.8)',
      '--glass-border': 'rgba(0, 255, 65, 0.3)',
      '--glass-shadow': 'rgba(0, 0, 0, 0.8)',
      '--neon-color': '#00ff41',
      '--brand-font': "'Fira Code'",
      '--app-font': "'Fira Code'",
      '--mesh-opacity': '0.8',
    }
  },
  mono: {
    id: 'mono',
    name: 'Mono',
    icon: 'text_format',
    mode: 'dark',
    variables: {
      '--bg-color': '#000000',
      '--text-color': '#ffffff',
      '--text-muted': 'rgba(255, 255, 255, 0.5)',
      '--mesh-1': '#111111',
      '--mesh-2': '#000000',
      '--mesh-3': '#222222',
      '--glass-bg': 'rgba(20, 20, 20, 0.9)',
      '--glass-border': 'rgba(255, 255, 255, 0.2)',
      '--glass-shadow': 'rgba(0, 0, 0, 1)',
      '--neon-color': '#ffffff',
      '--brand-font': "'Inter'",
      '--app-font': "'Inter'",
      '--mesh-opacity': '0.5',
    }
  },
  sepia: {
    id: 'sepia',
    name: 'Sepia',
    icon: 'light_mode',
    mode: 'light',
    variables: {
      '--bg-color': '#f4ecd8',
      '--text-color': '#433422',
      '--text-muted': 'rgba(67, 52, 34, 0.6)',
      '--mesh-1': '#e6dec5',
      '--mesh-2': '#f0e6cf',
      '--mesh-3': '#dfd4b8',
      '--glass-bg': 'rgba(240, 230, 200, 0.7)',
      '--glass-border': 'rgba(67, 52, 34, 0.15)',
      '--glass-shadow': 'rgba(0, 0, 0, 0.05)',
      '--neon-color': '#704214',
      '--mesh-opacity': '0.7',
      '--background': '43 54% 91%',
      '--foreground': '33 33% 20%',
      '--card': '43 54% 85%',
      '--border': '43 54% 80%',
    }
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight',
    icon: 'dark_mode',
    mode: 'dark',
    variables: {
      '--bg-color': '#02040a',
      '--text-color': '#c9d1d9',
      '--text-muted': 'rgba(201, 209, 217, 0.5)',
      '--mesh-1': '#0d1117',
      '--mesh-2': '#010409',
      '--mesh-3': '#161b22',
      '--glass-bg': 'rgba(13, 17, 23, 0.8)',
      '--glass-border': 'rgba(48, 54, 61, 0.7)',
      '--glass-shadow': 'rgba(0, 0, 0, 0.5)',
      '--neon-color': '#58a6ff',
      '--mesh-opacity': '1',
    }
  },
  dracula: {
    id: 'dracula',
    name: 'Dracula',
    icon: 'auto_awesome',
    mode: 'dark',
    variables: {
      '--bg-color': '#282a36',
      '--text-color': '#f8f8f2',
      '--text-muted': 'rgba(248, 248, 242, 0.5)',
      '--mesh-1': '#44475a',
      '--mesh-2': '#282a36',
      '--mesh-3': '#6272a4',
      '--glass-bg': 'rgba(68, 71, 90, 0.6)',
      '--glass-border': 'rgba(189, 147, 249, 0.3)',
      '--glass-shadow': 'rgba(0, 0, 0, 0.4)',
      '--neon-color': '#bd93f9',
      '--mesh-opacity': '1',
    }
  },
  nord: {
    id: 'nord',
    name: 'Nord',
    icon: 'ac_unit',
    mode: 'dark',
    variables: {
      '--bg-color': '#2e3440',
      '--text-color': '#eceff4',
      '--text-muted': 'rgba(236, 239, 244, 0.5)',
      '--mesh-1': '#3b4252',
      '--mesh-2': '#2e3440',
      '--mesh-3': '#434c5e',
      '--glass-bg': 'rgba(59, 66, 82, 0.7)',
      '--glass-border': 'rgba(136, 192, 208, 0.2)',
      '--glass-shadow': 'rgba(0, 0, 0, 0.3)',
      '--neon-color': '#88c0d0',
      '--mesh-opacity': '1',
    }
  },
  solarLight: {
    id: 'solarLight',
    name: 'Solar Light',
    icon: 'wb_sunny',
    mode: 'light',
    variables: {
      '--bg-color': '#fdf6e3',
      '--text-color': '#657b83',
      '--text-muted': 'rgba(101, 123, 131, 0.6)',
      '--mesh-1': '#eee8d5',
      '--mesh-2': '#fdf6e3',
      '--mesh-3': '#93a1a1',
      '--glass-bg': 'rgba(238, 232, 213, 0.7)',
      '--glass-border': 'rgba(101, 123, 131, 0.1)',
      '--glass-shadow': 'rgba(0, 0, 0, 0.05)',
      '--neon-color': '#268bd2',
      '--mesh-opacity': '0.7',
      '--background': '44 87% 94%',
      '--foreground': '192 10% 45%',
      '--card': '44 87% 90%',
      '--border': '44 87% 85%',
    }
  },
  solarDark: {
    id: 'solarDark',
    name: 'Solar Dark',
    icon: 'nightlight_round',
    mode: 'dark',
    variables: {
      '--bg-color': '#002b36',
      '--text-color': '#839496',
      '--text-muted': 'rgba(131, 148, 150, 0.5)',
      '--mesh-1': '#073642',
      '--mesh-2': '#002b36',
      '--mesh-3': '#586e75',
      '--glass-bg': 'rgba(7, 54, 66, 0.8)',
      '--glass-border': 'rgba(131, 148, 150, 0.1)',
      '--glass-shadow': 'rgba(0, 0, 0, 0.5)',
      '--neon-color': '#2aa198',
      '--mesh-opacity': '1',
    }
  },
  ultraClean: {
    id: 'ultraClean',
    name: 'Ultra Clean',
    icon: 'filter_b_and_w',
    mode: 'light',
    variables: {
      '--bg-color': '#ffffff',
      '--text-color': '#000000',
      '--text-muted': 'rgba(0, 0, 0, 0.6)',
      '--mesh-1': '#ffffff',
      '--mesh-2': '#fbfbfb',
      '--mesh-3': '#f5f5f5',
      '--glass-bg': 'rgba(255, 255, 255, 0.95)',
      '--glass-border': 'rgba(0, 0, 0, 0.1)',
      '--glass-shadow': 'rgba(0, 0, 0, 0.05)',
      '--neon-color': '#000000',
      '--mesh-opacity': '0',
      '--background': '0 0% 100%',
      '--foreground': '0 0% 0%',
      '--card': '0 0% 100%',
      '--border': '0 0% 90%',
    }
  },
  basic: {
    id: 'basic',
    name: 'Basic Reset',
    icon: 'restart_alt',
    mode: 'auto',
    variables: {
      '--bg-color': 'transparent',
      '--text-color': 'currentColor',
      '--text-muted': 'rgba(128, 128, 128, 0.6)',
      '--mesh-1': 'transparent',
      '--mesh-2': 'transparent',
      '--mesh-3': 'transparent',
      '--glass-bg': 'rgba(255, 255, 255, 0.05)',
      '--glass-border': 'rgba(255, 255, 255, 0.1)',
      '--glass-shadow': 'none',
      '--neon-color': '#3b82f6',
      '--mesh-opacity': '0',
    }
  }
};

const QR_PRESETS: Record<string, Partial<QRConfig>> = {
  ultraClean: {
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    backgroundType: 'solid',
    auraIntensity: 0,
    pattern: 'square',
    shadow: false,
    neonColor: '#000000',
    borderStyle: 'none'
  },
  default: DEFAULT_CONFIG
};

const QRky: React.FC = () => {
  const [appTheme, setAppTheme] = useState<keyof typeof APP_THEMES>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('appTheme') as keyof typeof APP_THEMES) || 'basic';
    }
    return 'basic';
  });

  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'light' | 'auto') || 'auto';
    }
    return 'auto';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const selectedTheme = APP_THEMES[appTheme];
    
    // Clear existing vars if switching back to basic
    if (appTheme === 'basic') {
      const varsToRemove = Object.keys(APP_THEMES.terminal.variables);
      varsToRemove.forEach(v => root.style.removeProperty(v));
    } else {
      // Apply theme variables
      Object.entries(selectedTheme.variables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }

    localStorage.setItem('appTheme', appTheme);
    localStorage.setItem('theme', theme);

    // Apply Light/Dark mode
    let effectiveMode = theme;
    if (appTheme !== 'basic') {
      effectiveMode = selectedTheme.mode as 'light' | 'dark';
    }

    if (effectiveMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const applySystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      };
      applySystemTheme(mediaQuery);
      mediaQuery.addEventListener('change', applySystemTheme);
      return () => mediaQuery.removeEventListener('change', applySystemTheme);
    } else {
      root.setAttribute('data-theme', effectiveMode);
    }
  }, [appTheme, theme]);

  const [activePanel, setActivePanel] = useState<'encode' | 'customize' | 'download' | 'decode' | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const [config, setConfig] = useState<QRConfig>(DEFAULT_CONFIG);

  const [recentCreations, setRecentCreations] = useState<QRConfig[]>([]);
  const [isScannable, setIsScannable] = useState(true);
  
  const [encodeTab, setEncodeTab] = useState<string>('url');
  const [wifiConfig, setWifiConfig] = useState({ ssid: '', password: '', encryption: 'WPA' });
  const [telConfig, setTelConfig] = useState({ number: '' });
  const [smsConfig, setSmsConfig] = useState({ number: '', message: '' });
  const [emailConfig, setEmailConfig] = useState({ address: '', subject: '', body: '' });

  const updateConfig = (updates: Partial<QRConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    toast({
      title: "Reset Complete",
      description: "Settings restored to defaults.",
    });
  };

  const isFormValid = () => {
    if (encodeTab === 'url' || encodeTab === 'text') return config.data.trim().length > 0;
    if (encodeTab === 'wifi') return wifiConfig.ssid.trim().length > 0;
    if (encodeTab === 'tel') return telConfig.number.trim().length > 0;
    if (encodeTab === 'sms') return smsConfig.number.trim().length > 0;
    if (encodeTab === 'email') return emailConfig.address.trim().length > 0;
    return false;
  };

  const handleGo = () => {
    let finalData = config.data;

    if (encodeTab === 'url') {
      const trimmed = config.data.trim();
      const hasProtocol = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed);
      if (trimmed && !hasProtocol) {
        finalData = `https://${trimmed}`;
      } else {
        finalData = trimmed;
      }
    } else if (encodeTab === 'wifi') {
      finalData = `WIFI:S:${wifiConfig.ssid};T:${wifiConfig.encryption};P:${wifiConfig.password};;`;
    } else if (encodeTab === 'tel') {
      finalData = `tel:${telConfig.number}`;
    } else if (encodeTab === 'sms') {
      finalData = `SMSTO:${smsConfig.number}:${smsConfig.message}`;
    } else if (encodeTab === 'email') {
      const subject = encodeURIComponent(emailConfig.subject);
      const body = encodeURIComponent(emailConfig.body);
      finalData = `mailto:${emailConfig.address}?subject=${subject}&body=${body}`;
    } else if (encodeTab === 'text') {
      finalData = config.data;
    }

    setConfig(prev => ({ ...prev, data: finalData }));
    setIsGenerating(true);
    setProgress(0);
    setActivePanel(null);
    
    const duration = 3000;
    const interval = 50;
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsGenerating(false), 500);
          return 100;
        }
        return prev + step;
      });
    }, interval);
  };

  const downloadQR = (format: 'png' | 'svg' | 'jpeg') => {
    const canvas = document.querySelector('#qr-canvas') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `qrky-${Date.now()}.${format}`;
      
      if (format === 'svg') {
          toast({ title: "SVG Export", description: "Standard PNG download used in demo." });
          link.href = canvas.toDataURL('image/png');
      } else {
          link.href = canvas.toDataURL(`image/${format === 'jpeg' ? 'jpeg' : 'png'}`);
      }
      
      link.click();
      toast({
        title: "Success",
        description: `QR code saved as ${format.toUpperCase()}`,
      });
      
      setRecentCreations(prev => [config, ...prev.slice(0, 4)]);
    }
  };

  const togglePanel = (panel: 'encode' | 'customize' | 'download' | 'decode') => {
    setActivePanel(prev => prev === panel ? null : panel);
  };

  return (
    <div className="relative min-h-screen text-[var(--text-color)] overflow-hidden selection:bg-purple-500/30">
      <div className="mesh-gradient" />
      <div className="bg-noise" />
      <div className="bg-fine-grain" />
      <div className="bg-dark-overlay" />
      
      <header className="absolute top-0 left-0 w-full p-6 md:p-8 md:px-16 flex flex-col items-center z-50 gap-4 md:gap-6">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <div className="flex items-center gap-4 md:gap-6 group cursor-pointer" onClick={() => setActivePanel(null)}>
            <img src="/qrky-logo-small.png" alt="QRky" className="w-10 h-10 md:w-16 md:h-16 brightness-110 drop-shadow-[0_0_20px_rgba(34,197,94,0.3)] object-contain" />
            <h1 
              className="text-4xl md:text-6xl font-black tracking-tighter leading-none transition-all duration-1000"
              style={{ 
                fontFamily: 'var(--brand-font)',
                filter: `drop-shadow(0 0 20px var(--neon-color, rgba(255,255,255,0.2)))`
              }}
            >
              <span className="bg-gradient-to-b from-violet-500 to-indigo-500 bg-clip-text text-transparent">QR</span>
              <span className="text-[var(--text-color)]">ky</span>
            </h1>
          </div>

          <div className="max-w-xs md:max-w-xl text-center md:text-right">
            <p className="text-[var(--text-muted)] text-[11px] md:text-sm leading-relaxed font-normal opacity-70">
              Generate beautiful, personalized QR codes with enhanced styling controls. Professional quality, made simple.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {[
            { text: 'GitHub Open-Source', icon: 'code', href: 'https://github.com/ajbatac/qrky' },
            { text: 'Free', icon: 'currency_exchange' },
            { text: 'Local & Offline processing', icon: 'cloud_off' },
            { text: 'No login', icon: 'no_accounts' },
            { text: 'No cloud', icon: 'cloud_queue' },
            { text: 'No database', icon: 'storage' },
            { text: 'Private & Secure', icon: 'verified_user' }
          ].map((badge, idx) => {
            const content = (
              <>
                <span className="material-symbols-outlined text-[14px] opacity-60">{badge.icon}</span>
                {badge.text}
              </>
            );
            
            const baseClass = "flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[11px] font-normal normal-case tracking-normal text-[var(--text-color)]/50 transition-all scale-95 md:scale-100 whitespace-nowrap";
            
            if ('href' in badge) {
              return (
                <a 
                  key={idx}
                  href={badge.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${baseClass} hover:text-[var(--text-color)] hover:bg-white/10 hover:border-white/10 cursor-pointer`}
                >
                  {content}
                </a>
              );
            }

            return (
              <div 
                key={idx}
                className={`${baseClass} cursor-default`}
              >
                {content}
              </div>
            );
          })}
        </div>
      </header>

      <main className="relative flex items-center justify-center min-h-screen overflow-hidden">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/5 opacity-50 animate-pulse-ring pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/10 opacity-30 pointer-events-none" />

        {/* Orbit Nodes - Draggable Container */}
        <div className="absolute inset-0 pointer-events-none">
            {/* Data Input Node */}
            <DraggableNode 
              initialPos={{ top: '20%', left: '20%' }}
              onClick={() => togglePanel('encode')}
            >
                <button 
                  className={`group relative w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center gap-[10px] md:gap-[14px] transition-all duration-300 ${activePanel === 'encode' ? 'scale-110 shadow-[0_0_40px_rgba(59,130,246,0.4)] border-blue-400/50' : 'hover:scale-105 active:scale-95'} glass-card p-4 md:p-8`}
                >
                    <div className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className={`material-symbols-outlined text-3xl md:text-5xl ${activePanel === 'encode' ? 'text-blue-400' : 'text-[var(--text-color)]'}`}>bolt</span>
                    <span className="text-[0.5rem] md:text-[0.6rem] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">Encode</span>
                </button>
            </DraggableNode>

            {/* Customize Node */}
            <DraggableNode 
              initialPos={{ top: '80%', left: '20%' }}
              onClick={() => togglePanel('customize')}
            >
                <button 
                  className={`group relative w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center gap-1 md:gap-1.5 transition-all duration-300 ${activePanel === 'customize' ? 'scale-110 shadow-[0_0_40px_rgba(168,85,247,0.4)] border-purple-400/50' : 'hover:scale-105 active:scale-95'} glass-card p-4 md:p-8`}
                >
                    <div className="absolute inset-0 rounded-full bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className={`material-symbols-outlined text-3xl md:text-5xl ${activePanel === 'customize' ? 'text-purple-400' : 'text-[var(--text-color)]'}`}>palette</span>
                    <span className="text-[0.5rem] md:text-[0.6rem] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">Style</span>
                </button>
            </DraggableNode>

            {/* Generate Node (Status) */}
            <DraggableNode 
              initialPos={{ top: '20%', left: '80%' }}
              onClick={() => togglePanel('decode')}
            >
                <button 
                  className={`group relative w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center gap-1 md:gap-1.5 transition-all duration-300 ${activePanel === 'decode' ? 'scale-110 shadow-[0_0_40px_rgba(34,211,238,0.4)] border-cyan-400/50' : 'hover:scale-105 active:scale-95'} glass-card p-4 md:p-8`}
                >
                    <div className="absolute inset-0 rounded-full bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className={`material-symbols-outlined text-3xl md:text-5xl ${activePanel === 'decode' ? 'text-cyan-400' : 'text-[var(--text-color)]'} group-hover:rotate-12 transition-transform`}>qr_code_scanner</span>
                    <span className="text-[0.5rem] md:text-[0.6rem] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">Decode</span>
                </button>
            </DraggableNode>

            {/* Download Node */}
            <DraggableNode 
              initialPos={{ top: '80%', left: '80%' }}
              onClick={() => togglePanel('download')}
            >
                <button 
                  className={`group relative w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center gap-[10px] md:gap-[14px] transition-all duration-300 ${activePanel === 'download' ? 'scale-110 shadow-[0_0_40px_rgba(59,130,246,0.4)] border-blue-400/50' : 'hover:scale-105 active:scale-95'} glass-card p-4 md:p-8`}
                >
                    <div className="absolute inset-0 rounded-full bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className={`material-symbols-outlined text-3xl md:text-5xl ${activePanel === 'download' ? 'text-emerald-400' : 'text-[var(--text-color)]'}`}>download</span>
                    <span className="text-[0.5rem] md:text-[0.6rem] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">Save</span>
                </button>
            </DraggableNode>
        </div>

        {/* Central QR Code Stage */}
        <div className="relative z-10 group cursor-pointer transition-all duration-1000">
          <div 
            className="absolute -inset-24 rounded-[4rem] opacity-75 blur-[100px] transition-all duration-1000 group-hover:opacity-100 group-hover:inset-[-15rem]" 
            style={{ 
              backgroundColor: config.neonColor,
              opacity: config.auraIntensity / 100
            }}
          />
          <div className={`relative glass-card p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] border-white/20 shadow-2xl overflow-hidden backdrop-blur-3xl transition-all duration-1000 transform scale-[0.6] sm:scale-[0.85] lg:scale-100 ${isGenerating ? 'blur-xl brightness-150 rotate-3' : 'blur-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className={isGenerating ? 'animate-pulse opacity-50' : ''}>
              <QRCodeGenerator 
                config={{ ...config, size: 320 }}
                onGenerate={(scannable) => {
                  if (scannable !== isScannable) {
                    setIsScannable(scannable);
                    if (!scannable) {
                      toast({
                        title: "Warning",
                        description: "QR code might be hard to decode. Try adjusting colors or reducing logo size.",
                        variant: "destructive",
                      });
                    }
                  }
                }}
              />
            </div>

            {/* Scannability Warning */}
            {!isScannable && !isGenerating && (
              <div className="absolute top-4 right-4 z-[20] flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full text-[0.7rem] font-black uppercase tracking-widest shadow-lg shadow-red-500/50 animate-bounce">
                <span className="material-symbols-outlined text-sm">warning</span>
                Hard to Scan
              </div>
            )}
          </div>
        </div>

        {/* Panel Logic (Z-Index fix for panels) */}
        {activePanel === 'encode' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5000] animate-in fade-in zoom-in-95 duration-700">
            <div className="relative">
              <button 
                onClick={() => setActivePanel(null)}
                className="absolute -top-6 -right-6 z-[10000] w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-black/80 border-2 border-white/20 hover:border-white/40 rounded-full backdrop-blur-xl hover:scale-110 active:scale-95 transition-all shadow-2xl group"
              >
                <span className="material-symbols-outlined text-white text-2xl font-black group-hover:rotate-180 transition-transform duration-500">close</span>
              </button>
              <div className={`glass-card p-8 rounded-[2.5rem] w-[40rem] relative border-[var(--glass-border)] shadow-[var(--glass-shadow)] transition-all duration-700 ${isGenerating ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}>
                <div className="flex flex-col gap-[14px] items-center text-center w-full">
                  <div className="w-full">
                    <span className="text-xs font-black uppercase tracking-[0.5em] text-green-400 mb-2 block">QR Content</span>
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-tight text-[var(--text-color)]">Enter Text or URL</h3>
                  </div>

                  <div className="relative flex flex-col gap-[14px] w-full">
                    <Tabs value={encodeTab} onValueChange={setEncodeTab} className="w-full">
                      <TabsList className="bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 p-1.5 rounded-2xl mb-6 w-full h-auto grid grid-cols-3 md:grid-cols-6 gap-2">
                        {['url', 'wifi', 'tel', 'sms', 'email', 'text'].map((t) => (
                          <TabsTrigger 
                            key={t}
                            value={t} 
                            className="py-3 text-[0.6rem] font-black uppercase tracking-widest data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-xl transition-all"
                          >
                            {t}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      <TabsContent value="url" className="mt-0">
                        <Input 
                          value={config.data}
                          onChange={(e) => updateConfig({ data: e.target.value })}
                          className="bg-[var(--text-color)]/5 border-[var(--text-color)]/10 h-16 text-xl px-6 rounded-[1.2rem] focus-visible:ring-green-500/50 focus-visible:border-green-500/50 transition-all font-mono text-[var(--text-color)]"
                          placeholder="https://qrky.site"
                          onKeyDown={(e) => e.key === 'Enter' && handleGo()}
                        />
                      </TabsContent>

                      <TabsContent value="wifi" className="mt-0 flex flex-col gap-3">
                        <Input 
                          value={wifiConfig.ssid}
                          onChange={(e) => setWifiConfig(prev => ({ ...prev, ssid: e.target.value }))}
                          className="bg-[var(--text-color)]/5 border-[var(--text-color)]/10 h-14 text-lg px-6 rounded-[1rem] focus-visible:ring-green-500/50 text-[var(--text-color)]"
                          placeholder="Network Name (SSID)"
                        />
                        <div className="flex gap-3">
                          <Input 
                            type="password"
                            value={wifiConfig.password}
                            onChange={(e) => setWifiConfig(prev => ({ ...prev, password: e.target.value }))}
                            className="bg-white/5 border-white/10 h-14 text-lg px-6 rounded-[1rem] flex-1 focus-visible:ring-green-500/50"
                            placeholder="Password"
                          />
                          <Select value={wifiConfig.encryption} onValueChange={(v) => setWifiConfig(prev => ({ ...prev, encryption: v }))}>
                            <SelectTrigger className="w-[120px] h-14 bg-[var(--text-color)]/5 border-[var(--text-color)]/10 rounded-[1rem] focus:ring-green-500/50 text-[var(--text-color)]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[var(--bg-color)] border-[var(--text-color)]/10 text-[var(--text-color)]">
                              <SelectItem value="WPA">WPA/W2</SelectItem>
                              <SelectItem value="WEP">WEP</SelectItem>
                              <SelectItem value="nopass">None</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TabsContent>

                      <TabsContent value="tel" className="mt-0">
                        <Input 
                          value={telConfig.number}
                          onChange={(e) => setTelConfig({ number: e.target.value })}
                          className="bg-[var(--text-color)]/5 border-[var(--text-color)]/10 h-16 text-xl px-6 rounded-[1.2rem] font-mono focus-visible:ring-green-500/50 text-[var(--text-color)]"
                          placeholder="+1 (555) 000-0000"
                        />
                      </TabsContent>

                      <TabsContent value="sms" className="mt-0 flex flex-col gap-3">
                        <Input 
                          value={smsConfig.number}
                          onChange={(e) => setSmsConfig(prev => ({ ...prev, number: e.target.value }))}
                          className="bg-[var(--text-color)]/5 border-[var(--text-color)]/10 h-14 text-lg px-6 rounded-[1rem] focus-visible:ring-green-500/50 text-[var(--text-color)]"
                          placeholder="Phone Number"
                        />
                        <Input 
                          value={smsConfig.message}
                          onChange={(e) => setSmsConfig(prev => ({ ...prev, message: e.target.value }))}
                          className="bg-[var(--text-color)]/5 border-[var(--text-color)]/10 h-14 text-lg px-6 rounded-[1rem] focus-visible:ring-green-500/50 text-[var(--text-color)]"
                          placeholder="Message (optional)"
                        />
                      </TabsContent>

                      <TabsContent value="email" className="mt-0 flex flex-col gap-3">
                        <Input 
                          value={emailConfig.address}
                          onChange={(e) => setEmailConfig(prev => ({ ...prev, address: e.target.value }))}
                          className="bg-[var(--text-color)]/5 border-[var(--text-color)]/10 h-14 text-lg px-6 rounded-[1rem] focus-visible:ring-green-500/50 text-[var(--text-color)]"
                          placeholder="Email Address"
                        />
                        <Input 
                          value={emailConfig.subject}
                          onChange={(e) => setEmailConfig(prev => ({ ...prev, subject: e.target.value }))}
                          className="bg-[var(--text-color)]/5 border-[var(--text-color)]/10 h-14 text-lg px-6 rounded-[1rem] focus-visible:ring-green-500/50 text-[var(--text-color)]"
                          placeholder="Subject"
                        />
                      </TabsContent>

                      <TabsContent value="text" className="mt-0">
                        <Input 
                          value={config.data}
                          onChange={(e) => updateConfig({ data: e.target.value })}
                          className="bg-[var(--text-color)]/5 border-[var(--text-color)]/10 h-24 text-lg px-6 rounded-[1.2rem] focus-visible:ring-green-500/50 transition-all font-mono text-[var(--text-color)]"
                          placeholder="Type any message..."
                        />
                      </TabsContent>
                    </Tabs>
                    
                    <div className="flex gap-[14px]">
                      <Button 
                        onClick={handleReset}
                        variant="outline"
                        className="h-14 flex-1 border-[var(--text-color)]/10 bg-[var(--text-color)]/5 hover:bg-[var(--text-color)]/10 text-[var(--text-muted)] hover:text-[var(--text-color)] rounded-[1.2rem] font-black uppercase tracking-widest text-lg transition-all"
                      >
                        <span className="material-symbols-outlined mr-2">restart_alt</span>
                        Reset
                      </Button>
                      <Button 
                        onClick={handleGo}
                        disabled={!isFormValid()}
                        className="h-14 flex-[2] bg-green-500 hover:bg-green-400 text-white rounded-[1.2rem] font-black uppercase tracking-widest text-2xl shadow-[0_0_40px_rgba(34,197,94,0.3)] active:scale-95 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Go
                        <span className="material-symbols-outlined ml-2 group-hover:animate-pulse text-3xl">bolt</span>
                      </Button>
                    </div>

                    <p className="text-[var(--text-muted)] text-sm font-medium tracking-wide leading-relaxed max-w-lg mx-auto">
                      Choose a format and enter your details to generate your custom QR code.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Decode Panel */}
        {activePanel === 'decode' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5000]">
            <QRDecoder 
              onClose={() => setActivePanel(null)} 
                onDecoded={(data) => {
                  updateConfig({ data });
                  setActivePanel('encode');
                  
                  // Auto-switch tabs based on decoded content
                  const lower = data.toLowerCase();
                  if (lower.startsWith('tel:')) {
                    setEncodeTab('tel');
                    setTelConfig({ number: data.substring(4) });
                  } else if (lower.startsWith('wifi:')) {
                    setEncodeTab('wifi');
                    // We could parse SSID/Pass here if needed, but for now just switch tab
                  } else if (lower.startsWith('smsto:')) {
                    setEncodeTab('sms');
                    // We could parse phone/message here
                  } else if (lower.startsWith('mailto:')) {
                    setEncodeTab('email');
                    setEmailConfig(prev => ({ ...prev, address: data.split(':')[1]?.split('?')[0] || '' }));
                  } else if (lower.startsWith('http')) {
                    setEncodeTab('url');
                  } else {
                    setEncodeTab('text');
                  }
                  
                  toast({
                    title: "Success",
                    description: "QR data loaded into the generator.",
                  });
                }}
            />
          </div>
        )}

        {/* Global Generation HUD */}
        {isGenerating && (
          <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-3xl animate-in fade-in duration-1000">
            <div className="flex flex-col items-center gap-12 w-full max-w-[50rem] px-12">
              <div className="flex flex-col items-center gap-6 w-full">
                <div className="flex justify-between w-full mb-2">
                  <span className="text-blue-400 text-xl font-black uppercase tracking-[0.6em] animate-pulse">Generating QR...</span>
                  <span className="text-blue-400 text-xl font-black font-mono">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.8)] transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-16 text-blue-400/40 text-base font-black uppercase tracking-[0.4em]">
                <div className="flex flex-col items-center gap-4">
                  <span className="material-symbols-outlined text-6xl animate-spin-slow">memory</span>
                  <span>Loading</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="material-symbols-outlined text-6xl">terminal</span>
                  <span>Data</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <span className="material-symbols-outlined text-6xl animate-spin">sync</span>
                  <span>Sync</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-white text-3xl font-black uppercase tracking-[0.3em] animate-pulse leading-none">
                  {progress < 30 ? 'PREPARING' : 
                   progress < 70 ? 'PROCESSING' : 
                   'DONE'}
                </p>
              </div>
            </div>
            
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.6)_50%),linear-gradient(90deg,rgba(255,0,0,0.2),rgba(0,255,0,0.15),rgba(0,0,128,0.2))] bg-[length:100%_8px,6px_100%]" />
          </div>
        )}

        {/* Customize Panel */}
        {activePanel === 'customize' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5000] animate-in fade-in zoom-in-95 duration-700">
            <div className="relative">
              <button 
                onClick={() => setActivePanel(null)}
                className="absolute -top-6 -right-6 z-[10000] w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-black/80 border-2 border-white/20 hover:border-white/40 rounded-full backdrop-blur-xl hover:scale-110 active:scale-95 transition-all shadow-2xl group"
              >
                <span className="material-symbols-outlined text-white text-2xl font-black group-hover:rotate-180 transition-transform duration-500">close</span>
              </button>
              <div className="glass-card p-6 rounded-[2.5rem] w-[34rem] max-h-[80vh] overflow-y-auto border-[var(--glass-border)] shadow-[var(--glass-shadow)] no-scrollbar">
                
                <div className="flex flex-col gap-6 items-center text-center w-full">
                  <div className="w-full">
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-400 mb-0.5 block">Customization</span>
                    <h3 className="text-xl font-black uppercase tracking-tighter leading-none text-[var(--text-color)]">Style Options</h3>
                  </div>

                  <div className="space-y-6 w-full">
                    {/* Quick Presets */}
                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase font-black tracking-[0.6em] text-blue-400 block mb-2 px-1 text-left">Quick Presets</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => updateConfig(QR_PRESETS.ultraClean)}
                          className="flex items-center justify-center gap-2 p-3 rounded-[1.2rem] border-[var(--glass-border)] bg-[var(--text-color)]/5 hover:bg-[var(--text-color)]/10 hover:border-[var(--text-color)]/20 transition-all group/preset"
                        >
                          <span className="material-symbols-outlined text-lg text-blue-400 group-hover/preset:scale-110 transition-transform">filter_b_and_w</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-color)]">Ultra Clean</span>
                        </button>
                        <button
                          onClick={() => updateConfig(QR_PRESETS.default)}
                          className="flex items-center justify-center gap-2 p-3 rounded-[1.2rem] border-[var(--glass-border)] bg-[var(--text-color)]/5 hover:bg-[var(--text-color)]/10 hover:border-[var(--text-color)]/20 transition-all group/preset"
                        >
                          <span className="material-symbols-outlined text-lg text-blue-400 group-hover/preset:rotate-180 transition-transform duration-500">restart_alt</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-color)]">Classic Reset</span>
                        </button>
                      </div>
                    </div>

                    {/* Glow Strength */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-end mb-0.5 px-1">
                         <Label className="text-[10px] uppercase font-black tracking-[0.4em] text-[var(--text-muted)]">Glow Strength</Label>
                         <span className="text-sm text-blue-400 font-mono font-bold">{config.auraIntensity}</span>
                      </div>
                      <Slider 
                        value={[config.auraIntensity]} 
                        onValueChange={(val) => updateConfig({ auraIntensity: val[0] })} 
                        className="py-1"
                      />
                    </div>

                    {/* Logo Size */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-end mb-0.5 px-1">
                         <Label className="text-[10px] uppercase font-black tracking-[0.4em] text-[var(--text-muted)]">Logo Size</Label>
                         <span className="text-sm text-blue-400 font-mono font-bold">{config.logoSize}</span>
                      </div>
                      <Slider 
                        value={[config.logoSize]} 
                        onValueChange={(val) => updateConfig({ logoSize: val[0] })} 
                        max={30} 
                        className="py-1"
                      />
                    </div>

                    {/* QR Pattern */}
                    <div className="space-y-3 pt-2 border-t border-[var(--text-color)]/10">
                      <Label className="text-[10px] uppercase font-black tracking-[0.6em] text-blue-400 block mb-2 px-1 text-left">QR Pattern</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'square', label: 'Classic', icon: 'square' },
                          { id: 'circle', label: 'Nodes', icon: 'circle' },
                          { id: 'rounded', label: 'Soft', icon: 'rounded_corner' },
                          { id: 'dots', label: 'Digital', icon: 'blur_on' }
                        ].map((p) => (
                          <button
                            key={p.id}
                            onClick={() => updateConfig({ pattern: p.id as any })}
                            className={`flex items-center gap-3 p-2.5 rounded-[1rem] border-2 transition-all duration-300 ${
                              config.pattern === p.id 
                                ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                                : 'bg-[var(--text-color)]/5 border-[var(--text-color)]/10 hover:border-[var(--text-color)]/20'
                            }`}
                          >
                            <span className="material-symbols-outlined text-xl text-blue-400">{p.icon}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">{p.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Logo & Background */}
                    <div className="pt-4 border-t border-white/10">
                      <LogoUploader config={config} onUpdateConfig={updateConfig} />
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <BackgroundCustomizer config={config} onUpdateConfig={updateConfig} />
                    </div>

                    {/* Action Buttons */}
                    <div className="sticky bottom-0 pt-4 flex gap-[14px] z-[103] w-full bg-transparent">
                      <Button 
                        onClick={handleReset}
                        variant="outline"
                        className="h-10 flex-1 border-[var(--text-color)]/10 bg-[var(--text-color)]/5 hover:bg-[var(--text-color)]/10 text-[var(--text-muted)] hover:text-[var(--text-color)] rounded-[1rem] font-black uppercase tracking-widest text-[10px] transition-all"
                      >
                        <span className="material-symbols-outlined text-xs mr-2">restart_alt</span>
                        Reset
                      </Button>
                      <Button 
                        onClick={handleGo}
                        disabled={!isFormValid()}
                        className="h-10 flex-[2] bg-green-500 hover:bg-green-400 text-white rounded-[1rem] font-black uppercase tracking-widest text-base shadow-[0_0_30px_rgba(34,197,94,0.2)] active:scale-95 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Go
                        <span className="material-symbols-outlined ml-2 group-hover:animate-pulse text-xl">bolt</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Download Panel */}
        {activePanel === 'download' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5000] animate-in fade-in zoom-in-95 duration-700">
            <div className="relative">
              <button 
                onClick={() => setActivePanel(null)}
                className="absolute -top-6 -right-6 z-[10000] w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-black/80 border-2 border-white/20 hover:border-white/40 rounded-full backdrop-blur-xl hover:scale-110 active:scale-95 transition-all shadow-2xl group"
              >
                <span className="material-symbols-outlined text-white text-2xl font-black group-hover:rotate-180 transition-transform duration-500">close</span>
              </button>
              <div className="glass-card p-6 rounded-[2rem] w-[28rem] relative border-[var(--glass-border)] shadow-[var(--glass-shadow)] text-center">
              
              <div className="flex flex-col gap-[14px] items-center text-center w-full">
                <div className="w-full">
                  <span className="text-xs font-black uppercase tracking-[0.5em] text-blue-400 mb-2 block">Download</span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-none text-[var(--text-color)]">Save Your QR</h3>
                </div>

                <div className="grid grid-cols-2 gap-[14px] w-full">
                  <Button 
                    variant="outline" 
                    onClick={() => downloadQR('png')} 
                    className="h-16 bg-[var(--text-color)]/5 border-[var(--text-color)]/10 hover:bg-[var(--text-color)]/10 text-xl font-black text-[var(--text-color)] rounded-[0.8rem] flex flex-col gap-1"
                  >
                    <span>PNG</span>
                    <span className="text-[0.6rem] uppercase tracking-[0.4em] text-[var(--text-muted)] font-bold">High Quality</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => downloadQR('svg')} 
                    className="h-16 bg-[var(--text-color)]/5 border-[var(--text-color)]/10 hover:bg-[var(--text-color)]/10 text-xl font-black text-[var(--text-color)] rounded-[0.8rem] flex flex-col gap-1"
                  >
                    <span>SVG</span>
                    <span className="text-[0.6rem] uppercase tracking-[0.4em] text-[var(--text-muted)] font-bold">Vector Graphics</span>
                  </Button>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed uppercase tracking-[0.4em] font-medium">
                    Download your QR code in different formats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      </main>

      <footer className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[48rem] px-4 md:px-8 z-[60] flex flex-col items-center gap-2 md:gap-6 pointer-events-none">
        {recentCreations.length > 0 && (
          <div className="w-full flex flex-col items-center gap-[14px] animate-in slide-in-from-bottom-5 duration-700 pointer-events-auto">
            <div className="flex items-center gap-3 w-full">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--text-color)]/10 to-transparent"></div>
              <span className="text-[0.5rem] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] whitespace-nowrap">Recent Output</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--text-color)]/10 to-transparent"></div>
            </div>
            
            <div className="flex justify-center gap-[14px] w-fit max-w-full overflow-x-auto pb-4 custom-scrollbar no-scrollbar scroll-smooth">
                {recentCreations.map((cre, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setConfig(cre)}
                      className="flex-shrink-0 w-20 h-20 rounded-[1rem] border border-white/5 bg-white/[0.03] backdrop-blur-sm p-3 hover:bg-white/10 hover:border-blue-500/30 hover:scale-105 active:scale-95 transition-all shadow-lg group relative"
                    >
                        <div className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity">
                          <QRCodeGenerator config={{ ...cre, size: 80 }} onGenerate={() => {}} />
                        </div>
                        <div className="absolute inset-0 rounded-[1rem] bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </button>
                ))}
            </div>
          </div>
        )}
        <div className="pointer-events-auto">
          <FooterCopyright />
        </div>
      </footer>
      <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-start gap-4 pointer-events-auto group/theme-menu">
        {/* Expanded Theme List */}
        <div className="flex flex-col-reverse items-start gap-2 max-h-0 opacity-0 overflow-hidden group-hover/theme-menu:max-h-[600px] group-hover/theme-menu:opacity-100 transition-all duration-700 ease-in-out pr-8">
          {Object.values(APP_THEMES).map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setAppTheme(t.id as any);
                if (t.id === 'ultraClean') {
                    updateConfig(QR_PRESETS.ultraClean);
                } else if (t.id === 'basic') {
                    updateConfig(QR_PRESETS.default);
                }
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-full glass-card border-[var(--glass-border)] hover:border-[var(--text-color)]/20 transition-all hover:translate-x-2 w-fit ${appTheme === t.id ? 'bg-[var(--text-color)]/10 border-[var(--text-color)]/30 translate-x-2 shadow-[var(--glass-shadow)]' : 'text-[var(--text-muted)]'}`}
              title={t.name}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-500 hover:scale-110" 
                style={{ 
                  backgroundColor: t.variables['--bg-color'] || (theme === 'light' ? '#ffffff' : '#0c0817'),
                  border: `2px solid ${t.variables['--text-color'] || (theme === 'light' ? '#00000030' : '#ffffff30')}`
                }}
              >
                <span 
                  className="material-symbols-outlined text-[18px] font-black" 
                  style={{ color: t.variables['--text-color'] || (theme === 'light' ? '#000' : '#fff') }}
                >
                  {t.icon}
                </span>
              </div>
              <span className="text-[11px] font-medium normal-case tracking-tight whitespace-nowrap pr-2">{t.name}</span>
            </button>
          ))}
          
          {/* Mode Toggle (only visible when Basic is selected or as a sub-option) */}
          {appTheme === 'basic' && (
            <div className="flex items-center gap-1 p-1 glass-card rounded-full border-[var(--text-color)]/10 mb-2 mt-2 translate-x-2">
              <button 
                onClick={() => setTheme('light')}
                className={`p-2 rounded-full transition-all flex items-center justify-center ${theme === 'light' ? 'bg-[var(--text-color)] text-[var(--bg-color)] shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text-color)]'}`}
              >
                <span className="material-symbols-outlined text-[18px]">light_mode</span>
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`p-2 rounded-full transition-all flex items-center justify-center ${theme === 'dark' ? 'bg-[var(--text-color)]/20 text-[var(--text-color)] shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text-color)]'}`}
              >
                <span className="material-symbols-outlined text-[18px]">dark_mode</span>
              </button>
              <button 
                onClick={() => setTheme('auto')}
                className={`p-2 rounded-full transition-all flex items-center justify-center ${theme === 'auto' ? 'bg-white/20 text-white shadow-md' : 'text-white/40 hover:text-white/80'}`}
              >
                <span className="material-symbols-outlined text-[18px]">brightness_auto</span>
              </button>
            </div>
          )}
        </div>
        
        {/* Main Trigger */}
        <div className="relative flex items-center group/btn cursor-pointer">
          {/* Palette Icon Circle */}
          <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-white/10 group-hover/theme-menu:bg-white/10 group-hover/theme-menu:scale-105 active:scale-95 transition-all z-10">
            <span className="material-symbols-outlined text-[20px] text-white/40 group-hover/theme-menu:text-white animate-[spin_10s_linear_infinite]">palette</span>
          </div>

          {/* Sliding Label Container */}
          <div className="absolute left-6 pl-8 pr-4 py-2 h-10 flex flex-col justify-center bg-white/5 backdrop-blur-md rounded-r-full border-t border-b border-r border-white/10 -z-0 max-w-0 opacity-0 overflow-hidden group-hover/theme-menu:max-w-[180px] group-hover/theme-menu:opacity-100 transition-all duration-500 ease-in-out pointer-events-none">
            <span className="text-[9px] font-medium text-blue-400/80 whitespace-nowrap">System</span>
            <span className="text-[11px] font-normal text-white/90 whitespace-nowrap">Customize Themes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRky;
