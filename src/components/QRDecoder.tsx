/**
 * @file QRDecoder.tsx
 * @description A high-performance, visual QR code-to-text extraction engine.
 * Uses a multi-strategy approach (scanning on different backdrops) to improve
 * detection rates for transparent or low-contrast QR designs.
 * 
 * Features:
 * - Drag-and-drop image interface
 * - Intelligent background switching for decoding
 * - Visual preview of scanned data
 * - Integration with main generator
 */

import React, { useState, useRef } from 'react';
import * as jsQRImport from 'jsqr';
// Handle both ESM and CJS import patterns for cross-platform compatibility
const jsQR = (jsQRImport as any).default || jsQRImport;
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface QRDecoderProps {
  onClose: () => void;
  onDecoded?: (data: string) => void;
}

const QRDecoder: React.FC<QRDecoderProps> = ({ onClose, onDecoded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDecode = (file: File) => {
    // Begin file analysis sequence
    setError(null);
    
    if (!file.type.startsWith('image/')) {
      setError("Please upload an image file.");
      toast({
        title: "Error",
        description: "Please upload an image file.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      if (!url) {
        setIsProcessing(false);
        setError("Could not read file data.");
        return;
      }
      
      setPreviewUrl(url);
      const img = new Image();
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d', { willReadFrequently: true });
          if (!context) {
            setIsProcessing(false);
            setError("Browser rendering failure.");
            return;
          }

          // Resizing for performance and reliability
          const maxDim = 1024;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            const ratio = Math.min(maxDim / width, maxDim / height);
            width = Math.floor(width * ratio);
            height = Math.floor(height * ratio);
          }

          canvas.width = width;
          canvas.height = height;
          
          if (typeof jsQR !== 'function') {
             throw new Error("Decoder library initialization failed.");
          }

          const tryScan = (bgColor: string) => {
            context.fillStyle = bgColor;
            context.fillRect(0, 0, width, height);
            context.drawImage(img, 0, 0, width, height);
            const data = context.getImageData(0, 0, width, height);
            return jsQR(data.data, data.width, data.height, { inversionAttempts: "attemptBoth" });
          };

          // Strategy 1: Try on standard white backdrop (best for most cases)
          // Strategy 1: Try on standard white backdrop (best for most cases)
          let code = tryScan('#FFFFFF');

          if (!code) {
             // Strategy 2: Try on solid black backdrop (best for neon/inverted styles with transparency)
             code = tryScan('#000000');
          }

          if (code) {
            setResult(code.data);
            setError(null);
            toast({ title: "Success", description: "QR Code decoded." });
          } else {
            setError("No QR code detected.");
            toast({ 
              title: "Failed", 
              description: "Could not detect a QR code. Try a clearer image.",
              variant: "destructive" 
            });
          }
        } catch (err) {
          setError("Scanning engine crashed.");
          toast({
            title: "Error",
            description: "System failure during decoding.",
            variant: "destructive"
          });
        } finally {
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        setIsProcessing(false);
        setError("Image loading failed.");
        toast({
          title: "Error",
          description: "Could not read image file.",
          variant: "destructive"
        });
      };

      img.src = url;
    };
    
    reader.onerror = () => {
      setIsProcessing(false);
      setError("File reader error.");
      toast({
        title: "Error",
        description: "File reading failed.",
        variant: "destructive"
      });
    };
    
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleDecode(file);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied",
        description: "Content copied to clipboard.",
      });
    }
  };

  return (
    <div className="glass-card p-6 rounded-[2rem] w-[28rem] relative border-[var(--glass-border)] shadow-[var(--glass-shadow)] animate-in fade-in zoom-in-95 duration-500">
      <button 
        onClick={onClose} 
        className="absolute -top-6 -right-6 z-[10000] w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-black/80 border-2 border-white/20 hover:border-white/40 rounded-full backdrop-blur-xl hover:scale-110 active:scale-95 transition-all shadow-2xl group"
      >
        <span className="material-symbols-outlined text-white text-2xl font-black group-hover:rotate-180 transition-transform duration-500">close</span>
      </button>

      <div className="flex flex-col gap-6">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.5em] text-cyan-400 mb-2 block">Reader</span>
          <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight text-[var(--text-color)]">Decode QR</h3>
        </div>

        {!result ? (
          <label 
            className={`
              h-48 border-2 border-dashed rounded-[1.5rem] flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 relative
              ${isDragging ? 'border-cyan-500 bg-cyan-500/10 scale-102' : 'border-[var(--text-color)]/10 hover:border-[var(--text-color)]/20 hover:bg-[var(--text-color)]/5'}
              ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
            `}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleDecode(file);
              }}
            />
            
            <div className={`p-4 rounded-full ${isDragging ? 'bg-cyan-500 text-black' : isProcessing ? 'bg-cyan-500/20 text-cyan-400' : 'bg-[var(--text-color)]/5 text-[var(--text-muted)]'}`}>
              {isProcessing ? <span className="material-symbols-outlined text-4xl animate-spin">sync</span> : <span className="material-symbols-outlined text-4xl">upload</span>}
            </div>
            
            <div className="text-center px-4">
              <p className="text-[var(--text-color)] font-bold uppercase tracking-widest text-sm">
                {isProcessing ? 'Analyzing Geometry...' : (isDragging ? 'Drop to Scan' : 'Drop QR Code or Click')}
              </p>
              
              {error ? (
                <div className="flex items-center justify-center gap-2 mt-2 text-red-400">
                  <span className="material-symbols-outlined text-sm">error</span>
                  <p className="text-[0.6rem] uppercase tracking-widest font-bold">
                    {error}
                  </p>
                </div>
              ) : (
                <p className="text-[var(--text-muted)] text-[0.7rem] uppercase tracking-[0.2em] mt-1">
                  {isProcessing ? 'Decoding bitstream...' : 'Upload an image to decode'}
                </p>
              )}
            </div>
          </label>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            {previewUrl && (
              <div className="w-20 h-20 mx-auto rounded-xl border border-[var(--text-color)]/10 overflow-hidden glass-card p-1">
                <img src={previewUrl} alt="Matrix" className="w-full h-full object-cover rounded-lg" />
              </div>
            )}
            
            <div className="glass-card p-5 rounded-[1.2rem] border-cyan-500/20 bg-cyan-500/5 font-mono text-sm break-all max-h-40 overflow-y-auto custom-scrollbar text-cyan-50 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
              {result}
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={copyToClipboard}
                className="flex-1 h-12 bg-[var(--text-color)]/5 hover:bg-[var(--text-color)]/10 text-[var(--text-color)] rounded-[1rem] font-bold uppercase tracking-wider text-xs border border-[var(--text-color)]/10"
              >
                {copied ? <span className="material-symbols-outlined mr-2">check</span> : <span className="material-symbols-outlined mr-2">content_copy</span>}
                {copied ? 'Copied' : 'Copy'}
              </Button>
              <Button 
                onClick={() => {
                  onDecoded?.(result);
                  onClose();
                }}
                className="flex-1 h-12 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[1rem] font-bold uppercase tracking-wider text-xs shadow-[0_0_30px_rgba(34,211,238,0.3)]"
              >
                Use in Encode
              </Button>
            </div>

            <Button 
              variant="link" 
              onClick={() => {
                setResult(null);
                setPreviewUrl(null);
                setError(null);
              }}
              className="w-full text-[var(--text-muted)] hover:text-[var(--text-color)] text-[0.6rem] uppercase tracking-[0.4em] pointer-events-auto h-auto p-0"
            >
              Reset Scanner
            </Button>
          </div>
        )}

        <p className="text-[var(--text-muted)] text-[0.7rem] uppercase tracking-[0.4em] font-medium leading-relaxed">
          Extraction engine active. Upload image to decode.
        </p>
      </div>
    </div>
  );
};

export default QRDecoder;
