import { useRef } from "react";
import useScrollReveal from '../useScrollReveal';
import "../styles/IndustryGap.css"

function IndustryGap(){
 const sectionRef = useRef(null);
   useScrollReveal(sectionRef);
   
    return(
        <section className="industry-gap" id="about" ref={sectionRef}>
            <div className="industry-gap-inner">
                <div className="industry-gap-content reveal-left">
                    <span className="industry-gap-tag">The Problem</span>
                    <h2 className="industry-gap-title">The Industry Gap</h2>
                      <p className="industry-gap-text">
            While most ERP providers emphasize the implementation as the key
            phase, we see the real work beginning after that. When a business
            starts using the software day-to-day, that's when the
            transformation truly unfolds.
          </p>

          <p className="industry-gap-text">
            This is the moment Highshine steps in as a committed partner,
            ensuring that our clients realize the full value of their
            ERP investment.
          </p>

          <div className="industry-gap-quote">
            <p>"The real transformation begins after go-live."</p>
          </div>
                </div>
                <div className="industry-gap-image reveal-right">
            <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
            alt="Team collaborating around ERP system"/>

            <div className="industry-gap-image-badge">
                <div className="badge-icon">b</div>
                <div className="badge-text">
                    <strong>Post Go-Live Support</strong>
                    <span>Always committed</span>
                </div>
            </div>
                </div>
            </div>
        </section>
    )
}
export default IndustryGap;
