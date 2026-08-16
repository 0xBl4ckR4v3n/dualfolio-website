"use client";

import React, { useRef, useEffect } from 'react';

const PLATFORMS = [
  {
    name: 'HackerOne',
    handle: '@0xdualfolio',
    rank: 'Top 500',
    findings: 23,
    bounties: '$68,400',
    reputation: '4,820',
    color: '#FF6B35',
    bg: 'rgba(255,107,53,0.06)',
    border: 'rgba(255,107,53,0.25)',
    description: 'Critical & High severity bugs in enterprise SaaS, payment processors, and cloud infrastructure.',
    badges: ['API Security', 'IDOR', 'Auth Bypass'],
    href: 'https://hackerone.com',
  },
  {
    name: 'YesWeHack',
    handle: '@dualfolio_sec',
    rank: 'Elite Hunter',
    findings: 14,
    bounties: '$31,200',
    reputation: '2,340',
    color: '#00FF41',
    bg: 'rgba(0,255,65,0.04)',
    border: 'rgba(0,255,65,0.2)',
    description: 'European bug bounty programs focusing on fintech, healthcare, and government systems.',
    badges: ['XSS', 'SQLi', 'RCE'],
    href: 'https://yeswehack.com',
  },
  {
    name: 'Bugcrowd',
    handle: '@dualfolio',
    rank: 'Researcher L3',
    findings: 9,
    bounties: '$14,700',
    reputation: '1,890',
    color: '#9B59B6',
    bg: 'rgba(155,89,182,0.05)',
    border: 'rgba(155,89,182,0.25)',
    description: 'IoT and embedded systems vulnerability research across automotive and industrial sectors.',
    badges: ['IoT', 'Firmware', 'Network'],
    href: 'https://bugcrowd.com',
  },
  {
    name: 'Intigriti',
    handle: '@dualfolio_eu',
    rank: 'Trusted Researcher',
    findings: 7,
    bounties: '$8,900',
    reputation: '1,240',
    color: '#38BDF8',
    bg: 'rgba(56,189,248,0.04)',
    border: 'rgba(56,189,248,0.2)',
    description: 'EU-focused programs with emphasis on GDPR-sensitive data exposure and authentication flaws.',
    badges: ['SSRF', 'XXE', 'OAuth'],
    href: 'https://intigriti.com',
  },
];

export default function BugBountyPlatforms() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef?.current?.querySelectorAll('.reveal');
    if (!cards) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    cards?.forEach((card) => observer?.observe(card));
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="platforms" className="py-24 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className="font-mono text-xs uppercase tracking-[0.4em] mb-3" style={{ color: 'rgba(0,255,65,0.5)' }}>
            {'>'} Bug Bounty Profiles
          </div>
          <h2
            className="font-mono font-black uppercase tracking-tighter leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#ffffff' }}
          >
            Active <span style={{ color: '#00FF41' }}>Hunting</span> Platforms
          </h2>
          <p className="font-mono text-sm mt-4 max-w-xl" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Registered researcher on 4 major bug bounty platforms. 53 total findings, $123K+ in rewards.
          </p>
        </div>

        {/* BENTO GRID AUDIT:
            Array has 4 cards: [HackerOne, YesWeHack, Bugcrowd, Intigriti]
            Row 1: [col-1: HackerOne cs-1] [col-2: YesWeHack cs-1] [col-3: Bugcrowd cs-1] [col-4: Intigriti cs-1]
            Placed 4/4 ✓
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLATFORMS?.map((platform, i) => (
            <a
              key={platform?.name}
              href={platform?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal platform-badge block p-6 transition-all duration-400 cyber-glow-hover group"
              style={{
                background: platform?.bg,
                border: `1px solid ${platform?.border}`,
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Platform name */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div
                    className="font-mono font-black text-lg uppercase tracking-tight"
                    style={{ color: platform?.color }}
                  >
                    {platform?.name}
                  </div>
                  <div className="font-mono text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {platform?.handle}
                  </div>
                </div>
                <div
                  className="px-2 py-0.5 font-mono text-xs"
                  style={{ background: `${platform?.color}15`, border: `1px solid ${platform?.color}40`, color: platform?.color }}
                >
                  {platform?.rank}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { val: platform?.findings, label: 'Bugs' },
                  { val: platform?.bounties, label: 'Earned' },
                  { val: platform?.reputation, label: 'Rep' },
                ]?.map((s) => (
                  <div key={s?.label} className="text-center">
                    <div className="font-mono font-bold text-sm" style={{ color: '#ffffff' }}>{s?.val}</div>
                    <div className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>{s?.label}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="font-mono text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {platform?.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                {platform?.badges?.map((badge) => (
                  <span
                    key={badge}
                    className="px-2 py-0.5 font-mono text-xs"
                    style={{ background: 'rgba(0,255,65,0.05)', border: '1px solid rgba(0,255,65,0.15)', color: 'rgba(0,255,65,0.6)' }}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div
                className="mt-4 font-mono text-xs uppercase tracking-widest transition-all duration-300"
                style={{ color: platform?.color, opacity: 0.5 }}
              >
                View Profile →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}