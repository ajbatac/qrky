import React from 'react';

const FooterCopyright: React.FC = () => {
  return (
    <footer className="text-center p-4 text-gray-600">
      Created with ❤️ by{' '}
      <a
        href="https://ajbatac.github.io/?=QRky"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 hover:underline"
      >
        AJ Batac (@ajbatac)
      </a>{' '}
      - v1.1.0 (
      <a
        href="/changelog.html"
        target="_top"
        className="text-purple-600 hover:underline"
      >
        changelog
      </a>
      )
    </footer>
  );
};

export default FooterCopyright;
