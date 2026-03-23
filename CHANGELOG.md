# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.5.0] - 2026-03-23

### Added
- **Legal Infrastructure**:
  - Created `src/pages/legal/LegalLayout.tsx` for unified legal page styling.
  - Implemented `DMCA.tsx`, `Cookies.tsx`, `Disclaimer.tsx`, `UGCDisclaimer.tsx` in `src/pages/legal/`.
- **UI Elements**:
  - Integrated feature badges in `src/components/QRky.tsx` (Open-Source, Free, etc.).
  - Added background noise effect using SVG filter in `src/index.css`.

### Changed
- **Header Architecture**:
  - Refactored header in `src/components/QRky.tsx` from absolute/stacked to a `flex-row` horizontal layout.
  - Optimized for one-line natural flow with wider `max-w-xl`.
- **UI/UX Polish**:
  - Simplified typography across the application (removed `uppercase`, reduced `font-black` to `font-normal`/`font-medium`).
  - Refined theme switcher trigger in `src/components/QRky.tsx` to be a perfect circle with a sliding hover label.
  - Updated `FooterCopyright.tsx` with modern spacing and normal casing.
- **Branding & Metadata**:
  - Updated `public/manifest.webmanifest` with new branding and theme colors.
  - Integrated `og:image` and `twitter:image` supporting `/og.jpeg`.
  - Updated `README.md` and `sitemap.xml` for 2026 versioning.

### Technical Implementation

#### 1. Header Natural Flow Logic
Revised the header from a rigid absolute layout to a responsive flex container that balances branding and description:
```tsx
<div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
  <div className="flex items-center gap-4 md:gap-6 group cursor-pointer">
    <img src="/qrky-logo-small.png" className="w-10 h-10 md:w-16 md:h-16" />
    <h1 className="text-4xl md:text-6xl font-black">QRky</h1>
  </div>
  <div className="max-w-xs md:max-w-xl text-center md:text-right">
    <p className="text-[var(--text-muted)] text-[11px] md:text-sm leading-relaxed font-normal">
      Generate beautiful, personalized QR codes...
    </p>
  </div>
</div>
```

#### 2. Sliding Theme Customizer
Implemented a CSS-driven sliding label that expands from the circular theme trigger on hover:
```tsx
<div className="relative flex items-center group/btn cursor-pointer">
  <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center z-10">
    <span className="material-symbols-outlined animate-[spin_10s_linear_infinite]">palette</span>
  </div>
  <div className="absolute left-6 pl-8 pr-4 py-2 h-10 flex flex-col justify-center bg-white/5 backdrop-blur-md rounded-r-full border-white/10 -z-0 max-w-0 opacity-0 overflow-hidden group-hover/theme-menu:max-w-[180px] group-hover/theme-menu:opacity-100 transition-all duration-500 ease-in-out">
    <span className="text-[11px] text-white/90">Customize Themes</span>
  </div>
</div>
```

#### 3. Standardized Legal Layout
Developed `LegalLayout.tsx` as a Higher-Order Component/Wrapper to ensure policy documents maintain consistent branding while protecting technical paths:
```tsx
const LegalLayout = ({ children, title, lastUpdated }: LegalLayoutProps) => {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] p-8 md:p-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-black uppercase tracking-tighter">{title}</h1>
          <p className="text-[var(--text-muted)]">Last Updated: {lastUpdated}</p>
        </header>
        <div className="prose prose-invert prose-blue max-w-none">{children}</div>
      </div>
    </div>
  );
};
```

## [2.0.0] - 2026-01-15

### Changed
- **Architecture**: Migrated to `react-router-dom` for client-side routing.
  - Created `src/pages/Home.tsx` wrapper for main generator.
  - Created `src/pages/Changelog.tsx` for public changelog page.
  - Updated `src/main.tsx` to implement `BrowserRouter`.
- **UI/UX**: Comprehensive visual modernization.
  - Updated `src/index.css` with premium utility classes (`.elevated-card`, `.premium-button`, animations).
  - Refactored `src/components/QRky.tsx` to use responsive grid gaps (`gap-6 lg:gap-8 xl:gap-10`) solving narrow monitor spacing issues.
  - Softened shadows and borders for a modern look.
- **Documentation**:
  - Updated `README.md` with 2026 summary.
  - Created `public/rss.xml` for changelog feed.
  - Updated metadata (`sitemap.xml`, `robots.txt`).

## [1.1.0] - 2025-08-15

### Changed
- Updated the UI.
- Added instructions.
- Removed unused components.
- Added a logo.
- Linted.

## [1.0.0] - 2025-08-15

### Added

- Initial release of QRky.
- QR code generation with real-time preview.
- Customization options for colors, logos, and patterns.
- WCAG accessibility analysis for color contrast.
- QR code decoding from an uploaded image.
- Docker configurations for development and production.
- Comprehensive README and CHANGELOG.
