"use client";

import React, { useRef, useEffect, useState } from 'react';

/* Simulated Medium RSS writeups */
const WRITEUPS = [
  {
    id: 1,
    title: 'How I Found a Critical IDOR in a Fortune 500 Payment API',
    platform: 'HackerOne',
    severity: 'CRITICAL',
    cvss: '9.8',
    date: '2025-11-14',
    readTime: '12 min',
    tags: ['IDOR', 'API Security', 'Payment Systems'],
    excerpt: 'A parameter pollution vulnerability in the checkout endpoint allowed me to access any user\'s payment details by manipulating the order_id field. The bug affected 2.3M active users.',
    reward: '$18,500',
    cve: 'CVE-2025-47821',
  },
  {
    id: 2,
    title: 'Chaining XSS + CSRF to Full Account Takeover on SaaS Platform',
    platform: 'YesWeHack',
    severity: 'HIGH',
    cvss: '8.1',
    date: '2025-09-02',
    readTime: '9 min',
    tags: ['XSS', 'CSRF', 'Account Takeover'],
    excerpt: 'A stored XSS in the markdown renderer combined with a missing SameSite cookie attribute enabled a one-click account takeover via a malicious shared document link.',
    reward: '$7,200',
    cve: null,
  },
  {
    id: 3,
    title: 'Pre-Auth RCE via Deserialization in Enterprise VPN Appliance',
    platform: 'Bugcrowd',
    severity: 'CRITICAL',
    cvss: '10.0',
    date: '2025-06-18',
    readTime: '18 min',
    tags: ['RCE', 'Deserialization', 'Network'],
    excerpt: 'Java deserialization vulnerability in the authentication endpoint of a widely deployed enterprise VPN allowed unauthenticated remote code execution as root.',
    reward: '$25,000',
    cve: 'CVE-2025-31042',
  },
];

const SEVERITY_COLORS: Record<string, string> = {
  CRITICAL: '#FF3D3D',
  HIGH: '#FF6B35',
  MEDIUM: '#FBBF24',
  LOW: '#38BDF8',
  INFO: '#9B59B6',
};

export default function SecurityReports() {
  const sectionRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.reveal');
    if (!cards) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="reports" className="py-24 px-6" ref={sectionRef}
      style={{ background: 'rgba(0,255,65,0.01)', borderTop: '1px solid rgba(0,255,65,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className="font-mono text-xs uppercase tracking-[0.4em] mb-3" style={{ color: 'rgba(0,255,65,0.5)' }}>
            {'>'} Security Writeups
          </div>
          <h2
            className="font-mono font-black uppercase tracking-tighter leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#ffffff' }}
          >
            Vulnerability <span style={{ color: '#00FF41' }}>Reports</span>
          </h2>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'rgba(0,255,65,0.4)' }}>
              Simulated RSS feed — Medium/@dualfolio_sec
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {WRITEUPS.map((report, i) => (
            <div
              key={report.id}
              className="reveal terminal-window transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Terminal header */}
              <div className="terminal-header justify-between">
                <div className="flex items-center gap-2">
                  <div className="terminal-dot" style={{ background: '#FF5F57' }} />
                  <div className="terminal-dot" style={{ background: '#FEBC2E' }} />
                  <div className="terminal-dot" style={{ background: '#28C840' }} />
                  <span className="font-mono text-xs ml-2" style={{ color: 'rgba(0,255,65,0.4)' }}>
                    report_{report.id.toString().padStart(4, '0')}.md
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className="px-2 py-0.5 font-mono text-xs font-bold"
                    style={{
                      background: `${SEVERITY_COLORS[report.severity]}15`,
                      border: `1px solid ${SEVERITY_COLORS[report.severity]}50`,
                      color: SEVERITY_COLORS[report.severity],
                    }}
                  >
                    {report.severity} · CVSS {report.cvss}
                  </span>
                  <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    {report.date}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <button
                  className="w-full text-left"
                  onClick={() => setExpanded(expanded === report.id ? null : report.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3
                        className="font-mono font-bold text-base mb-2 leading-snug transition-colors"
                        style={{ color: expanded === report.id ? '#00FF41' : '#ffffff' }}
                      >
                        {report.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {report.platform}
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                        <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {report.readTime} read
                        </span>
                        {report.cve && (
                          <>
                            <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                            <span className="font-mono text-xs" style={{ color: '#FF6B35' }}>
                              {report.cve}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="font-mono font-black text-lg" style={{ color: '#00FF41' }}>
                        {report.reward}
                      </div>
                      <span
                        className="font-mono text-xs transition-transform duration-300 inline-block"
                        style={{
                          color: 'rgba(0,255,65,0.4)',
                          transform: expanded === report.id ? 'rotate(90deg)' : 'rotate(0deg)',
                        }}
                      >
                        ▶
                      </span>
                    </div>
                  </div>
                </button>

                {/* Expandable content */}
                <div
                  style={{
                    maxHeight: expanded === report.id ? '400px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(0,255,65,0.1)' }}>
                    <p className="font-mono text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {report.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {report.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 font-mono text-xs"
                          style={{ background: 'rgba(155,89,182,0.08)', border: '1px solid rgba(155,89,182,0.2)', color: '#9B59B6' }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors"
                      style={{ color: 'rgba(0,255,65,0.6)' }}
                    >
                      Read Full Writeup on Medium →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}