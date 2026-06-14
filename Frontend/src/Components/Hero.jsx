import React from 'react';
import '../styles/Hero.css';
import { trackCTAClick } from '../analytics';

const stats = [
  { number: '300%', label: 'Year-over-Year Growth' },
  { number: '45+', label: 'Team Members' },
  { number: '50+', label: 'Clients Served' },
  { number: '4+', label: 'Years of Excellence' },
];

function Hero() {
  
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <span className="hero-tag">About Us</span>

        <h1 className="hero-title">
          Our Journey
          <span>Highshine IT Solutions</span>
        </h1>

        <p className="hero-description">
          Traditionally, many organizations have approached ERP implementation
          as just another project, where service providers focus mainly on
          completing the setup and moving on. But in reality, ERP is far more
          than a system installation. It has the potential to reshape how a
          business operates, how teams collaborate, and how decisions are made.
        </p>

        <div className="hero-buttons">
          <a
            href="#contact"
            className="btn-gold"
            onClick={() => trackCTAClick('schedule_consultation', 'hero')}
          >
            Schedule a Free Consultation
          </a>
          <a
            href="#about"
            className="btn-outline"
            onClick={() => trackCTAClick('learn_more', 'hero')}
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="hero-stats">
        <div className="hero-stats-inner">
          {stats.map((stat, index) => (
            <React.Fragment key={stat.label}>
              <div className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
              {index < stats.length - 1 && (
                <div className="stat-divider"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Hero;