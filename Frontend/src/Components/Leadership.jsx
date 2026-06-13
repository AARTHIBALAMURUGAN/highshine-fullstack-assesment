import { useRef } from 'react';
import useScrollReveal from '../useScrollReveal';
import '../styles/Leadership.css';
const cultureStats = [
  { number: '45+', label: 'Team Members' },
  { number: '100%', label: 'Employee First' },
  { number: '4+', label: 'Years Strong' },
];
function Leadership(){
    const sectionRef=useRef(null);
    useScrollReveal(sectionRef);
    return(
        <section className="leadership" id="leadership" ref={sectionRef}>
            <div className="leadership-inner">
                <div className="leadership-image reveal-left">
                    <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
            alt="Highshine Leadership Team"
          />
          <div className="leadership-image-badge">
            <div className="leadership-badge-icon">👥</div>
            <div className="leadership-badge-text">
                <strong>Employee First</strong>
                <span>Culture & Values</span>
            </div>
          </div>
</div>

<div className="leadership-content reveal-right">
    <span className="leadership-tag">Leadership & Culture</span>
    <div className="leadership-block">
        <h2 className="leadership-heading">The Leadership</h2>
        <p className="leadership-text">
              Highshine is a labor of love for the founders, and we envision
              building it more like a family than an organization. To the
              leadership, the welfare of employees is of utmost importance.
            </p>
    </div>
    <div className="leadership-divider"></div>
    <div className="leadership-block">
        <h2 className="leadership-heading">Cultivating Growth</h2>
        <p className="leadership-text">
              At Highshine, we believe that a thriving team creates exceptional
              results for clients. We've built an employee-first culture where
              every voice matters and ideas shape our policies.
            </p>
            <p className="leadership-text">
              Our commitment to learning and development ensures that our team
              stays ahead of industry trends, equipped with the latest skills
              and knowledge to serve you better.
            </p>
            <p className="leadership-text">
              From collaborative workspaces to continuous training programs,
              we invest in our people because we know their growth is
              your success.
            </p>
    </div>
    <div className="leadership-stats">
        {cultureStats.map((stat) => (
            <div className="leadership-stat" key={stat.label}>
                <div className="leadership-stat-number">{stat.number}</div>
                <div className="leadership-stat-label">{stat.label}</div>
            </div>
        ))}
    </div>
</div>

            </div>
        </section>
    )

}
export default Leadership;
