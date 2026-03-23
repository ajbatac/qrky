import React from 'react';
import LegalLayout from './LegalLayout';

const DMCAPolicy: React.FC = () => {
  return (
    <LegalLayout title="DMCA Policy">
      <section className="space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-widest text-cyan-400">1. Reporting Infringement</h2>
        <p>
          QRky respects the intellectual property rights of others. If you believe your copyright-protected work has been used on our Service in a way that constitutes infringement, please notify our agent at legal@qrky.dev.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-purple-400">2. Notification Details</h2>
        <p>
          Your notification must include:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm pl-4">
          <li>A description of the copyrighted work claimed to be infringed.</li>
          <li>Accurate contact information, including your full name, email, and address.</li>
          <li>A statement that you have a good-faith belief that the use of the material is not authorized.</li>
          <li>A physical or electronic signature of the copyright owner or authorized representative.</li>
        </ul>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-blue-400">3. Action Taken</h2>
        <p>
          Upon receipt of a valid DMCA notice, we will investigate and take appropriate action, including removal of infringing links or termination of access to the Service.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-emerald-400">4. Counter-Notification</h2>
        <p>
          If you believe your content was removed in error, you may file a counter-notification detailing why the removal was a mistake. We will follow standard DMCA procedures for handling counter-notices.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-amber-400">5. Repeat Infringers</h2>
        <p>
          We maintain a policy of terminating the accounts of users who are found to be repeat infringers of intellectual property rights.
        </p>
      </section>
    </LegalLayout>
  );
};

export default DMCAPolicy;
