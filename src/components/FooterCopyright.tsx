import React from 'react';

const FooterCopyright: React.FC = () => {
  return (
    <footer className="text-center p-4 text-gray-600">
      Created with ❤️ by{' '}
      <a
        href="https://ajbatac.github.io/?=QRky"
        target="_blank"
        rel="noopener noreferrer"
        className="text-grey-100 hover:underline"
      >
        AJ Batac (@ajbatac)
      </a>{' '}
      - v1.2 (
      <a
        href="/changelog.html"
        target="_top"
        className="text-grey-100 hover:underline"
      >
        changelog
      </a>
      )
      {' '}
      -
      {' '}
      <a
        href="https://github.com/ajbatac/qrky"
        target="_top"
        className="text-grey-100 hover:underline"
      >
      Open Source
      </a>
    </footer>
  );
};

export default FooterCopyright;
