# QRky - Stunning, Customizable QR Codes

QRky is a powerful web application for creating highly customizable QR codes. With a real-time preview, you can design QR codes with advanced styling options, including colors, gradients, logos, and various patterns.

## Features

- **Real-Time Preview**: See your QR code design update instantly as you make changes.
- **Advanced Styling**: Customize everything from colors and gradients to patterns and borders.
- **Logo Embedding**: Add your own logo to the center of the QR code.
- **Background Options**: Choose between solid colors, gradients, or a custom background image.
- **WCAG Accessibility Analysis**: Ensure your QR code is accessible with a real-time contrast ratio checker.
- **QR Code Decoder**: Upload an image to decode a QR code and see its contents.

## Project Structure

The project is a standard Vite + React application with the following structure:

- **`public/`**: Contains static assets that are served directly.
- **`src/`**: Contains the main source code for the application.
  - **`components/`**: Contains the main React components for the application.
    - **`ui/`**: Contains reusable UI components like buttons, inputs, and sliders.
    - **`BackgroundCustomizer.tsx`**: Component for customizing the QR code's background.
    - **`ColorPicker.tsx`**: Component for selecting the foreground and background colors.
    - **`LogoUploader.tsx`**: Component for uploading and customizing a logo.
    - **`QRCodeDecoder.tsx`**: Component for decoding QR codes from an uploaded image.
    - **`QRCodeGenerator.tsx`**: Component that renders the QR code canvas.
    - **`QRky.tsx`**: The main application component that ties everything together.
    - **`StyleCustomizer.tsx`**: Component for customizing the QR code's pattern and border.
    - **`WCAGAnalyzer.tsx`**: Component that analyzes the color contrast for accessibility.
  - **`hooks/`**: Contains custom React hooks.
  - **`lib/`**: Contains utility functions.
  - **`main.tsx`**: The entry point for the React application.
  - **`index.css`**: The main stylesheet for the application.

## Dependencies

- **`react`**: A JavaScript library for building user interfaces.
- **`vite`**: A fast build tool for modern web projects.
- **`tailwindcss`**: A utility-first CSS framework for rapid UI development.
- **`qrcode`**: A library for generating QR codes.
- **`jsqr`**: A library for decoding QR codes from images.
- **`lucide-react`**: A library of simply beautiful icons.
- **`@radix-ui/react-*`**: A collection of accessible UI components.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/qrky.git
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

This project can be deployed to any static hosting service. For more advanced deployments, Docker configurations are provided.

---

Created with ❤️ by [AJ Batac (@ajbatac)](https://ajbatac.github.io/?=QRky) - v1.0.0 ([changelog](/public/changelog.html))
