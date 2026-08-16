"use client";

import React, { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 50, suffix: '+', label: 'Critical CVEs Found', desc: 'CVSS 9.0+' },
  { value: 120, prefix: '$', suffix: 'K', label: 'Total Bounties Earned', desc: 'USD Lifetime' },
  { value: 99.8, suffix: '%', label: 'Report Acceptance Rate', desc: 'Across all platforms' },
  { value: 5, suffix: '+', label: 'Years Experience', desc: 'Enterprise pentesting' },
];

function CountUp({ target, prefix = '', suffix = '', duration = 2000 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current * 10) / 10);
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref} className="font-mono font-black" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#00FF41' }}>
      {prefix}{typeof target === 'number' && target % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}{suffix}
    </div>
  );
}

export default function CyberStats() {
  return (
    <section className="py-16 px-6" style={{ borderTop: '1px solid rgba(0,255,65,0.1)', borderBottom: '1px solid rgba(0,255,65,0.1)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="text-center p-6 transition-all duration-300"
            style={{
              background: 'rgba(0,255,65,0.02)',
              border: '1px solid rgba(0,255,65,0.08)',
            }}
          >
            <CountUp target={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={2000 + i * 200} />
            <div className="font-mono text-xs uppercase tracking-widest mt-2 mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {stat.label}
            </div>
            <div className="font-mono text-xs" style={{ color: 'rgba(0,255,65,0.4)' }}>
              {stat.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}