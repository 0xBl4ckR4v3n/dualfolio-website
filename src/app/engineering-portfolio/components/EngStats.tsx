"use client";

import React, { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 12, suffix: '+', label: 'CAD Projects Delivered', unit: 'Industrial & Aerospace' },
  { value: 8, suffix: '+', label: 'Years of Experience', unit: 'MEP Engineering' },
  { value: 99.4, suffix: '%', label: 'Simulation Accuracy', unit: 'vs Physical Tests' },
  { value: 3, suffix: 'x', label: 'Energy Efficiency Gains', unit: 'Avg HVAC Optimization' },
];

function CountUpEng({ target, suffix = '', duration = 2000 }: {
  target: number; suffix?: string; duration?: number;
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
    <div ref={ref} className="font-sans font-black" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#38BDF8' }}>
      {typeof target === 'number' && target % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}{suffix}
    </div>
  );
}

export default function EngStats() {
  return (
    <section
      className="py-14 px-6"
      style={{ borderTop: '1px solid rgba(56,189,248,0.1)', borderBottom: '1px solid rgba(56,189,248,0.1)' }}
    >
      {/* Thermal bar */}
      <div className="h-1 thermal-bar mb-10 max-w-7xl mx-auto" />

      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="p-6 transition-all duration-300 eng-glow-hover"
            style={{ background: 'rgba(56,189,248,0.02)', border: '1px solid rgba(56,189,248,0.1)' }}
          >
            <CountUpEng target={stat.value} suffix={stat.suffix} duration={2000 + i * 200} />
            <div className="font-sans text-sm font-semibold mt-2 mb-1" style={{ color: 'rgba(232,244,253,0.8)' }}>
              {stat.label}
            </div>
            <div className="font-sans text-xs" style={{ color: 'rgba(56,189,248,0.4)' }}>
              {stat.unit}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}