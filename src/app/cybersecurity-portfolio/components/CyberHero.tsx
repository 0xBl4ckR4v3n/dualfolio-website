"use client";

import React, { useEffect, useRef, useState } from 'react';

const TYPED_STRINGS = [
  'Bug Bounty Hunter',
  'API Penetration Tester',
  'Network Security Analyst',
  'Zero-Day Researcher',
];

export default function CyberHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [typedText, setTypedText] = useState('');
  const [stringIdx, setStringIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  /* Matrix rain */
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

    const chars = '01アイウエオ{}[]<>/\\|;:ABCDEF'.split('');
    const fontSize = 12;
    let cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(8, 8, 16, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      cols = Math.floor(canvas.width / fontSize);
      while (drops.length < cols) drops.push(1);

      for (let i = 0; i < Math.min(drops.length, cols); i++) {
        const char = chars[(i * 7 + drops[i] * 3) % chars.length];
        const bright = drops[i] * fontSize < 60;
        ctx.fillStyle = bright ? 'rgba(0,255,65,0.9)' : `rgba(0,255,65,${0.1 + ((i * 13 + drops[i] * 5) % 8) * 0.04})`;
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && (i * 31 + Math.floor(drops[i])) % 100 < 4) drops[i] = 0;
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

  /* Typewriter */
  useEffect(() => {
    const current = TYPED_STRINGS[stringIdx];
    const speed = deleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setTypedText(current.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), 1800);
      } else if (deleting && charIdx > 0) {
        setTypedText(current.slice(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      } else if (deleting && charIdx === 0) {
        setDeleting(false);
        setStringIdx((stringIdx + 1) % TYPED_STRINGS.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, stringIdx]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <canvas ref={canvasRef} className="matrix-canvas" style={{ opacity: 0.18 }} />
      <div className="scan-line-overlay" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(0,255,65,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div className="space-y-8">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs uppercase tracking-widest"
            style={{ background: 'rgba(0,255,65,0.06)', border: '1px solid rgba(0,255,65,0.25)', color: '#00FF41' }}>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block" />
            Status: Actively Hunting
          </div>

          <div>
            <h1
              className="font-mono font-black uppercase tracking-tighter leading-none"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: '#ffffff' }}
            >
              Zero-Day
              <br />
              <span style={{ color: '#00FF41' }} className="cyber-text-glow">
                Researcher
              </span>
            </h1>
            <div
              className="mt-4 font-mono font-bold typing-cursor"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: '#9B59B6' }}
            >
              {typedText}
            </div>
          </div>

          <p className="font-mono text-sm leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
            5+ years hunting critical vulnerabilities in enterprise systems. Specializing in API security,
            network penetration testing, and zero-day discovery across Fortune 500 infrastructure.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#platforms"
              className="px-8 py-4 font-mono text-xs uppercase tracking-[0.3em] font-bold transition-all duration-300 animate-glow-pulse"
              style={{
                background: 'rgba(0,255,65,0.12)',
                border: '1px solid rgba(0,255,65,0.5)',
                color: '#00FF41',
              }}
            >
              View Bug Bounty Profiles
            </a>
            <a
              href="#reports"
              className="px-8 py-4 font-mono text-xs uppercase tracking-[0.3em] transition-all duration-300"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Security Writeups
            </a>
          </div>
        </div>

        {/* Right: Terminal window */}
        <div className="terminal-window animate-glow-pulse">
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: '#FF5F57' }} />
            <div className="terminal-dot" style={{ background: '#FEBC2E' }} />
            <div className="terminal-dot" style={{ background: '#28C840' }} />
            <span className="font-mono text-xs ml-3" style={{ color: 'rgba(0,255,65,0.4)' }}>
              ~/recon/target_enum.sh
            </span>
          </div>
          <div className="p-6 font-mono text-xs space-y-2" style={{ color: 'rgba(0,255,65,0.8)' }}>
            {[
              { prompt: '$', cmd: 'nmap -sV -p- --script vuln target.corp', delay: 0 },
              { prompt: '>', cmd: 'Scanning 65535 ports...', delay: 1 },
              { prompt: '>', cmd: '[CRITICAL] CVE-2024-XXXX detected on :8443', delay: 2, red: true },
              { prompt: '>', cmd: 'SQL Injection vector identified in /api/v2/users', delay: 3, red: true },
              { prompt: '$', cmd: 'python3 exploit.py --target 10.0.0.1 --port 8443', delay: 4 },
              { prompt: '>', cmd: 'Privilege escalation successful. Root obtained.', delay: 5, green: true },
              { prompt: '>', cmd: 'Generating PoC report...', delay: 6 },
              { prompt: '>', cmd: '✓ Report submitted to HackerOne #2847361', delay: 7, green: true },
            ].map((line, i) => (
              <div key={i} className="flex gap-3 animate-fadeSlideIn" style={{ animationDelay: `${i * 150}ms`, opacity: 0, animationFillMode: 'forwards' }}>
                <span style={{ color: line.red ? '#FF5F57' : line.green ? '#28C840' : 'rgba(0,255,65,0.4)' }}>
                  {line.prompt}
                </span>
                <span style={{ color: line.red ? '#FF6B6B' : line.green ? '#00FF41' : 'rgba(0,255,65,0.7)' }}>
                  {line.cmd}
                </span>
              </div>
            ))}
            <div className="flex gap-3 mt-2">
              <span style={{ color: 'rgba(0,255,65,0.4)' }}>$</span>
              <span className="typing-cursor" style={{ color: '#00FF41' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #080810)' }}
      />
    </section>
  );
}