import React, { useState, useRef } from 'react';
import jsQR from 'jsqr';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const QRCodeDecoder: React.FC = () => {
  const [decodedData, setDecodedData] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: 'Error',
          description: 'File size should not exceed 5MB.',
          variant: 'destructive',
        });
        return;
      }

      setStatus('loading');
      setDecodedData(null);
      setImageSrc(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImageSrc(result);
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const scale = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;
          const context = canvas.getContext('2d');
          if (context) {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
              setDecodedData(code.data);
              setStatus('success');
              toast({
                title: 'QR Code Decoded!',
                description: 'The decoded data is now available.',
              });
            } else {
              setDecodedData(null);
              setStatus('error');
              toast({
                title: 'Error',
                description: 'Could not decode QR code. Please try a clearer image.',
                variant: 'destructive',
              });
            }
          } else {
            setStatus('error');
          }
        };
        img.onerror = () => {
          setStatus('error');
          toast({
            title: 'Error',
            description: 'Could not load the image file.',
            variant: 'destructive',
          });
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="qr-code-upload" className="font-semibold text-base">Upload QR Code Image</Label>
        <Input
          id="qr-code-upload"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="w-full"
        />
      </div>
      {imageSrc && (
        <div className="space-y-3">
          <Label>Image Preview</Label>
          <img src={imageSrc} alt="QR Code Preview" className="rounded-md border max-w-xs mx-auto h-auto" />
        </div>
      )}
      {status === 'loading' && <p className="text-center">Decoding...</p>}
      {status === 'success' && decodedData && (
        <div className="space-y-3">
          <Label htmlFor="decoded-data" className="font-semibold text-base">Decoded Data</Label>
          <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm">{decodedData}</pre>
          <Button onClick={() => navigator.clipboard.writeText(decodedData)}>
            Copy to Clipboard
          </Button>
        </div>
      )}
      {status === 'error' && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">
          <p className="font-semibold">Decoding Failed</p>
          <p className="text-sm">Could not find a QR code in the image. Please try a different or clearer image.</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeDecoder;
