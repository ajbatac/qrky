import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  Download,
  Palette, 
  Image, 
  Settings, 
  Scan,
  Copy,
  Sparkles,
  Zap,
  Camera,
  FileText,
  Link,
  Mail,
  Phone,
  Wifi,
  CreditCard
} from 'lucide-react';
import QRCodeGenerator from './QRCodeGenerator';
import QRCodeDecoder from './QRCodeDecoder';
import ColorPicker from './ColorPicker';
import LogoUploader from './LogoUploader';
import WCAGAnalyzer from './WCAGAnalyzer';
import FooterCopyright from './FooterCopyright';

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
}

const QRky: React.FC = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [customizationTab, setCustomizationTab] = useState('logo');
  const [dataType, setDataType] = useState('url');

  const [config, setConfig] = useState<QRConfig>({
    data: 'https://qrky.site',
    size: 300,
    errorCorrectionLevel: 'H',
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    logoSize: 15,
    logoPosition: 'center',
    backgroundType: 'solid',
    gradientStart: '#667eea',
    gradientEnd: '#764ba2',
    gradientDirection: '45deg',
    borderStyle: 'none',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 8,
    pattern: 'square',
    shadow: false,
    shadowColor: '#000000'
  });

  const updateConfig = (updates: Partial<QRConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  // Force re-render when config changes
  useEffect(() => {
    // This ensures the QR code regenerates when any config changes
  }, [config]);

  const generateQRData = () => {
    const trimmedData = config.data.trim();
    switch (dataType) {
      case 'url':
        return trimmedData.startsWith('http') ? trimmedData : `https://${trimmedData}`;
      case 'email':
        return `mailto:${trimmedData}`;
      case 'phone':
        return `tel:${trimmedData}`;
      case 'sms':
        return `sms:${trimmedData}`;
      case 'wifi':
        return `WIFI:T:WPA;S:${trimmedData};P:password;;`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${trimmedData}\nEND:VCARD`;
      default:
        return trimmedData;
    }
  };

  const downloadQR = () => {
    const canvas = document.querySelector('#qr-canvas') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `qrky-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      toast({
        title: "Downloaded successfully",
        description: "QR code saved to your device",
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(config.data);
      toast({
        title: "Copied successfully",
        description: "QR code data copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="relative min-h-screen p-4 lg:p-8">
      
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 slide-in-up">
          <div className="inline-flex items-center gap-3 mb-6">
            <a href="/" className="flex items-center gap-3">
              <img src="/qrky-logo-small.png" alt="QRky Logo" className="w-14 h-14" />
            </a>
            <h1 className="text-6xl py-7 font-extrabold bg-gradient-to-r from-purple-400 to-teal-300 bg-clip-text text-transparent">
              QRky
            </h1>
            <Sparkles className="w-7 h-7 text-primary" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Generate beautiful, personalized QR codes with enhanced styling controls, logo placement, and a real-time preview to perfect your design.
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold"> Professional quality, made simple.</div>
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="relative mb-8">
            <TabsList className="flex w-full gap-4 bg-transparent p-0 h-auto border-none">
              <TabsTrigger 
                value="generate" 
                className={`flex-1 flex items-center justify-center gap-3 h-16 px-8 rounded-full font-bold text-lg transition-all duration-200 border ${
                  activeTab === 'generate' 
                    ? 'bg-gradient-to-tr from-violet-100 via-purple-100 to-white-600' 
                    : 'bg-card text-card-foreground'
                }`}
              >
                <Zap className="w-6 h-6" />
                Generate QR
              </TabsTrigger>
              <TabsTrigger 
                value="decode" 
                className={`flex-1 flex items-center justify-center gap-3 h-16 px-8 rounded-full font-bold text-lg transition-all duration-200 border ${
                  activeTab === 'decode' 
                    ? 'bg-gradient-to-tr from-green-100 via-teal-100 to-white-600' 
                    : 'bg-card text-card-foreground'
                }`}
              >
                <Scan className="w-6 h-6" />
                Decode QR
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="rounded-3xl p-8">
            <TabsContent value="generate" className="space-y-8 mt-0 slide-in-up">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              {/* Preview Section */}
              <div className="xl:col-span-1">
                <div className="xl:sticky xl:top-4 xl:max-h-screen xl:overflow-y-auto custom-scrollbar min-h-[1200px]">
                <Card className="elevated-card premium-card interactive-scale bounce-in">
                  <CardHeader className="pb-8">
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="w-6 h-6 text-purple-600" />
                      <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Live Preview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl p-8 flex items-center justify-center border-3 border-slate-200 shadow-inner">
                      <QRCodeGenerator 
                        config={{ ...config, data: generateQRData() }}
                        onGenerate={() => {}}
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        onClick={downloadQR}
                        className="flex-1 premium-button h-12 text-base font-bold button-subtle"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-12 px-5 border-3 border-slate-300 shadow-lg button-subtle"
                        onClick={copyToClipboard}
                      >
                        <Copy className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="text-sm text-gray-500 space-y-4 bg-gradient-to-r from-slate-50 via-white to-slate-100 rounded-2xl p-6 border-3 border-slate-200 shadow-inner">
                      <div className="flex justify-between">
                        <span className="font-medium">Size:</span>
                        <Badge variant="secondary" className="font-bold">{config.size}px</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Error Correction:</span>
                        <Badge variant="secondary" className="font-bold">{config.errorCorrectionLevel}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Pattern:</span>
                        <Badge variant="secondary" className="font-bold">{config.pattern}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-8">
                  {/* WCAG Accessibility Analysis */}
                  <WCAGAnalyzer config={config} />
                </div>
                </div>
              </div>

              {/* Configuration Section */}
              <div className="xl:col-span-2 space-y-10">
                {/* Data Input */}
                <Card className="elevated-card premium-card card-subtle">
                  <CardHeader className="pb-8">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-6 h-6 text-purple-600" />
                      <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">QR Code Data</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label htmlFor="data-type" className="text-base font-semibold">Data Type</Label>
                        <Select value={dataType} onValueChange={setDataType}>
                          <SelectTrigger className="h-12 premium-input input-subtle">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Text
                              </div>
                            </SelectItem>
                            <SelectItem value="url">
                              <div className="flex items-center gap-2">
                                <Link className="w-4 h-4" />
                                URL
                              </div>
                            </SelectItem>
                            <SelectItem value="email">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email
                              </div>
                            </SelectItem>
                            <SelectItem value="phone">
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Phone
                              </div>
                            </SelectItem>
                            <SelectItem value="wifi">
                              <div className="flex items-center gap-2">
                                <Wifi className="w-4 h-4" />
                                WiFi
                              </div>
                            </SelectItem>
                            <SelectItem value="vcard">
                              <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                Contact
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="error-correction" className="text-base font-semibold">Error Correction</Label>
                        <Select 
                          value={config.errorCorrectionLevel} 
                          onValueChange={(value: 'L' | 'M' | 'Q' | 'H') => updateConfig({ errorCorrectionLevel: value })}
                        >
                          <SelectTrigger className="h-12 premium-input input-subtle">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="L">Low (7%)</SelectItem>
                            <SelectItem value="M">Medium (15%)</SelectItem>
                            <SelectItem value="Q">Quartile (25%)</SelectItem>
                            <SelectItem value="H">High (30%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="data-input" className="text-base font-semibold">Content</Label>
                      <Textarea
                        id="data-input"
                        placeholder={dataType === 'url' ? 'Enter URL (e.g., https://example.com)' : `Enter your ${dataType} here...`}
                        value={config.data}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateConfig({ data: e.target.value.trim() })}
                        className="min-h-[140px] premium-input resize-none break-all text-base input-subtle"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Customization Tabs */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Settings className="w-6 h-6 text-purple-600" />
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Customize your QR code</span>
                  </h2>
                  <Tabs value={customizationTab} onValueChange={setCustomizationTab} className="w-full">
                    <TabsList>
                      <TabsTrigger value="colors">
                        <Palette className="w-4 h-4 mr-2" />
                        Colors
                      </TabsTrigger>
                      <TabsTrigger value="size">
                        <Settings className="w-4 h-4 mr-2" />
                        Size
                      </TabsTrigger>
                      <TabsTrigger value="logo">
                        <Image className="w-4 h-4 mr-2" />
                        Logo
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="colors" className="space-y-6 mt-0">
                      <ColorPicker 
                        config={config}
                        onUpdateConfig={updateConfig}
                      />
                    </TabsContent>
                    <TabsContent value="size" className="space-y-6 mt-0">
                      <div className="space-y-3">
                        <Label className="text-lg font-bold">Size: {config.size}px</Label>
                        <Slider
                          value={[config.size]}
                          onValueChange={(value: number[]) => updateConfig({ size: value[0] })}
                          min={100}
                          max={800}
                          step={10}
                          className="mt-4"
                        />
                        <div className="text-sm text-gray-500 bg-gradient-to-r from-slate-50 via-white to-slate-100 rounded-xl p-4 border-3 border-slate-200 shadow-inner">
                          <p className="font-medium">Recommended sizes: 300px for web, 600px for print</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="logo" className="space-y-6 mt-0">
                      <LogoUploader 
                        config={config}
                        onUpdateConfig={updateConfig}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
            </TabsContent>

            <TabsContent value="decode" className="space-y-8 mt-0">
              <QRCodeDecoder />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
    <FooterCopyright />
  </div>
  );
};

export default QRky;
