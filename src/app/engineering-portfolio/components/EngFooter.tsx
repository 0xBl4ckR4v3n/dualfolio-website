import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function EngFooter() {
  return (
    <footer
      className="py-10 px-6"
      style={{ borderTop: '1px solid rgba(56,189,248,0.1)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <AppLogo size={22} />
          <span className="font-sans text-sm font-bold uppercase tracking-widest" style={{ color: '#38BDF8' }}>
            DualFolio
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/" className="font-sans text-xs uppercase tracking-widest transition-colors" style={{ color: 'rgba(232,244,253,0.3)' }}>
            Home
          </Link>
          <Link href="/cybersecurity-portfolio" className="font-sans text-xs uppercase tracking-widest transition-colors" style={{ color: 'rgba(232,244,253,0.3)' }}>
            Cybersecurity
          </Link>
          <a href="#" className="font-sans text-xs uppercase tracking-widest" style={{ color: 'rgba(232,244,253,0.3)' }}>
            Privacy
          </a>
        </div>

        <p className="font-sans text-xs uppercase tracking-widest" style={{ color: 'rgba(232,244,253,0.2)' }}>
          © 2026 DualFolio
        </p>
      </div>
    </footer>
  );
}