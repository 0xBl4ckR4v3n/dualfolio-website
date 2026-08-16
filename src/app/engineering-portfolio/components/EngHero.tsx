"use client";

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function EngHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef?.current?.querySelectorAll('.reveal');
    if (!els) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    els?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      ref={sectionRef}>
      
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-70" />
      <div className="scan-line-eng" />

      {/* Thermal radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, rgba(255,107,53,0.06) 0%, rgba(56,189,248,0.04) 40%, transparent 70%)'
        }} />
      

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div className="space-y-8">
          {/* Eyebrow */}
          <div
            className="reveal inline-flex items-center gap-3 px-3 py-1.5 font-sans text-xs uppercase tracking-widest"
            style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)', color: '#38BDF8' }}>
            
            <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ background: '#38BDF8' }} />
            MEP Systems · Aviation Mechanics
          </div>

          <h1
            className="reveal font-sans font-black uppercase tracking-tight leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', color: '#E8F4FD' }}>
            
            Precision
            <br />
            <span className="thermal-text">Engineering</span>
            <br />
            <span style={{ color: '#E8F4FD' }}>Systems</span>
          </h1>

          <p className="reveal font-sans text-base leading-relaxed max-w-lg" style={{ color: 'rgba(232,244,253,0.5)' }}>
            8+ years designing MEP systems, 3D CAD modeling, and HVAC optimization for industrial
            and aerospace applications. Certified in Ansys, SpaceClaim, and AutoCAD.
          </p>

          {/* Thermal bar */}
          <div className="reveal">
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-xs uppercase tracking-widest" style={{ color: 'rgba(56,189,248,0.5)' }}>
                CFD Thermal Analysis Range
              </span>
              <span className="font-sans text-xs" style={{ color: 'rgba(255,107,53,0.6)' }}>
                -40°C → 1,200°C
              </span>
            </div>
            <div className="h-2 rounded-full thermal-bar" />
            <div className="flex justify-between mt-1">
              <span className="font-sans text-xs" style={{ color: 'rgba(56,189,248,0.4)' }}>COLD</span>
              <span className="font-sans text-xs" style={{ color: 'rgba(255,107,53,0.4)' }}>HOT</span>
            </div>
          </div>

          <div className="reveal flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-8 py-4 font-sans text-xs uppercase tracking-[0.3em] font-bold transition-all duration-300 animate-glow-pulse-eng"
              style={{
                background: 'rgba(56,189,248,0.1)',
                border: '1px solid rgba(56,189,248,0.4)',
                color: '#38BDF8'
              }}>
              
              View Projects
            </a>
            <a
              href="#techstack"
              className="px-8 py-4 font-sans text-xs uppercase tracking-[0.3em] transition-all duration-300"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(232,244,253,0.4)' }}>
              
              Tech Stack
            </a>
          </div>
        </div>

        {/* Right: Engineering showcase */}
        <div className="reveal relative">
          {/* Main image */}
          <div
            className="relative overflow-hidden eng-glow"
            style={{ border: '1px solid rgba(56,189,248,0.2)', borderRadius: '4px' }}>
            
            <AppImage
              src="https://img.rocket.new/generatedImages/rocket_gen_img_1394a91a7-1768388573387.png"
              alt="Industrial HVAC engineering system with blue-lit ductwork and mechanical components in a clean facility environment"
              width={600}
              height={420}
              className="w-full object-cover"
              style={{ filter: 'saturate(0.7) contrast(1.1)' }} />
            
            {/* Thermal overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, transparent 50%, rgba(255,107,53,0.1) 100%)' }} />
            
            {/* Scan line */}
            <div className="scan-line-eng" />

            {/* Corner markers */}
            <div className="absolute top-3 left-3 w-5 h-5 pointer-events-none"
            style={{ borderTop: '2px solid rgba(56,189,248,0.6)', borderLeft: '2px solid rgba(56,189,248,0.6)' }} />
            <div className="absolute top-3 right-3 w-5 h-5 pointer-events-none"
            style={{ borderTop: '2px solid rgba(56,189,248,0.6)', borderRight: '2px solid rgba(56,189,248,0.6)' }} />
            <div className="absolute bottom-3 left-3 w-5 h-5 pointer-events-none"
            style={{ borderBottom: '2px solid rgba(255,107,53,0.6)', borderLeft: '2px solid rgba(255,107,53,0.6)' }} />
            <div className="absolute bottom-3 right-3 w-5 h-5 pointer-events-none"
            style={{ borderBottom: '2px solid rgba(255,107,53,0.6)', borderRight: '2px solid rgba(255,107,53,0.6)' }} />
          </div>

          {/* Floating stat cards */}
          <div
            className="absolute -top-4 -right-4 px-4 py-3 animate-float glass-eng"
            style={{ borderRadius: '4px' }}>
            
            <div className="font-sans font-black text-xl" style={{ color: '#38BDF8' }}>ISO 9001</div>
            <div className="font-sans text-xs uppercase tracking-widest mt-0.5" style={{ color: 'rgba(232,244,253,0.4)' }}>
              Certified
            </div>
          </div>

          <div
            className="absolute -bottom-4 -left-4 px-4 py-3 glass-eng"
            style={{ borderRadius: '4px' }}>
            
            <div className="font-sans font-black text-xl" style={{ color: '#FF6B35' }}>Ansys R24</div>
            <div className="font-sans text-xs uppercase tracking-widest mt-0.5" style={{ color: 'rgba(232,244,253,0.4)' }}>
              CFD / FEA Expert
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0F1923)' }} />
      
    </section>);

}