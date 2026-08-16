"use client";

import React, { useRef, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';

const PROJECTS = [
{
  id: 1,
  title: 'Industrial HVAC System Redesign',
  category: 'MEP Engineering',
  type: 'HVAC · CFD Analysis',
  year: '2025',
  client: 'Confidential — Oil & Gas',
  description: 'Full redesign of HVAC distribution for a 40,000 m² refinery facility. Achieved 34% energy reduction through Ansys CFD simulation and SpaceClaim 3D modeling.',
  metrics: [
  { val: '34%', label: 'Energy Saved' },
  { val: '40K m²', label: 'Facility Area' },
  { val: '6 mo', label: 'Timeline' }],

  tags: ['Ansys CFD', 'SpaceClaim', 'HVAC', 'Energy Audit'],
  image: "https://images.unsplash.com/photo-1501621995263-5906333de3e7",
  imageAlt: 'Industrial HVAC ductwork system in a large facility with blue-tinted ambient lighting and steel mechanical infrastructure',
  accentColor: '#38BDF8'
},
{
  id: 2,
  title: 'Turbine Blade Fatigue Analysis',
  category: 'Aviation Mechanics',
  type: 'FEA · Structural Analysis',
  year: '2024',
  client: 'Aerospace MRO Partner',
  description: 'Finite element analysis of turbine blade fatigue under cyclic thermal loads. Identified stress concentration zones and extended blade service life by 18% through geometry optimization.',
  metrics: [
  { val: '18%', label: 'Life Extended' },
  { val: '1,200°C', label: 'Max Temp' },
  { val: '±0.02mm', label: 'Tolerance' }],

  tags: ['Ansys FEA', 'NX CAD', 'Fatigue', 'Thermal'],
  image: "https://images.unsplash.com/photo-1565389399445-ecc28708027c",
  imageAlt: 'Aircraft turbine engine close-up with dramatic backlit warm-toned exhaust glow against dark hangar background',
  accentColor: '#FF6B35'
},
{
  id: 3,
  title: 'Data Center Cooling Infrastructure',
  category: 'MEP Engineering',
  type: 'Thermal Management · CRAC',
  year: '2024',
  client: 'Tier III Data Center',
  description: 'Designed precision cooling infrastructure for a 2MW data center using hot-aisle/cold-aisle containment. Reduced PUE from 1.72 to 1.31 through CFD-optimized airflow modeling.',
  metrics: [
  { val: '1.31', label: 'PUE Achieved' },
  { val: '2 MW', label: 'IT Load' },
  { val: '24%', label: 'Cooling Cost ↓' }],

  tags: ['CRAC Units', 'Airflow CFD', 'AutoCAD MEP', 'Revit'],
  image: "https://images.unsplash.com/photo-1564457461758-8ff96e439e83",
  imageAlt: 'Data center server room with blue LED-lit server racks in a cool, dark, precisely organized environment with metal flooring',
  accentColor: '#9B59B6'
}];


export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef?.current?.querySelectorAll('.reveal');
    if (!cards) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.08 });
    cards?.forEach((card) => observer?.observe(card));
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="projects" className="py-24 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className="font-sans text-xs uppercase tracking-[0.4em] mb-3" style={{ color: 'rgba(56,189,248,0.5)' }}>
            ◈ Project Showcase
          </div>
          <h2
            className="font-sans font-black uppercase tracking-tight leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#E8F4FD' }}>
            
            Engineering <span className="thermal-text">Projects</span>
          </h2>
          <p className="font-sans text-sm mt-4 max-w-xl" style={{ color: 'rgba(232,244,253,0.4)' }}>
            Selected work across MEP systems, aviation mechanics, and computational analysis.
          </p>
        </div>

        {/* Projects — alternating layout */}
        <div className="space-y-12">
          {PROJECTS?.map((project, i) =>
          <div
            key={project?.id}
            className={`reveal grid lg:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
            style={{ transitionDelay: `${i * 100}ms` }}>
            
              {/* Image */}
              <div
              className={`relative overflow-hidden group eng-glow-hover ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}
              style={{ border: `1px solid ${project?.accentColor}25`, borderRadius: '4px' }}>
              
                <AppImage
                src={project?.image}
                alt={project?.imageAlt}
                width={600}
                height={380}
                className="w-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{ filter: 'saturate(0.75) contrast(1.05)', height: '280px' }} />
              
                {/* Thermal overlay */}
                <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: `linear-gradient(135deg, rgba(56,189,248,0.08) 0%, transparent 50%, ${project?.accentColor}15 100%)`, opacity: 0.4 }} />
              
                {/* Scan line */}
                <div className="scan-line-eng" />
                {/* Corner markers */}
                <div className="absolute top-3 left-3 w-4 h-4"
              style={{ borderTop: `2px solid ${project?.accentColor}60`, borderLeft: `2px solid ${project?.accentColor}60` }} />
                <div className="absolute bottom-3 right-3 w-4 h-4"
              style={{ borderBottom: `2px solid ${project?.accentColor}60`, borderRight: `2px solid ${project?.accentColor}60` }} />
              </div>

              {/* Content */}
              <div className={`space-y-5 ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="flex items-center gap-3">
                  <span
                  className="px-2 py-0.5 font-sans text-xs uppercase tracking-widest font-semibold"
                  style={{ background: `${project?.accentColor}12`, border: `1px solid ${project?.accentColor}35`, color: project?.accentColor }}>
                  
                    {project?.category}
                  </span>
                  <span className="font-sans text-xs" style={{ color: 'rgba(232,244,253,0.3)' }}>
                    {project?.year}
                  </span>
                </div>

                <h3
                className="font-sans font-black text-2xl lg:text-3xl leading-tight"
                style={{ color: '#E8F4FD' }}>
                
                  {project?.title}
                </h3>

                <div className="font-sans text-xs uppercase tracking-widest" style={{ color: 'rgba(56,189,248,0.5)' }}>
                  {project?.type} · {project?.client}
                </div>

                <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(232,244,253,0.5)' }}>
                  {project?.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {project?.metrics?.map((m) =>
                <div
                  key={m?.label}
                  className="p-3 text-center"
                  style={{ background: `${project?.accentColor}06`, border: `1px solid ${project?.accentColor}20` }}>
                  
                      <div className="font-sans font-black text-lg" style={{ color: project?.accentColor }}>
                        {m?.val}
                      </div>
                      <div className="font-sans text-xs mt-0.5" style={{ color: 'rgba(232,244,253,0.4)' }}>
                        {m?.label}
                      </div>
                    </div>
                )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project?.tags?.map((tag) =>
                <span
                  key={tag}
                  className="px-2 py-0.5 font-sans text-xs"
                  style={{ background: 'rgba(56,189,248,0.04)', border: '1px solid rgba(56,189,248,0.15)', color: 'rgba(56,189,248,0.6)' }}>
                  
                      {tag}
                    </span>
                )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}