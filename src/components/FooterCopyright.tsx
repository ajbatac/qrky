import React from 'react';
import { Link } from 'react-router-dom';

const FooterCopyright: React.FC = () => {
  return (
    <footer className="text-center py-6 text-[var(--text-muted)] text-[11px] font-normal normal-case tracking-normal space-y-4">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 normal-case opacity-70 hover:opacity-100 transition-opacity">
        <span className="font-semibold text-[var(--text-color)]/40 mr-2">Legal:</span>
        <Link to="/terms" className="hover:text-[var(--text-color)] transition-colors">Terms of Service</Link>
        <Link to="/privacy" className="hover:text-[var(--text-color)] transition-colors">Privacy Policy</Link>
        <Link to="/dmca" className="hover:text-[var(--text-color)] transition-colors">DMCA Policy</Link>
        <Link to="/cookies" className="hover:text-[var(--text-color)] transition-colors">Cookie Policy</Link>
        <Link to="/disclaimer" className="hover:text-[var(--text-color)] transition-colors">Disclaimer</Link>
        <Link to="/ugc-disclaimer" className="hover:text-[var(--text-color)] transition-colors">UGC Disclaimer</Link>
      </div>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 normal-case opacity-50 hover:opacity-100 transition-opacity text-[10px]">
        <span className="font-semibold text-[var(--text-color)]/30 mr-2">Credits:</span>
        <a href="https://launch-wizard.techhive.net" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-color)] transition-colors underline decoration-white/10 hover:decoration-indigo-500/50 underline-offset-4">Checklist</a>
        <a href="https://kulay.ca" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-color)] transition-colors underline decoration-white/10 hover:decoration-indigo-500/50 underline-offset-4">Color Palette</a>
        <a href="https://favicon.love" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-color)] transition-colors underline decoration-white/10 hover:decoration-indigo-500/50 underline-offset-4">Favicon</a>
      </div>
      
      <div className="pt-4 border-t border-[var(--glass-border)] opacity-60">
        <div className="flex flex-wrap justify-center items-center gap-2">
          <span>Created with ❤️ by</span>
          <a 
            href="https://ajbatac.github.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[var(--text-color)] transition-all font-medium hover:underline underline-offset-4 decoration-indigo-500/20"
          >
            AJ Batac (@ajbatac)
          </a>
          <span className="opacity-30">•</span>
          <span className="font-semibold">© 2026</span>
          <span className="opacity-30">•</span>
          <Link to="/changelog" className="hover:text-[var(--text-color)] transition-colors font-medium">
            v2.5.0
          </Link>
          <span className="opacity-30">•</span>
          <a
            href="https://github.com/ajbatac/qrky"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-color)] transition-colors inline-flex items-center gap-1 font-medium bg-white/5 px-2 py-0.5 rounded-full hover:bg-indigo-500/10"
          >
            <span className="material-symbols-outlined text-[10px]">code</span>
            Open Source
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterCopyright;
