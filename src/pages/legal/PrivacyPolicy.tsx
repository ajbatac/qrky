import React from 'react';
import LegalLayout from './LegalLayout';

const PrivacyPolicy: React.FC = () => {
  return (
    <LegalLayout title="Privacy Policy">
      <section className="space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-widest text-cyan-400">1. Data Storage</h2>
        <p>
          QRky is a browser-centric tool. Your QR code data is processed locally in your browser. We do not store the content of your QR codes on our servers.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-purple-400">2. Cookies and Storage</h2>
        <p>
          We use local storage and basic cookies to save your theme preferences and your most recent QR creations. These remain on your device and are not shared with us or third parties.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-blue-400">3. Information We Collect</h2>
        <p>
          We do not collect personal identification information. We may collect anonymous analytical data to improve the performance and features of the Service.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-emerald-400">4. Third-Party Services</h2>
        <p>
          The Service may be hosted on platforms like Vercel or Netlify. These providers may collect basic traffic logs as part of their standard operations.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-amber-400">5. Changes to Policy</h2>
        <p>
          Any changes to our Privacy Policy will be reflected here. We encourage users to review this policy periodically.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-rose-400">6. Contact Us</h2>
        <p>
          If you have questions about this policy, please contact us through our official support channels or at legal@qrky.dev.
        </p>
      </section>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
