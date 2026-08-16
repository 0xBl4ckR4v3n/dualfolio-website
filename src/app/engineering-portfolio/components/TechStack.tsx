"use client";

import React, { useRef, useEffect } from 'react';

const TECH_CATEGORIES = [
  {
    category: 'CAD & 3D Modeling',
    code: 'CAT_01',
    tools: [
      { name: 'Ansys SpaceClaim', version: 'R24.1', proficiency: 95, role: 'Primary 3D Modeler' },
      { name: 'AutoCAD MEP', version: '2025', proficiency: 92, role: 'MEP Drafting' },
      { name: 'Autodesk Revit', version: '2025', proficiency: 88, role: 'BIM Coordination' },
      { name: 'SolidWorks', version: '2024 SP3', proficiency: 84, role: 'Mechanical Design' },
    ],
  },
  {
    category: 'Simulation & Analysis',
    code: 'CAT_02',
    tools: [
      { name: 'Ansys Fluent', version: 'R24.1', proficiency: 93, role: 'CFD Analysis' },
      { name: 'Ansys Mechanical', version: 'R24.1', proficiency: 90, role: 'FEA / Structural' },
      { name: 'MATLAB', version: 'R2024b', proficiency: 85, role: 'Numerical Analysis' },
      { name: 'Python (NumPy/SciPy)', version: '3.12', proficiency: 78, role: 'Data Processing' },
    ],
  },
  {
    category: 'MEP & Building Systems',
    code: 'CAT_03',
    tools: [
      { name: 'HAP (Carrier)', version: '5.12', proficiency: 91, role: 'HVAC Load Calc' },
      { name: 'EnergyPlus', version: '24.1', proficiency: 82, role: 'Energy Modeling' },
      { name: 'Navisworks', version: '2025', proficiency: 87, role: 'Clash Detection' },
      { name: 'AutoCAD Electrical', version: '2025', proficiency: 79, role: 'Panel Schematics' },
    ],
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef?.current?.querySelectorAll('.reveal');
    if (!els) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    els?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="techstack"
      className="py-24 px-6"
      ref={sectionRef}
      style={{ borderTop: '1px solid rgba(56,189,248,0.08)', background: 'rgba(56,189,248,0.01)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className="font-sans text-xs uppercase tracking-[0.4em] mb-3" style={{ color: 'rgba(56,189,248,0.5)' }}>
            ◈ Technical Specification Sheet
          </div>
          <h2
            className="font-sans font-black uppercase tracking-tight leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#E8F4FD' }}
          >
            Engineering <span className="thermal-text">Toolchain</span>
          </h2>
        </div>

        {/* Spec sheet grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {TECH_CATEGORIES?.map((cat, ci) => (
            <div
              key={cat?.code}
              className="reveal"
              style={{ transitionDelay: `${ci * 100}ms` }}
            >
              {/* Category header */}
              <div
                className="px-4 py-3 mb-0 flex items-center justify-between"
                style={{
                  background: 'rgba(56,189,248,0.06)',
                  border: '1px solid rgba(56,189,248,0.2)',
                  borderBottom: 'none',
                }}
              >
                <span className="font-sans font-bold text-sm uppercase tracking-widest" style={{ color: '#38BDF8' }}>
                  {cat?.category}
                </span>
                <span className="font-sans text-xs" style={{ color: 'rgba(56,189,248,0.3)' }}>
                  {cat?.code}
                </span>
              </div>

              {/* Tools list — spec sheet style */}
              <div style={{ border: '1px solid rgba(56,189,248,0.15)' }}>
                {cat?.tools?.map((tool, ti) => (
                  <div
                    key={tool?.name}
                    className="spec-row px-4 py-3"
                    style={{ borderBottom: ti < cat?.tools?.length - 1 ? '1px solid rgba(56,189,248,0.08)' : 'none' }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-sans font-semibold text-sm" style={{ color: '#E8F4FD' }}>
                          {tool?.name}
                        </div>
                        <div className="font-sans text-xs mt-0.5" style={{ color: 'rgba(56,189,248,0.4)' }}>
                          {tool?.role}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className="font-sans text-xs px-1.5 py-0.5"
                          style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)', color: 'rgba(56,189,248,0.6)' }}
                        >
                          v{tool?.version}
                        </span>
                        <span className="font-sans text-xs font-bold" style={{ color: tool?.proficiency >= 90 ? '#FF6B35' : '#38BDF8' }}>
                          {tool?.proficiency}%
                        </span>
                      </div>
                    </div>

                    {/* Proficiency bar */}
                    <div className="h-1 rounded-full" style={{ background: 'rgba(56,189,248,0.08)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${tool?.proficiency}%`,
                          background: tool?.proficiency >= 90
                            ? 'linear-gradient(90deg, #38BDF8, #FF6B35)'
                            : 'linear-gradient(90deg, #1E3A5F, #38BDF8)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications row */}
        <div className="mt-12 reveal">
          <div
            className="p-6"
            style={{ border: '1px solid rgba(56,189,248,0.15)', background: 'rgba(56,189,248,0.02)' }}
          >
            <div className="font-sans text-xs uppercase tracking-[0.4em] mb-6" style={{ color: 'rgba(56,189,248,0.4)' }}>
              Active Certifications & Compliance
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { cert: 'ISO 9001:2015', body: 'Quality Management' },
                { cert: 'ASHRAE 90.1', body: 'Energy Efficiency' },
                { cert: 'LEED AP', body: 'Green Building' },
                { cert: 'IATA CAT-A', body: 'Aviation Mechanics' },
              ]?.map((c) => (
                <div
                  key={c?.cert}
                  className="p-4 text-center transition-all duration-300 eng-glow-hover"
                  style={{ border: '1px solid rgba(255,107,53,0.2)', background: 'rgba(255,107,53,0.03)' }}
                >
                  <div className="font-sans font-black text-sm" style={{ color: '#FF6B35' }}>
                    {c?.cert}
                  </div>
                  <div className="font-sans text-xs mt-1" style={{ color: 'rgba(232,244,253,0.35)' }}>
                    {c?.body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}