import { useEffect,useRef } from "react";
import useScrollReveal from '../useScrollReveal';
import "../styles/Timeline.css"
const milestones = [
  {
    year: '2022',
    milestone: 'Company Started',
    employees: '5 employees',
    detail: 'Founded with a vision to transform ERP support',
    current: false,
  },
  {
    year: '2023',
    milestone: 'Team Expansion',
    employees: '15 employees',
    detail: 'Grew rapidly with key industry hires',
    current: false,
  },
  {
    year: '2024',
    milestone: 'Growth Phase',
    employees: '23 employees',
    detail: 'Expanded to international clients',
    current: false,
  },
  {
    year: '2025',
    milestone: 'Scaling Operations',
    employees: '34 employees',
    detail: 'Opened new service verticals',
    current: false,
  },
  {
    year: '2026',
    milestone: 'Future Vision',
    employees: '45+ employees',
    detail: 'Leading ERP partner across Asia & Americas',
    current: true,
  },
];

function TimelineItem({ item }) {
  
    const sectionRef=useRef(null);
    useScrollReveal(sectionRef);
  return (
    <div className={`timeline-item ${item.current ? 'current' : ''}`}>
      <div className="timeline-tooltip">
        <p>
          <strong>{item.year}</strong> — {item.detail}
        </p>
      </div>
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <div className="timeline-year">{item.year}</div>
        <div className="timeline-milestone">{item.milestone}</div>
        <div className="timeline-employees">{item.employees}</div>
      </div>
    </div>
  );
}
function Timeline({item}){
    const sectionRef=useRef(null);
    useScrollReveal(sectionRef);
    useEffect(()=>{
        const observer=new IntersectionObserver(
            (entries)=>{
                entries.forEach((entry)=>{
                    if(entry.isIntersecting){
                        entry.target.classList.add('visible');
                    }
                });
            },
            {threshold:0.15}
        );
        if(sectionRef.current){
            const reveals=sectionRef.current.querySelectorAll(
                '.reveal,.reveal-left','reveal-right'
            );
            reveals.forEach((element)=>observer.observe(element));
        }
        return()=>observer.disconnect();

    },[]);
    return(
        <section className="timeline" id="jounery" ref={sectionRef}>
            <div className="timeline-inner">
                <div className="timeline-header reveal">
                    <p className="timeline-label">Milesstones</p>
                    <p className="timeline-title">Our Growth Journey</p>
                </div>

                <div className="timeline-track reveal">
                    {milestones.map((item)=>(
                        
                         <TimelineItem key={item.year} item={item} />
                    ))}
                </div>
            </div>
        </section>
    )


}
export default Timeline;