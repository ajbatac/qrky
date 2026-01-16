# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
