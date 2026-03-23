import React from 'react';
import LegalLayout from './LegalLayout';

const TermsOfService: React.FC = () => {
  return (
    <LegalLayout title="Terms of Service">
      <section className="space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-widest text-cyan-400">1. Acceptance of Terms</h2>
        <p>
          By accessing or using QRky (the "Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-purple-400">2. Use of Service</h2>
        <p>
          QRky provides tools to generate and decode QR codes. You are granted a non-exclusive, non-transferable right to use the Service for personal or commercial purposes, subject to these terms.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-blue-400">3. User Conduct</h2>
        <p>
          You agree not to use the Service to generate QR codes containing illegal content, malware, phishing links, or any material that violates the rights of others. We reserve the right to restrict access to users who violate these guidelines.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-emerald-400">4. Intellectual Property</h2>
        <p>
          All software, designs, and brand elements related to QRky are the exclusive property of QRky. You retain ownership of the data you input, but you grant us the necessary rights to process that data to generate your QR codes.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-amber-400">5. Limitation of Liability</h2>
        <p>
          The Service is provided "as is" and "as available." QRky makes no warranties regarding the accuracy or scannability of generated codes. We are not liable for any direct or indirect damages resulting from your use of the platform.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-rose-400">6. Modifications</h2>
        <p>
          We may update these terms occasionally. Your continued use of the Service after changes constitute acceptance of the new terms.
        </p>
      </section>
    </LegalLayout>
  );
};

export default TermsOfService;
