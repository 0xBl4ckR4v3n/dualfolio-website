"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';

/* ─── Matrix Rain Canvas ─────────────────────────────────────────── */
function MatrixRain({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ'.split('');
    const fontSize = 13;
    let cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(8, 8, 16, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px monospace`;

      cols = Math.floor(canvas.width / fontSize);
      while (drops.length < cols) drops.push(1);

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(i * 7.3 + drops[i] * 3.1) % chars.length];
        const alpha = 0.3 + ((i * 13 + drops[i] * 7) % 10) * 0.07;
        ctx.globalAlpha = alpha;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        ctx.globalAlpha = 1;
        if (drops[i] * fontSize > canvas.height && (i * 31 + drops[i]) % 100 < 5) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
      style={{ opacity: active ? 0.35 : 0.18, transition: 'opacity 0.5s ease' }}
    />
  );
}

/* ─── Blueprint Grid Overlay ─────────────────────────────────────── */
function BlueprintOverlay({ active }: { active: boolean }) {
  return (
    <div
      className="absolute inset-0 blueprint-grid pointer-events-none"
      style={{ opacity: active ? 0.9 : 0.5, transition: 'opacity 0.5s ease' }}
    />
  );
}

/* ─── Fluid Heatmap SVG ─────────────────────────────────────────── */
function HeatmapAnimation({ active }: { active: boolean }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: active ? 0.35 : 0.15, transition: 'opacity 0.5s ease' }}
    >
      <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="hot1" cx="30%" cy="60%" r="40%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F97316" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hot2" cx="70%" cy="40%" r="35%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1E3A5F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cold1" cx="50%" cy="80%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0F1923" stopOpacity="0" />
          </radialGradient>
          <filter id="blur-heatmap">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <rect width="400" height="300" fill="url(#cold1)" filter="url(#blur-heatmap)" />
        <rect width="400" height="300" fill="url(#hot1)" filter="url(#blur-heatmap)">
          <animateTransform attributeName="transform" type="translate" values="0,0;20,-10;-10,15;0,0" dur="8s" repeatCount="indefinite" />
        </rect>
        <rect width="400" height="300" fill="url(#hot2)" filter="url(#blur-heatmap)">
          <animateTransform attributeName="transform" type="translate" values="0,0;-15,10;10,-20;0,0" dur="10s" repeatCount="indefinite" />
        </rect>
        {/* Wireframe grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`h${i}`} x1="0" y1={i * 60} x2="400" y2={i * 60} stroke="rgba(56,189,248,0.15)" strokeWidth="0.5" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="300" stroke="rgba(56,189,248,0.15)" strokeWidth="0.5" />
        ))}
      </svg>
    </div>
  );
}

/* ─── Main Landing Page ──────────────────────────────────────────── */
type HoverSide = 'left' | 'right' | null;

export default function LandingPage() {
  const router = useRouter();
  const [hovered, setHovered] = useState<HoverSide>(null);
  const [clicked, setClicked] = useState<HoverSide>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleClick = useCallback((side: 'left' | 'right') => {
    setClicked(side);
    setTimeout(() => {
      router.push(side === 'left' ? '/cybersecurity-portfolio' : '/engineering-portfolio');
    }, 600);
  }, [router]);

  const leftWidth = isMobile ? '100%' : hovered === 'left' ? '70%' : hovered === 'right' ? '30%' : '50%';
  const rightWidth = isMobile ? '100%' : hovered === 'right' ? '70%' : hovered === 'left' ? '30%' : '50%';

  return (
    <div
      className="relative w-screen h-screen overflow-hidden flex"
      style={{ flexDirection: isMobile ? 'column' : 'row' }}
    >
      {/* ── Shared top nav ── */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center py-5 pointer-events-none">
        <div className="flex items-center gap-3">
          <AppLogo size={32} />
          <span className="font-mono text-lg font-bold tracking-widest text-white/80 uppercase">
            DualFolio
          </span>
        </div>
      </div>

      {/* ── CENTER DIVIDER ── */}
      {!isMobile && (
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{
            left: hovered === 'left' ? '70%' : hovered === 'right' ? '30%' : '50%',
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent)',
            transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      )}

      {/* ════════════════════════════════════════
          LEFT SIDE — CYBERSECURITY
      ════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden cursor-pointer flex-shrink-0"
        style={{
          width: leftWidth,
          height: isMobile ? '50%' : '100%',
          transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1), height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          background: '#080810',
          opacity: clicked === 'right' ? 0 : 1,
        }}
        onMouseEnter={() => setHovered('left')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => handleClick('left')}
      >
        <MatrixRain active={hovered === 'left'} />
        <div className="scan-line-overlay" />

        {/* Radial overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 40% 50%, rgba(0,255,65,0.06) 0%, transparent 70%)',
            transition: 'opacity 0.5s ease',
            opacity: hovered === 'left' ? 1 : 0.4,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-20 text-center">
          {/* Label */}
          <div
            className="mb-6 px-3 py-1 border font-mono text-xs uppercase tracking-widest"
            style={{
              borderColor: 'rgba(0,255,65,0.3)',
              color: '#00FF41',
              background: 'rgba(0,255,65,0.05)',
            }}
          >
            <span className="animate-pulse">▶</span> CYBER_SECURITY
          </div>

          {/* Heading */}
          <h1
            className="font-mono font-black uppercase tracking-tighter leading-none mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 6rem)',
              color: '#ffffff',
              textShadow: hovered === 'left' ? '0 0 40px rgba(0,255,65,0.4)' : 'none',
              transition: 'text-shadow 0.5s ease',
            }}
          >
            Bug Bounty
            <br />
            <span style={{ color: '#00FF41' }} className="cyber-text-glow">
              Hunter
            </span>
          </h1>

          <p
            className="font-mono text-sm uppercase tracking-widest mb-10 max-w-xs"
            style={{ color: 'rgba(0,255,65,0.5)' }}
          >
            5+ Years · Enterprise Pentesting · API / Network Security
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-8 mb-10">
            {[
              { val: '50+', label: 'CVEs Found' },
              { val: '$120K', label: 'Total Bounties' },
              { val: '4', label: 'Platforms' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-mono font-black text-2xl"
                  style={{ color: '#00FF41' }}
                >
                  {s.val}
                </div>
                <div
                  className="font-mono text-xs uppercase tracking-widest mt-1"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            className="relative font-mono text-xs uppercase tracking-[0.3em] px-8 py-4 font-bold overflow-hidden"
            style={{
              background: 'rgba(0,255,65,0.08)',
              border: '1px solid rgba(0,255,65,0.4)',
              color: '#00FF41',
              transition: 'all 0.3s ease',
            }}
          >
            <span className="relative z-10">Enter_Cyber_Mode →</span>
          </button>

          {/* Corner brackets */}
          <div
            className="absolute top-16 left-8 w-8 h-8 pointer-events-none"
            style={{
              borderTop: '2px solid rgba(0,255,65,0.4)',
              borderLeft: '2px solid rgba(0,255,65,0.4)',
              opacity: hovered === 'left' ? 1 : 0.3,
              transition: 'opacity 0.4s ease',
            }}
          />
          <div
            className="absolute bottom-8 right-8 w-8 h-8 pointer-events-none"
            style={{
              borderBottom: '2px solid rgba(0,255,65,0.4)',
              borderRight: '2px solid rgba(0,255,65,0.4)',
              opacity: hovered === 'left' ? 1 : 0.3,
              transition: 'opacity 0.4s ease',
            }}
          />
          <div
            className="absolute bottom-8 left-8 w-8 h-8 pointer-events-none"
            style={{
              borderBottom: '2px solid rgba(0,255,65,0.4)',
              borderLeft: '2px solid rgba(0,255,65,0.4)',
              opacity: hovered === 'left' ? 1 : 0.3,
              transition: 'opacity 0.4s ease',
            }}
          />
          <div
            className="absolute top-16 right-8 w-8 h-8 pointer-events-none"
            style={{
              borderTop: '2px solid rgba(0,255,65,0.4)',
              borderRight: '2px solid rgba(0,255,65,0.4)',
              opacity: hovered === 'left' ? 1 : 0.3,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Hover expand indicator */}
          {hovered !== 'left' && !isMobile && (
            <div
              className="absolute right-4 top-1/2 font-mono text-xs"
              style={{
                color: 'rgba(0,255,65,0.3)',
                writingMode: 'vertical-rl',
                transform: 'translateY(-50%) rotate(180deg)',
              }}
            >
              HOVER TO EXPAND · CLICK TO ENTER
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════
          RIGHT SIDE — ENGINEERING
      ════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden cursor-pointer flex-shrink-0"
        style={{
          width: rightWidth,
          height: isMobile ? '50%' : '100%',
          transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1), height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          background: '#0F1923',
          opacity: clicked === 'left' ? 0 : 1,
        }}
        onMouseEnter={() => setHovered('right')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => handleClick('right')}
      >
        <BlueprintOverlay active={hovered === 'right'} />
        <HeatmapAnimation active={hovered === 'right'} />
        <div className="scan-line-eng" />

        {/* Radial overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 60% 50%, rgba(255,107,53,0.06) 0%, transparent 70%)',
            opacity: hovered === 'right' ? 1 : 0.4,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-20 text-center">
          {/* Label */}
          <div
            className="mb-6 px-3 py-1 border font-sans text-xs uppercase tracking-widest"
            style={{
              borderColor: 'rgba(56,189,248,0.3)',
              color: '#38BDF8',
              background: 'rgba(56,189,248,0.05)',
            }}
          >
            ◈ POWER_ENGINEERING
          </div>

          {/* Heading */}
          <h2
            className="font-sans font-black uppercase tracking-tight leading-none mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 6rem)',
              color: '#E8F4FD',
            }}
          >
            MEP Systems
            <br />
            <span className="thermal-text">Engineer</span>
          </h2>

          <p
            className="font-sans text-sm uppercase tracking-widest mb-10 max-w-xs"
            style={{ color: 'rgba(56,189,248,0.5)' }}
          >
            CAD · HVAC · Aviation Mechanics · Ansys CFD
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-8 mb-10">
            {[
              { val: '12+', label: 'Projects' },
              { val: '3D', label: 'CAD Expert' },
              { val: '8+', label: 'Years Exp' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-sans font-black text-2xl"
                  style={{ color: '#38BDF8' }}
                >
                  {s.val}
                </div>
                <div
                  className="font-sans text-xs uppercase tracking-widest mt-1"
                  style={{ color: 'rgba(232,244,253,0.3)' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            className="font-sans text-xs uppercase tracking-[0.3em] px-8 py-4 font-bold"
            style={{
              background: 'rgba(56,189,248,0.08)',
              border: '1px solid rgba(56,189,248,0.4)',
              color: '#38BDF8',
              transition: 'all 0.3s ease',
            }}
          >
            Enter_Engineering_Mode →
          </button>

          {/* Corner brackets */}
          <div
            className="absolute top-16 left-8 w-8 h-8 pointer-events-none"
            style={{
              borderTop: '2px solid rgba(56,189,248,0.4)',
              borderLeft: '2px solid rgba(56,189,248,0.4)',
              opacity: hovered === 'right' ? 1 : 0.3,
              transition: 'opacity 0.4s ease',
            }}
          />
          <div
            className="absolute bottom-8 right-8 w-8 h-8 pointer-events-none"
            style={{
              borderBottom: '2px solid rgba(255,107,53,0.4)',
              borderRight: '2px solid rgba(255,107,53,0.4)',
              opacity: hovered === 'right' ? 1 : 0.3,
              transition: 'opacity 0.4s ease',
            }}
          />
          <div
            className="absolute bottom-8 left-8 w-8 h-8 pointer-events-none"
            style={{
              borderBottom: '2px solid rgba(56,189,248,0.4)',
              borderLeft: '2px solid rgba(56,189,248,0.4)',
              opacity: hovered === 'right' ? 1 : 0.3,
              transition: 'opacity 0.4s ease',
            }}
          />
          <div
            className="absolute top-16 right-8 w-8 h-8 pointer-events-none"
            style={{
              borderTop: '2px solid rgba(255,107,53,0.4)',
              borderRight: '2px solid rgba(255,107,53,0.4)',
              opacity: hovered === 'right' ? 1 : 0.3,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Hover expand indicator */}
          {hovered !== 'right' && !isMobile && (
            <div
              className="absolute left-4 top-1/2 font-sans text-xs"
              style={{
                color: 'rgba(56,189,248,0.3)',
                writingMode: 'vertical-rl',
                transform: 'translateY(-50%)',
              }}
            >
              HOVER TO EXPAND · CLICK TO ENTER
            </div>
          )}
        </div>
      </div>
    </div>
  );
}