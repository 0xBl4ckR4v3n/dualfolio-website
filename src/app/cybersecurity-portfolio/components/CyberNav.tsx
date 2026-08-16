"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';

export default function CyberNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8,8,16,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,255,65,0.1)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <AppLogo size={28} />
          <span className="font-mono font-bold text-sm uppercase tracking-widest" style={{ color: '#00FF41' }}>
            DualFolio
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'About', href: '#hero' },
            { label: 'Platforms', href: '#platforms' },
            { label: 'Reports', href: '#reports' },
          ]?.map((item) => (
            <a
              key={item?.label}
              href={item?.href}
              className="font-mono text-xs uppercase tracking-widest transition-colors"
              style={{ color: 'rgba(0,255,65,0.5)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00FF41')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(0,255,65,0.5)')}
            >
              {item?.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Persona Toggle */}
          <button
            onClick={() => router?.push('/engineering-portfolio')}
            className="flex items-center gap-3 px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all"
            style={{
              border: '1px solid rgba(56,189,248,0.3)',
              color: '#38BDF8',
              background: 'rgba(56,189,248,0.05)',
            }}
          >
            <span>⇄</span>
            <span>Switch to Engineering</span>
          </button>
          <a
            href="mailto:contact@dualfolio.dev"
            className="px-5 py-2 font-mono text-xs uppercase tracking-widest font-bold transition-all"
            style={{
              background: 'rgba(0,255,65,0.1)',
              border: '1px solid rgba(0,255,65,0.4)',
              color: '#00FF41',
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: '#00FF41',
              transform: menuOpen ? 'rotate(45deg) translate(2px, 6px)' : 'none',
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: '#00FF41',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: '#00FF41',
              transform: menuOpen ? 'rotate(-45deg) translate(2px, -6px)' : 'none',
            }}
          />
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-6 space-y-4"
          style={{
            background: 'rgba(8,8,16,0.97)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(0,255,65,0.1)',
          }}
        >
          {['About', 'Platforms', 'Reports']?.map((item) => (
            <a
              key={item}
              href={`#${item?.toLowerCase()}`}
              className="block font-mono text-sm uppercase tracking-widest py-2"
              style={{ color: 'rgba(0,255,65,0.6)' }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => router?.push('/engineering-portfolio')}
            className="w-full mt-2 py-3 font-mono text-xs uppercase tracking-widest"
            style={{ border: '1px solid rgba(56,189,248,0.3)', color: '#38BDF8' }}
          >
            ⇄ Switch to Engineering
          </button>
        </div>
      )}
    </header>
  );
}