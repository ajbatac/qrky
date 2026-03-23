# QRky - Stunning, Customizable QR Codes (Open Source)

QRky is a powerful, professional, and **open-source** web application for creating highly customizable QR codes. Designed for modern digital identity, it provides a real-time preview and advanced styling options—including colors, gradients, logos, and structural patterns—while maintaining a strict focus on privacy and local processing.

## Features

- **Open Source & Transparent**: Fully audited code for privacy and security. [View on GitHub](https://github.com/ajbatac/qrky).
- **Real-Time Preview**: Instant updates as you design.
- **Advanced Styling**: Granular control over colors, gradients, and patterns.
- **Logo Integration**: Embed branding directly into your QR codes.
- **Privacy First**: Local and offline processing with no cloud or database required.
- **WCAG Accessibility**: Built-in contrast analysis for inclusive design.
- **QR Code Decoder**: Built-in tool to read existing QR codes.

## 2026 Update (v2.0.0)

The application has undergone a major visual overhaul and architecture update:
- **Modernized UI**: Premium aesthetics with glassmorphism, smooth animations, and refined typography.
- **Improved Responsiveness**: Fixed layout issues on narrow monitors and optimized mobile experience.
- **Architecture**: Migrated to client-side routing for better navigation and performance.
- **Improved UX**: Simplified typography and refined theme customization experience.

## UI & Documentation Polish (v2.5.0 - March 2026)

This update focuses on visual refinement and transparency:
- **Refined Header**: Optimized horizontal layout with a natural information flow.
- **Transparency Badges**: Integrated feature badges for Open-Source, Privacy, and Accessibility.
- **Expanded Legal Pages**: Added comprehensive policies for DMCA, UGC, and better transparency.
- **Visual Polish**: Subtle background noise effects and sleek transitions throughout.

## Project Structure

The project is a standard Vite + React application with the following structure:

- **`public/`**: Contains static assets that are served directly.
- **`src/`**: Contains the main source code for the application.
  - **`components/`**: Main React components.
  - **`hooks/`**: Custom React hooks.
  - **`lib/`**: Utility functions and design logic.
  - **`main.tsx`**: Entry point.
  - **`index.css`**: Global styles and theme variables.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ajbatac/qrky.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd qrky
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Development

To start the development server, run:

```bash
npm run dev
```

This will start the application on `http://localhost:5173`.

### Production Build

To build the application for production, run:

```bash
npm run build
```

This will create a `dist/` directory with the optimized production build.

## Deployment

This project can be deployed to any static hosting service (Netlify, Vercel, etc.). Docker configurations are also provided for advanced deployment scenarios.

---

Created with ❤️ by [AJ Batac (@ajbatac) - v2.5.0](https://ajbatac.github.io) ([changelog](/changelog))
