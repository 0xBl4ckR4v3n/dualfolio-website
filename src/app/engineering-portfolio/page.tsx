import React from 'react';
import EngNav from './components/EngNav';
import EngHero from './components/EngHero';
import EngStats from './components/EngStats';
import ProjectShowcase from './components/ProjectShowcase';
import TechStack from './components/TechStack';
import EngFooter from './components/EngFooter';

export default function EngineeringPortfolio() {
  return (
    <div className="eng-bg min-h-screen blueprint-grid">
      <EngNav />
      <EngHero />
      <EngStats />
      <ProjectShowcase />
      <TechStack />
      <EngFooter />
    </div>
  );
}