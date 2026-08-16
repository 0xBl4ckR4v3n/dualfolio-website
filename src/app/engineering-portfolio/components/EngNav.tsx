"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';

export default function EngNav() {
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
        background: scrolled ? 'rgba(15,25,35,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(56,189,248,0.12)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <AppLogo size={28} />
          <span className="font-sans font-bold text-sm uppercase tracking-widest" style={{ color: '#38BDF8' }}>
            DualFolio
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'About', href: '#hero' },
            { label: 'Projects', href: '#projects' },
            { label: 'Tech Stack', href: '#techstack' },
          ]?.map((item) => (
            <a
              key={item?.label}
              href={item?.href}
              className="font-sans text-xs uppercase tracking-widest transition-colors"
              style={{ color: 'rgba(56,189,248,0.5)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#38BDF8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(56,189,248,0.5)')}
            >
              {item?.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => router?.push('/cybersecurity-portfolio')}
            className="flex items-center gap-3 px-4 py-2 font-sans text-xs uppercase tracking-widest transition-all"
            style={{
              border: '1px solid rgba(0,255,65,0.25)',
              color: '#00FF41',
              background: 'rgba(0,255,65,0.04)',
            }}
          >
            <span>⇄</span>
            <span>Switch to Cyber</span>
          </button>
          <a
            href="mailto:contact@dualfolio.dev"
            className="px-5 py-2 font-sans text-xs uppercase tracking-widest font-bold transition-all"
            style={{
              background: 'rgba(56,189,248,0.1)',
              border: '1px solid rgba(56,189,248,0.4)',
              color: '#38BDF8',
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
          {[0, 1, 2]?.map((line) => (
            <span
              key={line}
              className="block w-5 h-0.5 transition-all duration-300"
              style={{
                background: '#38BDF8',
                transform: menuOpen && line === 0 ? 'rotate(45deg) translate(2px, 6px)' :
                  menuOpen && line === 2 ? 'rotate(-45deg) translate(2px, -6px)' : 'none',
                opacity: menuOpen && line === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-6 space-y-4"
          style={{
            background: 'rgba(15,25,35,0.97)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(56,189,248,0.1)',
          }}
        >
          {['About', 'Projects', 'Tech Stack']?.map((item) => (
            <a
              key={item}
              href={`#${item?.toLowerCase()?.replace(' ', '')}`}
              className="block font-sans text-sm uppercase tracking-widest py-2"
              style={{ color: 'rgba(56,189,248,0.6)' }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => router?.push('/cybersecurity-portfolio')}
            className="w-full mt-2 py-3 font-sans text-xs uppercase tracking-widest"
            style={{ border: '1px solid rgba(0,255,65,0.25)', color: '#00FF41' }}
          >
            ⇄ Switch to Cyber
          </button>
        </div>
      )}
    </header>
  );
}