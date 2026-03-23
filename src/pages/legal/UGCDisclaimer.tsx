import React from 'react';
import LegalLayout from './LegalLayout';

const UGCDisclaimer: React.FC = () => {
  return (
    <LegalLayout title="UGC Disclaimer">
      <section className="space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-widest text-cyan-400">1. User Generated Content (UGC)</h2>
        <p>
          User-Generated Content (UGC) refers to any information, text, URLs, images, or data you provide to generate or decode a QR code. QRky does not pre-screen or proactively review the content of QR codes created through our platform.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-purple-400">2. User Responsibility</h2>
        <p>
          You are solely responsible for any content you generate using QRky. You represent and warrant that you have the right to use the content and that your use does not violate any laws, copyrights, or the rights of any third party.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-blue-400">3. No Endorsement</h2>
        <p>
          The fact that a QR code was generated with QRky does not imply any endorsement or approval by us. We do not support or verify the accuracy, reliability, or quality of any content encoded in a QR code.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-emerald-400">4. Prohibited Content</h2>
        <p>
          Generation of QR codes that contain malicious links, phishing sites, or promote illegal activities is strictly prohibited. Use of our logo or brand in conjunction with prohibited content is a violation of our terms.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-amber-400">5. Report Misuse</h2>
        <p>
          If you encounter a QR code generated with our platform that you believe is malicious or violates our terms, please report it to us at abuse@qrky.dev.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-rose-400">6. Monitoring and Moderation</h2>
        <p>
          While we do not actively monitor all content, we reserve the right to block or restrict access to our Service for any users who engage in activities that we deem harmful or inappropriate.
        </p>
      </section>
    </LegalLayout>
  );
};

export default UGCDisclaimer;
