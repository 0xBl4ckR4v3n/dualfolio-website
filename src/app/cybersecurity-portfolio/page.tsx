import React from 'react';
import CyberNav from './components/CyberNav';
import CyberHero from './components/CyberHero';
import BugBountyPlatforms from './components/BugBountyPlatforms';
import SecurityReports from './components/SecurityReports';
import CyberStats from './components/CyberStats';
import CyberFooter from './components/CyberFooter';

export default function CybersecurityPortfolio() {
  return (
    <div className="cyber-bg min-h-screen grid-tech-cyber">
      <CyberNav />
      <CyberHero />
      <CyberStats />
      <BugBountyPlatforms />
      <SecurityReports />
      <CyberFooter />
    </div>
  );
}