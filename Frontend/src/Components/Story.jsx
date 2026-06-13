import { useEffect,useRef } from "react";
import useScrollReveal from '../useScrollReveal';

import "../styles/Story.css"

function Story(){

    const sectionRef=useRef(null);
    useScrollReveal(sectionRef);
    
    return(
        <section className="story" id="story" ref={sectionRef}>
            <div className="story-inner">
                <div className="story-images reveal-left">
                    <div className="story-img-wrapper">
                        <img
              src="/ceo1.jpg"
              alt="Hari Gautham - Founder"
              
            />
                    </div>
                    <div className="story-img-wrapper">
                        <img
              src="/ceo2.jpg"
              alt="Surendar - Co-Founder"
            />
                    </div>
                </div>
                <div className="story-content reveal-right">
                    <h2 className="story-title">
                        Story of HighShine
                    </h2>
                    <p className="story-text">
                       Our founder, Mr. Hari Gautham, is creating a community of experts
            dedicated to viewing each implementation as a lifelong commitment
            to our clients' success. 
                    </p>
                    <p className="story-text">
            Our co-founder, Mr. Surendar, identified this gap repeatedly
            during his extensive global experience in ERP transformations.
            From Asia to the Americas, he recognized the need for a provider
            who remains committed to clients long after go-live, ensuring
            they unlock the full potential of ERP.
          </p>

          <p className="story-text">
            This unwavering approach has driven Highshine to achieve an
            extraordinary 300% year-over-year growth since its inception.
            However, our success isn't just about numbers — it reflects our
            steadfast dedication to our clients and our team.
          </p>
          <div className="story-founders">
            <div className="founder-badge">
                <div className="founder-avatar">HG</div>
                <div className="founder-info">
                    <strong>Hari Gautham</strong>
                    <span>Founder</span>
                </div>
            </div>
            <div className="founder-badge">
                <div className="founder-avatar">S</div>
                <div className="founder-info">
                    <strong>Surendar</strong>
                    <span>Co-Founder</span>
                </div>
            </div>
          </div>
           <div className="story-quote">
            <p>"We believe ERP success is a lifelong partnership."</p>
            <span>— Hari Gautham & Surendar, Co-Founders</span>
          </div>
                </div>
            </div>
        </section>
    )

}
export default Story;
