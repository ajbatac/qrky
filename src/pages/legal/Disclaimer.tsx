import React from 'react';
import LegalLayout from './LegalLayout';

const Disclaimer: React.FC = () => {
  return (
    <LegalLayout title="Disclaimer">
      <section className="space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-widest text-cyan-400">1. Accuracy and Performance</h2>
        <p>
          QRky provided by AJ Batac is an experimental tool for generating and decoding QR codes. While we strive for accuracy, we cannot guarantee that every generated QR code will be scannable on all devices or with all readers.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-purple-400">2. Limitation of Responsibility</h2>
        <p>
          We are not responsible for how you use the Service or the content you encode into the QR codes you generate. We have no control over the websites or data linked by your QR codes and assume no liability for their content.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-blue-400">3. Technical Availability</h2>
        <p>
          QRky is provided "as is." We do not guarantee that the Service will be available at all times without interruption or that it will be free from technical errors.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-emerald-400">4. Third-Party Links</h2>
        <p>
          Our Service may link to third-party websites or tools. We are not responsible for the privacy practices, products, or services of these external sites.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-amber-400">5. Use at Your Own Risk</h2>
        <p>
          Your use of QRky is entirely at your own risk. You are responsible for testing and verifying any QR code before using it in professional or commercial settings.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-rose-400">6. Modifications</h2>
        <p>
          We reserve the right to modify, suspend, or discontinue the Service at any time without prior notice.
        </p>
      </section>
    </LegalLayout>
  );
};

export default Disclaimer;
