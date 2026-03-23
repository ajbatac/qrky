import React from 'react';
import FooterCopyright from '../../components/FooterCopyright';
import { Button } from '@/components/ui/button';

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] flex flex-col items-center py-12 px-6">
      <div className="mesh-gradient" />
      <div className="bg-noise" />
      
      <div className="w-full max-w-4xl space-y-8 z-10">
        <div className="flex flex-col gap-4">
          <Button variant="ghost" className="w-fit pl-0 hover:bg-transparent text-[var(--text-muted)] hover:text-[var(--text-color)]" asChild>
            <a href="/" className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Generator
            </a>
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {title}
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
        </div>

        <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-[var(--glass-border)] shadow-[var(--glass-shadow)] space-y-6 text-[var(--text-color)]/80 leading-relaxed font-medium">
          {children}
        </div>
      </div>

      <div className="mt-12 w-full max-w-4xl px-6">
        <FooterCopyright />
      </div>
    </div>
  );
};

export default LegalLayout;
