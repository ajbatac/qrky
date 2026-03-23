import React from 'react';
import LegalLayout from './LegalLayout';

const CookiePolicy: React.FC = () => {
  return (
    <LegalLayout title="Cookie Policy">
      <section className="space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-widest text-cyan-400">1. What are Cookies?</h2>
        <p>
          Cookies and local storage are small data files stored on your computer or device when you use our Service. They help us remember your preferences and provide a consistent experience.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-purple-400">2. Essential Storage</h2>
        <p>
          We use local storage (similar to cookies) to store the following functionality:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm pl-4">
          <li>Theme Settings: So the app remembers your chosen theme (Dark, Light, Sepia, etc.).</li>
          <li>Recent Creations: To maintain a list of your most recently generated QR codes on your device.</li>
          <li>Active Panels: To keep your current workflow consistent across page refreshes.</li>
        </ul>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-blue-400">3. Analytics and Performance</h2>
        <p>
          We may use basic analytical cookies provided by our hosting partners to understand how users interact with the site and to monitor the performance of our Service. These cookies do not collect personal identification data.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-emerald-400">4. Your Choices</h2>
        <p>
          You can clear your cookies and local storage through your browser settings. Most modern browsers allow you to block cookies entirely or clear them after each session. Note that doing so will reset your theme and delete the history of your recent creations on your device.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-amber-400">5. Updates</h2>
        <p>
          This policy may be updated occasionally. Any changes will be reflected here on this page.
        </p>
      </section>
    </LegalLayout>
  );
};

export default CookiePolicy;
