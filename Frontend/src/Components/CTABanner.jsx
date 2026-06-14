import { useRef } from 'react';
import useScrollReveal from '../useScrollReveal';
import '../styles/CTABanner.css';
import { trackCTAClick } from '../analytics';

const trustItems = [
  { icon: '✅', text: 'No commitment required' },
  { icon: '⚡', text: 'Response within 24 hours' },
  { icon: '🌍', text: 'Serving clients globally' },
];
function CTABanner(){
    const sectionRef=useRef(null);
    useScrollReveal(sectionRef)
    return(
    <>
      <section className="cta-banner" ref={sectionRef}>
        <div className="cta-banner-inner">
          <div className="cta-banner-box">
            <div className="cta-orb cta-orb-1"></div>
            <div className="cta-orb cta-orb-2"></div>

            <div className="cta-banner-content">
              <h2 className="cta-banner-title">
                Empower your digital transformation today
              </h2>

              <a
                href="#contact"
                className="cta-banner-btn"
                onClick={() => trackCTAClick('schedule_consultation', 'cta_banner')}
              >
                Schedule a free consultation
                <span className="btn-arrow">›</span>
              </a>

              <div className="cta-trust">
                            {trustItems.map((item)=>(
                  <div className="cta-trust-item" key={item.text}>
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <img
              src="https://highshine.in/assets/images/logo/Highshine-2.svg"
              className="footer-logo-img"
              alt="Highshine IT Solutions"
            />
          </div>

          <p className="footer-copy">
            © 2024 Highshine IT Solutions Pvt. Ltd. All rights reserved.
          </p>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a
              href="https://highshine.in"
              target="_blank"
              rel="noreferrer"
            >
              Website
            </a>
          </div>

        </div>
      </footer>
    </>
  )

}
export default CTABanner;