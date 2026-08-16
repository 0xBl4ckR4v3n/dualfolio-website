import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function CyberFooter() {
  return (
    <footer
      className="py-10 px-6"
      style={{ borderTop: '1px solid rgba(0,255,65,0.1)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <AppLogo size={22} />
          <span className="font-mono text-sm font-bold uppercase tracking-widest" style={{ color: '#00FF41' }}>
            DualFolio
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/" className="font-mono text-xs uppercase tracking-widest transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Home
          </Link>
          <Link href="/engineering-portfolio" className="font-mono text-xs uppercase tracking-widest transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Engineering
          </Link>
          <a href="#" className="font-mono text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Privacy
          </a>
        </div>

        <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
          © 2026 DualFolio
        </p>
      </div>
    </footer>
  );
}